import { watch } from 'vue';
import { globalTheme, isLight, isDark } from '../theme';
import type { CNode } from 'css-render';

export interface CSSRenderState {
    key: string;
    name: string;
    isMounted: boolean;
    isStatic: boolean;
    theme: CNode;
}
export interface Theme {
    key: string;
    main?: CNode;
    light?: CNode;
    dark?: CNode;
    custom?: CNode;
}

const useLight: CSSRenderState[] = [];
const useDark: CSSRenderState[] = [];

function unregisterTheme(name: string) {
    const { states = [] } = ThemeMap.get(name) ?? {};

    states
        .filter(state => state.isMounted)
        .forEach(state => {
            state.theme.unmount();
            state.isMounted = false;
        });
}

function registerTheme(name: string): void;
function registerTheme(name: string, component: string): void;
function registerTheme(name: string, component?: string) {
    function getState(states: CSSRenderState[], name: string) {
        return states.find(state => state.name === name);
    }

    const { inherit, states = [] } = ThemeMap.get(name) ?? {};
    const inheritStates = (inherit ? ThemeMap.get(inherit)?.states : []) ?? [];

    if (component) {
        // 增量注册
        const state = getState(states, component) ?? getState(inheritStates, component);
        if (state) {
            state.theme.mount({ id: state.key });
            state.isMounted = true;
        }
    } else {
        // 全量注册
        const mergedStates = [...inheritStates.filter(({ name }) => !!!getState(states, name)), ...states];
        mergedStates
            .filter(state => !state.isMounted)
            .forEach(state => {
                state.theme.mount({ id: state.key });
                state.isMounted = true;
            });
    }
}

function useLightTheme(id: string, theme: CNode) {
    const key = `Mc${id}-light`;
    if (useLight.findIndex(l => l.key === key) > -1) return;

    const state: CSSRenderState = {
        key,
        name: id,
        isMounted: false,
        isStatic: false,
        theme
    };

    useLight.push(state);
}

function useDarkTheme(id: string, theme: CNode) {
    const key = `Mc${id}-dark`;
    if (useDark.findIndex(d => d.key === key) > -1) return;

    const state: CSSRenderState = {
        key,
        name: id,
        isMounted: false,
        isStatic: false,
        theme
    };

    useDark.push(state);
}

export function useThemeRegister(theme: Theme) {
    const { key, main, light, dark } = theme;

    main?.mount({ id: `Mc${key}` });
    light && useLightTheme(key, light);
    dark && useDarkTheme(key, dark);

    registerTheme(globalTheme.value, key);
}

export const ThemeMap = new Map<
    string,
    {
        inherit?: 'light' | 'dark' | string;
        states: CSSRenderState[];
    }
>();
ThemeMap.set('light', { states: useLight });
ThemeMap.set('dark', { states: useDark });

watch(
    globalTheme,
    (newTheme, oldTheme) => {
        // console.log(ThemeMap);
        // console.log(newTheme, oldTheme);
        unregisterTheme(oldTheme || '');
        registerTheme(newTheme);
    },
    { immediate: true }
);
