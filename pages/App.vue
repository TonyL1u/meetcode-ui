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
                                <router-view :class="siteTheme ? 'dark' : 'light'" />
                            </NNotificationProvider>
                        </NLayoutContent>
                        <NLayoutSider class="sider-navigator" :width="164" content-style="padding-right: 24px">
                            <!-- <Navigator /> -->
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
import Header from './home/Header.vue';
import Menu from './home/Menu.vue';
// import Navigator from './home/Navigator.vue';
import { siteTheme } from './site.config';

// 初始跟随系统主题
const theme = computed(() => {
    return siteTheme.value ? darkTheme : null;
});
</script>

<style lang="scss">
@import './style/highlight.scss';
@import './style/highlight-dark.scss';
@import './style/markdown-style.scss';

html,
body {
    margin: 0;
    padding: 0;
}

#app {
    font-family: v-sans, Avenir, Helvetica, Arial, sans-serif;
    // -webkit-font-smoothing: antialiased;
    // -moz-osx-font-smoothing: grayscale;
    height: 100vh;

    .header {
        padding: 0 24px;
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
        max-width: 768px;
        margin: 1em auto;
        padding: 0 24px;

        @include custom-markdown-style;

        a:not(.mc-text-link-a) {
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
    #app .header .nav-menu-trigger {
        display: inline-block;
        margin-left: 8px;
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
