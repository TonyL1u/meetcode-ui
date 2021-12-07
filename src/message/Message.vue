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
    destroyWhenClose?: boolean;
    icon?: () => VNodeChild;
    onClose?: MessageCloseImpl;
}
const props = withDefaults(defineProps<Props>(), {
    type: 'text',
    duration: 2000,
    closable: false,
    destroyWhenClose: true
});

const slots = useSlots();
const { type, duration, closable, destroyWhenClose, icon, onClose } = toRefs(props);
const visible = ref(true);
const messageElRef = ref<HTMLElement>();
const messageCloseTimer = ref();
const autoClose = computed(() => duration.value > 0);

const handleCloseMessage = () => {
    visible.value = false;
    if (onClose?.value) {
        const { value: close } = onClose;
        close();
    }
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

const messageVNode = computed(() => {
    const tempVNode = createVNode(
        'div',
        {
            ref: messageElRef,
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

    if (destroyWhenClose.value) {
        if (!visible.value) return null;
        return tempVNode;
    } else {
        return withDirectives(tempVNode, [[vShow, visible.value]]);
    }
});

const Render = () => {
    return createVNode(
        Transition,
        { name: 'mc-message-slide-down', appear: true },
        {
            default: () => messageVNode.value
        }
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
