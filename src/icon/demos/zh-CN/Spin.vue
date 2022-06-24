<template>
    <McSpace>
        <McIcon :icon="IconCog" :size="30" />
        <McIcon :icon="IconCog" :size="30" speed="slow" spin />
        <McIcon :icon="IconCog" :size="30" speed="normal" spin />
        <McIcon :icon="IconCog" :size="30" speed="fast" spin />
    </McSpace>
</template>

<script lang="ts" setup>
import { McIcon, McSpace } from 'meetcode-ui';
import { Cog as IconCog } from '@vicons/ionicons5';
</script>
