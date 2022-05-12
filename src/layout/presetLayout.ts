import LayoutHeader from './LayoutHeader';
import LayoutContent from './LayoutContent';
import LayoutFooter from './LayoutFooter';
import LayoutSider from './LayoutSider';
import type { FunctionalComponent } from 'vue';

/**
 * 左右布局
 */
export const BasicLayoutComponent1: FunctionalComponent<{ siderPlacement: 'left' | 'right'; fixed: boolean }> = (props, { slots }) => {
    const { siderPlacement, fixed } = props;

    const children = [
        createVNode(
            LayoutSider,
            { class: { 'mc-layout-sider--fixed': siderPlacement === 'right' && fixed }, width: siderWidth.value },
            {
                default: internalSlots.sider ? () => renderSlot(slots, 'sider') : null
            }
        ),
        createVNode(
            LayoutContent,
            { style: { paddingRight: siderPlacement === 'right' && fixed ? siderWidth.value + 'px' : '', overflow: fixed && internalSlots.sider ? 'auto' : '' } },
            {
                default: internalSlots.content ? () => (fixed ? createVNode('div', { class: 'mc-layout-scroll-area', style: contentStyle.value }, [renderSlot(slots, 'content')]) : renderSlot(internalSlots, 'content')) : null
            }
        )
    ];

    siderPlacement === 'right' && children.reverse();
    return createVNode(McLayout, null, { default: () => children });
};
