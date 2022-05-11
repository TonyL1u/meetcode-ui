import { defineComponent, onMounted, provide, computed, createVNode, resolveComponent } from 'vue';
import { getSlotFirstVNode, useThemeRegister } from '../_utils_';
import { layoutIKey, layoutHeaderIKey, layoutContentIKey, layoutFooterIKey, layoutSiderIKey, layoutInjectionKey } from './interface';
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

        provide(layoutInjectionKey, Symbol());

        // main logic...
        return () => {
            const McLayout = resolveComponent('McLayout', true);
            const headerVNode = getSlotFirstVNode(slots.default, layoutHeaderIKey);
            const contentVNode = getSlotFirstVNode(slots.default, layoutContentIKey);
            const footerVNode = getSlotFirstVNode(slots.default, layoutFooterIKey);
            const layoutVNode = getSlotFirstVNode(slots.default, layoutIKey);
            const siderVNode = getSlotFirstVNode(slots.default, layoutSiderIKey);
            const needExtraLayout = siderVNode && !layoutVNode && (headerVNode || footerVNode);

            if (siderVNode) {
                console.log(siderVNode.type.iKey);
                console.log(slots.default().findIndex(slot => slot.type.iKey === siderVNode.type.iKey));
            }

            return createVNode('div', { class: ['mc-layout', siderVNode ? 'mc-layout--with-sider' : ''] }, [
                siderVNode,
                !needExtraLayout && headerVNode,
                needExtraLayout ? createVNode(McLayout, null, { default: () => [headerVNode, contentVNode, footerVNode] }) : layoutVNode ?? contentVNode,
                !needExtraLayout && footerVNode
            ]);
        };
    }
});
