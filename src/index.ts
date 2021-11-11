import { App } from 'vue';
import { McPopover } from './popover';
import { McPopselect } from './popselect';

// 组件列表
const components = [McPopover, McPopselect];
// 使用所有组件
const McUI = (app: App) => {
    components.forEach(component => {
        app.component(component.name || '', component);
    });
};
export { McPopover, McPopselect, McUI };
export default { McUI };
