import { toRefs, computed, renderSlot, createVNode, defineComponent } from 'vue';
import * as CSS from 'csstype';
import { gridItemProps } from './interface';

export default defineComponent({
    name: 'GridItem',
    props: gridItemProps,
    setup(props, { slots }) {
        const { x, y, xSize, ySize, itemJustify, itemAlign } = toRefs(props);

        const cssVars = computed<CSS.Properties>(() => {
            return {
                '--grid-item-column-start': x?.value || '',
                '--grid-item-row-start': y?.value || '',
                '--grid-item-column-end': x?.value ? x.value + xSize.value! : '',
                '--grid-item-row-end': y?.value ? y.value + ySize.value! : '',
                '--grid-item-justify': itemJustify?.value || '',
                '--grid-item-align': itemAlign?.value || ''
            };
        });

        return () =>
            createVNode(
                'div',
                {
                    class: 'mc-grid-item',
                    style: cssVars.value
                },
                [renderSlot(slots, 'default')]
            );
    }
});
