import React from 'react'

const SliderInput = ({ value, onChange, min, max, labels, color = 'blue' }) => {
  const colorClasses = {
    blue: 'accent-blue-400',
    green: 'accent-green-400',
    orange: 'accent-orange-400'
  }

  return (
    <div className="space-y-3">
      <div className="relative">
        <input
          type="range"
          min={min}
          max={max}
          value={value}
          onChange={(e) => onChange(parseInt(e.target.value))}
          className={`w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer ${colorClasses[color]}`}
          style={{
            background: `linear-gradient(to right, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0.6) ${((value - min) / (max - min)) * 100}%, rgba(255,255,255,0.2) ${((value - min) / (max - min)) * 100}%, rgba(255,255,255,0.2) 100%)`
          }}
        />
      </div>
      
      <div className="flex justify-between text-xs text-white/60">
        <span>{labels[0]}</span>
        <span>{labels[labels.length - 1]}</span>
      </div>
      
      <div className="text-center">
        <span className="text-white font-medium">
          {labels[value - 1]} ({value}/{max})
        </span>
      </div>
    </div>
  )
}

export default SliderInput