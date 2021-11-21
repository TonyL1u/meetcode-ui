import { useSlots, useAttrs, ref, createVNode, Text, cloneVNode, computed, renderSlot, withDirectives, vShow, watch, toRefs, nextTick, Transition, mergeProps, FunctionalComponent, defineComponent } from 'vue';
import { getSlotFirstVNode } from '../_utils_';
import { VBinder, VTarget, VFollower } from 'vueuc';
import { useElementBounding, useMouseInElement } from '@vueuse/core';
import type { PopoverTriggerBorder, PopoverTrigger, PopoverPlacement } from './interface';

interface Props {
    trigger?: PopoverTrigger;
    placement?: PopoverPlacement;
    destroyWhenHide?: boolean;
    zIndex?: number;
    show?: boolean;
    disabled?: boolean;
    withArrow?: boolean;
    showDelay?: number;
    hideDelay?: number;
    offset?: any;
    wrapBoundary?: boolean;
    matchTrigger?: boolean;
    autoSync?: boolean;
    title?: string;
}

type Emit = {
    show: (value: true) => void;
    hide: (value: false) => void;
    'update:show': (value: boolean) => void;
    'border:reached': (value: boolean, dirs: Array<PopoverTriggerBorder>) => void;
};
export default defineComponent({
    inheritAttrs: false,
    props: ['trigger', 'placement', 'destroyWhenHide', 'zIndex', 'show', 'disabled', 'withArrow', 'showDelay', 'hideDelay', 'offset', 'wrapBoundary', 'matchTrigger', 'autoSync', 'title'],
    setup(props, { slots, attrs }) {
        const { trigger, placement, destroyWhenHide, zIndex, show, disabled, withArrow, showDelay, hideDelay, offset, wrapBoundary, matchTrigger, autoSync, title } = toRefs(props);
        const showRef = trigger.value === 'manual' ? show : ref(!!props.show);
        const followerRef = ref(null);
        const followX = ref(0);
        const followY = ref(0);
        const mouseInFollowTrigger = ref(false);
        const contentShowTimer = ref();
        const contentHideTimer = ref();

        // 事件回调
        // const callShow = () => {
        //     emit('show', true);
        // };
        // const callHide = () => {
        //     emit('hide', false);
        // };
        // const callUpdateShow = () => {
        //     emit('update:show', showRef.value);
        // };
        // const callBorderReached = (flag: boolean, dirs: Array<PopoverTriggerBorder>) => {
        //     emit('border:reached', flag, dirs);
        // };

        // 显示控制
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
                // callShow();
                // callUpdateShow();
                // trigger.value === 'click' && window.addEventListener('click', handleClickInside);
            }, showDelay.value);
        };
        const handleContentHide = () => {
            clearShowTimer();
            if (!showRef.value) return;
            contentHideTimer.value = window.setTimeout(() => {
                showRef.value = false;
                // callHide();
                // callUpdateShow();
                // trigger.value === 'click' && window.removeEventListener('click', handleClickInside);
            }, hideDelay.value);
        };
        // const handleClickInside = (e: MouseEvent) => {
        //     const isClickContent = contentVNode.value?.el?.contains(e.target);
        //     const isClickTrigger = triggerVNode.value?.el?.contains(e.target);
        //     if (!isClickContent && !isClickTrigger) {
        //         handleContentHide();
        //     }
        // };
        const syncPosition = () => {
            var _a;
            // @ts-ignore
            (_a = followerRef.value) === null || _a === void 0 ? void 0 : _a.syncPosition();
        };

        // 悬浮控制
        const contentHoverControl = computed(() => {
            if (trigger.value !== 'hover') return {};

            return {
                onMouseenter: handleContentShow,
                onMouseleave: handleContentHide
            };
        });

        // 事件列表
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

        // 渲染
        return ctx => {
            console.log(ctx);
            const triggerVNode = () => {
                const firstDefaultVNode = getSlotFirstVNode(slots.default);
                if (!firstDefaultVNode) return null;
                const tempVNode = cloneVNode(firstDefaultVNode.type === Text ? createVNode('span', null, [firstDefaultVNode]) : firstDefaultVNode);
                console.log(tempVNode);

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
                        ? (...args: Array<any>) => {
                              originalHandler(...args);
                              handler(...args);
                          }
                        : handler;
                }

                return tempVNode;
            };

            return createVNode(VBinder, null, {
                default: () => {
                    return [
                        createVNode(VTarget, null, { default: triggerVNode }),
                        createVNode(
                            VFollower,
                            {
                                ref: followerRef,
                                x: trigger.value === 'follow' ? followX.value : undefined,
                                y: trigger.value === 'follow' ? followY.value : undefined,
                                zIndex: zIndex?.value,
                                show: true,
                                enabled: true,
                                placement: placement.value,
                                teleportDisabled: true,
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
                                            default: () => 123
                                        }
                                    );
                                }
                            }
                        )
                    ];
                }
            });
        };
    }
});
