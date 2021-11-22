<script lang="ts">
export default {
    name: 'Popselect'
};
</script>

<script lang="ts" setup>
import { Ref, ref, useAttrs, toRefs, createVNode, nextTick, useSlots, renderSlot, mergeProps, watch } from 'vue';
import { NIcon } from 'naive-ui';
import { CheckmarkSharp as IconCheck } from '@vicons/ionicons5';
import { useVModels, useVirtualList } from '@vueuse/core';
import { McPopover, PopoverBaseProps, PopoverExposeInstance } from '../popover';
import type { PopselectValue, PopselectOption } from './interface';
import './style.scss';

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
    (e: 'update:value', value: PopselectValue, selectedValues?: PopselectValue): void;
}>();

const slots = useSlots();
const attrs = useAttrs();
const { options, multiple, maxHeight } = toRefs(props);
const { value: valueRef } = useVModels(props, emit);
const popoverRef = <Ref<PopoverExposeInstance>>ref();
let scrollToOption: (index: number) => void;

const handleShow = () => {
    nextTick(() => {
        const index = options.value.findIndex(e => e.value === (multiple.value ? (<Array<string | number>>valueRef.value)[0] : valueRef.value));
        scrollToOption(index);
    });
};

const getOptionVNode = (data: PopselectOption) => {
    const { label, value, disabled } = data;
    const isDisabled = !!disabled;
    const isSelected = multiple.value ? (<Array<string | number>>valueRef.value).includes(value) : valueRef.value === value;
    const checkVNode = multiple.value && isSelected ? createVNode(NIcon, { size: 16 }, { default: () => createVNode(IconCheck) }) : null;
    const handleClick = multiple.value
        ? () => {
              const index = (<Array<string | number>>valueRef.value).indexOf(value);
              if (index === -1) {
                  (<Array<string | number>>valueRef.value).push(value);
              } else {
                  (<Array<string | number>>valueRef.value).splice(index, 1);
              }
              emit('update:value', valueRef.value, value);
          }
        : () => {
              valueRef.value = value;
              popoverRef.value.hide();
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
    const listHeigth = Math.min(options.value.length * 38 + (options.value.length - 1) * 4, maxHeight.value);
    const itemHeight = 38 + ((options.value.length - 1) / options.value.length) * 4;
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
            onShow: (...args: Array<any>) => {
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
                        class: 'mc-popselect__content mc-virtual-list',
                        style: { height: listHeigth + 'px' }
                    },
                    [
                        createVNode(
                            'div',
                            wrapperProps.value,
                            list.value.map((item: { data: PopselectOption; index: number }) => {
                                return getOptionVNode(item.data);
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
