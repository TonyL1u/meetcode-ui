import { defineComponent, onMounted, renderSlot, createVNode } from 'vue';
import { checkParent } from '../../_utils_';
import { menuIKey, menuItemGroupIKey } from '../interface';
import { mainCssr, lightCssr, darkCssr } from '../styles';

export default defineComponent({
    name: 'SubMenu',
    setup() {
        if (!checkParent(menuIKey)) {
            throw new Error('[McSubMenu]: McSubMenu must be placed inside McMenu.');
        }

        // main logic...
        return () => createVNode('ul', { class: 'mc-menu-group' });
    }
});
