import { defineComponent, inject, createVNode, renderSlot } from 'vue';
import { layoutFooterIKey, layoutInjectionKey } from './interface';

export default defineComponent({
    name: 'LayoutFooter',
    iKey: layoutFooterIKey,
    setup(props, { slots }) {
        if (!inject(layoutInjectionKey, null)) {
            throw new Error('[McLayoutFooter]: McLayoutFooter must be placed inside McLayout.');
        }

        // main logic...
        return () => {
            return createVNode('footer', { class: 'mc-layout-footer' }, [renderSlot(slots, 'default')]);
        };
    }
});
