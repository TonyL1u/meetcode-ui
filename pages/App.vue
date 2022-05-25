<template>
    <McLayout class="mc-h-full mc-overflow-hidden">
        <McLayoutHeader v-if="currentTab" bordered>
            <Header class="header">
                <McIcon class="nav-menu-trigger" :size="24" @click="handleShowNavMenu">
                    <IconMenu />
                </McIcon>
                <div class="title">Meetcode UI</div>
                <McTabs ref="tabsRef" :default-tab="currentTab" :show-line="false" class="header-tabs mc-absolute mc-left-[268px]" :header-style="{ height: '55px' }" :content-style="{ padding: 0 }" @tab-click="handleTabClick">
                    <McTab name="home">{{ siteLang === 'zh-CN' ? '首页' : 'Home' }}</McTab>
                    <McTab name="docs">{{ siteLang === 'zh-CN' ? '文档' : 'Docs' }}</McTab>
                    <McTab name="components">{{ siteLang === 'zh-CN' ? '组件' : 'Components' }}</McTab>
                    <McTab name="develop">{{ siteLang === 'zh-CN' ? '开发指南' : 'Develop' }}</McTab>
                </McTabs>
            </Header>
        </McLayoutHeader>
        <McLayoutContent v-if="currentTab === 'home'" style="flex: 1; overflow: hidden">
            <router-view :class="siteTheme" />
        </McLayoutContent>
        <McLayout v-else-if="currentTab" style="flex: 1">
            <McLayoutSider
                class="menu-sider"
                :collapsed="collapsed"
                :width="300"
                trigger-type="bar"
                :collapsed-width="currentTab === 'components' ? 92 : 0"
                :transition-mode="currentTab === 'components' ? 'width' : 'transform'"
                bordered
                collapsable
                @toggled="handleToggled"
            >
                <MenuVNode :menu="menu" />
            </McLayoutSider>
            <McLayout style="position: relative">
                <McLayoutContent class="main-content">
                    <div class="mc-flex mc-flex-col mc-justify-between mc-w-full mc-min-h-full">
                        <router-view :class="siteTheme" />
                        <PagerNavigator v-if="currentMenuKey" :menu="menu" :menu-key="currentMenuKey" :tab="currentTab" :current-key="currentMenuKey" />
                    </div>
                </McLayoutContent>
                <McLayoutSider class="sider-navigator" style="width: 164px; position: absolute; right: 0; height: 100%">
                    <Navigator />
                </McLayoutSider>
            </McLayout>
        </McLayout>
    </McLayout>
</template>

<script lang="ts" setup>
import { computed, ref, createVNode } from 'vue';
import { McTabs, McTab, McIcon, McPopup, McLayout, McLayoutContent, McLayoutHeader, McLayoutSider, McMenu, useThemeController, useI18nController } from 'meetcode-ui';
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
import type { MenuOption, TabsExposeInstance } from 'meetcode-ui';

const router = useRouter();
const { current: siteTheme } = useThemeController();
const { current: siteLang } = useI18nController();
const { onRouteChange } = useRouterEventHook();
const currentTab = ref<'home' | MenuTab>();
const currentMenuKey = ref<string>();
const collapsed = ref(false);
const tabsRef = ref<TabsExposeInstance>();
const menu = computed<MenuOption[]>(() => {
    if (currentTab.value === 'home') return [];
    return menusMap[currentTab.value!][siteLang.value];
});
const MenuVNode: FunctionalComponent<{ menu: MenuOption[]; defaultExpandKeys?: string[] }> = props => {
    const { menu, defaultExpandKeys = [] } = props;
    const expandKeys = ref(defaultExpandKeys);
    return createVNode(McMenu, {
        value: currentMenuKey.value,
        expandKeys: expandKeys.value,
        collapsed: currentTab.value === 'components' ? collapsed.value : false,
        collapsedWidth: 92,
        'onUpdate:value': (key: string) => {
            if (currentMenuKey.value === key) return;
            currentMenuKey.value = key;
            router.push(`/${siteLang.value}/${key}`);
        },
        'onUpdate:expandKeys': (keys: string[]) => {
            expandKeys.value = keys;
        },
        options: menu
    });
};
const handleShowNavMenu = () => {
    const { show, hide } = McPopup<{ menu: MenuOption[]; defaultExpandKeys?: string[] }, { 'update:value': (key: string) => void }>(MenuVNode, {
        props: {
            menu: [
                {
                    key: 'docs',
                    label: '文档',
                    children: menusMap.docs[siteLang.value]
                },
                {
                    key: 'components',
                    label: '组件',
                    children: menusMap.components[siteLang.value]
                },
                {
                    key: 'develop',
                    label: '开发指南',
                    children: menusMap.develop[siteLang.value]
                }
            ],
            defaultExpandKeys: ['docs', 'components', 'develop']
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
const handleTabClick = (tab: 'home' | MenuTab) => {
    if (currentTab.value === tab) return;
    router.push(tab === 'home' ? `/${siteLang.value}/home` : routesMap[tab][siteLang.value][0].path);
};
const handleToggled = (isCollapsed: boolean) => {
    collapsed.value = isCollapsed;
};

onRouteChange('meta', ({ meta }) => {
    const { title, tab, route } = meta as RouteMetaData;
    useTitle(`Meetcode UI - ${title}`);
    currentMenuKey.value = `${tab}/${route}`;
    if (currentTab.value !== tab) {
        currentTab.value = tab;
        tabsRef.value?.switchTo(tab);
    }
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
    font-size: 14px;
}

#app {
    font-family: v-sans, Avenir, Helvetica, Arial, sans-serif;
    // -webkit-font-smoothing: antialiased;
    // -moz-osx-font-smoothing: grayscale;
    height: 100vh;

    .title {
        font-size: 24px;
        line-height: 24px;
    }

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
        padding: 0 18px;
        box-sizing: border-box;

        @include custom-markdown-style;

        a.header-anchor {
            text-decoration: none;
            color: inherit;
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
        display: none !important;
    }
}

@media screen and (max-width: 640px) {
    .sider-navigator {
        display: none !important;
    }

    #app .main-content {
        padding-right: 0px;
    }
}
</style>
