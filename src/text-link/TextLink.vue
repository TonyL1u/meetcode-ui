<script lang="ts">
export default {
    name: 'TextLink',
    inheritAttrs: false
};
</script>

<script lang="ts" setup>
import { computed, ref, toRefs, onMounted, useSlots, useAttrs, renderSlot, createVNode, mergeProps } from 'vue';
import { getSlotFirstVNode } from '../_utils_';
import * as CSS from 'csstype';

interface Props {
    type?: 'primary' | 'success' | 'warning' | 'danger' | 'info';
    to?: string;
    underline?: boolean;
    block?: boolean;
    trigger?: 'always' | 'hover';
    color?: string;
    hoverColor?: string;
    plain?: boolean;
}
const props = withDefaults(defineProps<Props>(), {
    type: 'success',
    to: '',
    underline: false,
    block: false,
    trigger: 'always',
    plain: false
});

const slots = useSlots();
const attrs = useAttrs();
const { type, to, underline, trigger, color, hoverColor, block, plain } = toRefs(props);
const typeMap: any = {
    primary: {
        color: '#3B82F6',
        hoverColor: '#2563EB'
    },
    success: {
        color: '#10B981',
        hoverColor: '#059669'
    },
    warning: {
        color: '#F59E0B',
        hoverColor: '#D97706'
    },
    danger: {
        color: '#EF4444',
        hoverColor: '#DC2626'
    },
    info: {
        color: '#6B7280',
        hoverColor: '#4B5563'
    }
};

const textColor: string = color?.value ?? typeMap[type.value].color;
const textHoverColor: string = hoverColor?.value ?? typeMap[type.value].hoverColor;
const showUnderline = computed(() => {
    if (!underline.value) return '';

    switch (trigger.value) {
        case 'always':
            return 'underline';
        case 'hover':
            return 'underline-hover';
        default:
            return '';
    }
});
const cssVars = computed<CSS.Properties>(() => {
    return {
        '--default-color': textColor,
        '--hover-color': textHoverColor
    };
});

const Render = () => {
    const textContent = getSlotFirstVNode(slots.default)?.children ?? '';
    const isEmail = typeof textContent === 'string' && /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/.test(textContent);

    const mergedProps = mergeProps(
        {
            class: ['mc-text-link', { 'mc-text-link--block': block.value }, showUnderline.value],
            style: cssVars.value,
            href: to.value || (!plain.value && isEmail ? `mailto:${textContent}` : '')
        },
        attrs
    );

    return createVNode('a', mergedProps, [renderSlot(slots, 'default')]);
};
</script>

<template>
    <Render />
</template>

<style lang="scss">
.mc-text-link {
    color: var(--default-color);
    cursor: pointer;
    text-decoration: none;

    &:hover {
        color: var(--hover-color);
    }

    &--block {
        display: block;
        width: max-content;
    }

    &.underline {
        text-decoration: underline;
    }

    &.underline-hover:hover {
        text-decoration: underline;
    }
}
</style>
