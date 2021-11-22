<script lang="ts" setup>
import { toRefs, useSlots, useAttrs, computed, renderSlot, provide, createVNode, createTextVNode, CSSProperties, VNode, Fragment } from 'vue';
import { useVModels } from '@vueuse/core';
import { flatten, kebabCaseEscape } from '../_utils_';
import { tabsInjectionKey, tabPaneIKey, TabPaneProps } from './interface';
import * as CSS from 'csstype';
import './style.scss';

interface Props {
    value?: string | number;
    type?: 'line' | 'empty' | 'card' | 'segment';
    stretch?: boolean;
    inline?: boolean;
    tabGap?: number;
    defaultColor?: string;
    activeColor?: string;
    linePosition?: string;
    headerStyle?: CSSProperties;
    contentStyle?: CSSProperties;
}
const props = withDefaults(defineProps<Props>(), {
    value: '',
    type: 'line',
    stretch: false,
    inline: false,
    tabGap: 0,
    defaultColor: '#000',
    activeColor: '#10b981',
    linePosition: 'bottom'
});
const emit = defineEmits<{
    (e: 'update:value', value: string | number): void;
}>();

const slots = useSlots();
const attrs = useAttrs();
const { defaultColor, activeColor, stretch, tabGap, type, headerStyle, contentStyle } = toRefs(props);
const { value: valueRef } = useVModels(props, emit);
const cssVars = computed<CSS.Properties>(() => {
    return {
        '--tab-default-color': defaultColor.value,
        '--tab-active-color': activeColor.value,
        '--tab-pad': stretch.value ? 0 : tabGap.value / 2 + 'px'
    };
});

provide(tabsInjectionKey, valueRef);

const handleClick = (name: string | number) => {
    valueRef.value = name;
    emit('update:value', name);
};

const tabsHeaderVNode = computed(() => {
    const barVNode = type.value === 'line' ? createVNode('div', { class: 'mc-tabs__header-bar' }) : null;
    // use tabPaneIKey, ensure non-tabPane element won't be rendered in header
    const tabPanes = flatten(slots.default!(), tabPaneIKey);
    console.log(tabPanes);
    return createVNode(
        'div',
        { class: 'mc-tabs__header-scroll-content' },
        tabPanes.map(tabPane => {
            const { children, props } = tabPane;
            const { name = '', tabLabel } = <TabPaneProps>kebabCaseEscape(props);
            return createVNode(
                'div',
                {
                    class: 'mc-tabs-tab',
                    onClick: () => {
                        handleClick(name);
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
