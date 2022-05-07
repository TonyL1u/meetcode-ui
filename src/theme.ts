import { computed } from 'vue';
import { createGlobalState, useStorage, RemovableRef, createEventHook } from '@vueuse/core';
import type { EventHookOn } from '@vueuse/core';

type ThemeType = 'light' | 'dark';
const globalThemeState = createGlobalState(() => useStorage<ThemeType>('meetcode-ui-theme-local-storage', 'light'));
export const globalTheme: RemovableRef<ThemeType> = globalThemeState();
export const isLight = computed(() => globalTheme.value === 'light');
export const isDark = computed(() => globalTheme.value === 'dark');

/**
 * User's integrate theme controller
 */
export function useThemeController(initialTheme?: ThemeType) {
    const themeChangeEventHook = createEventHook<ThemeType>();
    const setTheme = (theme: ThemeType) => {
        globalTheme.value = theme;
    };

    if (initialTheme) setTheme(initialTheme);

    return {
        current: globalTheme,
        isDark,
        isLight,
        setTheme,
        switchTheme() {
            if (isLight.value) {
                setTheme('dark');
                themeChangeEventHook.trigger('dark');
            } else {
                setTheme('light');
                themeChangeEventHook.trigger('light');
            }
        },
        onThemeChange: themeChangeEventHook.on
    };
}
