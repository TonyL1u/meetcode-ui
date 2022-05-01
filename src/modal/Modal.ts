import { defineComponent, createVNode, toRefs, computed, renderSlot, ref, Transition, watch, createTextVNode, CSSProperties, mergeProps, onMounted, provide, nextTick } from 'vue';
import { createKey, useThemeRegister } from '../_utils_';
import { onClickOutside, useMouse, useMagicKeys, pausableWatch } from '@vueuse/core';
import { VLazyTeleport } from 'vueuc';
import { modalProps, ModalCloseAction, modalInjectionKey } from './interface';
import { McIcon } from '../icon';
import { McButton } from '../button';
import { modalStack, addModal, removeModal } from './shared';
import { Close as IconClose } from '@vicons/ionicons5';
import * as CSS from 'csstype';
import { mainCssr, lightCssr, darkCssr } from './styles';

export default defineComponent({
    name: 'Modal',
    inheritAttrs: false,
    props: modalProps,
    emits: ['update:show', 'wrapper-click', 'shortcut-stroke', 'after-enter', 'after-leave', 'before-enter', 'cancel', 'confirm'],
    setup(props, { slots, attrs, emit, expose }) {
        // theme register
        onMounted(() => {
            useThemeRegister({
                key: 'McModal',
                main: mainCssr,
                light: lightCssr,
                dark: darkCssr
            });
        });

        const {
            show,
            width,
            height,
            appearFromCursor,
            wrapperClosable,
            shortcutKey,
            closeOnShortcut,
            closable,
            headerStyle,
            bodyStyle,
            footerStyle,
            headerClass,
            bodyClass,
            footerClass,
            title,
            showHeader,
            showFooter,
            cancelText,
            confirmText,
            pure,
            position,
            animation,
            onBeforeLeave,
            appearX,
            appearY
        } = toRefs(props);
        const key = createKey('modal');
        const modalContainerElRef = ref<HTMLElement>();
        const modalElRef = ref<HTMLElement | null>(null);
        const modalAppearXRef = ref(0);
        const modalAppearYRef = ref(0);
        const modalTransformOrigin = computed(() => (appearFromCursor.value ? `${modalAppearXRef.value}px ${modalAppearYRef.value}px` : 'center center'));
        const modalTransitionName = computed(() => (appearFromCursor.value ? 'mc-modal-scale' : ['scale', 'slide'].includes(animation.value!) ? `mc-modal-${animation.value}` : 'mc-modal-scale'));
        const isTopModal = computed(() => modalStack.length > 0 && modalStack[modalStack.length - 1] === key);
        const isMountModal = ref(true);
        const { x, y } = useMouse();
        const magicKeys = useMagicKeys({
            passive: false,
            onEventFired(event: Event) {
                isTopModal.value && event.stopImmediatePropagation();
            }
        });
        const keys = computed(() => Array.from(magicKeys.current));
        let closeAction: ModalCloseAction;

        watch(
            show,
            () => {
                if (show.value) {
                    isMountModal.value = true;
                    modalAppearXRef.value = appearX.value || x.value;
                    modalAppearYRef.value = appearY.value || y.value;
                    addModal(key);
                } else {
                    removeModal(key);
                }
            },
            { immediate: true }
        );

        const { pause, resume } = pausableWatch(magicKeys[shortcutKey.value!], v => {
            if (v && show.value && closeOnShortcut.value && isTopModal.value) {
                callShortcutStroke();
                callUpdateShow(false);
            }
        });

        watch(
            isTopModal,
            () => {
                if (!isTopModal.value) {
                    pause();
                } else {
                    resume();
                }
            },
            { immediate: true }
        );

        onClickOutside(modalElRef, event => {
            if (wrapperClosable.value && isTopModal.value) {
                callWrapperClick(event);
                callUpdateShow(false);
            }
        });

        const callUpdateShow = async (val: boolean) => {
            if (!val) {
                const callback = await onBeforeLeave.value?.(closeAction);
                if (callback) return;
            }

            emit('update:show', val);
        };

        const callWrapperClick = (e: MouseEvent) => {
            closeAction = 'wrapper';
            emit('wrapper-click', e);
        };

        const callShortcutStroke = () => {
            closeAction = 'shortcut';
            emit('shortcut-stroke', keys.value);
        };

        const callAfterEnter = () => {
            emit('after-enter');
        };

        const callAfterLeave = () => {
            isMountModal.value = false;
            emit('after-leave');
        };

        const callBeforeEnter = () => {
            emit('before-enter');
        };

        const callOnCancel = () => {
            closeAction = 'cancel';
            emit('cancel');
        };

        const callOnConfirm = () => {
            closeAction = 'confirm';
            emit('confirm');
        };

        const handleCancel = () => {
            callOnCancel();
            callUpdateShow(false);
        };

        const handleConfirm = () => {
            callOnConfirm();
            callUpdateShow(false);
        };

        const modalPosition = computed<CSSProperties>(() => {
            const { top, right, bottom, left } = position.value || {};

            return {
                marginTop: top !== undefined ? (typeof top === 'number' ? `${top}px` : top) : 'auto',
                marginRight: right !== undefined ? (typeof right === 'number' ? `${right}px` : right) : 'auto',
                marginBottom: bottom !== undefined ? (typeof bottom === 'number' ? `${bottom}px` : bottom) : 'auto',
                marginLeft: left !== undefined ? (typeof left === 'number' ? `${left}px` : left) : 'auto'
            };
        });

        const cssVars = computed<CSS.Properties>(() => {
            return {
                '--modal-width': typeof width.value === 'number' ? `${width.value}px` : width.value,
                '--modal-height': typeof height.value === 'number' ? `${height.value}px` : height.value
            };
        });

        const headerVNode = computed(() => {
            const titleVNode = createVNode('div', { class: 'mc-modal-title' }, [typeof title.value === 'string' ? createTextVNode(title.value) : title.value?.()]);
            const closeIconVNode = closable.value
                ? createVNode(
                      McIcon,
                      {
                          size: 20,
                          class: 'mc-modal-close-icon',
                          onClick: () => {
                              closeAction = 'close';
                              callUpdateShow(false);
                          }
                      },
                      { default: () => createVNode(IconClose) }
                  )
                : null;

            return !pure.value && showHeader.value ? createVNode('div', { class: ['mc-modal__header', headerClass.value], style: headerStyle.value }, [slots.header ? renderSlot(slots, 'header') : titleVNode, closeIconVNode]) : null;
        });

        const footerVNode = computed(() => {
            return !pure.value && showFooter.value
                ? createVNode(
                      'div',
                      { class: ['mc-modal__footer', footerClass.value], style: footerStyle.value },
                      slots.footer
                          ? [renderSlot(slots, 'footer')]
                          : [
                                cancelText.value !== null ? createVNode(McButton, { ghost: true, onClick: handleCancel }, { default: () => cancelText.value }) : null,
                                confirmText.value !== null ? createVNode(McButton, { style: { marginLeft: '16px' }, type: 'success', onClick: handleConfirm }, { default: () => confirmText.value }) : null
                            ]
                  )
                : null;
        });

        const modalVNode = computed(() => {
            const mergedProps = mergeProps(
                {
                    ref: modalElRef,
                    class: ['mc-modal', pure.value ? 'mc-modal--pure' : ''],
                    style: { ...cssVars.value, ...modalPosition.value }
                },
                attrs
            );

            return createVNode('div', { class: 'mc-modal-wrapper', style: `transform-origin: ${modalTransformOrigin.value}` }, [
                createVNode('div', mergedProps, [headerVNode.value, createVNode('div', { class: ['mc-modal__body', bodyClass.value], style: bodyStyle.value }, [renderSlot(slots, 'default')]), footerVNode.value])
            ]);
        });

        const modalContainerVNode = computed(() => {
            return createVNode(
                'div',
                {
                    ref: modalContainerElRef,
                    class: 'mc-modal-container'
                },
                [
                    createVNode(
                        Transition,
                        { name: 'mc-modal-mask-fade', appear: true },
                        {
                            default: () => (show.value ? createVNode('div', { class: 'mc-modal-mask' }) : null)
                        }
                    ),
                    createVNode(
                        Transition,
                        { name: modalTransitionName.value, appear: true, onBeforeEnter: callBeforeEnter, onAfterEnter: callAfterEnter, onAfterLeave: callAfterLeave },
                        {
                            default: () => (show.value ? modalVNode.value : null)
                        }
                    )
                ]
            );
        });

        provide(modalInjectionKey, modalElRef);

        expose({
            hide: () => callUpdateShow(false),
            el: modalElRef
        });

        return () => (isMountModal.value ? createVNode(VLazyTeleport, { to: 'body', show: show.value }, { default: () => modalContainerVNode.value }) : null);
    }
});
