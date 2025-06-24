<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import {onBeforeUnmount, onMounted } from "vue";

interface RegprotectElement extends HTMLElement {
  sessionLink?: string;
}

const route = useRoute();
const router = useRouter();
const sessionLink = route.query.sessionLink as string;
let wcElement: RegprotectElement | undefined;

function handleWebComponentListener(event: Event) {
  // event.detail will look something like this ->
  // http://localhost:8081/?event=accountCreated&accountId=06f589bd-8d35-494a-8056-2e5d927a3aa3&baReentry=ACCOUNT_CREATED

  const callbackUrl = (event as CustomEvent).detail;
  const base = '/banking-widgets-demo/';
  const targetPath = new URL(callbackUrl).pathname;

// Remove base from path if present
  const relativePath = targetPath.startsWith(base)
    ? targetPath.slice(base.length - 1) // preserve the leading slash
    : targetPath;

  router.push({ path: relativePath });
}

onMounted(() => {
  const container = document.getElementById('regprotect');
  wcElement = document.createElement('ba-regprotect') as RegprotectElement;
  wcElement.sessionLink = sessionLink;
  container?.appendChild(wcElement);
  wcElement?.addEventListener('subscribed', handleWebComponentListener);
})

onBeforeUnmount(() => {
  wcElement?.removeEventListener('subscribed', handleWebComponentListener);
  wcElement = undefined;
})
</script>
<template>
  <div id="regprotect" class="regprotect-container"></div>
</template>

<style scoped>
.regprotect-container {
  height: 100%;
  min-height: 800px;
  position: relative;
  margin: 20px;
  padding: 20px;
}
</style>
