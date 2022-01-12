import { ref } from 'vue';
// import { useOsTheme } from 'naive-ui';

const isProduction = process.env.NODE_ENV === 'production';
// const osThemeRef = useOsTheme();
// true - 'dark', false - 'light'
// const siteTheme = ref(osThemeRef.value === 'dark');
const siteTheme = ref(false);

export { siteTheme };
