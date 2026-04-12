const logPrefix = "[github-creation-date]";

export function log(...args: unknown[]) {
    console.log(logPrefix, ...args);
}

export function warn(...args: unknown[]) {
    console.warn(logPrefix, ...args);
}

export function error(...args: unknown[]) {
    console.error(logPrefix, ...args);
}