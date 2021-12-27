import { ref, createVNode, useSlots, renderSlot, inject, defineComponent } from 'vue';
import { createKey } from '../_utils_';
import { splitInjectionKey, ResizeBusArgs, SplitPaneIKey } from './interface';

export default defineComponent({
    name: 'SplitPane',
    iKey: SplitPaneIKey,
    setup(props, { slots }) {
        const key = createKey('split-pane');
        const { parentWidth, splitPaneInitialWidth, BusResize } = inject(splitInjectionKey, null) ?? {};
        const widthPercentage = ref(splitPaneInitialWidth?.value);
        console.log(widthPercentage.value);

        const updateSize = ({ dragSize, prevPaneKey, nextPaneKey }: ResizeBusArgs) => {
            if (!parentWidth?.value) return;

            let calSize: number = 0;
            if (key === prevPaneKey) {
                calSize = (dragSize * 35) / parentWidth.value;
            } else if (key === nextPaneKey) {
                calSize = (-dragSize * 35) / parentWidth.value;
            }
            console.log(dragSize);
            console.log(calSize);
            widthPercentage.value = (+(widthPercentage.value || 0) + calSize).toString();
        };

        if (BusResize) {
            BusResize.on(updateSize);
        }

        return () =>
            createVNode(
                'div',
                {
                    class: 'mc-split-pane',
                    style: { width: widthPercentage.value + '%' },
                    'data-key': key
                },
                [renderSlot(slots, 'default')]
            );
    }
});
