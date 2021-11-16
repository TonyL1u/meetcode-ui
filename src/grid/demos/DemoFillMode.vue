<template>
    <McGrid :auto-columns="['100px', '1fr']" :gap="12">
        <McGridItem class="demo-grid-item" />
        <McGridItem class="demo-grid-item" />
        <McGridItem class="demo-grid-item" />
        <McGridItem class="demo-grid-item" />
    </McGrid>

    <McGrid class="mc-mt-3" :auto-columns="['100px', '1fr']" :gap="12" autofill>
        <McGridItem class="demo-grid-item" />
        <McGridItem class="demo-grid-item" />
        <McGridItem class="demo-grid-item" />
        <McGridItem class="demo-grid-item" />
    </McGrid>
</template>

<script lang="ts" setup>
import { McGrid, McGridItem } from 'meetcode-ui';
</script>

<style lang="scss" scoped>
.demo-grid-item {
    @apply mc-h-10 mc-rounded mc-text-white mc-justify-center mc-items-center;

    &:nth-child(odd) {
        @apply mc-bg-green-200;
    }

    &:nth-child(even) {
        @apply mc-bg-green-300;
    }
}
</style>
