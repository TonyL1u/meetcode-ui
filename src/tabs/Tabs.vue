<script lang="ts">
export default {
    name: 'Tabs'
};
</script>

<script lang="ts" setup>
import { ref, toRefs, useSlots, computed, watch, mergeProps, provide, createVNode, createTextVNode, createCommentVNode, nextTick, onMounted, VNode, CSSProperties } from 'vue';
import { flatten, getSlotFirstVNode, kebabCaseEscape, SpecificVNode } from '../_utils_';
import { useVModel, useElementBounding } from '@vueuse/core';
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
const activeTabName = ref(valueVM.value || (defaultTab?.value ?? ''));
const activeTabVNode = ref<VNode>();
const tabsElRef = ref<HTMLElement>();
const barElRef = ref<HTMLElement>();
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
    activeTabName.value = name;
    valueVM.value = name; // emit('update:value', name);
    emit('update:tab', activeTabName.value);
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
const updateBarStyle = () => {
    nextTick(() => {
        console.log(1234);
    });
};

provide(tabsInjectionKey, activeTabName);

onMounted(() => {
    if (type.value === 'line') {
        watch(
            activeTabVNode,
            () => {
                nextTick(() => {
                    if (!activeTabVNode.value) return;
                    const {
                        value: { el: tabEl }
                    } = activeTabVNode;
                    const { value: barEl } = barElRef;
                    const { offsetWidth, offsetLeft } = tabEl!;

                    barEl!.style.left = `${offsetLeft}px`;
                    barEl!.style.maxWidth = `${offsetWidth}px`;
                });
            },
            { immediate: true }
        );
    }
});

const getTabVNode = (maybeTabPane: SpecificVNode<MaybeTabPaneProps>) => {
    const { children, props, type } = maybeTabPane;
    const { name, tabLabel } = kebabCaseEscape<MaybeTabPaneProps>(props) ?? {};
    const isTab = (<any>type).iKey === tabIKey;
    const isActive = activeTabName.value === name;
    const tabVNode = createVNode(
        McTab,
        mergeProps(isTab ? maybeTabPane.props ?? {} : {}, {
            class: { 'mc-tabs-tab--active': isActive },
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
    return type.value === 'line' ? createVNode('div', { ref: barElRef, class: 'mc-tabs__header-bar' }) : null;
});

const tabsHeaderVNode = computed(() => {
    // use IKey, ensure non-SpecificVNode element won't be rendered in header
    const [firstTabPane, maybeTabPanes] = getSlotFirstVNode<MaybeTabPaneProps>(slots.default, [tabPaneIKey, tabIKey], true);
    if (!maybeTabPanes || maybeTabPanes.length === 0) return null;
    activeTabName.value ||= firstTabPane?.props?.name ?? '';

    return createVNode(
        'div',
        { class: 'mc-tabs__header-scroll-content' },
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
                    class: 'mc-tabs__header',
                    style: headerStyle?.value
                },
                [tabsHeaderVNode.value, lineBarVNode.value]
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

defineExpose({
    switchTo: handleBeforeTabSwitch,
    el: tabsElRef
});
</script>

<template>
    <Render />
</template>
