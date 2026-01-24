import { useState } from 'react'
import { PDFViewer } from '@react-pdf/renderer'
import { ChevronDown, ChevronUp } from 'lucide-react'
import Editor from '../components/Editor'
import CustomizationEditor from '../components/CustomizationEditor'
import ATSScoreBadge from '../components/ATSScoreBadge'

export default function ResumePage({
  resumeData,
  setResumeData,
  atsScore,
  getPDFComponent,
  showEditor
}) {
  const [showCustomization, setShowCustomization] = useState(false)

  return (
    <div className={`grid grid-cols-1 gap-6 ${showEditor ? 'lg:grid-cols-2' : ''}`}>
      {/* Editor Panel */}
      {showEditor && (
        <div className="space-y-6">
          {/* ATS Score Badge Card */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">ATS Compatibility</h2>
            <ATSScoreBadge score={atsScore} />
            <p className="text-xs text-gray-500 mt-3">
              Click to view detailed analysis and recommendations
            </p>
          </div>

          {/* Customization Section - Collapsible */}
          <div className="bg-white rounded-lg shadow-md">
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

          {/* Resume Content Editor */}
          <div className="bg-white rounded-lg shadow-md p-6 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 500px)' }}>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Resume Content</h2>
            <Editor resumeData={resumeData} setResumeData={setResumeData} />
          </div>
        </div>
      )}

      {/* Preview Panel - PDF Viewer */}
      <div
        className={`bg-white rounded-lg shadow-lg overflow-hidden ${showEditor ? '' : 'mx-auto w-full max-w-4xl'}`}
        style={{ height: 'calc(100vh - 140px)' }}
      >
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
  )
}
