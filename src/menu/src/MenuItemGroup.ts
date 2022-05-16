import { defineComponent, toRefs, renderSlot, createVNode } from 'vue';
import { checkParent } from '../../_utils_';
import { menuIKey, subMenuIKey, menuItemGroupIKey, menuItemGroupProps } from '../interface';
import { mainCssr, lightCssr, darkCssr } from '../styles';

export default defineComponent({
    name: 'MenuItemGroup',
    iKey: menuItemGroupIKey,
    props: menuItemGroupProps,
    setup(props, { slots }) {
        if (!checkParent(menuIKey) && !checkParent(subMenuIKey)) {
            throw new Error('[McMenuItemGroup]: McMenuItemGroup must be placed inside McMenu or McSubMenu.');
        }

        const { title } = toRefs(props);

        // main logic...
        return () => createVNode('li', { class: 'mc-menu-item-group' }, [createVNode('div', { style: 'padding-left: 32px' }, [title.value]), renderSlot(slots, 'default')]);
    }
});
