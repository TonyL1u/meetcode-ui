import { defineComponent, onMounted, toRefs, createVNode, resolveComponent, CustomVNodeTypes, renderSlot } from 'vue';
import { getSlotFirstVNode, getSlotVNodeIndex, useThemeRegister } from '../_utils_';
import { layoutProps, layoutIKey, layoutHeaderIKey, layoutContentIKey, layoutFooterIKey, layoutSiderIKey, basicColumnLayoutComponentIKey, basicRowLayoutComponentIKey } from './interface';
import { createColumnLayout, createRowLayout } from './preset';
import { mainCssr, lightCssr, darkCssr } from './styles';

export default defineComponent({
    name: 'Layout',
    iKey: layoutIKey,
    props: layoutProps,
    setup(props, { slots }) {
        // theme register
        onMounted(() => {
            useThemeRegister({
                key: 'Layout',
                main: mainCssr,
                light: lightCssr,
                dark: darkCssr
            });
        });
        const {
            preset,
            siderRight,
            siderWidth,
            leftSiderWidth,
            rightSiderWidth,
            fixedSider,
            fixedLeftSider,
            fixedRightSider,
            fixedHeader,
            fixedFooter,
            siderStyle,
            leftSiderStyle,
            rightSiderStyle,
            siderClass,
            leftSiderClass,
            rightSiderClass,
            headerStyle,
            contentStyle,
            footerStyle,
            headerClass,
            contentClass,
            footerClass,
            showSider,
            showLeftSider,
            showRightSider,
            showHeader,
            showContent,
            showFooter
        } = toRefs(props);
        const McLayout = resolveComponent('McLayout', true);

        // main logic...
        return () => {
            if (preset.value === 'two-column') {
                return createColumnLayout(
                    {
                        siderPlacement: siderRight.value ? 'right' : 'left',
                        fixed: fixedSider.value,
                        siderWidth: siderWidth.value,
                        siderStyle: siderStyle.value,
                        siderClass: siderClass.value,
                        contentStyle: contentStyle.value,
                        contentClass: contentClass.value,
                        showSider: showSider.value,
                        showContent: showContent.value
                    },
                    {
                        sider: () => renderSlot(slots, 'sider'),
                        content: () => renderSlot(slots, 'content')
                    }
                );
            } else if (preset.value === 'three-column') {
                return createColumnLayout(
                    {
                        siderPlacement: 'left',
                        fixed: fixedLeftSider.value,
                        siderWidth: leftSiderWidth.value,
                        siderStyle: leftSiderStyle.value,
                        siderClass: leftSiderClass.value,
                        contentStyle: contentStyle.value,
                        contentClass: contentClass.value,
                        showSider: showLeftSider.value,
                        showContent: showContent.value
                    },
                    {
                        sider: () => renderSlot(slots, 'left-sider'),
                        content: () =>
                            createColumnLayout(
                                {
                                    siderPlacement: 'right',
                                    fixed: fixedRightSider.value,
                                    siderWidth: rightSiderWidth.value,
                                    siderStyle: rightSiderStyle.value,
                                    siderClass: rightSiderClass.value,
                                    contentStyle: contentStyle.value,
                                    contentClass: contentClass.value,
                                    showSider: showRightSider.value,
                                    showContent: showContent.value
                                },
                                {
                                    sider: () => renderSlot(slots, 'right-sider'),
                                    content: () => renderSlot(slots, 'content')
                                }
                            )
                    }
                );
            } else if (preset.value === 'full') {
                return createRowLayout(
                    {
                        headerStyle: headerStyle.value,
                        contentStyle: contentStyle.value,
                        footerStyle: footerStyle.value,
                        headerClass: headerClass.value,
                        contentClass: contentClass.value,
                        footerClass: footerClass.value,
                        fixedHeader: fixedHeader.value,
                        fixedFooter: fixedFooter.value,
                        showHeader: showHeader.value,
                        showContent: showContent.value,
                        showFooter: showFooter.value
                    },
                    {
                        header: () => renderSlot(slots, 'header'),
                        content: () => renderSlot(slots, 'content'),
                        footer: () => renderSlot(slots, 'footer')
                    }
                );
            } else if (preset.value === 'holy') {
                return createRowLayout(
                    {
                        headerStyle: headerStyle.value,
                        contentStyle: contentStyle.value,
                        footerStyle: footerStyle.value,
                        headerClass: headerClass.value,
                        contentClass: contentClass.value,
                        footerClass: footerClass.value,
                        fixedHeader: fixedHeader.value,
                        fixedFooter: fixedFooter.value,
                        showHeader: showHeader.value,
                        showContent: showContent.value,
                        showFooter: showFooter.value
                    },
                    {
                        header: () => renderSlot(slots, 'header'),
                        content: () =>
                            createColumnLayout(
                                {
                                    siderPlacement: 'left',
                                    fixed: fixedLeftSider.value,
                                    siderWidth: leftSiderWidth.value,
                                    siderStyle: leftSiderStyle.value,
                                    siderClass: leftSiderClass.value,
                                    contentStyle: contentStyle.value,
                                    contentClass: contentClass.value,
                                    showSider: showLeftSider.value,
                                    showContent: showContent.value
                                },
                                {
                                    sider: () => renderSlot(slots, 'left-sider'),
                                    content: () =>
                                        createColumnLayout(
                                            {
                                                siderPlacement: 'right',
                                                fixed: fixedRightSider.value,
                                                siderWidth: rightSiderWidth.value,
                                                siderStyle: rightSiderStyle.value,
                                                siderClass: rightSiderClass.value,
                                                contentStyle: contentStyle.value,
                                                contentClass: contentClass.value,
                                                showSider: showRightSider.value,
                                                showContent: showContent.value
                                            },
                                            {
                                                sider: () => renderSlot(slots, 'right-sider'),
                                                content: () => renderSlot(slots, 'content')
                                            }
                                        )
                                }
                            ),
                        footer: () => renderSlot(slots, 'footer')
                    }
                );
            }

            const headerVNode = getSlotFirstVNode(slots.default, layoutHeaderIKey);
            const contentVNode = getSlotFirstVNode(slots.default, layoutContentIKey);
            const footerVNode = getSlotFirstVNode(slots.default, layoutFooterIKey);
            const layoutVNode = getSlotFirstVNode(slots.default, layoutIKey);
            const siderVNode = getSlotFirstVNode(slots.default, layoutSiderIKey);
            const basicColumnLayoutVNode = getSlotFirstVNode(slots.default, basicColumnLayoutComponentIKey);
            const basicRowLayoutVNode = getSlotFirstVNode(slots.default, basicRowLayoutComponentIKey);

            const needExtraLayout = siderVNode && !layoutVNode && (headerVNode || footerVNode);
            const children = [
                !needExtraLayout ? headerVNode : null,
                needExtraLayout ? createVNode(McLayout, null, { default: () => [headerVNode, contentVNode, footerVNode] }) : (basicColumnLayoutVNode || basicRowLayoutVNode) ?? layoutVNode ?? contentVNode,
                !needExtraLayout ? footerVNode : null
            ];

            if (siderVNode) {
                const siderIndex = getSlotVNodeIndex(slots.default, (siderVNode?.type as CustomVNodeTypes)?.iKey);
                const layoutIndex = getSlotVNodeIndex(slots.default, (layoutVNode?.type as CustomVNodeTypes)?.iKey);
                const contentIndex = getSlotVNodeIndex(slots.default, (contentVNode?.type as CustomVNodeTypes)?.iKey);

                const compareCond = layoutIndex > -1 ? siderIndex > layoutIndex : contentIndex > -1 ? siderIndex > contentIndex : siderIndex === slots.default?.().length! - 1;
                if (compareCond) {
                    children.push(createVNode(siderVNode, { class: 'mc-layout-sider--right' }));
                } else {
                    children.unshift(createVNode(siderVNode, { class: 'mc-layout-sider--left' }));
                }
            }

            return createVNode('div', { class: ['mc-layout', siderVNode ? `mc-layout--with-sider` : ''] }, children);
        };
    }
});
