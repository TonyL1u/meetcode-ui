<script lang="ts" setup>
import { ref, useSlots, renderSlot, createVNode, toRefs, Transition, withDirectives, vShow } from 'vue';
import { MessageType } from './interface';

interface Props {
    type?: MessageType;
}
const props = withDefaults(defineProps<Props>(), {
    type: 'text'
});

const slots = useSlots();
const { type } = toRefs(props);
const visible = ref(true);
const messageCloseTimer = ref();

const startCloseTimer = () => {
    messageCloseTimer.value = window.setTimeout(() => {
        visible.value = false;
        console.log(1234);
        clearCloseTimer();
    }, 2000);
};
const clearCloseTimer = () => {
    window.clearTimeout(messageCloseTimer.value);
    messageCloseTimer.value = null;
};

startCloseTimer();

const Render = () => {
    const messageVNode = withDirectives(
        createVNode(
            'div',
            {
                class: ['mc-message', `mc-message--${type.value}`],
                onMouseenter() {
                    clearCloseTimer();
                },
                onMouseleave() {
                    startCloseTimer();
                }
            },
            [renderSlot(slots, 'default')]
        ),
        [[vShow, visible.value]]
    );

    return createVNode(
        Transition,
        { name: 'mc-message-slide-down', appear: true },
        {
            default: () => messageVNode
        }
    );
};
</script>

<template>
    <Render />
</template>
