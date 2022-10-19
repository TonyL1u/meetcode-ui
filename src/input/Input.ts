import { defineComponent, onMounted, ref, computed, toRefs, watch, nextTick, renderSlot, getCurrentInstance, toRaw, inject } from 'vue';
import { or, and, not, isDefined, onStartTyping, createEventHook } from '@vueuse/core';
import { useThemeRegister, createElementVNode, createComponentVNode, createFragment, createTextVNode, createTransition, createDirectives, propsMergeSlots, PatchFlags, setColorAlpha } from '../_utils_';
import { mainCssr, lightCssr, darkCssr } from './styles';
import { inputProps, inputIKey, inputGroupInjectionKey } from './interface';
import { McIcon } from '../icon';
import { McBaseLoading } from '../_internal_';
import { Infinite, CloseCircle, EyeOffOutline, EyeOutline } from '@vicons/ionicons5';
import type { VNodeChild } from 'vue';
import type { InputProps, InputPlaceholder, InputSizeMap, InputValidTrigger, InputValidRule } from './interface';
import * as CSS from 'csstype';

const SIZE_MAP: InputSizeMap = {
    small: {
        wrapperPaddingX: 10,
        fontSize: 12,
        innerPaddingY: 4.5,
        innerLineHeight: 17,
        padding: '10px',
        wordCountFontSize: '10px',
        addonMargin: '4px'
    },
    medium: {
        wrapperPaddingX: 12,
        fontSize: 14,
        innerPaddingY: 5.5,
        innerLineHeight: 21,
        padding: '12px',
        wordCountFontSize: '12px',
        addonMargin: '4px'
    },
    large: {
        wrapperPaddingX: 14,
        fontSize: 16,
        innerPaddingY: 6.5,
        innerLineHeight: 25,
        padding: '14px',
        wordCountFontSize: '14px',
        addonMargin: '6px'
    }
};

export default defineComponent({
    name: 'Input',
    iKey: inputIKey,
    props: inputProps,
    emits: ['update:value', 'focus', 'blur', 'change', 'input', 'select', 'clear', 'password-visible-change', 'validate'],
    setup(props, { slots, emit, expose }) {
        // theme register
        onMounted(() => {
            useThemeRegister({
                key: 'Input',
                main: mainCssr,
                light: lightCssr,
                dark: darkCssr
            });
        });
        const instance = getCurrentInstance();
        const { value: valueVM, type, size, placeholder, disabled, focusOnTyping, autosize, resizable, clearable, wordCount, loading, passwordVisible, minRows, maxRows, maxLength, inputLimits, composed, inputCount, separator, rules } = toRefs(props);

        // TODO: Error throwing utils
        // diagnosis composed input
        if (composed.value) {
            if (!Array.isArray(valueVM.value)) {
                throw new Error('[McInput]: Make sure provide an Array when using composed input.');
            } else if (valueVM.value.length !== inputCount.value) {
                throw new Error(`[McInput]: Make sure the length of the binding value you provide is equal to the inputCount value. value length: ${valueVM.value.length}, inputCount: ${inputCount.value}`);
            }
        }
        const { validStatus, updateValidStatus } = inject(inputGroupInjectionKey, null) ?? {};
        const internalValue = composed.value ? ref(new Array(inputCount.value).fill('') as string[]) : ref('');
        const mergedValue = isDefined(valueVM) ? valueVM : internalValue;
        const valueLength = computed(() => (composed.value ? (mergedValue.value as string[]).reduce((pre, cur) => pre + cur).length : mergedValue.value.toString().length));

        const inputRootElRef = ref<HTMLInputElement>();
        const inputElRef = ref<HTMLInputElement>();
        const textareaElRef = ref<HTMLTextAreaElement>();
        const inputInst = computed(() => (type.value === 'textarea' ? textareaElRef.value : inputElRef.value));
        const inputElRefsList = ref<HTMLInputElement[]>();
        const textareaElRefsList = ref<HTMLTextAreaElement[]>();
        const inputInstsList = computed(() => (type.value === 'textarea' ? textareaElRefsList.value : inputElRefsList.value));

        const isHovered = ref(false);
        const isFocused = ref(false);
        const isShowPassword = ref(false);
        const isCompositing = composed.value ? ref(new Array(inputCount.value).fill(false) as boolean[]) : ref(false);

        const showPlaceholder = and(not(mergedValue), or(placeholder, slots['placeholder']), not(isCompositing));
        const showInputSuffix = and(type.value !== 'textarea', or(wordCount, loading, and(clearable, not(disabled)), and(type.value === 'password', passwordVisible.value !== 'none', not(disabled)), slots['suffix']));
        const showTextareaSuffix = and(type.value === 'textarea', wordCount);

        const textareaMinHeight = computed(() => SIZE_MAP[size.value!].innerLineHeight * (minRows.value || 1) + SIZE_MAP[size.value!].innerPaddingY * 2);
        const textareaMaxHeight = computed(() => SIZE_MAP[size.value!].innerLineHeight * (maxRows.value || 1) + SIZE_MAP[size.value!].innerPaddingY * 2);
        const textareaAutosizeHeight = ref(textareaMinHeight.value);
        const inputAutosizeWidth = ref(0);

        const validateHook = createEventHook<{ trigger?: InputValidTrigger; value?: string | string[]; index?: number }>();
        const errorMessage = ref('');
        const mergedValid = isDefined(validStatus) ? validStatus : ref(true);

        const cssVars = computed<CSS.Properties>(() => {
            const { fontSize, innerPaddingY, innerLineHeight, wrapperPaddingX, padding, wordCountFontSize, addonMargin } = SIZE_MAP[size.value!] ?? SIZE_MAP.medium;

            return {
                '--input-textarea-resizable': resizable.value ? 'vertical' : 'none',
                '--input-textarea-min-height': `${textareaMinHeight.value}px`,
                '--input-textarea-max-height': maxRows.value ? `${textareaMaxHeight.value}px` : '',
                '--input-textarea-autosize-height': `${textareaAutosizeHeight.value}px`,
                '--input-autosize-width': inputAutosizeWidth.value ? `${inputAutosizeWidth.value}px` : '0px',
                '--input-font-size': `${fontSize}px`,
                '--input-el-padding': `${innerPaddingY}px 0px`,
                '--input-el-line-height': `${innerLineHeight}px`,
                '--input-wrapper-padding': `0px ${wrapperPaddingX}px`,
                '--input-padding': padding,
                '--input-height': `${innerPaddingY * 2 + innerLineHeight}px`,
                '--input-word-count-font-size': wordCountFontSize,
                '--input-prefix-margin': addonMargin,
                '--input-suffix-margin': addonMargin,
                '--input-border-color': mergedValid.value ? '#e0e0e6' : '#dc2626',
                '--input-active-border-color': mergedValid.value ? '#10b981' : '#dc2626',
                '--input-state-border-shadow-color': setColorAlpha(mergedValid.value ? '#10b981' : '#dc2626', 0.4)
            };
        });

        // some helpers
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

            // TODO: autosize when composed
            nextTick(() => {
                if (inputInst.value) {
                    const { scrollWidth } = inputInst.value;
                    inputAutosizeWidth.value = scrollWidth;
                }
            });
        };
        const autosizeWatcher = () => {
            if (not(autosize).value) return;

            if (type.value === 'textarea') {
                adjustTextareaHeight();
            } else {
                adjustInputWidth();
            }
        };
        const checkInput = (value: string, event: Event) => {
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
        const validateInput = async (rule: InputValidRule, value: string | string[] = mergedValue.value || '', index?: number) => {
            const { regExp, validator, required, message } = rule;
            if (validator) {
                const result = await validator(value, index);
                updateValidation(Object.prototype.toString.call(result) !== '[object Error]', (result as Error)?.message ?? '');
            } else if (regExp && typeof value === 'string') {
                const result = regExp.test(value);
                updateValidation(result, message || '');
            } else if (required) {
                const result = !!value;
                updateValidation(result, message || '');
            }
        };

        // watchers
        watch(mergedValue, autosizeWatcher, {
            immediate: true
        });
        watch(isShowPassword, flag => {
            emit('password-visible-change', flag);
        });
        onStartTyping(() => {
            if (and(not(isFocused), focusOnTyping, not(disabled)).value) {
                focus(composed.value ? 0 : void 0);
            }
        });
        validateHook.on(({ trigger, value, index }) => {
            const rulesList = (trigger ? rules.value?.filter(rule => rule.trigger?.includes(trigger)) : rules.value) ?? [];
            rulesList.forEach(rule => validateInput(rule, value, index));
        });

        const updateValue = (value: string) => {
            if (isDefined(valueVM)) {
                emit('update:value', value);
            } else {
                mergedValue.value = value;
            }

            emit('input', value);
        };
        const updateMultipleValue = (value: string, index?: number) => {
            if (isDefined(valueVM)) {
                if (index !== void 0) {
                    (valueVM.value as string[])[index] = value;
                } else if (value === '') {
                    (valueVM.value as string[]).fill('');
                }

                emit('update:value', toRaw(valueVM.value), index);
                emit('input', toRaw(valueVM.value), index);
            } else {
                if (index !== void 0) {
                    (mergedValue.value as string[])[index] = value;
                } else if (value === '') {
                    (mergedValue.value as string[]).fill('');
                }

                emit('input', value, index);
            }
        };
        const updateValidation = (status: boolean, message: string) => {
            if (isDefined(validStatus)) {
                updateValidStatus!(status);
            } else {
                mergedValid.value = status;
            }
            errorMessage.value = message;
            emit('validate', status, message);
        };
        const focus = (index?: number) => {
            if (index === void 0) {
                inputInst.value?.focus();
            } else {
                inputElRefsList.value?.[index].focus();
            }
        };
        const blur = (index?: number) => {
            if (index === void 0) {
                inputInst.value?.blur();
            } else {
                inputElRefsList.value?.[index].blur();
            }
        };
        const select = (index?: number) => {
            if (index === void 0) {
                inputInst.value?.select();
            } else {
                inputElRefsList.value?.[index].select();
            }
        };

        // event methods
        const handleFocus = (payload: Event, index?: number) => {
            isFocused.value = true;
            validateHook.trigger({ trigger: 'focus', value: mergedValue.value, index });
            emit('focus', index);
        };
        const handleBlur = (payload: Event, index?: number) => {
            isFocused.value = false;
            validateHook.trigger({ trigger: 'blur', value: mergedValue.value, index });
            emit('blur', index);
        };
        const handleChange = (payload: Event, index?: number) => {
            const value = (composed.value ? inputInstsList.value?.[index!]?.value : inputInst.value?.value) || '';
            validateHook.trigger({ trigger: 'change', value, index });
            emit('change', value, index);
        };
        const handleInput = (payload: Event, index?: number) => {
            if (composed.value ? (isCompositing.value as boolean[])[index!] : (isCompositing.value as boolean)) return;

            const value = (composed.value ? inputInstsList.value?.[index!]?.value : inputInst.value?.value) || '';
            if (checkInput(value, payload) || value === '') {
                validateHook.trigger({ trigger: 'input', value, index });
                composed.value ? updateMultipleValue(value, index) : updateValue(value);
            } else {
                instance?.proxy?.$forceUpdate();
            }
        };
        const handleSelect = (payload: Event, index?: number) => {
            const { selectionStart, selectionEnd, value = '' } = (composed.value ? inputInstsList.value?.[index!] : inputInst.value) ?? {};
            const selectedValue = value.slice(selectionStart || 0, selectionEnd || 0);
            validateHook.trigger({ trigger: 'select', value: selectedValue, index });
            emit('select', selectedValue, index);
        };
        const handleClear = () => {
            validateHook.trigger({ trigger: 'clear', value: '' });
            composed.value ? updateMultipleValue('') : updateValue('');
            emit('clear');
        };
        const handleCompositionStart = (payload: CompositionEvent, index?: number) => {
            if (index !== void 0) {
                (isCompositing.value as boolean[])[index] = true;
            } else {
                isCompositing.value = true;
            }
        };
        const handleCompositionEnd = (payload: CompositionEvent, index?: number) => {
            if (index !== void 0) {
                (isCompositing.value as boolean[])[index] = false;
            } else {
                isCompositing.value = false;
            }

            handleInput(payload, index);
        };

        // vnodes
        const inputVNode = (value: string, index?: number) => {
            return createElementVNode(
                'input',
                {
                    ref_for: composed.value,
                    ref_key: composed.value ? 'inputElRefsList' : 'inputElRef',
                    ref: composed.value ? inputElRefsList : inputElRef,
                    class: 'mc-input-el',
                    type: isShowPassword.value ? 'text' : type.value,
                    value,
                    maxlength: maxLength.value,
                    disabled: disabled.value,
                    onFocus: payload => handleFocus(payload, index),
                    onBlur: payload => handleBlur(payload, index),
                    onChange: payload => handleChange(payload, index),
                    onInput: payload => handleInput(payload, index),
                    onSelect: payload => handleSelect(payload, index),
                    onCompositionstart: payload => handleCompositionStart(payload, index),
                    onCompositionend: payload => handleCompositionEnd(payload, index)
                },
                null,
                PatchFlags.PROPS,
                ['type', 'maxlength', 'value', 'disabled']
            );
        };
        const textareaVNode = () => {
            return createElementVNode(
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
            );
        };
        const innerVNode = (value: string, placeholder: InputPlaceholder | VNodeChild, index?: number) => {
            const mergedShowPlaceholder = composed.value ? and(not(mergedValue.value[index!]), !!placeholder, not((isCompositing.value as boolean[])[index!])).value : (showPlaceholder.value as boolean);

            return createElementVNode('div', { class: 'mc-input__inner' }, [
                type.value === 'textarea' ? textareaVNode() : inputVNode(value, index),
                mergedShowPlaceholder ? createElementVNode('div', { class: 'mc-input-placeholder' }, [placeholder]) : null
            ]);
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
                maxLength.value ? `${valueLength.value} / ${maxLength.value}` : createFragment([createTextVNode(`${valueLength.value} / `, true), createComponentVNode(McIcon, { icon: Infinite, style: 'margin-left: 3px' }, null, PatchFlags.HOISTED)])
            ]);
        };
        const clearIconVNode = () => {
            const showIcon = and(valueLength.value > 0, or(isFocused, isHovered)).value;

            return createComponentVNode(
                McIcon,
                {
                    icon: CloseCircle,
                    class: 'mc-input-clear-icon',
                    style: showIcon ? { opacity: 1, cursor: 'pointer' } : {},
                    onClick: handleClear
                },
                null,
                PatchFlags.PROPS,
                ['style']
            );
        };
        const multipleInnerVNode = () => {
            function createCountArray<T>(value: T | T[], count: number): T[] {
                return Array.isArray(value) ? (value.length >= count ? value.slice(0, count) : [...value, ...new Array(count - value.length).fill('')]) : new Array(count).fill(value ?? '');
            }
            const separators = createCountArray(separator.value, (inputCount.value || 2) - 1);
            const placeholders = createCountArray(placeholder.value, inputCount.value || 2);

            // TODO: add key
            return createFragment(
                new Array(2 * inputCount.value! - 1).fill(null).map((item, index) => {
                    if (index % 2 === 0) return innerVNode(mergedValue.value[index >> 1], placeholders[index >> 1], index >> 1);
                    return createElementVNode('div', { class: 'mc-input__separator' }, separators[(index - 1) >> 1], PatchFlags.TEXT);
                })
            );
        };

        expose({
            el: inputRootElRef,
            focus,
            blur,
            select,
            resize: () => {
                if (composed.value) return;

                autosizeWatcher();
            },
            setPasswordVisible: (visible: boolean) => {
                isShowPassword.value = visible;
            },
            reset: () => {
                updateValidation(true, '');
            },
            async validate(trigger?: InputValidTrigger | ((isValid: boolean) => void), callback?: (isValid: boolean) => void) {
                if (typeof trigger === 'string') {
                    validateHook.trigger({ trigger, value: trigger === 'clear' ? '' : mergedValue.value });
                    await nextTick();
                    callback && callback(mergedValid.value);
                } else {
                    validateHook.trigger({});
                    await nextTick();
                    trigger && trigger(mergedValid.value);
                }

                return mergedValid.value;
            }
        });

        return () =>
            createElementVNode(
                'div',
                {
                    ref_key: 'inputRootElRef',
                    ref: inputRootElRef,
                    class: [
                        'mc-input',
                        `mc-input--${type.value}`,
                        {
                            'mc-input--disabled': disabled.value,
                            'mc-input--focused': isFocused.value,
                            'mc-input--autosize': autosize.value,
                            'mc-input--resizable': and(type.value === 'textarea', resizable).value,
                            'mc-input--with-prepend': !!slots['prepend'],
                            'mc-input--with-append': !!slots['append'],
                            'mc-input--composed': composed.value
                        }
                    ],
                    style: cssVars.value,
                    onMousedown: payload => {
                        if (disabled.value) return;

                        const { tagName } = payload.target as HTMLElement;
                        if (tagName !== 'INPUT' && tagName !== 'TEXTAREA') {
                            payload.preventDefault();
                            // TODO: when click the composed input, show auto focus on the nearest child input
                            if (not(isFocused).value) focus(composed.value ? 0 : void 0);
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
                        composed.value ? multipleInnerVNode() : innerVNode(mergedValue.value as string, propsMergeSlots<InputProps, 'placeholder'>(props, slots, 'placeholder')),
                        showTextareaSuffix.value
                            ? createElementVNode('div', { class: 'mc-input__suffix' }, [wordCountVNode()])
                            : showInputSuffix.value
                            ? createElementVNode('div', { class: 'mc-input__suffix' }, [
                                  // TODO: add slot data, e.g. isValid
                                  slots['suffix'] ? createElementVNode('span', { class: 'mc-input-suffix-content' }, [renderSlot(slots, 'suffix')]) : null,
                                  and(clearable, not(disabled)).value ? clearIconVNode() : null,
                                  and(type.value === 'password', passwordVisible.value !== 'none', not(disabled)).value ? passwordEyeVnode() : null,
                                  loading.value ? createComponentVNode(McBaseLoading, { size: 14, stroke: 24 }, null, PatchFlags.HOISTED) : null,
                                  wordCount.value ? wordCountVNode() : null
                              ])
                            : null
                    ]),
                    slots['append'] ? createElementVNode('div', { class: 'mc-input-append' }, [renderSlot(slots, 'append')]) : null,
                    createTransition(
                        'SlideInFromTop',
                        { opacity: 0, transform: 'translateY(-3px)' },
                        {
                            default: () =>
                                createDirectives('v-if', {
                                    condition: not(mergedValid).value,
                                    node: createElementVNode('div', { class: 'mc-input-valid-message' }, errorMessage.value, PatchFlags.TEXT)
                                })
                        }
                    )
                ],
                PatchFlags.CLASS | PatchFlags.STYLE
            );
    }
});
