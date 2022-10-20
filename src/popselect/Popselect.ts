import { ref, reactive, toRefs, nextTick, renderSlot, mergeProps, defineComponent, toRaw, PropType, computed, isReactive } from 'vue';
import { PatchFlags, createComponentVNode, createComponentBlockVNode, createElementVNode, createElementBlockVNode, createDirectives } from '../_utils_';
import { useThemeRegister } from '../_composable_';
import { CheckmarkSharp as IconCheck } from '@vicons/ionicons5';
import { useVirtualList, onKeyDown, isDefined, useCycleList } from '@vueuse/core';
import { omit, values } from 'lodash-es';
import { McPopover, PopoverExposeInstance, PopoverPlacement } from '../popover';
import { popoverProps, popoverEmits } from '../popover/interface';
import { McIcon } from '../icon';
import { McIconSwitchTransition } from '../_transition_';
import { PopselectOption, _popselectProps, _popselectEmits } from './interface';
import { mainCssr, lightCssr, darkCssr } from './styles';
import type { StyleValue, CSSProperties } from 'vue';

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
        ..._popselectProps,
        ...defaultPropsOverride
    },
    emits: [...popoverEmits, ..._popselectEmits],
    setup(props, { slots, emit }) {
        // theme register
        useThemeRegister({
            key: 'Popselect',
            main: mainCssr,
            light: lightCssr,
            dark: darkCssr
        });

        const { value: valueVM, options, multiple, maxHeight, autoClose, autoScroll, truncate, matchTrigger, itemHeight, itemStyle, trigger, show, useArrowControl } = toRefs(props);
        const internalValue = ref('');
        const mergedValue = isDefined(valueVM) ? valueVM : internalValue;
        const pendingOptionValue = ref(mergedValue.value);
        const selectedOptions = computed(() => {
            if (multiple.value) {
                return options.value!.filter(e => (mergedValue.value as (string | number)[]).includes(e.value));
            } else {
                return [options.value?.find(e => e.value === mergedValue.value)];
            }
        });

        const internalShow = ref(show.value ?? false);
        const mergedShow = isDefined(show) ? show : internalShow;

        const subHeight = computed(() => itemHeight.value!);
        const listHeight = computed(() => (options.value ? Math.min(options.value.length * subHeight.value, maxHeight.value ?? 0) : 0));
        const popoverRef = ref<PopoverExposeInstance>();
        const optionRefsMap = new WeakMap<PopselectOption, HTMLDivElement | null>();

        const cssVars = computed<StyleValue>(() => {
            return {
                '--popselect-inner-max-width': typeof truncate.value === 'number' ? `${truncate.value}px` : '200px'
            };
        });
        let scrollToOption: (index: number) => void;

        if (useArrowControl.value) {
            const getOptionByValue = (value?: string | number) => {
                return options.value?.find(e => e.value === value);
            };

            const findOption = (value: string | number, type: 'next' | 'prev') => {
                const { state, index, next, prev } = useCycleList(options.value!, { initialValue: getOptionByValue(value)! });
                let option = state.value;
                do {
                    option = type === 'next' ? next() : prev();
                } while (option.disabled && option.value !== value);

                return { index: index.value, option, el: optionRefsMap.get(option) };
            };

            const isOutOfList = (el: HTMLDivElement) => {
                const { top, bottom } = el.getBoundingClientRect();
                const { top: listTop, bottom: listBottom } = popoverRef.value!.el.getBoundingClientRect();
                if (top > listTop && bottom < listBottom) return false;
                return true;
            };

            onKeyDown(['ArrowUp', 'ArrowDown', 'Enter'], e => {
                if (mergedShow.value && options.value!.length > 0) {
                    e.preventDefault();
                    switch (e.key) {
                        case 'Enter':
                            const value = pendingOptionValue.value as string | number;
                            const option = getOptionByValue(value)!;
                            emit('select', value, option);
                            if (isDefined(valueVM)) {
                                handleUpdateValue(value, option);
                            } else {
                                mergedValue.value = value;
                            }
                            handleHide();
                            break;
                        default:
                            const { index, option: pendingOption, el } = findOption(pendingOptionValue.value as string | number, e.key === 'ArrowUp' ? 'prev' : 'next');
                            pendingOptionValue.value = pendingOption.value;
                            if (!el || isOutOfList(el)) {
                                scrollToOption(index);
                            }
                    }
                }
            });
        }

        const handleUpdateValue = (value: string | number, option?: PopselectOption) => {
            pendingOptionValue.value = value;
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

        const handleShow = () => {
            nextTick(() => {
                const index = options.value?.findIndex(e => e.value === (multiple.value ? (valueVM.value as (string | number)[])[0] : valueVM.value));
                index && scrollToOption(index);
            });
        };

        const handleHide = () => {
            if ((trigger.value !== 'manual' && autoClose.value === void 0 && !multiple.value) || autoClose.value) {
                requestAnimationFrame(() => {
                    popoverRef?.value?.hide();
                });
            }
        };

        const createOptionVNode = (data: PopselectOption) => {
            const { label, value, disabled } = data;
            const isDisabled = !!disabled;
            const isSelected = multiple.value ? (valueVM.value as (string | number)[]).includes(value) : valueVM.value === value;

            return createElementVNode(
                'div',
                {
                    key: value,
                    class: ['mc-popselect-option', { 'mc-popselect-option--selected': isSelected, 'mc-popselect-option--disabled': isDisabled, 'mc-popselect-option--pending': pendingOptionValue.value === value }],
                    style: itemStyle.value,
                    onClick: () => {
                        if (isDisabled) return;
                        emit('select', value, data);
                        if (isDefined(valueVM)) {
                            handleUpdateValue(value, data);
                        } else {
                            mergedValue.value = value;
                        }
                        handleHide();
                    },
                    onMouseenter: () => {
                        if (isDisabled) return;
                        pendingOptionValue.value = value;
                    },
                    onVnodeMounted(vnode) {
                        optionRefsMap.set(data, vnode.el as HTMLDivElement);
                    },
                    onVnodeUnmounted() {
                        optionRefsMap.delete(data);
                    }
                },
                [
                    createElementVNode(
                        'div',
                        {
                            class: 'mc-popselect-option__inner'
                        },
                        [
                            createElementVNode('div', { class: { truncate: truncate.value } }, [typeof label === 'string' ? label : label()], PatchFlags.CLASS),
                            multiple.value && isSelected ? createComponentBlockVNode(McIcon, { size: 16, style: 'margin-left: 8px' }, { default: () => createComponentVNode(IconCheck) }) : null
                        ]
                    )
                ],
                PatchFlags.CLASS | PatchFlags.STYLE | PatchFlags.HYDRATE_EVENTS | PatchFlags.NEED_PATCH
            );
        };

        return () => {
            const { list, containerProps, wrapperProps, scrollTo } = useVirtualList(isReactive(options.value) ? options.value! : reactive(options.value!), {
                // Keep `itemHeight` in sync with the item's row.
                itemHeight: subHeight.value
            });
            scrollToOption = scrollTo;

            const mergedProps = mergeProps(omit(props, Object.keys(_popselectProps)), {
                ref_key: 'popoverRef',
                ref: popoverRef,
                class: 'mc-popselect',
                style: {
                    padding: '0px',
                    minWidth: matchTrigger.value ? 'none' : '110px',
                    ...(cssVars.value as CSSProperties)
                }
            });

            return createComponentVNode(
                McPopover,
                {
                    ...mergedProps,
                    onShow: () => {
                        autoScroll.value && handleShow();
                        internalShow.value = true;
                        pendingOptionValue.value = (selectedOptions.value.filter(e => !e?.disabled)[0] ?? options.value?.[0])?.value;
                        emit('show');
                    },
                    onHide: () => {
                        internalShow.value = false;
                        emit('hide');
                    }
                },
                {
                    default: () => renderSlot(slots, 'default'),
                    content: () =>
                        slots['content']
                            ? renderSlot(slots, 'content')
                            : createElementBlockVNode(
                                  'div',
                                  {
                                      ...containerProps,
                                      class: 'mc-popselect__content',
                                      style: { height: listHeight.value + 'px', overflow: 'auto', padding: '4px 4px 0px 4px' }
                                  },
                                  [
                                      createElementBlockVNode(
                                          'div',
                                          wrapperProps.value,
                                          createDirectives('v-for', list.value, item => createOptionVNode(item.data), true),
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
