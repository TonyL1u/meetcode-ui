<template>
    <McMenu v-model:value="menuKey" :options="options" />
</template>

<script lang="ts" setup>
import { createVNode, ref } from 'vue';
import { McMenu, McIcon } from 'meetcode-ui';
import { LogoHtml5, LogoNodejs, LogoCss3, LogoVue, LogoReact } from '@vicons/ionicons5';
import type { Component } from 'vue';
import type { MenuOption } from 'meetcode-ui';

const menuKey = ref('');
const renderIcon = (icon: Component) => {
    return () => createVNode(McIcon, null, { default: () => createVNode(icon) });
};
const options: MenuOption[] = [
    {
        key: 'html',
        icon: renderIcon(LogoHtml5),
        label: 'HTML',
        disabled: true
    },
    {
        key: 'js',
        icon: renderIcon(LogoNodejs),
        label: 'JavaScript'
    },
    {
        key: 'css',
        icon: renderIcon(LogoCss3),
        label: 'CSS'
    },
    {
        key: 'vue',
        icon: renderIcon(LogoVue),
        label: 'Vue',
        children: [
            {
                group: true,
                label: '开始',
                children: [
                    {
                        key: 'vue-intro',
                        label: '简介'
                    },
                    {
                        key: 'vue-intro-quick-start',
                        label: '快速开始'
                    }
                ]
            },
            {
                group: true,
                label: '基础',
                children: [
                    {
                        key: 'vue-essentials-creating-a-Vue-application',
                        label: '创建一个应用'
                    },
                    {
                        key: 'vue-essentials-template-syntax',
                        label: '模板语法'
                    },
                    {
                        key: 'vue-essentials-reactivity-fundamentals',
                        label: '响应式基础'
                    }
                ]
            }
        ]
    },
    {
        key: 'react',
        icon: renderIcon(LogoReact),
        label: 'React',
        unique: true,
        children: [
            {
                key: 'react-installation',
                label: '安装',
                children: [
                    {
                        key: 'react-installation-getting-started',
                        label: '开始'
                    },
                    {
                        key: 'react-installation-add-react-to-a-website',
                        label: '在网站中添加 React'
                    }
                ]
            },
            {
                key: 'react-main-concepts',
                label: '核心概念',
                children: [
                    {
                        key: 'react-main-concepts-hello-world',
                        label: 'Hello World'
                    },
                    {
                        key: 'react-main-concepts-introducing-jsx',
                        label: 'JSX 简介'
                    }
                ]
            },
            {
                key: 'react-hooks',
                label: 'Hook',
                children: [
                    {
                        key: 'react-hooks-introducing-hooks',
                        label: 'Hook 简介'
                    },
                    {
                        key: 'react-hooks-hooks-at-a-glance',
                        label: 'Hook 概览'
                    }
                ]
            }
        ]
    }
];
</script>
