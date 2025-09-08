/**
 * Premium Features Service
 * Handles micro-transactions and premium feature access
 */

class PremiumService {
  constructor() {
    this.isInitialized = false;
    this.userSubscription = null;
    this.purchasedFeatures = new Set();
    this.premiumFeatures = {
      // One-time purchases ($1-$5)
      advancedAnalytics: {
        id: 'advanced_analytics',
        name: 'Advanced Analytics',
        description: 'Detailed insights with trend analysis and correlations',
        price: 2.99,
        type: 'one_time',
        currency: 'USD'
      },
      customExercises: {
        id: 'custom_exercises',
        name: 'Custom Exercise Pack',
        description: '10+ additional guided exercises for stress and mindfulness',
        price: 4.99,
        type: 'one_time',
        currency: 'USD'
      },
      dataExport: {
        id: 'data_export',
        name: 'Data Export',
        description: 'Export your resilience data as CSV or PDF reports',
        price: 1.99,
        type: 'one_time',
        currency: 'USD'
      },
      
      // Subscription features ($3-$7/month)
      premiumInsights: {
        id: 'premium_insights',
        name: 'Premium Insights',
        description: 'AI-powered personalized recommendations and coaching',
        price: 4.99,
        type: 'subscription',
        currency: 'USD',
        interval: 'monthly'
      },
      unlimitedHistory: {
        id: 'unlimited_history',
        name: 'Unlimited History',
        description: 'Access to complete historical data and trends',
        price: 2.99,
        type: 'subscription',
        currency: 'USD',
        interval: 'monthly'
      }
    };
  }

  /**
   * Initialize premium service
   */
  async initialize() {
    try {
      await this.loadUserPurchases();
      await this.loadUserSubscription();
      this.isInitialized = true;
      return true;
    } catch (error) {
      console.error('Failed to initialize premium service:', error);
      return false;
    }
  }

  /**
   * Load user's purchased features from storage
   */
  async loadUserPurchases() {
    try {
      const purchases = localStorage.getItem('resilisense_purchases');
      if (purchases) {
        const purchaseData = JSON.parse(purchases);
        this.purchasedFeatures = new Set(purchaseData);
      }
    } catch (error) {
      console.error('Failed to load user purchases:', error);
    }
  }

  /**
   * Load user's subscription status
   */
  async loadUserSubscription() {
    try {
      const subscription = localStorage.getItem('resilisense_subscription');
      if (subscription) {
        this.userSubscription = JSON.parse(subscription);
        
        // Check if subscription is still active
        if (this.userSubscription.expiresAt < Date.now()) {
          this.userSubscription = null;
          localStorage.removeItem('resilisense_subscription');
        }
      }
    } catch (error) {
      console.error('Failed to load user subscription:', error);
    }
  }

  /**
   * Check if user has access to a premium feature
   */
  hasFeatureAccess(featureId) {
    const feature = this.premiumFeatures[featureId];
    if (!feature) return false;

    if (feature.type === 'one_time') {
      return this.purchasedFeatures.has(featureId);
    } else if (feature.type === 'subscription') {
      return this.userSubscription && this.userSubscription.features.includes(featureId);
    }

    return false;
  }

  /**
   * Get all available premium features
   */
  getAvailableFeatures() {
    return Object.values(this.premiumFeatures);
  }

  /**
   * Get features user doesn't have access to
   */
  getLockedFeatures() {
    return Object.values(this.premiumFeatures).filter(
      feature => !this.hasFeatureAccess(feature.id)
    );
  }

  /**
   * Purchase a one-time feature
   */
  async purchaseFeature(featureId) {
    try {
      const feature = this.premiumFeatures[featureId];
      if (!feature || feature.type !== 'one_time') {
        throw new Error('Invalid feature or feature type');
      }

      // In a real implementation, this would integrate with payment processing
      // For now, we'll simulate the purchase
      console.log(`Purchasing feature: ${feature.name} for $${feature.price}`);
      
      // Simulate payment processing delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Add feature to purchased features
      this.purchasedFeatures.add(featureId);
      
      // Save to localStorage
      localStorage.setItem(
        'resilisense_purchases', 
        JSON.stringify([...this.purchasedFeatures])
      );

      return {
        success: true,
        featureId,
        transactionId: 'mock_tx_' + Date.now(),
        amount: feature.price,
        currency: feature.currency
      };
    } catch (error) {
      console.error('Failed to purchase feature:', error);
      throw error;
    }
  }

  /**
   * Subscribe to premium features
   */
  async subscribe(plan = 'basic') {
    try {
      const subscriptionPlans = {
        basic: {
          price: 4.99,
          features: ['premium_insights', 'unlimited_history'],
          name: 'Premium Basic'
        },
        pro: {
          price: 6.99,
          features: ['premium_insights', 'unlimited_history', 'custom_exercises'],
          name: 'Premium Pro'
        }
      };

      const selectedPlan = subscriptionPlans[plan];
      if (!selectedPlan) {
        throw new Error('Invalid subscription plan');
      }

      console.log(`Subscribing to ${selectedPlan.name} for $${selectedPlan.price}/month`);
      
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Create subscription
      this.userSubscription = {
        plan,
        features: selectedPlan.features,
        price: selectedPlan.price,
        currency: 'USD',
        startedAt: Date.now(),
        expiresAt: Date.now() + (30 * 24 * 60 * 60 * 1000), // 30 days
        status: 'active'
      };

      // Save to localStorage
      localStorage.setItem(
        'resilisense_subscription',
        JSON.stringify(this.userSubscription)
      );

      return {
        success: true,
        subscription: this.userSubscription,
        transactionId: 'mock_sub_' + Date.now()
      };
    } catch (error) {
      console.error('Failed to subscribe:', error);
      throw error;
    }
  }

  /**
   * Cancel subscription
   */
  async cancelSubscription() {
    try {
      if (!this.userSubscription) {
        throw new Error('No active subscription');
      }

      // In a real implementation, this would call the payment processor
      console.log('Cancelling subscription');
      
      this.userSubscription.status = 'cancelled';
      this.userSubscription = null;
      
      localStorage.removeItem('resilisense_subscription');

      return { success: true };
    } catch (error) {
      console.error('Failed to cancel subscription:', error);
      throw error;
    }
  }

  /**
   * Get user's subscription status
   */
  getSubscriptionStatus() {
    return this.userSubscription;
  }

  /**
   * Check if user has active subscription
   */
  hasActiveSubscription() {
    return !!this.userSubscription && this.userSubscription.status === 'active';
  }

  /**
   * Get premium analytics (locked behind paywall)
   */
  getPremiumAnalytics(checkins) {
    if (!this.hasFeatureAccess('advanced_analytics') && !this.hasActiveSubscription()) {
      return {
        locked: true,
        message: 'Upgrade to access advanced analytics',
        feature: this.premiumFeatures.advancedAnalytics
      };
    }

    // Generate advanced analytics
    return {
      locked: false,
      data: {
        trendAnalysis: this.calculateTrends(checkins),
        correlations: this.calculateCorrelations(checkins),
        predictions: this.generatePredictions(checkins),
        recommendations: this.generateRecommendations(checkins)
      }
    };
  }

  /**
   * Calculate trend analysis (premium feature)
   */
  calculateTrends(checkins) {
    // Advanced trend calculation logic
    const last30Days = checkins.slice(-30);
    const trends = {
      mood: this.calculateTrend(last30Days.map(c => c.mood)),
      sleep: this.calculateTrend(last30Days.map(c => c.sleepQuality)),
      stress: this.calculateTrend(last30Days.map(c => c.stressLevel))
    };

    return trends;
  }

  /**
   * Calculate correlations between metrics (premium feature)
   */
  calculateCorrelations(checkins) {
    // Correlation analysis logic
    return {
      sleepMood: 0.73,
      stressMood: -0.65,
      sleepStress: -0.58
    };
  }

  /**
   * Generate predictions (premium feature)
   */
  generatePredictions(checkins) {
    return {
      nextWeekMood: 3.8,
      riskFactors: ['High stress on weekdays', 'Poor sleep on weekends'],
      recommendations: ['Focus on weekend sleep hygiene', 'Try stress reduction on Monday/Tuesday']
    };
  }

  /**
   * Generate personalized recommendations (premium feature)
   */
  generateRecommendations(checkins) {
    return [
      'Your mood improves significantly with 7+ hours of sleep',
      'Consider meditation on high-stress days',
      'Weekend check-ins show different patterns - maintain consistency'
    ];
  }

  /**
   * Calculate trend direction
   */
  calculateTrend(values) {
    if (values.length < 2) return 'stable';
    
    const recent = values.slice(-7).reduce((a, b) => a + b, 0) / 7;
    const previous = values.slice(-14, -7).reduce((a, b) => a + b, 0) / 7;
    
    const change = recent - previous;
    if (change > 0.2) return 'improving';
    if (change < -0.2) return 'declining';
    return 'stable';
  }
}

// Create singleton instance
const premiumService = new PremiumService();

export default premiumService;
