import router from '../router/router.js';

export default function BudgetAnalysisCategoryTransactions({ params }) {
  const app = document.getElementById('app');
  const { category } = params;
  const token = localStorage.getItem('ba-token');

  function onEmitError(e) {
    const { status, statusText } = e.detail;
    if(status === 401 || status === 403) {
      router.navigate('/login');
    }
    alert(`${status} ${statusText}`);
  }

  function onOpenTransaction(e) {
    const { bankAccessId, bankAccountId, transactionId } = e.detail;
    router.navigate(`/products/${bankAccessId}/account/${bankAccountId}/transaction/${transactionId}`);
  }

  function render() {
    app.innerHTML = `
      <ba-budget-analysis-category-transactions
        id="budgetTransactionsView"
        token="${token}"
        category="${category}"
      />
    `;

    attachEventListeners();
  }

  function attachEventListeners() {
    const budgetTransactionsView = document.getElementById('budgetTransactionsView');
    if (budgetTransactionsView) {
      budgetTransactionsView.addEventListener('emitError', onEmitError);
      budgetTransactionsView.addEventListener('openTransaction', onOpenTransaction);
    }
  }

  render();
}
