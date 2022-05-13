import { defineComponent, toRefs, createVNode, renderSlot, getCurrentInstance, CustomVNodeTypes } from 'vue';
import { layoutHeaderIKey, layoutHeaderProps, layoutIKey } from '../interface';

export default defineComponent({
    name: 'LayoutHeader',
    iKey: layoutHeaderIKey,
    props: layoutHeaderProps,
    setup(props, { slots }) {
        const { parent } = getCurrentInstance() ?? {};
        if (parent && (parent.type as CustomVNodeTypes).iKey !== layoutIKey) {
            throw new Error('[McLayoutHeader]: McLayoutHeader must be placed inside McLayout.');
        }

        const { bordered } = toRefs(props);

        // main logic...
        return () => {
            return createVNode('header', { class: ['mc-layout-header', bordered.value ? 'mc-layout-header--bordered' : ''] }, [renderSlot(slots, 'default')]);
        };
    }
});
