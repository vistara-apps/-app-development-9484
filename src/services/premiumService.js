/**
 * PremiumService - Handles premium features and micro-transactions
 */
class PremiumService {
  constructor() {
    this.isInitialized = false
    this.purchases = []
    this.subscription = null
    this.availableFeatures = [
      {
        id: 'advanced_analytics',
        name: 'Advanced Analytics',
        description: 'Detailed trend analysis, correlations, and predictions',
        price: 2.99,
        type: 'one_time',
        currency: 'USD'
      },
      {
        id: 'custom_exercises',
        name: 'Custom Exercise Pack',
        description: '10+ additional guided exercises for stress relief',
        price: 4.99,
        type: 'one_time',
        currency: 'USD'
      },
      {
        id: 'data_export',
        name: 'Data Export',
        description: 'Export your data as CSV or PDF reports',
        price: 1.99,
        type: 'one_time',
        currency: 'USD'
      },
      {
        id: 'premium_insights',
        name: 'Premium AI Insights',
        description: 'AI-powered personalized recommendations',
        price: 4.99,
        type: 'subscription',
        currency: 'USD',
        interval: 'monthly'
      }
    ]
    this.subscriptionPlans = [
      {
        id: 'basic',
        name: 'Premium Basic',
        description: 'Essential premium features',
        price: 4.99,
        currency: 'USD',
        interval: 'monthly',
        features: ['premium_insights', 'unlimited_history']
      },
      {
        id: 'pro',
        name: 'Premium Pro',
        description: 'All premium features included',
        price: 6.99,
        currency: 'USD',
        interval: 'monthly',
        features: ['premium_insights', 'unlimited_history', 'custom_exercises', 'advanced_analytics']
      }
    ]
  }

  async initialize() {
    try {
      // Load existing purchases and subscription from localStorage
      this.loadPurchases()
      this.loadSubscription()
      
      this.isInitialized = true
      console.log('PremiumService: Initialized', {
        purchases: this.purchases,
        subscription: this.subscription
      })
      return true
    } catch (error) {
      console.error('PremiumService initialization failed:', error)
      this.isInitialized = true // Allow fallback mode
      return false
    }
  }

  loadPurchases() {
    try {
      const saved = localStorage.getItem('resilisense_purchases')
      this.purchases = saved ? JSON.parse(saved) : []
    } catch (error) {
      console.error('Failed to load purchases:', error)
      this.purchases = []
    }
  }

  savePurchases() {
    try {
      localStorage.setItem('resilisense_purchases', JSON.stringify(this.purchases))
    } catch (error) {
      console.error('Failed to save purchases:', error)
    }
  }

  loadSubscription() {
    try {
      const saved = localStorage.getItem('resilisense_subscription')
      if (saved) {
        const subscription = JSON.parse(saved)
        // Check if subscription is still active
        if (subscription.expiresAt > Date.now()) {
          this.subscription = subscription
        } else {
          // Subscription expired
          this.subscription = null
          localStorage.removeItem('resilisense_subscription')
        }
      }
    } catch (error) {
      console.error('Failed to load subscription:', error)
      this.subscription = null
    }
  }

  saveSubscription() {
    try {
      if (this.subscription) {
        localStorage.setItem('resilisense_subscription', JSON.stringify(this.subscription))
      } else {
        localStorage.removeItem('resilisense_subscription')
      }
    } catch (error) {
      console.error('Failed to save subscription:', error)
    }
  }

  getAvailableFeatures() {
    return this.availableFeatures.map(feature => ({
      ...feature,
      purchased: this.purchases.includes(feature.id),
      hasAccess: this.hasFeatureAccess(feature.id)
    }))
  }

  getSubscriptionPlans() {
    return this.subscriptionPlans
  }

  getSubscriptionStatus() {
    return this.subscription
  }

  hasFeatureAccess(featureId) {
    // Check if user has purchased the feature directly
    if (this.purchases.includes(featureId)) {
      return true
    }

    // Check if user has subscription that includes the feature
    if (this.subscription && this.subscription.status === 'active') {
      return this.subscription.features.includes(featureId)
    }

    return false
  }

  async purchaseFeature(featureId) {
    try {
      const feature = this.availableFeatures.find(f => f.id === featureId)
      if (!feature) {
        throw new Error('Feature not found')
      }

      if (this.purchases.includes(featureId)) {
        throw new Error('Feature already purchased')
      }

      // In a real implementation, this would process payment through Base Wallet
      console.log('PremiumService: Processing purchase for', feature.name)
      
      // Simulate payment processing delay
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Demo mode - simulate successful purchase
      const transactionId = 'tx_' + Math.random().toString(16).substr(2, 16)
      
      // Add to purchases
      this.purchases.push(featureId)
      this.savePurchases()

      console.log('PremiumService: Purchase successful', {
        featureId,
        transactionId
      })

      return {
        success: true,
        featureId,
        transactionId,
        feature
      }
    } catch (error) {
      console.error('Purchase failed:', error)
      return {
        success: false,
        error: error.message
      }
    }
  }

  async subscribe(planId) {
    try {
      const plan = this.subscriptionPlans.find(p => p.id === planId)
      if (!plan) {
        throw new Error('Subscription plan not found')
      }

      if (this.subscription && this.subscription.status === 'active') {
        throw new Error('Already have an active subscription')
      }

      // In a real implementation, this would process payment through Base Wallet
      console.log('PremiumService: Processing subscription for', plan.name)
      
      // Simulate payment processing delay
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // Demo mode - simulate successful subscription
      const transactionId = 'sub_' + Math.random().toString(16).substr(2, 16)
      const now = Date.now()
      const expiresAt = now + (30 * 24 * 60 * 60 * 1000) // 30 days from now

      this.subscription = {
        plan: plan.id,
        planName: plan.name,
        features: plan.features,
        price: plan.price,
        currency: plan.currency,
        interval: plan.interval,
        startedAt: now,
        expiresAt: expiresAt,
        status: 'active',
        transactionId
      }

      this.saveSubscription()

      console.log('PremiumService: Subscription successful', this.subscription)

      return {
        success: true,
        subscription: this.subscription,
        transactionId
      }
    } catch (error) {
      console.error('Subscription failed:', error)
      return {
        success: false,
        error: error.message
      }
    }
  }

  async cancelSubscription() {
    try {
      if (!this.subscription || this.subscription.status !== 'active') {
        throw new Error('No active subscription to cancel')
      }

      // In a real implementation, this would cancel the subscription with the payment provider
      console.log('PremiumService: Cancelling subscription')

      this.subscription.status = 'cancelled'
      this.saveSubscription()

      return {
        success: true,
        message: 'Subscription cancelled successfully'
      }
    } catch (error) {
      console.error('Subscription cancellation failed:', error)
      return {
        success: false,
        error: error.message
      }
    }
  }

  getPremiumAnalytics(checkins) {
    if (!this.hasFeatureAccess('advanced_analytics')) {
      return {
        locked: true,
        message: 'Advanced Analytics requires a premium purchase or subscription'
      }
    }

    // Generate advanced analytics for premium users
    if (!checkins || checkins.length === 0) {
      return {
        locked: false,
        data: {
          trends: [],
          correlations: [],
          predictions: [],
          message: 'Not enough data for advanced analytics'
        }
      }
    }

    // Calculate advanced metrics
    const trends = this.calculateTrends(checkins)
    const correlations = this.calculateCorrelations(checkins)
    const predictions = this.generatePredictions(checkins)

    return {
      locked: false,
      data: {
        trends,
        correlations,
        predictions,
        generatedAt: Date.now()
      }
    }
  }

  calculateTrends(checkins) {
    // Simple trend analysis
    const recent = checkins.slice(-14) // Last 14 days
    const older = checkins.slice(-28, -14) // Previous 14 days

    if (recent.length === 0) return []

    const recentAvg = {
      mood: recent.reduce((sum, c) => sum + c.mood, 0) / recent.length,
      sleep: recent.reduce((sum, c) => sum + c.sleepQuality, 0) / recent.length,
      stress: recent.reduce((sum, c) => sum + c.stressLevel, 0) / recent.length
    }

    const trends = []
    if (older.length > 0) {
      const olderAvg = {
        mood: older.reduce((sum, c) => sum + c.mood, 0) / older.length,
        sleep: older.reduce((sum, c) => sum + c.sleepQuality, 0) / older.length,
        stress: older.reduce((sum, c) => sum + c.stressLevel, 0) / older.length
      }

      trends.push({
        metric: 'mood',
        direction: recentAvg.mood > olderAvg.mood ? 'improving' : 'declining',
        change: Math.abs(recentAvg.mood - olderAvg.mood).toFixed(1)
      })
    }

    return trends
  }

  calculateCorrelations(checkins) {
    // Simple correlation analysis
    if (checkins.length < 7) return []

    // Calculate correlation between sleep and mood
    const sleepMoodCorr = this.pearsonCorrelation(
      checkins.map(c => c.sleepQuality),
      checkins.map(c => c.mood)
    )

    return [
      {
        variables: ['Sleep Quality', 'Mood'],
        correlation: sleepMoodCorr.toFixed(2),
        strength: Math.abs(sleepMoodCorr) > 0.7 ? 'strong' : Math.abs(sleepMoodCorr) > 0.3 ? 'moderate' : 'weak'
      }
    ]
  }

  pearsonCorrelation(x, y) {
    const n = x.length
    const sumX = x.reduce((a, b) => a + b, 0)
    const sumY = y.reduce((a, b) => a + b, 0)
    const sumXY = x.reduce((sum, xi, i) => sum + xi * y[i], 0)
    const sumX2 = x.reduce((sum, xi) => sum + xi * xi, 0)
    const sumY2 = y.reduce((sum, yi) => sum + yi * yi, 0)

    const numerator = n * sumXY - sumX * sumY
    const denominator = Math.sqrt((n * sumX2 - sumX * sumX) * (n * sumY2 - sumY * sumY))

    return denominator === 0 ? 0 : numerator / denominator
  }

  generatePredictions(checkins) {
    // Simple prediction based on recent trends
    if (checkins.length < 5) return []

    const recent = checkins.slice(-5)
    const avgMood = recent.reduce((sum, c) => sum + c.mood, 0) / recent.length

    return [
      {
        metric: 'mood',
        prediction: avgMood > 3.5 ? 'likely to remain positive' : 'may need attention',
        confidence: 'moderate',
        timeframe: 'next 3 days'
      }
    ]
  }
}

// Export singleton instance
const premiumService = new PremiumService()
export default premiumService
