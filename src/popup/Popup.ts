import { defineComponent, createVNode } from 'vue';

export default defineComponent({
    name: 'Popup',
    props: {},
    setup() {
        return () => createVNode('div', { class: 'mc-popup' }, [1]);
    }
});
