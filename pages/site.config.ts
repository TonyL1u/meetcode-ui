import { ref, watch, computed } from 'vue';
import { globalTheme, setGlobalTheme } from 'meetcode-ui';

type SiteTheme = 'light' | 'dark';
export const siteTheme = ref<SiteTheme>(globalTheme.value);
export const isLight = computed(() => siteTheme.value === 'light');
export const isDark = computed(() => siteTheme.value === 'dark');

watch(
    siteTheme,
    theme => {
        setGlobalTheme(theme);
    },
    { immediate: true }
);
