import { defineComponent, createVNode, toRefs, Teleport, computed, renderSlot, ref, Transition, withDirectives, vShow, toRaw, watch, createTextVNode } from 'vue';
import { onClickOutside, useMouse, useMagicKeys } from '@vueuse/core';
import { VLazyTeleport } from 'vueuc';
import { createKey } from '../_utils_';
import { modalProps } from './interface';
import { McIcon } from '../icon';
import { modalStack } from './shared';
import { Close as IconClose } from '@vicons/ionicons5';
import * as CSS from 'csstype';

export default defineComponent({
    name: 'Modal',
    props: modalProps,
    emits: ['update:show', 'wrapper-click', 'shortcut-stroke', 'after-enter', 'after-leave'],
    setup(props, { slots, emit, expose }) {
        const { show, width, height, appearFromCursor, wrapperClosable, closeShortcutKey, closeOnShortcut, closable, bodyStyle, title, showHeader } = toRefs(props);
        const key = createKey('modal');
        const modalContainerElRef = ref<HTMLElement>();
        const modalElRef = ref<HTMLElement>();
        const modalAppearXRef = ref(0);
        const modalAppearYRef = ref(0);
        const modalTransformOrigin = computed(() => (appearFromCursor.value ? `${modalAppearXRef.value}px ${modalAppearYRef.value}px` : 'center center'));
        const isTopModal = computed(() => modalStack[modalStack.length - 1] === key);
        const { x, y } = useMouse();
        const magicKeys = useMagicKeys();

        watch(
            show,
            () => {
                if (show.value) {
                    modalStack.push(key);
                    callUpdateShow(true);
                    modalAppearXRef.value = x.value;
                    modalAppearYRef.value = y.value;
                } else {
                    modalStack.pop();
                }
            },
            { immediate: true }
        );

        watch(magicKeys[closeShortcutKey.value!], v => {
            if (v && show.value && closeOnShortcut.value && isTopModal.value) {
                callUpdateShow(false);
                callShortcutStroke();
            }
        });

        onClickOutside(modalElRef, event => {
            if (wrapperClosable.value && isTopModal.value) {
                callUpdateShow(false);
                callWrapperClick(event);
            }
        });

        const callUpdateShow = (val: boolean) => {
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
                createVNode('div', { ref: modalElRef, class: 'mc-modal', style: cssVars.value }, [
                    showHeader.value ? createVNode('div', { class: 'mc-modal__header' }, [titleVNode, closeIconVNode]) : null,
                    createVNode('div', { class: 'mc-modal__body', style: bodyStyle.value }, [renderSlot(slots, 'default')]),
                    createVNode('div', { class: 'mc-modal__footer' })
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
