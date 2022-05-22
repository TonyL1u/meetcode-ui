import { defineComponent, renderSlot, createVNode, toRefs, ref, provide, inject, computed, getCurrentInstance } from 'vue';
import { checkParent, flattenWithOptions, createKey } from '../../_utils_';
import { menuIKey, menuItemIKey, menuItemGroupIKey, subMenuIKey, subMenuProps, menuInjectionKey, subMenuInjectionKey, menuGroupInjectionKey } from '../interface';
import { findParent } from './utils';
import { McIcon } from '../../icon';
import { McPopover } from '../../popover';
import { McFadeInExpandTransition } from '../../_transition_';
import { ChevronUpOutline, ChevronForwardOutline } from '@vicons/ionicons5';
import type { PopoverExposeInstance } from '../../popover';
import * as CSS from 'csstype';

export default defineComponent({
    name: 'SubMenu',
    iKey: subMenuIKey,
    props: subMenuProps,
    setup(props, { slots }) {
        const internalKey = createKey('subMenu');
        const instance = getCurrentInstance();
        const key = instance?.vnode.key ?? '';
        const { title, unique, indent } = toRefs(props);
        const { activeKey, expandedKeys, updateExpandKeys, padding: menuPadding, key: menuKey, keyTree, isUnique: isMenuUnique, isCollapsed: isMenuCollapsed, isHorizontal: isMenuHorizontal } = inject(menuInjectionKey, null) ?? {};
        const { padding: subMenuPadding, key: subMenuKey, isUnique: isSubMenuUnique, hidePopover: hideSubMenuPopover } = inject(subMenuInjectionKey, null) ?? {};
        const { padding: menuItemGroupPadding, hidePopover: hideMsnuItemGroupPopover } = inject(menuGroupInjectionKey, null) ?? {};
        const isExpanded = computed(() => expandedKeys?.value.includes(key || ''));
        const isActive = computed(() => {
            const keys = flattenWithOptions({ slots, key: menuItemIKey, infinity: true }).map(item => {
                return item.key;
            });

            return !!(activeKey?.value && keys.includes(activeKey.value));
        });
        const selfPadding = computed(() => (indent.value ? indent.value : checkParent(menuItemGroupIKey) ? (menuItemGroupPadding?.value || 0) + 16 : ((checkParent(menuIKey) ? menuPadding?.value : subMenuPadding?.value) || 0) + 32));
        const parentKey = computed(() => (checkParent(menuIKey, instance?.parent) ? menuKey : checkParent(subMenuIKey, instance?.parent) ? subMenuKey : '') || '');
        const watchUnique = computed(() => !!((isMenuUnique?.value && parentKey.value === menuKey) || (isSubMenuUnique?.value && parentKey.value === subMenuKey)));
        const menuPopoverPlacement = computed(() => {
            if (isMenuHorizontal?.value) {
                return parentKey.value === menuKey ? 'bottom' : 'right-start';
            } else if (isMenuCollapsed?.value) {
                return 'right-start';
            }
        });
        const menuPopoverDisabled = computed(() => !isMenuCollapsed?.value && !isMenuHorizontal?.value);
        const menuPopoverRef = ref<PopoverExposeInstance>();
        const cssVars = computed<CSS.Properties>(() => {
            return {
                '--menu-submenu-padding-left': `${selfPadding.value}px`
            };
        });

        const handleHidePopover = () => {
            menuPopoverRef.value?.hide();
            hideSubMenuPopover?.();
            hideMsnuItemGroupPopover?.();
        };

        provide(subMenuInjectionKey, {
            padding: selfPadding,
            key: internalKey,
            isUnique: unique,
            hidePopover: handleHidePopover
        });

        // main logic...
        return () =>
            createVNode('li', { class: ['mc-sub-menu', !isExpanded.value && menuPopoverDisabled.value ? 'mc-sub-menu--collapsed' : '', isActive.value ? 'mc-sub-menu--child-active' : ''] }, [
                createVNode(
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
                            createVNode(
                                'div',
                                {
                                    class: 'mc-sub-menu-title',
                                    style: cssVars.value,
                                    onClick: () => {
                                        if (isMenuCollapsed?.value || isMenuHorizontal?.value) return;
                                        if (!watchUnique.value || isExpanded.value) {
                                            updateExpandKeys?.(key);
                                        } else {
                                            const keys = parentKey.value === menuKey ? keyTree!.map(item => item.children && item.key).filter(Boolean) : findParent(keyTree!, key)?.children?.map(item => item.key) ?? [];
                                            updateExpandKeys?.([...expandedKeys?.value.filter(key => !keys.includes(key))!, key]);
                                        }
                                    }
                                },
                                [
                                    slots.icon ? createVNode('div', { class: 'mc-sub-menu-title__icon' }, [renderSlot(slots, 'icon')]) : null,
                                    createVNode('span', { class: 'mc-sub-menu-title__content' }, [slots.title ? renderSlot(slots, 'title') : title.value || '']),
                                    isMenuHorizontal?.value && parentKey.value === menuKey
                                        ? null
                                        : createVNode(McIcon, { class: 'mc-sub-menu-title__arrow' }, { default: () => createVNode(isMenuCollapsed?.value || menuPopoverPlacement.value === 'right-start' ? ChevronForwardOutline : ChevronUpOutline) })
                                ]
                            )
                    }
                ),
                isMenuHorizontal?.value
                    ? null
                    : createVNode(McFadeInExpandTransition, null, {
                          default: () => (isExpanded.value && !isMenuCollapsed?.value ? createVNode('ul', { class: 'mc-sub-menu-children' }, [renderSlot(slots, 'default')]) : null)
                      })
            ]);
    }
});
