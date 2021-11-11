import { App } from 'vue';
import McPopover from './popover';

// 组件列表
const components = [McPopover];
// 使用所有组件
const McUI = (app: App) => {
    components.forEach(component => {
        app.component(component.name || '', component);
    });
};
export { McPopover, McUI };
export default { McUI };
