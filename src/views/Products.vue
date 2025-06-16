<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";

const router = useRouter();
const route = useRoute();

const refresh = route.query.refresh === 'true';

const token = localStorage.getItem('ba-token');

function onOpenBudgetAnalysis() {
  router.push({ path: '/budget-analysis' });
}

async function onEmitError(e: CustomEvent) {
  const { status, statusText } = e.detail;
  if(status === 401 || status === 403) {
    await router.push({ path: '/login' });
  }
  alert(`${status} ${statusText}`);
}

async function onOpenProduct(e: CustomEvent) {
  const { category, bankAccessId, productId } = e.detail
    if (category === 'DEPOT') {
      await router.push(`/products/${bankAccessId}/depot/${productId}`);
    } else {
      await router.push(`/products/${bankAccessId}/account/${productId}`);
    }
}

async function onAddBankAccess(e: CustomEvent) {
  const { sessionLink } = e.detail;
  await router.push({ path: '/regprotect', query: { sessionLink }});
}

async function onManageBankAccess() {
  await router.push({ path: '/bam' });
}
</script>

<template>
  <ba-product-list
    :token="token"
    :refresh="refresh"
    @openProduct="onOpenProduct"
    @openBudgetAnalysis="onOpenBudgetAnalysis"
    @emitError="onEmitError"
    @addBankAccess="onAddBankAccess"
    @manageBankAccess="onManageBankAccess"
  />
</template>
