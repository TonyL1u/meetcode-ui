<script lang="ts" setup>
import { createVNode, Fragment } from 'vue';
import Message from './Message.vue';
import MessageReactiveList from './MessageComposable';

const Render = () => {
    return createVNode(
        Fragment,
        null,
        MessageReactiveList.map(message => {
            return createVNode(
                Message,
                {
                    type: message.type,
                    duration: message.options.duration,
                    class: message.options.className
                },
                {
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
