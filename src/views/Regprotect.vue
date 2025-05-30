<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import {onBeforeUnmount, onMounted, useTemplateRef} from "vue";

interface RegprotectElement extends HTMLElement {
  sessionLink?: string;
}

const route = useRoute();
const router = useRouter();
const sessionLink = route.query.sessionLink as string;
let wcElement: RegprotectElement | undefined;

function handleWebComponentListener(event: Event) {
  console.log('[REG/Protect WC event]', event);
  // event.detail will look something like this ->
  // http://localhost:8081/?event=accountCreated&accountId=06f589bd-8d35-494a-8056-2e5d927a3aa3&baReentry=ACCOUNT_CREATED

  const callbackUrl = (event as CustomEvent).detail;
  router.push(`${new URL(callbackUrl).pathname}?refresh=true`);
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
