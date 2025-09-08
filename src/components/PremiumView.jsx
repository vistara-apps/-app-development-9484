import React, { useState, useEffect } from 'react'
import { ArrowLeft, Crown, Zap, TrendingUp, Download, Star, Check } from 'lucide-react'
import Button from './Button'

const PremiumView = ({ onBack, services }) => {
  const [features, setFeatures] = useState([])
  const [subscription, setSubscription] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (services.premium) {
      setFeatures(services.premium.getAvailableFeatures())
      setSubscription(services.premium.getSubscriptionStatus())
    }
  }, [services])

  const handlePurchase = async (featureId) => {
    if (!services.premium) return

    setIsLoading(true)
    try {
      const result = await services.premium.purchaseFeature(featureId)
      if (result.success) {
        // Refresh features list
        setFeatures(services.premium.getAvailableFeatures())
        alert(`Successfully purchased ${result.featureId}!`)
      }
    } catch (error) {
      alert(`Purchase failed: ${error.message}`)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubscribe = async (plan) => {
    if (!services.premium) return

    setIsLoading(true)
    try {
      const result = await services.premium.subscribe(plan)
      if (result.success) {
        setSubscription(result.subscription)
        alert(`Successfully subscribed to ${plan} plan!`)
      }
    } catch (error) {
      alert(`Subscription failed: ${error.message}`)
    } finally {
      setIsLoading(false)
    }
  }

  const getFeatureIcon = (featureId) => {
    switch (featureId) {
      case 'advanced_analytics':
        return TrendingUp
      case 'custom_exercises':
        return Zap
      case 'data_export':
        return Download
      case 'premium_insights':
        return Star
      default:
        return Crown
    }
  }

  const oneTimeFeatures = features.filter(f => f.type === 'one_time')
  const subscriptionFeatures = features.filter(f => f.type === 'subscription')

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
          <h2 className="text-xl font-medium flex items-center gap-2">
            <Crown className="w-5 h-5 text-yellow-400" />
            Premium Features
          </h2>
          <p className="text-white/70 text-sm">Unlock advanced insights and features</p>
        </div>
      </div>

      {/* Current Subscription Status */}
      {subscription && (
        <div className="glass-card rounded-lg p-4 border-yellow-400/30">
          <div className="flex items-center gap-2 text-yellow-400 mb-2">
            <Crown className="w-4 h-4" />
            <span className="font-medium">Premium Active</span>
          </div>
          <p className="text-white/80 text-sm">
            {subscription.plan} plan - ${subscription.price}/month
          </p>
          <p className="text-white/60 text-xs">
            Expires: {new Date(subscription.expiresAt).toLocaleDateString()}
          </p>
        </div>
      )}

      {/* Subscription Plans */}
      {!subscription && (
        <div className="space-y-4">
          <h3 className="text-white font-medium">Monthly Subscriptions</h3>
          
          <div className="grid gap-3">
            {/* Basic Plan */}
            <div className="glass-card rounded-lg p-4 border-blue-400/30">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h4 className="text-white font-medium">Premium Basic</h4>
                  <p className="text-white/70 text-sm">Essential premium features</p>
                </div>
                <div className="text-right">
                  <div className="text-xl font-semibold text-blue-400">$4.99</div>
                  <div className="text-xs text-white/60">/month</div>
                </div>
              </div>
              
              <ul className="space-y-2 mb-4">
                <li className="flex items-center gap-2 text-white/80 text-sm">
                  <Check className="w-4 h-4 text-green-400" />
                  Premium AI insights
                </li>
                <li className="flex items-center gap-2 text-white/80 text-sm">
                  <Check className="w-4 h-4 text-green-400" />
                  Unlimited history access
                </li>
              </ul>
              
              <Button
                variant="primary"
                onClick={() => handleSubscribe('basic')}
                disabled={isLoading}
                className="w-full"
              >
                Subscribe to Basic
              </Button>
            </div>

            {/* Pro Plan */}
            <div className="glass-card rounded-lg p-4 border-yellow-400/30 relative">
              <div className="absolute -top-2 left-4 bg-yellow-400 text-black px-2 py-1 rounded text-xs font-medium">
                POPULAR
              </div>
              
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h4 className="text-white font-medium">Premium Pro</h4>
                  <p className="text-white/70 text-sm">All premium features included</p>
                </div>
                <div className="text-right">
                  <div className="text-xl font-semibold text-yellow-400">$6.99</div>
                  <div className="text-xs text-white/60">/month</div>
                </div>
              </div>
              
              <ul className="space-y-2 mb-4">
                <li className="flex items-center gap-2 text-white/80 text-sm">
                  <Check className="w-4 h-4 text-green-400" />
                  Everything in Basic
                </li>
                <li className="flex items-center gap-2 text-white/80 text-sm">
                  <Check className="w-4 h-4 text-green-400" />
                  Custom exercise pack
                </li>
                <li className="flex items-center gap-2 text-white/80 text-sm">
                  <Check className="w-4 h-4 text-green-400" />
                  Advanced analytics
                </li>
              </ul>
              
              <Button
                variant="primary"
                onClick={() => handleSubscribe('pro')}
                disabled={isLoading}
                className="w-full bg-yellow-400 hover:bg-yellow-500 text-black"
              >
                Subscribe to Pro
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* One-time Purchases */}
      {oneTimeFeatures.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-white font-medium">One-time Purchases</h3>
          
          <div className="space-y-3">
            {oneTimeFeatures.map((feature) => {
              const Icon = getFeatureIcon(feature.id)
              const hasAccess = services.premium?.hasFeatureAccess(feature.id)
              
              return (
                <div key={feature.id} className="glass-card rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-white/20 rounded-lg">
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="text-white font-medium">{feature.name}</h4>
                        <div className="text-right">
                          <div className="text-lg font-semibold text-green-400">
                            ${feature.price}
                          </div>
                          <div className="text-xs text-white/60">one-time</div>
                        </div>
                      </div>
                      
                      <p className="text-white/70 text-sm mb-3">
                        {feature.description}
                      </p>
                      
                      {hasAccess ? (
                        <div className="flex items-center gap-2 text-green-400 text-sm">
                          <Check className="w-4 h-4" />
                          Purchased
                        </div>
                      ) : (
                        <Button
                          variant="secondary"
                          onClick={() => handlePurchase(feature.id)}
                          disabled={isLoading}
                          className="text-sm"
                        >
                          Purchase ${feature.price}
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Benefits */}
      <div className="glass-card rounded-lg p-4">
        <h3 className="text-white font-medium mb-3">Why Go Premium?</h3>
        <ul className="space-y-2">
          <li className="flex items-center gap-2 text-white/80 text-sm">
            <TrendingUp className="w-4 h-4 text-blue-400" />
            Advanced trend analysis and predictions
          </li>
          <li className="flex items-center gap-2 text-white/80 text-sm">
            <Star className="w-4 h-4 text-yellow-400" />
            AI-powered personalized recommendations
          </li>
          <li className="flex items-center gap-2 text-white/80 text-sm">
            <Zap className="w-4 h-4 text-green-400" />
            Exclusive guided exercises and techniques
          </li>
          <li className="flex items-center gap-2 text-white/80 text-sm">
            <Download className="w-4 h-4 text-purple-400" />
            Export your data for external analysis
          </li>
        </ul>
      </div>

      {/* Demo Note */}
      <div className="text-center text-white/60 text-xs">
        <p>This is a demo implementation of the premium features.</p>
        <p>In production, this would integrate with real payment processing.</p>
      </div>
    </div>
  )
}

export default PremiumView
