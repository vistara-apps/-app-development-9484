# ResiliSense - Base MiniApp

**Track, understand, and boost your daily resilience.**

ResiliSense is a comprehensive Base MiniApp designed to help individuals log daily well-being metrics, receive personalized insights, and engage in guided exercises to improve their resilience. Built with React and integrated with Base Wallet and Farcaster for a seamless Web3 experience.

![ResiliSense Preview](https://via.placeholder.com/800x400/667eea/ffffff?text=ResiliSense+Dashboard)

## 🌟 Features

### Core Features (Free)
- **Daily Resilience Check-in**: Simple interface to log mood, sleep quality, and stress levels
- **Personalized Insights**: Data-driven analysis to identify resilience patterns and correlations
- **Guided Exercises**: 2 core exercises (breathing and mindfulness) for immediate stress relief
- **Progress Tracking**: Visual stats and recent activity overview
- **Local Data Persistence**: Your data stays with you using localStorage

### Premium Features
- **Advanced Analytics** ($2.99): Detailed trend analysis, correlations, and predictions
- **Custom Exercise Pack** ($4.99): 10+ additional guided exercises
- **Data Export** ($1.99): Export your data as CSV or PDF reports
- **Premium Subscription** ($4.99-$6.99/month): AI-powered insights and unlimited history

## 🚀 Technology Stack

- **Frontend**: React 18 + Vite
- **Styling**: Tailwind CSS with custom glassmorphism design
- **Icons**: Lucide React
- **Base Integration**: OnchainKit for Base Wallet connectivity
- **Blockchain**: Base network support
- **Identity**: Farcaster integration for user profiles

## 📱 App Architecture

### Data Model
```javascript
// User Entity
{
  farcasterId: string,
  createdAt: timestamp,
  lastCheckin: timestamp,
  checkins: Checkin[]
}

// Checkin Entity
{
  id: uuid,
  userId: string,
  timestamp: timestamp,
  mood: integer (1-5),
  sleepQuality: integer (1-5),
  stressLevel: integer (1-5)
}
```

### Services Architecture
- **BaseService**: Handles Base Wallet integration and frame interactions
- **FarcasterService**: Manages user identity and social features
- **PremiumService**: Handles micro-transactions and premium feature access

## 🎨 Design System

### Colors
- **Primary**: `hsl(210, 80%, 50%)` - Blue accent
- **Accent**: `hsl(130, 60%, 45%)` - Green success
- **Background**: Gradient from `#667eea` to `#764ba2`
- **Surface**: Glass cards with backdrop blur

### Typography
- **Display**: `text-2xl font-semibold`
- **Headline**: `text-xl font-medium`
- **Body**: `text-base leading-6`
- **Caption**: `text-sm text-secondary`

### Components
- **FrameWrapper**: Main container with glassmorphism effect
- **Button**: Multiple variants (primary, secondary, destructive)
- **CheckinForm**: Interactive sliders for mood/sleep/stress
- **InsightCard**: Displays personalized recommendations
- **StatsCard**: Shows metric averages with color coding

## 🛠️ Development

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation
```bash
# Clone the repository
git clone https://github.com/vistara-apps/-app-development-9484.git
cd -app-development-9484

# Install dependencies
npm install

# Start development server
npm run dev
```

### Build for Production
```bash
npm run build
```

### Environment Setup
The app works out of the box with demo data. For production deployment:

1. **Base Integration**: Configure Base Wallet connection
2. **Farcaster API**: Set up Farcaster Hub API credentials
3. **Payment Processing**: Integrate with payment provider for premium features

## 🔧 Configuration

### Base MiniKit Integration
```javascript
// services/baseService.js
const baseService = new BaseService();
await baseService.initialize();
```

### Farcaster Identity
```javascript
// services/farcasterService.js
const farcasterService = new FarcasterService();
const userProfile = farcasterService.getUserProfile();
```

### Premium Features
```javascript
// services/premiumService.js
const premiumService = new PremiumService();
const hasAccess = premiumService.hasFeatureAccess('advanced_analytics');
```

## 📊 Business Model

### Freemium Strategy
- **Free Tier**: Core check-in, basic insights, 2 exercises
- **One-time Purchases**: $1.99 - $4.99 for specific features
- **Subscriptions**: $4.99 - $6.99/month for premium access

### Revenue Streams
1. **Micro-transactions**: Individual feature purchases
2. **Subscriptions**: Monthly premium plans
3. **Future**: Tokenized rewards and NFT achievements

## 🚀 Deployment

### Base MiniApp Deployment
1. Build the production bundle: `npm run build`
2. Deploy to your preferred hosting (Vercel, Netlify, etc.)
3. Configure Base frame metadata
4. Submit to Base MiniApp directory

### Frame Configuration
```html
<meta property="fc:frame" content="vNext" />
<meta property="fc:frame:image" content="https://your-domain.com/frame-image.png" />
<meta property="fc:frame:button:1" content="Start Check-in" />
<meta property="fc:frame:post_url" content="https://your-domain.com/api/frame" />
```

## 🔮 Future Enhancements

### Planned Features
- **Social Sharing**: Share achievements on Farcaster
- **Community Challenges**: Group resilience goals
- **AI Coaching**: Personalized coaching with Base Chat Agents
- **NFT Rewards**: Achievement-based NFT minting
- **Data Visualization**: Advanced charts and trends

### Technical Roadmap
- [ ] Real Farcaster Hub API integration
- [ ] Base Chat Agents implementation
- [ ] Payment processing integration
- [ ] Advanced analytics engine
- [ ] Social features and sharing
- [ ] Mobile app version

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Development Workflow
1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Base Team**: For the excellent MiniApp framework
- **Farcaster**: For decentralized social identity
- **Tailwind CSS**: For the utility-first styling approach
- **Lucide**: For the beautiful icon set

## 📞 Support

- **Documentation**: [docs.resilisense.app](https://docs.resilisense.app)
- **Discord**: [Join our community](https://discord.gg/resilisense)
- **Twitter**: [@ResiliSenseApp](https://twitter.com/resilisenseapp)
- **Email**: support@resilisense.app

---

**Built with ❤️ for the Base ecosystem**

*ResiliSense - Your daily companion for building resilience in the Web3 world.*
