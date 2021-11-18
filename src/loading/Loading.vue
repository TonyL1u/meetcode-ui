<script lang="ts" setup>
import { computed, toRefs, useSlots, renderSlot, createVNode, createTextVNode, CSSProperties } from 'vue';
import Spin from './type/Spin.vue';
import Ripple from './type/Ripple.vue';
import Dots from './type/Dots.vue';
import Bars from './type/Bars.vue';
import Arcs from './type/Arcs.vue';
import './style.scss';

interface Props {
    show?: boolean;
    type?: 'spin' | 'ripple' | 'dots' | 'bars' | 'arcs';
    size?: 'small' | 'medium' | 'large';
    placement?: 'top' | 'right' | 'bottom' | 'left';
    color?: string;
    maskStyle?: CSSProperties;
    description?: string;
}
const props = withDefaults(defineProps<Props>(), {
    show: true,
    type: 'spin',
    size: 'medium',
    placement: 'top',
    color: '#10B981'
});

const slots = useSlots();
const { show, type, size, placement, color, maskStyle, description } = toRefs(props);
const placementMap = {
    top: 'column',
    right: 'row-reverse',
    bottom: 'column-reverse',
    left: 'row'
};

const spinWidthStroke = computed(() => {
    switch (size.value) {
        case 'small':
            return { width: '28px', strokeWidth: 20 };
        case 'medium':
            return { width: '34px', strokeWidth: 18 };
        case 'large':
            return { width: '40px', strokeWidth: 16 };
        default:
            return { width: '34px', strokeWidth: 18 };
    }
});
const rippleWidth = computed(() => {
    switch (size.value) {
        case 'small':
            return 28;
        case 'medium':
            return 34;
        case 'large':
            return 40;
        default:
            return 34;
    }
});
const dotsSize = computed(() => {
    switch (size.value) {
        case 'small':
            return { loadingHeight: 21, dotWidth: 6 };
        case 'medium':
            return { loadingHeight: 28, dotWidth: 8 };
        case 'large':
            return { loadingHeight: 42, dotWidth: 12 };
        default:
            return { loadingHeight: 28, dotWidth: 8 };
    }
});
const barsWidth = computed(() => {
    switch (size.value) {
        case 'small':
            return 24;
        case 'medium':
            return 30;
        case 'large':
            return 36;
        default:
            return 30;
    }
});
const arcsSize = computed(() => {
    switch (size.value) {
        case 'small':
            return 28;
        case 'medium':
            return 34;
        case 'large':
            return 40;
        default:
            return 34;
    }
});

const LoadingVNode = computed(() => {
    switch (type.value) {
        case 'spin':
            const { width, strokeWidth } = spinWidthStroke.value;
            return createVNode(Spin, { stroke: color.value, strokeWidth, style: { width, height: width } });
        case 'ripple':
            return createVNode(Ripple, { width: rippleWidth.value, color: color.value });
        case 'dots':
            const { dotWidth, loadingHeight } = dotsSize.value;
            return createVNode(Dots, { dotWidth, loadingHeight, color: color.value });
        case 'bars':
            return createVNode(Bars, { loadingWidth: barsWidth.value, color: color.value });
        case 'arcs':
            return createVNode(Arcs, { arcSize: arcsSize.value, color: color.value });
        default:
            return null;
    }
});

const Render = () => {
    const hasDefaultSlot = !!slots.default;
    const hasDescriptionSlot = !!slots.description;
    const needDescriptionBlock = hasDescriptionSlot || !!description?.value;
    const descriptionVNode = hasDescriptionSlot ? renderSlot(slots, 'description') : createTextVNode(description?.value);

    return createVNode(
        'div',
        {
            class: 'mc-loading'
        },
        [
            createVNode('div', { class: 'mc-loading__content' }, [renderSlot(slots, 'default')]),
            show.value
                ? createVNode('div', { class: ['mc-loading__body', { 'mc-loading-mask': hasDefaultSlot }], style: { 'flex-direction': placementMap[placement.value], ...maskStyle?.value } }, [
                      LoadingVNode.value,
                      needDescriptionBlock ? createVNode('div', { class: 'mc-loading--description', style: { [`margin-${placement.value}`]: '8px', color: color.value } }, [descriptionVNode]) : null
                  ])
                : null
        ]
    );
};
</script>

<template>
    <Render />
</template>
