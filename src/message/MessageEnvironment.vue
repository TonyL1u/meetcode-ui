<script lang="ts" setup>
import { createVNode, reactive, ref, TransitionGroup } from 'vue';
import Message from './Message.vue';
import MessageReactiveList, { destroyMessage, mountContainer, unmountContainer } from './MessageComposable';
import { MessageExposeInstance } from './interface';

const handleAfterLeave = () => {
    if (MessageReactiveList.length === 0) {
        unmountContainer();
    }
};

const Render = () => {
    return createVNode(
        TransitionGroup,
        {
            name: 'mc-message-slide-down',
            appear: true,
            tag: 'div',
            class: 'basic-transition-group',
            onAfterLeave: handleAfterLeave
        },
        {
            default: () =>
                MessageReactiveList.map((message, index) => {
                    const {
                        key,
                        type,
                        options: { duration, className, style, closable, onClose }
                    } = message;

                    return createVNode(
                        Message,
                        {
                            key,
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
                                destroyMessage(key);
                            }
                        },
                        {
                            //if destructure message, message can't be reactive
                            default: () => message.options.message
                        }
                    );
                })
        }
    );
};
</script>

<template>
    <Render />
</template>
