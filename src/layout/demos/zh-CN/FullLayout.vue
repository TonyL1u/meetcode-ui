<template>
    <McLayout preset="full" class="layout-preset-demo" style="height: 296px" :header-style="{ height: '48px' }" :footer-style="{ height: '48px' }">
        <template #header></template>
        <template #content></template>
        <template #footer></template>
    </McLayout>
</template>

<script lang="ts" setup>
import { McLayout } from 'meetcode-ui';
</script>
