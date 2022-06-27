import { defineComponent, onMounted, ref, computed, toRefs, watch, nextTick, renderSlot, getCurrentInstance } from 'vue';
import { or, and, not, isDefined, onStartTyping } from '@vueuse/core';
import { useThemeRegister, createElementVNode, createComponentVNode, createFragment, createTextVNode, createDirectives, propsMergeSlots, PatchFlags, SlotFlags } from '../_utils_';
import { mainCssr, lightCssr, darkCssr } from './styles';
import { inputProps } from './interface';
import { McIcon } from '../icon';
import { McBaseLoading } from '../_internal_';
import { Infinite, CloseCircle, EyeOffOutline, EyeOutline } from '@vicons/ionicons5';
import type { InputProps } from './interface';
import * as CSS from 'csstype';

export default defineComponent({
    name: 'Input',
    props: inputProps,
    emits: ['update:value', 'focus', 'blur', 'change', 'input', 'text-select', 'clear', 'password-visible-change'],
    setup(props, { slots, emit, expose }) {
        // theme register
        onMounted(() => {
            useThemeRegister({
                key: 'McInput',
                main: mainCssr,
                light: lightCssr,
                dark: darkCssr
            });
        });
        const instance = getCurrentInstance();
        const { value: valueVM, type, placeholder, disabled, focusOnTyping, autosize, resizable, clearable, wordCount, loading, passwordVisible, minRows, maxRows, maxLength, inputLimits } = toRefs(props);
        const internalValue = ref('');
        const mergedValue = isDefined(valueVM) ? valueVM : internalValue;

        const inputElRef = ref<HTMLInputElement>();
        const textareaElRef = ref<HTMLTextAreaElement>();
        const inputInst = computed(() => (type.value === 'textarea' ? textareaElRef.value : inputElRef.value));

        const isHovered = ref(false);
        const isFocused = ref(false);
        const isCompositing = ref(false);
        const isShowPassword = ref(false);

        const showPlaceholder = and(not(mergedValue), or(placeholder, slots['placeholder']), not(isCompositing));
        const showInputSuffix = and(type.value !== 'textarea', or(wordCount, loading, and(clearable, not(disabled)), and(type.value === 'password', passwordVisible.value !== 'none', not(disabled)), slots['suffix']));
        const showTextareaSuffix = and(type.value === 'textarea', wordCount);

        const textareaMinHeight = computed(() => 21 * (minRows.value || 1) + 11);
        const textareaMaxHeight = computed(() => 21 * (maxRows.value || 1) + 11);
        const textareaAutosizeHeight = ref(textareaMinHeight.value);
        const inputAutosizeWidth = ref(0);

        const cssVars = computed<CSS.Properties>(() => {
            return {
                '--input-textarea-resizable': resizable.value ? 'vertical' : 'none',
                '--input-textarea-min-height': `${textareaMinHeight.value}px`,
                '--input-textarea-max-height': maxRows.value ? `${textareaMaxHeight.value}px` : '',
                '--input-textarea-autosize-height': `${textareaAutosizeHeight.value}px`,
                '--input-autosize-width': inputAutosizeWidth.value ? `${inputAutosizeWidth.value}px` : '0px'
            };
        });

        const forceSetTextareaHeight = () => {
            inputInst.value?.setAttribute('style', `height: ${textareaAutosizeHeight.value}px`);
        };
        const adjustTextareaHeight = () => {
            textareaAutosizeHeight.value = 0;
            if (resizable.value) inputInst.value?.setAttribute('style', `height: ${textareaMinHeight.value}px`);

            nextTick(() => {
                if (inputInst.value) {
                    const { scrollHeight } = inputInst.value;
                    textareaAutosizeHeight.value = scrollHeight;

                    // force set height when resize textarea manually
                    if (resizable.value) {
                        nextTick(() => {
                            forceSetTextareaHeight();
                        });
                    }
                }
            });
        };
        const adjustInputWidth = () => {
            inputAutosizeWidth.value = 0;

            nextTick(() => {
                if (inputInst.value) {
                    const { scrollWidth } = inputInst.value;
                    inputAutosizeWidth.value = scrollWidth;
                }
            });
        };

        // watchers
        watch(
            mergedValue,
            () => {
                if (not(autosize).value) return;

                if (type.value === 'textarea') {
                    adjustTextareaHeight();
                } else {
                    adjustInputWidth();
                }
            },
            {
                immediate: true
            }
        );
        watch(isShowPassword, flag => {
            emit('password-visible-change', flag);
        });

        onStartTyping(() => {
            if (and(not(isFocused), focusOnTyping, not(disabled)).value) focus();
        });

        const updateValue = (value: string) => {
            if (isDefined(valueVM)) {
                emit('update:value', value);
            } else {
                mergedValue.value = value;
            }

            emit('input', value);
        };
        const clear = () => {
            updateValue('');
        };
        const focus = () => {
            inputInst.value?.focus();
        };
        const blur = () => {
            inputInst.value?.blur();
        };
        const select = () => {
            inputInst.value?.select();
        };

        // event methods
        const handleFocus = () => {
            isFocused.value = true;
            emit('focus');
        };
        const handleBlur = () => {
            isFocused.value = false;
            emit('blur');
        };
        const handleChange = () => {
            emit('change', inputInst.value?.value || '');
        };
        const handleInput = (payload: Event) => {
            if (isCompositing.value) return;

            const value = inputInst.value?.value || '';
            if (validInput(value, payload) || value === '') {
                updateValue(value);
            } else {
                instance?.proxy?.$forceUpdate();
            }
        };
        const handleSelect = () => {
            const { selectionStart, selectionEnd, value = '' } = inputInst.value ?? {};
            emit('text-select', value.slice(selectionStart || 0, selectionEnd || 0));
        };
        const handleCompositionStart = () => {
            isCompositing.value = true;
        };
        const handleCompositionEnd = (payload: CompositionEvent) => {
            isCompositing.value = false;
            handleInput(payload);
        };
        const validInput = (value: string, event: Event) => {
            const result: boolean[] = [];
            for (const rule of inputLimits.value ?? []) {
                switch (rule) {
                    case 'number':
                        result.push(/^\d+$/.test(value));
                        break;
                    case 'not-special':
                        result.push(!/[\W]/.test(value));
                        break;
                    case 'trim':
                        result.push(!value.startsWith(' ') && !value.endsWith(' '));
                        break;
                    case 'not-space':
                        result.push(value.indexOf(' ') === -1);
                        break;
                    default:
                        if (typeof rule === 'function') {
                            result.push(!!rule(value, event));
                        } else if (Object.prototype.toString.call(rule) === '[object RegExp]') {
                            result.push(!!!value.replace(rule, ''));
                        } else {
                            result.push(true);
                        }
                }
            }

            return result.every(flag => flag === true);
        };

        const passwordEyeVnode = () => {
            let visibleSwitchEvent = {};
            if (passwordVisible.value === 'click') {
                visibleSwitchEvent = {
                    onClick: () => {
                        isShowPassword.value = !isShowPassword.value;
                    }
                };
            } else if (passwordVisible.value === 'hover') {
                visibleSwitchEvent = {
                    onMouseenter: () => {
                        isShowPassword.value = true;
                    },
                    onMouseleave: () => {
                        isShowPassword.value = false;
                    }
                };
            } else if (passwordVisible.value === 'mousedown') {
                const mouseupEvent = () => {
                    isShowPassword.value = false;
                    document.removeEventListener('mouseup', mouseupEvent);
                };
                visibleSwitchEvent = {
                    onMousedown: () => {
                        isShowPassword.value = true;
                        document.addEventListener('mouseup', mouseupEvent);
                    }
                };
            }

            return createComponentVNode(
                McIcon,
                {
                    icon: isShowPassword.value ? EyeOutline : EyeOffOutline,
                    class: 'mc-input-eye-icon',
                    ...visibleSwitchEvent
                },
                null,
                PatchFlags.FULL_PROPS
            );
        };
        const wordCountVNode = () => {
            return createElementVNode('span', { class: 'mc-input-word-count' }, [
                maxLength.value
                    ? `${mergedValue.value.toString().length} / ${maxLength.value}`
                    : createFragment([createTextVNode(`${mergedValue.value.toString().length} / `, true), createComponentVNode(McIcon, { icon: Infinite, style: 'margin-left: 3px' })])
            ]);
        };
        const clearIconVNode = () => {
            return createComponentVNode(
                McIcon,
                {
                    icon: CloseCircle,
                    class: 'mc-input-clear-icon',
                    style: { opacity: +and(mergedValue, or(isFocused, isHovered)).value },
                    onClick: () => {
                        if (disabled.value) return;
                        clear();
                        emit('clear');
                    }
                },
                null,
                PatchFlags.PROPS,
                ['style']
            );
        };

        expose({
            focus,
            blur,
            select,
            resize: () => {},
            setPasswordVisible: (visible: boolean) => {
                isShowPassword.value = visible;
            }
        });

        return () =>
            createElementVNode(
                'div',
                {
                    class: [
                        'mc-input',
                        `mc-input--${type.value}`,
                        {
                            'mc-input--disabled': disabled.value,
                            'mc-input--focused': isFocused.value,
                            'mc-input--autosize': autosize.value,
                            'mc-input--resizable': and(type.value === 'textarea', resizable).value,
                            'mc-input--with-prepend': !!slots['prepend'],
                            'mc-input--with-append': !!slots['append']
                        }
                    ],
                    style: cssVars.value,
                    onMousedown: payload => {
                        if (disabled.value) return;

                        const { tagName } = payload.target as HTMLElement;
                        if (tagName !== 'INPUT' && tagName !== 'TEXTAREA') {
                            payload.preventDefault();
                            if (not(isFocused).value) focus();
                        }
                    },
                    onMouseenter: () => {
                        if (disabled.value) return;

                        isHovered.value = true;
                    },
                    onMouseleave: () => {
                        if (disabled.value) return;

                        isHovered.value = false;
                    }
                },
                [
                    slots['prepend'] ? createElementVNode('div', { class: 'mc-input-prepend' }, [renderSlot(slots, 'prepend')]) : null,
                    createElementVNode('div', { class: 'mc-input-wrapper' }, [
                        slots['prefix'] ? createElementVNode('div', { class: 'mc-input__prefix' }, [renderSlot(slots, 'prefix')]) : null,
                        createElementVNode('div', { class: 'mc-input__inner' }, [
                            type.value === 'textarea'
                                ? createElementVNode(
                                      'textarea',
                                      {
                                          ref_key: 'textareaElRef',
                                          ref: textareaElRef,
                                          class: 'mc-input-el',
                                          value: mergedValue.value,
                                          maxlength: maxLength.value,
                                          disabled: disabled.value,
                                          onFocus: handleFocus,
                                          onBlur: handleBlur,
                                          onChange: handleChange,
                                          onInput: handleInput,
                                          onSelect: handleSelect,
                                          onCompositionstart: handleCompositionStart,
                                          onCompositionend: handleCompositionEnd
                                      },
                                      null,
                                      PatchFlags.PROPS,
                                      ['maxlength', 'value', 'disabled']
                                  )
                                : createElementVNode(
                                      'input',
                                      {
                                          ref_key: 'inputElRef',
                                          ref: inputElRef,
                                          class: 'mc-input-el',
                                          type: isShowPassword.value ? 'text' : type.value,
                                          value: mergedValue.value,
                                          maxlength: maxLength.value,
                                          disabled: disabled.value,
                                          onFocus: handleFocus,
                                          onBlur: handleBlur,
                                          onChange: handleChange,
                                          onInput: handleInput,
                                          onSelect: handleSelect,
                                          onCompositionstart: handleCompositionStart,
                                          onCompositionend: handleCompositionEnd
                                      },
                                      null,
                                      PatchFlags.PROPS,
                                      ['type', 'maxlength', 'value', 'disabled']
                                  ),
                            showPlaceholder.value ? createElementVNode('div', { class: 'mc-input-placeholder' }, [propsMergeSlots<InputProps, 'placeholder'>(props, slots, 'placeholder')]) : null
                        ]),
                        showTextareaSuffix.value
                            ? createElementVNode('div', { class: 'mc-input__suffix' }, [wordCountVNode()])
                            : showInputSuffix.value
                            ? createElementVNode('div', { class: 'mc-input__suffix' }, [
                                  slots['suffix'] ? createElementVNode('span', { class: 'mc-input-suffix-content' }, [renderSlot(slots, 'suffix')]) : null,
                                  and(clearable, not(disabled)).value ? clearIconVNode() : null,
                                  and(type.value === 'password', passwordVisible.value !== 'none', not(disabled)).value ? passwordEyeVnode() : null,
                                  loading.value ? createComponentVNode(McBaseLoading, { size: 14, stroke: 24 }) : null,
                                  wordCount.value ? wordCountVNode() : null
                              ])
                            : null
                    ]),
                    slots['append'] ? createElementVNode('div', { class: 'mc-input-append' }, [renderSlot(slots, 'append')]) : null
                ],
                PatchFlags.CLASS | PatchFlags.STYLE
            );
    }
});
