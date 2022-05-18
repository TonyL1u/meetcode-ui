import { defineComponent, onMounted, renderSlot, createVNode, ref, provide, toRefs, onUnmounted, computed } from 'vue';
import { useThemeRegister, flatten, createKey } from '../_utils_';
import { useEventBus, useVModel } from '@vueuse/core';
import { menuIKey, menuInjectionKey, subMenuIKey, menuProps } from './interface';
import { mainCssr, lightCssr, darkCssr } from './styles';
import type { Key } from '../_utils_';
import type { EventBusKey } from '@vueuse/core';

export default defineComponent({
    name: 'Menu',
    iKey: menuIKey,
    props: menuProps,
    emits: ['update:value', 'update:expandKeys'],
    setup(props, { slots, emit, expose }) {
        // theme register
        onMounted(() => {
            useThemeRegister({
                key: 'McMenu',
                main: mainCssr,
                light: lightCssr,
                dark: darkCssr
            });
        });

        const internalKey = createKey('menu');
        const { value: valueVM, expandKeys, indent, unique, submenuAutoEmit } = toRefs(props);
        const internalExpandKeys = ref<Key[]>([]);
        const mergedExpandKeys = expandKeys.value ? expandKeys : internalExpandKeys;
        const selfPadding = computed(() => indent.value! - 32);

        const callUpdateValue = (value: Key) => {
            if (valueVM.value !== value) {
                emit('update:value', value);
            }
        };
        const callUpdateExpandKeys = (key: Key) => {
            if (mergedExpandKeys.value) {
                const index = mergedExpandKeys.value.findIndex(item => item === key);
                if (index > -1) {
                    mergedExpandKeys.value.splice(index, 1);
                } else {
                    mergedExpandKeys.value.push(key);
                }

                emit('update:expandKeys', mergedExpandKeys.value);
            }
        };

        const UniqueControlEventBusKey: EventBusKey<string> = Symbol();
        const ExpandControlEventBusKey: EventBusKey<boolean> = Symbol();
        const BusUniqueControl = useEventBus(UniqueControlEventBusKey);
        const BusExpandControl = useEventBus(ExpandControlEventBusKey);

        provide(menuInjectionKey, {
            activeKey: valueVM,
            updateKey: callUpdateValue,
            expandedKeys: mergedExpandKeys,
            updateExpandKeys: callUpdateExpandKeys,
            key: internalKey,
            padding: selfPadding,
            isUnique: unique,
            isAutoEmit: submenuAutoEmit,
            BusUniqueControl,
            BusExpandControl
        });

        onUnmounted(() => {
            BusUniqueControl.reset();
            BusExpandControl.reset();
        });

        expose({
            expandAll() {
                BusExpandControl.emit(false);
            },
            collapseAll() {
                BusExpandControl.emit(true);
            }
        });

        // main logic...
        return () => createVNode('ul', { class: 'mc-menu' }, [renderSlot(slots, 'default')]);
    }
});
