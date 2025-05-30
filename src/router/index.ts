import { createRouter, createWebHistory } from 'vue-router'
import Products from '../views/Products.vue'
import Login from "../views/Login.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/products',
    },
    {
      path: '/bam',
      component: () => import('../views/BankAccessManager.vue')
    },
    {
      path: '/regprotect',
      component: () => import('../views/Regprotect.vue'),
      props: (route) => ({
        sessionLink: route.query.sessionLink,
      }),
    },
    {
      path: '/products',
      component: Products,
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/products/:bankAccessId/account/:bankAccountId',
      component: () => import('../views/Account.vue'),
      props: true
    },
    {
      path: '/products/:bankAccessId/account/:bankAccountId/transaction/:transactionId',
      component: () => import('../views/Transaction.vue'),
      props: true
    },
    {
      path: '/products/:bankAccessId/depot/:depotId',
      component: () => import('../views/Depot.vue'),
      props: true
    },
    {
      path: '/products/:bankAccessId/depot/:depotId/investment/:investmentId',
      component: () => import('../views/Investment.vue'),
      props: true
    },
    {
      path: '/budget-analysis',
      component: () => import('../views/BudgetAnalysis.vue'),
    },
    {
      path: '/budget-analysis/category/:category',
      component: () => import('../views/BudgetAnalysisCategory.vue'),
      props: true
    },
    {
      path: '/budget-analysis/category/:category/transactions',
      component: () => import('../views/BudgetAnalysisCategoryTransactions.vue'),
      props: true
    }
  ],
});

export default router;
