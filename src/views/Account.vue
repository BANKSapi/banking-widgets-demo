<script setup lang="ts">
import {useRoute, useRouter} from "vue-router";

defineProps<{
  bankAccessId: string,
  bankAccountId: string,
}>();

const router = useRouter();
const route = useRoute();

const refresh = route.query.refresh === 'true';

async function onEmitError(e: CustomEvent) {
  const { status, statusText } = e.detail;
  if(status === 401 || status === 403) {
    await router.push({ path: '/login' });
  }
  alert(`${status} ${statusText}`);
}

async function onInitSepaSingleTransfer(e: CustomEvent) {
  const { sessionLink } = e.detail;
  await router.push({ path: '/regprotect', query: { sessionLink }});
}

async function onOpenTransaction(e: CustomEvent) {
  const { bankAccessId, bankAccountId, transactionId } = e.detail;
  await router.push(`/products/${bankAccessId}/account/${bankAccountId}/transaction/${transactionId}`);
}

async function onGoBack(event: CustomEvent) {
  event.preventDefault();
  await router.push('/products');
}
</script>

<template>
  <ba-account-detail
    :refresh="refresh"
    :bankAccessId="bankAccessId"
    :bankAccountId="bankAccountId"
    @openTransaction="onOpenTransaction"
    @initSepaSingleTransfer="onInitSepaSingleTransfer"
    @emitError="onEmitError"
    @goBack="onGoBack"
  />
</template>
