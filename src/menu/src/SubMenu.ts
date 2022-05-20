import { defineComponent, renderSlot, createVNode, toRefs, ref, provide, inject, computed, getCurrentInstance, watch, onUnmounted, nextTick } from 'vue';
import { checkParent, flattenWithOptions, createKey } from '../../_utils_';
import { pausableWatch } from '@vueuse/core';
import { menuIKey, menuItemIKey, menuItemGroupIKey, subMenuIKey, subMenuProps, menuInjectionKey, subMenuInjectionKey, menuGroupInjectionKey } from '../interface';
import { McIcon } from '../../icon';
import { McPopover } from '../../popover';
import { McFadeInExpandTransition } from '../../_transition_';
import { ChevronUpOutline, ChevronForwardOutline } from '@vicons/ionicons5';
import type { FunctionalComponent } from 'vue';
import type { Fn } from '@vueuse/core';
import * as CSS from 'csstype';

export default defineComponent({
    name: 'SubMenu',
    iKey: subMenuIKey,
    props: subMenuProps,
    setup(props, { slots }) {
        // if (!checkParent(menuIKey) && !checkParent(menuItemGroupIKey)) {
        //     throw new Error('[McSubMenu]: McSubMenu must be placed inside McMenu or McMenuItemGroup.');
        // }

        const internalKey = createKey('subMenu');
        const instance = getCurrentInstance();
        const key = instance?.vnode.key;
        const { title, unique, submenuAutoEmit, indent } = toRefs(props);
        const { activeKey, expandedKeys, updateExpandKeys, BusUniqueControl, BusExpandControl, padding: menuPadding, key: menuKey, isUnique: isMenuUnique, isAutoEmit: isMenuAutoEmit, isCollapsed: isMenuCollapsed } = inject(menuInjectionKey, null) ?? {};
        const { padding: subMenuPadding, key: subMenuKey, isUnique: isSubMenuUnique, isAutoEmit: isSubMenuAutoEmit } = inject(subMenuInjectionKey, null) ?? {};
        const { padding: menuItemGroupPadding } = inject(menuGroupInjectionKey, null) ?? {};
        const isExpanded = ref(expandedKeys?.value.includes(key || ''));
        const isActive = computed(() => {
            const keys = flattenWithOptions({ slots, key: menuItemIKey, infinity: true }).map(item => {
                return item.key;
            });

            return !!(activeKey?.value && keys.includes(activeKey.value));
        });
        const selfPadding = computed(() => (indent.value ? indent.value : checkParent(menuItemGroupIKey) ? (menuItemGroupPadding?.value || 0) + 16 : ((checkParent(menuIKey) ? menuPadding?.value : subMenuPadding?.value) || 0) + 32));
        const parentKey = computed(() => (checkParent(menuIKey, instance?.parent) ? menuKey : checkParent(subMenuIKey, instance?.parent) ? subMenuKey : '') || '');
        const watchUnique = computed(() => !!((isMenuUnique?.value && parentKey.value === menuKey) || (isSubMenuUnique?.value && parentKey.value === subMenuKey)));
        const autoEmit = computed(() => !!((isMenuAutoEmit?.value && parentKey.value === menuKey) || (isSubMenuAutoEmit?.value && parentKey.value === subMenuKey)));
        const cssVars = computed<CSS.Properties>(() => {
            return {
                '--menu-submenu-padding-left': `${selfPadding.value}px`
            };
        });
        let uniqueUnsubscribe: Fn | undefined;
        let expandUnsubscribe: Fn | undefined;

        const { pause, resume } = pausableWatch(
            isExpanded,
            val => {
                if (BusUniqueControl && parentKey.value && val) {
                    uniqueUnsubscribe?.();
                    nextTick(() => {
                        BusUniqueControl.emit(parentKey.value);
                        uniqueUnsubscribe = createBusOn();
                    });
                }
            },
            {
                immediate: watchUnique.value
            }
        );

        watch(
            watchUnique,
            flag => {
                if (flag) {
                    resume();
                } else {
                    pause();
                }
            },
            {
                immediate: true
            }
        );

        if (BusExpandControl) {
            expandUnsubscribe = BusExpandControl.on(type => {
                if (typeof type === 'boolean' && isExpanded.value) {
                    handleExpand(false);
                } else if (key && !isExpanded.value && typeof type === 'string' && key === type) {
                    handleExpand(false);
                } else if (key && !isExpanded.value && Array.isArray(type) && type.includes(key)) {
                    handleExpand(false);
                }
            });
        }

        const handleExpand = (call = true) => {
            isExpanded.value = !isExpanded.value;
            call && key && updateExpandKeys?.(key);
        };

        const createBusOn = () => {
            return BusUniqueControl?.on(key => {
                if (isExpanded.value && key === parentKey.value) {
                    pause();
                    handleExpand(autoEmit.value);
                    resume();
                }
            });
        };

        const menuChildrenVNode: FunctionalComponent<{ mode: 'normal' | 'in-popover' }> = props => {
            const { mode } = props;

            return createVNode('ul', { class: ['mc-sub-menu-children', `mc-sub-menu-children-${mode}`], style: { margin: 0 } }, [renderSlot(slots, 'default')]);
        };

        provide(subMenuInjectionKey, {
            padding: selfPadding,
            key: internalKey,
            isUnique: unique,
            isAutoEmit: submenuAutoEmit
        });

        onUnmounted(() => {
            uniqueUnsubscribe?.();
            expandUnsubscribe?.();
        });

        // main logic...
        return () =>
            createVNode('li', { class: ['mc-sub-menu', isExpanded.value || isMenuCollapsed?.value ? '' : 'mc-sub-menu--collapsed', isActive.value ? 'mc-sub-menu--child-active' : ''] }, [
                createVNode(
                    McPopover,
                    { disabled: !isMenuCollapsed?.value, placement: 'right-start', withArrow: false, style: { padding: '4px', width: '200px' }, class: 'mc-sub-menu mc-sub-menu--in-popover' },
                    {
                        content: () => {
                            return createVNode('ul', { class: 'mc-sub-menu-children', style: { margin: 0 } }, [renderSlot(slots, 'default')]);
                        },
                        default: () =>
                            createVNode(
                                'div',
                                {
                                    class: 'mc-sub-menu-title',
                                    style: cssVars.value,
                                    onClick: () => {
                                        if (isMenuCollapsed?.value) return;
                                        handleExpand();
                                    }
                                },
                                [
                                    slots.icon ? createVNode('div', { class: 'mc-sub-menu-title__icon' }, [renderSlot(slots, 'icon')]) : null,
                                    createVNode('span', { class: 'mc-sub-menu-title__content' }, [slots.title ? renderSlot(slots, 'title') : title.value || '']),
                                    createVNode(McIcon, { class: 'mc-sub-menu-title__arrow' }, { default: () => createVNode(isMenuCollapsed?.value ? ChevronForwardOutline : ChevronUpOutline) })
                                ]
                            )
                    }
                ),
                createVNode(McFadeInExpandTransition, null, {
                    default: () => (isExpanded.value && !isMenuCollapsed?.value ? createVNode('ul', { class: 'mc-sub-menu-children' }, [renderSlot(slots, 'default')]) : null)
                })
            ]);
    }
});
