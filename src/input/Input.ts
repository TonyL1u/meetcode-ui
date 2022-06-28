import { defineComponent, onMounted, ref, computed, toRefs, watch, nextTick, renderSlot, getCurrentInstance, toRaw } from 'vue';
import { or, and, not, isDefined, onStartTyping } from '@vueuse/core';
import { useThemeRegister, createElementVNode, createComponentVNode, createFragment, createTextVNode, propsMergeSlots, PatchFlags } from '../_utils_';
import { mainCssr, lightCssr, darkCssr } from './styles';
import { inputProps } from './interface';
import { McIcon } from '../icon';
import { McBaseLoading } from '../_internal_';
import { Infinite, CloseCircle, EyeOffOutline, EyeOutline } from '@vicons/ionicons5';
import type { VNodeChild } from 'vue';
import type { InputProps, InputPlaceholder } from './interface';
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
        const { value: valueVM, type, placeholder, disabled, focusOnTyping, autosize, resizable, clearable, wordCount, loading, passwordVisible, minRows, maxRows, maxLength, inputLimits, composed, inputCount, separator } = toRefs(props);

        // TODO:Error throwing utils
        // diagnosis composed input
        if (composed.value) {
            if (!Array.isArray(valueVM.value)) {
                throw new Error('[McInput]: Make sure provide an Array when using composed input.');
            } else if (valueVM.value.length !== inputCount.value) {
                throw new Error(`[McInput]: Make sure the length of the binding value you provide is equal to the inputCount value. value length: ${valueVM.value.length}, inputCount: ${inputCount.value}`);
            }
        }

        const internalValue = composed.value ? ref(new Array(inputCount.value).fill('') as string[]) : ref('');
        const mergedValue = isDefined(valueVM) ? valueVM : internalValue;
        const valueLength = computed(() => (composed.value ? (mergedValue.value as string[]).reduce((pre, cur) => pre + cur).length : mergedValue.value.toString().length));

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
            if (and(not(isFocused), focusOnTyping, not(disabled)).value) {
                focus(composed.value ? 0 : undefined);
            }
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

                emit('update:value', toRaw(valueVM), value, index);
                emit('input', toRaw(valueVM), value, index);
            } else {
                if (index !== void 0) {
                    (mergedValue.value as string[])[index] = value;
                } else if (value === '') {
                    (mergedValue.value as string[]).fill('');
                }

                emit('input', value, index);
            }
        };
        const clear = () => {
            composed.value ? updateMultipleValue('') : updateValue('');
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
            emit('focus', index);
        };
        const handleBlur = (payload: Event, index?: number) => {
            isFocused.value = false;
            emit('blur', index);
        };
        const handleChange = (payload: Event, index?: number) => {
            const value = (composed.value ? inputInstsList.value?.[index!]?.value : inputInst.value?.value) || '';
            emit('change', value, index);
        };
        const handleInput = (payload: Event, index?: number) => {
            if (composed.value ? (isCompositing.value as boolean[])[index!] : (isCompositing.value as boolean)) return;

            const value = (composed.value ? inputInstsList.value?.[index!]?.value : inputInst.value?.value) || '';
            if (validateInput(value, payload) || value === '') {
                composed.value ? updateMultipleValue(value, index) : updateValue(value);
            } else {
                instance?.proxy?.$forceUpdate();
            }
        };
        const handleSelect = (payload: Event, index?: number) => {
            const { selectionStart, selectionEnd, value = '' } = (composed.value ? inputInstsList.value?.[index!] : inputInst.value) ?? {};
            emit('text-select', value.slice(selectionStart || 0, selectionEnd || 0), index);
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
        const validateInput = (value: string, event: Event) => {
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
                maxLength.value ? `${valueLength.value} / ${maxLength.value}` : createFragment([createTextVNode(`${valueLength.value} / `, true), createComponentVNode(McIcon, { icon: Infinite, style: 'margin-left: 3px' })])
            ]);
        };
        const clearIconVNode = () => {
            return createComponentVNode(
                McIcon,
                {
                    icon: CloseCircle,
                    class: 'mc-input-clear-icon',
                    style: { opacity: +and(valueLength.value !== 0, or(isFocused, isHovered)).value },
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
                        composed.value ? multipleInnerVNode() : innerVNode(mergedValue.value as string, propsMergeSlots<InputProps, 'placeholder'>(props, slots, 'placeholder')),
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
