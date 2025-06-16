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

async function onOpenCategoryTransactions(e: CustomEvent) {
  const { category } = e.detail;
  await router.push(`/budget-analysis/category/${category}/transactions`);
}
</script>

<template>
  <ba-budget-analysis-parent-category
    :token="token"
    :parentCategory="category"
    @emitError="onEmitError"
    @openCategoryTransactions="onOpenCategoryTransactions"
  />
</template>
