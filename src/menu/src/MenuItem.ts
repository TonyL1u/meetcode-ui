import { defineComponent, renderSlot, createVNode, inject, computed, toRefs, getCurrentInstance, mergeProps } from 'vue';
import { checkParent, createComponentVNode, createElementVNode, PatchFlags, SlotFlags } from '../../_utils_';
import { not, or } from '@vueuse/core';
import { menuIKey, menuItemGroupIKey, menuItemIKey, menuItemProps, menuInjectionKey, subMenuInjectionKey, menuGroupInjectionKey } from '../interface';
import { McTooltip } from '../../tooltip';
import type { StyleValue } from 'vue';

export default defineComponent({
    name: 'MenuItem',
    props: menuItemProps,
    iKey: menuItemIKey,
    setup(props, { slots, attrs }) {
        const instance = getCurrentInstance();
        const key = instance?.vnode.key ?? '';
        const isParentMenu = computed(() => checkParent(menuIKey, instance?.parent));
        const isParentMenuItemGroup = computed(() => checkParent(menuItemGroupIKey, instance?.parent));

        const { indent, disabled } = toRefs(props);
        const { activeKey, updateKey, padding: menuPadding, isCollapsed, isDisabled: isMenuDisabled } = inject(menuInjectionKey, null) ?? {};
        const { padding: subMenuPadding, isDisabled: isSubMenuDisabled, hidePopover: hideSubMenuPopover } = inject(subMenuInjectionKey, null) ?? {};
        const { padding: menuItemGroupPadding, isDisabled: isMenuItemGroupDisabled, hidePopover: hideMenuItemGroupPopover } = inject(menuGroupInjectionKey, null) ?? {};
        const isActive = computed(() => !!(key && key === activeKey?.value));
        const selfPadding = computed(() => (typeof indent.value === 'number' ? indent.value : isParentMenuItemGroup.value ? (menuItemGroupPadding?.value || 0) + 16 : ((isParentMenu.value ? menuPadding?.value : subMenuPadding?.value) || 0) + 32));
        const mergedDisabled = or(isMenuDisabled, isParentMenuItemGroup.value ? isMenuItemGroupDisabled?.value : isSubMenuDisabled?.value, disabled);
        const cssVars = computed<StyleValue>(() => {
            return {
                '--menu-item-padding-left': `${selfPadding.value}px`
            };
        });

        // main logic...
        return () =>
            createComponentVNode(
                McTooltip,
                { disabled: or(not(isCollapsed), not(isParentMenu), mergedDisabled).value, content: () => renderSlot(slots, 'default'), placement: 'right' },
                {
                    default: () =>
                        createElementVNode(
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
                            [slots.icon ? createVNode('div', { class: 'mc-menu-item__icon' }, [renderSlot(slots, 'icon')]) : null, createVNode('div', mergeProps({ class: 'mc-menu-item__content' }, attrs), [renderSlot(slots, 'default')])],
                            PatchFlags.CLASS | PatchFlags.STYLE | PatchFlags.FULL_PROPS
                        ),
                    _: SlotFlags.FORWARDED
                },
                PatchFlags.PROPS,
                ['disabled', 'content']
            );
    }
});
