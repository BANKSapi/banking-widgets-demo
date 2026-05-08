// Hidden runtime override for the API base URL — debugging / QA tool.
// Not needed for regular deployment; safely no-ops when no override is set.
// Activate with `?__bapi=https://...` (clear with `?__bapi=`); persists in sessionStorage for the active tab.

type OverrideKey = 'apiUrl';

const QUERY_PARAM: Record<OverrideKey, string> = {
  apiUrl: '__bapi',
};

const STORAGE_KEY: Record<OverrideKey, string> = {
  apiUrl: 'banksapi:override:apiUrl',
};

declare global {
  interface Window {
    __banksapi?: Partial<Record<OverrideKey, string>>;
  }
}

function isValidHttpUrl(value: string): boolean {
  try {
    const url = new URL(value);
    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch {
    return false;
  }
}

function readSessionStorage(key: OverrideKey): string | null {
  try {
    const value = window.sessionStorage.getItem(STORAGE_KEY[key]);
    return value && isValidHttpUrl(value) ? value : null;
  } catch {
    return null;
  }
}

function readDeployOverride(key: OverrideKey): string | null {
  const value = window.__banksapi?.[key];
  return value && isValidHttpUrl(value) ? value : null;
}

export function getOverride(key: OverrideKey, fallback: string): string {
  return readSessionStorage(key) ?? readDeployOverride(key) ?? fallback;
}

export function bootRuntimeOverride(): void {
  const url = new URL(window.location.href);
  let mutated = false;

  for (const key of Object.keys(QUERY_PARAM) as OverrideKey[]) {
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
      // ignore sessionStorage failures (private mode, etc.)
    }
    url.searchParams.delete(param);
    mutated = true;
  }

  if (mutated) {
    const cleaned = url.pathname + (url.searchParams.toString() ? `?${url.searchParams}` : '') + url.hash;
    window.history.replaceState(window.history.state, '', cleaned);
  }

  const active: Partial<Record<OverrideKey, string>> = {};
  for (const key of Object.keys(STORAGE_KEY) as OverrideKey[]) {
    const v = readSessionStorage(key) ?? readDeployOverride(key);
    if (v) active[key] = v;
  }
  if (Object.keys(active).length > 0) {
    console.warn('[banksapi] runtime override active', active);
  }
}
