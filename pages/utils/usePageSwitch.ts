import { computed, watch, toRaw } from 'vue';

export interface SwitcherData {
    name: string;
    path: string;
}

export async function usePageSwitch() {
    const { router, route } = await onRouterReady();
    const routeIndex = computed(() => {
        return allRoutes.findIndex(r => r.path === route.path);
    });
    const next = computed<SwitcherData | null>(() => {
        if (current.value === null) return null;
        const nextRoute = allRoutes[routeIndex.value + 1];
        if (nextRoute) {
            const { name, path } = nextRoute;
            return { name, path };
        }

        return null;
    });
    const current = computed<SwitcherData | null>(() => {
        const { name = '', path = '' } = allRoutes[routeIndex.value] ?? {};

        if (name && path) return { name, path };
        return null;
    });
    const prev = computed<SwitcherData | null>(() => {
        if (current.value === null) return null;
        const prevRoute = allRoutes[routeIndex.value - 1];
        if (prevRoute) {
            const { name, path } = prevRoute;
            return { name, path };
        }

        return null;
    });

    return {
        prev,
        current,
        next,
        switchNext() {
            router.push(next.value?.path || '');
        },
        switchPrev() {
            router.push(prev.value?.path || '');
        }
    };
}
