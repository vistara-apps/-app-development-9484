import React, { useState, useEffect } from 'react'
import FrameWrapper from './components/FrameWrapper'
import DashboardView from './components/DashboardView'
import CheckinForm from './components/CheckinForm'
import InsightsView from './components/InsightsView'
import ExerciseView from './components/ExerciseView'

function App() {
  const [currentView, setCurrentView] = useState('dashboard')
  const [userData, setUserData] = useState({
    farcasterId: 'user123', // Mock user ID
    checkins: [],
    lastCheckin: null
  })

  // Load data from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem('resilisense-data')
    if (savedData) {
      setUserData(JSON.parse(savedData))
    }
  }, [])

  // Save data to localStorage whenever userData changes
  useEffect(() => {
    localStorage.setItem('resilisense-data', JSON.stringify(userData))
  }, [userData])

  const addCheckin = (checkinData) => {
    const newCheckin = {
      id: Date.now().toString(),
      userId: userData.farcasterId,
      timestamp: new Date().toISOString(),
      ...checkinData
    }

    setUserData(prev => ({
      ...prev,
      checkins: [...prev.checkins, newCheckin],
      lastCheckin: new Date().toISOString()
    }))

    setCurrentView('dashboard')
  }

  const renderCurrentView = () => {
    switch (currentView) {
      case 'checkin':
        return <CheckinForm onSubmit={addCheckin} onCancel={() => setCurrentView('dashboard')} />
      case 'insights':
        return <InsightsView checkins={userData.checkins} onBack={() => setCurrentView('dashboard')} />
      case 'exercises':
        return <ExerciseView onBack={() => setCurrentView('dashboard')} />
      default:
        return (
          <DashboardView 
            userData={userData}
            onNavigate={setCurrentView}
          />
        )
    }
  }

  return (
    <FrameWrapper>
      {renderCurrentView()}
    </FrameWrapper>
  )
}

export default App