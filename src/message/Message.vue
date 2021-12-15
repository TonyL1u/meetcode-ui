<script lang="ts">
export default {
    name: 'Message'
};
</script>

<script lang="ts" setup>
import { ref, computed, useSlots, renderSlot, createVNode, toRefs, VNode, VNodeChild, createElementVNode } from 'vue';
import { MessageType } from './interface';
import { NIcon } from 'naive-ui';
import { AlertCircle as IconAlert, CheckmarkCircle as IconSuccess, Warning as IconWarning, InformationCircle as IconInfo, CloseCircleSharp as IconError, CloseOutline as IconClose } from '@vicons/ionicons5';
import * as CSS from 'csstype';

interface Props {
    type?: MessageType;
    duration?: number;
    closable?: boolean;
    hoverAlive?: boolean;
    html?: string;
    card?: boolean;
    itemGap?: number;
    icon?: () => VNodeChild;
    action?: () => VNodeChild;
}
const props = withDefaults(defineProps<Props>(), {
    type: 'text',
    duration: 3000,
    closable: false,
    hoverAlive: true,
    card: false,
    itemGap: 8
});
const emit = defineEmits<{
    (e: 'close'): void;
}>();

const slots = useSlots();
const { type, duration, closable, hoverAlive, html, card, itemGap, icon, action } = toRefs(props);
const messageElRef = ref<HTMLElement>();
const messageCloseTimer = ref();
const autoClose = computed(() => duration.value > 0);
const cssVars = computed<CSS.Properties>(() => {
    return {
        '--message-item-gap': itemGap.value + 'px'
    };
});

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

const iconVNode = computed<VNodeChild | VNode>(() => {
    return icon?.value
        ? icon?.value()
        : createVNode(
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
                          case 'loading':
                              return createVNode('div', { class: 'mc-message__icon-loading' });
                      }
                  }
              }
          );
});

const closableVNode = computed<VNode | null>(() => {
    if (action?.value) return null;
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

const contentVNode = computed<VNode | null>(() => {
    if (html?.value) {
        return createVNode('div', {
            class: 'mc-message__content',
            innerHTML: html.value
        });
    } else {
        return createVNode('div', { class: 'mc-message__content' }, [renderSlot(slots, 'default')]);
    }
});

const Render = (): VNode => {
    return createVNode(
        'div',
        {
            // ref: messageElRef,
            class: ['mc-message', { 'mc-message--card': card.value }, `mc-message--${type.value}`],
            style: cssVars.value,
            onMouseenter() {
                hoverAlive.value && autoClose.value && clearCloseTimer();
            },
            onMouseleave() {
                hoverAlive.value && autoClose.value && startCloseTimer();
            }
        },
        [iconVNode.value, contentVNode.value, closableVNode.value, action?.value?.()]
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
