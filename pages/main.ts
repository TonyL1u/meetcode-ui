import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import CodeDemo from './components/CodeDemo.vue';
// import { upperFirstLetter } from './utils';
// 通用字体
import 'vfonts/Lato.css';
// 等宽字体
import 'vfonts/FiraCode.css';
// 引入tailwindcss
import './styles/index.css';

const app = createApp(App);
app.use(router).component('CodeDemo', CodeDemo).mount('#app');

// 注册全局demo组件
// const zh_CN_Demos = import.meta.globEager('../src/*/demos/zh-CN/*.vue');
// for (const path in zh_CN_Demos) {
//     const name = path.match(/\/src\/(.*)\/demos/);
//     const demo = path.match(/\/zh-CN\/(.*).vue/);

//     if (name && demo) {
//         app.component(`${upperFirstLetter(name[1])}${demo[1]}-zh`, zh_CN_Demos[path].default);
//     }
// }
// const en_US_Demos = import.meta.globEager('../src/*/demos/en-US/*.vue');
// for (const path in en_US_Demos) {
//     const name = path.match(/\/src\/(.*)\/demos/);
//     const demo = path.match(/\/en-US\/(.*).vue/);
//     if (name && demo) {
//         app.component(`${upperFirstLetter(name[1])}${demo[1]}-en`, en_US_Demos[path].default);
//     }
// }
