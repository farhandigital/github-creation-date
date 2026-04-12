import { GM_getValue, GM_setValue } from '$';

const CACHE_PREFIX = 'creationDate:';

export function getCached(key: string): string | null {
    const value = GM_getValue<string | null>(CACHE_PREFIX + key, null);
    return value ?? null;
}

export function setCached(key: string, value: string): void {
    GM_setValue(CACHE_PREFIX + key, value);
}
