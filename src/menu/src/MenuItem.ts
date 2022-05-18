import { defineComponent, renderSlot, createVNode, inject, computed, toRefs, getCurrentInstance } from 'vue';
import { checkParent } from '../../_utils_';
import { menuIKey, menuItemGroupIKey, subMenuIKey, menuItemIKey, menuItemProps, menuInjectionKey, subMenuInjectionKey, menuGroupInjectionKey } from '../interface';

export default defineComponent({
    name: 'MenuItem',
    props: menuItemProps,
    iKey: menuItemIKey,
    setup(props, { slots, attrs }) {
        // if (!checkParent(menuIKey) && !checkParent(menuItemGroupIKey) && !checkParent(subMenuIKey)) {
        //     throw new Error('[McMenuItem]: McMenuItem must be placed inside McMenu or McMenuItemGroup or McSubMenu.');
        // }
        const instance = getCurrentInstance();
        const key = instance?.vnode.key;
        const { indent } = toRefs(props);
        const { activeKey, updateKey, padding: menuPadding = 0 } = inject(menuInjectionKey, null) ?? {};
        const { padding: subMenuPadding = 0 } = inject(subMenuInjectionKey, null) ?? {};
        const { padding: menuItemGroupPadding = 0 } = inject(menuGroupInjectionKey, null) ?? {};
        const isActive = computed(() => !!(key && key === activeKey?.value));
        const selfPadding = computed(() => (indent.value ? indent.value : checkParent(menuItemGroupIKey) ? menuItemGroupPadding + 16 : (checkParent(menuIKey) ? menuPadding : subMenuPadding) + 32));

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
                [renderSlot(slots, 'default')]
            );
    }
});
