import { useState, useEffect } from 'react'
import { Download, Save, FileText, Mail, Upload, Copy, Target, Palette, ChevronDown, Eye } from 'lucide-react'
import { PDFViewer, PDFDownloadLink } from '@react-pdf/renderer'
import Editor from './components/Editor'
import CoverLetterEditor from './components/CoverLetterEditor'
import ImportExportModal from './components/ImportExportModal'
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
  const [activeTab, setActiveTab] = useState('resume') // 'resume' or 'coverLetter'
  const [showImportExport, setShowImportExport] = useState(false)
  const [atsScore, setAtsScore] = useState(null)
  const [showColorPicker, setShowColorPicker] = useState(false)

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

  // Close color picker when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showColorPicker && !event.target.closest('.color-picker-container')) {
        setShowColorPicker(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [showColorPicker])

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

  const handleSave = () => {
    localStorage.setItem('resumeData', JSON.stringify(resumeData))
    showSuccess('Resume saved successfully!')
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
      <header className="bg-white shadow-sm sticky top-0 z-50 border-b border-gray-200">
        <div className="max-w-full mx-auto px-6 py-3">
          <div className="flex items-center justify-between gap-6">
            {/* Left Section: Branding + Tabs + ATS Score */}
            <div className="flex items-center gap-6">
              {/* Logo and Title */}
              <div className="flex items-center gap-3">
                <FileText className="w-7 h-7 text-blue-600" />
                <h1 className="text-xl font-bold text-gray-900">Resume Builder</h1>
              </div>

              {/* Tab Navigation */}
              <nav className="flex items-center gap-1 bg-gray-100 p-1 rounded-lg">
                <button
                  onClick={() => setActiveTab('resume')}
                  className={`flex items-center gap-2 px-4 py-1.5 rounded-md text-sm font-medium transition-all ${
                    activeTab === 'resume'
                      ? 'bg-white text-blue-600 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <FileText className="w-4 h-4" />
                  <span>Resume</span>
                </button>
                <button
                  onClick={() => setActiveTab('coverLetter')}
                  className={`flex items-center gap-2 px-4 py-1.5 rounded-md text-sm font-medium transition-all ${
                    activeTab === 'coverLetter'
                      ? 'bg-white text-blue-600 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <Mail className="w-4 h-4" />
                  <span>Cover Letter</span>
                </button>
              </nav>

              {/* ATS Score Badge - Only show on Resume tab */}
              {activeTab === 'resume' && atsScore !== null && (
                <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg ${
                  atsScore >= 80 ? 'bg-green-50 text-green-700' :
                  atsScore >= 60 ? 'bg-yellow-50 text-yellow-700' :
                  'bg-red-50 text-red-700'
                }`}>
                  <Target className="w-4 h-4" />
                  <div className="flex items-baseline gap-1">
                    <span className="text-xs font-medium">ATS Score</span>
                    <span className="text-lg font-bold">{atsScore}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Right Section: Actions */}
            <div className="flex items-center gap-2">
              {/* Template Selector */}
              <select
                value={template}
                onChange={(e) => setTemplate(e.target.value)}
                className="px-3 py-2 text-sm border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
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

              {/* Color Picker Dropdown */}
              <div className="relative color-picker-container">
                <button
                  onClick={() => setShowColorPicker(!showColorPicker)}
                  className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <Palette className="w-4 h-4" />
                  <span className="w-4 h-4 rounded-full border-2 border-white shadow-sm" style={{ backgroundColor: resumeData.customization?.accentColor || "#2563eb" }} />
                  <ChevronDown className="w-3 h-3" />
                </button>

                {/* Color Picker Dropdown Menu */}
                {showColorPicker && (
                  <div className="absolute right-0 mt-2 p-3 bg-white rounded-lg shadow-lg border border-gray-200 z-50 min-w-[240px]">
                    <div className="flex flex-col gap-2">
                      <span className="text-xs font-semibold text-gray-700 mb-1">Choose Color</span>
                      <div className="flex gap-2">
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
                            onClick={() => {
                              setResumeData({
                                ...resumeData,
                                customization: {
                                  ...resumeData.customization,
                                  accentColor: color
                                }
                              });
                              setShowColorPicker(false);
                            }}
                            className={`w-8 h-8 rounded-full border-2 hover:scale-110 transition-transform ${
                              (resumeData.customization?.accentColor || "#2563eb") === color
                                ? 'border-gray-900 ring-2 ring-offset-2 ring-gray-900'
                                : 'border-gray-300'
                            }`}
                            style={{ backgroundColor: color }}
                            title={name}
                          />
                        ))}
                      </div>
                      <div className="flex items-center gap-2 pt-2 border-t border-gray-200">
                        <span className="text-xs text-gray-600">Custom:</span>
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
                          className="w-full h-8 border border-gray-300 rounded cursor-pointer"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Separator */}
              <div className="h-8 w-px bg-gray-300" />

              {/* Resume-specific actions */}
              {activeTab === 'resume' && (
                <>
                  <button
                    onClick={() => setShowImportExport(true)}
                    className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                    title="Import/Export"
                  >
                    <Upload className="w-4 h-4" />
                  </button>

                  <button
                    onClick={handleDuplicate}
                    className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                    title="Duplicate"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </>
              )}

              {/* View Toggle */}
              <button
                onClick={() => setShowEditor(!showEditor)}
                className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                title={showEditor ? 'Preview Only' : 'Show Editor'}
              >
                <Eye className="w-4 h-4" />
              </button>

              {/* Separator */}
              <div className="h-8 w-px bg-gray-300" />

              {/* Primary Actions */}
              <button
                onClick={handleSave}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 transition-colors shadow-sm"
              >
                <Save className="w-4 h-4" />
                <span>Save</span>
              </button>

              <PDFDownloadLink
                document={activeTab === 'resume' ? getPDFComponent() : getCoverLetterPDFComponent()}
                fileName={getFileName()}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors shadow-sm no-underline"
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
                className="px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                title="Reset"
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-full mx-auto p-6">
        <div className={`grid grid-cols-1 gap-6 ${showEditor ? 'lg:grid-cols-2' : ''}`}>
          {/* Editor Panel */}
          {showEditor && (
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
          )}

          {/* Preview Panel - PDF Viewer */}
          <div className={`bg-white rounded-lg shadow-lg overflow-hidden ${showEditor ? '' : 'mx-auto w-full max-w-4xl'}`} style={{ height: 'calc(100vh - 140px)' }}>
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
      </main>

      {/* Import/Export Modal - Only for Resume */}
      {activeTab === 'resume' && (
        <ImportExportModal
          isOpen={showImportExport}
          onClose={() => setShowImportExport(false)}
          resumeData={resumeData}
          setResumeData={setResumeData}
          onDuplicate={handleDuplicate}
        />
      )}
    </div>
  )
}

export default App
