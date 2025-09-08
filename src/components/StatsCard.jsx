import React from 'react'

const StatsCard = ({ label, value, maxValue, color, inverted = false }) => {
  const percentage = (value / maxValue) * 100
  const displayValue = inverted ? maxValue - value + 1 : value
  
  const colorClasses = {
    blue: 'text-blue-300',
    green: 'text-green-300',
    orange: 'text-orange-300'
  }

  return (
    <div className="glass-card rounded-lg p-3 text-center">
      <div className={`text-lg font-semibold ${colorClasses[color]}`}>
        {displayValue.toFixed(1)}
      </div>
      <div className="text-xs text-white/70">{label}</div>
      <div className="w-full bg-white/20 rounded-full h-1 mt-2">
        <div 
          className={`h-1 rounded-full bg-current ${colorClasses[color]}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  )
}

export default StatsCard