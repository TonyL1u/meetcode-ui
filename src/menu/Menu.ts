import { defineComponent, onMounted, renderSlot, createVNode, ref, provide, toRefs, reactive } from 'vue';
import { useThemeRegister, flatten } from '../_utils_';
import { menuIKey, menuInjectionKey, subMenuIKey, menuProps } from './interface';
import { mainCssr, lightCssr, darkCssr } from './styles';
import type { Key } from '../_utils_';

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

        const { value: valueVM, expandKeys, indent } = toRefs(props);
        const internalExpandKeys = ref<Key[]>([]);
        const mergedExpandKeys = expandKeys.value ? expandKeys : internalExpandKeys;
        console.log(flatten(slots.default(), subMenuIKey));

        const callUpdateValue = (value: Key) => {
            emit('update:value', value);
        };
        const callUpdateExpandedKeys = (key: Key) => {
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
        provide(menuInjectionKey, {
            activeKey: valueVM,
            updateKey: callUpdateValue,
            expandedKeys: mergedExpandKeys,
            updateExpandedKeys: callUpdateExpandedKeys,
            padding: indent.value! - 32
        });

        // main logic...
        return () => createVNode('ul', { class: 'mc-menu' }, [renderSlot(slots, 'default')]);
    }
});
