import { defineComponent, inject, createVNode, renderSlot } from 'vue';
import { layoutSiderIKey, layoutInjectionKey } from './interface';

export default defineComponent({
    name: 'LayoutSider',
    iKey: layoutSiderIKey,
    setup(props, { slots }) {
        if (!inject(layoutInjectionKey, null)) {
            throw new Error('[McLayoutSider]: McLayoutSider must be placed inside McLayout.');
        }

        // main logic...
        return () => {
            return createVNode('aside', { class: 'mc-layout-sider' }, [renderSlot(slots, 'default')]);
        };
    }
});
