import { defineComponent, renderSlot, createVNode, inject, computed, toRefs, getCurrentInstance } from 'vue';
import { checkParent } from '../../_utils_';
import { menuIKey, menuItemGroupIKey, subMenuIKey, menuItemIKey, menuItemProps, menuInjectionKey, subMenuInjectionKey, menuGroupInjectionKey } from '../interface';

export default defineComponent({
    name: 'MenuItem',
    props: menuItemProps,
    iKey: menuItemIKey,
    setup(props, { slots }) {
        // if (!checkParent(menuIKey) && !checkParent(menuItemGroupIKey) && !checkParent(subMenuIKey)) {
        //     throw new Error('[McMenuItem]: McMenuItem must be placed inside McMenu or McMenuItemGroup or McSubMenu.');
        // }
        const instance = getCurrentInstance();
        const key = instance?.vnode.key;
        const { indent } = toRefs(props);
        const { activeKey, updateKey, padding: menuPadding } = inject(menuInjectionKey, null) ?? {};
        const { padding: subMenuPadding } = inject(subMenuInjectionKey, null) ?? {};
        const { padding: menuItemGroupPadding } = inject(menuGroupInjectionKey, null) ?? {};
        const isActive = computed(() => !!(key && key === activeKey?.value));
        const selfPadding = computed(() => (indent.value ? indent.value : checkParent(menuItemGroupIKey) ? (menuItemGroupPadding?.value || 0) + 16 : ((checkParent(menuIKey) ? menuPadding?.value : subMenuPadding?.value) || 0) + 32));

        // main logic...
        return () =>
            createVNode(
                'li',
                {
                    class: ['mc-menu-item', isActive.value ? 'mc-menu-item--active' : ''],
                    style: { paddingLeft: `${selfPadding.value}px` },
                    onClick: () => {
                        key && updateKey?.(key);
                    }
                },
                [slots.icon ? createVNode('div', { class: 'mc-menu-item__icon' }, [renderSlot(slots, 'icon')]) : null, createVNode('div', { class: 'mc-menu-item__content' }, [renderSlot(slots, 'default')])]
            );
    }
});
