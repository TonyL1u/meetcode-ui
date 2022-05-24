<template>
    <McSpace>
        <McButton @click="handleExpand('vue')">展开</McButton>
        <McButton @click="handleExpand('react-hooks-hooks-at-a-glance', true)">展开并选中</McButton>
        <McButton @click="handleCollapseAll">收起全部</McButton>
    </McSpace>
    <McMenu ref="menuRef" v-model:value="menuKey" @update:value="handleUpdateValue" @update:expand-keys="handleUpdateExpandKeys">
        <McSubMenu key="vue" title="Vue">
            <template #icon>
                <McIcon>
                    <LogoVue />
                </McIcon>
            </template>
            <McSubMenu key="vue-getting-started" title="开始">
                <McMenuItem key="vue-getting-started-intro">简介</McMenuItem>
                <McMenuItem key="vue-getting-started-quick-start">快速开始</McMenuItem>
            </McSubMenu>
            <McSubMenu key="vue-essentials" title="基础">
                <McMenuItem key="vue-essentials-creating-a-Vue-application">创建一个应用</McMenuItem>
                <McMenuItem key="vue-essentials-template-syntax">模板语法</McMenuItem>
                <McMenuItem key="vue-essentials-reactivity-fundamentals">响应式基础</McMenuItem>
            </McSubMenu>
        </McSubMenu>
        <McSubMenu key="react" title="React">
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
import { McMenu, McMenuItem, McSubMenu, McIcon, McButton, McSpace, McMessage } from 'meetcode-ui';
import { LogoVue, LogoReact } from '@vicons/ionicons5';
import type { MenuExposeInstance } from 'meetcode-ui';

const menuKey = ref('');
const menuRef = ref<MenuExposeInstance>();

const handleExpand = (key: string, autoSelect?: boolean) => {
    menuRef.value?.expand(key, autoSelect);
};
const handleCollapseAll = () => {
    menuRef.value?.collapseAll();
};

const handleUpdateValue = (key: string) => {
    McMessage.text(`当前选中的 Key = ${key}`, { card: true });
};
const handleUpdateExpandKeys = (keys: string[]) => {
    McMessage.text(`当前展开的子菜单 Keys = ${JSON.stringify(keys)}`, { card: true });
};
</script>
