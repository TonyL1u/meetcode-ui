import { ref, toRefs, createVNode, nextTick, renderSlot, mergeProps, defineComponent, toRaw, PropType } from 'vue';
import { CheckmarkSharp as IconCheck } from '@vicons/ionicons5';
import { useVirtualList } from '@vueuse/core';
import { omit } from 'lodash-es';
import { McPopover, PopoverExposeInstance, PopoverPlacement, popoverProps, popoverEmits } from '../popover';
import { McIcon } from '../icon';
import { PopselectOption, popselectProps, popselectEmits } from './interface';

const defaultPropsOverride = {
    placement: {
        type: String as PropType<PopoverPlacement>,
        default: 'bottom'
    }
};

export default defineComponent({
    name: 'Popselect',
    props: {
        ...popoverProps,
        ...popselectProps,
        ...defaultPropsOverride
    },
    emits: [...popoverEmits, ...popselectEmits],
    setup(props, { slots, attrs, emit }) {
        const { value: valueVM, options, multiple, maxHeight, autoClose, autoScroll } = toRefs(props);
        const popoverRef = ref<PopoverExposeInstance>();
        let scrollToOption: (index: number) => void;

        const handleShow = () => {
            nextTick(() => {
                const index = options.value?.findIndex(e => e.value === (multiple.value ? (valueVM.value as (string | number)[])[0] : valueVM.value));
                index && scrollToOption(index);
            });
        };

        const handleHide = () => {
            if ((autoClose.value === undefined && !multiple.value) || autoClose.value) {
                requestAnimationFrame(() => {
                    popoverRef?.value?.hide();
                });
            }
        };

        const getOptionVNode = (data: PopselectOption) => {
            const { label, value, disabled } = data;
            const isDisabled = !!disabled;
            const isSelected = multiple.value ? (valueVM.value as (string | number)[]).includes(value) : valueVM.value === value;
            const checkVNode = multiple.value && isSelected ? createVNode(McIcon, { size: 16 }, { default: () => createVNode(IconCheck) }) : null;
            const option = toRaw(options.value?.find(e => e.value === value));
            const handleClick = multiple.value
                ? () => {
                      const index = (valueVM.value as (string | number)[]).indexOf(value);
                      if (index === -1) {
                          (valueVM.value as (string | number)[]).push(value);
                      } else {
                          (valueVM.value as (string | number)[]).splice(index, 1);
                      }
                      emit('update:value', toRaw(valueVM.value), option);
                  }
                : () => {
                      emit('update:value', value, option);
                  };

            return createVNode(
                'div',
                {
                    class: ['mc-popselect-option', { 'mc-popselect-option--selected': isSelected, 'mc-popselect-option--disabled': isDisabled }],
                    onClick: () => {
                        if (isDisabled) return;
                        handleClick();
                        handleHide();
                    }
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
            const listHeight = options.value ? Math.min(options.value.length * itemHeight, maxHeight.value ?? 0) : 0;
            const { list, containerProps, wrapperProps, scrollTo } = useVirtualList(options.value ?? [], {
                // Keep `itemHeight` in sync with the item's row.
                itemHeight
            });
            scrollToOption = scrollTo;

            const mergedProps = mergeProps(omit(props, Object.keys(popselectProps)), {
                ref: popoverRef,
                class: 'mc-popselect'
            });

            return createVNode(
                McPopover,
                {
                    ...mergedProps,
                    onShow: (...args: Array<unknown>) => {
                        autoScroll.value && handleShow();
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
