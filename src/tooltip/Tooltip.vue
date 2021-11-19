<script lang="ts" setup>
import { toRefs, useSlots, useAttrs, renderSlot, createVNode, createTextVNode, mergeProps } from 'vue';
import { McPopover, PopoverBaseProps } from '../popover';

interface Props extends PopoverBaseProps {
    content?: string;
}
const props = withDefaults(defineProps<Props>(), {
    content: ''
});

const slots = useSlots();
const attrs = useAttrs();
const { content } = toRefs(props);

const Render = () => {
    const popoverMergedProps = mergeProps(
        {
            class: 'mc-tooltip'
        },
        attrs
    );

    return createVNode(McPopover, popoverMergedProps, {
        default: () => renderSlot(slots, 'default'),
        content: () => createTextVNode(content.value)
    });
};
</script>

<template>
    <Render />
</template>

<style lang="scss">
.mc-tooltip {
    background: black;
    color: white;
}
</style>
