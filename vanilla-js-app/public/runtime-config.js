// Empty stub for the dev server; the deployed nginx container generates this file
// at startup from env vars (BAPI_API_URL). Debugging / QA tool only.
window.__banksapi = Object.assign(window.__banksapi || {}, {
  apiUrl: ""
});
