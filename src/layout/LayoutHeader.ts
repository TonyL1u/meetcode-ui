import { defineComponent, onMounted, createVNode, renderSlot } from 'vue';
import { useThemeRegister } from '../_utils_';
import { layoutHeaderIKey } from './interface';
import { mainCssr } from './styles';

export default defineComponent({
    name: 'LayoutHeader',
    iKey: layoutHeaderIKey,
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
            return createVNode('header', { class: 'mc-layout-header' }, [renderSlot(slots, 'default')]);
        };
    }
});
