import router from '../router/router.js';

export default function BudgetAnalysisCategory({ params }) {
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

  function onOpenCategoryTransactions(e) {
    const { category } = e.detail;
    router.navigate(`/budget-analysis/category/${category}/transactions`);
  }

  function render() {
    app.innerHTML = `
      <ba-budget-analysis-parent-category
        id="budgetCategoryView"
        token="${token}"
        parent-category="${category}"
      />
    `;

    attachEventListeners();
  }

  function attachEventListeners() {
    const budgetCategoryView = document.getElementById('budgetCategoryView');
    if (budgetCategoryView) {
      budgetCategoryView.addEventListener('openCategoryTransactions', onOpenCategoryTransactions);
      budgetCategoryView.addEventListener('emitError', onEmitError);
    }
  }

  render();
}
