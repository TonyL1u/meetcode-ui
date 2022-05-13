<template>
    <McLayout preset="full" class="layout-preset-demo" style="height: 296px" :header-style="headerStyle" :footer-style="footerStyle" :content-style="contentStyle">
        <template #header></template>
        <template #content></template>
        <template #footer></template>
    </McLayout>
</template>

<script lang="ts" setup>
import { McLayout } from 'meetcode-ui';

const headerStyle = { height: '48px', background: ' #d1fae5' };
const contentStyle = { background: '#6ee7b7' };
const footerStyle = { height: '48px', background: ' #d1fae5' };
</script>
