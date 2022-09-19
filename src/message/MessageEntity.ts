import { ref, computed, renderSlot, mergeProps, toRefs, VNode, VNodeChild, defineComponent } from 'vue';
import { createElementVNode, createComponentVNode, PatchFlags } from '../_utils_';
import { McBaseLoading } from '../_internal_';
import { messageProps } from './interface';
import { McIcon } from '../icon';
import { AlertCircle as IconAlert, CheckmarkCircle as IconSuccess, Warning as IconWarning, InformationCircle as IconInfo, CloseCircleSharp as IconError, CloseOutline as IconClose } from '@vicons/ionicons5';

export default defineComponent({
    name: 'Message',
    props: messageProps,
    emits: ['close'],
    setup(props, { slots, attrs, emit, expose }) {
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
            return icon?.value
                ? icon?.value()
                : type.value === 'loading'
                ? createComponentVNode(McBaseLoading, { class: 'mc-message__icon', size: 16, stroke: 22 })
                : createComponentVNode(
                      McIcon,
                      {
                          size: 18,
                          class: 'mc-message__icon'
                      },
                      {
                          default: () => {
                              switch (type.value) {
                                  case 'text':
                                      return createComponentVNode(IconAlert);
                                  case 'success':
                                      return createComponentVNode(IconSuccess);
                                  case 'warning':
                                      return createComponentVNode(IconWarning);
                                  case 'info':
                                      return createComponentVNode(IconInfo);
                                  case 'error':
                                      return createComponentVNode(IconError);
                              }
                          }
                      }
                  );
        });

        const closableVNode = computed<VNode | null>(() => {
            if (action?.value) return null;
            return closable.value
                ? createComponentVNode(
                      McIcon,
                      {
                          size: 18,
                          class: 'mc-message__close',
                          onClick() {
                              handleCloseMessage();
                          }
                      },
                      { default: () => createComponentVNode(IconClose) }
                  )
                : null;
        });

        const contentVNode = computed<VNode | null>(() => {
            if (html?.value) {
                return createElementVNode(
                    'div',
                    {
                        class: 'mc-message__content',
                        innerHTML: html.value
                    },
                    null,
                    PatchFlags.PROPS,
                    ['innerHTML']
                );
            } else {
                return createElementVNode('div', { class: 'mc-message__content' }, [renderSlot(slots, 'default')]);
            }
        });

        expose({
            close: handleCloseMessage,
            el: messageElRef
        });

        return () => {
            const mergedProps = mergeProps(
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
                attrs
            );

            return createElementVNode('div', mergedProps, [iconVNode.value, contentVNode.value, closableVNode.value, action?.value?.()], PatchFlags.CLASS | PatchFlags.HYDRATE_EVENTS);
        };
    }
});
