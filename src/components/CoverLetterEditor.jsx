import { useState } from 'react'
import { Plus, Trash2, Sparkles, ChevronDown, ChevronUp, Copy } from 'lucide-react'

export default function CoverLetterEditor({ coverLetterData, setCoverLetterData, resumeData }) {
  const [collapsedSections, setCollapsedSections] = useState({
    personalInfo: false,
    jobInfo: false,
    content: false,
    aiHelper: false
  })

  const [showAIHelper, setShowAIHelper] = useState(false)
  const [jobDescription, setJobDescription] = useState("")

  const toggleSection = (section) => {
    setCollapsedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }))
  }

  const updateField = (section, field, value) => {
    setCoverLetterData({
      ...coverLetterData,
      [section]: {
        ...coverLetterData[section],
        [field]: value
      }
    })
  }

  const updateTopLevel = (field, value) => {
    setCoverLetterData({
      ...coverLetterData,
      [field]: value
    })
  }

  const updateBodyParagraph = (index, value) => {
    const newBody = [...coverLetterData.body]
    newBody[index] = value
    setCoverLetterData({
      ...coverLetterData,
      body: newBody
    })
  }

  const addBodyParagraph = () => {
    setCoverLetterData({
      ...coverLetterData,
      body: [...coverLetterData.body, ""]
    })
  }

  const removeBodyParagraph = (index) => {
    if (coverLetterData.body.length > 1) {
      setCoverLetterData({
        ...coverLetterData,
        body: coverLetterData.body.filter((_, i) => i !== index)
      })
    }
  }

  const importFromResume = () => {
    if (resumeData) {
      setCoverLetterData({
        ...coverLetterData,
        personalInfo: {
          fullName: resumeData.personalInfo.fullName,
          email: resumeData.personalInfo.email,
          phone: resumeData.personalInfo.phone,
          location: resumeData.personalInfo.location,
          linkedin: resumeData.personalInfo.linkedin,
          website: resumeData.personalInfo.website
        },
        customization: {
          ...coverLetterData.customization,
          accentColor: resumeData.customization?.accentColor || "#2563eb",
          fontFamily: resumeData.customization?.fontFamily || "Helvetica",
          fontSize: resumeData.customization?.fontSize || 11
        }
      })
      alert('Personal info and styling imported from resume!')
    }
  }

  const generateAISuggestions = () => {
    // Placeholder for AI integration
    alert('AI-assisted personalization will analyze the job description and suggest customizations. This feature can be connected to an AI API like OpenAI.')
  }

  const SectionHeader = ({ title, section, onAdd = null }) => (
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center space-x-3">
        <button
          onClick={() => toggleSection(section)}
          className="text-blue-600 hover:text-blue-700 transition-colors"
        >
          {collapsedSections[section] ? <ChevronDown className="w-5 h-5" /> : <ChevronUp className="w-5 h-5" />}
        </button>
        <h3 className="text-lg font-semibold text-blue-600">{title}</h3>
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
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Edit Cover Letter</h2>
        <button
          onClick={importFromResume}
          className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
        >
          <Copy className="w-4 h-4" />
          <span>Import from Resume</span>
        </button>
      </div>

      {/* AI Helper Section */}
      <section className="border-2 border-purple-200 rounded-lg p-4 bg-purple-50">
        <SectionHeader title="AI-Assisted Personalization" section="aiHelper" />
        {!collapsedSections.aiHelper && (
          <div className="space-y-4">
            <p className="text-sm text-gray-600">
              Paste the job description below, and get AI-powered suggestions to personalize your cover letter.
            </p>
            <textarea
              placeholder="Paste the job description here..."
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              rows={6}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
            <button
              onClick={generateAISuggestions}
              className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              <Sparkles className="w-4 h-4" />
              <span>Generate AI Suggestions</span>
            </button>
            <div className="mt-4 p-3 bg-purple-100 rounded-lg">
              <p className="text-sm text-purple-900">
                <strong>Pro Tip:</strong> The AI will analyze the job description and suggest ways to tailor your opening, body paragraphs, and skills mentions to match the employer's needs.
              </p>
            </div>
          </div>
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
              value={coverLetterData.personalInfo.fullName}
              onChange={(e) => updateField('personalInfo', 'fullName', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <div className="grid grid-cols-2 gap-4">
              <input
                type="email"
                placeholder="Email"
                value={coverLetterData.personalInfo.email}
                onChange={(e) => updateField('personalInfo', 'email', e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="tel"
                placeholder="Phone"
                value={coverLetterData.personalInfo.phone}
                onChange={(e) => updateField('personalInfo', 'phone', e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <input
              type="text"
              placeholder="Location"
              value={coverLetterData.personalInfo.location}
              onChange={(e) => updateField('personalInfo', 'location', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="LinkedIn"
                value={coverLetterData.personalInfo.linkedin}
                onChange={(e) => updateField('personalInfo', 'linkedin', e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                placeholder="Website"
                value={coverLetterData.personalInfo.website}
                onChange={(e) => updateField('personalInfo', 'website', e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        )}
      </section>

      {/* Job Information */}
      <section className="border border-gray-200 rounded-lg p-4 bg-white">
        <SectionHeader title="Job & Company Information" section="jobInfo" />
        {!collapsedSections.jobInfo && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Position Title"
                value={coverLetterData.jobInfo.position}
                onChange={(e) => updateField('jobInfo', 'position', e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                placeholder="Company Name"
                value={coverLetterData.jobInfo.company}
                onChange={(e) => updateField('jobInfo', 'company', e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Hiring Manager Name (optional)"
                value={coverLetterData.jobInfo.hiringManager}
                onChange={(e) => updateField('jobInfo', 'hiringManager', e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                placeholder="Department (optional)"
                value={coverLetterData.jobInfo.department}
                onChange={(e) => updateField('jobInfo', 'department', e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <input
              type="text"
              placeholder="Date"
              value={coverLetterData.date}
              onChange={(e) => updateTopLevel('date', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              placeholder="Salutation (e.g., Dear Hiring Manager)"
              value={coverLetterData.salutation}
              onChange={(e) => updateTopLevel('salutation', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
        )}
      </section>

      {/* Letter Content */}
      <section className="border border-gray-200 rounded-lg p-4 bg-white">
        <SectionHeader title="Letter Content" section="content" onAdd={addBodyParagraph} />
        {!collapsedSections.content && (
          <div className="space-y-4">
            {/* Opening Paragraph */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Opening Paragraph</label>
              <textarea
                placeholder="Express your interest in the position..."
                value={coverLetterData.opening}
                onChange={(e) => updateTopLevel('opening', e.target.value)}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <p className="mt-1 text-xs text-gray-500">
                Tip: Use [Position] and [Company] as placeholders - they'll be automatically replaced
              </p>
            </div>

            {/* Body Paragraphs */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Body Paragraphs</label>
              {coverLetterData.body.map((paragraph, index) => (
                <div key={index} className="mb-3 relative">
                  <div className="flex items-start space-x-2">
                    <textarea
                      placeholder={`Paragraph ${index + 1}: Highlight your relevant experience and skills...`}
                      value={paragraph}
                      onChange={(e) => updateBodyParagraph(index, e.target.value)}
                      rows={4}
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                    {coverLetterData.body.length > 1 && (
                      <button
                        onClick={() => removeBodyParagraph(index)}
                        className="text-red-600 hover:text-red-700 mt-2"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Closing Paragraph */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Closing Paragraph</label>
              <textarea
                placeholder="Express your enthusiasm and call to action..."
                value={coverLetterData.closing}
                onChange={(e) => updateTopLevel('closing', e.target.value)}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Signature */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Signature</label>
              <input
                type="text"
                placeholder="Sincerely,"
                value={coverLetterData.signature}
                onChange={(e) => updateTopLevel('signature', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        )}
      </section>
    </div>
  )
}
