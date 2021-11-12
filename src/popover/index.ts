import { App } from 'vue';
import McPopover from './Popover.vue';

// 在组件上添加install方法，方便直接使用单个组件
McPopover.install = (app: App) => {
    app.component('McPopover', McPopover);
};

export default McPopover;
export type { PopoverExposeInstance, PopoverBaseProps } from './interface';
