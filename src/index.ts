import { App } from 'vue';
import { McGrid, McGridItem } from './grid';
import { McLoading } from './loading';
import { McPopconfirm } from './popconfirm';
import { McPopover } from './popover';
import { McPopselect } from './popselect';
import { McTextLink } from './text-link';

// 组件列表
const components = [McGrid, McGridItem, McLoading, McPopconfirm, McPopover, McPopselect, McTextLink];
// 使用所有组件
const McUI = (app: App) => {
    components.forEach(component => {
        app.component('Mc' + component.name, component);
    });
};
export { McGrid, McGridItem, McLoading, McPopconfirm, McPopover, McPopselect, McTextLink, McUI };
export default { McUI };
