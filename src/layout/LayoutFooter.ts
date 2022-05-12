import { defineComponent, getCurrentInstance, createVNode, renderSlot, CustomVNodeTypes } from 'vue';
import { layoutFooterIKey, layoutIKey } from './interface';

export default defineComponent({
    name: 'LayoutFooter',
    iKey: layoutFooterIKey,
    setup(props, { slots }) {
        const { parent } = getCurrentInstance() ?? {};
        if (parent && (parent.type as CustomVNodeTypes).iKey !== layoutIKey) {
            throw new Error('[McLayoutHeader]: McLayoutHeader must be placed inside McLayout.');
        }

        // main logic...
        return () => {
            return slots.default ? createVNode('footer', { class: 'mc-layout-footer' }, [renderSlot(slots, 'default')]) : null;
        };
    }
});
