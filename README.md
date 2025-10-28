# BANKSapi Banking Widgets Demo

This repository contains reference implementations for integrating BANKSapi's WEB/Connect banking widgets into your applications. WEB/Connect is a suite of web components that enables you to seamlessly integrate banking features into your app.

## Overview

WEB/Connect provides embeddable banking functionality through web components. For an overview of features and benefits, visit our [Banking Widgets page](https://banksapi.de/en/banking-widgets-en/).

## What's Included

This repository demonstrates the implementation of three core BANKSapi libraries:

- **[@banksapitechnology/bam-web-component](https://www.npmjs.com/package/@banksapitechnology/bam-web-component)** - Advanced Bank Access Management (BAM) for adding, editing, and removing bank accesses
- **[@banksapitechnology/regprotect-web-component](https://www.npmjs.com/package/@banksapitechnology/regprotect-web-component)** - Regulatory-compliant authentication with banks
- **[@banksapitechnology/embeddable-finance-web-components](https://www.npmjs.com/package/@banksapitechnology/embeddable-finance-web-components)** - Banking data visualization and financial transaction initialization

## Example Applications

### 1. Vue.js Web Application (`/vue-app`)
A standard Vue.js web application demonstrating the integration of banking widgets in a browser environment.

**Features:**
- Pure Vue.js implementation
- Browser-based banking widget integration
- Event handling and routing examples
- Token management demonstration

[View Vue App README](./vue-app/README.md)

### 2. Capacitor Vue Application (`/capacitor-vue-app`)
A cross-platform mobile application built with Vue.js and Capacitor, showcasing banking widgets in native iOS and Android apps.

**Features:**
- Vue.js + Capacitor framework
- iOS and Android support
- Native app deployment capabilities
- Mobile-optimized banking widget integration

[View Capacitor Vue App README](./capacitor-vue-app/README.md)

## Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager
- BANKSapi API credentials ([contact us](https://banksapi.de/contact/) to obtain)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/your-org/banking-widgets-demo.git
cd banking-widgets-demo
```

2. Choose an example application:

**For Vue.js Web App:**
```bash
cd vue-app
npm ci
npm run dev
```

**For Capacitor Mobile App:**
```bash
cd capacitor-vue-app
npm ci
npm run cap:run:ios or npm run cap:run:android
```

### Getting Your Token

To use the banking widgets, you'll need a valid BANKS/Connect token:

1. Follow our [Quick Start Guide](https://docs.banksapi.de/#quick-start)
2. Read through the "Create a User Token" chapter
3. Generate your token using your BANKSapi credentials
4. Finally, pass the token to the BANKSapi web components

**Important:** Always create tokens on your backend to avoid exposing API credentials.

## Key Features

### Event-Driven Architecture
The web components communicate through events, allowing you to:
- Track user interactions
- Implement custom logging
- Handle authentication flows
- Maintain routing consistency
- Add custom behaviors specific to your application

### Security Best Practices
- Backend token generation to protect API credentials
- Regulatory-compliant bank authentication
- PSD2 compliance through RegProtect component

## Integration Guide

### Basic Implementation Steps

1. **Install the required packages:**
```bash
npm install @banksapitechnology/bam-web-component
npm install @banksapitechnology/regprotect-web-component
npm install @banksapitechnology/embeddable-finance-web-components
```

2. **Import and use the components in your application**

3. **Handle authentication:**
   - Fetch token
   - Pass token to components
   - Handle 401 Unauthorized events

4. **Listen for and handle component events**

For detailed implementation instructions, refer to the README files in each example directory.

## Documentation

- [Developer Portal](https://docs.banksapi.de/) - Complete technical documentation
- [Banking Widgets Overview](https://banksapi.de/en/banking-widgets-en/) - Features and benefits
- [Quick Start Guide](https://docs.banksapi.de/#quick-start) - Step-by-step setup instructions

## Support

For questions, bug reports, improvements, or integration assistance:
- [Contact Us](https://banksapi.de/contact/)
- Check our [Developer Portal](https://docs.banksapi.de/)
- Open an issue in this repository

## License

This repository is provided as a reference implementation. For licensing information regarding the BANKSapi web components, please [contact us](https://banksapi.de/contact/).

---

Maintained by [BANKSapi Technology GmbH](https://banksapi.de/)
