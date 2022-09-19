<template>
    <McLayout preset="full" class="layout-preset-demo" style="height: 100%" :header-style="headerStyle" :footer-style="footerStyle">
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
    </McLayout>
</template>

<script lang="ts" setup>
import { McLayout } from 'meetcode-ui';

const headerStyle = { height: '48px', background: ' #d1fae5' };
const footerStyle = { height: '48px', background: ' #d1fae5' };
</script>
