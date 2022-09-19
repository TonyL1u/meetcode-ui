import { defineComponent, getCurrentInstance, createVNode, renderSlot, CustomVNodeTypes, toRefs } from 'vue';
import { layoutFooterIKey, layoutIKey, layoutHeaderProps } from '../interface';

export default defineComponent({
    name: 'LayoutFooter',
    iKey: layoutFooterIKey,
    props: layoutHeaderProps,
    setup(props, { slots }) {
        const { parent } = getCurrentInstance() ?? {};
        if (parent && (parent.type as CustomVNodeTypes).iKey !== layoutIKey) {
            throw new Error('[McLayoutHeader]: McLayoutHeader must be placed inside McLayout.');
        }

        const { bordered } = toRefs(props);

        // main logic...
        return () => {
            return createVNode('footer', { class: ['mc-layout-footer', bordered.value ? 'mc-layout-footer--bordered' : ''] }, [renderSlot(slots, 'default')]);
        };
    }
});
