<template>
    <NConfigProvider :theme="theme" abstract>
        <NLayout position="absolute">
            <NLayoutHeader class="header" bordered style="height: 64px">
                <Header />
            </NLayoutHeader>
            <NLayout position="absolute" style="top: 64px" has-sider>
                <NLayoutSider class="sider-menu" bordered :collapsed-width="0" :width="300" collapse-mode="transform" show-trigger="bar">
                    <Menu />
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
import { computed } from 'vue';
import { NLayout, NLayoutHeader, NLayoutContent, NLayoutSider, NNotificationProvider, NConfigProvider, darkTheme } from 'naive-ui';
import { useThemeController } from 'meetcode-ui';
import Header from './home/Header.vue';
import Menu from './home/Menu.vue';
import Navigator from './home/Navigator.vue';
import PagerNavigator from './home/PagerNavigator.vue';

const { current: siteTheme, isDark } = useThemeController();
// 初始跟随系统主题
const theme = computed(() => {
    return isDark.value ? darkTheme : null;
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
