import router from '../router/router.js';

export default function Products() {
  const app = document.getElementById('app');
  const token = localStorage.getItem('ba-token');

  function onOpenBudgetAnalysis() {
    router.navigate('/budget-analysis');
  }

  function onEmitError(e) {
    const { status, statusText } = e.detail;
    if(status === 401 || status === 403) {
      router.navigate('/login');
    }
    alert(`${status} ${statusText}`);
  }

  function onOpenProduct(e) {
    const { category, bankAccessId, productId } = e.detail;
    if (category === 'DEPOT') {
      router.navigate(`/products/${bankAccessId}/depot/${productId}`);
    } else {
      router.navigate(`/products/${bankAccessId}/account/${productId}`);
    }
  }

  function onAddBankAccess(e) {
    const { sessionLink } = e.detail;
    router.navigate('/regprotect', { sessionLink });
  }

  function onManageBankAccess() {
    router.navigate('/bam');
  }

  function render() {
    app.innerHTML = `
      <ba-product-list
        id="productList"
        token="${token}"
      />
    `;

    attachEventListeners();
  }

  function attachEventListeners() {
    const productList = document.getElementById('productList');
    if (productList) {
      productList.addEventListener('openProduct', onOpenProduct);
      productList.addEventListener('openBudgetAnalysis', onOpenBudgetAnalysis);
      productList.addEventListener('emitError', onEmitError);
      productList.addEventListener('addBankAccess', onAddBankAccess);
      productList.addEventListener('manageBankAccess', onManageBankAccess);
    }
  }

  render();
}
