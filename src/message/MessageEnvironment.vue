<script lang="ts" setup>
import { createVNode, Fragment, ref } from 'vue';
import Message from './Message.vue';
import MessageReactiveList from './MessageComposable';
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
                options: { duration, className, style, closable }
            } = message;

            message.options.close = () => {
                messageRefs.value[index].close();
            };
            return createVNode(
                Message,
                {
                    ref: el => (messageRefs.value[index] = el as MessageExposeInstance),
                    type,
                    duration,
                    class: className,
                    style,
                    closable,
                    index
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
