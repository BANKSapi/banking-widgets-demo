<script setup lang="ts">
import { useRouter } from "vue-router";

defineProps<{
  category: string
}>();

const router = useRouter();

const token = localStorage.getItem('ba-token');

async function onEmitError(e: CustomEvent) {
  const { status, statusText } = e.detail;
  if(status === 401 || status === 403) {
    await router.push({ path: '/login' });
  }
  alert(`${status} ${statusText}`);
}

async function onOpenTransaction(e: CustomEvent) {
  const { bankAccessId, bankAccountId, transactionId } = e.detail;
  await router.push(`/products/${bankAccessId}/account/${bankAccountId}/transaction/${transactionId}`);
}
</script>

<template>
  <ba-budget-analysis-category-transactions
    :token="token"
    :category="category"
    @emitError="onEmitError"
    @openTransaction="onOpenTransaction"
  />
</template>
