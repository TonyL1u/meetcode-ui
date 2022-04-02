import { ref, createVNode, Text, cloneVNode, computed, withDirectives, vShow, watch, toRefs, nextTick, Transition, mergeProps, defineComponent, onMounted, provide, inject } from 'vue';
import { getSlotFirstVNode, propsMergeSlots, useThemeRegister } from '../_utils_';
import { VBinder, VTarget, VFollower } from 'vueuc';
import { useElementBounding, useMouseInElement, useThrottleFn, pausableWatch, onClickOutside } from '@vueuse/core';
import { PopoverTriggerBorder, PopoverProps, popoverProps, popoverEmits, popoverInjectionKey } from './interface';
import { modalInjectionKey } from '../modal/interface';
import { mainCssr, lightCssr, darkCssr } from './styles';

export default defineComponent({
    name: 'Popover',
    inheritAttrs: false,
    props: popoverProps,
    emits: popoverEmits,
    setup(props, { slots, attrs, expose, emit }) {
        // theme register
        onMounted(() => {
            useThemeRegister({
                key: 'McPopover',
                main: mainCssr,
                light: lightCssr,
                dark: darkCssr
            });
        });

        const { trigger, placement, destroyWhenHide, zIndex, show, disabled, withArrow, showDelay, hideDelay, offset, wrapBoundary, matchTrigger, autoSync, title, followMode, x, y } = toRefs(props);
        const showRef = trigger.value === 'manual' ? show : ref(!!props.show);
        const followerRef = ref(null);
        const followX = ref(0);
        const followY = ref(0);
        const mouseInFollowTrigger = ref(false);
        const contentShowTimer = ref();
        const contentHideTimer = ref();
        const contentElRef = ref<HTMLElement | null>(null);
        const mergedX = computed(() => {
            switch (trigger.value) {
                case 'manual':
                    return x.value;
                case 'follow':
                    return followX.value;
                default:
                    return;
            }
        });
        const mergedY = computed(() => {
            switch (trigger.value) {
                case 'manual':
                    return y.value;
                case 'follow':
                    return followY.value;
                default:
                    return;
            }
        });
        const emitThrottled = computed(() => {
            return trigger.value === 'follow' && followMode.value === 'move';
        });
        const teleportDisabled = computed(() => {
            const popover = inject(popoverInjectionKey, null);
            const modal = inject(modalInjectionKey, null);

            return !!popover || !!modal;
        });
        onClickOutside(contentElRef, (e: MouseEvent) => {
            if (trigger.value === 'click' && !triggerVNode.value?.el?.contains(e.target)) {
                handleContentHide();
            }
        });

        // call emits
        const callShow = () => {
            emit('show', true);
        };
        const callHide = () => {
            emit('hide', false);
        };
        const callUpdateShow = () => {
            emit('update:show', showRef.value);
        };
        const callBorderReached = (flag: boolean, dirs: Array<PopoverTriggerBorder>) => {
            emit('border-reached', flag, dirs);
        };
        const throttleCallShow = useThrottleFn(callShow, 100, false);
        const throttleCallHide = useThrottleFn(callHide, 100, false);
        const throttleCallUpdateShow = useThrottleFn(callUpdateShow, 100, false);

        // visible control
        const clearShowTimer = () => {
            window.clearTimeout(contentShowTimer.value);
            contentShowTimer.value = null;
        };
        const clearHideTimer = () => {
            window.clearTimeout(contentHideTimer.value);
            contentHideTimer.value = null;
        };
        const handleContentShow = () => {
            clearHideTimer();
            if (showRef.value) return;
            contentShowTimer.value = window.setTimeout(() => {
                showRef.value = true;
                emitThrottled.value ? throttleCallShow() : callShow();
                emitThrottled.value ? throttleCallUpdateShow() : callUpdateShow();
            }, showDelay.value);
        };
        const handleContentHide = () => {
            clearShowTimer();
            if (!showRef.value) return;
            contentHideTimer.value = window.setTimeout(() => {
                showRef.value = false;
                emitThrottled.value ? throttleCallHide() : callHide();
                emitThrottled.value ? throttleCallUpdateShow() : callUpdateShow();
            }, hideDelay.value);
        };
        const syncPosition = () => {
            var _a;
            // @ts-ignore
            (_a = followerRef.value) === null || _a === void 0 ? void 0 : _a.syncPosition();
        };

        // hover control
        const contentHoverControl = computed(() => {
            if (trigger.value !== 'hover') return {};

            return {
                onMouseenter: handleContentShow,
                onMouseleave(e: MouseEvent) {
                    console.log(e);
                    e.stopPropagation();
                    e.stopImmediatePropagation();
                    handleContentHide();
                }
            };
        });

        // list of events
        const triggerEvent = computed(() => {
            if (trigger.value === 'hover') {
                return {
                    onMouseenter: handleContentShow,
                    onMouseleave: handleContentHide
                };
            } else if (trigger.value === 'click') {
                return {
                    onClick: () => {
                        if (showRef.value) {
                            handleContentHide();
                        } else {
                            handleContentShow();
                        }
                    }
                };
            } else if (trigger.value === 'follow') {
                return {
                    onMouseenter: () => {
                        mouseInFollowTrigger.value = true;
                    },
                    onMouseleave: () => {
                        mouseInFollowTrigger.value = false;
                    }
                };
            }

            return {};
        });

        // render vnodes
        const triggerVNode = computed(() => {
            const firstDefaultVNode = getSlotFirstVNode(slots.default);
            if (!firstDefaultVNode) return null;
            const clonedVNode = cloneVNode(firstDefaultVNode);
            const tempVNode = clonedVNode.type === Text ? createVNode('span', null, [clonedVNode]) : clonedVNode;

            if (disabled.value) return tempVNode;

            // event bind
            if (!tempVNode.props) {
                tempVNode.props = {};
            } else {
                tempVNode.props = { ...{}, ...tempVNode.props };
            }

            for (const [name, handler] of Object.entries(triggerEvent.value)) {
                const originalHandler = tempVNode.props[name];

                tempVNode.props[name] = originalHandler
                    ? (...args: Array<unknown>) => {
                          originalHandler(...args);
                          handler(...args);
                      }
                    : handler;
            }

            return tempVNode;
        });
        const contentVNode = computed(() => {
            if (disabled.value) return null;

            const { top = '', right = '', bottom = '', left = '' } = offset?.value ?? {};
            const mergedProps = mergeProps(attrs, {
                ref: contentElRef,
                class: ['mc-popover', { 'mc-popover--with-arrow': withArrow.value }],
                style: {
                    '--popover-offset-top': top,
                    '--popover-offset-right': right,
                    '--popover-offset-bottom': bottom,
                    '--popover-offset-left': left
                },
                ...contentHoverControl.value
            });
            const tempVNode = createVNode('div', mergedProps, [
                title.value ? createVNode('div', { class: 'mc-popover__title' }, [title.value]) : null,
                propsMergeSlots<PopoverProps, 'content'>(props, slots, 'content'),
                withArrow.value ? createVNode('div', { class: 'mc-popover__arrow' }) : null
            ]);

            if (destroyWhenHide.value) {
                if (!showRef.value) return null;
                return tempVNode;
            } else {
                return withDirectives(tempVNode, [[vShow, showRef.value]]);
            }
        });
        const triggerEl = computed(() => {
            return (triggerVNode.value?.el as HTMLElement) || null;
        });

        provide(popoverInjectionKey, contentElRef);

        void nextTick(() => {
            // const { top, right, bottom, left, width, height } = useElementBounding(binderElRef);
            if (disabled.value || !triggerEl.value) return;

            // auto async popover position
            if (autoSync.value) {
                const { top, right, bottom, left } = useElementBounding(triggerEl.value);
                watch([top, right, bottom, left], () => {
                    syncPosition();
                });
            }

            // follow control
            if (trigger.value === 'follow') {
                const { x, y, isOutside, elementHeight, elementWidth, elementX, elementY } = useMouseInElement(triggerEl.value);
                const isFirstEnter = ref(true);
                const enterDelay = () => new Promise<void>(resolve => setTimeout(resolve, 2000));

                const clickCallEvent = (evt: MouseEvent) => {
                    if (showRef.value) {
                        handleContentHide();
                    } else {
                        const { x, y } = evt;
                        followX.value = x;
                        followY.value = y;
                        handleContentShow();
                    }
                };

                const moveCallEvent = () => {
                    if (!isOutside.value && mouseInFollowTrigger.value) {
                        followX.value = x.value;
                        followY.value = y.value;
                        handleContentShow();

                        // No detection for the first entry
                        if (isFirstEnter.value) {
                            isFirstEnter.value = false;
                            return;
                        }

                        void nextTick(() => {
                            if (wrapBoundary.value && contentElRef.value) {
                                let isReachBorder = false;
                                let reachedDir: Array<PopoverTriggerBorder> = [];
                                const contentRect = contentElRef.value.getBoundingClientRect();
                                const { x: contentX, y: contentY, width, height } = contentRect;
                                const cursorOffsetX = contentX - x.value;
                                const cursorOffsetY = contentY - y.value;

                                // top boundary detection
                                if (cursorOffsetY < 0 && Math.abs(cursorOffsetY) > elementY.value) {
                                    followY.value += Math.abs(cursorOffsetY);
                                    isReachBorder = true;
                                    reachedDir.push('top');
                                }

                                // right boundary detection
                                if (elementX.value + width + cursorOffsetX >= elementWidth.value) {
                                    followX.value -= width + cursorOffsetX;
                                    isReachBorder = true;
                                    reachedDir.push('right');
                                }

                                // bottom boundary detection
                                if (elementY.value + height + cursorOffsetY >= elementHeight.value) {
                                    followY.value -= height + cursorOffsetY;
                                    isReachBorder = true;
                                    reachedDir.push('bottom');
                                }

                                // left boundary detection
                                if (cursorOffsetX < 0 && Math.abs(cursorOffsetX) > elementX.value) {
                                    followX.value += Math.abs(cursorOffsetX);
                                    isReachBorder = true;
                                    reachedDir.push('left');
                                }

                                callBorderReached(isReachBorder, reachedDir);
                            }
                        });
                    } else {
                        handleContentHide();
                        callBorderReached(false, []);
                        isFirstEnter.value = true;
                    }
                };

                const { pause, resume } = pausableWatch([x, y, isOutside], moveCallEvent);

                watch(
                    followMode,
                    () => {
                        nextTick(() => {
                            if (followMode.value === 'move') {
                                resume();
                                triggerEl.value.removeEventListener('click', clickCallEvent);
                            } else {
                                pause();
                                triggerEl.value.addEventListener('click', clickCallEvent);
                            }
                        });
                    },
                    {
                        immediate: true
                    }
                );
            }
        });

        expose({
            syncPosition,
            show: handleContentShow,
            hide: handleContentHide,
            el: contentElRef
        });

        return () =>
            createVNode(VBinder, null, {
                default: () => {
                    return [
                        createVNode(VTarget, null, { default: () => triggerVNode.value }),
                        createVNode(
                            VFollower,
                            {
                                ref: followerRef,
                                x: mergedX.value,
                                y: mergedY.value,
                                zIndex: zIndex?.value,
                                show: showRef.value,
                                enabled: showRef.value,
                                placement: placement.value,
                                width: matchTrigger.value ? 'target' : undefined,
                                teleportDisabled: teleportDisabled.value
                            },
                            {
                                default: () => {
                                    return createVNode(
                                        Transition,
                                        {
                                            name: 'mc-popover-fade',
                                            appear: true
                                        },
                                        {
                                            default: () => contentVNode.value
                                        }
                                    );
                                }
                            }
                        )
                    ];
                }
            });
    }
});
