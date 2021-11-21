import { Ref, ref, createVNode, nextTick, renderSlot, mergeProps, FunctionalComponent, defineComponent, PropType } from 'vue';
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
type Emit = {
    'update:value': (value: PopselectValue, selectedValues?: PopselectValue) => void;
};

const Popselect: FunctionalComponent<Props, Emit> = (props, { slots, attrs, emit }) => {
    const { options = [], multiple = false, maxHeight = 300 } = props;
    const { value: valueRef } = useVModels(props, emit);
    const popoverRef = <Ref<PopoverExposeInstance>>ref();

    const handleShow = () => {
        nextTick(() => {
            const index = options.findIndex(e => e.value === (multiple ? (<Array<string | number>>valueRef.value)[0] : valueRef.value));
            scrollTo(index);
        });
    };

    const getOptionVNode = (data: PopselectOption, index: number) => {
        const { label, value, disabled } = data;
        const isDisabled = !!disabled;
        const isSelected = multiple ? (<Array<string | number>>valueRef.value).includes(value) : valueRef.value === value;
        const checkVNode = multiple && isSelected ? createVNode(NIcon, { size: 16 }, { default: () => createVNode(IconCheck) }) : null;
        const handleClick = multiple
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

    const listHeigth = Math.min(options.length * 38 + (options.length - 1) * 4, maxHeight);
    const itemHeight = 38 + ((options.length - 1) / options.length) * 4;
    const { list, containerProps, wrapperProps, scrollTo } = useVirtualList(options, {
        // Keep `itemHeight` in sync with the item's row.
        itemHeight
    });
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
                                const { data, index } = item;
                                return getOptionVNode(data, index);
                            })
                        )
                    ]
                );
            }
        }
    );
};

Popselect.props = ['value', 'options', 'multiple', 'maxHeight'];
Popselect.emits = ['update:value'];
export default Popselect;

// export default defineComponent({
//     props: {
//         value: {
//             type: Object as PropType<Props['value']>
//         }
//     }
// });
