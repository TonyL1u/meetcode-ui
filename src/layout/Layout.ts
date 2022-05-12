import { defineComponent, onMounted, toRefs, createVNode, resolveComponent, CustomVNodeTypes, renderSlot, FunctionalComponent } from 'vue';
import { getSlotFirstVNode, getSlotVNodeIndex, useThemeRegister } from '../_utils_';
import { layoutProps, layoutIKey, layoutHeaderIKey, layoutContentIKey, layoutFooterIKey, layoutSiderIKey } from './interface';
import LayoutHeader from './LayoutHeader';
import LayoutContent from './LayoutContent';
import LayoutFooter from './LayoutFooter';
import LayoutSider from './LayoutSider';
import { mainCssr } from './styles';

export default defineComponent({
    name: 'Layout',
    iKey: layoutIKey,
    props: layoutProps,
    setup(props, { slots }) {
        // theme register
        onMounted(() => {
            useThemeRegister({
                key: 'McLayout',
                main: mainCssr
            });
        });
        const { preset, fixedSider, siderRight, siderWidth, contentStyle } = toRefs(props);
        const McLayout = resolveComponent('McLayout', true);

        const TwoColLayout: FunctionalComponent<{ siderPlacement: 'left' | 'right'; fixed: boolean }> = (props, { slots: internalSlots }) => {
            const { siderPlacement, fixed } = props;
            console.log(internalSlots);
            const children = [
                createVNode(
                    LayoutSider,
                    { class: { 'mc-layout-sider--fixed': siderPlacement === 'right' && fixed }, width: siderWidth.value },
                    {
                        default: () => renderSlot(internalSlots, 'sider')
                    }
                ),
                createVNode(
                    LayoutContent,
                    { style: siderPlacement === 'right' && fixed ? { paddingRight: siderWidth.value + 'px', overflow: 'auto' } : {} },
                    {
                        default: () => (fixed ? createVNode('div', { class: 'mc-layout-scroll-area', style: contentStyle.value }, [renderSlot(slots, 'content')]) : renderSlot(internalSlots, 'content'))
                    }
                )
            ];

            siderPlacement === 'right' && children.reverse();
            return createVNode(McLayout, null, { default: () => children });
        };
        TwoColLayout.iKey = '666';

        const ThreeColLayout: FunctionalComponent<{ fixed: boolean }> = (props, { slots: internalSlots }) => {
            const { fixed } = props;
            console.log(internalSlots);

            return createVNode(McLayout, null, {
                default: () => [
                    createVNode(LayoutSider, null, {
                        default: () => renderSlot(internalSlots, 'left-sider')
                    }),
                    createVNode(
                        TwoColLayout,
                        { siderPlacement: 'right', fixed },
                        {
                            sider: () => renderSlot(internalSlots, 'right-sider'),
                            content: () => renderSlot(internalSlots, 'content')
                        }
                    )
                ]
            });
        };

        const fullLayout = () => {
            return createVNode(McLayout, null, [
                createVNode(LayoutHeader, null, {
                    default: () => renderSlot(slots, 'header')
                }),
                createVNode(LayoutContent, null, {
                    default: () => renderSlot(slots, 'content')
                }),
                createVNode(LayoutFooter, null, {
                    default: () => renderSlot(slots, 'footer')
                })
            ]);
        };

        // main logic...
        return () => {
            if (preset.value === 'two-col') {
                return createVNode(
                    TwoColLayout,
                    { siderPlacement: siderRight.value ? 'right' : 'left', fixed: fixedSider.value },
                    {
                        sider: () => renderSlot(slots, 'sider'),
                        content: () => renderSlot(slots, 'content')
                    }
                );
            } else if (preset.value === 'three-col') {
                return createVNode(
                    ThreeColLayout,
                    { fixed: fixedSider.value },
                    {
                        'left-sider': () => renderSlot(slots, 'left-sider'),
                        content: () => renderSlot(slots, 'content'),
                        'right-sider': () => renderSlot(slots, 'right-sider')
                    }
                );
            } else if (preset.value === 'full') {
                return fullLayout();
            }
            console.log(slots.default?.()[1]?.type.iKey);
            const headerVNode = getSlotFirstVNode(slots.default, layoutHeaderIKey);
            const contentVNode = getSlotFirstVNode(slots.default, layoutContentIKey);
            const footerVNode = getSlotFirstVNode(slots.default, layoutFooterIKey);
            const layoutVNode = getSlotFirstVNode(slots.default, layoutIKey);
            const siderVNode = getSlotFirstVNode(slots.default, layoutSiderIKey);
            const two = getSlotFirstVNode(slots.default, '666');
            console.log(two);
            const needExtraLayout = siderVNode && !layoutVNode && (headerVNode || footerVNode);
            const children = [!needExtraLayout ? headerVNode : null, needExtraLayout ? createVNode(McLayout, null, { default: () => [headerVNode, contentVNode, footerVNode] }) : two ?? layoutVNode ?? contentVNode, !needExtraLayout ? footerVNode : null];

            if (siderVNode) {
                const siderIndex = getSlotVNodeIndex(slots.default, (siderVNode?.type as CustomVNodeTypes)?.iKey);
                const layoutIndex = getSlotVNodeIndex(slots.default, (layoutVNode?.type as CustomVNodeTypes)?.iKey);
                const contentIndex = getSlotVNodeIndex(slots.default, (contentVNode?.type as CustomVNodeTypes)?.iKey);

                const compareCond = layoutIndex > -1 ? siderIndex > layoutIndex : contentIndex > -1 ? siderIndex > contentIndex : siderIndex === slots.default?.().length! - 1;
                if (compareCond) {
                    children.push(siderVNode);
                } else {
                    children.unshift(siderVNode);
                }
            }

            return createVNode('div', { class: ['mc-layout', siderVNode ? 'mc-layout--with-sider' : ''] }, children);
        };
    }
});
