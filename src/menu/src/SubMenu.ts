import { defineComponent, renderSlot, createVNode, toRefs, ref, provide, inject, computed, getCurrentInstance } from 'vue';
import { checkParent, flattenWithOptions, propsMergeSlots, createComponentVNode, createElementVNode, PatchFlags, SlotFlags } from '../../_utils_';
import { and, not, or } from '@vueuse/core';
import { menuIKey, menuItemIKey, menuItemGroupIKey, subMenuIKey, menuInjectionKey, subMenuInjectionKey, menuGroupInjectionKey, subMenuProps, SubMenuProps } from '../interface';
import { findParent } from './utils';
import { McIcon } from '../../icon';
import { McPopover } from '../../popover';
import { McFadeInExpandTransition } from '../../_transition_';
import { ChevronUpOutline, ChevronForwardOutline } from '@vicons/ionicons5';
import type { PopoverExposeInstance, PopoverProps } from '../../popover';
import * as CSS from 'csstype';

export default defineComponent({
    name: 'SubMenu',
    iKey: subMenuIKey,
    props: subMenuProps,
    setup(props, { slots }) {
        const instance = getCurrentInstance();
        const key = instance?.vnode.key ?? '';
        const isParentMenu = computed(() => checkParent(menuIKey, instance?.parent));
        const isParentSubMenu = computed(() => checkParent(subMenuIKey, instance?.parent));
        const isParentMenuItemGroup = computed(() => checkParent(menuItemGroupIKey, instance?.parent));

        const { unique, indent, disabled } = toRefs(props);
        const { activeKey, expandedKeys, updateExpandKeys, padding: menuPadding, keyTree, options, isUnique: isMenuUnique, isCollapsed: isMenuCollapsed, isHorizontal: isMenuHorizontal, isDisabled: isMenuDisabled } = inject(menuInjectionKey, null) ?? {};
        const { padding: subMenuPadding, isUnique: isSubMenuUnique, isDisabled: isSubMenuDisabled, hidePopover: hideSubMenuPopover } = inject(subMenuInjectionKey, null) ?? {};
        const { padding: menuItemGroupPadding, isDisabled: isMenuItemGroupDisabled, hidePopover: hideMenuItemGroupPopover } = inject(menuGroupInjectionKey, null) ?? {};
        const isExpanded = computed(() => expandedKeys?.value.includes(key || ''));
        const isActive = computed(() => {
            const keys = flattenWithOptions({ slots, key: menuItemIKey, infinity: true }).map(item => {
                return item.key;
            });

            return !!(activeKey?.value && keys.includes(activeKey.value));
        });
        const selfPadding = computed(() => (typeof indent.value === 'number' ? indent.value : isParentMenuItemGroup.value ? (menuItemGroupPadding?.value || 0) + 16 : ((isParentMenu.value ? menuPadding?.value : subMenuPadding?.value) || 0) + 32));
        const mergedDisabled = or(isMenuDisabled, isParentMenuItemGroup.value ? isMenuItemGroupDisabled?.value : isSubMenuDisabled?.value, disabled);
        const watchUnique = or(and(isMenuUnique, isParentMenu), and(isSubMenuUnique, isParentSubMenu));
        const menuPopoverPlacement = computed(() => {
            if (isMenuHorizontal?.value) {
                return isParentMenu.value ? 'bottom' : 'right-start';
            } else if (isMenuCollapsed?.value) {
                return 'right-start';
            }
        });
        const menuPopoverDisabled = or(mergedDisabled, and(not(isMenuCollapsed), not(isMenuHorizontal)));
        const menuPopoverRef = ref<PopoverExposeInstance>();
        const cssVars = computed<CSS.Properties>(() => {
            return {
                '--menu-submenu-padding-left': `${selfPadding.value}px`
            };
        });

        const handleHidePopover = () => {
            menuPopoverRef.value?.hide();
            hideSubMenuPopover?.();
            hideMenuItemGroupPopover?.();
        };

        provide(subMenuInjectionKey, {
            padding: selfPadding,
            isDisabled: disabled,
            isUnique: unique,
            hidePopover: handleHidePopover
        });

        // main logic...
        return () =>
            createVNode('li', { class: ['mc-sub-menu', and(not(isExpanded), menuPopoverDisabled).value ? 'mc-sub-menu--collapsed' : '', isActive.value ? 'mc-sub-menu--child-active' : '', disabled.value ? 'mc-sub-menu--disabled' : ''] }, [
                createComponentVNode<PopoverProps, 'default' | 'content'>(
                    McPopover,
                    {
                        ref: menuPopoverRef,
                        disabled: menuPopoverDisabled.value,
                        placement: menuPopoverPlacement.value,
                        withArrow: false,
                        style: { padding: '4px 0', width: '200px', [menuPopoverPlacement.value === 'bottom' ? 'marginTop' : 'marginLeft']: '4px' },
                        class: ['mc-sub-menu mc-sub-menu--dropdown', `mc-sub-menu--placement-${menuPopoverPlacement.value}`]
                    },
                    {
                        content: () => createVNode('ul', { class: 'mc-sub-menu-children', style: { margin: 0 } }, [renderSlot(slots, 'default')]),
                        default: () =>
                            createElementVNode(
                                'div',
                                {
                                    class: 'mc-sub-menu-title',
                                    style: cssVars.value,
                                    onClick: () => {
                                        if (or(isMenuCollapsed, isMenuHorizontal, mergedDisabled).value) return;
                                        if (or(not(watchUnique), isExpanded).value) {
                                            updateExpandKeys?.(key);
                                        } else {
                                            const keys = isParentMenu.value ? keyTree!.map(item => item.children && item.key).filter(Boolean) : findParent(options?.value ?? keyTree!, key)?.children?.map(item => item.key) ?? [];
                                            updateExpandKeys?.([...expandedKeys?.value.filter(key => !keys.includes(key))!, key]);
                                        }
                                    }
                                },
                                [
                                    slots.icon ? createVNode('div', { class: 'mc-sub-menu-title__icon' }, [renderSlot(slots, 'icon')]) : null,
                                    createVNode('span', { class: 'mc-sub-menu-title__content' }, [propsMergeSlots<SubMenuProps, 'title'>(props, slots, 'title')]),
                                    isMenuHorizontal?.value && isParentMenu.value
                                        ? null
                                        : createVNode(McIcon, { class: 'mc-sub-menu-title__arrow' }, { default: () => createVNode(or(isMenuCollapsed, menuPopoverPlacement.value === 'right-start').value ? ChevronForwardOutline : ChevronUpOutline) })
                                ],
                                PatchFlags.STYLE
                            )
                    },
                    PatchFlags.CLASS | PatchFlags.STYLE | PatchFlags.PROPS,
                    ['disabled', 'placement', 'withArrow']
                ),
                isMenuHorizontal?.value
                    ? null
                    : createComponentVNode(McFadeInExpandTransition, null, {
                          default: () => (and(isExpanded, not(isMenuCollapsed)).value ? createVNode('ul', { class: 'mc-sub-menu-children' }, [renderSlot(slots, 'default')]) : null),
                          _: SlotFlags.FORWARDED
                      })
            ]);
    }
});
