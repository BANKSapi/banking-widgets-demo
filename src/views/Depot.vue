<script setup lang="ts">
import { useRouter } from "vue-router";

defineProps<{
  bankAccessId: string,
  depotId: string,
}>();

const router = useRouter();

async function onEmitError(e: CustomEvent) {
  const { status, statusText } = e.detail;
  if(status === 401 || status === 403) {
    await router.push({ path: '/login' });
  }
  alert(`${status} ${statusText}`);
}

async function onOpenInvestment(e: CustomEvent) {
  const { bankAccessId, depotId, investmentId } = e.detail;
  await router.push(`/products/${bankAccessId}/depot/${depotId}/investment/${investmentId}`);
}
</script>

<template>
  <ba-depot-detail
    :bankAccessId="bankAccessId"
    :depotId="depotId"
    @openInvestment="onOpenInvestment"
    @emitError="onEmitError"
  />
</template>
