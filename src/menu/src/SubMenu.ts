import { defineComponent, renderSlot, createVNode, toRefs, ref, provide, inject, computed, getCurrentInstance } from 'vue';
import { checkParent, flattenWithOptions } from '../../_utils_';
import { menuIKey, menuItemIKey, menuItemGroupIKey, subMenuIKey, subMenuProps, menuInjectionKey, subMenuInjectionKey, menuGroupInjectionKey } from '../interface';
import { McIcon } from '../../icon';
import { McFadeInExpandTransition } from '../../_transition_';
import { ChevronDownOutline } from '@vicons/ionicons5';

export default defineComponent({
    name: 'SubMenu',
    iKey: subMenuIKey,
    props: subMenuProps,
    setup(props, { slots }) {
        // if (!checkParent(menuIKey) && !checkParent(menuItemGroupIKey)) {
        //     throw new Error('[McSubMenu]: McSubMenu must be placed inside McMenu or McMenuItemGroup.');
        // }

        const instance = getCurrentInstance();
        const key = instance?.vnode.key;
        const { title } = toRefs(props);
        const { activeKey, expandedKeys, updateExpandedKeys } = inject(menuInjectionKey, null) ?? {};
        const { padding: menuPadding = 0 } = inject(menuInjectionKey, null) ?? {};
        const { padding: subMenuPadding = 0 } = inject(subMenuInjectionKey, null) ?? {};
        const { padding: menuItemGroupPadding = 0 } = inject(menuGroupInjectionKey, null) ?? {};
        const isExpanded = ref(expandedKeys?.value.includes(key || ''));
        const isActive = computed(() => {
            const keys = flattenWithOptions({ slots, key: menuItemIKey, infinity: true }).map(item => {
                return item.key;
            });

            return !!(activeKey?.value && keys.includes(activeKey.value));
        });
        const selfPadding = computed(() => {
            return checkParent(menuItemGroupIKey) ? menuItemGroupPadding + 16 : (checkParent(menuIKey) ? menuPadding : subMenuPadding) + 32;
        });

        const handleExpand = () => {
            isExpanded.value = !isExpanded.value;
            key && updateExpandedKeys?.(key);
        };

        provide(subMenuInjectionKey, {
            padding: selfPadding.value
        });

        // main logic...
        return () =>
            createVNode('li', { class: ['mc-sub-menu', isExpanded.value ? '' : 'mc-sub-menu--collapsed', isActive.value ? 'mc-sub-menu--child-active' : ''] }, [
                createVNode('div', { class: 'mc-sub-menu-title', style: { paddingLeft: `${selfPadding.value}px` }, onClick: handleExpand }, [
                    slots.icon ? createVNode('div', { class: 'mc-sub-menu-title__icon' }, [renderSlot(slots, 'icon')]) : null,
                    createVNode('span', { class: 'mc-sub-menu-title__content' }, [slots.title ? renderSlot(slots, 'title') : title.value || '']),
                    createVNode(McIcon, { class: 'mc-sub-menu-title__arrow' }, { default: () => createVNode(ChevronDownOutline) })
                ]),
                createVNode(McFadeInExpandTransition, null, {
                    default: () => (isExpanded.value ? createVNode('ul', { class: 'mc-sub-menu-children' }, [renderSlot(slots, 'default')]) : null)
                })
            ]);
    }
});
