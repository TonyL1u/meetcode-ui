import { ref, createVNode, Text, cloneVNode, computed, renderSlot, withDirectives, vShow, watch, toRefs, nextTick, Transition, mergeProps, defineComponent } from 'vue';
import { getSlotFirstVNode } from '../_utils_';
import { VBinder, VTarget, VFollower } from 'vueuc';
import { useElementBounding, useMouseInElement } from '@vueuse/core';
import { PopoverTriggerBorder, popoverProps } from './interface';

export default defineComponent({
    name: 'Popover',
    inheritAttrs: false,
    props: popoverProps,
    emits: ['show', 'hide', 'update:show', 'border:reached'],
    setup(props, { slots, attrs, expose, emit }) {
        const { trigger, placement, destroyWhenHide, zIndex, show, disabled, withArrow, showDelay, hideDelay, offset, wrapBoundary, matchTrigger, autoSync, title } = toRefs(props);
        const showRef = trigger.value === 'manual' ? show : ref(!!props.show);
        const followerRef = ref(null);
        const followX = ref(0);
        const followY = ref(0);
        const mouseInFollowTrigger = ref(false);
        const contentShowTimer = ref();
        const contentHideTimer = ref();

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
            emit('border:reached', flag, dirs);
        };

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
                callShow();
                callUpdateShow();
                trigger.value === 'click' && window.addEventListener('click', handleClickInside);
            }, showDelay.value);
        };
        const handleContentHide = () => {
            clearShowTimer();
            if (!showRef.value) return;
            contentHideTimer.value = window.setTimeout(() => {
                showRef.value = false;
                callHide();
                callUpdateShow();
                trigger.value === 'click' && window.removeEventListener('click', handleClickInside);
            }, hideDelay.value);
        };
        const handleClickInside = (e: MouseEvent) => {
            const isClickContent = contentVNode.value?.el?.contains(e.target);
            const isClickTrigger = triggerVNode.value?.el?.contains(e.target);
            if (!isClickContent && !isClickTrigger) {
                handleContentHide();
            }
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
                onMouseleave: handleContentHide
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
            } else {
                return {};
            }
        });

        // nodes
        const triggerVNode = computed(() => {
            const firstDefaultVNode = getSlotFirstVNode(slots.default);
            if (!firstDefaultVNode) return null;
            const clonedVNode = cloneVNode(firstDefaultVNode);
            const tempVNode = clonedVNode.type === Text ? createVNode('span', null, [clonedVNode]) : clonedVNode;

            if (disabled.value) return tempVNode;

            // 事件绑定
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
                title?.value ? createVNode('div', { class: 'mc-popover__title' }, [title.value]) : null,
                renderSlot(slots, 'content'),
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
            return <HTMLElement>triggerVNode.value?.el || null;
        });
        const contentEl = computed(() => {
            return <HTMLElement>contentVNode.value?.el || null;
        });

        void nextTick(() => {
            if (disabled.value || !triggerEl.value) return;

            // 自动同步位置
            if (autoSync.value) {
                const { top, right, bottom, left } = useElementBounding(triggerEl.value);
                watch([top, right, bottom, left], () => {
                    syncPosition();
                });
            }

            // follow control
            if (trigger.value === 'follow') {
                const { x, y, isOutside, elementHeight, elementWidth, elementX, elementY } = useMouseInElement(triggerEl.value);
                // 首次进入不做检测
                let isFirstEnter = true;

                watch([x, y, isOutside], () => {
                    showRef.value = !isOutside.value && mouseInFollowTrigger.value;
                    callUpdateShow();

                    if (showRef.value) {
                        callShow();
                        followX.value = x.value;
                        followY.value = y.value;

                        if (isFirstEnter) {
                            isFirstEnter = false;
                            return;
                        }
                        void nextTick(() => {
                            if (wrapBoundary.value) {
                                let isReachBorder = false;
                                let reachedDir: Array<PopoverTriggerBorder> = [];
                                const contentRect = contentEl.value.getBoundingClientRect();
                                const { x: contentX, y: contentY, width, height } = contentRect;
                                const cursorOffsetX = contentX - x.value;
                                const cursorOffsetY = contentY - y.value;

                                // 上边界检测
                                if (cursorOffsetY < 0 && Math.abs(cursorOffsetY) > elementY.value) {
                                    followY.value += Math.abs(cursorOffsetY);
                                    isReachBorder = true;
                                    reachedDir.push('top');
                                }

                                // 右边界检测
                                if (elementX.value + width + cursorOffsetX >= elementWidth.value) {
                                    followX.value -= width + cursorOffsetX;
                                    isReachBorder = true;
                                    reachedDir.push('right');
                                }

                                // 下边界检测
                                if (elementY.value + height + cursorOffsetY >= elementHeight.value) {
                                    followY.value -= height + cursorOffsetY;
                                    isReachBorder = true;
                                    reachedDir.push('bottom');
                                }

                                // 左边界检测
                                if (cursorOffsetX < 0 && Math.abs(cursorOffsetX) > elementX.value) {
                                    followX.value += Math.abs(cursorOffsetX);
                                    isReachBorder = true;
                                    reachedDir.push('left');
                                }

                                callBorderReached(isReachBorder, reachedDir);
                            }
                        });
                    } else {
                        callHide();
                        callBorderReached(false, []);
                    }
                });
            }
        });

        expose({
            syncPosition,
            show: handleContentShow,
            hide: handleContentHide,
            el: contentEl
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
                                x: trigger.value === 'follow' ? followX.value : undefined,
                                y: trigger.value === 'follow' ? followY.value : undefined,
                                zIndex: zIndex?.value,
                                show: showRef.value,
                                enabled: showRef.value,
                                placement: placement.value,
                                width: matchTrigger.value ? 'target' : undefined
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
