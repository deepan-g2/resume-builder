import { PDFViewer } from '@react-pdf/renderer'
import CoverLetterEditor from '../components/CoverLetterEditor'

export default function CoverLetterPage({
  coverLetterData,
  setCoverLetterData,
  resumeData,
  getCoverLetterPDFComponent,
  showEditor
}) {
  return (
    <div className={`grid grid-cols-1 gap-6 ${showEditor ? 'lg:grid-cols-2' : ''}`}>
      {/* Editor Panel */}
      {showEditor && (
        <div className="bg-white rounded-lg shadow-lg p-6 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 140px)' }}>
          <CoverLetterEditor
            coverLetterData={coverLetterData}
            setCoverLetterData={setCoverLetterData}
            resumeData={resumeData}
          />
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
          key={JSON.stringify(coverLetterData)}
        >
          {getCoverLetterPDFComponent()}
        </PDFViewer>
      </div>
    </div>
  )
}
