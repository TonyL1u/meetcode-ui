<template>
    <McLayout>
        <McLayoutSider :width="240" bordered collapsable :collapsed-width="72" trigger-type="bar" @toggled="handleToggled">
            <McMenu v-model:value="menuKey" :collapsed="collapsed" :collapsed-width="72">
                <McMenuItem key="css">
                    <template #icon>
                        <McIcon>
                            <LogoCss3 />
                        </McIcon>
                    </template>
                    CSS
                </McMenuItem>
                <McMenuItemGroup title="基础">
                    <McMenuItem key="html">
                        <template #icon>
                            <McIcon>
                                <LogoHtml5 />
                            </McIcon>
                        </template>
                        HTML
                    </McMenuItem>
                    <McMenuItem key="js">
                        <template #icon>
                            <McIcon>
                                <LogoNodejs />
                            </McIcon>
                        </template>
                        JavaScript
                    </McMenuItem>
                </McMenuItemGroup>
                <McMenuItemGroup title="进阶">
                    <McSubMenu key="vue" title="Vue">
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
                </McMenuItemGroup>
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
        </McLayoutSider>
        <McLayoutContent />
    </McLayout>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { McMenu, McMenuItem, McMenuItemGroup, McSubMenu, McIcon, McLayout, McLayoutSider, McLayoutContent } from 'meetcode-ui';
import { LogoHtml5, LogoNodejs, LogoCss3, LogoVue, LogoReact } from '@vicons/ionicons5';

const menuKey = ref('');
const collapsed = ref(false);
const handleToggled = (isCollapsed: boolean) => {
    collapsed.value = isCollapsed;
};
</script>
