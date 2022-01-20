import { defineComponent, createVNode, toRefs } from 'vue';
import { flattenWithOptions } from '../_utils_';
import { buttonIKey, ButtonProps, buttonGroupProps } from './interface';

export default defineComponent({
    name: 'ButtonGroup',
    props: buttonGroupProps,
    setup(props, { slots }) {
        const { type, size, disabled, ghost, dashed, render } = toRefs(props);
        return () => {
            const buttons = flattenWithOptions<ButtonProps>({ slots, identificationKey: buttonIKey });

            return createVNode(
                'div',
                { class: 'mc-button-group', role: 'group' },
                buttons.map(button => {
                    return createVNode(button, {
                        type: type.value,
                        size: size.value,
                        disabled: disabled.value,
                        ghost: ghost.value,
                        dashed: dashed.value,
                        render: render.value
                    });
                })
            );
        };
    }
});
