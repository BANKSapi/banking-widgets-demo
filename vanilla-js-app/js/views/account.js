import router from '../router/router.js';

export default function Account({ params }) {
  const app = document.getElementById('app');
  const { bankAccessId, bankAccountId } = params;
  const token = localStorage.getItem('ba-token');

  console.log('Account view loaded with params:', { bankAccessId, bankAccountId });

  function onEmitError(e) {
    const { status, statusText } = e.detail;
    if(status === 401 || status === 403) {
      router.navigate('/login');
    }
    alert(`${status} ${statusText}`);
  }

  function onInitSepaSingleTransfer(e) {
    const { sessionLink } = e.detail;
    router.navigate('/regprotect', { sessionLink });
  }

  function onOpenTransaction(e) {
    const { transactionId } = e.detail;
    router.navigate(`/products/${bankAccessId}/account/${bankAccountId}/transaction/${transactionId}`);
  }

  function onBackToProducts() {
    router.navigate('/products');
  }

  function render() {
    app.innerHTML = `
      <ba-account-detail
        id="accountView"
        token="${token}"
        bank-access-id="${bankAccessId}"
        bank-account-id="${bankAccountId}"
      />
    `;

    attachEventListeners();
  }

  function attachEventListeners() {
    const accountView = document.getElementById('accountView');
    if (accountView) {
      accountView.addEventListener('openTransaction', onOpenTransaction);
      accountView.addEventListener('emitError', onEmitError);
      accountView.addEventListener('initSepaSingleTransfer', onInitSepaSingleTransfer);
      accountView.addEventListener('goBack', onBackToProducts);
    }
  }

  render();
}
