import { defineComponent, onMounted, toRefs, createVNode, resolveComponent, CustomVNodeTypes, renderSlot, FunctionalComponent } from 'vue';
import { getSlotFirstVNode, getSlotVNodeIndex, flatten, useThemeRegister } from '../_utils_';
import { layoutProps, layoutIKey, layoutHeaderIKey, layoutContentIKey, layoutFooterIKey, layoutSiderIKey } from './interface';
import LayoutHeader from './LayoutHeader';
import LayoutContent from './LayoutContent';
import LayoutFooter from './LayoutFooter';
import LayoutSider from './LayoutSider';
import { mainCssr } from './styles';

const twoColLayoutIKey = Symbol('twoColLayout');
const threeColLayoutIKey = Symbol('threeColLayout');
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
        const { preset, fixedHeader, fixedSider, fixedFooter, siderRight, siderWidth, headerStyle, contentStyle, footerStyle } = toRefs(props);
        const McLayout = resolveComponent('McLayout', true);

        const TwoColLayout: FunctionalComponent<{ siderPlacement: 'left' | 'right'; fixed: boolean }> = (props, { slots: internalSlots }) => {
            const { siderPlacement, fixed } = props;

            const children = [
                createVNode(
                    LayoutSider,
                    { class: { 'mc-layout-sider--fixed': siderPlacement === 'right' && fixed }, width: siderWidth.value },
                    {
                        default: internalSlots.sider ? () => renderSlot(internalSlots, 'sider') : null
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
        // @ts-ignore
        TwoColLayout.iKey = twoColLayoutIKey;

        const ThreeColLayout: FunctionalComponent<{ fixed: boolean }> = (props, { slots: internalSlots }) => {
            const { fixed } = props;

            return createVNode(McLayout, null, {
                default: () => [
                    createVNode(LayoutSider, null, {
                        default: internalSlots['left-sider'] ? () => renderSlot(internalSlots, 'left-sider') : null
                    }),
                    createVNode(
                        TwoColLayout,
                        { siderPlacement: 'right', fixed },
                        {
                            sider: internalSlots['right-sider'] ? () => renderSlot(internalSlots, 'right-sider') : null,
                            content: internalSlots.content ? () => renderSlot(internalSlots, 'content') : null
                        }
                    )
                ]
            });
        };

        const FullLayout: FunctionalComponent<{ fixedHeader: boolean; fixedFooter: boolean }> = (props, { slots: internalSlots }) => {
            const { fixedHeader, fixedFooter } = props;

            return createVNode(McLayout, { style: headerStyle.value }, [
                createVNode(LayoutHeader, null, {
                    default: () => renderSlot(slots, 'header')
                }),
                createVNode(LayoutContent, null, {
                    default: () => (fixedHeader || fixedFooter ? createVNode('div', { class: 'mc-layout-scroll-area', style: contentStyle.value }, [renderSlot(slots, 'content')]) : renderSlot(internalSlots, 'content'))
                }),
                createVNode(
                    LayoutFooter,
                    { style: footerStyle.value },
                    {
                        default: () => renderSlot(slots, 'footer')
                    }
                )
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
                        'left-sider': slots['left-sider'] ? () => renderSlot(slots, 'left-sider') : null,
                        content: slots['content'] ? () => renderSlot(slots, 'content') : null,
                        'right-sider': slots['right-sider'] ? () => renderSlot(slots, 'right-sider') : null
                    }
                );
            } else if (preset.value === 'full') {
                return createVNode(
                    FullLayout,
                    { fixedHeader: fixedHeader.value, fixedFooter: fixedFooter.value },
                    {
                        header: slots.header ? () => renderSlot(slots, 'header') : null,
                        content: slots.content ? () => renderSlot(slots, 'content') : null,
                        footer: slots.footer ? () => renderSlot(slots, 'footer') : null
                    }
                );
            }

            const headerVNode = getSlotFirstVNode(slots.default, layoutHeaderIKey);
            const contentVNode = getSlotFirstVNode(slots.default, layoutContentIKey);
            const footerVNode = getSlotFirstVNode(slots.default, layoutFooterIKey);
            const layoutVNode = getSlotFirstVNode(slots.default, layoutIKey);
            const siderVNode = getSlotFirstVNode(slots.default, layoutSiderIKey);
            const twoColLayoutVNode = getSlotFirstVNode(slots.default, twoColLayoutIKey);

            const needExtraLayout = siderVNode && !layoutVNode && (headerVNode || footerVNode);
            const children = [
                !needExtraLayout ? headerVNode : null,
                needExtraLayout ? createVNode(McLayout, null, { default: () => [headerVNode, contentVNode, footerVNode] }) : twoColLayoutVNode ?? layoutVNode ?? contentVNode,
                !needExtraLayout ? footerVNode : null
            ];

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
