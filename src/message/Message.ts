import { ref, computed, renderSlot, createVNode, toRefs, VNode, VNodeChild, defineComponent } from 'vue';
import { messageProps } from './interface';
import { NIcon } from 'naive-ui';
import { AlertCircle as IconAlert, CheckmarkCircle as IconSuccess, Warning as IconWarning, InformationCircle as IconInfo, CloseCircleSharp as IconError, CloseOutline as IconClose } from '@vicons/ionicons5';

export default defineComponent({
    name: 'Message',
    props: messageProps,
    emits: ['close'],
    setup(props, { slots, emit, expose }) {
        const { type, duration, closable, hoverAlive, html, card, icon, action } = toRefs(props);
        const messageElRef = ref<HTMLElement>();
        const messageCloseTimer = ref();
        const autoClose = computed(() => duration.value ?? 3000 > 0);

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
            return (
                icon?.value?.() ??
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
                                case 'loading':
                                    return createVNode('div', { class: 'mc-message__icon-loading' });
                            }
                        }
                    }
                )
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

        expose({
            close: handleCloseMessage,
            el: messageElRef
        });

        return () =>
            createVNode(
                'div',
                {
                    ref: messageElRef,
                    class: ['mc-message', { 'mc-message--card': card.value }, `mc-message--${type.value}`],
                    onMouseenter() {
                        hoverAlive.value && autoClose.value && clearCloseTimer();
                    },
                    onMouseleave() {
                        hoverAlive.value && autoClose.value && startCloseTimer();
                    }
                },
                [iconVNode.value, contentVNode.value, closableVNode.value, action?.value?.()]
            );
    }
});
