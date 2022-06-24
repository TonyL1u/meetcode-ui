<template>
    <McSpace>
        <McIcon :icon="IconCloud" :size="20" color="#3b82f6" />
        <McIcon :icon="IconCloud" :size="25" color="#3b82f6" />
        <McIcon :icon="IconCloud" :size="30" color="#3b82f6" />
        <McIcon :icon="IconCloud" :size="35" color="#3b82f6" />
        <McIcon :icon="IconCloud" :size="40" color="#3b82f6" />
    </McSpace>
</template>

<script lang="ts" setup>
import { McIcon, McSpace } from 'meetcode-ui';
import { Cloudy as IconCloud } from '@vicons/ionicons5';
</script>
