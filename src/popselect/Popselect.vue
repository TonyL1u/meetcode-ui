<script lang="ts">
export default {
    name: 'Popselect'
};
</script>

<script lang="ts" setup>
import { ref, useAttrs, toRefs, createVNode, nextTick, useSlots, renderSlot, mergeProps } from 'vue';
import { NIcon } from 'naive-ui';
import { CheckmarkSharp as IconCheck } from '@vicons/ionicons5';
import { useVModels, useVirtualList } from '@vueuse/core';
import { McPopover, PopoverBaseProps, PopoverExposeInstance } from '../popover';
import type { PopselectValue, PopselectOption } from './interface';

interface Props extends PopoverBaseProps {
    value: PopselectValue;
    options?: Array<PopselectOption>;
    multiple?: boolean;
    maxHeight?: number;
}
const props = withDefaults(defineProps<Props>(), {
    options: () => [],
    multiple: false,
    maxHeight: 300
});
const emit = defineEmits<{
    (e: 'update:value', value: PopselectValue, option: PopselectOption): void;
}>();

const slots = useSlots();
const attrs = useAttrs();
const { options, multiple, maxHeight } = toRefs(props);
const { value: valueVM } = useVModels(props, emit);
const popoverRef = ref<PopoverExposeInstance>();
let scrollToOption: (index: number) => void;

const handleShow = () => {
    nextTick(() => {
        const index = options.value.findIndex(e => e.value === (multiple.value ? (<Array<string | number>>valueVM.value)[0] : valueVM.value));
        scrollToOption(index);
    });
};

const getOptionVNode = (data: PopselectOption) => {
    const { label, value, disabled } = data;
    const isDisabled = !!disabled;
    const isSelected = multiple.value ? (<Array<string | number>>valueVM.value).includes(value) : valueVM.value === value;
    const checkVNode = multiple.value && isSelected ? createVNode(NIcon, { size: 16 }, { default: () => createVNode(IconCheck) }) : null;
    const option = options.value.find(e => e.value === value);
    const handleClick = multiple.value
        ? () => {
              const index = (<Array<string | number>>valueVM.value).indexOf(value);
              if (index === -1) {
                  (<Array<string | number>>valueVM.value).push(value);
              } else {
                  (<Array<string | number>>valueVM.value).splice(index, 1);
              }
              emit('update:value', valueVM.value, option!);
          }
        : () => {
              emit('update:value', value, option!);
              popoverRef?.value?.hide();
          };

    return createVNode(
        'div',
        {
            class: ['mc-popselect-option', { 'mc-popselect-option--selected': isSelected, 'mc-popselect-option--disabled': isDisabled }],
            onClick: isDisabled ? null : handleClick
        },
        [
            createVNode(
                'div',
                {
                    class: 'mc-popselect-option__inner'
                },
                [createVNode('div', null, label), checkVNode]
            )
        ]
    );
};

const Render = () => {
    const itemHeight = 41;
    const listHeight = Math.min(options.value.length * itemHeight, maxHeight.value);
    const { list, containerProps, wrapperProps, scrollTo } = useVirtualList(options.value, {
        // Keep `itemHeight` in sync with the item's row.
        itemHeight
    });
    scrollToOption = scrollTo;

    const popoverMergedProps = mergeProps(
        {
            ref: popoverRef,
            class: 'mc-popselect',
            placement: 'bottom'
        },
        attrs
    );

    return createVNode(
        McPopover,
        {
            ...popoverMergedProps,
            onShow: (...args: Array<unknown>) => {
                handleShow();
                attrs.show && (<any>attrs).onShow(...args);
            }
        },
        {
            default: () => renderSlot(slots, 'default'),
            content: () => {
                return createVNode(
                    'div',
                    {
                        ...containerProps,
                        class: 'mc-popselect__content',
                        style: { height: listHeight + 'px', overflow: 'auto', padding: '4px 4px 0px 4px' }
                    },
                    [
                        createVNode(
                            'div',
                            wrapperProps.value,
                            list.value.map(({ data, index }: { data: PopselectOption; index: number }) => {
                                return getOptionVNode(data);
                            })
                        )
                    ]
                );
            }
        }
    );
};
</script>

<template>
    <Render />
</template>
