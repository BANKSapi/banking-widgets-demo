// Import BanksAPI web components
// Load the web component scripts directly
const efcScript = document.createElement('script');
efcScript.type = 'module';
efcScript.src = import.meta.env.BASE_URL + 'assets/embeddable-finance-web-components.esm.js';
document.head.appendChild(efcScript);

// Import other components as modules
import '@banksapitechnology/bam-web-component/dist/bam.min.js';
import '@banksapitechnology/regprotect-web-component/dist/ba-regprotect.js';
