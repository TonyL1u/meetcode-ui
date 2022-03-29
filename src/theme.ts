import { watch, reactive } from 'vue';
import { createGlobalState, useStorage, RemovableRef } from '@vueuse/core';
import { CNode } from 'css-render';

interface CSSRenderState {
    key: string;
    isMounted: boolean;
    theme: CNode;
}
const useLight = reactive<CSSRenderState[]>([]);
const useDark = reactive<CSSRenderState[]>([]);
const useGlobalThemeState = createGlobalState(() => useStorage('meetcode-ui-theme-local-storage', 'light'));
export const globalTheme: RemovableRef<string> = useGlobalThemeState();

function registerLightTheme() {
    useDark
        .filter(d => d.isMounted)
        .forEach(d => {
            d.theme.unmount();
            d.isMounted = false;
        });

    useLight
        .filter(l => !l.isMounted)
        .forEach(l => {
            l.theme.mount({ id: l.key });
            l.isMounted = true;
        });
}

function registerDarkTheme() {
    useLight
        .filter(l => l.isMounted)
        .forEach(l => {
            l.theme.unmount();
            l.isMounted = false;
        });

    useDark
        .filter(d => !d.isMounted)
        .forEach(d => {
            d.theme.mount({ id: d.key });
            d.isMounted = true;
        });
}

watch(
    globalTheme,
    theme => {
        if (theme === 'dark') {
            registerDarkTheme();
        } else {
            registerLightTheme();
        }
    },
    { immediate: true }
);

export function useLightTheme(id: string, theme: CNode) {
    const key = `${id}-light`;
    const state: CSSRenderState = {
        key,
        isMounted: false,
        theme
    };

    if (globalTheme.value === 'light') {
        theme.mount({ id: key });
        state.isMounted = true;
    }
    // @ts-ignore
    useLight.push(state);
}

export function useDarkTheme(id: string, theme: CNode) {
    const key = `${id}-dark`;
    const state: CSSRenderState = {
        key,
        isMounted: false,
        theme
    };

    if (globalTheme.value === 'dark') {
        theme.mount({ id: key });
        state.isMounted = true;
    }
    // @ts-ignore
    useDark.push(state);
}

export function setGlobalTheme(theme: 'light' | 'dark') {
    globalTheme.value = theme;
}

// export function useTheme(config: { light?: CNode; dark?: CNode }) {
//     const { light, dark } = config;
//     watch(
//         globalTheme,
//         theme => {
//             if (theme === 'light') {
//                 dark?.unmount();
//                 light?.mount();
//             } else if (theme === 'dark') {
//                 light?.unmount();
//                 dark?.mount();
//             }
//         },
//         { immediate: true }
//     );
// }
