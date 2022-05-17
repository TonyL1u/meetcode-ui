import { defineComponent, onMounted, renderSlot, createVNode, ref, provide, toRefs, onUnmounted } from 'vue';
import { useThemeRegister, flatten, createKey } from '../_utils_';
import { useEventBus } from '@vueuse/core';
import { menuIKey, menuInjectionKey, subMenuIKey, menuProps } from './interface';
import { mainCssr, lightCssr, darkCssr } from './styles';
import type { Key } from '../_utils_';
import type { EventBusKey } from '@vueuse/core';

export default defineComponent({
    name: 'Menu',
    iKey: menuIKey,
    props: menuProps,
    emits: ['update:value', 'update:expand-keys'],
    setup(props, { slots, emit }) {
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
        const { value: valueVM, expandKeys, indent, unique } = toRefs(props);
        const internalExpandKeys = ref<Key[]>([]);
        const mergedExpandKeys = expandKeys.value ? expandKeys : internalExpandKeys;
        // console.log(flatten(slots.default(), subMenuIKey));

        const callUpdateValue = (value: Key) => {
            emit('update:value', value);
        };
        const callUpdateExpandKeys = (key: Key) => {
            if (mergedExpandKeys.value) {
                const index = mergedExpandKeys.value.findIndex(item => item === key);
                if (index > -1) {
                    mergedExpandKeys.value.splice(index, 1);
                } else {
                    mergedExpandKeys.value.push(key);
                }

                emit('update:expand-keys', mergedExpandKeys.value);
            }
        };

        const UniqueControlEventBusKey: EventBusKey<string> = Symbol();
        const BusUniqueControl = useEventBus(UniqueControlEventBusKey);

        provide(menuInjectionKey, {
            activeKey: valueVM,
            updateKey: callUpdateValue,
            expandedKeys: mergedExpandKeys,
            updateExpandKeys: callUpdateExpandKeys,
            padding: indent.value! - 32,
            key: internalKey,
            BusUniqueControl,
            isUnique: unique
        });

        onUnmounted(() => {
            BusUniqueControl.reset();
        });

        // main logic...
        return () => createVNode('ul', { class: 'mc-menu' }, [renderSlot(slots, 'default')]);
    }
});
