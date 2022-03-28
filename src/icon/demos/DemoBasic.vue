<template>
    <McSpace>
        <McIcon :size="20">
            <IconHome />
        </McIcon>

        <McIcon :size="25">
            <IconHome />
        </McIcon>

        <McIcon :size="30">
            <IconHome />
        </McIcon>

        <McIcon :size="35">
            <IconHome />
        </McIcon>

        <McIcon :size="40">
            <IconHome />
        </McIcon>
    </McSpace>
</template>

<script lang="ts" setup>
import { McIcon, McSpace } from 'meetcode-ui';
import { HomeOutline as IconHome } from '@vicons/ionicons5';
</script>
