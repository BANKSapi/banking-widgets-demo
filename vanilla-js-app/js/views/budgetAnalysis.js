import router from '../router/router.js';

export default function BudgetAnalysis() {
  const app = document.getElementById('app');
  const token = localStorage.getItem('ba-token');

  async function onEmitError(e) {
    const { status, statusText } = e.detail;
    if(status === 401 || status === 403) {
      router.navigate('/login');
    }
    alert(`${status} ${statusText}`);
  }

  function onOpenCategory(e) {
    const { category } = e.detail;
    router.navigate(`/budget-analysis/category/${category}`);
  }

  function onOpenCategoryTransactions(e) {
    const { category } = e.detail;
    router.navigate(`/budget-analysis/category/${category}/transactions`);
  }

  function render() {
    app.innerHTML = `
      <ba-budget-analysis
        id="budgetAnalysisView"
        token="${token}"
      />
    `;

    attachEventListeners();
  }

  function attachEventListeners() {
    const budgetAnalysisView = document.getElementById('budgetAnalysisView');
    if (budgetAnalysisView) {
      budgetAnalysisView.addEventListener('openCategory', onOpenCategory);
      budgetAnalysisView.addEventListener('emitError', onEmitError);
      budgetAnalysisView.addEventListener('openCategoryTransactions', onOpenCategoryTransactions);
    }
  }

  render();
}
