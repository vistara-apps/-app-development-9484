import React from 'react'
import { ArrowLeft, TrendingUp, TrendingDown, Target, Calendar } from 'lucide-react'
import Button from './Button'
import InsightCard from './InsightCard'

const InsightsView = ({ checkins, onBack }) => {
  if (checkins.length < 3) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-3 text-white">
          <button
            onClick={onBack}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h2 className="text-xl font-medium">Insights</h2>
        </div>

        <div className="text-center text-white/80 space-y-4">
          <Calendar className="w-16 h-16 mx-auto text-white/50" />
          <div>
            <h3 className="text-lg font-medium text-white">Need More Data</h3>
            <p className="text-sm">Complete at least 3 check-ins to see personalized insights</p>
          </div>
          <Button variant="primary" onClick={onBack}>
            Back to Dashboard
          </Button>
        </div>
      </div>
    )
  }

  // Calculate insights
  const recentCheckins = checkins.slice(-7)
  const averages = {
    mood: recentCheckins.reduce((sum, c) => sum + c.mood, 0) / recentCheckins.length,
    sleep: recentCheckins.reduce((sum, c) => sum + c.sleepQuality, 0) / recentCheckins.length,
    stress: recentCheckins.reduce((sum, c) => sum + c.stressLevel, 0) / recentCheckins.length
  }

  // Generate insights
  const insights = []

  // Sleep-Mood correlation
  const sleepMoodCorrelation = recentCheckins.reduce((acc, checkin) => {
    if (checkin.sleepQuality >= 4 && checkin.mood >= 4) acc.good++
    if (checkin.sleepQuality <= 2 && checkin.mood <= 2) acc.poor++
    return acc
  }, { good: 0, poor: 0 })

  if (sleepMoodCorrelation.good > sleepMoodCorrelation.poor) {
    insights.push({
      type: 'positive',
      title: 'Sleep Boosts Your Mood',
      description: 'Your mood tends to be higher on days when you sleep well.',
      recommendation: 'Prioritize getting 7-8 hours of quality sleep.',
      icon: TrendingUp
    })
  }

  // Stress patterns
  if (averages.stress > 3.5) {
    insights.push({
      type: 'negative',
      title: 'Elevated Stress Levels',
      description: 'Your stress levels have been above average recently.',
      recommendation: 'Try the guided breathing exercise or short meditation.',
      icon: TrendingDown
    })
  } else if (averages.stress < 2.5) {
    insights.push({
      type: 'positive',
      title: 'Great Stress Management',
      description: 'You\'re keeping stress levels low. Keep it up!',
      recommendation: 'Continue your current stress management strategies.',
      icon: Target
    })
  }

  // Overall resilience
  const overallScore = (averages.mood + averages.sleep + (5 - averages.stress)) / 3
  if (overallScore >= 3.5) {
    insights.push({
      type: 'positive',
      title: 'Strong Resilience',
      description: 'Your overall resilience metrics are looking good.',
      recommendation: 'Keep maintaining your healthy habits.',
      icon: TrendingUp
    })
  }

  // Fallback insight if none generated
  if (insights.length === 0) {
    insights.push({
      type: 'neutral',
      title: 'Building Your Baseline',
      description: 'You\'re establishing your personal resilience patterns.',
      recommendation: 'Continue daily check-ins to get more detailed insights.',
      icon: Target
    })
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
          <h2 className="text-xl font-medium">Your Insights</h2>
          <p className="text-white/70 text-sm">Based on your recent check-ins</p>
        </div>
      </div>

      {/* Weekly Averages */}
      <div className="glass-card rounded-lg p-4 space-y-3">
        <h3 className="text-white font-medium">7-Day Averages</h3>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl font-semibold text-blue-300">
              {averages.mood.toFixed(1)}
            </div>
            <div className="text-xs text-white/70">Mood</div>
          </div>
          <div>
            <div className="text-2xl font-semibold text-green-300">
              {averages.sleep.toFixed(1)}
            </div>
            <div className="text-xs text-white/70">Sleep</div>
          </div>
          <div>
            <div className="text-2xl font-semibold text-orange-300">
              {averages.stress.toFixed(1)}
            </div>
            <div className="text-xs text-white/70">Stress</div>
          </div>
        </div>
      </div>

      {/* Insights */}
      <div className="space-y-3">
        <h3 className="text-white font-medium">Personalized Insights</h3>
        {insights.map((insight, index) => (
          <InsightCard key={index} {...insight} />
        ))}
      </div>

      {/* Back Button */}
      <Button variant="secondary" onClick={onBack} className="w-full">
        Back to Dashboard
      </Button>
    </div>
  )
}

export default InsightsView