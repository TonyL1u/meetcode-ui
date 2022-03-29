<template>
    <div class="header-badge">McUI Docs</div>
    <NSwitch v-model:value="siteTheme" @update:value="handleChangeTheme">
        <template #checked>深色</template>
        <template #unchecked>浅色</template>
    </NSwitch>
    <NavMenu />
</template>

<script lang="ts" setup>
import { NSwitch } from 'naive-ui';
import NavMenu from './NavMenu.vue';
import { siteTheme } from '../site.config';
import { setGlobalTheme } from 'meetcode-ui';

const handleChangeTheme = (val: boolean) => {
    setGlobalTheme(val ? 'dark' : 'light');
};
</script>

<style lang="scss" scoped>
.header-badge {
    position: absolute;
    left: 8px;
    font-size: 24px;
    color: var(--text-color);
}
</style>
