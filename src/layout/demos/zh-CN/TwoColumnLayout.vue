<template>
    <McLayout class="layout-preset-demo" style="height: 200px" preset="two-column">
        <template #sider></template>
        <template #content></template>
    </McLayout>
    <!-- 
    <McLayout class="layout-preset-demo" style="height: 200px" preset="two-column" :content-style="{ padding: '12px' }" fixed-sider>
        <template #sider></template>
        <template #content>
            <h2>滚动</h2>
            <h2>滚动</h2>
            <h2>滚动</h2>
            <h2>滚动</h2>
            <h2>滚动</h2>
            <h2>滚动</h2>
            <h2>滚动</h2>
            <h2>滚动</h2>
        </template>
    </McLayout> -->
</template>

<script lang="ts" setup>
import { McLayout } from 'meetcode-ui';
</script>

<style lang="scss">
.layout-preset-demo {
    .mc-layout-sider {
        background: #a7f3d0;
    }

    .mc-layout-header,
    .mc-layout-footer {
        background: #d1fae5;
    }

    .mc-layout-content {
        background: #6ee7b7;
    }
}

.layout-preset-demo:not(:first-child) {
    margin-top: 12px;
}
</style>
