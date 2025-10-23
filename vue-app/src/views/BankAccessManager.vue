<script setup lang="ts">
import {useRouter} from "vue-router";

const router = useRouter();
const token = localStorage.getItem('ba-token');

async function onOpenRegprotect(e: CustomEvent) {
  const { sessionLink } = e.detail;
  await router.push({ path: '/regprotect', query: { sessionLink }});
}

async function onOpenBankingView() {
  await router.push('/products');
}
</script>

<template>
  <ba-bam-dashboard
    :token="token"
    :tenantId="'54b8ffa2-c618-4496-9534-c1db776d61c7'"
    @openRegprotect="onOpenRegprotect"
    @openBankingView="onOpenBankingView"
    ref="bam-dashboard"
  />
</template>
