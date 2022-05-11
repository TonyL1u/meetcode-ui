import { defineComponent, inject, createVNode, renderSlot } from 'vue';
import { layoutHeaderIKey, layoutInjectionKey } from './interface';

export default defineComponent({
    name: 'LayoutHeader',
    iKey: layoutHeaderIKey,
    setup(props, { slots }) {
        if (!inject(layoutInjectionKey, null)) {
            throw new Error('[McLayoutHeader]: McLayoutHeader must be placed inside McLayout.');
        }

        // main logic...
        return () => {
            return createVNode('header', { class: 'mc-layout-header' }, [renderSlot(slots, 'default')]);
        };
    }
});
