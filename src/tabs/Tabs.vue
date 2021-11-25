<script lang="ts" setup>
import { ref, toRefs, useSlots, computed, renderSlot, provide, createVNode, createTextVNode, createCommentVNode, CSSProperties } from 'vue';
import { flatten, getSlotFirstVNode, kebabCaseEscape } from '../_utils_';
import McTab from './Tab.vue';
import { tabsInjectionKey, tabPaneIKey, tabIKey, PaneName, TabPaneProps, OnBeforeTabSwitchImpl } from './interface';
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
const [firstTabPane, maybeTabPanes] = getSlotFirstVNode<TabPaneProps>(slots.default, [tabPaneIKey, tabIKey], true);
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

const tabsHeaderVNode = computed(() => {
    if (!maybeTabPanes || maybeTabPanes.length === 0) return null;

    const barVNode = type.value === 'line' ? createVNode('div', { class: 'mc-tabs__header-bar' }) : null;
    return createVNode(
        'div',
        { class: 'mc-tabs__header-scroll-content' },
        maybeTabPanes.map(maybeTabPane => {
            const { children, props, type } = maybeTabPane;
            const { name, tabLabel } = kebabCaseEscape<TabPaneProps>(props) ?? {};
            const isActive = activeTab.value === name;

            return createVNode(
                McTab,
                {
                    isActive,
                    onClick: () => {
                        name && handleClick(name);
                    }
                },
                {
                    default: () => {
                        if ((<any>type).iKey === tabIKey) {
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

const Render = () => {
    return slots.default
        ? createVNode(
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
                      flatten(slots.default(), tabIKey, true)
                  )
              ]
          )
        : createCommentVNode('', true);
};
</script>

<template>
    <Render />
</template>
