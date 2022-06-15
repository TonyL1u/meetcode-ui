<template>
    <McAnchor :options="options" :bound="55" :offset-top="30" :offset-bottom="30" />
</template>

<script lang="ts" setup>
import { McAnchor } from 'meetcode-ui';
import type { AnchorOption } from 'meetcode-ui';

const options: AnchorOption[] = [
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
</script>
