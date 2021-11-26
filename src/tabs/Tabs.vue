<script lang="ts" setup>
import { ref, toRefs, useSlots, computed, mergeProps, provide, createVNode, createTextVNode, createCommentVNode, CSSProperties } from 'vue';
import { flatten, getSlotFirstVNode, kebabCaseEscape } from '../_utils_';
import McTab from './Tab.vue';
import { tabsInjectionKey, tabPaneIKey, tabIKey, PaneName, MaybeTabPaneProps, OnBeforeTabSwitchImpl } from './interface';
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
    (e: 'update:tab', value: PaneName): void;
    (e: 'tab:click', value: PaneName): void;
}>();

const slots = useSlots();
const { defaultTab, defaultColor, activeColor, stretch, tabGap, type, headerStyle, contentStyle, onBeforeTabSwitch } = toRefs(props);
// use tabPaneIKey, ensure non-maybeTabPane element won't be rendered in header
const [firstTabPane, maybeTabPanes] = getSlotFirstVNode<MaybeTabPaneProps>(slots.default, [tabPaneIKey, tabIKey], true);
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
    // call updateTab only when the value is changed
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

const getTabProps = () => {};

const getTabDefaultSlot = () => {};

const tabsHeaderVNode = computed(() => {
    if (!maybeTabPanes || maybeTabPanes.length === 0) return null;

    const barVNode = type.value === 'line' ? createVNode('div', { class: 'mc-tabs__header-bar' }) : null;
    return createVNode(
        'div',
        { class: 'mc-tabs__header-scroll-content' },
        maybeTabPanes.map(maybeTabPane => {
            const { children, props, type } = maybeTabPane;
            const isTab = (<any>type).iKey === tabIKey;
            const { name, tabLabel } = kebabCaseEscape<MaybeTabPaneProps>(props) ?? {};
            const tabClickEvent = () => {
                name && handleClick(name);
            };
            const tabProps = {
                class: { 'mc-tabs-tab--active': activeTab.value === name },
                onClick: tabClickEvent
            };

            if ((<any>type).iKey === tabIKey) {
                if (maybeTabPane.props) {
                    console.log(maybeTabPane.props);
                    const originalClickHandler = maybeTabPane.props.onClick;
                    const originalCls = maybeTabPane.props.class;
                    const mergedProps = mergeProps(maybeTabPane.props, {
                        class: { 'mc-tabs-tab--active': activeTab.value === name }
                    });
                    console.log(mergedProps);
                    maybeTabPane.props = {
                        // ...maybeTabPane.props,
                        // class: [originalCls, activeTab.value === name ? 'mc-tabs-tab--active' : ''],
                        ...mergedProps,
                        onClick: originalClickHandler
                            ? (...args: Array<unknown>) => {
                                  originalClickHandler(...args);
                                  tabClickEvent();
                              }
                            : tabClickEvent
                    };
                } else {
                    maybeTabPane.props = tabProps;
                }
                return maybeTabPane;
            } else {
                return createVNode(McTab, tabProps, {
                    default: () => {
                        // @ts-ignore
                        return children?.tab ? children?.tab() : [createVNode('span', null, [createTextVNode(tabLabel ?? '')])];
                    }
                });
            }

            // const tabProps = isTab ?

            // const tabDefaultSlot = isTab
            // // @ts-ignore
            // ? children?.default() ?? null
            // // @ts-ignore
            // : children?.tab ? children?.tab() : [createVNode('span', null, [createTextVNode(tabLabel ?? '')])];

            // return createVNode(
            //     McTab,
            //     {

            //         onClick: () => {
            //             name && handleClick(name);
            //         }
            //     },
            //     {
            //         default: () => tabDefaultSlot
            //     }
            // );
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
                slots.default ? flatten(slots.default(), tabIKey, true) : createCommentVNode('', true)
            )
        ]
    );
};
</script>

<template>
    <Render />
</template>
