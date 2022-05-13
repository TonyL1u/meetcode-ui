<template>
    <McLayout v-if="currentMenuKey && currentTab" style="height: 100vh">
        <McLayoutHeader bordered>
            <Header class="header">
                <McIcon class="nav-menu-trigger" :size="24" @click="handleShowNavMenu">
                    <IconMenu />
                </McIcon>
                <div class="title mc-text-2xl mc-leading-6">Meetcode UI</div>
                <McTabs v-model:value="currentTab" :show-line="false" class="header-tabs mc-absolute mc-left-[268px]" :header-style="{ height: '55px' }" :content-style="{ padding: 0 }" @tab-click="handleTabClick">
                    <McTab name="docs">{{ siteLang === 'zh-CN' ? '文档' : 'Docs' }}</McTab>
                    <McTab name="components">{{ siteLang === 'zh-CN' ? '组件' : 'Components' }}</McTab>
                    <McTab name="develop">{{ siteLang === 'zh-CN' ? '开发指南' : 'Develop' }}</McTab>
                </McTabs>
            </Header>
        </McLayoutHeader>
        <McLayout style="flex: 1">
            <McLayoutSider class="menu-sider" style="width: 300px" bordered>
                <MenuVNode :menu="menu" />
            </McLayoutSider>
            <McLayout style="position: relative">
                <McLayoutContent class="main-content">
                    <div class="mc-flex mc-flex-col mc-justify-between mc-w-full mc-min-h-full">
                        <router-view :class="siteTheme" />
                        <PagerNavigator :menu="menu" :tab="currentTab" :current-key="currentMenuKey" />
                    </div>
                </McLayoutContent>
                <McLayoutSider class="sider-navigator" style="width: 164px; position: absolute; right: 0; height: 100%">
                    <Navigator />
                </McLayoutSider>
            </McLayout>
        </McLayout>
    </McLayout>
    <!-- <McLayout v-if="currentMenuKey && currentTab" preset="holy" style="height: 100vh">
        <template #header>
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
        </template>
        <template #left-sider>
            <MenuVNode :menu="menu" />
        </template>
        <template #content>
            <div class="mc-flex mc-flex-col mc-justify-between mc-w-full mc-min-h-full">
                <router-view :class="siteTheme" />
                <PagerNavigator :menu="menu" :tab="currentTab" :current-key="currentMenuKey" />
            </div>
        </template>
        <template #right-sider>
            <Navigator />
        </template>
    </McLayout> -->
</template>

<script lang="ts" setup>
import { computed, ref, createVNode, nextTick } from 'vue';
import { NMenu, darkTheme } from 'naive-ui';
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

    .main-content {
        padding-right: 164px;
        overflow: auto;
    }

    .nav-menu-trigger {
        display: none;
    }

    .markdown-body {
        width: 100%;
        max-width: 768px;
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

    #app .main-content {
        padding-right: 0px;
    }
}
</style>
