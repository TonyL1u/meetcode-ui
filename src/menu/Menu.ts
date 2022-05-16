import { defineComponent, onMounted, renderSlot, createVNode, ref, provide, toRefs } from 'vue';
import { useThemeRegister } from '../_utils_';
import { menuIKey, menuInjectionKey, menuProps } from './interface';
import { mainCssr, lightCssr, darkCssr } from './styles';
import type { Key } from '../_utils_';

export default defineComponent({
    name: 'Menu',
    iKey: menuIKey,
    props: menuProps,
    emits: ['update:value'],
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

        const { value: valueVM } = toRefs(props);

        const callUpdateValue = (value: Key) => {
            emit('update:value', value);
        };

        provide(menuInjectionKey, {
            activeKey: valueVM,
            updateKey: callUpdateValue
        });

        // main logic...
        return () => createVNode('ul', { class: 'mc-menu' }, [renderSlot(slots, 'default')]);
    }
});
