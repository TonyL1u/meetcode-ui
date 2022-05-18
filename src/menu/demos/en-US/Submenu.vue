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
            <McSubMenu key="vue-intro" title="Introduction">
                <McMenuItem key="vue-intro-what-is-vue">What is Vue?</McMenuItem>
                <McMenuItem key="vue-intro-the-progressive-framework">The Progressive Framework</McMenuItem>
            </McSubMenu>
            <McMenuItem key="vue-quick-start">Quick Start</McMenuItem>
        </McSubMenu>
        <McSubMenu title="React">
            <template #icon>
                <McIcon>
                    <LogoReact />
                </McIcon>
            </template>
            <McMenuItem key="react-installation">Installation</McMenuItem>
            <McMenuItem key="react-main-concepts">Main Concepts</McMenuItem>
            <McMenuItem key="react-hooks">Hooks</McMenuItem>
        </McSubMenu>
    </McMenu>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { McMenu, McMenuItem, McMenuItemGroup, McSubMenu, McIcon, McButton } from 'meetcode-ui';
import { CubeOutline, CodeSlashOutline, LogoVue, LogoReact } from '@vicons/ionicons5';

const menuKey = ref('');
</script>
