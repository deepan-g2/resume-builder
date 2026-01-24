import { useState, useEffect } from 'react'
import { Download, FileText, Mail, Upload, Download as ExportIcon, Copy, Target, ChevronDown, ChevronUp, Eye } from 'lucide-react'
import { PDFViewer, PDFDownloadLink } from '@react-pdf/renderer'
import Editor from './components/Editor'
import CoverLetterEditor from './components/CoverLetterEditor'
import ImportModal from './components/ImportModal'
import ExportModal from './components/ExportModal'
import ATSScore from './components/ATSScore'
import CustomizationEditor from './components/CustomizationEditor'
import { ModernTemplate, ClassicTemplate, MinimalTemplate, ExecutiveTemplate, CreativeTemplate, TechnicalTemplate, AcademicTemplate, InternationalTemplate, PortfolioTemplate } from './components/PDFTemplates'
import { ModernCoverLetterTemplate, ClassicCoverLetterTemplate, MinimalCoverLetterTemplate, ExecutiveCoverLetterTemplate, CreativeCoverLetterTemplate, TechnicalCoverLetterTemplate, AcademicCoverLetterTemplate, InternationalCoverLetterTemplate, PortfolioCoverLetterTemplate } from './components/CoverLetterTemplates'
import { initialResumeData } from './data/resumeData'
import { initialCoverLetterData } from './data/coverLetterData'
import { duplicateResume, saveResume } from './utils/resumeManager'
import { analyzeResume, getScoreColor, getScoreBgColor } from './utils/atsAnalyzer'
import { useNotification } from './context/NotificationContext'

function App() {
  const { showSuccess, showError, showConfirm } = useNotification()
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
  const [activeTab, setActiveTab] = useState('resume') // 'resume', 'ats', or 'coverLetter'
  const [showImport, setShowImport] = useState(false)
  const [showExport, setShowExport] = useState(false)
  const [atsScore, setAtsScore] = useState(null)
  const [showCustomization, setShowCustomization] = useState(false)

  const [coverLetterData, setCoverLetterData] = useState(() => {
    const saved = localStorage.getItem('coverLetterData')
    if (saved) {
      return JSON.parse(saved)
    }
    return initialCoverLetterData
  })

  // Calculate ATS score
  useEffect(() => {
    const analysis = analyzeResume(resumeData, 'technology')
    setAtsScore(analysis.totalScore)
  }, [resumeData])

  // Auto-save to localStorage
  useEffect(() => {
    const timer = setTimeout(() => {
      localStorage.setItem('resumeData', JSON.stringify(resumeData))
    }, 1000)
    return () => clearTimeout(timer)
  }, [resumeData])

  useEffect(() => {
    const timer = setTimeout(() => {
      localStorage.setItem('coverLetterData', JSON.stringify(coverLetterData))
    }, 1000)
    return () => clearTimeout(timer)
  }, [coverLetterData])

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
      case 'academic':
        return <AcademicTemplate resumeData={resumeData} />
      case 'international':
        return <InternationalTemplate resumeData={resumeData} />
      case 'portfolio':
        return <PortfolioTemplate resumeData={resumeData} />
      default:
        return <ModernTemplate resumeData={resumeData} />
    }
  }

  const getFileName = () => {
    if (activeTab === 'resume') {
      return `${resumeData.personalInfo.fullName.replace(/\s+/g, '_')}_Resume_${template}.pdf`
    } else {
      return `${coverLetterData.personalInfo.fullName.replace(/\s+/g, '_')}_CoverLetter_${template}.pdf`
    }
  }

  // Get the Cover Letter PDF component based on selected template
  const getCoverLetterPDFComponent = () => {
    switch (template) {
      case 'modern':
        return <ModernCoverLetterTemplate coverLetterData={coverLetterData} />
      case 'classic':
        return <ClassicCoverLetterTemplate coverLetterData={coverLetterData} />
      case 'minimal':
        return <MinimalCoverLetterTemplate coverLetterData={coverLetterData} />
      case 'executive':
        return <ExecutiveCoverLetterTemplate coverLetterData={coverLetterData} />
      case 'creative':
        return <CreativeCoverLetterTemplate coverLetterData={coverLetterData} />
      case 'technical':
        return <TechnicalCoverLetterTemplate coverLetterData={coverLetterData} />
      case 'academic':
        return <AcademicCoverLetterTemplate coverLetterData={coverLetterData} />
      case 'international':
        return <InternationalCoverLetterTemplate coverLetterData={coverLetterData} />
      case 'portfolio':
        return <PortfolioCoverLetterTemplate coverLetterData={coverLetterData} />
      default:
        return <ModernCoverLetterTemplate coverLetterData={coverLetterData} />
    }
  }


  const handleReset = async () => {
    const confirmed = await showConfirm({
      title: 'Reset to Default Resume',
      message: 'This will clear all your data. Are you sure you want to continue?',
      confirmText: 'Reset',
      cancelText: 'Cancel',
      type: 'danger'
    })

    if (confirmed) {
      setResumeData(initialResumeData)
      localStorage.removeItem('resumeData')
      showSuccess('Resume reset to default successfully!')
    }
  }

  const handleDuplicate = () => {
    try {
      // Create a deep copy of the current resume data
      const duplicatedData = JSON.parse(JSON.stringify(resumeData));

      // Update the name to indicate it's a copy
      if (duplicatedData.personalInfo?.fullName) {
        duplicatedData.personalInfo.fullName = `${duplicatedData.personalInfo.fullName} (Copy)`;
      }

      // Save the duplicated resume
      const newResume = saveResume(duplicatedData);

      // Load the duplicated resume
      setResumeData(newResume.data);
      showSuccess('Resume duplicated successfully!');
    } catch (error) {
      console.error('Duplicate error:', error);
      showError('Failed to duplicate resume. Please try again.');
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-white via-blue-50 to-white shadow-md sticky top-0 z-50 border-b-2 border-blue-100">
        <div className="max-w-full mx-auto px-6 py-4">
          <div className="flex items-center justify-between gap-6">
            {/* Left Section: Branding + Tabs */}
            <div className="flex items-center gap-8">
              {/* Logo and Title with enhanced styling */}
              <div className="flex items-center gap-3 group">
                <div className="p-2 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg shadow-lg group-hover:shadow-xl transition-shadow">
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900 tracking-tight">Resume Builder</h1>
                  <p className="text-xs text-gray-500">Build your career story</p>
                </div>
              </div>

              {/* Tab Navigation with improved styling */}
              <nav className="flex items-center gap-1 bg-white p-1.5 rounded-xl shadow-sm border border-gray-200">
                <button
                  onClick={() => setActiveTab('resume')}
                  className={`flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-semibold transition-all ${
                    activeTab === 'resume'
                      ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-md'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  <FileText className="w-4 h-4" />
                  <span>Resume</span>
                </button>
                <button
                  onClick={() => setActiveTab('ats')}
                  className={`flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-semibold transition-all ${
                    activeTab === 'ats'
                      ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-md'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  <Target className="w-4 h-4" />
                  <span>ATS Analysis</span>
                  {atsScore !== null && (
                    <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${
                      activeTab === 'ats'
                        ? 'bg-white/20 text-white'
                        : atsScore >= 80 ? 'bg-green-100 text-green-700' :
                        atsScore >= 60 ? 'bg-yellow-100 text-yellow-700' :
                        'bg-red-100 text-red-700'
                    }`}>
                      {atsScore}
                    </span>
                  )}
                </button>
                <button
                  onClick={() => setActiveTab('coverLetter')}
                  className={`flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-semibold transition-all ${
                    activeTab === 'coverLetter'
                      ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-md'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  <Mail className="w-4 h-4" />
                  <span>Cover Letter</span>
                </button>
              </nav>
            </div>

            {/* Right Section: Actions with improved layout */}
            <div className="flex items-center gap-3">
              {/* Template Selector - Hide on ATS tab */}
              {activeTab !== 'ats' && (
                <select
                  value={template}
                  onChange={(e) => setTemplate(e.target.value)}
                  className="px-4 py-2.5 text-sm font-medium border-2 border-gray-200 rounded-lg bg-white hover:border-blue-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all cursor-pointer"
                >
                  <option value="modern">Modern</option>
                  <option value="classic">Classic</option>
                  <option value="minimal">Minimal</option>
                  <option value="executive">Executive</option>
                  <option value="creative">Creative</option>
                  <option value="technical">Technical</option>
                  <option value="academic">Academic CV</option>
                  <option value="international">International (Europass)</option>
                  <option value="portfolio">Portfolio</option>
                </select>
              )}

              {/* Resume-specific actions */}
              {activeTab === 'resume' && (
                <>
                  <button
                    onClick={() => setShowImport(true)}
                    className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-gray-700 bg-white border-2 border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-all"
                    title="Import from file or LinkedIn"
                  >
                    <Upload className="w-4 h-4" />
                    <span>Import</span>
                  </button>

                  <button
                    onClick={handleDuplicate}
                    className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-gray-700 bg-white border-2 border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-all"
                    title="Duplicate current resume"
                  >
                    <Copy className="w-4 h-4" />
                    <span>Duplicate</span>
                  </button>
                </>
              )}

              {/* View Toggle - Hide on ATS tab */}
              {activeTab !== 'ats' && (
                <button
                  onClick={() => setShowEditor(!showEditor)}
                  className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-gray-700 bg-white border-2 border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-all"
                  title={showEditor ? 'Preview Only' : 'Show Editor'}
                >
                  <Eye className="w-4 h-4" />
                  <span>{showEditor ? 'Hide Editor' : 'Show Editor'}</span>
                </button>
              )}

              {/* Primary Actions - Hide on ATS tab */}
              {activeTab !== 'ats' && (
                <>
                  <div className="h-8 w-px bg-gray-300" />

                  <button
                    onClick={() => setShowExport(true)}
                    className="flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all shadow-md hover:shadow-lg"
                    title="Export as PDF, JSON, HTML, or Text"
                  >
                    <Download className="w-4 h-4" />
                    <span>Export</span>
                  </button>

                  {/* Reset Button */}
                  <button
                    onClick={handleReset}
                    className="px-4 py-2.5 text-sm font-medium text-red-600 bg-red-50 border-2 border-red-200 hover:bg-red-100 hover:border-red-300 rounded-lg transition-all"
                    title="Reset to default"
                  >
                    Reset
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-full mx-auto p-6 overflow-x-hidden">
        {activeTab === 'ats' ? (
          /* ATS Analysis Tab - Full Width */
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">ATS Compatibility Analysis</h2>
                <p className="text-sm text-gray-600">
                  ATS (Applicant Tracking System) compatibility measures how well your resume will be
                  parsed and understood by automated recruitment systems. A higher score means better
                  chances of your resume reaching human recruiters.
                </p>
              </div>
              <ATSScore resumeData={resumeData} />
            </div>
          </div>
        ) : (
          /* Resume and Cover Letter Tabs - Split View */
          <div className={`grid grid-cols-1 gap-6 ${showEditor ? 'lg:grid-cols-2' : ''}`}>
            {/* Editor Panel */}
            {showEditor && (
              <div className="space-y-6 pt-6">
                {/* Customization Section - Only show on Resume tab */}
                {activeTab === 'resume' && (
                  <div className="bg-white rounded-lg shadow-lg">
                    <button
                      onClick={() => setShowCustomization(!showCustomization)}
                      className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition-colors rounded-lg"
                    >
                      <div>
                        <h2 className="text-lg font-semibold text-gray-900">Customization Studio</h2>
                        <p className="text-xs text-gray-500 mt-1">
                          Customize fonts, colors, spacing, and layout
                        </p>
                      </div>
                      {showCustomization ? (
                        <ChevronUp className="w-5 h-5 text-gray-500" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-gray-500" />
                      )}
                    </button>

                    {showCustomization && (
                      <div className="px-6 pb-6 border-t border-gray-200">
                        <CustomizationEditor
                          resumeData={resumeData}
                          setResumeData={setResumeData}
                        />
                      </div>
                    )}
                  </div>
                )}

                {/* Main Editor */}
                <div className="bg-white rounded-lg shadow-lg p-6 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 140px)' }}>
                  {activeTab === 'resume' ? (
                    <Editor resumeData={resumeData} setResumeData={setResumeData} />
                  ) : (
                    <CoverLetterEditor
                      coverLetterData={coverLetterData}
                      setCoverLetterData={setCoverLetterData}
                      resumeData={resumeData}
                    />
                  )}
                </div>
              </div>
            )}

            {/* Preview Panel - PDF Viewer */}
            <div className={`pdf-viewer-container bg-white rounded-lg shadow-lg overflow-hidden ${showEditor ? '' : 'mx-auto w-full max-w-4xl'}`} style={{ height: 'calc(100vh - 140px)' }}>
              <PDFViewer
                width="100%"
                height="100%"
                showToolbar={false}
                key={activeTab === 'resume' ? JSON.stringify(resumeData.customization?.sectionOrder || []) : JSON.stringify(coverLetterData)}
              >
                {activeTab === 'resume' ? getPDFComponent() : getCoverLetterPDFComponent()}
              </PDFViewer>
            </div>
          </div>
        )}
      </main>

      {/* Import Modal - Only for Resume */}
      {activeTab === 'resume' && (
        <ImportModal
          isOpen={showImport}
          onClose={() => setShowImport(false)}
          resumeData={resumeData}
          setResumeData={setResumeData}
        />
      )}

      {/* Export Modal */}
      <ExportModal
        isOpen={showExport}
        onClose={() => setShowExport(false)}
        resumeData={activeTab === 'resume' ? resumeData : coverLetterData}
        getPDFComponent={activeTab === 'resume' ? getPDFComponent : getCoverLetterPDFComponent}
        getFileName={getFileName}
      />
    </div>
  )
}

export default App
