# Capacitor Vue Banking Widgets Demo

This is a cross-platform mobile application demonstrating the integration of BANKSapi's WEB/Connect banking widgets using Vue.js and Capacitor. This implementation allows you to deploy banking features to both iOS and Android native applications.

## Overview

WEB/Connect is a suite of web components enabling you to integrate banking features right into your mobile app. For an overview of the features and benefits of WEB/Connect, visit our [Banking Widgets page](https://banksapi.de/en/banking-widgets-en/).

## Technologies Used

- **Vue.js 3** - Progressive JavaScript framework
- **Capacitor** - Cross-platform native runtime for web apps
- **TypeScript** - Type-safe development
- **Vite** - Fast build tooling

## Banking Components

This implementation integrates the following three BANKSapi libraries:
* https://www.npmjs.com/package/@banksapitechnology/bam-web-component, for advanced Bank Access Management (BAM), like adding/editing or removing bank accesses
* https://www.npmjs.com/package/@banksapitechnology/regprotect-web-component, for authenticating with banks in a regulatory compliant way 
* https://www.npmjs.com/package/@banksapitechnology/embeddable-finance-web-components, for visualizing banking data and initializing financial transactions

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Xcode (for iOS development)
- Android Studio (for Android development)
- BANKSapi API credentials ([contact us](https://banksapi.de/contact/) to obtain)

## Installation

1. Clone the repository and navigate to the capacitor-vue-app directory:
```bash
git clone https://github.com/your-org/banking-widgets-demo.git
cd banking-widgets-demo/capacitor-vue-app
```

2. Install dependencies:
```bash
npm ci
```
## Development

Start the app locally:
```bash
npm run cap:run:ios or npm run cap:run:android
```

## Authentication Setup

Initially, you'll encounter a JavaScript alert stating **"401 Unauthorized"**. This occurs because a valid `BANKS/Connect` token has not yet been provided to the web components.

### Getting Your Token

1. Follow our [Quick Start Guide](https://docs.banksapi.de/#quick-start)
2. Read the "Create a User Token" chapter
3. If you need BANKSapi API credentials, [contact us](https://banksapi.de/contact/)
4. The demo will redirect you to a login form where you can enter your token

## Event Handling

The web components communicate through events, enabling you to:
- Log user interactions
- Track user activity
- Debug and test functionality
- Show notifications
- Toggle features
- Implement custom behaviors
- Maintain routing consistency with your app

## Mobile-Specific Considerations

### iOS Requirements
- iOS 13.0 or higher
- Xcode 14.0 or higher
- CocoaPods (automatically handled by Capacitor)

### Android Requirements
- Android 5.0 (API 21) or higher
- Android Studio Arctic Fox or higher
- Gradle 7.0 or higher

### Capacitor Configuration
The app is configured in `capacitor.config.json`. Modify this file to change:
- App ID
- App name
- Server configuration
- Plugin settings

## Troubleshooting

### Common Issues

1. **Build fails after adding native plugins:**
   ```bash
   npx cap sync
   ```

2. **Changes not reflecting in native app:**
   ```bash
   npm run build
   npx cap copy
   ```

3. **iOS Simulator not launching:**
   - Ensure Xcode command line tools are installed
   - Check that a simulator is available in Xcode

4. **Android build errors:**
   - Verify Android Studio and SDK are properly installed
   - Check that ANDROID_HOME environment variable is set

## Support

For questions, improvements, bugs, or assistance with integration:
- [Contact Us](https://banksapi.de/contact/)
- Visit our [Developer Portal](https://docs.banksapi.de/)
- Check the [Banking Widgets page](https://banksapi.de/en/banking-widgets-en/)

## License

This demo is maintained by [BANKSapi Technology GmbH](https://banksapi.de/). For licensing information regarding the BANKSapi web components, please [contact us](https://banksapi.de/contact/).
