import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import CodeDemo from './components/CodeDemo.vue';
// 通用字体
import 'vfonts/Lato.css';
// 等宽字体
import 'vfonts/FiraCode.css';
// 引入tailwindcss
import './style/index.css';

createApp(App).use(router).component('CodeDemo', CodeDemo).mount('#app');
