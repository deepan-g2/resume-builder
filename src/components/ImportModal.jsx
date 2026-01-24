import { useState } from 'react';
import { X, Upload, FileUp, Linkedin } from 'lucide-react';
import { parseDOCX, parsePDF } from '../utils/documentParser';
import { parseLinkedInData, getLinkedInImportInstructions } from '../utils/linkedinImport';
import { importFromJSON } from '../utils/resumeManager';
import { useNotification } from '../context/NotificationContext';

const ImportModal = ({ isOpen, onClose, resumeData, setResumeData }) => {
  const { showSuccess, showError } = useNotification();
  const [importMethod, setImportMethod] = useState('file');
  const [textInput, setTextInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen) return null;

  const handleFileImport = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsProcessing(true);

    try {
      let parsedData = null;

      if (file.type === 'application/pdf') {
        parsedData = await parsePDF(file);
        showSuccess('PDF imported successfully!');
      } else if (file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
        parsedData = await parseDOCX(file);
        showSuccess('DOCX imported successfully!');
      } else if (file.type === 'application/json') {
        const text = await file.text();
        parsedData = importFromJSON(text);
        showSuccess('JSON imported successfully!');
      } else {
        showError('Unsupported file type. Please use PDF, DOCX, or JSON.');
        setIsProcessing(false);
        return;
      }

      if (parsedData) {
        // Merge with current customization settings or use defaults
        const mergedData = {
          ...parsedData,
          customization: resumeData.customization || {
            accentColor: "#2563eb",
            fontFamily: "Helvetica",
            fontSize: 11,
            lineSpacing: 1.5,
            paragraphSpacing: 12,
            pageMargin: 40,
            showPageBorder: false,
            borderWidth: 2,
            borderColor: "#e5e7eb",
            sectionOrder: ["summary", "experience", "projects", "education", "certifications", "skills", "languages", "volunteer", "awards"]
          },
          sectionVisibility: resumeData.sectionVisibility || {
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
        };
        setResumeData(mergedData);
        setTimeout(() => onClose(), 1500);
      }
    } catch (error) {
      console.error('Import error:', error);
      const errorMsg = error.message || 'Failed to import file. Please try a different file.';
      showError(errorMsg);
    } finally {
      setIsProcessing(false);
      e.target.value = '';
    }
  };

  const handleLinkedInImport = () => {
    if (!textInput.trim()) {
      showError('Please paste LinkedIn JSON data');
      return;
    }

    setIsProcessing(true);
    try {
      const parsedData = parseLinkedInData(textInput);
      if (parsedData) {
        // Merge with current customization settings or use defaults
        const mergedData = {
          ...parsedData,
          customization: resumeData.customization || {
            accentColor: "#2563eb",
            fontFamily: "Helvetica",
            fontSize: 11,
            lineSpacing: 1.5,
            paragraphSpacing: 12,
            pageMargin: 40,
            showPageBorder: false,
            borderWidth: 2,
            borderColor: "#e5e7eb",
            sectionOrder: ["summary", "experience", "projects", "education", "certifications", "skills", "languages", "volunteer", "awards"]
          },
          sectionVisibility: resumeData.sectionVisibility || {
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
        };
        setResumeData(mergedData);
        showSuccess('LinkedIn data imported successfully!');
        setTextInput('');
        setTimeout(() => onClose(), 1500);
      } else {
        showError('Failed to parse LinkedIn data. Please ensure you pasted valid JSON.');
      }
    } catch (error) {
      console.error('LinkedIn import error:', error);
      showError(error.message || 'Failed to import LinkedIn data. Please check the format.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b bg-gradient-to-r from-blue-50 to-white">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Import Resume</h2>
            <p className="text-sm text-gray-600 mt-1">Import your existing resume from various formats</p>
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
          <div className="space-y-6">
            {/* Import Methods */}
            <div className="flex space-x-2">
              <button
                onClick={() => setImportMethod('file')}
                className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
                  importMethod === 'file'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <FileUp className="w-4 h-4 inline mr-2" />
                File Upload
              </button>
              <button
                onClick={() => setImportMethod('linkedin')}
                className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
                  importMethod === 'linkedin'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Linkedin className="w-4 h-4 inline mr-2" />
                LinkedIn
              </button>
            </div>

            {importMethod === 'file' ? (
              <div>
                <h3 className="text-lg font-semibold mb-3">Import from File</h3>
                <p className="text-gray-600 mb-2">
                  Upload your resume in PDF, DOCX, or JSON format. We'll automatically extract the information.
                </p>
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4">
                  <p className="text-sm text-yellow-800">
                    <strong>Note:</strong> PDF import requires internet connection. For best results, use DOCX or JSON format. Always review imported data.
                  </p>
                </div>

                <label className="block">
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-500 transition-colors cursor-pointer">
                    <FileUp className="w-12 h-12 mx-auto mb-3 text-gray-400" />
                    <p className="text-gray-700 font-medium mb-1">
                      Click to upload or drag and drop
                    </p>
                    <p className="text-sm text-gray-500">PDF, DOCX, or JSON (max 10MB)</p>
                  </div>
                  <input
                    type="file"
                    accept=".pdf,.docx,.json"
                    onChange={handleFileImport}
                    disabled={isProcessing}
                    className="hidden"
                  />
                </label>

                {isProcessing && (
                  <div className="mt-4 text-center">
                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                    <p className="mt-2 text-gray-600">Processing file...</p>
                  </div>
                )}
              </div>
            ) : (
              <div>
                <h3 className="text-lg font-semibold mb-3">Import from LinkedIn</h3>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                  <p className="text-sm text-blue-900 whitespace-pre-line">
                    {getLinkedInImportInstructions()}
                  </p>
                </div>

                <textarea
                  value={textInput}
                  onChange={(e) => setTextInput(e.target.value)}
                  placeholder="Paste your LinkedIn profile JSON data here..."
                  className="w-full h-48 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm"
                  disabled={isProcessing}
                />

                <button
                  onClick={handleLinkedInImport}
                  disabled={isProcessing || !textInput.trim()}
                  className="mt-4 w-full py-2 px-4 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isProcessing ? 'Importing...' : 'Import LinkedIn Data'}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImportModal;
