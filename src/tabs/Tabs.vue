<script lang="ts" setup>
import { ref, toRefs, useSlots, computed, watch, mergeProps, provide, createVNode, createTextVNode, createCommentVNode, CSSProperties } from 'vue';
import { flatten, getSlotFirstVNode, kebabCaseEscape } from '../_utils_';
import { useVModel } from '@vueuse/core';
import McTab from './Tab.vue';
import { tabsInjectionKey, tabPaneIKey, tabIKey, PaneName, MaybeTabPaneProps, OnBeforeTabSwitchImpl } from './interface';
import * as CSS from 'csstype';
import './style.scss';

interface Props {
    value?: PaneName;
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
    onBeforeTabSwitch?: OnBeforeTabSwitchImpl;
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
    (e: 'update:value', value: PaneName): void;
    (e: 'update:tab', value: PaneName): void;
    (e: 'tab:click', value: PaneName): void;
}>();

const slots = useSlots();
const { defaultTab, defaultColor, activeColor, stretch, tabGap, type, headerStyle, contentStyle, onBeforeTabSwitch } = toRefs(props);
const valueVM = useVModel(props, 'value', emit);
const activeTab = ref(valueVM.value || (defaultTab?.value ?? ''));
const tabsElRef = ref();
const cssVars = computed<CSS.Properties>(() => {
    return {
        '--tab-default-color': defaultColor.value,
        '--tab-active-color': activeColor.value,
        '--tab-pad': stretch.value ? 0 : tabGap.value / 2 + 'px'
    };
});

watch(valueVM, name => {
    name && handleBeforeTabSwitch(name);
});

const callUpdateTab = (name: PaneName) => {
    activeTab.value = name;
    valueVM.value = name; // emit('update:value', name);
    emit('update:tab', activeTab.value);
};

const handleTabClick = async (name: PaneName) => {
    emit('tab:click', name);
    handleBeforeTabSwitch(name);
};
const handleBeforeTabSwitch = async (name: PaneName) => {
    // callback only when the value is changed
    if (activeTab.value !== name) {
        if (onBeforeTabSwitch?.value) {
            const { value: beforeTabSwitch } = onBeforeTabSwitch;
            const callback = await beforeTabSwitch(activeTab.value, name);
            if (callback || callback === undefined) {
                callUpdateTab(name);
            }
        } else {
            callUpdateTab(name);
        }
    }
};

provide(tabsInjectionKey, activeTab);

const tabsHeaderVNode = computed(() => {
    // use IKey, ensure non-SpecificVNode element won't be rendered in header
    const [firstTabPane, maybeTabPanes] = getSlotFirstVNode<MaybeTabPaneProps>(slots.default, [tabPaneIKey, tabIKey], true);
    if (!maybeTabPanes || maybeTabPanes.length === 0) return null;
    activeTab.value ||= firstTabPane?.props?.name ?? '';

    const barVNode = type.value === 'line' ? createVNode('div', { class: 'mc-tabs__header-bar' }) : null;
    return createVNode(
        'div',
        { class: 'mc-tabs__header-scroll-content' },
        maybeTabPanes.map(maybeTabPane => {
            const { children, props, type } = maybeTabPane;
            const { name, tabLabel } = kebabCaseEscape<MaybeTabPaneProps>(props) ?? {};
            const isTab = (<any>type).iKey === tabIKey;

            return createVNode(
                McTab,
                mergeProps(isTab ? maybeTabPane.props ?? {} : {}, {
                    class: { 'mc-tabs-tab--active': activeTab.value === name },
                    onClick: () => {
                        name && handleTabClick(name);
                    }
                }),
                {
                    default: () => {
                        if (isTab) {
                            // @ts-ignore
                            return children?.default() ?? null;
                        } else {
                            // @ts-ignore
                            return children?.tab ? children?.tab() : [createVNode('span', null, [createTextVNode(tabLabel ?? '')])];
                        }
                    }
                }
            );
        })
    );
});

defineExpose({
    switchTo: handleBeforeTabSwitch,
    el: tabsElRef
});

const Render = () => {
    return createVNode(
        'div',
        {
            ref: tabsElRef,
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
                slots.default ? flatten(slots.default(), tabIKey, true) : createCommentVNode('', true)
            )
        ]
    );
};
</script>

<template>
    <Render />
</template>
