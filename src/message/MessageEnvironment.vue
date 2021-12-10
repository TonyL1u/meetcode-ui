<script lang="ts" setup>
import { createVNode, createCommentVNode, TransitionGroup } from 'vue';
import MessageEntity from './Message.vue';
import MessageReactiveList, { closeMessage, unmountContainer } from './MessageComposable';
import { MessageExposeInstance, Message } from './interface';

const handleAfterLeave = () => {
    // console.log(MessageReactiveList.length);
    // if (MessageReactiveList.length) {
    //     unmountContainer();
    // }
};

const getMessageEntityVNode = (message: Message) => {
    const {
        key,
        type,
        options: { duration, className, style, closable, onClose }
    } = message;

    return createVNode(
        MessageEntity,
        {
            key,
            ref: ins => {
                const { close, el } = (ins as MessageExposeInstance) ?? {};
                // message.options.close = close;
                // message.options.el = el;
            },
            type,
            duration,
            class: className,
            style,
            closable,
            onClose: () => {
                onClose && onClose();
                closeMessage(key);
            }
        },
        {
            //if destructure message, message can't be reactive
            default: () => message.options.message
        }
    );
};

const Render = () => {
    return createVNode(
        TransitionGroup,
        { name: 'mc-message-slide-down', appear: true, tag: 'div', class: 'mc-message-global-container', onAfterLeave: handleAfterLeave },
        { default: () => MessageReactiveList.map(message => getMessageEntityVNode(message)) }
    );
    return MessageReactiveList.length > 0
        ? createVNode(
              'div',
              {
                  class: 'mc-message-global-container'
              },
              [createVNode(TransitionGroup, { name: 'mc-message-slide-down', appear: true }, { default: () => MessageReactiveList.map(message => getMessageEntityVNode(message)) })]
          )
        : createCommentVNode('', true);
};
</script>

<template>
    <Render />
</template>
