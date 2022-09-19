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
