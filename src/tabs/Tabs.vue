<script lang="ts">
export default {
    name: 'Tabs'
};
</script>

<script lang="ts" setup>
import { ref, toRefs, useSlots, computed, watch, mergeProps, provide, createVNode, createTextVNode, createCommentVNode, nextTick, VNode, CSSProperties } from 'vue';
import { flatten, getSlotFirstVNode, kebabCaseEscape, SpecificVNode } from '../_utils_';
import { useVModel, useElementBounding, throttledWatch } from '@vueuse/core';
import McTab from './Tab.vue';
import { tabsInjectionKey, tabPaneIKey, tabIKey, PaneName, MaybeTabPaneProps, OnBeforeTabSwitchImpl } from './interface';
import * as CSS from 'csstype';
import './style.scss';

interface Props {
    value?: PaneName;
    defaultTab?: PaneName;
    type?: 'bar' | 'line' | 'empty' | 'card' | 'segment';
    stretch?: boolean;
    center?: boolean;
    tabGap?: number;
    activeColor?: string;
    barPosition?: 'bottom' | 'top';
    headerStyle?: CSSProperties;
    headerClass?: string;
    contentStyle?: CSSProperties;
    contentClass?: string;
    onBeforeTabSwitch?: OnBeforeTabSwitchImpl;
}
const props = withDefaults(defineProps<Props>(), {
    type: 'line',
    stretch: false,
    center: false,
    tabGap: 40,
    activeColor: '#10b981',
    barPosition: 'bottom'
});
const emit = defineEmits<{
    (e: 'update:value', value: PaneName): void;
    (e: 'tab:switch', value: PaneName): void;
    (e: 'tab:click', value: PaneName): void;
}>();

const slots = useSlots();
const { defaultTab, type, center, stretch, tabGap, activeColor, barPosition, headerStyle, headerClass, contentStyle, contentClass, onBeforeTabSwitch } = toRefs(props);
const valueVM = useVModel(props, 'value', emit);
const activeTabName = ref(valueVM.value || (defaultTab?.value ?? ''));
const activeTabVNode = ref<VNode>();
const tabsElRef = ref<HTMLElement>();
const headerElRef = ref<HTMLElement>();
const barElRef = ref<HTMLElement>();
const barUpdatedTimer = ref();
const cssVars = computed<CSS.Properties>(() => {
    return {
        // '--tab-default-color': defaultColor.value,
        '--tab-active-color': activeColor.value,
        '--tab-gap': stretch.value ? 0 : tabGap.value / 2 + 'px'
    };
});

watch(valueVM, name => {
    name && handleBeforeTabSwitch(name);
});

if (type.value === 'bar' || type.value === 'line') {
    watch(activeTabVNode, () => {
        nextTick(() => {
            updateLineBarStyle();
        });
    });

    const { top, right, width, height } = useElementBounding(headerElRef);
    throttledWatch(
        [top, right, width, height],
        () => {
            clearBarUpdatedTimer();
            const { value: barEl } = barElRef;
            barEl!.style.transition = '0s';
            updateLineBarStyle();
        },
        {
            throttle: 32
        }
    );
}

const callUpdateTab = (name: PaneName) => {
    activeTabName.value = name;
    valueVM.value = name; // emit('update:value', name);
    emit('tab:switch', activeTabName.value);
};

const clearBarUpdatedTimer = () => {
    window.clearTimeout(barUpdatedTimer.value);
    barUpdatedTimer.value = null;
};
const handleTabClick = async (name: PaneName) => {
    emit('tab:click', name);
    handleBeforeTabSwitch(name);
};
const handleBeforeTabSwitch = async (name: PaneName) => {
    // callback only when the value is changed
    if (activeTabName.value !== name) {
        if (onBeforeTabSwitch?.value) {
            const { value: beforeTabSwitch } = onBeforeTabSwitch;
            const callback = await beforeTabSwitch(activeTabName.value, name);
            if (callback || callback === undefined) {
                callUpdateTab(name);
            }
        } else {
            callUpdateTab(name);
        }
    }
};
const updateLineBarStyle = () => {
    if (!activeTabVNode.value) return;

    const {
        value: { el: activeTabEl }
    } = activeTabVNode;
    const { value: barEl } = barElRef;
    const { offsetWidth, offsetLeft } = activeTabEl!;

    barEl!.style.left = `${offsetLeft}px`;
    barEl!.style.maxWidth = `${offsetWidth}px`;
    barUpdatedTimer.value = window.setTimeout(() => {
        barEl!.style.transition = '0.3s';
    }, 64);
};

provide(tabsInjectionKey, activeTabName);

const getTabVNode = (maybeTabPane: SpecificVNode<MaybeTabPaneProps>) => {
    const { children, props, type } = maybeTabPane;
    const { name, tabLabel, tabStyle = {}, disabled = false } = kebabCaseEscape<MaybeTabPaneProps>(props) ?? {};
    const isTab = (<any>type).iKey === tabIKey;
    const isActive = activeTabName.value === name;
    const isDisabled = typeof disabled === 'boolean' ? disabled : disabled === '';
    const tabVNode = createVNode(
        McTab,
        mergeProps(isTab ? maybeTabPane.props ?? {} : { style: tabStyle }, {
            class: { 'mc-tabs-tab--active': isActive, 'mc-tabs-tab--disabled': isDisabled },
            onClick: () => {
                if (isDisabled) return;
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
                    return children?.tab ? children?.tab() : [createVNode('span', { class: 'mc-tabs-tab__label' }, [createTextVNode(tabLabel ?? '')])];
                }
            }
        }
    );
    if (isActive) {
        activeTabVNode.value = tabVNode;
    }

    return tabVNode;
};

const lineBarVNode = computed(() => {
    if (type.value === 'bar' || type.value === 'line') {
        return createVNode('div', {
            ref: barElRef,
            class: ['mc-tabs__header-bar', `mc-tabs__header-bar--${barPosition.value}`]
        });
    }
    return null;
});

const tabsHeaderVNode = computed(() => {
    // use IKey, ensure non-SpecificVNode element won't be rendered in header
    const [firstTabPane, maybeTabPanes] = getSlotFirstVNode<MaybeTabPaneProps>(slots.default, [tabPaneIKey, tabIKey], true);
    if (!maybeTabPanes || maybeTabPanes.length === 0) return null;
    activeTabName.value ||= firstTabPane?.props?.name ?? '';

    return createVNode(
        'div',
        {
            class: ['mc-tabs__header-scroll-content', headerClass?.value],
            style: headerStyle?.value
        },
        maybeTabPanes.map(maybeTabPane => {
            return getTabVNode(maybeTabPane);
        })
    );
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
                    ref: headerElRef,
                    class: ['mc-tabs__header', { 'mc-tabs__header--center': center.value, 'mc-tabs__header--stretch': stretch.value }]
                },
                [tabsHeaderVNode.value, lineBarVNode.value]
            ),
            createVNode(
                'div',
                {
                    class: ['mc-tabs__content', contentClass?.value],
                    style: contentStyle?.value
                },
                slots.default ? flatten(slots.default(), tabIKey, true) : createCommentVNode('', true)
            )
        ]
    );
};

defineExpose({
    switchTo: handleBeforeTabSwitch,
    el: tabsElRef
});
</script>

<template>
    <Render />
</template>
