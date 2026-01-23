import { useState } from 'react'
import { Plus, Trash2, Upload, X, ChevronDown, ChevronUp, Eye, EyeOff, GripVertical } from 'lucide-react'
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import ATSScore from './ATSScore'

// Sortable Item Component for Section Reordering
function SortableItem({ id, children, label }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  }

  return (
    <div ref={setNodeRef} style={style} className="flex items-center space-x-2 bg-white border border-gray-300 rounded-lg p-3">
      <div {...attributes} {...listeners} className="cursor-grab active:cursor-grabbing flex-shrink-0">
        <GripVertical className="w-5 h-5 text-gray-400 hover:text-gray-600" />
      </div>
      <span className="text-sm font-medium text-gray-700 flex-1">{label}</span>
    </div>
  )
}

export default function Editor({ resumeData, setResumeData }) {
  const [collapsedSections, setCollapsedSections] = useState({
    customization: false,
    sectionOrder: false,
    personalInfo: false,
    summary: false,
    experience: false,
    education: false,
    skills: false,
    projects: false,
    certifications: false,
    languages: false,
    volunteer: false,
    awards: false
  })

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  const toggleSection = (section) => {
    setCollapsedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }))
  }

  const toggleVisibility = (section) => {
    setResumeData({
      ...resumeData,
      sectionVisibility: {
        ...resumeData.sectionVisibility,
        [section]: !resumeData.sectionVisibility[section]
      }
    })
  }

  const updateCustomization = (field, value) => {
    setResumeData({
      ...resumeData,
      customization: {
        ...resumeData.customization,
        [field]: value
      }
    })
  }

  const handleDragEnd = (event) => {
    const { active, over } = event

    if (over && active.id !== over.id) {
      const currentOrder = resumeData.customization?.sectionOrder || ['summary', 'experience', 'projects', 'education', 'certifications', 'skills', 'languages', 'volunteer', 'awards']
      const oldIndex = currentOrder.indexOf(active.id)
      const newIndex = currentOrder.indexOf(over.id)

      const newOrder = arrayMove(currentOrder, oldIndex, newIndex)

      setResumeData({
        ...resumeData,
        customization: {
          ...resumeData.customization,
          sectionOrder: newOrder
        }
      })
    }
  }

  const updatePersonalInfo = (field, value) => {
    setResumeData({
      ...resumeData,
      personalInfo: { ...resumeData.personalInfo, [field]: value }
    })
  }

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        updatePersonalInfo('photo', reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const removePhoto = () => {
    updatePersonalInfo('photo', null)
  }

  const updateSummary = (value) => {
    setResumeData({ ...resumeData, summary: value })
  }

  const addExperience = () => {
    const newExp = {
      id: Date.now(),
      title: "",
      company: "",
      location: "",
      startDate: "",
      endDate: "",
      current: false,
      description: [""]
    }
    setResumeData({
      ...resumeData,
      experience: [...resumeData.experience, newExp]
    })
  }

  const updateExperience = (id, field, value) => {
    setResumeData({
      ...resumeData,
      experience: resumeData.experience.map(exp =>
        exp.id === id ? { ...exp, [field]: value } : exp
      )
    })
  }

  const updateExperienceDescription = (id, index, value) => {
    setResumeData({
      ...resumeData,
      experience: resumeData.experience.map(exp =>
        exp.id === id ? {
          ...exp,
          description: exp.description.map((desc, i) => i === index ? value : desc)
        } : exp
      )
    })
  }

  const addExperienceDescription = (id) => {
    setResumeData({
      ...resumeData,
      experience: resumeData.experience.map(exp =>
        exp.id === id ? { ...exp, description: [...exp.description, ""] } : exp
      )
    })
  }

  const removeExperienceDescription = (id, index) => {
    setResumeData({
      ...resumeData,
      experience: resumeData.experience.map(exp =>
        exp.id === id ? {
          ...exp,
          description: exp.description.filter((_, i) => i !== index)
        } : exp
      )
    })
  }

  const removeExperience = (id) => {
    setResumeData({
      ...resumeData,
      experience: resumeData.experience.filter(exp => exp.id !== id)
    })
  }

  const addEducation = () => {
    const newEdu = {
      id: Date.now(),
      degree: "",
      school: "",
      location: "",
      graduationDate: "",
      gpa: ""
    }
    setResumeData({
      ...resumeData,
      education: [...resumeData.education, newEdu]
    })
  }

  const updateEducation = (id, field, value) => {
    setResumeData({
      ...resumeData,
      education: resumeData.education.map(edu =>
        edu.id === id ? { ...edu, [field]: value } : edu
      )
    })
  }

  const removeEducation = (id) => {
    setResumeData({
      ...resumeData,
      education: resumeData.education.filter(edu => edu.id !== id)
    })
  }

  const updateSkills = (value) => {
    setResumeData({
      ...resumeData,
      skills: value.split(',').map(s => s.trim()).filter(s => s)
    })
  }

  // Projects CRUD
  const addProject = () => {
    const newProject = {
      id: Date.now(),
      name: "",
      description: "",
      technologies: [],
      link: "",
      date: ""
    }
    setResumeData({
      ...resumeData,
      projects: [...resumeData.projects, newProject]
    })
  }

  const updateProject = (id, field, value) => {
    setResumeData({
      ...resumeData,
      projects: resumeData.projects.map(proj =>
        proj.id === id ? { ...proj, [field]: value } : proj
      )
    })
  }

  const updateProjectTechnologies = (id, value) => {
    setResumeData({
      ...resumeData,
      projects: resumeData.projects.map(proj =>
        proj.id === id ? { ...proj, technologies: value.split(',').map(s => s.trim()).filter(s => s) } : proj
      )
    })
  }

  const removeProject = (id) => {
    setResumeData({
      ...resumeData,
      projects: resumeData.projects.filter(proj => proj.id !== id)
    })
  }

  // Certifications CRUD
  const addCertification = () => {
    const newCert = {
      id: Date.now(),
      name: "",
      issuer: "",
      date: "",
      expiryDate: "",
      credentialId: ""
    }
    setResumeData({
      ...resumeData,
      certifications: [...resumeData.certifications, newCert]
    })
  }

  const updateCertification = (id, field, value) => {
    setResumeData({
      ...resumeData,
      certifications: resumeData.certifications.map(cert =>
        cert.id === id ? { ...cert, [field]: value } : cert
      )
    })
  }

  const removeCertification = (id) => {
    setResumeData({
      ...resumeData,
      certifications: resumeData.certifications.filter(cert => cert.id !== id)
    })
  }

  // Languages CRUD
  const addLanguage = () => {
    const newLang = {
      id: Date.now(),
      language: "",
      proficiency: "Professional"
    }
    setResumeData({
      ...resumeData,
      languages: [...resumeData.languages, newLang]
    })
  }

  const updateLanguage = (id, field, value) => {
    setResumeData({
      ...resumeData,
      languages: resumeData.languages.map(lang =>
        lang.id === id ? { ...lang, [field]: value } : lang
      )
    })
  }

  const removeLanguage = (id) => {
    setResumeData({
      ...resumeData,
      languages: resumeData.languages.filter(lang => lang.id !== id)
    })
  }

  // Volunteer CRUD
  const addVolunteer = () => {
    const newVol = {
      id: Date.now(),
      role: "",
      organization: "",
      location: "",
      startDate: "",
      endDate: "",
      current: false,
      description: [""]
    }
    setResumeData({
      ...resumeData,
      volunteer: [...resumeData.volunteer, newVol]
    })
  }

  const updateVolunteer = (id, field, value) => {
    setResumeData({
      ...resumeData,
      volunteer: resumeData.volunteer.map(vol =>
        vol.id === id ? { ...vol, [field]: value } : vol
      )
    })
  }

  const updateVolunteerDescription = (id, index, value) => {
    setResumeData({
      ...resumeData,
      volunteer: resumeData.volunteer.map(vol =>
        vol.id === id ? {
          ...vol,
          description: vol.description.map((desc, i) => i === index ? value : desc)
        } : vol
      )
    })
  }

  const addVolunteerDescription = (id) => {
    setResumeData({
      ...resumeData,
      volunteer: resumeData.volunteer.map(vol =>
        vol.id === id ? { ...vol, description: [...vol.description, ""] } : vol
      )
    })
  }

  const removeVolunteerDescription = (id, index) => {
    setResumeData({
      ...resumeData,
      volunteer: resumeData.volunteer.map(vol =>
        vol.id === id ? {
          ...vol,
          description: vol.description.filter((_, i) => i !== index)
        } : vol
      )
    })
  }

  const removeVolunteer = (id) => {
    setResumeData({
      ...resumeData,
      volunteer: resumeData.volunteer.filter(vol => vol.id !== id)
    })
  }

  // Awards CRUD
  const addAward = () => {
    const newAward = {
      id: Date.now(),
      title: "",
      issuer: "",
      date: "",
      description: ""
    }
    setResumeData({
      ...resumeData,
      awards: [...resumeData.awards, newAward]
    })
  }

  const updateAward = (id, field, value) => {
    setResumeData({
      ...resumeData,
      awards: resumeData.awards.map(award =>
        award.id === id ? { ...award, [field]: value } : award
      )
    })
  }

  const removeAward = (id) => {
    setResumeData({
      ...resumeData,
      awards: resumeData.awards.filter(award => award.id !== id)
    })
  }

  // Section Header Component
  const SectionHeader = ({ title, section, hasVisibilityToggle = false, onAdd = null }) => (
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center space-x-3 flex-1">
        <button
          onClick={() => toggleSection(section)}
          className="text-blue-600 hover:text-blue-700 transition-colors"
        >
          {collapsedSections[section] ? <ChevronDown className="w-5 h-5" /> : <ChevronUp className="w-5 h-5" />}
        </button>
        <h3 className="text-lg font-semibold text-blue-600">{title}</h3>
        {hasVisibilityToggle && (
          <button
            onClick={() => toggleVisibility(section)}
            className={`flex items-center space-x-1 px-2 py-1 text-xs rounded-lg transition-colors ${
              resumeData.sectionVisibility[section]
                ? 'bg-green-100 text-green-700 hover:bg-green-200'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
            title={resumeData.sectionVisibility[section] ? 'Visible on resume' : 'Hidden on resume'}
          >
            {resumeData.sectionVisibility[section] ? (
              <>
                <Eye className="w-3 h-3" />
                <span>Visible</span>
              </>
            ) : (
              <>
                <EyeOff className="w-3 h-3" />
                <span>Hidden</span>
              </>
            )}
          </button>
        )}
      </div>
      {onAdd && (
        <button
          onClick={onAdd}
          className="flex items-center space-x-1 px-3 py-1 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <Plus className="w-4 h-4" />
          <span>Add</span>
        </button>
      )}
    </div>
  )

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Edit Resume</h2>

      {/* ATS Compatibility Score */}
      <ATSScore resumeData={resumeData} />

      {/* Customization Controls */}
      <section className="border-2 border-blue-200 rounded-lg p-4 bg-blue-50">
        <SectionHeader title="Customization" section="customization" />
        {!collapsedSections.customization && (
        <div className="space-y-4">
          {/* Font Family */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Font Family</label>
            <select
              value={resumeData.customization?.fontFamily || "Helvetica"}
              onChange={(e) => updateCustomization('fontFamily', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="Helvetica">Helvetica (Modern, Clean)</option>
              <option value="Times-Roman">Times New Roman (Classic, Formal)</option>
              <option value="Courier">Courier (Technical, Monospace)</option>
            </select>
          </div>

          {/* Font Size & Weight */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Font Size: {resumeData.customization?.fontSize || 11}pt
              </label>
              <input
                type="range"
                min="9"
                max="14"
                step="0.5"
                value={resumeData.customization?.fontSize || 11}
                onChange={(e) => updateCustomization('fontSize', parseFloat(e.target.value))}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>9pt</span>
                <span>14pt</span>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Body Text Weight</label>
              <select
                value={resumeData.customization?.fontWeight || "normal"}
                onChange={(e) => updateCustomization('fontWeight', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="normal">Normal</option>
                <option value="bold">Bold</option>
              </select>
            </div>
          </div>

          {/* Line Spacing */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Line Spacing: {resumeData.customization?.lineSpacing || 1.5}
            </label>
            <input
              type="range"
              min="1.0"
              max="2.0"
              step="0.1"
              value={resumeData.customization?.lineSpacing || 1.5}
              onChange={(e) => updateCustomization('lineSpacing', parseFloat(e.target.value))}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>1.0 (Compact)</span>
              <span>1.5 (Default)</span>
              <span>2.0 (Spacious)</span>
            </div>
          </div>

          {/* Paragraph Spacing */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Section Spacing: {resumeData.customization?.paragraphSpacing || 12}px
            </label>
            <input
              type="range"
              min="8"
              max="24"
              step="2"
              value={resumeData.customization?.paragraphSpacing || 12}
              onChange={(e) => updateCustomization('paragraphSpacing', parseFloat(e.target.value))}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>8px (Tight)</span>
              <span>12px (Default)</span>
              <span>24px (Loose)</span>
            </div>
          </div>

          {/* Page Margins */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Page Margins: {resumeData.customization?.pageMargin || 40}px
            </label>
            <input
              type="range"
              min="20"
              max="60"
              step="5"
              value={resumeData.customization?.pageMargin || 40}
              onChange={(e) => updateCustomization('pageMargin', parseFloat(e.target.value))}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>20px (More content)</span>
              <span>40px (Default)</span>
              <span>60px (More space)</span>
            </div>
          </div>

          {/* Page Border */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={resumeData.customization?.showPageBorder || false}
                  onChange={(e) => updateCustomization('showPageBorder', e.target.checked)}
                  className="w-4 h-4 text-blue-600"
                />
                <span className="text-sm font-medium text-gray-700">Show Page Border</span>
              </label>
            </div>

            {resumeData.customization?.showPageBorder && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Border Width: {resumeData.customization?.borderWidth || 2}px</label>
                  <input
                    type="range"
                    min="1"
                    max="4"
                    step="1"
                    value={resumeData.customization?.borderWidth || 2}
                    onChange={(e) => updateCustomization('borderWidth', parseFloat(e.target.value))}
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Border Color</label>
                  <input
                    type="color"
                    value={resumeData.customization?.borderColor || "#e5e7eb"}
                    onChange={(e) => updateCustomization('borderColor', e.target.value)}
                    className="w-full h-10 border-0 rounded cursor-pointer"
                  />
                </div>
              </>
            )}
          </div>
        </div>
        )}
      </section>

      {/* Section Order Control */}
      <section className="border-2 border-purple-200 rounded-lg p-4 bg-purple-50">
        <SectionHeader title="Section Order (Drag to Reorder)" section="sectionOrder" />
        {!collapsedSections.sectionOrder && (
        <>
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={resumeData.customization?.sectionOrder || ['summary', 'experience', 'projects', 'education', 'certifications', 'skills', 'languages', 'volunteer', 'awards']}
            strategy={verticalListSortingStrategy}
          >
            <div className="space-y-3">
              {(resumeData.customization?.sectionOrder || ['summary', 'experience', 'projects', 'education', 'certifications', 'skills', 'languages', 'volunteer', 'awards']).map((section) => {
                const sectionNames = {
                  summary: 'Professional Summary',
                  experience: 'Work Experience',
                  projects: 'Projects',
                  education: 'Education',
                  certifications: 'Certifications',
                  skills: 'Skills',
                  languages: 'Languages',
                  volunteer: 'Volunteer Experience',
                  awards: 'Awards & Honors'
                }
                return (
                  <SortableItem key={section} id={section} label={sectionNames[section]} />
                )
              })}
            </div>
          </SortableContext>
        </DndContext>
        <p className="mt-3 text-xs text-gray-600">💡 Drag the grip handles to reorder sections</p>
        </>
        )}
      </section>

      {/* Personal Information */}
      <section className="border border-gray-200 rounded-lg p-4 bg-white">
        <SectionHeader title="Personal Information" section="personalInfo" />
        {!collapsedSections.personalInfo && (
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            value={resumeData.personalInfo.fullName}
            onChange={(e) => updatePersonalInfo('fullName', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <input
            type="email"
            placeholder="Email"
            value={resumeData.personalInfo.email}
            onChange={(e) => updatePersonalInfo('email', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <input
            type="tel"
            placeholder="Phone"
            value={resumeData.personalInfo.phone}
            onChange={(e) => updatePersonalInfo('phone', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <input
            type="text"
            placeholder="Location"
            value={resumeData.personalInfo.location}
            onChange={(e) => updatePersonalInfo('location', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <input
            type="text"
            placeholder="LinkedIn"
            value={resumeData.personalInfo.linkedin}
            onChange={(e) => updatePersonalInfo('linkedin', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <input
            type="text"
            placeholder="Website"
            value={resumeData.personalInfo.website}
            onChange={(e) => updatePersonalInfo('website', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />

          {/* Photo Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Profile Photo</label>
            {resumeData.personalInfo.photo ? (
              <div className="flex items-center space-x-4">
                <img
                  src={resumeData.personalInfo.photo}
                  alt="Profile"
                  className="w-24 h-24 rounded-full object-cover border-2 border-gray-300"
                />
                <button
                  onClick={removePhoto}
                  className="flex items-center space-x-2 px-4 py-2 text-sm text-red-600 border border-red-600 rounded-lg hover:bg-red-50"
                >
                  <X className="w-4 h-4" />
                  <span>Remove Photo</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center border-2 border-dashed border-gray-400">
                  <Upload className="w-8 h-8 text-gray-400" />
                </div>
                <label className="flex items-center space-x-2 px-4 py-2 text-sm text-white bg-blue-600 rounded-lg hover:bg-blue-700 cursor-pointer">
                  <Upload className="w-4 h-4" />
                  <span>Upload Photo</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    className="hidden"
                  />
                </label>
              </div>
            )}
            <p className="mt-2 text-xs text-gray-500">Recommended: Square image, at least 400x400px</p>
          </div>
        </div>
        )}
      </section>

      {/* Professional Summary */}
      <section className="border border-gray-200 rounded-lg p-4 bg-white">
        <SectionHeader title="Professional Summary" section="summary" hasVisibilityToggle={true} />
        {!collapsedSections.summary && (
        <textarea
          placeholder="Write a brief summary about yourself..."
          value={resumeData.summary}
          onChange={(e) => updateSummary(e.target.value)}
          rows={4}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        )}
      </section>

      {/* Experience */}
      <section className="border border-gray-200 rounded-lg p-4 bg-white">
        <SectionHeader
          title="Work Experience"
          section="experience"
          hasVisibilityToggle={true}
          onAdd={addExperience}
        />
        {!collapsedSections.experience && (
        <div className="space-y-6">
          {resumeData.experience.map((exp, expIndex) => (
            <div key={exp.id} className="p-4 border border-gray-200 rounded-lg space-y-3">
              <div className="flex justify-between items-start">
                <h4 className="font-medium text-gray-700">Experience {expIndex + 1}</h4>
                <button
                  onClick={() => removeExperience(exp.id)}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <input
                type="text"
                placeholder="Job Title"
                value={exp.title}
                onChange={(e) => updateExperience(exp.id, 'title', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                placeholder="Company"
                value={exp.company}
                onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                placeholder="Location"
                value={exp.location}
                onChange={(e) => updateExperience(exp.id, 'location', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />

              <div className="grid grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="Start Date"
                  value={exp.startDate}
                  onChange={(e) => updateExperience(exp.id, 'startDate', e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="text"
                  placeholder="End Date"
                  value={exp.endDate}
                  onChange={(e) => updateExperience(exp.id, 'endDate', e.target.value)}
                  disabled={exp.current}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                />
              </div>

              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={exp.current}
                  onChange={(e) => updateExperience(exp.id, 'current', e.target.checked)}
                  className="w-4 h-4 text-blue-600"
                />
                <span className="text-sm text-gray-700">Currently working here</span>
              </label>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Responsibilities:</label>
                {exp.description.map((desc, index) => (
                  <div key={index} className="flex space-x-2">
                    <input
                      type="text"
                      placeholder="Add a responsibility..."
                      value={desc}
                      onChange={(e) => updateExperienceDescription(exp.id, index, e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                    {exp.description.length > 1 && (
                      <button
                        onClick={() => removeExperienceDescription(exp.id, index)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
                <button
                  onClick={() => addExperienceDescription(exp.id)}
                  className="text-sm text-blue-600 hover:text-blue-700"
                >
                  + Add responsibility
                </button>
              </div>
            </div>
          ))}
        </div>
        )}
      </section>

      {/* Education */}
      <section className="border border-gray-200 rounded-lg p-4 bg-white">
        <SectionHeader
          title="Education"
          section="education"
          hasVisibilityToggle={true}
          onAdd={addEducation}
        />
        {!collapsedSections.education && (
        <div className="space-y-4">
          {resumeData.education.map((edu, eduIndex) => (
            <div key={edu.id} className="p-4 border border-gray-200 rounded-lg space-y-3">
              <div className="flex justify-between items-start">
                <h4 className="font-medium text-gray-700">Education {eduIndex + 1}</h4>
                <button
                  onClick={() => removeEducation(edu.id)}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <input
                type="text"
                placeholder="Degree"
                value={edu.degree}
                onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                placeholder="School Name"
                value={edu.school}
                onChange={(e) => updateEducation(edu.id, 'school', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                placeholder="Location"
                value={edu.location}
                onChange={(e) => updateEducation(edu.id, 'location', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="Graduation Date"
                  value={edu.graduationDate}
                  onChange={(e) => updateEducation(edu.id, 'graduationDate', e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="text"
                  placeholder="GPA (optional)"
                  value={edu.gpa}
                  onChange={(e) => updateEducation(edu.id, 'gpa', e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          ))}
        </div>
        )}
      </section>

      {/* Skills */}
      <section className="border border-gray-200 rounded-lg p-4 bg-white">
        <SectionHeader title="Skills" section="skills" hasVisibilityToggle={true} />
        {!collapsedSections.skills && (
        <>
          <textarea
            placeholder="Enter skills separated by commas (e.g., JavaScript, React, Node.js)"
            value={resumeData.skills.join(', ')}
            onChange={(e) => updateSkills(e.target.value)}
            rows={3}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <p className="mt-2 text-sm text-gray-500">Separate skills with commas</p>
        </>
        )}
      </section>

      {/* Projects */}
      <section className="border border-gray-200 rounded-lg p-4 bg-white">
        <SectionHeader
          title="Projects"
          section="projects"
          hasVisibilityToggle={true}
          onAdd={addProject}
        />
        {!collapsedSections.projects && (
        <div className="space-y-4">
          {resumeData.projects.map((proj, index) => (
            <div key={proj.id} className="p-4 border border-gray-200 rounded-lg space-y-3">
              <div className="flex justify-between items-start">
                <h4 className="font-medium text-gray-700">Project {index + 1}</h4>
                <button
                  onClick={() => removeProject(proj.id)}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <input
                type="text"
                placeholder="Project Name"
                value={proj.name}
                onChange={(e) => updateProject(proj.id, 'name', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              <textarea
                placeholder="Project Description"
                value={proj.description}
                onChange={(e) => updateProject(proj.id, 'description', e.target.value)}
                rows={2}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                placeholder="Technologies (comma-separated)"
                value={proj.technologies.join(', ')}
                onChange={(e) => updateProjectTechnologies(proj.id, e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="Link (GitHub, Live Demo)"
                  value={proj.link}
                  onChange={(e) => updateProject(proj.id, 'link', e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="text"
                  placeholder="Date/Year"
                  value={proj.date}
                  onChange={(e) => updateProject(proj.id, 'date', e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          ))}
        </div>
        )}
      </section>

      {/* Certifications */}
      <section className="border border-gray-200 rounded-lg p-4 bg-white">
        <SectionHeader
          title="Certifications"
          section="certifications"
          hasVisibilityToggle={true}
          onAdd={addCertification}
        />
        {!collapsedSections.certifications && (
        <div className="space-y-4">
          {resumeData.certifications.map((cert, index) => (
            <div key={cert.id} className="p-4 border border-gray-200 rounded-lg space-y-3">
              <div className="flex justify-between items-start">
                <h4 className="font-medium text-gray-700">Certification {index + 1}</h4>
                <button
                  onClick={() => removeCertification(cert.id)}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <input
                type="text"
                placeholder="Certification Name"
                value={cert.name}
                onChange={(e) => updateCertification(cert.id, 'name', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                placeholder="Issuer (e.g., AWS, Google)"
                value={cert.issuer}
                onChange={(e) => updateCertification(cert.id, 'issuer', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="Issue Date"
                  value={cert.date}
                  onChange={(e) => updateCertification(cert.id, 'date', e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="text"
                  placeholder="Expiry Date (optional)"
                  value={cert.expiryDate}
                  onChange={(e) => updateCertification(cert.id, 'expiryDate', e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <input
                type="text"
                placeholder="Credential ID (optional)"
                value={cert.credentialId}
                onChange={(e) => updateCertification(cert.id, 'credentialId', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
          ))}
        </div>
        )}
      </section>

      {/* Languages */}
      <section className="border border-gray-200 rounded-lg p-4 bg-white">
        <SectionHeader
          title="Languages"
          section="languages"
          hasVisibilityToggle={true}
          onAdd={addLanguage}
        />
        {!collapsedSections.languages && (
        <div className="space-y-4">
          {resumeData.languages.map((lang, index) => (
            <div key={lang.id} className="p-4 border border-gray-200 rounded-lg">
              <div className="flex justify-between items-start mb-3">
                <h4 className="font-medium text-gray-700">Language {index + 1}</h4>
                <button
                  onClick={() => removeLanguage(lang.id)}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="Language"
                  value={lang.language}
                  onChange={(e) => updateLanguage(lang.id, 'language', e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
                <select
                  value={lang.proficiency}
                  onChange={(e) => updateLanguage(lang.id, 'proficiency', e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Native">Native</option>
                  <option value="Fluent">Fluent</option>
                  <option value="Professional">Professional</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Basic">Basic</option>
                </select>
              </div>
            </div>
          ))}
        </div>
        )}
      </section>

      {/* Volunteer Experience */}
      <section className="border border-gray-200 rounded-lg p-4 bg-white">
        <SectionHeader
          title="Volunteer Experience"
          section="volunteer"
          hasVisibilityToggle={true}
          onAdd={addVolunteer}
        />
        {!collapsedSections.volunteer && (
        <div className="space-y-6">
          {resumeData.volunteer.map((vol, volIndex) => (
            <div key={vol.id} className="p-4 border border-gray-200 rounded-lg space-y-3">
              <div className="flex justify-between items-start">
                <h4 className="font-medium text-gray-700">Volunteer {volIndex + 1}</h4>
                <button
                  onClick={() => removeVolunteer(vol.id)}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <input
                type="text"
                placeholder="Role/Position"
                value={vol.role}
                onChange={(e) => updateVolunteer(vol.id, 'role', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                placeholder="Organization"
                value={vol.organization}
                onChange={(e) => updateVolunteer(vol.id, 'organization', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                placeholder="Location"
                value={vol.location}
                onChange={(e) => updateVolunteer(vol.id, 'location', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />

              <div className="grid grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="Start Date"
                  value={vol.startDate}
                  onChange={(e) => updateVolunteer(vol.id, 'startDate', e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="text"
                  placeholder="End Date"
                  value={vol.endDate}
                  onChange={(e) => updateVolunteer(vol.id, 'endDate', e.target.value)}
                  disabled={vol.current}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                />
              </div>

              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={vol.current}
                  onChange={(e) => updateVolunteer(vol.id, 'current', e.target.checked)}
                  className="w-4 h-4 text-blue-600"
                />
                <span className="text-sm text-gray-700">Currently volunteering here</span>
              </label>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Contributions:</label>
                {vol.description.map((desc, index) => (
                  <div key={index} className="flex space-x-2">
                    <input
                      type="text"
                      placeholder="Add a contribution..."
                      value={desc}
                      onChange={(e) => updateVolunteerDescription(vol.id, index, e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                    {vol.description.length > 1 && (
                      <button
                        onClick={() => removeVolunteerDescription(vol.id, index)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
                <button
                  onClick={() => addVolunteerDescription(vol.id)}
                  className="text-sm text-blue-600 hover:text-blue-700"
                >
                  + Add contribution
                </button>
              </div>
            </div>
          ))}
        </div>
        )}
      </section>

      {/* Awards & Honors */}
      <section className="border border-gray-200 rounded-lg p-4 bg-white">
        <SectionHeader
          title="Awards & Honors"
          section="awards"
          hasVisibilityToggle={true}
          onAdd={addAward}
        />
        {!collapsedSections.awards && (
        <div className="space-y-4">
          {resumeData.awards.map((award, index) => (
            <div key={award.id} className="p-4 border border-gray-200 rounded-lg space-y-3">
              <div className="flex justify-between items-start">
                <h4 className="font-medium text-gray-700">Award {index + 1}</h4>
                <button
                  onClick={() => removeAward(award.id)}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <input
                type="text"
                placeholder="Award Title"
                value={award.title}
                onChange={(e) => updateAward(award.id, 'title', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                placeholder="Issuer/Organization"
                value={award.issuer}
                onChange={(e) => updateAward(award.id, 'issuer', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                placeholder="Date"
                value={award.date}
                onChange={(e) => updateAward(award.id, 'date', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              <textarea
                placeholder="Description (optional)"
                value={award.description}
                onChange={(e) => updateAward(award.id, 'description', e.target.value)}
                rows={2}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
          ))}
        </div>
        )}
      </section>
    </div>
  )
}
