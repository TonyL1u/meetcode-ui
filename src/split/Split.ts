import { ref, computed, toRefs, useSlots, createVNode, provide, onUnmounted, defineComponent } from 'vue';
import { useElementBounding, useEventBus, EventBusKey } from '@vueuse/core';
import { flatten, SpecificVNode } from '../_utils_';
import McSplitter from './Splitter';
import { splitInjectionKey, SplitIKey, SplitPaneIKey, SplitPaneProps, SplitterProps, ResizeBusArgs } from './interface';
import type { StyleValue } from 'vue';

export default defineComponent({
    name: 'Split',
    iKey: SplitIKey,
    props: {
        horizontal: {
            type: Boolean,
            default: false
        }
    },
    setup(props, { slots }) {
        const { horizontal } = toRefs(props);
        const splitElRef = ref<HTMLElement>();
        const { width } = useElementBounding(splitElRef);
        const splitPaneInitialWidth = ref<string>('0');
        const cssVars = computed<StyleValue>(() => {
            return {
                '--split-pane-initial-width': `${splitPaneInitialWidth.value}%`
            };
        });

        const splitsVNode = computed(() => {
            const splitPanes = slots.default ? flatten<SplitPaneProps>(slots.default(), SplitPaneIKey) : null;

            if (!splitPanes) return null;
            splitPaneInitialWidth.value = (100 / splitPanes.length).toFixed(1);
            const splitters: SpecificVNode<SplitterProps>[] = new Array(splitPanes.length - 1).fill(null).map(() => createVNode(McSplitter));
            return new Array(2 * splitPanes.length - 1).fill(null).map((e, index) => {
                if (index % 2 === 0) return splitPanes[index >> 1];
                return splitters[(index - 1) >> 1];
            });
        });

        const ResizeEventBusKey: EventBusKey<ResizeBusArgs> = Symbol();
        const BusResize = useEventBus(ResizeEventBusKey);

        provide(splitInjectionKey, {
            parentWidth: width,
            splitPaneInitialWidth,
            BusResize
        });

        onUnmounted(() => {
            BusResize.reset();
        });

        return () =>
            createVNode(
                'div',
                {
                    ref: splitElRef,
                    class: ['mc-split', horizontal.value ? 'mc-split--horizontal' : 'mc-split--vertical'],
                    style: cssVars.value
                },
                [splitsVNode.value]
            );
    }
});
