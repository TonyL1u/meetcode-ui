<template>
    <VBinder>
        <TriggerRenderVNode />
        <teleport to="body">
            <ContentRenderVNode />
        </teleport>
    </VBinder>
</template>

<script lang="ts">
export default {
    inheritAttrs: false
};
</script>

<script lang="ts" setup>
import { useSlots, useAttrs, ref, createVNode, cloneVNode, computed, renderSlot, withDirectives, vShow, watch, toRefs, nextTick, Transition, mergeProps } from 'vue';
import { getSlotFirstVNode } from '../../_utils_';
import { VBinder, VTarget, VFollower } from 'vueuc';
import { useElementBounding, useMouseInElement } from '@vueuse/core';

type ReachedDir = 'top' | 'right' | 'bottom' | 'left';
type PopoverTrigger = 'hover' | 'click' | 'manual' | 'follow';
type PopoverPlacement = 'top' | 'bottom' | 'left' | 'right' | 'top-start' | 'top-end' | 'left-start' | 'left-end' | 'right-start' | 'right-end' | 'bottom-start' | 'bottom-end';
interface Props {
    trigger?: PopoverTrigger;
    placement?: PopoverPlacement;
    destoryWhenHide?: boolean;
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
const props = withDefaults(defineProps<Props>(), {
    trigger: 'hover',
    placement: 'top',
    destoryWhenHide: true,
    show: false,
    disabled: false,
    withArrow: true,
    showDelay: 100,
    hideDelay: 100,
    offset: {},
    wrapBoundary: false,
    matchTrigger: false,
    autoSync: true
});
const emit = defineEmits<{
    (e: 'show', value: true): void;
    (e: 'hide', value: false): void;
    (e: 'update:show', value: boolean): void;
    (e: 'border:reached', value: boolean, dirs: Array<ReachedDir>): void;
}>();

const slots = useSlots();
const attrs = useAttrs();
const showRef = props.trigger === 'manual' ? toRefs(props).show : ref(!!props.show);
const followerRef = ref(null);
const followX = ref(0);
const followY = ref(0);
const contentShowTimer = ref();
const contentHideTimer = ref();

// 事件回调
const callShow = () => {
    emit('show', true);
};
const callHide = () => {
    emit('hide', false);
};
const callUpdateShow = () => {
    emit('update:show', showRef.value);
};
const callBorderReached = (flag: boolean, dirs: Array<ReachedDir>) => {
    emit('border:reached', flag, dirs);
};

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
        callShow();
        callUpdateShow();
        props.trigger === 'click' && window.addEventListener('click', handleClickInside);
    }, props.showDelay);
};
const handleContentHide = () => {
    clearShowTimer();
    if (!showRef.value) return;
    contentHideTimer.value = window.setTimeout(() => {
        showRef.value = false;
        callHide();
        callUpdateShow();
        props.trigger === 'click' && window.removeEventListener('click', handleClickInside);
    }, props.hideDelay);
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

// 悬浮控制
const contentHoverControl = computed(() => {
    if (props.trigger !== 'hover') return {};

    return {
        onMouseenter: handleContentShow,
        onMouseleave: handleContentHide
    };
});

// 事件列表
const triggerEvent = computed(() => {
    if (props.trigger === 'hover') {
        return {
            onMouseenter: handleContentShow,
            onMouseleave: handleContentHide
        };
    } else if (props.trigger === 'click') {
        return {
            onClick: () => {
                if (showRef.value) {
                    handleContentHide();
                } else {
                    handleContentShow();
                }
            }
        };
    } else {
        return {};
    }
});

// 节点
const triggerVNode = computed(() => {
    const firstDefaultVNode = getSlotFirstVNode(slots.default);
    if (!firstDefaultVNode) return null;
    const tempVNode = cloneVNode(firstDefaultVNode);

    if (props.disabled) return tempVNode;

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
});
const contentVNode = computed(() => {
    if (props.disabled) return null;

    const { top = '', right = '', bottom = '', left = '' } = props.offset;
    const mergedProps = mergeProps(
        {
            class: ['mc-popover', { 'mc-popover--with-arrow': props.withArrow }],
            style: {
                '--popover-offset-top': top,
                '--popover-offset-right': right,
                '--popover-offset-bottom': bottom,
                '--popover-offset-left': left
            },
            ...contentHoverControl.value
        },
        attrs
    );
    const tempVNode = createVNode('div', mergedProps, [props.title ? createVNode('div', { class: 'mc-popover__title' }, [props.title]) : null, renderSlot(slots, 'content'), props.withArrow ? createVNode('div', { class: 'mc-popover__arrow' }) : null]);

    if (props.destoryWhenHide) {
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

// 渲染
const TriggerRenderVNode = () => {
    return createVNode(VTarget, null, {
        default: () => triggerVNode.value
    });
};
const ContentRenderVNode = () => {
    return createVNode(
        VFollower,
        {
            ref: followerRef,
            x: props.trigger === 'follow' ? followX.value : undefined,
            y: props.trigger === 'follow' ? followY.value : undefined,
            zIndex: props.zIndex,
            show: showRef.value,
            enabled: showRef.value,
            placement: props.placement,
            teleportDisabled: true,
            width: props.matchTrigger ? 'target' : undefined
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
    );
};

void nextTick(() => {
    if (props.disabled || !triggerEl.value) return;

    // 自动同步位置
    if (props.autoSync) {
        const { top, right, bottom, left } = useElementBounding(triggerEl.value);
        watch([top, right, bottom, left], () => {
            syncPosition();
        });
    }

    // follow 控制
    if (props.trigger === 'follow') {
        const { x, y, isOutside, elementHeight, elementWidth, elementX, elementY } = useMouseInElement(triggerEl.value);
        // 首次进入不做检测
        let isFirstEnter = true;

        watch([x, y, isOutside], () => {
            showRef.value = !isOutside.value;
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
                    if (props.wrapBoundary) {
                        let isReachBorder = false;
                        let reachedDir: Array<ReachedDir> = [];
                        const contentRect = contentEl.value.getBoundingClientRect();
                        const { x: contentX, y: contentY, width, height } = contentRect;
                        const cursorOffsetX = contentX - x.value;
                        const cursotOffsetY = contentY - y.value;

                        // 上边界检测
                        if (cursotOffsetY < 0 && Math.abs(cursotOffsetY) > elementY.value) {
                            followY.value += Math.abs(cursotOffsetY);
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
                        if (elementY.value + height + cursotOffsetY >= elementHeight.value) {
                            followY.value -= height + cursotOffsetY;
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

defineExpose({
    syncPosition,
    show: handleContentShow,
    hide: handleContentHide,
    el: contentEl
});
</script>

<style lang="scss">
[v-placement^='top'] > .mc-popover {
    margin-bottom: 8px;
    &.mc-popover--with-arrow {
        margin-bottom: 10px;
    }

    & > .mc-popover__arrow {
        transform: translateX(-50%) rotate(45deg);
        bottom: -4px;
    }
}

[v-placement^='right'] > .mc-popover {
    margin-left: 8px;
    &.mc-popover--with-arrow {
        margin-left: 10px;
    }

    & > .mc-popover__arrow {
        transform: translateY(-50%) rotate(45deg);
        left: -4px;
    }
}

[v-placement^='bottom'] > .mc-popover {
    margin-top: 8px;
    &.mc-popover--with-arrow {
        margin-top: 10px;
    }

    & > .mc-popover__arrow {
        transform: translateX(-50%) rotate(45deg);
        top: -4px;
    }
}

[v-placement^='left'] > .mc-popover {
    margin-right: 8px;
    &.mc-popover--with-arrow {
        margin-right: 10px;
    }

    & > .mc-popover__arrow {
        transform: translateY(-50%) rotate(45deg);
        right: -4px;
    }
}

[v-placement='top-start'],
[v-placement='bottom-start'] {
    & > .mc-popover > .mc-popover__arrow {
        left: 15%;
    }
}

[v-placement='top'],
[v-placement='bottom'] {
    & > .mc-popover > .mc-popover__arrow {
        left: 50%;
    }
}

[v-placement='top-end'],
[v-placement='bottom-end'] {
    & > .mc-popover > .mc-popover__arrow {
        left: 85%;
    }
}

[v-placement='right-start'],
[v-placement='left-start'] {
    & > .mc-popover > .mc-popover__arrow {
        top: 15%;
    }
}

[v-placement='right'],
[v-placement='left'] {
    & > .mc-popover > .mc-popover__arrow {
        top: 50%;
    }
}

[v-placement='right-end'],
[v-placement='left-end'] {
    & > .mc-popover > .mc-popover__arrow {
        top: 85%;
    }
}

.mc-popover {
    @apply mc-px-3 mc-py-2 mc-rounded-sm;
    background: #fff;
    position: relative;
    top: var(--popover-offset-top);
    right: var(--popover-offset-right);
    bottom: var(--popover-offset-bottom);
    left: var(--popover-offset-left);
    box-shadow: 0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 9px 28px 8px rgba(0, 0, 0, 0.05);

    &__title {
        @apply mc-font-bold mc-mb-1 mc-text-base;
    }

    &__arrow {
        @apply mc-w-2 mc-h-2 mc-inline-block mc-absolute;
        transform-origin: 50% 50%;
        background: inherit;
    }
}

.mc-popover-fade-enter-active,
.mc-popover-fade-leave-active {
    transition: opacity 0.1s ease;
}

.mc-popover-fade-enter-from,
.mc-popover-fade-leave-to {
    opacity: 0;
}
</style>
