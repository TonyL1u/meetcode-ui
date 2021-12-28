<script lang="ts">
export default {
    name: 'Tooltip'
};
</script>

<script lang="ts" setup>
import { toRefs, useSlots, useAttrs, renderSlot, createVNode, createTextVNode, mergeProps } from 'vue';
import { McPopover, PopoverProps } from '../popover';

interface Props extends PopoverProps {
    content?: string;
}
const props = withDefaults(defineProps<Props>(), {
    content: ''
});

const slots = useSlots();
const attrs = useAttrs();
const { content } = toRefs(props);

const Render = () => {
    const mergedProps = mergeProps(
        {
            class: 'mc-tooltip'
        },
        attrs
    );

    return createVNode(McPopover, mergedProps, {
        default: () => renderSlot(slots, 'default'),
        content: () => createTextVNode(content.value)
    });
};
</script>

<template>
    <Render />
</template>
