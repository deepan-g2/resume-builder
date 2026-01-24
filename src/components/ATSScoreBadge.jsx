import { useNavigate } from 'react-router-dom'
import { Target, ChevronRight } from 'lucide-react'

export default function ATSScoreBadge({ score }) {
  const navigate = useNavigate()

  const getScoreInfo = () => {
    if (score >= 80) {
      return {
        color: 'text-green-700',
        bgColor: 'bg-green-50',
        borderColor: 'border-green-200',
        label: 'Excellent'
      }
    } else if (score >= 60) {
      return {
        color: 'text-yellow-700',
        bgColor: 'bg-yellow-50',
        borderColor: 'border-yellow-200',
        label: 'Good'
      }
    } else {
      return {
        color: 'text-red-700',
        bgColor: 'bg-red-50',
        borderColor: 'border-red-200',
        label: 'Needs Work'
      }
    }
  }

  const { color, bgColor, borderColor, label } = getScoreInfo()

  return (
    <button
      onClick={() => navigate('/ats-details')}
      className={`flex items-center gap-3 px-4 py-3 rounded-lg border-2 ${bgColor} ${borderColor} hover:shadow-md transition-all group`}
    >
      <Target className={`w-5 h-5 ${color}`} />
      <div className="flex flex-col items-start">
        <span className="text-xs font-medium text-gray-600">ATS Score</span>
        <div className="flex items-baseline gap-2">
          <span className={`text-2xl font-bold ${color}`}>{score}</span>
          <span className={`text-xs font-medium ${color}`}>/ 100</span>
          <span className={`text-xs px-2 py-0.5 rounded-full ${bgColor} ${color} font-semibold`}>
            {label}
          </span>
        </div>
      </div>
      <ChevronRight className={`w-4 h-4 ${color} ml-2 group-hover:translate-x-1 transition-transform`} />
    </button>
  )
}
