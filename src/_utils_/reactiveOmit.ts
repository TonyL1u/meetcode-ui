import { reactivePick } from '@vueuse/core';

export function reactiveOmit<T extends object, K extends keyof T>(target: T, ...omitKeys: K[]) {
    const pickKeys = Object.keys(target).filter(k => !omitKeys.includes(k as K)) as Exclude<keyof T, K>[];
    return reactivePick<T, keyof Omit<T, K>>(target, ...pickKeys);
}
