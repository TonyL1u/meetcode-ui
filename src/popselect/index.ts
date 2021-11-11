import { App } from 'vue';
import McPopselect from './Popselect.vue';

// 在组件上添加install方法，方便直接使用单个组件
McPopselect.install = (app: App) => {
    app.component('McPopselect', McPopselect);
};

export default McPopselect;
