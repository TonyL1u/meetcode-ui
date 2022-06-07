import { defineComponent, createVNode, toRefs, renderList } from 'vue';
import { flattenWithOptions, PatchFlags } from '../_utils_';
import { buttonIKey, ButtonProps, buttonGroupProps } from './interface';

export default defineComponent({
    name: 'ButtonGroup',
    props: buttonGroupProps,
    setup(props, { slots }) {
        const { type, size, disabled, ghost, dashed, render, vertical } = toRefs(props);
        return () => {
            const buttons = flattenWithOptions<ButtonProps>({ slots, key: buttonIKey });

            return createVNode(
                'div',
                { class: ['mc-button-group', { 'mc-button-group--vertical': vertical.value }], role: 'group' },
                renderList(buttons, button => {
                    return createVNode(button, {
                        type: type.value,
                        size: size.value,
                        disabled: disabled.value,
                        ghost: ghost.value,
                        dashed: dashed.value,
                        render: render.value
                    });
                }),
                PatchFlags.CLASS | PatchFlags.UNKEYED_FRAGMENT
            );
        };
    }
});
