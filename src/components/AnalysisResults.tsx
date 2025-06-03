import { Shield, AlertTriangle, Clock } from 'lucide-react'

type ThreatLevel = 'high' | 'medium' | 'low'
type SuspiciousActivity = {
  description: string
  threatLevel: ThreatLevel
  timestamp: string
}

type AnalysisResult = {
  trustScore: number
  starRating: number
  suspiciousActivities: SuspiciousActivity[]
}

interface AnalysisResultsProps {
  result: AnalysisResult
}

export function AnalysisResults({ result }: AnalysisResultsProps) {
  const getThreatLevelColor = (level: ThreatLevel) => {
    switch (level) {
      case 'high':
        return 'text-red-600 bg-red-50 border-red-200'
      case 'medium':
        return 'text-yellow-600 bg-yellow-50 border-yellow-200'
      case 'low':
        return 'text-blue-600 bg-blue-50 border-blue-200'
    }
  }

  const getThreatLevelIcon = (level: ThreatLevel) => {
    switch (level) {
      case 'high':
        return <AlertTriangle className="w-4 h-4" />
      case 'medium':
        return <Clock className="w-4 h-4" />
      case 'low':
        return <Shield className="w-4 h-4" />
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getThreatLevelLabel = (level: ThreatLevel) => {
    switch (level) {
      case 'high':
        return 'Critical'
      case 'medium':
        return 'Warning'
      case 'low':
        return 'Notice'
    }
  }

  return (
    <div className='space-y-6 bg-white p-6 rounded-xl shadow-lg border border-gray-100'>
      {/* Trust Metrics */}
      <div className='flex justify-between items-center'>
        <div className='space-y-1'>
          <p className='text-sm font-medium text-gray-600'>Trust Score</p>
          <div className='flex items-baseline space-x-2'>
            <p className='text-3xl font-bold text-blue-600'>{result.trustScore}%</p>
            <div className='w-24 h-2 bg-gray-100 rounded-full overflow-hidden'>
              <div 
                className='h-full bg-blue-600 rounded-full transition-all duration-500'
                style={{ width: `${result.trustScore}%` }}
              />
            </div>
          </div>
        </div>
        <div className='space-y-1 text-right'>
          <p className='text-sm font-medium text-gray-600'>Safety Rating</p>
          <div className='flex items-center space-x-1'>
            {[...Array(4)].map((_, i) => (
              <Shield 
                key={i} 
                className={`w-6 h-6 transition-all duration-300 ${
                  i < result.starRating 
                    ? 'text-blue-500 transform hover:scale-110 fill-current' 
                    : 'text-gray-200'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Suspicious Activities */}
      <div className='space-y-2'>
        <h3 className='font-semibold text-gray-800 flex items-center space-x-2 text-sm'>
          <AlertTriangle className="w-4 h-4 text-gray-600" />
          <span>Suspicious Activities</span>
        </h3>
        <div className='space-y-2'>
          {result.suspiciousActivities.map((activity, index) => (
            <div 
              key={index}
              className={`p-2 rounded-lg border ${getThreatLevelColor(activity.threatLevel)} flex items-start space-x-2 transition-all duration-200 hover:shadow-md`}
            >
              <div className='mt-0.5'>
                {getThreatLevelIcon(activity.threatLevel)}
              </div>
              <div className='flex-1 min-w-0'>
                <div className='flex items-center justify-between'>
                  <p className='text-xs font-medium text-gray-500 uppercase tracking-wide'>
                    {getThreatLevelLabel(activity.threatLevel)}
                  </p>
                  <p className='text-xs text-gray-500'>
                    {formatDate(activity.timestamp)}
                  </p>
                </div>
                <p className='text-sm font-medium mt-0.5 truncate'>{activity.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
} 