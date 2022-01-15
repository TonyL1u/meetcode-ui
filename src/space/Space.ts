import { defineComponent, renderSlot, createVNode } from 'vue';
import { flattenWithOptions } from '../_utils_';

export default defineComponent({
    setup(props, { slots }) {
        return () => {
            const spaceItems = flattenWithOptions({ slots });
            console.log(spaceItems);
            return createVNode(
                'div',
                { class: 'mc-space' },
                spaceItems.map(item => {
                    return createVNode('div', { class: 'mc-space-item' }, [item]);
                })
            );
        };
    }
});
