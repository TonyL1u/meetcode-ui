<template>
    <NConfigProvider :theme="theme" abstract>
        <NLayout position="absolute">
            <NLayoutHeader class="header" bordered style="height: 64px">
                <Header v-if="currentTab">
                    <McTabs v-model:value="currentTab" :show-line="false" class="header-tabs mc-absolute mc-left-[276px]" :content-style="{ padding: 0 }" @update:value="handleUpdateTab">
                        <McTab name="docs">文档</McTab>
                        <McTab name="components">组件</McTab>
                        <McTab name="develop">开发指南</McTab>
                    </McTabs>
                </Header>
            </NLayoutHeader>
            <NLayout position="absolute" style="top: 64px" has-sider>
                <NLayoutSider class="sider-menu" bordered :collapsed-width="0" :width="300" collapse-mode="transform" show-trigger="bar">
                    <NMenu v-if="currentMenuKey" v-model:value="currentMenuKey" :options="menus" accordion @update:value="handleUpdateMenu" />
                </NLayoutSider>
                <NLayoutContent class="main-content">
                    <NLayout has-sider sider-placement="right">
                        <NLayoutContent>
                            <NNotificationProvider>
                                <div class="mc-flex mc-flex-col mc-justify-between mc-w-full mc-h-full">
                                    <router-view :class="siteTheme" />
                                    <Suspense>
                                        <PagerNavigator />
                                    </Suspense>
                                </div>
                            </NNotificationProvider>
                        </NLayoutContent>
                        <NLayoutSider class="sider-navigator" :width="164" content-style="padding-right: 24px">
                            <Navigator />
                        </NLayoutSider>
                    </NLayout>
                </NLayoutContent>
            </NLayout>
        </NLayout>
    </NConfigProvider>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';
import { NLayout, NLayoutHeader, NLayoutContent, NLayoutSider, NNotificationProvider, NConfigProvider, NMenu, darkTheme } from 'naive-ui';
import { McTabs, McTab, useThemeController, useI18nController } from 'meetcode-ui';
import { useRouter } from 'vue-router';
import { useTitle } from '@vueuse/core';
import Header from './home/Header.vue';
import Navigator from './home/Navigator.vue';
import PagerNavigator from './home/PagerNavigator.vue';
import { menusMap, routesMap } from './menu';
import { onRouterReady, onRoutePathChange } from './utils';
import type { MenuTab, RouteMetaData } from './menu';
import type { MenuOption } from 'naive-ui';

const router = useRouter();
const { current: siteTheme, isDark } = useThemeController();
const { current: siteLang } = useI18nController();
const currentTab = ref<MenuTab>();
const currentMenuKey = ref();
const menus = computed<MenuOption[]>(() => menusMap[currentTab.value!][siteLang.value]);
const theme = computed(() => (isDark.value ? darkTheme : null));
const handleUpdateTab = (tab: MenuTab) => {
    router.push(routesMap[tab][siteLang.value][0].path);
    currentMenuKey.value = menus.value[0].key;
};
const handleUpdateMenu = (key: string): void => {
    router.push(`/${siteLang.value}/${key}`);
};

onRouterReady((router, { path, meta }) => {
    console.log(path);
    const { tab, route } = meta as RouteMetaData;
    currentTab.value = tab;
    currentMenuKey.value = `${tab}/${route}`;
});
onRoutePathChange((path, { meta }) => {
    const { title } = meta as RouteMetaData;
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

    .header {
        padding: 0 12px 0 24px;
        display: flex;
        align-items: center;
        justify-content: flex-end;

        .nav-menu-trigger {
            display: none;
        }
    }

    .main-content .n-layout {
        min-height: calc(100vh - 64px);
    }

    .markdown-body {
        width: 100%;
        max-width: 768px;
        margin: 1em auto;
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
    #app .header {
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

    .sider-menu {
        display: none;
    }
}

@media screen and (max-width: 640px) {
    .sider-navigator,
    .add-docs-button {
        display: none;
    }
}
</style>
