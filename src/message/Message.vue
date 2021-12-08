<script lang="ts">
export default {
    name: 'Message'
};
</script>

<script lang="ts" setup>
import { ref, computed, useSlots, renderSlot, createVNode, toRefs, Transition, withDirectives, vShow, VNodeChild } from 'vue';
import { MessageType, MessageCloseImpl } from './interface';
import { NIcon } from 'naive-ui';
import { AlertCircle as IconAlert, CheckmarkCircle as IconSuccess, Warning as IconWarning, InformationCircle as IconInfo, CloseCircleSharp as IconError, CloseOutline as IconClose } from '@vicons/ionicons5';

interface Props {
    type?: MessageType;
    duration?: number;
    closable?: boolean;
    icon?: () => VNodeChild;
}
const props = withDefaults(defineProps<Props>(), {
    type: 'text',
    duration: 2000,
    closable: false
});
const emit = defineEmits<{
    (e: 'close'): void;
}>();

const slots = useSlots();
const { type, duration, closable, icon } = toRefs(props);
const messageElRef = ref<HTMLElement>();
const messageCloseTimer = ref();
const autoClose = computed(() => duration.value > 0);

const handleCloseMessage = () => {
    emit('close');
};
const startCloseTimer = () => {
    messageCloseTimer.value = window.setTimeout(() => {
        handleCloseMessage();
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

const iconVNode = computed(() => {
    return (
        icon?.value ??
        createVNode(
            NIcon,
            {
                size: 18,
                class: 'mc-message__icon'
            },
            {
                default: () => {
                    switch (type.value) {
                        case 'text':
                            return createVNode(IconAlert);
                        case 'success':
                            return createVNode(IconSuccess);
                        case 'warning':
                            return createVNode(IconWarning);
                        case 'info':
                            return createVNode(IconInfo);
                        case 'error':
                            return createVNode(IconError);
                    }
                }
            }
        )
    );
});

const closableVNode = computed(() => {
    return closable.value
        ? createVNode(
              NIcon,
              {
                  size: 18,
                  class: 'mc-message__close',
                  onClick() {
                      handleCloseMessage();
                  }
              },
              { default: () => createVNode(IconClose) }
          )
        : null;
});

const Render = () => {
    return createVNode(
        'div',
        {
            // ref: messageElRef,
            class: ['mc-message', `mc-message--${type.value}`],
            onMouseenter() {
                autoClose.value && clearCloseTimer();
            },
            onMouseleave() {
                autoClose.value && startCloseTimer();
            }
        },
        [iconVNode.value, createVNode('div', { class: 'mc-message__content' }, [renderSlot(slots, 'default')]), closableVNode.value]
    );
};

defineExpose({
    close: handleCloseMessage,
    el: messageElRef
});
</script>

<template>
    <Render />
</template>
