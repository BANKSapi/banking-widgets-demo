# WEB/Connect Reference Implementation
WEB/Connect is a suite of web components enabling you to integrate banking features right into your app.
For an overview of the features and benefits of WEB/Connect, visit our [Banking Widgets page](https://banksapi.de/en/banking-widgets-en/).

This repository contains a reference implementation for WEB/Connect written in [Vue.js](https://vuejs.org/), which will give you enough insight to implement it into your own app.
It is specifically implementing the following three libraries:
* https://www.npmjs.com/package/@banksapitechnology/bam-web-component, for advanced Bank Access Management (BAM), like adding/editing or removing bank accesses
* https://www.npmjs.com/package/@banksapitechnology/regprotect-web-component, for authenticating with banks in a regulatory compliant way 
* https://www.npmjs.com/package/@banksapitechnology/embeddable-finance-web-components, for visualizing banking data and initializing financial transactions

## Installation
`git clone` this repository on your machine and run `npm ci` to download its dependencies.

## Usage
Run the following command to start the application in development mode:

```sh
npm run dev
```

Open your browser and navigate to the URL provided in the terminal.

Initially, you'll encounter a JavaScript alert stating **"401 Unauthorized"**. This occurs because a valid `BANKS/Connect` token has not yet been provided to the `WEB/Component`.

To simplify the demo experience, the application will automatically redirect you to a login form where you can enter your token.

To create such a token please follow our [Quick Start Guide](https://docs.banksapi.de/#quick-start) until you have read the chapter "Create a User Token". If you are missing the needed BANKSapi API credentials, [contact us](https://banksapi.de/contact/) to get your own.
Once you've provided a valid token, you'll have full access to explore the banking widgets.

When integrating these banking widgets into your own application,you must ensure to store the token in the browser's local storage using the key `ba-token`. To do that you can either preemptively provide a token or react on the above mentioned error, which is an error event emitted by the banking widget web components. 
**Attention**: Make sure to create this token on the backend to not expose your BANKSapi client credentials.

The initial "401 Unauthorized" alert you encountered is therefore an intentionally handled event. Events serve as the primary communication method used by the web components. Many interactions emit events that you can listen for and handle to meet your specific requirements.

By tapping into these events, you can easily implement custom functionality such as:
* Logging
* User activity tracking
* Testing and debugging
* Notifications
* Feature toggling
* Custom behaviors tailored to your apps's needs
This will also allow you to stay consistent with your app's routing conventions

Please feel free to [contact us](https://banksapi.de/contact/) for questions, improvements, bugs or assistance with integration.

You can find more helpful technical documentation for other products in our [developer portal](https://docs.banksapi.de/).

This repository is maintained by [BANKSapi Technology GmbH](https://banksapi.de/).