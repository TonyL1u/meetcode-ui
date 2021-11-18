<template>
    <McGrid :columns="2" :gap="12">
        <McLoading type="ripple" placement="top">
            <McGridItem class="mc-h-24 mc-bg-green-500"></McGridItem>
            <template #description>描述文字在下边...</template>
        </McLoading>

        <McLoading type="ripple" placement="right" description="描述文字在左边...">
            <McGridItem class="mc-h-24 mc-bg-green-500"></McGridItem>
        </McLoading>

        <McLoading type="ripple" placement="bottom">
            <McGridItem class="mc-h-24 mc-bg-green-500"></McGridItem>
            <template #description>描述文字在上边...</template>
        </McLoading>

        <McLoading type="ripple" placement="left" description="描述文字在右边...">
            <McGridItem class="mc-h-24 mc-bg-green-500"></McGridItem>
        </McLoading>
    </McGrid>
</template>

<script lang="ts" setup>
import { McLoading, McGrid, McGridItem } from 'meetcode-ui';
</script>
