import { useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import ATSScore from '../components/ATSScore'

export default function ATSDetailsPage({ resumeData }) {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/')}
              className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Resume
            </button>
            <h1 className="text-xl font-bold text-gray-900">ATS Analysis Details</h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto p-6">
        <div className="space-y-6">
          {/* Description */}
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">
              What is ATS Compatibility?
            </h2>
            <p className="text-sm text-gray-600">
              ATS (Applicant Tracking System) compatibility measures how well your resume will be
              parsed and understood by automated recruitment systems. A higher score means better
              chances of your resume reaching human recruiters.
            </p>
          </div>

          {/* Full ATS Score Component */}
          <ATSScore resumeData={resumeData} />

          {/* Tips Section */}
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Improving Your ATS Score
            </h2>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-bold">
                  1
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-900">Use Industry Keywords</h3>
                  <p className="text-xs text-gray-600 mt-1">
                    Include relevant technical and soft skills that match your target industry
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-bold">
                  2
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-900">Keep Formatting Simple</h3>
                  <p className="text-xs text-gray-600 mt-1">
                    Avoid complex layouts, tables, and graphics that ATS systems can't parse
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-bold">
                  3
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-900">Quantify Achievements</h3>
                  <p className="text-xs text-gray-600 mt-1">
                    Use numbers and metrics to demonstrate your impact and results
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-bold">
                  4
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-900">Complete All Sections</h3>
                  <p className="text-xs text-gray-600 mt-1">
                    Fill out all relevant sections including contact info, experience, and education
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
