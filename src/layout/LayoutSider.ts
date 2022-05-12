import { defineComponent, getCurrentInstance, createVNode, renderSlot, CustomVNodeTypes, toRefs, computed } from 'vue';
import { layoutSiderIKey, layoutIKey, layoutSiderProps } from './interface';
import * as CSS from 'csstype';

export default defineComponent({
    name: 'LayoutSider',
    iKey: layoutSiderIKey,
    props: layoutSiderProps,
    setup(props, { slots }) {
        const { parent } = getCurrentInstance() ?? {};
        if (parent && (parent.type as CustomVNodeTypes).iKey !== layoutIKey) {
            throw new Error('[McLayoutHeader]: McLayoutHeader must be placed inside McLayout.');
        }
        const { width } = toRefs(props);
        const cssVars = computed<CSS.Properties>(() => {
            return {
                '--layout-sider-width': typeof width.value === 'number' ? `${width.value}px` : width.value
            };
        });

        // main logic...
        return () => {
            return slots.default ? createVNode('aside', { class: 'mc-layout-sider', style: cssVars.value }, [renderSlot(slots, 'default')]) : null;
        };
    }
});
