import { App } from 'vue';
import McPopconfirm from './Popconfirm.vue';

// 在组件上添加install方法，方便直接使用单个组件
McPopconfirm.install = (app: App) => {
    app.component('McPopconfirm', McPopconfirm);
};

export default McPopconfirm;
