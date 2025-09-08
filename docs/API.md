# ResiliSense API Documentation

This document outlines the API integrations and service architecture for ResiliSense.

## Service Architecture

ResiliSense uses a modular service architecture with three main services:

### 1. BaseService
Handles Base Wallet integration and frame interactions.

#### Methods

##### `initialize()`
Initializes the Base service and detects frame environment.
```javascript
const success = await baseService.initialize();
```

##### `connectWallet()`
Connects to the user's Base Wallet.
```javascript
const address = await baseService.connectWallet();
```

##### `getFrameContext()`
Returns current frame context information.
```javascript
const context = baseService.getFrameContext();
// Returns: { isInFrame: boolean, userAddress: string, isConnected: boolean }
```

##### `sendTransaction(to, value, data)`
Sends a transaction through Base Wallet.
```javascript
const txHash = await baseService.sendTransaction(
  '0x...', // to address
  '0x0',   // value in wei
  '0x'     // data
);
```

### 2. FarcasterService
Manages user identity and social features.

#### Methods

##### `initialize()`
Initializes Farcaster service and detects user identity.
```javascript
const success = await farcasterService.initialize();
```

##### `getUserProfile()`
Returns the current user's Farcaster profile.
```javascript
const profile = farcasterService.getUserProfile();
// Returns: { fid: string, username: string, displayName: string, pfpUrl: string }
```

##### `castMessage(text, embeds)`
Casts a message to Farcaster (future feature).
```javascript
const result = await farcasterService.castMessage(
  "Just completed my daily check-in!",
  [{ url: "https://resilisense.app" }]
);
```

##### `shareAchievement(achievement)`
Shares a resilience achievement on Farcaster.
```javascript
const result = await farcasterService.shareAchievement({
  type: "7-day streak",
  description: "Maintained consistent check-ins for a week!"
});
```

### 3. PremiumService
Handles premium features and micro-transactions.

#### Methods

##### `initialize()`
Initializes premium service and loads user purchases.
```javascript
const success = await premiumService.initialize();
```

##### `hasFeatureAccess(featureId)`
Checks if user has access to a premium feature.
```javascript
const hasAccess = premiumService.hasFeatureAccess('advanced_analytics');
```

##### `purchaseFeature(featureId)`
Purchases a one-time premium feature.
```javascript
const result = await premiumService.purchaseFeature('advanced_analytics');
// Returns: { success: boolean, featureId: string, transactionId: string }
```

##### `subscribe(plan)`
Subscribes to a premium plan.
```javascript
const result = await premiumService.subscribe('basic');
// Returns: { success: boolean, subscription: object, transactionId: string }
```

##### `getPremiumAnalytics(checkins)`
Gets premium analytics data (if user has access).
```javascript
const analytics = premiumService.getPremiumAnalytics(userCheckins);
// Returns: { locked: boolean, data?: object, message?: string }
```

## Data Models

### User
```typescript
interface User {
  farcasterId: string;
  createdAt: string;
  lastCheckin: string | null;
  checkins: Checkin[];
}
```

### Checkin
```typescript
interface Checkin {
  id: string;
  userId: string;
  timestamp: string;
  mood: number;        // 1-5
  sleepQuality: number; // 1-5
  stressLevel: number;  // 1-5
}
```

### PremiumFeature
```typescript
interface PremiumFeature {
  id: string;
  name: string;
  description: string;
  price: number;
  type: 'one_time' | 'subscription';
  currency: string;
  interval?: 'monthly' | 'yearly';
}
```

### Subscription
```typescript
interface Subscription {
  plan: string;
  features: string[];
  price: number;
  currency: string;
  startedAt: number;
  expiresAt: number;
  status: 'active' | 'cancelled' | 'expired';
}
```

## External API Integrations

### Base Wallet MiniKit
- **Purpose**: Handle wallet connections and transactions
- **Documentation**: https://docs.base.org/base-app/build-with-minikit/quickstart
- **Usage**: Frame interactions, payment processing

### Farcaster Hub API
- **Purpose**: User identity and social features
- **Documentation**: https://docs.farcaster.xyz/reference/Hub-API/overview
- **Usage**: User profiles, casting messages

### Base Chat Agents (Future)
- **Purpose**: AI-powered insights and coaching
- **Documentation**: https://docs.base.org/base-app/guides/chat-agents
- **Usage**: Personalized recommendations, interactive coaching

## Error Handling

All services implement consistent error handling:

```javascript
try {
  const result = await service.method();
  if (result.success) {
    // Handle success
  } else {
    // Handle service-level error
  }
} catch (error) {
  // Handle network/system error
  console.error('Service error:', error.message);
}
```

## Local Storage Schema

### User Data
```javascript
// Key: 'resilisense-data'
{
  farcasterId: string,
  checkins: Checkin[],
  lastCheckin: string | null
}
```

### Premium Purchases
```javascript
// Key: 'resilisense_purchases'
['advanced_analytics', 'custom_exercises', ...]
```

### Subscription
```javascript
// Key: 'resilisense_subscription'
{
  plan: string,
  features: string[],
  price: number,
  startedAt: number,
  expiresAt: number,
  status: string
}
```

### Farcaster Profile
```javascript
// Key: 'farcaster_user_profile'
{
  fid: string,
  username: string,
  displayName: string,
  pfpUrl: string,
  isDemo: boolean
}
```

## Frame Integration

### Frame Detection
The app automatically detects if it's running in a frame environment:

```javascript
const isInFrame = (
  userAgent.includes('Base') ||
  referrer.includes('base.org') ||
  window.parent !== window
);
```

### Frame Actions
Handle frame-specific actions:

```javascript
const result = await baseService.handleFrameAction('checkin', {
  mood: 4,
  sleepQuality: 3,
  stressLevel: 2
});
```

## Security Considerations

### Data Privacy
- All sensitive data stored locally
- No personal data sent to external services without consent
- User controls their own data export/deletion

### Transaction Security
- All transactions go through Base Wallet
- No private keys stored in the application
- Transaction confirmation required for all purchases

### API Security
- Rate limiting on external API calls
- Input validation on all user data
- Secure handling of authentication tokens

## Development Environment

### Mock Data
In development mode, services use mock data:
- Demo Farcaster profiles
- Simulated payment processing
- Local-only data storage

### Production Configuration
For production deployment:
1. Configure real Farcaster Hub API credentials
2. Integrate with payment processing service
3. Set up Base Wallet connection
4. Configure frame metadata

## Testing

### Service Testing
```javascript
// Test service initialization
const baseInit = await baseService.initialize();
expect(baseInit).toBe(true);

// Test feature access
const hasAccess = premiumService.hasFeatureAccess('advanced_analytics');
expect(hasAccess).toBe(false);
```

### Integration Testing
- Frame environment detection
- Wallet connection flow
- Premium feature purchases
- Data persistence

## Performance Considerations

### Lazy Loading
- Services initialized only when needed
- Premium features loaded on demand
- Analytics calculated asynchronously

### Caching
- User profile cached in localStorage
- Premium status cached for session
- Analytics results cached for 1 hour

### Optimization
- Minimal bundle size with tree shaking
- Efficient re-renders with React optimization
- Debounced user input handling

---

For more detailed implementation examples, see the source code in `/src/services/`.
