import { defineComponent, onMounted, toRefs, ref, computed, renderSlot } from 'vue';
import { or, and, not, isDefined } from '@vueuse/core';
import { useThemeRegister, createElementVNode, createComponentVNode, createKey, PatchFlags } from '../_utils_';
import { McBaseLoading } from '../_internal_';
import { McIconSwitchTransition } from '../_transition_';
import { mainCssr, lightCssr, darkCssr } from './styles';
import { switchProps } from './interface';
import * as CSS from 'csstype';

export default defineComponent({
    name: 'Switch',
    props: switchProps,
    emits: ['update:value', 'switch'],
    setup(props, { slots, emit }) {
        // theme register
        onMounted(() => {
            useThemeRegister({
                key: 'McSwitch',
                main: mainCssr,
                light: lightCssr,
                dark: darkCssr
            });
        });
        const key = createKey('switch');
        const { value: valueVM, disabled, checkedValue, uncheckedValue, checkedText, uncheckedText, checkedColor, uncheckedColor, handlerColor, textPlacement, square, checked, onBeforeSwitch, loading } = toRefs(props);
        const internalValue = ref(checked.value!);
        const mergedValue = isDefined(valueVM) ? valueVM : internalValue;
        const isChecked = computed(() => mergedValue.value === checkedValue.value);
        const cssVars = computed<CSS.Properties>(() => {
            return {
                '--switch-checked-color': checkedColor.value,
                '--switch-unchecked-color': uncheckedColor.value,
                '--switch-handler-color': handlerColor.value,
                '--switch-label-border-radius': square.value ? '3px' : '22px',
                '--switch-label-handler-border-radius': square.value ? '3px' : '18px'
            };
        });

        const handleChange = async () => {
            if (disabled.value) return;

            try {
                const callback = await onBeforeSwitch.value?.();
                if (callback || callback === undefined) {
                    const value = isChecked.value ? uncheckedValue.value! : checkedValue.value!;
                    if (isDefined(valueVM)) {
                        emit('update:value', value);
                    } else {
                        mergedValue.value = value;
                    }
                    emit('switch', value);
                }
            } catch (error) {}
        };

        // main logic...
        return () =>
            createElementVNode(
                'div',
                { class: ['mc-switch', { 'mc-switch--checked': isChecked.value, 'mc-switch--disabled': disabled.value }], style: cssVars.value },
                [
                    createElementVNode('input', { class: 'mc-switch-input', value: mergedValue.value, id: key, type: 'checkbox', checked: isChecked.value, disabled: disabled.value, onChange: handleChange }, null, PatchFlags.PROPS, [
                        'value',
                        'checked',
                        'disabled'
                    ]),
                    and(uncheckedText, textPlacement.value === 'both' || textPlacement.value === 'out').value ? createElementVNode('span', { class: 'mc-switch-label-text--left', onClick: handleChange }, uncheckedText.value, PatchFlags.TEXT) : null,
                    createElementVNode('label', { class: 'mc-switch-label', for: key }, [
                        and(textPlacement.value === 'both' || textPlacement.value === 'in', or(checkedText, uncheckedText)).value
                            ? createElementVNode('span', { class: 'mc-switch-label__content' }, (isChecked.value ? checkedText.value : uncheckedText.value) || '', PatchFlags.TEXT)
                            : null,
                        createElementVNode('div', { class: 'mc-switch-label__handler' }, [
                            createComponentVNode(McIconSwitchTransition, null, {
                                default: () => (loading.value ? createComponentVNode(McBaseLoading, { size: 14 }) : renderSlot(slots, 'icon'))
                            })
                        ])
                    ]),
                    and(checkedText, textPlacement.value === 'both' || textPlacement.value === 'out').value ? createElementVNode('span', { class: 'mc-switch-label-text--right', onClick: handleChange }, checkedText.value, PatchFlags.TEXT) : null
                ],
                PatchFlags.CLASS | PatchFlags.STYLE
            );
    }
});
