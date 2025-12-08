import router from '../router/router.js';

export default function Regprotect({ query }) {
  const app = document.getElementById('app');
  const { sessionLink } = query;

  function onSubscription(event) {
    // event.detail will look something like this ->
    // http://localhost:8081/?event=accountCreated&accountId=06f589bd-8d35-494a-8056-2e5d927a3aa3&baReentry=ACCOUNT_CREATED

    const callbackUrl = event.detail;
    const base = '/banking-widgets-demo/';
    const targetPath = new URL(callbackUrl).pathname;

    // Remove base from path if present
    const relativePath = targetPath.startsWith(base)
      ? targetPath.slice(base.length - 1) // preserve the leading slash
      : targetPath;

    router.navigate(relativePath);
  }

  function render() {
    console.log('SESSION LINK VANILLA JS APP', sessionLink);
    const reentryUrl = `${window.location.origin}/regprotect?redirect=${Date.now()}`
    console.log('reentryUrl VANILLA JS APP', reentryUrl);
    app.innerHTML = `
      <ba-regprotect
        id="regprotectView"
        session-link="${sessionLink || ''}"
        reentry-url="${reentryUrl}"
      />
    `;

    attachEventListeners();
  }

  function attachEventListeners() {
    const regprotectView = document.getElementById('regprotectView');
    if (regprotectView) {
      regprotectView.addEventListener('subscribed', onSubscription);
    }
  }

  render();
}
