<script lang="ts" setup>
import { watch, ref, computed, useSlots, renderSlot, createVNode, toRefs, Transition, withDirectives, vShow } from 'vue';
import { MessageType, MessageCloseImpl } from './interface';
import { NIcon } from 'naive-ui';
import { CloseOutline as IconClose } from '@vicons/ionicons5';

interface Props {
    type?: MessageType;
    duration?: number;
    closable?: boolean;
    onClose?: MessageCloseImpl;
}
const props = withDefaults(defineProps<Props>(), {
    type: 'text',
    duration: 2000,
    closable: false
});

const slots = useSlots();
const { type, duration, closable, onClose } = toRefs(props);
const visible = ref(true);
const messageCloseTimer = ref();
const autoClose = computed(() => duration.value > 0);

const closeMessage = () => {
    visible.value = false;
    if (onClose?.value) {
        const { value: close } = onClose;
        close();
    }
};
const startCloseTimer = () => {
    messageCloseTimer.value = window.setTimeout(() => {
        console.log(1234);
        closeMessage();
        clearCloseTimer();
    }, duration.value);
};
const clearCloseTimer = () => {
    window.clearTimeout(messageCloseTimer.value);
    messageCloseTimer.value = null;
};

if (autoClose.value) {
    startCloseTimer();
}

const Render = () => {
    const messageVNode = withDirectives(
        createVNode(
            'div',
            {
                class: ['mc-message', `mc-message--${type.value}`],
                onMouseenter() {
                    autoClose.value && clearCloseTimer();
                },
                onMouseleave() {
                    autoClose.value && startCloseTimer();
                }
            },
            [
                createVNode('div', { class: 'mc-message__content' }, [renderSlot(slots, 'default')]),
                closable.value
                    ? createVNode(
                          NIcon,
                          {
                              size: 16,
                              class: 'mc-message__close-icon',
                              onClick() {
                                  closeMessage();
                              }
                          },
                          { default: () => createVNode(IconClose) }
                      )
                    : null
            ]
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
