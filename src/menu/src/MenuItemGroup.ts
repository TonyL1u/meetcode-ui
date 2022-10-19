import { defineComponent, toRefs, renderSlot, createVNode, inject, provide, computed, ref, getCurrentInstance, mergeProps } from 'vue';
import { checkParent, flattenWithOptions, propsMergeSlots, createComponentVNode, createElementVNode, PatchFlags, createDirectives, SlotFlags } from '../../_utils_';
import { and, not, or } from '@vueuse/core';
import { menuIKey, subMenuIKey, menuItemGroupIKey, menuItemIKey, subMenuInjectionKey, menuInjectionKey, menuGroupInjectionKey, menuItemGroupProps, MenuItemGroupProps } from '../interface';
import { McPopover } from '../../popover';
import { McFadeInExpandTransition } from '../../_transition_';
import type { PopoverExposeInstance } from '../../popover';
import type { StyleValue } from 'vue';

export default defineComponent({
    name: 'MenuItemGroup',
    iKey: menuItemGroupIKey,
    props: menuItemGroupProps,
    setup(props, { slots, attrs }) {
        const instance = getCurrentInstance();
        const isParentMenu = computed(() => checkParent(menuIKey, instance?.parent));
        const isParentSubMenu = computed(() => checkParent(subMenuIKey, instance?.parent));

        const { indent, disabled } = toRefs(props);
        const { activeKey, padding: menuPadding, isCollapsed: isMenuCollapsed, isHorizontal: isMenuHorizontal, isDisabled: isMenuDisabled } = inject(menuInjectionKey, null) ?? {};
        const { padding: subMenuPadding, isDisabled: isSubMenuDisabled } = inject(subMenuInjectionKey, null) ?? {};
        const hasCollapsed = ref(isMenuCollapsed?.value);
        const isActive = computed(() => {
            const keys = flattenWithOptions({ slots, key: menuItemIKey, infinity: true }).map(item => {
                return item.key;
            });

            return !!(activeKey?.value && keys.includes(activeKey.value));
        });
        const selfPadding = computed(() => (typeof indent.value === 'number' ? indent.value : isParentSubMenu.value ? (subMenuPadding?.value || 0) + 16 : (menuPadding?.value || 0) + 32));
        const mergedDisabled = or(isMenuDisabled, isSubMenuDisabled, disabled);
        const menuPopoverPlacement = computed(() => {
            if (isMenuHorizontal?.value) {
                return 'bottom';
            } else if (isMenuCollapsed?.value) {
                return 'right-start';
            }
        });
        const menuPopoverDisabled = or(mergedDisabled, not(and(isParentMenu, or(isMenuHorizontal, isMenuCollapsed))));
        const menuPopoverRef = ref<PopoverExposeInstance>();
        const cssVars = computed<StyleValue>(() => {
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
            createElementVNode(
                'li',
                {
                    class: [
                        'mc-menu-item-group',
                        and(hasCollapsed, isParentMenu).value ? 'mc-menu-item-group--collapsed' : '',
                        and(isActive, not(menuPopoverDisabled)).value ? 'mc-menu-item-group--child-active' : '',
                        disabled.value ? 'mc-menu-item-group--disabled' : ''
                    ]
                },
                [
                    createComponentVNode(
                        McPopover,
                        {
                            ref_key: 'menuPopoverRef',
                            ref: menuPopoverRef,
                            disabled: menuPopoverDisabled.value,
                            placement: menuPopoverPlacement.value,
                            withArrow: false,
                            style: { padding: '4px 0', width: '200px', [menuPopoverPlacement.value === 'bottom' ? 'marginTop' : 'marginLeft']: '4px' },
                            class: ['mc-menu-item-group mc-menu-item-group--dropdown']
                        },
                        {
                            content: () => createElementVNode('ul', mergeProps({ class: 'mc-menu-item-group-children' }, attrs), [renderSlot(slots, 'default')]),
                            default: () =>
                                createElementVNode(
                                    'div',
                                    { class: 'mc-menu-item-group-title', style: cssVars.value },
                                    [createElementVNode('span', { class: 'mc-menu-item-group-title__content' }, [propsMergeSlots<MenuItemGroupProps, 'title'>(props, slots, 'title')])],
                                    PatchFlags.FULL_PROPS
                                )
                        },
                        PatchFlags.CLASS | PatchFlags.STYLE | PatchFlags.PROPS,
                        ['disabled', 'placement']
                    ),
                    and(isMenuHorizontal, isParentMenu).value
                        ? null
                        : createComponentVNode(
                              McFadeInExpandTransition,
                              {
                                  onAfterLeave: () => (hasCollapsed.value = true),
                                  onEnter: () => (hasCollapsed.value = false)
                              },
                              {
                                  default: () =>
                                      createDirectives('v-if', {
                                          condition: not(and(isMenuCollapsed, isParentMenu)).value,
                                          node: createElementVNode('ul', mergeProps({ class: 'mc-menu-item-group-children' }, attrs), [renderSlot(slots, 'default')])
                                      }),
                                  _: SlotFlags.FORWARDED
                              }
                          )
                ],
                PatchFlags.CLASS
            );
    }
});
