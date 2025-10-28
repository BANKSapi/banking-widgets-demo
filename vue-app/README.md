# Vue.js Banking Widgets Demo

This is a Vue.js web application demonstrating the integration of BANKSapi's WEB/Connect banking widgets. This reference implementation provides a complete example of how to integrate banking features into your Vue.js application.

## Overview

WEB/Connect is a suite of web components enabling you to integrate banking features right into your web app. For an overview of the features and benefits of WEB/Connect, visit our [Banking Widgets page](https://banksapi.de/en/banking-widgets-en/).

## Technologies Used

- **Vue.js 3** - Progressive JavaScript framework
- **Vue Router** - Official router for Vue.js
- **TypeScript** - Type-safe development
- **Vite** - Next-generation frontend tooling
- **ESLint & Prettier** - Code quality and formatting

## Banking Components

This implementation integrates the following three BANKSapi libraries:
* https://www.npmjs.com/package/@banksapitechnology/bam-web-component, for advanced Bank Access Management (BAM), like adding/editing or removing bank accesses
* https://www.npmjs.com/package/@banksapitechnology/regprotect-web-component, for authenticating with banks in a regulatory compliant way 
* https://www.npmjs.com/package/@banksapitechnology/embeddable-finance-web-components, for visualizing banking data and initializing financial transactions

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Modern web browser (Chrome, Firefox, Safari, Edge)
- BANKSapi API credentials ([contact us](https://banksapi.de/contact/) to obtain)

## Installation

1. Clone the repository and navigate to the vue-app directory:
```bash
git clone https://github.com/your-org/banking-widgets-demo.git
cd banking-widgets-demo/vue-app
```

2. Install dependencies:
```bash
npm ci
```

## Development

Start the app locally:

```bash
npm run dev
```

## Authentication Setup

Initially, you'll encounter a JavaScript alert stating **"401 Unauthorized"**. This happens because a valid `BANKS/Connect` token hasn't been provided yet.

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

## Integration Tips

### 1. Component Registration
The banking web components are automatically registered when imported. No additional setup is required.

### 2. Styling
The components come with default styles but can be customized using CSS custom properties, like the example below:

```css
:root {
  --ba-primary-color: #007bff;
  --ba-font-family: 'Your Font', sans-serif;
}
```

### 3. TypeScript Support
This project includes full TypeScript support. Type definitions for the web components can be extended as needed.

## Support

For questions, improvements, bugs, or assistance with integration:
- [Contact Us](https://banksapi.de/contact/)
- Visit our [Developer Portal](https://docs.banksapi.de/)
- Check the [Banking Widgets page](https://banksapi.de/en/banking-widgets-en/)

## License

This demo is maintained by [BANKSapi Technology GmbH](https://banksapi.de/). For licensing information regarding the BANKSapi web components, please [contact us](https://banksapi.de/contact/).
