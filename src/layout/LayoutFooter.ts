import { defineComponent, onMounted, createVNode, renderSlot } from 'vue';
import { useThemeRegister } from '../_utils_';
import { layoutFooterIKey } from './interface';
import { mainCssr } from './styles';

export default defineComponent({
    name: 'LayoutFooter',
    iKey: layoutFooterIKey,
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
            return createVNode('footer', { class: 'mc-layout-footer' }, [renderSlot(slots, 'default')]);
        };
    }
});
