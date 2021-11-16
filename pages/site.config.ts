import { ref } from 'vue';
// import { useOsTheme } from 'naive-ui';

const isProduction = process.env.NODE_ENV === 'production';
// const osThemeRef = useOsTheme();
// true - 'dark', false - 'light'
// const siteTheme = ref(osThemeRef.value === 'dark');
const siteTheme = ref(false);
// const DOCS_STATIC_PATH = isProduction ? '/var/lib/jenkins/workspace/ComponentDocs/src/docs' : '/Users/liuyiming/Desktop/component-docs/src/docs';

export { siteTheme };
