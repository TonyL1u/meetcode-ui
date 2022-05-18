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

        const { title, indent } = toRefs(props);
        const { padding: menuPadding } = inject(menuInjectionKey, null) ?? {};
        const { padding: subMenuPadding } = inject(subMenuInjectionKey, null) ?? {};
        const selfPadding = computed(() => (indent.value ? indent.value : checkParent(subMenuIKey) ? (subMenuPadding?.value || 0) + 16 : (menuPadding?.value || 0) + 32));

        provide(menuGroupInjectionKey, {
            padding: selfPadding
        });

        // main logic...
        return () =>
            createVNode('li', { class: 'mc-menu-item-group' }, [
                createVNode('span', { class: 'mc-menu-item-group-title', style: { paddingLeft: `${selfPadding.value}px` } }, [title.value]),
                createVNode('ul', { class: 'mc-menu-item-group-children' }, [renderSlot(slots, 'default')])
            ]);
    }
});
