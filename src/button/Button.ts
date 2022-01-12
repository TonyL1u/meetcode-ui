import { defineComponent, createVNode, renderSlot, ref } from 'vue';

export default defineComponent({
    name: 'Button',
    setup(props, { slots }) {
        const isWaving = ref(false);
        return () =>
            createVNode(
                'button',
                {
                    class: ['mc-button', { 'mc-button--waving': isWaving.value }]
                    // onClick: (evt: MouseEvent) => {
                    //     if (isWaving.value) {
                    //         isWaving.value = false;
                    //     }
                    //     isWaving.value = true;
                    // },
                    // onAnimationend: () => {
                    //     setTimeout(() => {
                    //         isWaving.value = false;
                    //     }, 400);
                    // }
                },
                [createVNode('span', { class: 'mc-button__inner' }, [renderSlot(slots, 'default')])]
            );
    }
});
