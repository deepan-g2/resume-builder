import { useState, useEffect } from 'react'
import { Download, Save, FileText } from 'lucide-react'
import { PDFViewer, PDFDownloadLink } from '@react-pdf/renderer'
import Editor from './components/Editor'
import { ModernTemplate, ClassicTemplate, MinimalTemplate } from './components/PDFTemplates'
import { initialResumeData } from './data/resumeData'

function App() {
  const [resumeData, setResumeData] = useState(() => {
    const saved = localStorage.getItem('resumeData')
    return saved ? JSON.parse(saved) : initialResumeData
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
              </select>

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
            <PDFViewer width="100%" height="100%" showToolbar={false}>
              {getPDFComponent()}
            </PDFViewer>
          </div>
        </div>
      </main>
    </div>
  )
}

export default App
