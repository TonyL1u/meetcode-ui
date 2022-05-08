import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
// 通用字体
import 'vfonts/Lato.css';
// 等宽字体
import 'vfonts/FiraCode.css';
// 引入tailwindcss
import './styles/index.css';

const app = createApp(App);
app.use(router).mount('#app');

// 组件注册
const docsComponents = import.meta.globEager('./components/*.vue');
for (const path in docsComponents) {
    const nameMatcher = path.match(/components\/(.*).vue/);
    if (nameMatcher) app.component(nameMatcher[1], docsComponents[path].default);
}
