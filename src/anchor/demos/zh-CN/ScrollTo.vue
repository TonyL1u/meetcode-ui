<template>
    <McAnchor ref="anchor" :options="anchorOptions" :bound="55" :offset-top="30" :offset-bottom="30" />
    <McPopselect :options="selectOptions" :auto-close="false" @select="handleSelect">
        <McButton style="margin-top: 16px" type="success" ghost>滚动到</McButton>
    </McPopselect>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { McAnchor, McPopselect, McButton } from 'meetcode-ui';
import type { AnchorOption, AnchorExposeInstance, PopselectOption } from 'meetcode-ui';

const anchor = ref<AnchorExposeInstance>();
const anchorOptions: AnchorOption[] = [
    {
        title: 'Anchor 锚点',
        href: encodeURI('#anchor-锚点'),
        children: [
            {
                title: '演示',
                href: encodeURI('#演示'),
                children: [
                    {
                        title: '基础用法',
                        href: encodeURI('#基础用法')
                    },
                    {
                        title: '偏移',
                        href: encodeURI('#偏移')
                    },
                    {
                        title: '调整样式',
                        href: encodeURI('#调整样式')
                    }
                ]
            },
            {
                title: 'Props',
                href: '#props'
            },
            {
                title: 'Event',
                href: '#event'
            },
            {
                title: '类型声明',
                href: encodeURI('#类型声明')
            }
        ]
    }
];
const selectOptions = [
    {
        label: '基础用法',
        value: encodeURI('#基础用法')
    },
    {
        label: '偏移',
        value: encodeURI('#偏移')
    },
    {
        label: '调整样式',
        value: encodeURI('#调整样式')
    }
];
const handleSelect = (value: string) => {
    anchor.value?.scrollTo(value);
};
</script>
