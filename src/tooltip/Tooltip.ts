import { ref, toRefs, renderSlot, createVNode, createTextVNode, mergeProps, FunctionalComponent, defineComponent, Fragment } from 'vue';
import { McPopover, PopoverBaseProps } from '../popover';
import './style.scss';

interface Props extends PopoverBaseProps {
    content?: string;
}

const Tooltip: FunctionalComponent<Props> = (props, { slots, attrs }) => {
    const { content = '' } = props;
    const popoverMergedProps = mergeProps(
        {
            class: 'mc-tooltip'
        },
        attrs
    );
    console.log(content);

    return createVNode(McPopover, popoverMergedProps, {
        default: () => renderSlot(slots, 'default'),
        content: () => [createTextVNode(content), renderSlot(slots, 'test')]
    });
};
Tooltip.props = ['content'];

export default Tooltip;

// export default defineComponent({
//     props: {
//         content: {
//             type: String,
//             default: ''
//         }
//     },
//     setup(props, { slots, attrs }) {
//         const { content } = toRefs(props);
//         const popoverMergedProps = mergeProps(
//             {
//                 class: 'mc-tooltip'
//             },
//             attrs
//         );

//         return () => {
//             return createVNode(McPopover, popoverMergedProps, {
//                 default: () => renderSlot(slots, 'default'),
//                 content: () => [createTextVNode(content.value), renderSlot(slots, 'test')]
//             });
//         };
//     }
// });
