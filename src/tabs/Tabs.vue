<script lang="ts" setup>
import { ref, toRefs, useSlots, computed, renderSlot, provide, createVNode, createTextVNode, CSSProperties, VNode } from 'vue';
import { getSlotFirstVNode, kebabCaseEscape } from '../_utils_';
import { tabsInjectionKey, tabPaneIKey, TabPaneProps } from './interface';
import * as CSS from 'csstype';
import './style.scss';

interface Props {
    defaultTab?: string | number;
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
    (e: 'update:tab', value: string | number): void;
    (e: 'tab:click', value: string | number): void;
    (e: 'tab:switch', cb: (flag: { from?: boolean; to?: boolean }) => void): void;
}>();

const slots = useSlots();
const { defaultTab, defaultColor, activeColor, stretch, tabGap, type, headerStyle, contentStyle } = toRefs(props);
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

const handleClick = (name: string | number) => {
    emit('tab:click', name);
    // only update when value change
    if (activeTab.value !== name) {
        activeTab.value = name;
        emit('update:tab', name);
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
