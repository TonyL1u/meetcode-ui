<template>
    <NConfigProvider :theme="theme" abstract>
        <NLayout position="absolute">
            <NLayoutHeader class="header" bordered style="height: 64px">
                <Header v-if="currentTab">
                    <McIcon class="nav-menu-trigger" :size="24" @click="handleShowNavMenu">
                        <IconMenu />
                    </McIcon>
                    <div class="title mc-text-2xl mc-leading-6">Meetcode UI</div>
                    <McTabs v-model:value="currentTab" :show-line="false" class="header-tabs mc-absolute mc-left-[276px]" :content-style="{ padding: 0 }" @update:value="handleUpdateTab">
                        <McTab name="docs">{{ siteLang === 'zh-CN' ? '文档' : 'Docs' }}</McTab>
                        <McTab name="components">{{ siteLang === 'zh-CN' ? '组件' : 'Components' }}</McTab>
                        <McTab name="develop">{{ siteLang === 'zh-CN' ? '开发指南' : 'Develop' }}</McTab>
                    </McTabs>
                </Header>
            </NLayoutHeader>
            <NLayout position="absolute" style="top: 64px" has-sider>
                <NLayoutSider class="sider-menu" bordered :collapsed-width="0" :width="300" collapse-mode="transform" show-trigger="bar">
                    <MenuVNode v-if="currentMenuKey" :menu="menu" />
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
import { computed, ref, createVNode } from 'vue';
import { NLayout, NLayoutHeader, NLayoutContent, NLayoutSider, NNotificationProvider, NConfigProvider, NMenu, darkTheme } from 'naive-ui';
import { McTabs, McTab, McIcon, McPopup, useThemeController, useI18nController } from 'meetcode-ui';
import { MenuOutline as IconMenu } from '@vicons/ionicons5';
import { useRoute, useRouter } from 'vue-router';
import { useTitle, watchOnce } from '@vueuse/core';
import Header from './home/Header.vue';
import Navigator from './home/Navigator.vue';
import PagerNavigator from './home/PagerNavigator.vue';
import { menusMap, routesMap } from './menu';
import { onRouterReady, onRoutePathChange } from './utils';
import type { FunctionalComponent } from 'vue';
import type { MenuTab, RouteMetaData } from './menu';
import type { MenuOption } from 'naive-ui';

const router = useRouter();
const route = useRoute();
const { current: siteTheme, isDark } = useThemeController();
const { current: siteLang } = useI18nController();
const currentTab = ref<MenuTab>();
const currentMenuKey = ref<string>();
const theme = computed(() => (isDark.value ? darkTheme : null));
const menu = computed<MenuOption[]>(() => menusMap[currentTab.value!][siteLang.value]);
const MenuVNode: FunctionalComponent<{ menu: MenuOption[] }> = props => {
    const { menu } = props;
    return createVNode(NMenu, {
        value: currentMenuKey.value,
        'onUpdate:value': (key: string) => {
            currentMenuKey.value = key;
            router.push(`/${siteLang.value}/${key}`);
        },
        options: menu,
        accordion: true
    });
};
const handleShowNavMenu = () => {
    const allMenu = [
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
    ];
    const { show } = McPopup<{ menu: MenuOption[] }, { 'update:value': (key: string) => void }>(MenuVNode, {
        props: { menu: allMenu },
        on: {
            'update:value': key => {
                watchOnce(
                    () => route.meta,
                    meta => {
                        const { tab } = meta as RouteMetaData;
                        currentTab.value = tab;
                    }
                );
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
const handleUpdateTab = (tab: MenuTab) => {
    router.push(routesMap[tab][siteLang.value][0].path);
    currentMenuKey.value = menu.value[0].key! as string;
};
const updateMenuTab = (tab: MenuTab, route: string) => {
    currentTab.value = tab;
    currentMenuKey.value = `${tab}/${route}`;
};

onRouterReady((router, { meta }) => {
    const { tab, route } = meta as RouteMetaData;
    updateMenuTab(tab, route);
});
onRoutePathChange((path, { meta }) => {
    const { title, tab, route } = meta as RouteMetaData;
    updateMenuTab(tab, route);
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
