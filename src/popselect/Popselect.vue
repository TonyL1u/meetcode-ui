<template>
    <Render />
</template>

<script lang="ts" setup>
import { ref, toRefs, createVNode, nextTick, useSlots, renderSlot } from 'vue';
import { NIcon } from 'naive-ui';
import { McPopover } from '../popover';
import { CheckmarkSharp as IconCheck } from '@vicons/ionicons5';
import { useVModels } from '@vueuse/core';
import { UseVirtualList } from '@vueuse/components';

type PopselectValue = string | number | Array<string | number>;
interface PopselectOption {
    label: string;
    value: string | number;
    disabled?: boolean;
}
interface Props {
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
const { options, multiple, maxHeight } = toRefs(props);
const { value: valueRef } = useVModels(props, emit);
const popoverRef = ref();
const virtualListRef = ref();

const handleShow = () => {
    nextTick(() => {
        const selectedIndex = options.value.findIndex(e => e.value === (multiple.value ? (<Array<string | number>>valueRef.value)[0] : valueRef.value));
        if (selectedIndex > -1) {
            virtualListRef.value.$el.scrollTop = selectedIndex * 42;
        }
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
                [createVNode('div', { class: 'mc-truncate', style: 'max-width: 200px' }, label), checkVNode]
            )
        ]
    );
};

const Render = () => {
    const listHeigth = Math.min(options.value.length * 38 + (options.value.length - 1) * 4, maxHeight.value);
    const itemHeight = 38 + ((options.value.length - 1) / options.value.length) * 4;

    return createVNode(
        McPopover,
        {
            ref: popoverRef,
            class: 'mc-popselect',
            placement: 'bottom',
            onShow: handleShow
        },
        {
            default: () => renderSlot(slots, 'default'),
            content: () => {
                return createVNode(
                    UseVirtualList,
                    {
                        ref: virtualListRef,
                        class: 'mc-popselect__content mc-virtual-list',
                        list: options.value,
                        options: { itemHeight },
                        height: `${listHeigth}px`
                    },
                    {
                        default: (item: { data: PopselectOption; index: number }) => {
                            return getOptionVNode(item.data);
                        }
                    }
                );
            }
        }
    );
};
</script>

<style lang="scss">
.mc-popselect {
    @apply mc-p-0;
    min-width: 110px;

    .mc-virtual-list {
        padding: 4px;

        & > div > div:not(:first-child) {
            margin-top: 4px;
        }
    }
}

.mc-popselect-option {
    @apply mc-px-3 mc-py-2 mc-cursor-pointer mc-rounded;

    &:not(&--disabled):hover {
        background: #f2fcf8;
    }

    &--selected {
        background: #f2fcf8;
        color: #10b981;
    }

    &--disabled {
        @apply mc-cursor-not-allowed mc-bg-gray-100 mc-text-gray-400;
    }

    &__inner {
        @apply mc-flex mc-justify-between mc-items-center;
    }
}
</style>
