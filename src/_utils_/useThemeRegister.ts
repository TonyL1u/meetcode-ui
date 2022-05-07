import { reactive, watch } from 'vue';
import { globalTheme, isLight, isDark } from '../theme';
import type { CNode } from 'css-render';

interface CSSRenderState {
    key: string;
    isMounted: boolean;
    isStatic: boolean;
    theme: CNode;
}
interface Theme {
    key: string;
    main?: CNode;
    light?: CNode;
    dark?: CNode;
    custom?: CNode;
}

const useLight = reactive<CSSRenderState[]>([]);
const useDark = reactive<CSSRenderState[]>([]);

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

function useLightTheme(id: string, theme: CNode) {
    const key = `${id}-light`;
    if (useLight.findIndex(l => l.key === key) > -1) return;

    const state: CSSRenderState = {
        key,
        isMounted: false,
        isStatic: false,
        theme
    };

    if (isLight.value) {
        theme.mount({ id: key });
        state.isMounted = true;
    }
    // @ts-ignore
    useLight.push(state);
}

function useDarkTheme(id: string, theme: CNode) {
    const key = `${id}-dark`;
    if (useDark.findIndex(d => d.key === key) > -1) return;

    const state: CSSRenderState = {
        key,
        isMounted: false,
        isStatic: false,
        theme
    };

    if (isDark.value) {
        theme.mount({ id: key });
        state.isMounted = true;
    }
    // @ts-ignore
    useDark.push(state);
}

export function useThemeRegister(theme: Theme) {
    const { key, main, light, dark } = theme;

    main?.mount({ id: key });
    light && useLightTheme(key, light);
    dark && useDarkTheme(key, dark);
}
