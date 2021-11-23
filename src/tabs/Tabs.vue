<script lang="ts" setup>
import { ref, toRefs, useSlots, computed, renderSlot, provide, createVNode, createTextVNode, CSSProperties, VNode } from 'vue';
import { getSlotFirstVNode, kebabCaseEscape } from '../_utils_';
import { tabsInjectionKey, tabPaneIKey, PaneName, TabPaneProps, OnTabSwitchImpl } from './interface';
import * as CSS from 'csstype';
import './style.scss';

interface Props {
    defaultTab?: PaneName;
    type?: 'line' | 'empty' | 'card' | 'segment';
    stretch?: boolean;
    inline?: boolean;
    tabGap?: number;
    defaultColor?: string;
    activeColor?: string;
    linePosition?: string;
    headerStyle?: CSSProperties;
    tabStyle?: CSSProperties;
    contentStyle?: CSSProperties;
    onTabSwitch?: OnTabSwitchImpl;
}
const props = withDefaults(defineProps<Props>(), {
    type: 'line',
    stretch: false,
    inline: false,
    tabGap: 0,
    defaultColor: '#000',
    activeColor: '#10b981',
    linePosition: 'bottom'
});
const emit = defineEmits<{
    (e: 'update:tab', value: PaneName): void;
    (e: 'tab:click', value: PaneName): void;
}>();

const slots = useSlots();
const { defaultTab, defaultColor, activeColor, stretch, tabGap, type, headerStyle, contentStyle, onTabSwitch } = toRefs(props);
// use tabPaneIKey, ensure non-tabPane element won't be rendered in header
const { firstVNode: firstTabPane, flattened: tabPanes } = getSlotFirstVNode<TabPaneProps>(slots.default, tabPaneIKey, true);
const activeTab = ref(defaultTab?.value ?? firstTabPane?.props?.name);
const cssVars = computed<CSS.Properties>(() => {
    return {
        '--tab-default-color': defaultColor.value,
        '--tab-active-color': activeColor.value,
        '--tab-pad': stretch.value ? 0 : tabGap.value / 2 + 'px'
    };
});

const callUpdateTab = (name: PaneName) => {
    activeTab.value = name;
    emit('update:tab', activeTab.value);
};

const handleClick = async (name: PaneName) => {
    emit('tab:click', name);
    // only update when value change
    if (activeTab.value !== name) {
        if (onTabSwitch?.value) {
            const { value: tabSwitch } = onTabSwitch;
            const callback = await tabSwitch(activeTab.value, name);
            if (callback) {
                callUpdateTab(name);
            }
        } else {
            callUpdateTab(name);
        }
    }
};

provide(tabsInjectionKey, activeTab);

const tabsHeaderVNode = computed(() => {
    if (!tabPanes || tabPanes.length === 0) return null;

    const barVNode = type.value === 'line' ? createVNode('div', { class: 'mc-tabs__header-bar' }) : null;
    return createVNode(
        'div',
        { class: 'mc-tabs__header-scroll-content' },
        tabPanes.map(tabPane => {
            const { children, props } = tabPane;
            const { name, tabLabel } = <TabPaneProps>kebabCaseEscape(props);
            const isActive = activeTab.value === name;

            return createVNode(
                'div',
                {
                    class: ['mc-tabs-tab', { 'mc-tabs-tab--active': isActive }],
                    onClick: () => {
                        name && handleClick(name);
                    }
                },
                // @ts-ignore
                children?.tab ? children?.tab() : [createVNode('span', null, [createTextVNode(tabLabel ?? '')])]
            );
        })
    );
});

const Render = () => {
    return createVNode(
        'div',
        {
            class: ['mc-tabs', `mc-tabs--${type.value}`],
            style: cssVars.value
        },
        [
            createVNode(
                'div',
                {
                    class: 'mc-tabs__header',
                    style: headerStyle?.value
                },
                [tabsHeaderVNode.value]
            ),
            createVNode(
                'div',
                {
                    class: 'mc-tabs__content',
                    style: contentStyle?.value
                },
                [renderSlot(slots, 'default')]
            )
        ]
    );
};
</script>

<template>
    <Render />
</template>
