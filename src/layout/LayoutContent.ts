import { defineComponent, getCurrentInstance, createVNode, renderSlot, CustomVNodeTypes } from 'vue';
import { layoutContentIKey, layoutIKey } from './interface';

export default defineComponent({
    name: 'LayoutContent',
    iKey: layoutContentIKey,
    setup(props, { slots }) {
        const { parent } = getCurrentInstance() ?? {};
        if (parent && (parent.type as CustomVNodeTypes).iKey !== layoutIKey) {
            throw new Error('[McLayoutHeader]: McLayoutHeader must be placed inside McLayout.');
        }

        // main logic...
        return () => {
            return slots.default ? createVNode('main', { class: 'mc-layout-content' }, [renderSlot(slots, 'default')]) : null;
        };
    }
});
