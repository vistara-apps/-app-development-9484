import React from 'react'
import { Calendar, TrendingUp, Activity, Sparkles } from 'lucide-react'
import Button from './Button'
import StatsCard from './StatsCard'

const DashboardView = ({ userData, onNavigate }) => {
  const recentCheckins = userData.checkins.slice(-7)
  const hasCheckins = userData.checkins.length > 0
  
  const averageScores = hasCheckins ? {
    mood: Math.round(userData.checkins.reduce((sum, c) => sum + c.mood, 0) / userData.checkins.length * 10) / 10,
    sleep: Math.round(userData.checkins.reduce((sum, c) => sum + c.sleepQuality, 0) / userData.checkins.length * 10) / 10,
    stress: Math.round(userData.checkins.reduce((sum, c) => sum + c.stressLevel, 0) / userData.checkins.length * 10) / 10
  } : { mood: 0, sleep: 0, stress: 0 }

  const todayCheckin = userData.checkins.find(checkin => {
    const today = new Date().toDateString()
    const checkinDate = new Date(checkin.timestamp).toDateString()
    return today === checkinDate
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center text-white">
        <h1 className="text-2xl font-semibold mb-2">ResiliSense</h1>
        <p className="text-white/80 text-base leading-6">
          Track and boost your daily resilience
        </p>
      </div>

      {/* Quick Stats */}
      {hasCheckins && (
        <div className="grid grid-cols-3 gap-3">
          <StatsCard
            label="Mood"
            value={averageScores.mood}
            maxValue={5}
            color="blue"
          />
          <StatsCard
            label="Sleep"
            value={averageScores.sleep}
            maxValue={5}
            color="green"
          />
          <StatsCard
            label="Stress"
            value={averageScores.stress}
            maxValue={5}
            color="orange"
            inverted
          />
        </div>
      )}

      {/* Main Action */}
      <div className="text-center space-y-4">
        {!todayCheckin ? (
          <div className="space-y-3">
            <div className="text-white/90">
              <Calendar className="w-8 h-8 mx-auto mb-2" />
              <p className="text-lg font-medium">Ready for today's check-in?</p>
              <p className="text-sm text-white/70">Log your mood, sleep, and stress levels</p>
            </div>
            <Button
              variant="primary"
              onClick={() => onNavigate('checkin')}
              className="w-full"
            >
              Start Daily Check-in
            </Button>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="text-white/90">
              <Sparkles className="w-8 h-8 mx-auto mb-2 text-yellow-300" />
              <p className="text-lg font-medium">Check-in complete!</p>
              <p className="text-sm text-white/70">Great job staying consistent</p>
            </div>
            <Button
              variant="secondary"
              onClick={() => onNavigate('checkin')}
              className="w-full"
            >
              Update Today's Entry
            </Button>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="grid grid-cols-2 gap-3">
        <Button
          variant="secondary"
          onClick={() => onNavigate('insights')}
          disabled={!hasCheckins}
          className="flex items-center justify-center gap-2"
        >
          <TrendingUp className="w-4 h-4" />
          View Insights
        </Button>
        <Button
          variant="secondary"
          onClick={() => onNavigate('exercises')}
          className="flex items-center justify-center gap-2"
        >
          <Activity className="w-4 h-4" />
          Quick Exercise
        </Button>
      </div>

      {/* Recent Activity */}
      {hasCheckins && (
        <div className="space-y-3">
          <h3 className="text-white font-medium text-lg">Recent Activity</h3>
          <div className="space-y-2">
            {recentCheckins.slice(-3).reverse().map((checkin, index) => (
              <div key={checkin.id} className="glass-card rounded-md p-3">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-white/90">
                    {new Date(checkin.timestamp).toLocaleDateString()}
                  </span>
                  <div className="flex gap-3 text-white/70">
                    <span>Mood: {checkin.mood}/5</span>
                    <span>Sleep: {checkin.sleepQuality}/5</span>
                    <span>Stress: {checkin.stressLevel}/5</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Welcome Message for New Users */}
      {!hasCheckins && (
        <div className="text-center text-white/80 space-y-2">
          <p className="text-sm">Welcome to ResiliSense!</p>
          <p className="text-xs text-white/60">
            Start your resilience journey by completing your first daily check-in above.
          </p>
        </div>
      )}
    </div>
  )
}

export default DashboardView