import { watchOnce, createEventHook } from '@vueuse/core';
import { useRouter, useRoute } from 'vue-router';
import type { Router, RouteLocationNormalized, RouteLocationNormalizedLoaded } from 'vue-router';
import type { EventHook, EventHookOn } from '@vueuse/core';

interface RouterUtils {
    router: Router;
    route: RouteLocationNormalizedLoaded;
}
type HookPayload<T extends keyof RouteLocationNormalizedLoaded> = Record<T, RouteLocationNormalizedLoaded[T]> & { route: RouteLocationNormalizedLoaded };
interface UseRouterEventHookReturn {
    onRouterReady(): Promise<RouterUtils> | undefined;
    onRouterReady(cb: (router: Router, route: RouteLocationNormalizedLoaded) => void): void;
    onRoutePathChange: EventHookOn<{ path: string; route: RouteLocationNormalizedLoaded }>;
    // ToDo -- 这里可以考虑使用柯里化...
    onRouteChange<T extends keyof RouteLocationNormalizedLoaded>(key: T, cb: (payload: HookPayload<T>) => void): { off: () => void };
}

export function useRouterEventHook(): UseRouterEventHookReturn {
    function createRouteChangeEventHook<T extends keyof RouteLocationNormalizedLoaded>(key: T) {
        if (!hooksMap[key]) {
            const hook = createEventHook<HookPayload<T>>();
            hooksMap[key] = hook;
            return hook;
        }
        return hooksMap[key] as EventHook<HookPayload<T>>;
    }

    const router = useRouter();
    const route = useRoute();
    const hooksMap: Partial<Record<keyof RouteLocationNormalizedLoaded, EventHook>> = {};

    router.afterEach((to, from) => {
        Object.keys(hooksMap).forEach(key => {
            const routeKey = key as keyof RouteLocationNormalized;
            if (to[routeKey] !== from[routeKey]) hooksMap[routeKey]?.trigger({ [key]: to[routeKey], route });
        });
    });

    return {
        onRouterReady(cb?: (router: Router, route: RouteLocationNormalizedLoaded) => void) {
            const watchRoute = (cb: () => void) => {
                watchOnce(() => route.path, cb);
            };

            if (cb) {
                watchRoute(cb.bind(this, router, route));
            } else {
                return new Promise<RouterUtils>(resolve => {
                    watchRoute(resolve.bind(this, { router, route }));
                });
            }
        },
        onRoutePathChange: createRouteChangeEventHook('path').on,
        onRouteChange<T extends keyof RouteLocationNormalizedLoaded>(key: T, cb: (payload: HookPayload<T>) => void) {
            return createRouteChangeEventHook(key).on(cb);
        }
    };
}
