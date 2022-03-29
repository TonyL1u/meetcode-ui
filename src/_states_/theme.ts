import { createGlobalState, useStorage, RemovableRef } from '@vueuse/core';

const useGlobalThemeState = createGlobalState(() => useStorage('meetcode-ui-theme-local-storage', 'light'));
export const globalTheme: RemovableRef<string> = useGlobalThemeState();

export default function setGlobalTheme(theme: 'light' | 'dark') {
    globalTheme.value = theme;
}
