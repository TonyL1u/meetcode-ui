import { ref, watch } from 'vue';
import { setGlobalTheme } from 'meetcode-ui';

const siteTheme = ref<'light' | 'dark'>('light');

watch(
    siteTheme,
    theme => {
        setGlobalTheme(theme);
    },
    { immediate: true }
);

export { siteTheme };
