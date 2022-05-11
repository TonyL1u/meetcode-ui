<template>
    <McGrid :columns="2" :gap="12">
        <McGridItem class="demo-grid-item mc-bg-green-200" />
        <McGridItem class="demo-grid-item mc-bg-green-300" />
        <McGridItem class="demo-grid-item mc-bg-green-300" />
        <McGridItem class="demo-grid-item mc-bg-green-200" />
    </McGrid>
</template>

<script lang="ts" setup>
import { McGrid, McGridItem } from 'meetcode-ui';
</script>

<style lang="scss" scoped>
.demo-grid-item {
    @apply mc-h-10 mc-rounded mc-text-white mc-justify-center mc-items-center;
}
</style>
