import { defineComponent, renderSlot, createVNode, toRefs, ref, provide, inject, computed, getCurrentInstance, watch, onUnmounted, nextTick } from 'vue';
import { checkParent, flattenWithOptions, createKey } from '../../_utils_';
import { pausableWatch } from '@vueuse/core';
import { menuIKey, menuItemIKey, menuItemGroupIKey, subMenuIKey, subMenuProps, menuInjectionKey, subMenuInjectionKey, menuGroupInjectionKey } from '../interface';
import { McIcon } from '../../icon';
import { McFadeInExpandTransition } from '../../_transition_';
import { ChevronDownOutline } from '@vicons/ionicons5';
import type { Fn } from '@vueuse/core';

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
        const { title, unique } = toRefs(props);
        const { activeKey, expandedKeys, updateExpandKeys, BusUniqueControl, padding: menuPadding = 0, key: menuKey, isUnique: isMenuUnique } = inject(menuInjectionKey, null) ?? {};
        const { padding: subMenuPadding = 0, key: subMenuKey, isUnique: isSubMenuUnique } = inject(subMenuInjectionKey, null) ?? {};
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
        const parentKey = computed(() => {
            return (checkParent(menuIKey, instance?.parent) ? menuKey : checkParent(subMenuIKey, instance?.parent) ? subMenuKey : '') || '';
        });

        let unsubscribe: Fn | undefined;

        if ((isMenuUnique?.value && parentKey.value === menuKey) || (isSubMenuUnique?.value && parentKey.value === subMenuKey)) {
            const createBusOn = () => {
                return BusUniqueControl?.on(key => {
                    if (isExpanded.value && key === parentKey.value) {
                        pause();
                        handleExpand();
                        resume();
                    }
                });
            };

            const { pause, resume } = pausableWatch(
                isExpanded,
                val => {
                    if (BusUniqueControl && parentKey.value && val) {
                        unsubscribe?.();
                        nextTick(() => {
                            BusUniqueControl.emit(parentKey.value);
                            unsubscribe = createBusOn();
                        });
                    }
                },
                {
                    immediate: true
                }
            );
        }

        const handleExpand = () => {
            isExpanded.value = !isExpanded.value;
            key && updateExpandKeys?.(key);
        };

        provide(subMenuInjectionKey, {
            padding: selfPadding.value,
            key: internalKey,
            isUnique: unique
        });

        onUnmounted(() => {
            unsubscribe?.();
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
