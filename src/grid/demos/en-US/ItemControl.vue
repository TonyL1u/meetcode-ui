<template>
    <McGrid :columns="4" :rows="4" :gap="12">
        <McGridItem class="demo-grid-item mc-bg-green-200" :x="1" :y="1">1</McGridItem>
        <McGridItem class="demo-grid-item mc-bg-green-300" :x="1" :y="2" :y-size="3">2</McGridItem>
        <McGridItem class="demo-grid-item mc-bg-green-400" :x="2" :y="1" :x-size="2" :y-size="4">3</McGridItem>
        <McGridItem class="demo-grid-item mc-bg-green-500" :x="4" :y="1" :y-size="4">4</McGridItem>
    </McGrid>
</template>

<script lang="ts" setup>
import { McGrid, McGridItem } from 'meetcode-ui';
</script>

<style lang="scss" scoped>
.demo-grid-item {
    @apply mc-h-full mc-rounded mc-text-white mc-justify-center mc-items-center;
    min-height: 40px;
}
</style>
