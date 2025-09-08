/**
 * FarcasterService - Manages user identity and social features
 */
class FarcasterService {
  constructor() {
    this.isInitialized = false
    this.userProfile = null
    this.hubApiUrl = 'https://hub-api.neynar.com' // Demo endpoint
  }

  async initialize() {
    try {
      // Try to get user profile from frame context or localStorage
      this.userProfile = this.loadUserProfile()
      
      if (!this.userProfile) {
        // Generate demo profile if no real profile available
        this.userProfile = this.generateDemoProfile()
        this.saveUserProfile(this.userProfile)
      }

      this.isInitialized = true
      console.log('FarcasterService: Initialized with profile:', this.userProfile)
      return true
    } catch (error) {
      console.error('FarcasterService initialization failed:', error)
      // Fallback to demo profile
      this.userProfile = this.generateDemoProfile()
      this.isInitialized = true
      return false
    }
  }

  loadUserProfile() {
    try {
      const saved = localStorage.getItem('farcaster_user_profile')
      return saved ? JSON.parse(saved) : null
    } catch (error) {
      console.error('Failed to load user profile:', error)
      return null
    }
  }

  saveUserProfile(profile) {
    try {
      localStorage.setItem('farcaster_user_profile', JSON.stringify(profile))
    } catch (error) {
      console.error('Failed to save user profile:', error)
    }
  }

  generateDemoProfile() {
    const demoUsernames = ['alice', 'bob', 'charlie', 'diana', 'eve', 'frank']
    const randomUsername = demoUsernames[Math.floor(Math.random() * demoUsernames.length)]
    const randomFid = Math.floor(Math.random() * 100000) + 1000
    
    return {
      fid: randomFid.toString(),
      username: randomUsername,
      displayName: randomUsername.charAt(0).toUpperCase() + randomUsername.slice(1),
      pfpUrl: `https://api.dicebear.com/7.x/avataaars/svg?seed=${randomUsername}`,
      isDemo: true
    }
  }

  getUserProfile() {
    return this.userProfile
  }

  async castMessage(text, embeds = []) {
    try {
      // In a real implementation, this would call the Farcaster Hub API
      console.log('FarcasterService: Casting message:', { text, embeds })
      
      // Demo mode - simulate successful cast
      const mockCastHash = '0x' + Math.random().toString(16).substr(2, 40)
      
      return {
        success: true,
        castHash: mockCastHash,
        text,
        embeds,
        timestamp: Date.now()
      }
    } catch (error) {
      console.error('Failed to cast message:', error)
      return {
        success: false,
        error: error.message
      }
    }
  }

  async shareAchievement(achievement) {
    try {
      const text = `🎉 Just achieved: ${achievement.type}! ${achievement.description} #ResiliSense #BaseApp`
      const embeds = [{
        url: 'https://resilisense.app',
        metadata: {
          title: 'ResiliSense - Track Your Resilience',
          description: 'Daily well-being tracking on Base',
          image: 'https://resilisense.app/og-image.png'
        }
      }]

      return await this.castMessage(text, embeds)
    } catch (error) {
      console.error('Failed to share achievement:', error)
      return {
        success: false,
        error: error.message
      }
    }
  }

  async getFollowers() {
    try {
      // Demo mode - return mock followers
      return {
        success: true,
        followers: Math.floor(Math.random() * 1000) + 50,
        following: Math.floor(Math.random() * 500) + 25
      }
    } catch (error) {
      console.error('Failed to get followers:', error)
      return {
        success: false,
        error: error.message
      }
    }
  }

  async getCasts(limit = 10) {
    try {
      // Demo mode - return mock casts
      const mockCasts = []
      for (let i = 0; i < limit; i++) {
        mockCasts.push({
          hash: '0x' + Math.random().toString(16).substr(2, 40),
          text: `Demo cast ${i + 1} from ${this.userProfile?.displayName || 'User'}`,
          timestamp: Date.now() - (i * 3600000), // 1 hour apart
          likes: Math.floor(Math.random() * 50),
          recasts: Math.floor(Math.random() * 20),
          replies: Math.floor(Math.random() * 10)
        })
      }

      return {
        success: true,
        casts: mockCasts
      }
    } catch (error) {
      console.error('Failed to get casts:', error)
      return {
        success: false,
        error: error.message
      }
    }
  }

  // Future feature: Real Farcaster Hub API integration
  async connectToHub(hubUrl, apiKey) {
    try {
      this.hubApiUrl = hubUrl
      this.apiKey = apiKey
      
      // Test connection
      const response = await fetch(`${hubUrl}/v1/info`, {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        }
      })

      if (response.ok) {
        console.log('FarcasterService: Connected to Hub API')
        return true
      } else {
        throw new Error('Hub API connection failed')
      }
    } catch (error) {
      console.error('Failed to connect to Hub API:', error)
      return false
    }
  }
}

// Export singleton instance
const farcasterService = new FarcasterService()
export default farcasterService
