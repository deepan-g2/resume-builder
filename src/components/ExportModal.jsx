import { X, Download, FileJson, FileText, Code, FileType } from 'lucide-react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { exportAsJSON, exportAsText, exportAsHTML } from '../utils/exportUtils';
import { useNotification } from '../context/NotificationContext';

const ExportModal = ({ isOpen, onClose, resumeData, getPDFComponent, getFileName }) => {
  const { showSuccess, showError } = useNotification();

  if (!isOpen) return null;

  const handleExport = (format) => {
    try {
      const fileName = resumeData.personalInfo?.fullName?.replace(/\s+/g, '_') || 'resume';

      switch (format) {
        case 'json':
          exportAsJSON(resumeData, fileName);
          showSuccess('Resume exported as JSON!');
          break;
        case 'text':
          exportAsText(resumeData, fileName);
          showSuccess('Resume exported as text!');
          break;
        case 'html':
          exportAsHTML(resumeData, fileName);
          showSuccess('Resume exported as HTML!');
          break;
      }

      setTimeout(() => onClose(), 1500);
    } catch (error) {
      showError('Failed to export resume');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b bg-gradient-to-r from-green-50 to-white">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Export Resume</h2>
            <p className="text-sm text-gray-600 mt-1">Choose a format to export your resume data</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto" style={{ maxHeight: 'calc(90vh - 180px)' }}>
          <div className="space-y-4">
            <p className="text-gray-600 mb-6">
              Choose a format to export your resume. All formats preserve your data and can be used for backup or sharing.
            </p>

            {/* Export Options */}
            <div className="space-y-3">
              {/* PDF Export - Primary option */}
              <PDFDownloadLink
                document={getPDFComponent()}
                fileName={getFileName()}
                className="w-full flex items-center space-x-4 p-5 border-2 border-blue-500 bg-blue-50 rounded-lg hover:bg-blue-100 transition-all text-left group no-underline"
              >
                {({ loading }) => (
                  <>
                    <div className="p-3 bg-blue-600 rounded-lg group-hover:bg-blue-700 transition-colors">
                      <FileType className="w-8 h-8 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900 text-lg">Download as PDF</p>
                      <p className="text-sm text-gray-600 mt-1">
                        {loading ? 'Generating PDF document...' : 'Professional PDF format - ready to send to employers'}
                      </p>
                    </div>
                    <Download className="w-5 h-5 text-blue-600 group-hover:text-blue-700 transition-colors" />
                  </>
                )}
              </PDFDownloadLink>

              <button
                onClick={() => handleExport('json')}
                className="w-full flex items-center space-x-4 p-5 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all text-left group"
              >
                <div className="p-3 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">
                  <FileJson className="w-8 h-8 text-blue-600" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-900 text-lg">Export as JSON</p>
                  <p className="text-sm text-gray-600 mt-1">
                    Complete data export - perfect for backup or re-importing later
                  </p>
                </div>
                <Download className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
              </button>

              <button
                onClick={() => handleExport('text')}
                className="w-full flex items-center space-x-4 p-5 border-2 border-gray-200 rounded-lg hover:border-green-500 hover:bg-green-50 transition-all text-left group"
              >
                <div className="p-3 bg-green-100 rounded-lg group-hover:bg-green-200 transition-colors">
                  <FileText className="w-8 h-8 text-green-600" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-900 text-lg">Export as Text</p>
                  <p className="text-sm text-gray-600 mt-1">
                    Plain text format - easy to copy and paste anywhere
                  </p>
                </div>
                <Download className="w-5 h-5 text-gray-400 group-hover:text-green-600 transition-colors" />
              </button>

              <button
                onClick={() => handleExport('html')}
                className="w-full flex items-center space-x-4 p-5 border-2 border-gray-200 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition-all text-left group"
              >
                <div className="p-3 bg-purple-100 rounded-lg group-hover:bg-purple-200 transition-colors">
                  <Code className="w-8 h-8 text-purple-600" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-900 text-lg">Export as HTML</p>
                  <p className="text-sm text-gray-600 mt-1">
                    Web page format - view in browser or share online
                  </p>
                </div>
                <Download className="w-5 h-5 text-gray-400 group-hover:text-purple-600 transition-colors" />
              </button>
            </div>

            <div className="pt-6 border-t mt-6">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-blue-900">
                  <strong>💡 Tip:</strong> Use PDF for sending to employers. Use JSON to back up your data or switch between devices. HTML and Text formats are useful for copying content to other applications.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExportModal;
