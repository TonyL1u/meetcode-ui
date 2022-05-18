<template>
    <McButton @click="handleClick">选中</McButton>
    <McMenu ref="menu" v-model:value="menuKey" @update:value="handleUpdateValue">
        <McMenuItem key="option1">Option 1</McMenuItem>
        <McMenuItem key="option2">Option 2</McMenuItem>
        <McMenuItem key="option3">Option 3</McMenuItem>
        <McMenuItem key="option4">Option 4</McMenuItem>
        <McSubMenu title="React">
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
import { McMenu, McMenuItem, McSubMenu, McMessage, McButton } from 'meetcode-ui';
import type { MenuExposeInstance } from 'meetcode-ui';

const menuKey = ref('option1');
const menu = ref<MenuExposeInstance>();
const handleUpdateValue = (key: string) => {
    McMessage.text(`当前选中的 Key = ${key}`, { card: true });
};

const handleClick = () => {
    console.log(menu.value?.expandAll());
};
</script>
