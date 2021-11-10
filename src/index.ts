import { App } from 'vue';
import McPopover from './popover';

// 组件列表
const components = [McPopover];
// 使用所有组件
const install = (app: App) => {
    components.forEach(component => {
        app.component(component.name || '', component);
    });
};
export { McPopover, install };
export default { install };
