import { defineComponent, createVNode, toRefs } from 'vue';
import { flattenWithOptions } from '../_utils_';
import { buttonIKey, ButtonProps, buttonGroupProps } from './interface';

export default defineComponent({
    name: 'ButtonGroup',
    props: buttonGroupProps,
    setup(props, { slots }) {
        const { size } = toRefs(props);
        return () => {
            const buttons = flattenWithOptions<ButtonProps>({ slots, identificationKey: buttonIKey });

            return createVNode(
                'div',
                { class: 'mc-button-group', role: 'group' },
                buttons.map(button => {
                    return createVNode(button, {
                        size: size.value
                    });
                })
            );
        };
    }
});
