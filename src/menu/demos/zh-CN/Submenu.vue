<template>
    <McMenu v-model:value="menuKey">
        <McMenuItem key="html">HTML</McMenuItem>
        <McMenuItem key="js">JavaScript</McMenuItem>
        <McMenuItem key="css">CSS</McMenuItem>
        <McSubMenu title="Vue">
            <template #icon>
                <McIcon>
                    <LogoVue />
                </McIcon>
            </template>
            <McMenuItemGroup title="开始">
                <McMenuItem key="vue-intro">简介</McMenuItem>
                <McMenuItem key="vue-intro-quick-start">快速开始</McMenuItem>
            </McMenuItemGroup>
            <McMenuItemGroup title="基础">
                <McMenuItem key="vue-essentials-creating-a-Vue-application">创建一个应用</McMenuItem>
                <McMenuItem key="vue-essentials-template-syntax">模板语法</McMenuItem>
                <McMenuItem key="vue-essentials-reactivity-fundamentals">响应式基础</McMenuItem>
            </McMenuItemGroup>
        </McSubMenu>
        <McSubMenu title="React">
            <template #icon>
                <McIcon>
                    <LogoReact />
                </McIcon>
            </template>
            <McSubMenu key="react-installation" title="安装">
                <McMenuItem key="react-installation-getting-started">开始</McMenuItem>
                <McMenuItem key="react-installation-add-react-to-a-website">在网站中添加 React</McMenuItem>
            </McSubMenu>
            <McSubMenu key="react-main-concepts" title="核心概念">
                <McMenuItem key="react-main-concepts-hello-world">Hello World</McMenuItem>
                <McMenuItem key="react-main-concepts-introducing-jsx">JSX 简介</McMenuItem>
            </McSubMenu>
            <McSubMenu key="react-hooks" title="Hook">
                <McMenuItem key="react-hooks-introducing-hooks">Hook 简介</McMenuItem>
                <McMenuItem key="react-hooks-hooks-at-a-glance">Hook 概览</McMenuItem>
            </McSubMenu>
        </McSubMenu>
    </McMenu>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { McMenu, McMenuItem, McMenuItemGroup, McSubMenu, McIcon } from 'meetcode-ui';
import { CubeOutline, CodeSlashOutline, LogoVue, LogoReact } from '@vicons/ionicons5';

const menuKey = ref('');
</script>
