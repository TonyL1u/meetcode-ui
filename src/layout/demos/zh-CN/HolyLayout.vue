<template>
    <McLayout preset="holy" class="layout-preset-demo" style="height: 296px" :header-style="{ height: '48px' }" :footer-style="{ height: '48px' }">
        <template #header></template>
        <template #left-sider></template>
        <template #content></template>
        <template #right-sider></template>
        <template #footer></template>
    </McLayout>
</template>

<script lang="ts" setup>
import { McLayout } from 'meetcode-ui';
</script>

<style lang="scss" scoped>
.layout-preset-demo {
    .mc-layout-sider {
        background: #a7f3d0;
    }

    .mc-layout-header,
    .mc-layout-footer {
        background: #d1fae5;
        height: 32px;
    }

    .mc-layout-content {
        background: #6ee7b7;
    }
}

.layout-preset-demo:not(:first-child) {
    margin-top: 12px;
}
</style>
