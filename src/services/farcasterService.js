/**
 * Farcaster Integration Service
 * Handles Farcaster user identity and profile data
 */

class FarcasterService {
  constructor() {
    this.isInitialized = false;
    this.userProfile = null;
    this.hubApiUrl = 'https://hub-api.farcaster.xyz';
  }

  /**
   * Initialize Farcaster service
   */
  async initialize() {
    try {
      // Try to get user identity from various sources
      await this.detectUserIdentity();
      this.isInitialized = true;
      return true;
    } catch (error) {
      console.error('Failed to initialize Farcaster service:', error);
      return false;
    }
  }

  /**
   * Detect user identity from frame context or URL parameters
   */
  async detectUserIdentity() {
    try {
      // Check URL parameters for Farcaster ID (common in frame contexts)
      const urlParams = new URLSearchParams(window.location.search);
      const fid = urlParams.get('fid') || urlParams.get('farcaster_id');
      
      if (fid) {
        await this.loadUserProfile(fid);
        return;
      }

      // Check for frame message data (if available)
      const frameData = this.getFrameMessageData();
      if (frameData && frameData.fid) {
        await this.loadUserProfile(frameData.fid);
        return;
      }

      // Fallback to mock user for development
      this.userProfile = {
        fid: 'demo_user_' + Date.now(),
        username: 'demo_user',
        displayName: 'Demo User',
        pfpUrl: null,
        isDemo: true
      };
    } catch (error) {
      console.error('Failed to detect user identity:', error);
      // Use fallback demo user
      this.userProfile = {
        fid: 'demo_user_' + Date.now(),
        username: 'demo_user',
        displayName: 'Demo User',
        pfpUrl: null,
        isDemo: true
      };
    }
  }

  /**
   * Get frame message data from various sources
   */
  getFrameMessageData() {
    try {
      // Check for frame message in various locations
      if (window.frameMessage) {
        return window.frameMessage;
      }

      // Check for data in localStorage (set by frame)
      const frameData = localStorage.getItem('farcaster_frame_data');
      if (frameData) {
        return JSON.parse(frameData);
      }

      // Check for data in sessionStorage
      const sessionData = sessionStorage.getItem('farcaster_user');
      if (sessionData) {
        return JSON.parse(sessionData);
      }

      return null;
    } catch (error) {
      console.error('Failed to get frame message data:', error);
      return null;
    }
  }

  /**
   * Load user profile from Farcaster Hub API
   */
  async loadUserProfile(fid) {
    try {
      // In a real implementation, you would call the Farcaster Hub API
      // For now, we'll create a mock profile based on the FID
      this.userProfile = {
        fid: fid,
        username: `user_${fid}`,
        displayName: `User ${fid}`,
        pfpUrl: `https://api.dicebear.com/7.x/avataaars/svg?seed=${fid}`,
        isDemo: false
      };

      // Store in localStorage for persistence
      localStorage.setItem('farcaster_user_profile', JSON.stringify(this.userProfile));
      
      return this.userProfile;
    } catch (error) {
      console.error('Failed to load user profile:', error);
      throw error;
    }
  }

  /**
   * Get current user profile
   */
  getUserProfile() {
    return this.userProfile;
  }

  /**
   * Get user's Farcaster ID
   */
  getUserFid() {
    return this.userProfile?.fid || null;
  }

  /**
   * Check if user is authenticated
   */
  isAuthenticated() {
    return !!this.userProfile;
  }

  /**
   * Get user display information
   */
  getUserDisplayInfo() {
    if (!this.userProfile) return null;

    return {
      fid: this.userProfile.fid,
      username: this.userProfile.username,
      displayName: this.userProfile.displayName,
      pfpUrl: this.userProfile.pfpUrl,
      isDemo: this.userProfile.isDemo
    };
  }

  /**
   * Cast a message (for future social features)
   */
  async castMessage(text, embeds = []) {
    try {
      // This would integrate with Farcaster's casting API
      console.log('Casting message:', text, embeds);
      
      // For now, just return a mock response
      return {
        success: true,
        hash: 'mock_cast_hash_' + Date.now(),
        text,
        embeds
      };
    } catch (error) {
      console.error('Failed to cast message:', error);
      throw error;
    }
  }

  /**
   * Share resilience achievement (future feature)
   */
  async shareAchievement(achievement) {
    try {
      const text = `🌟 Just completed my ${achievement.type} on ResiliSense! ${achievement.description}`;
      const embeds = [{
        url: window.location.href,
        metadata: {
          title: 'ResiliSense - Track Your Resilience',
          description: 'Join me in building daily resilience habits!'
        }
      }];

      return await this.castMessage(text, embeds);
    } catch (error) {
      console.error('Failed to share achievement:', error);
      throw error;
    }
  }

  /**
   * Clear user session
   */
  clearSession() {
    this.userProfile = null;
    localStorage.removeItem('farcaster_user_profile');
    sessionStorage.removeItem('farcaster_user');
  }
}

// Create singleton instance
const farcasterService = new FarcasterService();

export default farcasterService;
