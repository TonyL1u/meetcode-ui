import { defineComponent, createVNode, renderSlot } from 'vue';

export default defineComponent({
    name: 'Button',
    setup(props, { slots }) {
        return () => createVNode('button', { class: 'mc-button' }, [createVNode('span', { class: 'mc-button__inner' }, [renderSlot(slots, 'default')])]);
    }
});
