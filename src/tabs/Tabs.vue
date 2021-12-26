<script lang="ts">
export default {
    name: 'Tabs'
};
</script>

<script lang="ts" setup>
import { ref, toRefs, useSlots, computed, watch, mergeProps, provide, createVNode, createTextVNode, createCommentVNode, nextTick, VNode, CSSProperties } from 'vue';
import { flatten, getSlotFirstVNode, kebabCaseEscape, SpecificVNode } from '../_utils_';
import { useVModels, useElementBounding, throttledWatch } from '@vueuse/core';
import McTab from './Tab.vue';
import { tabsInjectionKey, tabPaneIKey, tabIKey, TabPaneName, MaybeTabPaneProps, OnBeforeTabSwitchImpl } from './interface';
import * as CSS from 'csstype';

interface Props {
    value?: TabPaneName;
    defaultTab?: TabPaneName;
    type?: 'bar' | 'empty' | 'card' | 'segment';
    showLine?: boolean;
    stretch?: boolean;
    center?: boolean;
    tabGap?: number;
    animation?: 'slide' | 'scale' | 'fade';
    activeColor?: string;
    barPosition?: 'bottom' | 'top';
    headerStyle?: CSSProperties;
    headerClass?: string;
    contentStyle?: CSSProperties;
    contentClass?: string;
    onBeforeTabSwitch?: OnBeforeTabSwitchImpl;
}
const props = withDefaults(defineProps<Props>(), {
    type: 'bar',
    showLine: true,
    stretch: false,
    center: false,
    tabGap: 40,
    animation: 'slide',
    activeColor: '#10b981',
    barPosition: 'bottom'
});
const emit = defineEmits<{
    (e: 'update:value', value: TabPaneName): void;
    (e: 'tab:switch', value: TabPaneName): void;
    (e: 'tab:click', value: TabPaneName): void;
}>();

const slots = useSlots();
const { defaultTab, type, showLine, center, stretch, tabGap, animation, activeColor, barPosition, headerStyle, headerClass, contentStyle, contentClass, onBeforeTabSwitch } = toRefs(props);
const { value: valueVM } = useVModels(props, emit);
const activeTabName = ref(valueVM?.value || (defaultTab?.value ?? ''));
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

if (valueVM) {
    watch(valueVM, name => {
        name && handleBeforeTabSwitch(name);
    });
}

if (type.value === 'bar' || type.value === 'segment') {
    if (animation.value === 'slide') {
        watch(activeTabVNode, () => {
            nextTick(() => {
                updateBarStyle();
            });
        });
        const { top, right, width, height } = useElementBounding(headerElRef);
        throttledWatch(
            [top, right, width, height],
            () => {
                clearBarUpdatedTimer();
                const { value: barEl } = barElRef;
                barEl!.style.transition = '0s';
                updateBarStyle();
            },
            {
                throttle: 32
            }
        );
    }
}

const callUpdateTab = (name: TabPaneName) => {
    activeTabName.value = name;
    valueVM && (valueVM.value = name); // emit('update:value', name);
    emit('tab:switch', activeTabName.value);
};

const clearBarUpdatedTimer = () => {
    window.clearTimeout(barUpdatedTimer.value);
    barUpdatedTimer.value = null;
};
const handleTabClick = async (name: TabPaneName) => {
    emit('tab:click', name);
    handleBeforeTabSwitch(name);
};
const handleBeforeTabSwitch = async (name: TabPaneName) => {
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
    const { name, tabLabel = '', tabStyle = '', tabClass = '', disabled = false } = kebabCaseEscape<MaybeTabPaneProps>(props) ?? {};
    const isTab = (<any>type).iKey === tabIKey;
    const isActive = activeTabName.value === name;
    const isDisabled = typeof disabled === 'boolean' ? disabled : disabled === '';
    const tabVNode = createVNode(
        McTab,
        mergeProps(isTab ? maybeTabPane.props ?? {} : { style: tabStyle }, {
            class: [{ 'mc-tabs-tab--active': isActive, 'mc-tabs-tab--disabled': isDisabled }, tabClass],
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
                    return children?.tab ? children?.tab() : [createVNode('span', { class: 'mc-tabs-tab__label' }, [typeof tabLabel === 'string' ? createTextVNode(tabLabel) : tabLabel()])];
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
    if (type.value === 'bar') {
        if (animation.value === 'slide') {
            return createVNode('div', {
                ref: barElRef,
                class: ['mc-tabs__header-bar', `mc-tabs__header-bar--${barPosition.value}`]
            });
        }
    } else if (type.value === 'segment') {
        if (animation.value === 'slide') {
            return createVNode('div', {
                ref: barElRef,
                class: ['mc-tabs__header-bar']
            });
        }
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
                    class: [
                        'mc-tabs__header',
                        {
                            'mc-tabs__header--center': center.value,
                            'mc-tabs__header--stretch': stretch.value,
                            'mc-tabs__header--with-line': type.value === 'segment' || type.value === 'empty' ? false : showLine.value
                        },
                        type.value === 'bar' || type.value === 'segment' ? `mc-tabs__header--bar-${animation.value}` : ''
                    ]
                },
                [lineBarVNode.value, tabsHeaderVNode.value]
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
