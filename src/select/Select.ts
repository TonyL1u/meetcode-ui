import { defineComponent, ref, toRefs, computed, watch } from 'vue';
import { useThemeRegister } from '../_composable_';
import { createComponentVNode, createComponentBlockVNode, createElementVNode, createElementBlockVNode, PatchFlags } from '../_utils_';
import { onClickOutside, isDefined, onKeyDown, and } from '@vueuse/core';
import { McInput } from '../input';
import { McPopselect } from '../popselect';
import { McIcon } from '../icon';
import { McIconSwitchTransition } from '../_transition_';
import { ChevronDownOutline, CloseCircle } from '@vicons/ionicons5';
import { _selectProps } from './interface';
import { mainCssr, lightCssr, darkCssr } from './styles';
import type { SelectOption } from './interface';

export default defineComponent({
    name: 'Select',
    props: _selectProps,
    emits: ['update:value'],
    setup(props, { slots, emit, expose }) {
        // theme register
        useThemeRegister({
            key: 'Select',
            main: mainCssr,
            light: lightCssr,
            dark: darkCssr
        });

        const { value: valueVM, filterable, clearable, options } = toRefs(props);
        const internalValue = ref('');
        const mergedValue = isDefined(valueVM) ? valueVM : internalValue;
        const inputValue = ref(mergedValue.value.toString());
        const inputPlaceholder = ref('请选择');
        const selectedOption = ref<SelectOption | undefined>(options.value?.find(option => option.value === mergedValue.value));
        const selectElRef = ref();
        const filteredOptions = computed(() => {
            return filterable.value
                ? options.value!.filter(({ key, label }) => {
                      if (key) {
                          return key.toUpperCase().indexOf(inputValue.value.toUpperCase()) > -1;
                      } else if (typeof label !== 'function') {
                          return label.toUpperCase().indexOf(inputValue.value.toUpperCase()) > -1;
                      }

                      return true;
                  })
                : options.value!;
        });

        const isEmpty = computed(() => filteredOptions.value.length === 0);
        const isHover = ref(false);
        const isActive = ref(false);
        const isFocused = ref(false);

        const showClearIcon = and(isHover, clearable);

        onClickOutside(selectElRef, event => {
            isFocused.value = false;
            isActive.value = false;
        });

        onKeyDown('Enter', e => {
            if (isFocused.value && !isActive.value && !isEmpty.value) {
                e.preventDefault();
                e.stopImmediatePropagation();
                isActive.value = true;
            }
        });

        watch(
            isActive,
            val => {
                if (filterable.value) {
                    if (val) {
                        if (mergedValue.value) {
                            inputValue.value = '';
                            inputPlaceholder.value = selectedOption.value?.label as string;
                        }
                    } else {
                        if (mergedValue.value) {
                            inputValue.value = selectedOption.value?.label as string;
                        } else {
                            inputValue.value = '';
                            inputPlaceholder.value = '请选择';
                        }
                    }
                }
            },
            { immediate: true }
        );

        watch(valueVM, val => {
            console.log(val);
        });

        const clearIconVnode = () => {
            return createComponentBlockVNode(McIcon, { icon: CloseCircle, class: 'mc-select__clear', color: '#999', key: 'icon-clear' });
        };

        const arrowIconVNode = () => {
            return createComponentBlockVNode(McIcon, { icon: ChevronDownOutline, class: 'mc-select__arrow', color: '#bbb', key: 'icon-arrow' });
        };

        // main logic...
        return () =>
            createComponentVNode(
                McPopselect,
                {
                    trigger: 'manual',
                    value: mergedValue.value,
                    show: isActive.value,
                    class: 'mc-select-menu',
                    options: filteredOptions.value,
                    matchTrigger: true,
                    showDelay: 0,
                    hideDelay: 0,
                    onSelect: (_: string | number, option: SelectOption) => {
                        selectedOption.value = option;
                        if (filterable.value) inputValue.value = option.label as string;
                        isActive.value = false;
                        isFocused.value = true;
                    },
                    'onUpdate:value': (value: string | number) => {
                        if (isDefined(valueVM)) {
                            emit('update:value', value);
                        } else {
                            mergedValue.value = value;
                        }
                    }
                },
                [
                    {
                        default: () =>
                            createElementVNode(
                                'div',
                                {
                                    ref: selectElRef,
                                    class: [
                                        'mc-select',
                                        {
                                            'mc-select--active': isActive.value,
                                            'mc-select--focused': isFocused.value,
                                            'mc-select--filterable': filterable.value
                                        }
                                    ],
                                    onClick: () => {
                                        isActive.value = !isActive.value;
                                        isFocused.value = true;
                                    },
                                    onMouseenter: () => {
                                        isHover.value = true;
                                    },
                                    onMouseleave: () => {
                                        isHover.value = false;
                                    }
                                },
                                [
                                    filterable.value
                                        ? createComponentBlockVNode(
                                              McInput,
                                              {
                                                  value: inputValue.value,
                                                  class: 'mc-select-wrapper',
                                                  placeholder: inputPlaceholder.value,
                                                  'onUpdate:value': (value: string) => {
                                                      inputValue.value = value;
                                                  }
                                              },
                                              {
                                                  suffix: showClearIcon.value ? clearIconVnode : arrowIconVNode
                                              }
                                          )
                                        : createElementBlockVNode(
                                              'div',
                                              {
                                                  class: 'mc-select-wrapper'
                                              },
                                              [
                                                  selectedOption.value !== void 0 ? createElementVNode('span', { class: 'mc-select__content' }, [selectedOption.value.label]) : createElementVNode('div', { class: 'mc-select__placeholder' }, ['请选择']),
                                                  createComponentVNode(
                                                      McIconSwitchTransition,
                                                      { mode: 'out-in' },
                                                      {
                                                          default: showClearIcon.value ? clearIconVnode : arrowIconVNode
                                                      }
                                                  )
                                              ]
                                          )
                                ],
                                PatchFlags.CLASS
                            )
                    },
                    [
                        isEmpty.value
                            ? {
                                  name: 'content',
                                  fn: () => createElementVNode('div', { style: { height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#bbb' } }, ['无数据'])
                              }
                            : undefined
                    ]
                ]
            );
    }
});
