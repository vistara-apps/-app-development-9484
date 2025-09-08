/**
 * BaseService - Handles Base Wallet integration and frame interactions
 */
class BaseService {
  constructor() {
    this.isInitialized = false
    this.isInFrame = false
    this.userAddress = null
    this.isConnected = false
  }

  async initialize() {
    try {
      // Detect if running in a frame environment
      this.isInFrame = this.detectFrameEnvironment()
      
      // Initialize Base MiniKit if available
      if (typeof window !== 'undefined' && window.MiniKit) {
        await window.MiniKit.initialize()
        this.isInitialized = true
        console.log('BaseService: MiniKit initialized')
      } else {
        // Fallback for non-frame environment
        this.isInitialized = true
        console.log('BaseService: Running in demo mode (no MiniKit)')
      }

      return true
    } catch (error) {
      console.error('BaseService initialization failed:', error)
      this.isInitialized = true // Allow fallback mode
      return false
    }
  }

  detectFrameEnvironment() {
    if (typeof window === 'undefined') return false
    
    const userAgent = navigator.userAgent || ''
    const referrer = document.referrer || ''
    
    return (
      userAgent.includes('Base') ||
      referrer.includes('base.org') ||
      window.parent !== window ||
      !!window.MiniKit
    )
  }

  async connectWallet() {
    try {
      if (window.MiniKit && window.MiniKit.wallet) {
        const accounts = await window.MiniKit.wallet.requestAccounts()
        if (accounts && accounts.length > 0) {
          this.userAddress = accounts[0]
          this.isConnected = true
          return this.userAddress
        }
      }
      
      // Fallback for demo mode
      this.userAddress = '0x' + Math.random().toString(16).substr(2, 40)
      this.isConnected = true
      console.log('BaseService: Demo wallet connected:', this.userAddress)
      return this.userAddress
    } catch (error) {
      console.error('Wallet connection failed:', error)
      throw error
    }
  }

  getFrameContext() {
    return {
      isInFrame: this.isInFrame,
      userAddress: this.userAddress,
      isConnected: this.isConnected
    }
  }

  async sendTransaction(to, value, data) {
    try {
      if (window.MiniKit && window.MiniKit.wallet) {
        const txHash = await window.MiniKit.wallet.sendTransaction({
          to,
          value,
          data
        })
        return txHash
      }
      
      // Demo mode - return mock transaction hash
      const mockTxHash = '0x' + Math.random().toString(16).substr(2, 64)
      console.log('BaseService: Demo transaction sent:', mockTxHash)
      return mockTxHash
    } catch (error) {
      console.error('Transaction failed:', error)
      throw error
    }
  }

  async handleFrameAction(action, data) {
    try {
      console.log('BaseService: Handling frame action:', action, data)
      
      // Process frame-specific actions
      switch (action) {
        case 'checkin':
          return { success: true, action, data }
        case 'purchase':
          return { success: true, action, data, txHash: await this.sendTransaction(data.to, data.value, data.data) }
        default:
          return { success: true, action, data }
      }
    } catch (error) {
      console.error('Frame action failed:', error)
      return { success: false, error: error.message }
    }
  }
}

// Export singleton instance
const baseService = new BaseService()
export default baseService
