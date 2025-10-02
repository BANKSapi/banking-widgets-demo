<script setup lang="ts">
import { useRouter } from "vue-router";

const {
  bankAccessId,
  bankAccountId,
  transactionId
} = defineProps<{
  bankAccessId: string,
  bankAccountId: string,
  transactionId: string
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

</script>

<template>
  <ba-account-transaction-detail
    :token="token"
    :bankAccessId="bankAccessId"
    :bankAccountId="bankAccountId"
    :transactionId="transactionId"
    @emitError="onEmitError"
  />
</template>
