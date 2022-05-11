import { defineComponent, onMounted, createVNode, renderSlot } from 'vue';
import { useThemeRegister } from '../_utils_';
import { layoutContentIKey } from './interface';
import { mainCssr } from './styles';

export default defineComponent({
    name: 'LayoutContent',
    iKey: layoutContentIKey,
    setup(props, { slots }) {
        // theme register
        onMounted(() => {
            useThemeRegister({
                key: 'McLayout',
                main: mainCssr
            });
        });

        // main logic...
        return () => {
            return createVNode('div', { class: 'mc-layout-content' }, [renderSlot(slots, 'default')]);
        };
    }
});
