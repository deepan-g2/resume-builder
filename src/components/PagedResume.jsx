import Preview from './Preview'

export default function PagedResume({ resumeData, template }) {
  return (
    <div className="relative">
      {/* Page 1 container */}
      <div className="mx-auto bg-white shadow-lg relative" style={{ width: '210mm', minHeight: '297mm' }}>
        <Preview resumeData={resumeData} template={template} />

        {/* Page 1 boundary line - shows where page 1 ends */}
        <div
          className="absolute left-0 right-0 pointer-events-none"
          style={{ top: '297mm' }}
        >
          <div className="relative h-0">
            <div className="absolute left-0 right-0 border-t-2 border-dashed border-red-500"></div>
            <div className="absolute right-4 -top-3 bg-red-500 text-white px-3 py-1 text-xs font-semibold rounded">
              ← Page 1 ends here
            </div>
          </div>
        </div>
      </div>

      {/* Page number indicator */}
      <div className="text-center py-3 text-sm font-medium text-gray-600">
        Page 1 (Content below this line will be on Page 2)
      </div>

      {/* Page break separator */}
      <div className="relative h-12 flex items-center justify-center my-4">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t-4 border-dashed border-red-400"></div>
        </div>
        <span className="relative bg-gray-50 px-6 py-2 text-sm font-bold text-red-600 border-2 border-red-400 rounded-lg shadow-md">
          ✂️ PAGE BREAK - CONTENT BELOW APPEARS ON PAGE 2
        </span>
      </div>

      {/* Note about page breaks */}
      <div className="text-center text-xs text-gray-500 italic mb-4">
        Sections are kept together - if a section doesn't fit on Page 1, it moves entirely to Page 2
      </div>
    </div>
  )
}
