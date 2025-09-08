import React from 'react'

const InsightCard = ({ type, title, description, recommendation, icon: Icon }) => {
  const typeClasses = {
    positive: 'border-green-400/30 bg-green-400/10',
    negative: 'border-red-400/30 bg-red-400/10',
    neutral: 'border-blue-400/30 bg-blue-400/10'
  }

  const iconClasses = {
    positive: 'text-green-400',
    negative: 'text-red-400',
    neutral: 'text-blue-400'
  }

  return (
    <div className={`glass-card rounded-lg p-4 border ${typeClasses[type]}`}>
      <div className="flex items-start gap-3">
        <div className={`p-2 rounded-lg bg-white/10 ${iconClasses[type]}`}>
          <Icon className="w-4 h-4" />
        </div>
        <div className="flex-1 space-y-2">
          <h4 className="text-white font-medium text-sm">{title}</h4>
          <p className="text-white/80 text-xs">{description}</p>
          <p className="text-white/60 text-xs italic">{recommendation}</p>
        </div>
      </div>
    </div>
  )
}

export default InsightCard