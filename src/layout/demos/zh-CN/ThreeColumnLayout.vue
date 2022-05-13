<template>
    <McLayout class="layout-preset-demo" style="height: 200px" preset="three-column">
        <template #left-sider></template>
        <template #content></template>
        <template #right-sider></template>
    </McLayout>

    <!-- <McLayout class="layout-preset-demo" style="height: 200px" preset="three-column" fixed-sider>
        <template #left-sider></template>
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
        <template #right-sider></template>
    </McLayout> -->
</template>

<script lang="ts" setup>
import { McLayout } from 'meetcode-ui';
</script>
