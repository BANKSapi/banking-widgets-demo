import router from './router/router.js';
import Login from './views/login.js';
import Products from './views/products.js';
import Account from './views/account.js';
import Transaction from './views/transaction.js';
import Depot from './views/depot.js';
import Investment from './views/investment.js';
import BankAccessManager from './views/bankAccessManager.js';
import Regprotect from './views/regprotect.js';
import BudgetAnalysis from './views/budgetAnalysis.js';
import BudgetAnalysisCategory from './views/budgetAnalysisCategory.js';
import BudgetAnalysisCategoryTransactions from './views/budgetAnalysisCategoryTransactions.js';

router.addRoute('/', () => router.navigate('/login'));
router.addRoute('/login', Login);
router.addRoute('/products', Products);
router.addRoute('/bam', BankAccessManager);
router.addRoute('/regprotect', Regprotect);
router.addRoute('/products/:bankAccessId/account/:bankAccountId', Account);
router.addRoute('/products/:bankAccessId/account/:bankAccountId/transaction/:transactionId', Transaction);
router.addRoute('/products/:bankAccessId/depot/:depotId', Depot);
router.addRoute('/products/:bankAccessId/depot/:depotId/investment/:investmentId', Investment);
router.addRoute('/budget-analysis', BudgetAnalysis);
router.addRoute('/budget-analysis/category/:category', BudgetAnalysisCategory);
router.addRoute('/budget-analysis/category/:category/transactions', BudgetAnalysisCategoryTransactions);

router.beforeEach(async (path) => {
  const publicRoutes = ['/login', '/regprotect'];
  const token = localStorage.getItem('ba-token');

  if (!publicRoutes.includes(path) && !token) {
    router.navigate('/login');
    return false;
  }
  return true;
});

console.log('App initialized');