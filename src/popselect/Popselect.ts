import { ref, toRefs, createVNode, nextTick, renderSlot, mergeProps, defineComponent } from 'vue';
import { NIcon } from 'naive-ui';
import { CheckmarkSharp as IconCheck } from '@vicons/ionicons5';
import { useVModels, useVirtualList } from '@vueuse/core';
import { omit } from 'lodash-es';
import { McPopover, PopoverProps, PopoverExposeInstance, popoverProps } from '../popover';
import { PopselectValue, PopselectOption, popselectProps } from './interface';

export default defineComponent({
    name: 'Popselect',
    props: {
        ...popoverProps,
        ...popselectProps
    },
    emits: ['update:value'],
    setup(props, { slots, attrs, emit }) {
        const { value: valueVM, options, multiple, maxHeight } = toRefs(props);
        const popoverRef = ref<PopoverExposeInstance>();
        let scrollToOption: (index: number) => void;

        const handleShow = () => {
            nextTick(() => {
                const index = options.value.findIndex(e => e.value === (multiple.value ? (valueVM.value as (string | number)[])[0] : valueVM.value));
                scrollToOption(index);
            });
        };

        const getOptionVNode = (data: PopselectOption) => {
            const { label, value, disabled } = data;
            const isDisabled = !!disabled;
            const isSelected = multiple.value ? (valueVM.value as (string | number)[]).includes(value) : valueVM.value === value;
            const checkVNode = multiple.value && isSelected ? createVNode(NIcon, { size: 16 }, { default: () => createVNode(IconCheck) }) : null;
            const option = options.value.find(e => e.value === value);
            const handleClick = multiple.value
                ? () => {
                      const index = (valueVM.value as (string | number)[]).indexOf(value);
                      if (index === -1) {
                          (valueVM.value as (string | number)[]).push(value);
                      } else {
                          (valueVM.value as (string | number)[]).splice(index, 1);
                      }
                      emit('update:value', valueVM.value, option);
                  }
                : () => {
                      emit('update:value', value, option);
                      requestAnimationFrame(() => {
                          popoverRef?.value?.hide();
                      });
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
                        [createVNode('div', null, [typeof label === 'string' ? label : label()]), checkVNode]
                    )
                ]
            );
        };

        return () => {
            const itemHeight = 41;
            const listHeight = Math.min(options.value.length * itemHeight, maxHeight.value);
            const { list, containerProps, wrapperProps, scrollTo } = useVirtualList(options.value, {
                // Keep `itemHeight` in sync with the item's row.
                itemHeight
            });
            scrollToOption = scrollTo;

            const mergedProps = mergeProps(omit(props, Object.keys(popselectProps)), {
                ref: popoverRef,
                class: 'mc-popselect',
                placement: 'bottom'
            });

            return createVNode(
                McPopover,
                {
                    ...mergedProps,
                    onShow: (...args: Array<unknown>) => {
                        handleShow();
                        attrs.show && (attrs as any).onShow(...args);
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
    }
});
