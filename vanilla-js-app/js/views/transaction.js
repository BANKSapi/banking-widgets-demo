import router from '../router/router.js';

export default function Transaction({ params }) {
  const app = document.getElementById('app');
  const { bankAccessId, bankAccountId, transactionId } = params;
  const token = localStorage.getItem('ba-token');

  function onEmitError(e) {
    const { status, statusText } = e.detail;
    if(status === 401 || status === 403) {
      router.navigate('/login');
    }
    alert(`${status} ${statusText}`);
  }

  function render() {
    app.innerHTML = `
      <ba-account-transaction-detail
        id="transactionView"
        token="${token}"
        bank-access-id="${bankAccessId}"
        bank-account-id="${bankAccountId}"
        transaction-id="${transactionId}"
      />
    `;

    attachEventListeners();
  }

  function attachEventListeners() {
    const transactionView = document.getElementById('transactionView');
    if (transactionView) {
      transactionView.addEventListener('emitError', onEmitError);
    }
  }

  render();
}
