<template>
    <!-- <NConfigProvider :theme="theme" abstract>
        <NLayout v-if="currentMenuKey && currentTab" position="absolute">
            <NLayoutHeader class="header" bordered style="height: 45px">
                <Header>
                    <McIcon class="nav-menu-trigger" :size="24" @click="handleShowNavMenu">
                        <IconMenu />
                    </McIcon>
                    <div class="title mc-text-2xl mc-leading-6">Meetcode UI</div>
                    <McTabs v-model:value="currentTab" :show-line="false" class="header-tabs mc-absolute mc-left-[276px]" :content-style="{ padding: 0 }" @tab-click="handleTabClick">
                        <McTab name="docs">{{ siteLang === 'zh-CN' ? '文档' : 'Docs' }}</McTab>
                        <McTab name="components">{{ siteLang === 'zh-CN' ? '组件' : 'Components' }}</McTab>
                        <McTab name="develop">{{ siteLang === 'zh-CN' ? '开发指南' : 'Develop' }}</McTab>
                    </McTabs>
                </Header>
            </NLayoutHeader>
            <NLayout position="absolute" style="top: 45px" has-sider>
                <NLayoutSider class="sider-menu" bordered :collapsed-width="0" :width="300" collapse-mode="transform" show-trigger="bar">
                    <MenuVNode :menu="menu" />
                </NLayoutSider>
                <NLayoutContent class="main-content">
                    <NLayout has-sider sider-placement="right">
                        <NLayoutContent>
                            <div class="mc-flex mc-flex-col mc-justify-between mc-w-full mc-h-full">
                                <router-view :class="siteTheme" />
                                <PagerNavigator :menu="menu" :tab="currentTab" :current-key="currentMenuKey" />
                            </div>
                        </NLayoutContent>
                        <NLayoutSider class="sider-navigator" :width="164" content-style="padding-right: 24px">
                            <Navigator />
                        </NLayoutSider>
                    </NLayout>
                </NLayoutContent>
            </NLayout>
        </NLayout>
    </NConfigProvider> -->
    <McLayout v-if="currentMenuKey && currentTab" style="height: 100vh">
        <McLayoutHeader>
            <Header class="header">
                <McIcon class="nav-menu-trigger" :size="24" @click="handleShowNavMenu">
                    <IconMenu />
                </McIcon>
                <div class="title mc-text-2xl mc-leading-6">Meetcode UI</div>
                <McTabs v-model:value="currentTab" :show-line="false" class="header-tabs mc-absolute mc-left-[276px]" :content-style="{ padding: 0 }" @tab-click="handleTabClick">
                    <McTab name="docs">{{ siteLang === 'zh-CN' ? '文档' : 'Docs' }}</McTab>
                    <McTab name="components">{{ siteLang === 'zh-CN' ? '组件' : 'Components' }}</McTab>
                    <McTab name="develop">{{ siteLang === 'zh-CN' ? '开发指南' : 'Develop' }}</McTab>
                </McTabs>
            </Header>
        </McLayoutHeader>
        <McLayout style="flex: 1">
            <McLayoutSider class="menu-sider" style="width: 300px">
                <MenuVNode :menu="menu" />
            </McLayoutSider>
            <McLayout>
                <McLayoutContent>
                    <div class="mc-flex mc-flex-col mc-justify-between mc-w-full mc-h-full">
                        <router-view :class="siteTheme" />
                        <PagerNavigator :menu="menu" :tab="currentTab" :current-key="currentMenuKey" />
                    </div>
                </McLayoutContent>
                <McLayoutSider style="width: 164px">
                    <Navigator />
                </McLayoutSider>
            </McLayout>
        </McLayout>
    </McLayout>
</template>

<script lang="ts" setup>
import { computed, ref, createVNode, nextTick } from 'vue';
import { NLayout, NLayoutHeader, NLayoutContent, NLayoutSider, NConfigProvider, NMenu, darkTheme } from 'naive-ui';
import { McTabs, McTab, McIcon, McPopup, McLayout, McLayoutContent, McLayoutHeader, McLayoutFooter, McLayoutSider, useThemeController, useI18nController } from 'meetcode-ui';
import { MenuOutline as IconMenu } from '@vicons/ionicons5';
import { useRouter } from 'vue-router';
import { useTitle } from '@vueuse/core';
import { useRouterEventHook } from './utils';
import Header from './home/Header.vue';
import Navigator from './home/Navigator.vue';
import PagerNavigator from './home/PagerNavigator.vue';
import { menusMap, routesMap } from './menu';
import type { FunctionalComponent } from 'vue';
import type { MenuTab, RouteMetaData } from './menu';
import type { MenuOption } from 'naive-ui';

const router = useRouter();
const { current: siteTheme, isDark } = useThemeController();
const { current: siteLang } = useI18nController();
const { onRouteChange } = useRouterEventHook();
const currentTab = ref<MenuTab>();
const currentMenuKey = ref<string>();
const theme = computed(() => (isDark.value ? darkTheme : null));
const menu = computed<MenuOption[]>(() => menusMap[currentTab.value!][siteLang.value]);
const MenuVNode: FunctionalComponent<{ menu: MenuOption[] }> = props => {
    const { menu } = props;
    return createVNode(NMenu, {
        value: currentMenuKey.value,
        'onUpdate:value': (key: string) => {
            if (currentMenuKey.value === key) return;
            currentMenuKey.value = key;
            router.push(`/${siteLang.value}/${key}`);
        },
        options: menu,
        accordion: true
    });
};
const handleShowNavMenu = () => {
    const { show, hide } = McPopup<{ menu: MenuOption[] }, { 'update:value': (key: string) => void }>(MenuVNode, {
        props: {
            menu: [
                {
                    type: 'group',
                    label: '文档',
                    key: 'docs',
                    children: menusMap.docs[siteLang.value]
                },
                {
                    type: 'group',
                    label: '组件',
                    key: 'components',
                    children: menusMap.components[siteLang.value]
                },
                {
                    type: 'group',
                    label: '开发指南',
                    key: 'develop',
                    children: menusMap.develop[siteLang.value]
                }
            ]
        },
        on: {
            'update:value': () => {
                hide();
            }
        }
    });
    show('drawer', {
        appearDirection: 'left',
        size: '85vw',
        showHeader: false,
        bodyStyle: { padding: '0px' }
    });
};
const handleTabClick = (tab: MenuTab) => {
    if (currentTab.value === tab) return;
    // 等待 currentTab 同步更新后执行
    nextTick(() => {
        router.push(routesMap[tab][siteLang.value][0].path);
        currentMenuKey.value = menu.value[0].key! as string;
    });
};

onRouteChange('meta', ({ meta }) => {
    const { title, tab, route } = meta as RouteMetaData;
    currentTab.value = tab;
    currentMenuKey.value = `${tab}/${route}`;
    useTitle(`Meetcode UI - ${title}`);
});
</script>

<style lang="scss">
@import './styles/highlight.scss';
@import './styles/highlight-dark.scss';
@import './styles/markdown-style.scss';

html,
body {
    margin: 0;
    padding: 0;
    line-height: 1.5;
}

#app {
    font-family: v-sans, Avenir, Helvetica, Arial, sans-serif;
    // -webkit-font-smoothing: antialiased;
    // -moz-osx-font-smoothing: grayscale;
    height: 100vh;

    .nav-menu-trigger {
        display: none;
    }

    .main-content .n-layout {
        min-height: calc(100vh - 45px);
    }

    .markdown-body {
        width: 100%;
        max-width: 1024px;
        margin: 0 auto;
        padding: 0 24px;
        box-sizing: border-box;

        @include custom-markdown-style;

        a.header-anchor {
            text-decoration: none;
            color: var(--text-color);
        }

        &.dark {
            @include highlight-dark;
        }

        &.light {
            @include highlight;
        }
    }
}

@media screen and (max-width: 1080px) {
    #app {
        .header {
            padding-left: 20px;
            padding-right: 8px;
        }

        .nav-menu-trigger {
            display: inline-block;
        }

        .title {
            display: none;
        }

        .header-tabs {
            display: none;
        }
    }

    .menu-sider {
        display: none;
    }
}

@media screen and (max-width: 640px) {
    .sider-navigator {
        display: none;
    }
}
</style>
