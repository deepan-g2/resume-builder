import { useState, useEffect } from 'react'
import { CheckCircle, AlertCircle, AlertTriangle, TrendingUp, Target, Award, ChevronDown, ChevronUp } from 'lucide-react'
import { analyzeResume, getScoreColor, getScoreBgColor, getPriorityColor, industryKeywords } from '../utils/atsAnalyzer'

export default function ATSScore({ resumeData }) {
  const [industry, setIndustry] = useState('technology')
  const [analysis, setAnalysis] = useState(null)
  const [expanded, setExpanded] = useState(false)

  useEffect(() => {
    const result = analyzeResume(resumeData, industry)
    setAnalysis(result)
  }, [resumeData, industry])

  if (!analysis) return null

  const { totalScore, scores, keywordMatch, recommendations } = analysis

  // Group recommendations by priority
  const highPriority = recommendations.filter(r => r.priority === 'high')
  const mediumPriority = recommendations.filter(r => r.priority === 'medium')
  const lowPriority = recommendations.filter(r => r.priority === 'low')

  return (
    <div className="space-y-4">
      {/* Main Score Card */}
      <div className="bg-white rounded-lg shadow-md border-2 border-gray-200 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Target className="w-6 h-6 text-white" />
              <h3 className="text-lg font-bold text-white">ATS Compatibility Score</h3>
            </div>
            <div className={`text-4xl font-bold text-white`}>
              {totalScore}
              <span className="text-sm font-normal ml-1">/ 100</span>
            </div>
          </div>
        </div>

        {/* Score Bar */}
        <div className="px-6 py-3 bg-gray-50">
          <div className="relative w-full h-3 bg-gray-200 rounded-full overflow-hidden">
            <div
              className={`h-full transition-all duration-500 ${
                totalScore >= 80 ? 'bg-green-500' :
                totalScore >= 60 ? 'bg-yellow-500' :
                'bg-red-500'
              }`}
              style={{ width: `${totalScore}%` }}
            />
          </div>
          <div className="flex justify-between mt-2 text-xs text-gray-600">
            <span>Poor</span>
            <span>Fair</span>
            <span>Good</span>
            <span>Excellent</span>
          </div>
        </div>

        {/* Industry Selector */}
        <div className="px-6 py-4 border-b border-gray-200">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Target Industry
          </label>
          <select
            value={industry}
            onChange={(e) => setIndustry(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {Object.keys(industryKeywords).map(ind => (
              <option key={ind} value={ind}>
                {ind.charAt(0).toUpperCase() + ind.slice(1)}
              </option>
            ))}
          </select>
        </div>

        {/* Score Breakdown */}
        <div className="px-6 py-4 grid grid-cols-2 gap-4">
          <ScoreItem
            label="Formatting"
            score={scores.formatting}
            maxScore={25}
            icon={<CheckCircle className="w-5 h-5" />}
          />
          <ScoreItem
            label="Keywords"
            score={scores.keywords}
            maxScore={35}
            icon={<TrendingUp className="w-5 h-5" />}
          />
          <ScoreItem
            label="Content Quality"
            score={scores.content}
            maxScore={25}
            icon={<Award className="w-5 h-5" />}
          />
          <ScoreItem
            label="Completeness"
            score={scores.completeness}
            maxScore={15}
            icon={<Target className="w-5 h-5" />}
          />
        </div>

        {/* Keywords Found */}
        <div className="px-6 py-4 border-t border-gray-200">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-sm font-semibold text-gray-700">Keywords Found</h4>
            <span className="text-xs text-gray-500">
              {keywordMatch.technical.length + keywordMatch.soft.length} total
            </span>
          </div>
          <div className="space-y-2">
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-medium text-gray-600">Technical Skills</span>
                <span className="text-xs text-gray-500">{keywordMatch.technical.length}</span>
              </div>
              <div className="flex flex-wrap gap-1">
                {keywordMatch.technical.slice(0, 8).map((keyword, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full"
                  >
                    {keyword}
                  </span>
                ))}
                {keywordMatch.technical.length > 8 && (
                  <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                    +{keywordMatch.technical.length - 8} more
                  </span>
                )}
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-medium text-gray-600">Soft Skills</span>
                <span className="text-xs text-gray-500">{keywordMatch.soft.length}</span>
              </div>
              <div className="flex flex-wrap gap-1">
                {keywordMatch.soft.slice(0, 6).map((keyword, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full"
                  >
                    {keyword}
                  </span>
                ))}
                {keywordMatch.soft.length > 6 && (
                  <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                    +{keywordMatch.soft.length - 6} more
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Expand/Collapse Button */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="w-full px-6 py-3 bg-gray-50 hover:bg-gray-100 transition-colors flex items-center justify-between text-sm font-medium text-gray-700 border-t border-gray-200"
        >
          <span>{expanded ? 'Hide' : 'Show'} Detailed Recommendations</span>
          {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>

        {/* Recommendations (Expandable) */}
        {expanded && (
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 space-y-4">
            {/* High Priority */}
            {highPriority.length > 0 && (
              <div>
                <h4 className="text-sm font-semibold text-red-700 mb-2 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-2" />
                  Critical Issues ({highPriority.length})
                </h4>
                <div className="space-y-2">
                  {highPriority.map((rec, idx) => (
                    <RecommendationItem key={idx} recommendation={rec} />
                  ))}
                </div>
              </div>
            )}

            {/* Medium Priority */}
            {mediumPriority.length > 0 && (
              <div>
                <h4 className="text-sm font-semibold text-yellow-700 mb-2 flex items-center">
                  <AlertTriangle className="w-4 h-4 mr-2" />
                  Improvements ({mediumPriority.length})
                </h4>
                <div className="space-y-2">
                  {mediumPriority.map((rec, idx) => (
                    <RecommendationItem key={idx} recommendation={rec} />
                  ))}
                </div>
              </div>
            )}

            {/* Low Priority */}
            {lowPriority.length > 0 && (
              <div>
                <h4 className="text-sm font-semibold text-blue-700 mb-2 flex items-center">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  Suggestions ({lowPriority.length})
                </h4>
                <div className="space-y-2">
                  {lowPriority.map((rec, idx) => (
                    <RecommendationItem key={idx} recommendation={rec} />
                  ))}
                </div>
              </div>
            )}

            {/* Missing Keywords Suggestions */}
            {keywordMatch.missingTechnical.length > 0 && (
              <div className="pt-4 border-t border-gray-200">
                <h4 className="text-sm font-semibold text-gray-700 mb-2">
                  Suggested Keywords to Add
                </h4>
                <div className="flex flex-wrap gap-1">
                  {keywordMatch.missingTechnical.slice(0, 10).map((keyword, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-full"
                    >
                      {keyword}
                    </span>
                  ))}
                </div>
                <p className="text-xs text-gray-600 mt-2">
                  Consider incorporating these relevant {industry} keywords into your resume
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

// Score Item Component
function ScoreItem({ label, score, maxScore, icon }) {
  const percentage = (score / maxScore) * 100

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className={`${percentage >= 80 ? 'text-green-600' : percentage >= 60 ? 'text-yellow-600' : 'text-red-600'}`}>
            {icon}
          </span>
          <span className="text-sm font-medium text-gray-700">{label}</span>
        </div>
        <span className="text-sm font-semibold text-gray-900">
          {score}/{maxScore}
        </span>
      </div>
      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          className={`h-full transition-all duration-300 ${
            percentage >= 80 ? 'bg-green-500' :
            percentage >= 60 ? 'bg-yellow-500' :
            'bg-red-500'
          }`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  )
}

// Recommendation Item Component
function RecommendationItem({ recommendation }) {
  return (
    <div className={`px-3 py-2 rounded-lg ${getPriorityColor(recommendation.priority)}`}>
      <div className="flex items-start space-x-2">
        <span className="text-xs font-semibold uppercase mt-0.5">
          {recommendation.category}:
        </span>
        <span className="text-xs flex-1">
          {recommendation.message}
        </span>
      </div>
    </div>
  )
}
