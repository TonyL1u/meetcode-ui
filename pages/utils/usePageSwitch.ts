import { computed } from 'vue';
import { routes } from '../docs';
import { onRouterReady } from '.';

export interface SwitcherData {
    name: string;
    path: string;
}

export async function usePageSwitch() {
    const { router, route } = await onRouterReady();
    const routeIndex = computed(() => {
        return routes.value.findIndex(r => r.path === route.path);
    });
    const next = computed<SwitcherData | null>(() => {
        const nextRoute = routes.value[routeIndex.value + 1];
        if (nextRoute) {
            const { name, path } = nextRoute;
            return { name, path };
        }

        return null;
    });
    const current = computed<SwitcherData>(() => {
        const { name = '', path = '' } = routes.value[routeIndex.value] ?? {};

        return { name, path };
    });
    const prev = computed<SwitcherData | null>(() => {
        const prevRoute = routes.value[routeIndex.value - 1];
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
