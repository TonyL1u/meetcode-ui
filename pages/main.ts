import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import meetcode from 'meetcode-ui';
// 通用字体
import 'vfonts/Lato.css';
// 等宽字体
import 'vfonts/FiraCode.css';
// 引入tailwindcss
import './styles/index.css';
import type { Component } from 'vue';

type VueGlobImportType = { default: Component };

const app = createApp(App);
app.use(router).use(meetcode).mount('#app');

// 组件注册
const docsComponents = import.meta.glob<VueGlobImportType>('./components/*.vue', { eager: true });
for (const path in docsComponents) {
    const nameMatcher = path.match(/components\/(.*).vue/);
    if (nameMatcher) app.component(nameMatcher[1], docsComponents[path].default);
}

// 注册全局demo组件
const zh_CN_Demos = import.meta.glob<VueGlobImportType>('../src/*/demos/zh-CN/*.vue', { eager: true });
for (const path in zh_CN_Demos) {
    const name = path.match(/\/src\/(.*)\/demos/);
    const demo = path.match(/\/zh-CN\/(.*).vue/);

    if (name && demo) {
        app.component(`${name[1]}-${demo[1]}-zh`, zh_CN_Demos[path].default);
    }
}
const en_US_Demos = import.meta.glob<VueGlobImportType>('../src/*/demos/en-US/*.vue', { eager: true });
for (const path in en_US_Demos) {
    const name = path.match(/\/src\/(.*)\/demos/);
    const demo = path.match(/\/en-US\/(.*).vue/);

    if (name && demo) {
        app.component(`${name[1]}-${demo[1]}-en`, en_US_Demos[path].default);
    }
}

// // 组件注册
// const docsComponents = import.meta.glob('./components/**');
// for (const path in docsComponents) {
//     const nameMatcher = path.match(/components\/(.*).vue/);
//     if (nameMatcher) {
//         const asyncComponent = defineAsyncComponent(docsComponents[path]);
//         app.component(nameMatcher[1], asyncComponent);
//     }
// }

// // 注册全局demo组件
// const zh_CN_Demos = import.meta.glob('../src/*/demos/zh-CN/*.vue');
// for (const path in zh_CN_Demos) {
//     const name = path.match(/\/src\/(.*)\/demos/);
//     const demo = path.match(/\/zh-CN\/(.*).vue/);

//     if (name && demo) {
//         const asyncComponent = defineAsyncComponent(zh_CN_Demos[path]);
//         app.component(`${name[1]}-${demo[1]}-zh`, asyncComponent);
//     }
// }
// const en_US_Demos = import.meta.glob('../src/*/demos/en-US/*.vue');
// for (const path in en_US_Demos) {
//     const name = path.match(/\/src\/(.*)\/demos/);
//     const demo = path.match(/\/en-US\/(.*).vue/);
//     if (name && demo) {
//         const asyncComponent = defineAsyncComponent(en_US_Demos[path]);
//         app.component(`${name[1]}-${demo[1]}-en`, asyncComponent);
//     }
// }
