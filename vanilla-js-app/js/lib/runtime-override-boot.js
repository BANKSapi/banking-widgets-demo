// Side-effect import: runs the runtime-override boot before the rest of the app
// (including the router) initializes. See ./runtime-override.js for details.
// Debugging / QA tool; not needed for regular deployment.
import { bootRuntimeOverride } from './runtime-override.js';

bootRuntimeOverride();
