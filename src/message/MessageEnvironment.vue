<script lang="ts" setup>
import { createVNode, Fragment, ref } from 'vue';
import Message from './Message.vue';
import MessageReactiveList, { MessageCounter } from './MessageComposable';
import { MessageExposeInstance } from './interface';

// const messageRefs = useTemplateRefsList<MessageExposeInstance>();
const messageRefs = ref<{ [key: string]: MessageExposeInstance }>({});

const Render = () => {
    return createVNode(
        Fragment,
        null,
        MessageReactiveList.map((message, index) => {
            const {
                type,
                options: { duration, className, style, closable, onClose }
            } = message;

            return createVNode(
                Message,
                {
                    ref: ins => {
                        const { close, el } = (ins as MessageExposeInstance) ?? {};
                        message.options.close = close;
                        message.options.el = el;
                    },
                    type,
                    duration,
                    class: className,
                    style,
                    closable,
                    onClose: () => {
                        onClose && onClose();
                        MessageCounter.value--;
                    }
                },
                {
                    //if use destructure message, message can't be reactive
                    default: () => message.options.message
                }
            );
        })
    );
};
</script>

<template>
    <Render />
</template>
