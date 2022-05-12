import { defineComponent, inject, createVNode, renderSlot, getCurrentInstance, CustomVNodeTypes } from 'vue';
import { layoutHeaderIKey, layoutInjectionKey, layoutIKey } from './interface';

export default defineComponent({
    name: 'LayoutHeader',
    iKey: layoutHeaderIKey,
    setup(props, { slots }) {
        const { parent } = getCurrentInstance() ?? {};
        if (parent && (parent.type as CustomVNodeTypes).iKey !== layoutIKey) {
            throw new Error('[McLayoutHeader]: McLayoutHeader must be placed inside McLayout.');
        }

        // main logic...
        return () => {
            return createVNode('header', { class: 'mc-layout-header' }, [renderSlot(slots, 'default')]);
        };
    }
});
