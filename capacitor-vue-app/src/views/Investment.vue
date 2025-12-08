<script setup lang="ts">
import { useRouter } from "vue-router";

defineProps<{
  bankAccessId: string,
  depotId: string,
  investmentId: string
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
  <ba-depot-investment-detail
    :token="token"
    :bankAccessId="bankAccessId"
    :depotId="depotId"
    :investmentId="investmentId"
    @emitError="onEmitError"
  />
</template>
