import { defineComponent, renderSlot, createVNode, inject, computed, toRefs, getCurrentInstance } from 'vue';
import { checkParent } from '../../_utils_';
import { menuIKey, subMenuIKey, menuItemGroupIKey, menuItemIKey, menuItemProps, menuInjectionKey, subMenuInjectionKey, menuGroupInjectionKey } from '../interface';
import { McTooltip } from '../../tooltip';
import * as CSS from 'csstype';

export default defineComponent({
    name: 'MenuItem',
    props: menuItemProps,
    iKey: menuItemIKey,
    setup(props, { slots }) {
        const instance = getCurrentInstance();
        const key = instance?.vnode.key ?? '';
        const isParentMenu = computed(() => checkParent(menuIKey, instance?.parent));
        const isParentMenuItemGroup = computed(() => checkParent(menuItemGroupIKey, instance?.parent));

        const { indent, disabled } = toRefs(props);
        const { activeKey, updateKey, padding: menuPadding, isCollapsed, isDisabled: isMenuDisabled } = inject(menuInjectionKey, null) ?? {};
        const { padding: subMenuPadding, isDisabled: isSubMenuDisabled, hidePopover: hideSubMenuPopover } = inject(subMenuInjectionKey, null) ?? {};
        const { padding: menuItemGroupPadding, isDisabled: isMenuItemGroupDisabled, hidePopover: hideMenuItemGroupPopover } = inject(menuGroupInjectionKey, null) ?? {};
        const isActive = computed(() => !!(key && key === activeKey?.value));
        const selfPadding = computed(() => (indent.value ? indent.value : isParentMenuItemGroup.value ? (menuItemGroupPadding?.value || 0) + 16 : ((isParentMenu.value ? menuPadding?.value : subMenuPadding?.value) || 0) + 32));
        const mergedDisabled = computed(() => isMenuDisabled?.value || (isParentMenuItemGroup.value ? isMenuItemGroupDisabled?.value : isSubMenuDisabled?.value) || disabled.value);
        const cssVars = computed<CSS.Properties>(() => {
            return {
                '--menu-item-padding-left': `${selfPadding.value}px`
            };
        });

        // main logic...
        return () =>
            createVNode(
                McTooltip,
                { disabled: !isCollapsed?.value || !isParentMenu.value || mergedDisabled.value, content: () => renderSlot(slots, 'default'), placement: 'right' },
                {
                    default: () =>
                        createVNode(
                            'li',
                            {
                                class: ['mc-menu-item', isActive.value ? 'mc-menu-item--active' : '', disabled.value ? 'mc-menu-item--disabled' : ''],
                                style: cssVars.value,
                                onClick: () => {
                                    if (mergedDisabled.value) return;
                                    key && updateKey?.(key);
                                    hideSubMenuPopover?.();
                                    hideMenuItemGroupPopover?.();
                                }
                            },
                            [slots.icon ? createVNode('div', { class: 'mc-menu-item__icon' }, [renderSlot(slots, 'icon')]) : null, createVNode('div', { class: 'mc-menu-item__content' }, [renderSlot(slots, 'default')])]
                        )
                }
            );
    }
});
