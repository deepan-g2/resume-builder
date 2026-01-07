import { useState } from 'react'
import { Plus, Trash2, Upload, X, ChevronDown, ChevronUp, Eye, EyeOff } from 'lucide-react'

export default function Editor({ resumeData, setResumeData }) {
  const [collapsedSections, setCollapsedSections] = useState({
    personalInfo: false,
    summary: false,
    experience: false,
    education: false,
    skills: false
  })

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
    </div>
  )
}
