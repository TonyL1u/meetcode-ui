import { App } from 'vue';
import McPopconfirm from './popconfirm';
import McPopover from './popover';
import McPopselect from './popselect';

// 组件列表
const components = [McPopconfirm, McPopover, McPopselect];
// 使用所有组件
const McUI = (app: App) => {
    components.forEach(component => {
        app.component(component.name || '', component);
    });
};
export { McPopconfirm, McPopover, McPopselect, McUI };
export default { McUI };
