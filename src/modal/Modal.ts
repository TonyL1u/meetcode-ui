import { defineComponent, createVNode, toRefs, Teleport, computed, renderSlot, ref, Transition, withDirectives, vShow, toRaw, watch, createTextVNode, CSSProperties, nextTick } from 'vue';
import { onClickOutside, useMouse, useMagicKeys, pausableWatch } from '@vueuse/core';
import { VLazyTeleport } from 'vueuc';
import { createKey } from '../_utils_';
import { modalProps } from './interface';
import { McIcon } from '../icon';
import { McButton } from '../button';
import { modalStack } from './shared';
import { Close as IconClose } from '@vicons/ionicons5';
import * as CSS from 'csstype';

export default defineComponent({
    name: 'Modal',
    props: modalProps,
    emits: ['update:show', 'wrapper-click', 'shortcut-stroke', 'after-enter', 'after-leave'],
    setup(props, { slots, emit, expose }) {
        const {
            show,
            width,
            height,
            appearFromCursor,
            wrapperClosable,
            closeShortcutKey,
            closeOnShortcut,
            closable,
            headerStyle,
            bodyStyle,
            footerStyle,
            title,
            showHeader,
            showFooter,
            cancelText,
            confirmText,
            pure,
            position,
            onBeforeEnter,
            onBeforeLeave
        } = toRefs(props);
        const key = createKey('modal');
        const modalContainerElRef = ref<HTMLElement>();
        const modalElRef = ref<HTMLElement>();
        const modalAppearXRef = ref(0);
        const modalAppearYRef = ref(0);
        const modalTransformOrigin = computed(() => (appearFromCursor.value ? `${modalAppearXRef.value}px ${modalAppearYRef.value}px` : 'center center'));
        const isTopModal = computed(() => modalStack.length > 0 && modalStack[modalStack.length - 1] === key);
        const { x, y } = useMouse();
        const magicKeys = useMagicKeys();

        watch(
            show,
            () => {
                if (show.value) {
                    callUpdateShow(true);
                    modalAppearXRef.value = x.value;
                    modalAppearYRef.value = y.value;
                }
            },
            { immediate: true }
        );

        const { stop, pause, resume } = pausableWatch(magicKeys[closeShortcutKey.value!], async v => {
            // console.log(v, show.value, isTopModal.value, key);
            // if (!v) return;
            // if (v) {
            // const callback = await onBeforeLeave.value?.();
            // if (callback) return;
            // }

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

        onClickOutside(
            modalElRef,
            event => {
                console.log(event);
                if (wrapperClosable.value && isTopModal.value) {
                    callWrapperClick(event);
                    callUpdateShow(false);
                }
            },
            {
                ignore: []
            }
        );

        const callUpdateShow = async (val: boolean) => {
            // const callback = await (val ? onBeforeEnter.value?.() : onBeforeLeave.value?.());
            // if (callback) return;
            if (val) {
                modalStack.push(key);
            } else {
                modalStack.pop();
            }

            emit('update:show', val);
        };

        const callWrapperClick = (e: MouseEvent) => {
            emit('wrapper-click', e);
        };

        const callShortcutStroke = () => {
            emit('shortcut-stroke');
        };

        const callAfterEnter = () => {
            emit('after-enter');
        };

        const callAfterLeave = () => {
            emit('after-leave');
        };

        const handleCancel = () => {
            callUpdateShow(false);
        };

        const handleConfirm = () => {
            callUpdateShow(false);
        };

        const modalPosition = computed<CSSProperties>(() => {
            const { top, right, bottom, left } = position.value || {};

            return {
                marginTop: top ? (typeof top === 'number' ? `${top}px` : top) : 'auto',
                marginRight: right ? (typeof right === 'number' ? `${right}px` : right) : 'auto',
                marginBottom: bottom ? (typeof bottom === 'number' ? `${bottom}px` : bottom) : 'auto',
                marginLeft: left ? (typeof left === 'number' ? `${left}px` : left) : 'auto'
            };
        });

        const cssVars = computed<CSS.Properties>(() => {
            return {
                '--modal-width': typeof width.value === 'number' ? `${width.value}px` : width.value,
                '--modal-height': typeof height.value === 'number' ? `${height.value}px` : height.value
            };
        });

        const modalVNode = computed(() => {
            const titleVNode = createVNode('div', { class: 'mc-modal-title' }, [typeof title.value === 'string' ? createTextVNode(title.value) : title.value?.()]);
            const closeIconVNode = closable.value ? createVNode(McIcon, { color: '#666', size: 20, class: 'mc-modal-close-icon', onClick: () => callUpdateShow(false) }, { default: () => createVNode(IconClose) }) : null;

            return createVNode('div', { class: 'mc-modal-wrapper', style: `transform-origin: ${modalTransformOrigin.value}` }, [
                createVNode('div', { ref: modalElRef, class: 'mc-modal', style: { ...cssVars.value, ...modalPosition.value } }, [
                    !pure.value && showHeader.value ? createVNode('div', { class: 'mc-modal__header', style: headerStyle.value }, [slots.header ? renderSlot(slots, 'header') : titleVNode, closeIconVNode]) : null,
                    createVNode('div', { class: pure.value ? '' : 'mc-modal__body', style: bodyStyle.value }, [renderSlot(slots, 'default')]),
                    !pure.value && showFooter.value
                        ? createVNode(
                              'div',
                              { class: 'mc-modal__footer', style: footerStyle.value },
                              slots.footer
                                  ? [renderSlot(slots, 'footer')]
                                  : [
                                        cancelText.value !== null ? createVNode(McButton, { class: 'mc-modal__footer-button', onClick: handleCancel }, { default: () => cancelText.value }) : null,
                                        confirmText.value !== null ? createVNode(McButton, { class: 'mc-modal__footer-button', onClick: handleConfirm, type: 'success' }, { default: () => confirmText.value }) : null
                                    ]
                          )
                        : null
                ])
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
                        { name: 'mc-modal-scale', appear: true, onAfterEnter: callAfterEnter, onAfterLeave: callAfterLeave },
                        {
                            default: () => (show.value ? modalVNode.value : null)
                        }
                    )
                ]
            );
        });

        expose({
            close: callUpdateShow,
            el: modalElRef
        });

        return () => createVNode(VLazyTeleport, { to: 'body', show: show.value }, { default: () => modalContainerVNode.value });
    }
});
