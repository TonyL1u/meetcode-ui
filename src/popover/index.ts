import { App } from 'vue';
// 随便写一个组件就行
import McPopover from './McPopover.vue';

// 在组件上添加install方法，方便直接使用单个组件
McPopover.install = (app: App) => {
    app.component('McPopover', McPopover);
};

export default McPopover;