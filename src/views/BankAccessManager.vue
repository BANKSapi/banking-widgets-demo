<script setup lang="ts">
import {useRouter} from "vue-router";

const router = useRouter();
const token = localStorage.getItem('ba-token');

async function onOpenRegprotect(e: CustomEvent) {
  const { sessionLink } = e.detail;
  await router.push({ path: '/regprotect', query: { sessionLink }});
}

async function onOpenBankingView() {
  await router.push('/products?refresh=true');
}
</script>

<template>
  <ba-bam-dashboard
    :token="token"
    @openRegprotect="onOpenRegprotect"
    @openBankingView="onOpenBankingView"
    ref="bam-dashboard"
  />
</template>
