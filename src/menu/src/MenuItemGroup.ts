import { defineComponent, toRefs, renderSlot, createVNode, inject, provide, computed, ref, getCurrentInstance } from 'vue';
import { checkParent, flattenWithOptions, propsMergeSlots } from '../../_utils_';
import { menuIKey, subMenuIKey, menuItemGroupIKey, menuItemIKey, subMenuInjectionKey, menuInjectionKey, menuGroupInjectionKey, menuItemGroupProps, MenuItemGroupProps } from '../interface';
import { McPopover } from '../../popover';
import { McFadeInExpandTransition } from '../../_transition_';
import type { PopoverExposeInstance } from '../../popover';
import * as CSS from 'csstype';

export default defineComponent({
    name: 'MenuItemGroup',
    iKey: menuItemGroupIKey,
    props: menuItemGroupProps,
    setup(props, { slots }) {
        const instance = getCurrentInstance();
        const isParentMenu = computed(() => checkParent(menuIKey, instance?.parent));
        const isParentSubMenu = computed(() => checkParent(subMenuIKey, instance?.parent));

        const { indent, disabled } = toRefs(props);
        const { activeKey, padding: menuPadding, isCollapsed: isMenuCollapsed, isHorizontal: isMenuHorizontal, isDisabled: isMenuDisabled } = inject(menuInjectionKey, null) ?? {};
        const { padding: subMenuPadding, isDisabled: isSubMenuDisabled } = inject(subMenuInjectionKey, null) ?? {};
        const hasCollapsed = ref(false);
        const isActive = computed(() => {
            const keys = flattenWithOptions({ slots, key: menuItemIKey, infinity: true }).map(item => {
                return item.key;
            });

            return !!(activeKey?.value && keys.includes(activeKey.value));
        });
        const selfPadding = computed(() => (indent.value ? indent.value : isParentSubMenu.value ? (subMenuPadding?.value || 0) + 16 : (menuPadding?.value || 0) + 32));
        const mergedDisabled = computed(() => isMenuDisabled?.value || isSubMenuDisabled?.value || disabled.value);
        const menuPopoverPlacement = computed(() => {
            if (isMenuHorizontal?.value) {
                return 'bottom';
            } else if (isMenuCollapsed?.value) {
                return 'right-start';
            }
        });
        const menuPopoverDisabled = computed(() => mergedDisabled.value || !(isParentMenu.value && (isMenuHorizontal?.value || isMenuCollapsed?.value)));
        const menuPopoverRef = ref<PopoverExposeInstance>();
        const cssVars = computed<CSS.Properties>(() => {
            return {
                '--menu-item-group-padding-left': `${selfPadding.value}px`
            };
        });

        const handleHidePopover = () => {
            menuPopoverRef.value?.hide();
        };

        provide(menuGroupInjectionKey, {
            padding: selfPadding,
            isDisabled: disabled,
            hidePopover: handleHidePopover
        });

        // main logic...
        return () =>
            createVNode(
                'li',
                { class: ['mc-menu-item-group', hasCollapsed.value ? 'mc-menu-item-group--collapsed' : '', isActive.value && !menuPopoverDisabled.value ? 'mc-menu-item-group--child-active' : '', disabled.value ? 'mc-menu-item-group--disabled' : ''] },
                [
                    createVNode(
                        McPopover,
                        {
                            ref: menuPopoverRef,
                            disabled: menuPopoverDisabled.value,
                            placement: menuPopoverPlacement.value,
                            withArrow: false,
                            style: { padding: '4px 0', width: '200px', [menuPopoverPlacement.value === 'bottom' ? 'marginTop' : 'marginLeft']: '4px' },
                            class: ['mc-menu-item-group mc-menu-item-group--dropdown']
                        },
                        {
                            content: () => createVNode('ul', { class: 'mc-menu-item-group-children' }, [renderSlot(slots, 'default')]),
                            default: () =>
                                createVNode('div', { class: 'mc-menu-item-group-title', style: cssVars.value }, [createVNode('span', { class: 'mc-menu-item-group-title__content' }, [propsMergeSlots<MenuItemGroupProps, 'title'>(props, slots, 'title')])])
                        }
                    ),
                    isMenuHorizontal?.value && isParentMenu.value
                        ? null
                        : createVNode(
                              McFadeInExpandTransition,
                              {
                                  onAfterLeave: () => (hasCollapsed.value = true),
                                  onEnter: () => (hasCollapsed.value = false)
                              },
                              {
                                  default: () => (isMenuCollapsed?.value && isParentMenu.value ? null : createVNode('ul', { class: 'mc-menu-item-group-children' }, [renderSlot(slots, 'default')]))
                              }
                          )
                ]
            );
    }
});
