import React, { useState } from 'react'
import { ArrowLeft, Play, Pause, RotateCcw, Heart, Brain } from 'lucide-react'
import Button from './Button'

const ExerciseView = ({ onBack }) => {
  const [selectedExercise, setSelectedExercise] = useState(null)
  const [isActive, setIsActive] = useState(false)
  const [timer, setTimer] = useState(0)
  const [intervalId, setIntervalId] = useState(null)

  const exercises = [
    {
      id: 'breathing',
      title: 'Guided Breathing',
      description: 'A 2-minute breathing exercise to reduce stress and center yourself.',
      duration: 120,
      icon: Heart,
      instructions: [
        'Sit comfortably and close your eyes',
        'Breathe in slowly for 4 counts',
        'Hold your breath for 4 counts',
        'Exhale slowly for 6 counts',
        'Repeat this cycle'
      ]
    },
    {
      id: 'mindfulness',
      title: 'Quick Mindfulness',
      description: 'A 3-minute mindfulness exercise to improve focus and awareness.',
      duration: 180,
      icon: Brain,
      instructions: [
        'Find a quiet space and sit comfortably',
        'Focus on your breath naturally',
        'Notice thoughts without judgment',
        'Gently return focus to breathing',
        'Observe the present moment'
      ]
    }
  ]

  const startTimer = () => {
    const id = setInterval(() => {
      setTimer(prev => {
        if (prev >= selectedExercise.duration) {
          setIsActive(false)
          clearInterval(intervalId)
          return selectedExercise.duration
        }
        return prev + 1
      })
    }, 1000)
    setIntervalId(id)
    setIsActive(true)
  }

  const pauseTimer = () => {
    clearInterval(intervalId)
    setIsActive(false)
  }

  const resetTimer = () => {
    clearInterval(intervalId)
    setIsActive(false)
    setTimer(0)
  }

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const formatTimeRemaining = (total, current) => {
    const remaining = total - current
    return formatTime(remaining)
  }

  if (selectedExercise) {
    const progress = (timer / selectedExercise.duration) * 100
    const isComplete = timer >= selectedExercise.duration

    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center gap-3 text-white">
          <button
            onClick={() => {
              resetTimer()
              setSelectedExercise(null)
            }}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h2 className="text-xl font-medium">{selectedExercise.title}</h2>
            <p className="text-white/70 text-sm">{selectedExercise.description}</p>
          </div>
        </div>

        {/* Timer Display */}
        <div className="text-center space-y-4">
          <div className="relative w-32 h-32 mx-auto">
            <svg className="w-32 h-32 transform -rotate-90">
              <circle
                cx="64"
                cy="64"
                r="56"
                stroke="rgba(255,255,255,0.2)"
                strokeWidth="8"
                fill="none"
              />
              <circle
                cx="64"
                cy="64"
                r="56"
                stroke="white"
                strokeWidth="8"
                fill="none"
                strokeDasharray={`${2 * Math.PI * 56}`}
                strokeDashoffset={`${2 * Math.PI * 56 * (1 - progress / 100)}`}
                className="transition-all duration-1000"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-white">
                <div className="text-2xl font-semibold">
                  {formatTimeRemaining(selectedExercise.duration, timer)}
                </div>
                <div className="text-xs text-white/70">remaining</div>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="flex justify-center gap-4">
            <button
              onClick={isActive ? pauseTimer : startTimer}
              disabled={isComplete}
              className="p-3 bg-white/20 hover:bg-white/30 rounded-full transition-colors disabled:opacity-50"
            >
              {isActive ? (
                <Pause className="w-6 h-6 text-white" />
              ) : (
                <Play className="w-6 h-6 text-white" />
              )}
            </button>
            <button
              onClick={resetTimer}
              className="p-3 bg-white/20 hover:bg-white/30 rounded-full transition-colors"
            >
              <RotateCcw className="w-6 h-6 text-white" />
            </button>
          </div>
        </div>

        {/* Instructions */}
        <div className="glass-card rounded-lg p-4 space-y-3">
          <h3 className="text-white font-medium">Instructions</h3>
          <ul className="space-y-2">
            {selectedExercise.instructions.map((instruction, index) => (
              <li key={index} className="flex items-start gap-2 text-white/80 text-sm">
                <span className="w-5 h-5 bg-white/20 rounded-full flex items-center justify-center text-xs mt-0.5 flex-shrink-0">
                  {index + 1}
                </span>
                {instruction}
              </li>
            ))}
          </ul>
        </div>

        {/* Completion Message */}
        {isComplete && (
          <div className="text-center space-y-4">
            <div className="text-white">
              <div className="text-6xl mb-2">🎉</div>
              <h3 className="text-lg font-medium">Exercise Complete!</h3>
              <p className="text-sm text-white/70">Great job taking time for yourself</p>
            </div>
            <Button variant="primary" onClick={onBack} className="w-full">
              Back to Dashboard
            </Button>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3 text-white">
        <button
          onClick={onBack}
          className="p-2 hover:bg-white/10 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h2 className="text-xl font-medium">Quick Exercises</h2>
          <p className="text-white/70 text-sm">Short exercises to boost your resilience</p>
        </div>
      </div>

      {/* Exercise Options */}
      <div className="space-y-3">
        {exercises.map((exercise) => {
          const Icon = exercise.icon
          return (
            <button
              key={exercise.id}
              onClick={() => setSelectedExercise(exercise)}
              className="w-full glass-card rounded-lg p-4 text-left hover:bg-white/10 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/20 rounded-lg">
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-white font-medium">{exercise.title}</h3>
                  <p className="text-white/70 text-sm">{exercise.description}</p>
                  <p className="text-white/50 text-xs mt-1">
                    {Math.floor(exercise.duration / 60)} minutes
                  </p>
                </div>
              </div>
            </button>
          )
        })}
      </div>

      <div className="text-center text-white/60 text-xs">
        More exercises coming soon with premium features
      </div>
    </div>
  )
}

export default ExerciseView