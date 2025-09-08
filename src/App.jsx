import React, { useState, useEffect } from 'react'
import FrameWrapper from './components/FrameWrapper'
import DashboardView from './components/DashboardView'
import CheckinForm from './components/CheckinForm'
import InsightsView from './components/InsightsView'
import ExerciseView from './components/ExerciseView'
import PremiumView from './components/PremiumView'
import baseService from './services/baseService'
import farcasterService from './services/farcasterService'
import premiumService from './services/premiumService'

function App() {
  const [currentView, setCurrentView] = useState('dashboard')
  const [userData, setUserData] = useState({
    farcasterId: null,
    checkins: [],
    lastCheckin: null
  })
  const [isLoading, setIsLoading] = useState(true)
  const [services, setServices] = useState({
    base: null,
    farcaster: null,
    premium: null
  })

  // Initialize services and load data on mount
  useEffect(() => {
    const initializeApp = async () => {
      try {
        // Initialize all services
        const [baseInit, farcasterInit, premiumInit] = await Promise.all([
          baseService.initialize(),
          farcasterService.initialize(),
          premiumService.initialize()
        ])

        setServices({
          base: baseService,
          farcaster: farcasterService,
          premium: premiumService
        })

        // Get user identity from Farcaster
        const userProfile = farcasterService.getUserProfile()
        const farcasterId = userProfile?.fid || 'demo_user_' + Date.now()

        // Load existing data or create new user data
        const savedData = localStorage.getItem('resilisense-data')
        if (savedData) {
          const parsedData = JSON.parse(savedData)
          setUserData({
            ...parsedData,
            farcasterId: farcasterId // Update with current user
          })
        } else {
          setUserData({
            farcasterId: farcasterId,
            checkins: [],
            lastCheckin: null
          })
        }

        console.log('App initialized successfully', {
          base: baseInit,
          farcaster: farcasterInit,
          premium: premiumInit,
          userProfile
        })
      } catch (error) {
        console.error('Failed to initialize app:', error)
        // Fallback to basic functionality
        setUserData({
          farcasterId: 'fallback_user_' + Date.now(),
          checkins: [],
          lastCheckin: null
        })
      } finally {
        setIsLoading(false)
      }
    }

    initializeApp()
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
    if (isLoading) {
      return (
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center text-white">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-4"></div>
            <p>Initializing ResiliSense...</p>
          </div>
        </div>
      )
    }

    switch (currentView) {
      case 'checkin':
        return (
          <CheckinForm 
            onSubmit={addCheckin} 
            onCancel={() => setCurrentView('dashboard')}
            services={services}
          />
        )
      case 'insights':
        return (
          <InsightsView 
            checkins={userData.checkins} 
            onBack={() => setCurrentView('dashboard')}
            services={services}
          />
        )
      case 'exercises':
        return (
          <ExerciseView 
            onBack={() => setCurrentView('dashboard')}
            services={services}
          />
        )
      case 'premium':
        return (
          <PremiumView 
            onBack={() => setCurrentView('dashboard')}
            services={services}
          />
        )
      default:
        return (
          <DashboardView 
            userData={userData}
            onNavigate={setCurrentView}
            services={services}
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
