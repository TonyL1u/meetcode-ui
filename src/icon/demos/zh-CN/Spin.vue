<template>
    <McSpace>
        <McIcon :size="30">
            <IconCog />
        </McIcon>

        <McIcon :size="30" spin speed="slow">
            <IconCog />
        </McIcon>

        <McIcon :size="30" spin speed="normal">
            <IconCog />
        </McIcon>

        <McIcon :size="30" spin speed="fast">
            <IconCog />
        </McIcon>
    </McSpace>
</template>

<script lang="ts" setup>
import { McIcon, McSpace } from 'meetcode-ui';
import { Cog as IconCog } from '@vicons/ionicons5';
</script>
