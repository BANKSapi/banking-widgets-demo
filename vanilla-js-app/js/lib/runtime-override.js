// Hidden runtime override for the API base URL — debugging / QA tool.
// Not needed for regular deployment; safely no-ops when no override is set.
// Activate with `?__bapi=https://...` (clear with `?__bapi=`); persists in sessionStorage for the active tab.

const QUERY_PARAM = {
  apiUrl: '__bapi',
};

const STORAGE_KEY = {
  apiUrl: 'banksapi:override:apiUrl',
};

function isValidHttpUrl(value) {
  try {
    const url = new URL(value);
    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch {
    return false;
  }
}

function readSessionStorage(key) {
  try {
    const value = window.sessionStorage.getItem(STORAGE_KEY[key]);
    return value && isValidHttpUrl(value) ? value : null;
  } catch {
    return null;
  }
}

function readDeployOverride(key) {
  const value = window.__banksapi && window.__banksapi[key];
  return value && isValidHttpUrl(value) ? value : null;
}

export function getOverride(key, fallback) {
  return readSessionStorage(key) ?? readDeployOverride(key) ?? fallback;
}

export function bootRuntimeOverride() {
  const url = new URL(window.location.href);
  let mutated = false;

  for (const key of Object.keys(QUERY_PARAM)) {
    const param = QUERY_PARAM[key];
    if (!url.searchParams.has(param)) continue;

    const raw = url.searchParams.get(param) ?? '';
    try {
      if (raw === '') {
        window.sessionStorage.removeItem(STORAGE_KEY[key]);
      } else if (isValidHttpUrl(raw)) {
        window.sessionStorage.setItem(STORAGE_KEY[key], raw);
      }
    } catch {
      // ignore sessionStorage failures
    }
    url.searchParams.delete(param);
    mutated = true;
  }

  if (mutated) {
    const cleaned = url.pathname + (url.searchParams.toString() ? `?${url.searchParams}` : '') + url.hash;
    window.history.replaceState(window.history.state, '', cleaned);
  }

  const active = {};
  for (const key of Object.keys(STORAGE_KEY)) {
    const v = readSessionStorage(key) ?? readDeployOverride(key);
    if (v) active[key] = v;
  }
  if (Object.keys(active).length > 0) {
    console.warn('[banksapi] runtime override active', active);
  }
}
