import { defineComponent, toRefs, renderSlot, createVNode, inject, provide, computed, ref } from 'vue';
import { checkParent, flattenWithOptions } from '../../_utils_';
import { menuIKey, subMenuIKey, menuItemGroupIKey, menuItemIKey, subMenuInjectionKey, menuInjectionKey, menuGroupInjectionKey, menuItemGroupProps } from '../interface';
import { McPopover } from '../../popover';
import { McFadeInExpandTransition } from '../../_transition_';
import type { PopoverExposeInstance } from '../../popover';
import * as CSS from 'csstype';

export default defineComponent({
    name: 'MenuItemGroup',
    iKey: menuItemGroupIKey,
    props: menuItemGroupProps,
    setup(props, { slots }) {
        const { title, indent } = toRefs(props);
        const { activeKey, padding: menuPadding, isCollapsed: isMenuCollapsed, isHorizontal: isMenuHorizontal } = inject(menuInjectionKey, null) ?? {};
        const { padding: subMenuPadding } = inject(subMenuInjectionKey, null) ?? {};
        const hasCollapsed = ref(false);
        const isActive = computed(() => {
            const keys = flattenWithOptions({ slots, key: menuItemIKey, infinity: true }).map(item => {
                return item.key;
            });

            return !!(activeKey?.value && keys.includes(activeKey.value));
        });
        const selfPadding = computed(() => (indent.value ? indent.value : checkParent(subMenuIKey) ? (subMenuPadding?.value || 0) + 16 : (menuPadding?.value || 0) + 32));
        const menuPopoverPlacement = computed(() => {
            if (isMenuHorizontal?.value) {
                return 'bottom';
            } else if (isMenuCollapsed?.value) {
                return 'right-start';
            }
        });
        const menuPopoverDisabled = computed(() => !(checkParent(menuIKey) && (isMenuHorizontal?.value || isMenuCollapsed?.value)));
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
            hidePopover: handleHidePopover
        });

        // main logic...
        return () =>
            createVNode('li', { class: ['mc-menu-item-group', hasCollapsed.value ? 'mc-menu-item-group--collapsed' : '', isActive.value && !menuPopoverDisabled.value ? 'mc-menu-item-group--child-active' : ''] }, [
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
                        default: () => createVNode('span', { class: 'mc-menu-item-group-title', style: cssVars.value }, [title.value])
                    }
                ),
                isMenuHorizontal?.value && checkParent(menuIKey)
                    ? null
                    : createVNode(
                          McFadeInExpandTransition,
                          {
                              onAfterLeave: () => (hasCollapsed.value = true),
                              onEnter: () => (hasCollapsed.value = false)
                          },
                          {
                              default: () => (isMenuCollapsed?.value && checkParent(menuIKey) ? null : createVNode('ul', { class: 'mc-menu-item-group-children' }, [renderSlot(slots, 'default')]))
                          }
                      )
            ]);
    }
});
