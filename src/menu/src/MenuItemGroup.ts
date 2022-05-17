import { defineComponent, toRefs, renderSlot, createVNode, inject, provide, computed } from 'vue';
import { checkParent } from '../../_utils_';
import { menuIKey, subMenuIKey, menuItemGroupIKey, subMenuInjectionKey, menuInjectionKey, menuGroupInjectionKey, menuItemGroupProps } from '../interface';

export default defineComponent({
    name: 'MenuItemGroup',
    iKey: menuItemGroupIKey,
    props: menuItemGroupProps,
    setup(props, { slots }) {
        // if (!checkParent(menuIKey) && !checkParent(subMenuIKey)) {
        //     throw new Error('[McMenuItemGroup]: McMenuItemGroup must be placed inside McMenu or McSubMenu.');
        // }

        const { title } = toRefs(props);
        const { padding: menuPadding = 0 } = inject(menuInjectionKey, null) ?? {};
        const { padding: subMenuPadding = 0 } = inject(subMenuInjectionKey, null) ?? {};
        const selfPadding = computed(() => {
            return checkParent(subMenuIKey) ? subMenuPadding + 16 : menuPadding + 32;
        });

        provide(menuGroupInjectionKey, {
            padding: selfPadding.value
        });

        // main logic...
        return () =>
            createVNode('li', { class: 'mc-menu-item-group' }, [
                createVNode('span', { class: 'mc-menu-item-group-title', style: { paddingLeft: `${selfPadding.value}px` } }, [title.value]),
                createVNode('ul', { class: 'mc-menu-item-group-children' }, [renderSlot(slots, 'default')])
            ]);
    }
});
