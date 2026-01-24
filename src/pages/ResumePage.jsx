import { PDFViewer } from '@react-pdf/renderer'
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

          {/* Customization Section */}
          <CustomizationEditor
            resumeData={resumeData}
            setResumeData={setResumeData}
          />

          {/* Resume Content Editor */}
          <div className="bg-white rounded-lg shadow-md p-6 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 500px)' }}>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Resume Content</h2>
            <Editor resumeData={resumeData} setResumeData={setResumeData} />
          </div>
        </div>
      )}

      {/* Preview Panel - PDF Viewer */}
      <div
        className={`pdf-viewer-container bg-white rounded-lg shadow-lg overflow-hidden ${showEditor ? '' : 'mx-auto w-full max-w-4xl'}`}
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
