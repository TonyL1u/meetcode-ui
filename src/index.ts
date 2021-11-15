import { App } from 'vue';
import { McGrid, McGridItem } from './grid';
import { McPopconfirm } from './popconfirm';
import { McPopover } from './popover';
import { McPopselect } from './popselect';

// 组件列表
const components = [McGrid, McGridItem, McPopconfirm, McPopover, McPopselect];
// 使用所有组件
const McUI = (app: App) => {
    components.forEach(component => {
        app.component('Mc' + component.name, component);
    });
};
export { McGrid, McGridItem, McPopconfirm, McPopover, McPopselect, McUI };
export default { McUI };
