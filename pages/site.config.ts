import { ref, watch } from 'vue';
import { globalTheme, setGlobalTheme } from 'meetcode-ui';

type SiteTheme = 'light' | 'dark';
const siteTheme = ref<SiteTheme>(globalTheme.value as SiteTheme);

watch(
    siteTheme,
    theme => {
        setGlobalTheme(theme);
    },
    { immediate: true }
);

export { siteTheme };
