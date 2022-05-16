import { defineComponent, renderSlot, createVNode, inject, computed, toRefs, getCurrentInstance } from 'vue';
import { checkParent } from '../../_utils_';
import { menuIKey, menuItemGroupIKey, subMenuIKey, menuItemProps, menuInjectionKey } from '../interface';

export default defineComponent({
    name: 'MenuItem',
    props: menuItemProps,
    setup(props, { slots, attrs }) {
        if (!checkParent(menuIKey) && !checkParent(menuItemGroupIKey) && !checkParent(subMenuIKey)) {
            throw new Error('[McMenuItem]: McMenuItem must be placed inside McMenu or McMenuItemGroup or McSubMenu.');
        }
        const instance = getCurrentInstance();
        const {} = toRefs(props);
        const key = instance?.vnode.key;
        const { activeKey, updateKey } = inject(menuInjectionKey, null) ?? {};
        const isActive = computed(() => !!(key && key === activeKey?.value));

        // main logic...
        return () =>
            createVNode(
                'li',
                {
                    class: ['mc-menu-item', isActive.value ? 'mc-menu-item--active' : ''],
                    onClick: () => {
                        key && updateKey?.(key);
                    }
                },
                [renderSlot(slots, 'default')]
            );
    }
});
