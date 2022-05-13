import { createVNode, renderSlot } from 'vue';
import Layout from './Layout';
import LayoutHeader from './src/LayoutHeader';
import LayoutContent from './src/LayoutContent';
import LayoutFooter from './src/LayoutFooter';
import LayoutSider from './src/LayoutSider';
import { basicColumnLayoutComponentIKey, basicRowLayoutComponentIKey } from './interface';
import type { FunctionalComponent, VNodeChild } from 'vue';
import type { ElementClassSet, ElementStyleSet } from '../_utils_';

interface ColumnLayoutProps {
    siderPlacement?: 'left' | 'right';
    fixed?: boolean;
    siderWidth?: string | number;
    siderStyle?: ElementStyleSet;
    contentStyle?: ElementStyleSet;
    siderClass?: ElementClassSet;
    contentClass?: ElementClassSet;
    showSider?: boolean;
    showContent?: boolean;
}
type ColumnLayoutSlotName = 'sider' | 'content';
const BasicColumnLayoutComponent: FunctionalComponent<ColumnLayoutProps> = (props, { slots, attrs }) => {
    const { siderPlacement = 'left', fixed, siderWidth, siderStyle, contentStyle, contentClass, siderClass, showSider = true, showContent = true } = props;

    const children = [
        showSider
            ? createVNode(
                  LayoutSider,
                  { width: siderWidth, style: siderStyle, class: siderClass },
                  {
                      default: () => renderSlot(slots, 'sider')
                  }
              )
            : null,
        showContent
            ? createVNode(
                  LayoutContent,
                  { style: contentStyle, class: contentClass },
                  {
                      default: () => renderSlot(slots, 'content')
                  }
              )
            : null
    ];

    siderPlacement === 'right' && children.reverse();
    return createVNode(Layout, { style: { height: '100%' } }, { default: () => children });
};
// @ts-ignore
BasicColumnLayoutComponent.iKey = basicColumnLayoutComponentIKey;

interface RowLayoutComponentProps {
    fixedHeader?: boolean;
    fixedFooter?: boolean;
    headerStyle?: ElementStyleSet;
    contentStyle?: ElementStyleSet;
    footerStyle?: ElementStyleSet;
    headerClass?: ElementClassSet;
    contentClass?: ElementClassSet;
    footerClass?: ElementClassSet;
    showHeader?: boolean;
    showContent?: boolean;
    showFooter?: boolean;
}
type RowLayoutSlotName = 'header' | 'content' | 'footer';
const BasicRowLayoutComponent: FunctionalComponent<RowLayoutComponentProps> = (props, { slots }) => {
    const { showHeader = true, showContent = true, showFooter = true, headerStyle, contentStyle, footerStyle, headerClass, contentClass, footerClass } = props;

    return createVNode(Layout, null, {
        default: () => [
            showHeader ? createVNode(LayoutHeader, { class: headerClass, style: headerStyle }, { default: () => renderSlot(slots, 'header') }) : null,
            showContent ? createVNode(LayoutContent, { class: contentClass, style: contentStyle }, { default: () => renderSlot(slots, 'content') }) : null,
            showFooter ? createVNode(LayoutFooter, { class: footerClass, style: footerStyle }, { default: () => renderSlot(slots, 'footer') }) : null
        ]
    });
};
// @ts-ignore
BasicRowLayoutComponent.iKey = basicRowLayoutComponentIKey;

export function createColumnLayout(props?: ColumnLayoutProps, slots?: Partial<Record<ColumnLayoutSlotName, () => VNodeChild>>) {
    return createVNode(BasicColumnLayoutComponent, { class: 'mc-layout-column-preset', ...props }, slots);
}

export function createRowLayout(props?: RowLayoutComponentProps, slots?: Partial<Record<RowLayoutSlotName, () => VNodeChild>>) {
    return createVNode(BasicRowLayoutComponent, { class: 'mc-layout-row-preset', ...props }, slots);
}
