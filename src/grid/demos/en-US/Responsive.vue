<template>
    <McButton class="mc-mb-3" type="success" ghost @click="items++">点击添加</McButton>
    <McGrid auto-columns="100px" :gap="12">
        <McGridItem v-for="item in items" class="demo-grid-item" />
    </McGrid>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { McGrid, McGridItem, McButton } from 'meetcode-ui';

const items = ref(4);
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
