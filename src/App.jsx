import { useState, useEffect } from 'react'
import { Download, Save, FileText } from 'lucide-react'
import { PDFViewer, PDFDownloadLink } from '@react-pdf/renderer'
import Editor from './components/Editor'
import { ModernTemplate, ClassicTemplate, MinimalTemplate, ExecutiveTemplate, CreativeTemplate, TechnicalTemplate } from './components/PDFTemplates'
import { initialResumeData } from './data/resumeData'

function App() {
  const [resumeData, setResumeData] = useState(() => {
    const saved = localStorage.getItem('resumeData')
    if (saved) {
      const parsedData = JSON.parse(saved)
      // Add backward compatibility for old data without sectionVisibility
      if (!parsedData.sectionVisibility) {
        parsedData.sectionVisibility = {
          summary: true,
          experience: true,
          education: true,
          skills: true,
          projects: true,
          certifications: true,
          languages: true,
          volunteer: true,
          awards: true
        }
      }
      // Add default empty arrays for new sections if they don't exist
      if (!parsedData.projects) parsedData.projects = []
      if (!parsedData.certifications) parsedData.certifications = []
      if (!parsedData.languages) parsedData.languages = []
      if (!parsedData.volunteer) parsedData.volunteer = []
      if (!parsedData.awards) parsedData.awards = []
      // Add customization defaults
      if (!parsedData.customization) {
        parsedData.customization = {
          accentColor: "#2563eb",
          fontFamily: "Helvetica",
          fontSize: 11,
          lineSpacing: 1.5,
          paragraphSpacing: 12,
          pageMargin: 40,
          showPageBorder: false,
          borderWidth: 2,
          borderColor: "#e5e7eb"
        }
      } else {
        // Add missing customization fields
        if (!parsedData.customization.fontFamily) parsedData.customization.fontFamily = "Helvetica"
        if (!parsedData.customization.fontSize) parsedData.customization.fontSize = 11
        if (!parsedData.customization.fontWeight) parsedData.customization.fontWeight = "normal"
        if (!parsedData.customization.lineSpacing) parsedData.customization.lineSpacing = 1.5
        if (!parsedData.customization.paragraphSpacing) parsedData.customization.paragraphSpacing = 12
        if (!parsedData.customization.pageMargin) parsedData.customization.pageMargin = 40
        if (parsedData.customization.showPageBorder === undefined) parsedData.customization.showPageBorder = false
        if (!parsedData.customization.borderWidth) parsedData.customization.borderWidth = 2
        if (!parsedData.customization.borderColor) parsedData.customization.borderColor = "#e5e7eb"
        if (!parsedData.customization.sectionOrder) parsedData.customization.sectionOrder = ["summary", "experience", "projects", "education", "certifications", "skills", "languages", "volunteer", "awards"]
      }
      return parsedData
    }
    return initialResumeData
  })

  const [template, setTemplate] = useState('modern')
  const [showEditor, setShowEditor] = useState(true)

  // Auto-save to localStorage
  useEffect(() => {
    const timer = setTimeout(() => {
      localStorage.setItem('resumeData', JSON.stringify(resumeData))
    }, 1000)
    return () => clearTimeout(timer)
  }, [resumeData])

  // Get the PDF component based on selected template
  const getPDFComponent = () => {
    switch (template) {
      case 'modern':
        return <ModernTemplate resumeData={resumeData} />
      case 'classic':
        return <ClassicTemplate resumeData={resumeData} />
      case 'minimal':
        return <MinimalTemplate resumeData={resumeData} />
      case 'executive':
        return <ExecutiveTemplate resumeData={resumeData} />
      case 'creative':
        return <CreativeTemplate resumeData={resumeData} />
      case 'technical':
        return <TechnicalTemplate resumeData={resumeData} />
      default:
        return <ModernTemplate resumeData={resumeData} />
    }
  }

  const getFileName = () => {
    return `${resumeData.personalInfo.fullName.replace(/\s+/g, '_')}_Resume_${template}.pdf`
  }

  const handleSave = () => {
    localStorage.setItem('resumeData', JSON.stringify(resumeData))
    alert('Resume saved successfully!')
  }

  const handleReset = () => {
    if (confirm('Reset to default resume? This will clear all your data.')) {
      setResumeData(initialResumeData)
      localStorage.removeItem('resumeData')
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-full mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <FileText className="w-8 h-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">Resume Builder</h1>
            </div>

            <div className="flex items-center space-x-3">
              {/* Template Selector */}
              <select
                value={template}
                onChange={(e) => setTemplate(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="modern">Modern</option>
                <option value="classic">Classic</option>
                <option value="minimal">Minimal</option>
                <option value="executive">Executive</option>
                <option value="creative">Creative</option>
                <option value="technical">Technical</option>
              </select>

              {/* Quick Color Presets */}
              <div className="flex items-center space-x-2 px-3 py-2 border border-gray-300 rounded-lg">
                <span className="text-xs font-medium text-gray-700">Colors:</span>
                <div className="flex space-x-1">
                  {[
                    { name: 'Blue', color: '#2563eb' },
                    { name: 'Red', color: '#dc2626' },
                    { name: 'Green', color: '#059669' },
                    { name: 'Purple', color: '#7c3aed' },
                    { name: 'Orange', color: '#ea580c' },
                    { name: 'Teal', color: '#0d9488' },
                    { name: 'Pink', color: '#db2777' },
                  ].map(({ name, color }) => (
                    <button
                      key={color}
                      onClick={() => setResumeData({
                        ...resumeData,
                        customization: {
                          ...resumeData.customization,
                          accentColor: color
                        }
                      })}
                      className="w-6 h-6 rounded-full border-2 border-gray-300 hover:border-gray-500 transition-all hover:scale-110"
                      style={{ backgroundColor: color }}
                      title={name}
                    />
                  ))}
                  <input
                    type="color"
                    value={resumeData.customization?.accentColor || "#2563eb"}
                    onChange={(e) => setResumeData({
                      ...resumeData,
                      customization: {
                        ...resumeData.customization,
                        accentColor: e.target.value
                      }
                    })}
                    className="w-6 h-6 border-2 border-gray-300 rounded cursor-pointer"
                    title="Custom color"
                  />
                </div>
              </div>

              {/* Toggle Editor */}
              <button
                onClick={() => setShowEditor(!showEditor)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                {showEditor ? 'Preview Only' : 'Show Editor'}
              </button>

              {/* Save Button */}
              <button
                onClick={handleSave}
                className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 transition-colors"
              >
                <Save className="w-4 h-4" />
                <span>Save</span>
              </button>

              {/* Export PDF Button */}
              <PDFDownloadLink
                document={getPDFComponent()}
                fileName={getFileName()}
                className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors no-underline"
              >
                {({ loading }) => (
                  <>
                    <Download className="w-4 h-4" />
                    <span>{loading ? 'Generating...' : 'Download PDF'}</span>
                  </>
                )}
              </PDFDownloadLink>

              {/* Reset Button */}
              <button
                onClick={handleReset}
                className="px-4 py-2 text-sm font-medium text-red-600 border border-red-600 rounded-lg hover:bg-red-50 transition-colors"
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-full mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Editor Panel */}
          {showEditor && (
            <div className="bg-white rounded-lg shadow-lg p-6 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 140px)' }}>
              <Editor resumeData={resumeData} setResumeData={setResumeData} />
            </div>
          )}

          {/* Preview Panel - PDF Viewer */}
          <div className={`bg-white rounded-lg shadow-lg overflow-hidden ${showEditor ? '' : 'mx-auto max-w-4xl'}`} style={{ height: 'calc(100vh - 140px)' }}>
            <PDFViewer
              width="100%"
              height="100%"
              showToolbar={false}
              key={JSON.stringify(resumeData.customization?.sectionOrder || [])}
            >
              {getPDFComponent()}
            </PDFViewer>
          </div>
        </div>
      </main>
    </div>
  )
}

export default App
