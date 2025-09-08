import React, { useState } from 'react'
import { ArrowLeft, Smile, Moon, Zap } from 'lucide-react'
import Button from './Button'
import SliderInput from './SliderInput'

const CheckinForm = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    mood: 3,
    sleepQuality: 3,
    stressLevel: 3
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(formData)
  }

  const updateField = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3 text-white">
        <button
          onClick={onCancel}
          className="p-2 hover:bg-white/10 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h2 className="text-xl font-medium">Daily Check-in</h2>
          <p className="text-white/70 text-sm">How are you feeling today?</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Mood */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-white">
            <Smile className="w-5 h-5" />
            <label className="font-medium">Mood</label>
          </div>
          <SliderInput
            value={formData.mood}
            onChange={(value) => updateField('mood', value)}
            min={1}
            max={5}
            labels={['Very Low', 'Low', 'Neutral', 'Good', 'Excellent']}
            color="blue"
          />
        </div>

        {/* Sleep Quality */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-white">
            <Moon className="w-5 h-5" />
            <label className="font-medium">Sleep Quality</label>
          </div>
          <SliderInput
            value={formData.sleepQuality}
            onChange={(value) => updateField('sleepQuality', value)}
            min={1}
            max={5}
            labels={['Very Poor', 'Poor', 'Fair', 'Good', 'Excellent']}
            color="green"
          />
        </div>

        {/* Stress Level */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-white">
            <Zap className="w-5 h-5" />
            <label className="font-medium">Stress Level</label>
          </div>
          <SliderInput
            value={formData.stressLevel}
            onChange={(value) => updateField('stressLevel', value)}
            min={1}
            max={5}
            labels={['Very Low', 'Low', 'Moderate', 'High', 'Very High']}
            color="orange"
          />
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          variant="primary"
          className="w-full"
        >
          Log Entry
        </Button>
      </form>
    </div>
  )
}

export default CheckinForm