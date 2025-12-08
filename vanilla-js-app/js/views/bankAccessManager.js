import router from '../router/router.js';

export default function BankAccessManager() {
  const app = document.getElementById('app');
  const token = localStorage.getItem('ba-token');

  function onOpenRegprotect(e) {
    const { sessionLink } = e.detail;
    router.navigate('/regprotect', { sessionLink });
  }

  function onOpenBankingView() {
    router.navigate('/products');
  }

  function render() {
    app.innerHTML = `
      <ba-bam-dashboard
        id="bamView"
        token="${token}"
        tenant-id="'54b8ffa2-c618-4496-9534-c1db776d61c7'"
      />
    `;

    attachEventListeners();
  }

  function attachEventListeners() {
    const bamView = document.getElementById('bamView');
    if (bamView) {
      bamView.addEventListener('openRegprotect', onOpenRegprotect);
      bamView.addEventListener('openBankingView', onOpenBankingView);
    }
  }

  render();
}
