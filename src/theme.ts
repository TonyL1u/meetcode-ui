import { watch } from 'vue';
import { createGlobalState, useStorage, RemovableRef } from '@vueuse/core';
import { CNode } from 'css-render';

const useGlobalThemeState = createGlobalState(() => useStorage('meetcode-ui-theme-local-storage', 'light'));
export const globalTheme: RemovableRef<string> = useGlobalThemeState();

export function setGlobalTheme(theme: 'light' | 'dark') {
    globalTheme.value = theme;
}

export function useTheme(config: { light?: CNode; dark?: CNode }) {
    const { light, dark } = config;
    watch(
        globalTheme,
        theme => {
            if (theme === 'light') {
                dark?.unmount();
                light?.mount();
            } else if (theme === 'dark') {
                light?.unmount();
                dark?.mount();
            }
        },
        { immediate: true }
    );
}
