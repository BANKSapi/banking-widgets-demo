# Banking Widgets Vanilla JS Demo

This is a vanilla JavaScript version of the Banking Widgets Demo application, converted from the Vue.js implementation.

## Features

- Authentication with token management
- Product listing (Bank accounts and depots)
- Account and transaction details
- Investment portfolio management
- Budget analysis
- Bank access management
- SCA (Strong Customer Authentication) handling via Regprotect

## Project Structure

```
vanilla-js-app/
├── index.html              # Main HTML file
├── package.json           # Project dependencies
├── vite.config.js         # Vite configuration
├── assets/                # CSS and static assets
├── js/
│   ├── app.js            # Main application entry point
│   ├── router/
│   │   └── router.js     # Custom routing implementation
│   └── views/            # View components
│       ├── login.js
│       ├── products.js
│       ├── account.js
│       ├── transaction.js
│       ├── depot.js
│       ├── investment.js
│       ├── bankAccessManager.js
│       ├── regprotect.js
│       ├── budgetAnalysis.js
│       ├── budgetAnalysisCategory.js
│       └── budgetAnalysisCategoryTransactions.js
```

## Installation

```bash
npm install
```

## Development

```bash
npm run dev
```

The application will start at http://localhost:5173

## Build

```bash
npm run build
```

The production build will be created in the `dist` directory.

## Preview Production Build

```bash
npm run preview
```

## Key Points

1. **No Framework Dependencies**: This version uses vanilla JavaScript without Vue.js
2. **Custom Router**: Implements a lightweight custom routing solution
3. **Direct DOM Manipulation**: Uses innerHTML and event listeners instead of Vue's reactive data binding
4. **Web Components**: Utilizes BanksAPI's web components directly with vanilla JavaScript event handling

## Technologies Used

- Vanilla JavaScript (ES6+)
- Vite (Build tool)
- BanksAPI Web Components
- Custom client-side routing

## Authentication

The app stores the authentication token in localStorage with the key `ba-token`. User credentials can optionally be saved for convenience.
