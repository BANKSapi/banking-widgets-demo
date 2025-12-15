<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import { onBeforeUnmount, onMounted, watch } from "vue";

interface RegprotectElement extends HTMLElement {
  sessionLink: string;
  reentryUrl?: string;
}

const route = useRoute();
const router = useRouter();
let wcElement: RegprotectElement | undefined;

function handleWebComponentListener(event: Event) {
  // event.detail will look something like this ->
  // http://localhost:8081/?event=accountCreated&accountId=06f589bd-8d35-494a-8056-2e5d927a3aa3&baReentry=ACCOUNT_CREATED

  const callbackUrl = (event as CustomEvent).detail;
  const base = import.meta.env.BASE_URL;
  const targetPath = new URL(callbackUrl).pathname;

  // Remove base from path if present
  const relativePath = targetPath.startsWith(base)
    ? targetPath.slice(base.length - 1) // preserve the leading slash
    : targetPath;

  router.push({ path: relativePath });
}

function createWebComponent() {
  // Clean up existing web component if it exists
  if (wcElement) {
    wcElement.removeEventListener('subscribed', handleWebComponentListener);
    const container = document.getElementById('regprotect');
    if (container && wcElement.parentNode === container) {
      container.removeChild(wcElement);
    }
    wcElement = undefined;
  }

  // Create new web component
  const container = document.getElementById('regprotect');
  if (container) {
    const sessionLink = route.query.sessionLink as string;
    wcElement = document.createElement('ba-regprotect') as RegprotectElement;
    wcElement.sessionLink = sessionLink;
    // this reentryUrl is used to redirect back to the app after the user has performed SCA at the provider's site
    wcElement.reentryUrl = `bwd://localhost/regprotect?redirect=${Date.now()}`;
    container.appendChild(wcElement);
    wcElement.addEventListener('subscribed', handleWebComponentListener);
    console.log('Regprotect web component created', route.query.redirect ? 'via redirect' : 'normally');
  }
}

// Watch for redirect query parameter
watch(
  () => route.query.redirect,
  (redirect) => {
    if (!!redirect && route.path === '/regprotect') {
      console.log('Redirect detected, recreating Regprotect web component');
      createWebComponent();
    }
  }
);

onMounted(() => {
  createWebComponent();
})

onBeforeUnmount(() => {
  if (wcElement) {
    wcElement.removeEventListener('subscribed', handleWebComponentListener);
    const container = document.getElementById('regprotect');
    if (container && wcElement.parentNode === container) {
      container.removeChild(wcElement);
    }
    wcElement = undefined;
  }
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
