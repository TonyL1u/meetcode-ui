import { watch } from 'vue';
import { watchOnce } from '@vueuse/core';
import { useRouter, useRoute } from 'vue-router';
import type { Router, RouteLocationNormalizedLoaded } from 'vue-router';

export * from './usePageSwitch';

export function onRouterReady(): Promise<{ router: Router; route: RouteLocationNormalizedLoaded }>;
export function onRouterReady(cb: (router: Router, route: RouteLocationNormalizedLoaded) => void): void;
export function onRouterReady(cb?: (router: Router, route: RouteLocationNormalizedLoaded) => void) {
    const router = useRouter();
    const route = useRoute();
    const watchRoute = (cb: () => void) => {
        watchOnce(
            () => route.path,
            () => {
                cb();
            }
        );
    };

    if (cb) {
        watchRoute(() => {
            cb(router, route);
        });
    } else {
        return new Promise<{ router: Router; route: RouteLocationNormalizedLoaded }>(resolve => {
            watchRoute(() => {
                resolve({ router, route });
            });
        });
    }
}

export function onRouteChange<T extends keyof RouteLocationNormalizedLoaded>(key: T, cb: (value: RouteLocationNormalizedLoaded[T]) => void) {
    const route = useRoute();

    watch(
        () => route[key],
        value => {
            cb(value);
        }
    );
}

export function onRoutePathChange(cb: (path: string) => void) {
    onRouteChange('path', cb);
}
