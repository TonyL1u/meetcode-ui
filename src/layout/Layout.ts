import { defineComponent, onMounted, computed, createVNode } from 'vue';
import { getSlotFirstVNode, useThemeRegister } from '../_utils_';
import { layoutIKey, layoutHeaderIKey, layoutContentIKey, layoutFooterIKey, layoutSiderIKey } from './interface';
import { mainCssr } from './styles';

export default defineComponent({
    name: 'Layout',
    iKey: layoutIKey,
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
            const headerVNode = getSlotFirstVNode(slots.default, layoutHeaderIKey);
            const contentVNode = getSlotFirstVNode(slots.default, layoutContentIKey);
            const footerVNode = getSlotFirstVNode(slots.default, layoutFooterIKey);
            const layoutVNode = getSlotFirstVNode(slots.default, layoutIKey);
            const siderVNode = getSlotFirstVNode(slots.default, layoutSiderIKey);

            return createVNode('div', { class: 'mc-layout' }, [headerVNode, layoutVNode ?? contentVNode, footerVNode]);
        };
    }
});
