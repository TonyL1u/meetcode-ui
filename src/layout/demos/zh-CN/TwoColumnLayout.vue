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
