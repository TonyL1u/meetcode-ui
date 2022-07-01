import { ref, reactive, toRefs, createVNode, nextTick, renderSlot, mergeProps, defineComponent, toRaw, PropType, onMounted, computed, isReactive } from 'vue';
import { PatchFlags, useThemeRegister, createComponentVNode, createElementVNode, createDirectives } from '../_utils_';
import { CheckmarkSharp as IconCheck } from '@vicons/ionicons5';
import { useVirtualList } from '@vueuse/core';
import { omit } from 'lodash-es';
import { McPopover, PopoverExposeInstance, PopoverPlacement } from '../popover';
import { popoverProps, popoverEmits } from '../popover/interface';
import { McIcon } from '../icon';
import { PopselectOption, popselectProps, popselectEmits } from './interface';
import { mainCssr, lightCssr, darkCssr } from './styles';
import * as CSS from 'csstype';

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
        // theme register
        onMounted(() => {
            useThemeRegister({
                key: 'Popselect',
                main: mainCssr,
                light: lightCssr,
                dark: darkCssr
            });
        });

        const { value: valueVM, options, multiple, maxHeight, autoClose, autoScroll, truncate, matchTrigger } = toRefs(props);
        const popoverRef = ref<PopoverExposeInstance>();
        const cssVars = computed<CSS.Properties>(() => {
            return {
                '--popselect-inner-max-width': typeof truncate.value === 'number' ? `${truncate.value}px` : '200px'
            };
        });
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

        const createOptionVNode = (data: PopselectOption) => {
            const { label, value, disabled } = data;
            const isDisabled = !!disabled;
            const isSelected = multiple.value ? (valueVM.value as (string | number)[]).includes(value) : valueVM.value === value;
            const checkIconVNode = multiple.value && isSelected ? createComponentVNode(McIcon, { size: 16, style: 'margin-left: 8px' }, { default: () => createComponentVNode(IconCheck) }) : null;
            const option = toRaw(options.value?.find(e => e.value === value));
            const handleUpdateValue = (value: string | number) => {
                if (multiple.value) {
                    const index = (valueVM.value as (string | number)[]).indexOf(value);
                    if (index === -1) {
                        (valueVM.value as (string | number)[]).push(value);
                    } else {
                        (valueVM.value as (string | number)[]).splice(index, 1);
                    }
                    emit('update:value', toRaw(valueVM.value), option);
                } else {
                    emit('update:value', value, option);
                }
            };

            return createElementVNode(
                'div',
                {
                    class: ['mc-popselect-option', { 'mc-popselect-option--selected': isSelected, 'mc-popselect-option--disabled': isDisabled }],
                    onClick: () => {
                        if (isDisabled) return;
                        valueVM.value && handleUpdateValue(value);
                        emit('select', value);
                        handleHide();
                    }
                },
                [
                    createElementVNode(
                        'div',
                        {
                            class: 'mc-popselect-option__inner'
                        },
                        [createElementVNode('div', { class: { truncate: truncate.value } }, [typeof label === 'string' ? label : label()], PatchFlags.CLASS), checkIconVNode]
                    )
                ],
                PatchFlags.CLASS
            );
        };

        return () => {
            const itemHeight = 41;
            const listHeight = options.value ? Math.min(options.value.length * itemHeight, maxHeight.value ?? 0) : 0;
            const { list, containerProps, wrapperProps, scrollTo } = useVirtualList(isReactive(options.value) ? options.value! : reactive(options.value!), {
                // Keep `itemHeight` in sync with the item's row.
                itemHeight
            });
            scrollToOption = scrollTo;

            const mergedProps = mergeProps(omit(props, Object.keys(popselectProps)), {
                ref_key: 'popoverRef',
                ref: popoverRef,
                class: 'mc-popselect',
                style: {
                    padding: '0px',
                    minWidth: matchTrigger.value ? 'none' : '110px',
                    ...cssVars.value
                }
            });

            return createComponentVNode(
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
                    content: () =>
                        createElementVNode(
                            'div',
                            {
                                ...containerProps,
                                class: 'mc-popselect__content',
                                style: { height: listHeight + 'px', overflow: 'auto', padding: '4px 4px 0px 4px' }
                            },
                            [
                                createElementVNode(
                                    'div',
                                    wrapperProps.value,
                                    createDirectives('v-for', list.value, item => createOptionVNode(item.data)),
                                    PatchFlags.STYLE
                                )
                            ],
                            PatchFlags.STYLE
                        )
                },
                PatchFlags.FULL_PROPS
            );
        };
    }
});
