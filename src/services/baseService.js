/**
 * Base MiniKit Integration Service
 * Handles Base Wallet interactions and frame functionality
 */

class BaseService {
  constructor() {
    this.isInitialized = false;
    this.userAddress = null;
    this.isInFrame = false;
  }

  /**
   * Initialize Base MiniKit
   */
  async initialize() {
    try {
      // Check if we're in a Base frame environment
      this.isInFrame = this.detectFrameEnvironment();
      
      if (this.isInFrame) {
        // Initialize Base MiniKit if available
        if (window.ethereum && window.ethereum.isBase) {
          await this.connectWallet();
        }
      }
      
      this.isInitialized = true;
      return true;
    } catch (error) {
      console.error('Failed to initialize Base service:', error);
      return false;
    }
  }

  /**
   * Detect if we're running in a Base frame environment
   */
  detectFrameEnvironment() {
    // Check for frame-specific indicators
    const userAgent = navigator.userAgent;
    const referrer = document.referrer;
    
    // Check for Base-specific frame indicators
    return (
      userAgent.includes('Base') ||
      referrer.includes('base.org') ||
      window.parent !== window ||
      window.location !== window.parent.location
    );
  }

  /**
   * Connect to Base Wallet
   */
  async connectWallet() {
    try {
      if (!window.ethereum) {
        throw new Error('No wallet found');
      }

      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });

      if (accounts.length > 0) {
        this.userAddress = accounts[0];
        return this.userAddress;
      }
    } catch (error) {
      console.error('Failed to connect wallet:', error);
      throw error;
    }
  }

  /**
   * Get user's wallet address
   */
  getUserAddress() {
    return this.userAddress;
  }

  /**
   * Check if user is connected
   */
  isConnected() {
    return !!this.userAddress;
  }

  /**
   * Get frame context information
   */
  getFrameContext() {
    return {
      isInFrame: this.isInFrame,
      userAddress: this.userAddress,
      isConnected: this.isConnected(),
    };
  }

  /**
   * Handle frame actions (for future Base Chat Agents integration)
   */
  async handleFrameAction(action, data) {
    try {
      // This would integrate with Base Chat Agents in the future
      console.log('Frame action:', action, data);
      
      // For now, just return success
      return { success: true, action, data };
    } catch (error) {
      console.error('Frame action failed:', error);
      return { success: false, error: error.message };
    }
  }

  /**
   * Send transaction (for future premium features)
   */
  async sendTransaction(to, value, data) {
    try {
      if (!this.isConnected()) {
        throw new Error('Wallet not connected');
      }

      const txHash = await window.ethereum.request({
        method: 'eth_sendTransaction',
        params: [{
          from: this.userAddress,
          to,
          value,
          data,
        }],
      });

      return txHash;
    } catch (error) {
      console.error('Transaction failed:', error);
      throw error;
    }
  }
}

// Create singleton instance
const baseService = new BaseService();

export default baseService;
