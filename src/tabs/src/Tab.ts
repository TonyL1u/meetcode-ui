import { inject, createVNode, renderSlot, defineComponent } from 'vue';
import { tabsInjectionKey, tabIKey, tabProps } from '../interface';

export default defineComponent({
    name: 'Tab',
    iKey: tabIKey,
    props: tabProps,
    setup(props, { slots }) {
        const valueRef = inject(tabsInjectionKey, null);

        if (!valueRef) {
            throw new Error('[McTab]: McTab must be placed inside McTabs.');
        }

        return () =>
            createVNode(
                'div',
                {
                    class: 'mc-tabs-tab'
                },
                [renderSlot(slots, 'default')]
            );
    }
});
