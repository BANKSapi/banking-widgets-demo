import router from '../router/router.js';

export default function Depot({ params }) {
  const app = document.getElementById('app');
  const { bankAccessId, depotId } = params;
  const token = localStorage.getItem('ba-token');

  function onEmitError(e) {
    const { status, statusText } = e.detail;
    if(status === 401 || status === 403) {
      router.navigate('/login');
    }
    alert(`${status} ${statusText}`);
  }

  function onOpenInvestment(e) {
    const { investmentId } = e.detail;
    router.navigate(`/products/${bankAccessId}/depot/${depotId}/investment/${investmentId}`);
  }

  function render() {
    app.innerHTML = `
      <ba-depot-detail
        id="depotView"
        token="${token}"
        bank-access-id="${bankAccessId}"
        depot-id="${depotId}"
      />
    `;

    attachEventListeners();
  }

  function attachEventListeners() {
    const depotView = document.getElementById('depotView');
    if (depotView) {
      depotView.addEventListener('openInvestment', onOpenInvestment);
      depotView.addEventListener('emitError', onEmitError);
    }
  }

  render();
}
