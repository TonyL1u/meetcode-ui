import { defineComponent, inject, createVNode, renderSlot } from 'vue';
import { layoutContentIKey, layoutInjectionKey } from './interface';

export default defineComponent({
    name: 'LayoutContent',
    iKey: layoutContentIKey,
    setup(props, { slots }) {
        if (!inject(layoutInjectionKey, null)) {
            throw new Error('[McLayoutContent]: McLayoutContent must be placed inside McLayout.');
        }

        // main logic...
        return () => {
            return createVNode('div', { class: 'mc-layout-content' }, [renderSlot(slots, 'default')]);
        };
    }
});
