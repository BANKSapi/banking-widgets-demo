import './assets/main.css'
import './web-components'

import { App as CapacitorApp, type URLOpenListenerEvent } from '@capacitor/app';
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App);

app.use(router);

app.mount('#app');

CapacitorApp.addListener('appUrlOpen', function (event: URLOpenListenerEvent) {
  // Example url: bwd://localhost/regprotect https://demv.de
  // slug = /regprotect
  // Extract slug (pathname + search)
  const url = new URL(event.url);
  const slug = url.pathname;

  // We only push to the route if there is a slug present
  if (slug) {
    const queryParams = Object.fromEntries(url.searchParams);
    console.log('App opened with URL:', slug);
    router.push({ path: slug, query: queryParams });
  }
});
