import { defineComponent, renderSlot } from 'vue';
import { createElementVNode } from '../../_utils_';

export default defineComponent({
    name: 'InputGroup',
    setup(_, { slots }) {
        return () => createElementVNode('div', { class: 'mc-input-group' }, [renderSlot(slots, 'default')]);
    }
});
