import router from '../router/router.js';

export default function Investment({ params }) {
  const app = document.getElementById('app');
  const { bankAccessId, depotId, investmentId } = params;
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
      <ba-depot-investment-detail
        id="investmentView"
        token="${token}"
        bank-access-id="${bankAccessId}"
        depot-id="${depotId}"
        investment-id="${investmentId}"
      />
    `;

    attachEventListeners();
  }

  function attachEventListeners() {
    const investmentView = document.getElementById('investmentView');
    if (investmentView) {
      investmentView.addEventListener('emitError', onEmitError);
    }
  }

  render();
}
