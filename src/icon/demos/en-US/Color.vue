<template>
    <McSpace>
        <McIcon :size="20" color="#3b82f6">
            <IconCloud />
        </McIcon>

        <McIcon :size="25" color="#3b82f6">
            <IconCloud />
        </McIcon>

        <McIcon :size="30" color="#3b82f6">
            <IconCloud />
        </McIcon>

        <McIcon :size="35" color="#3b82f6">
            <IconCloud />
        </McIcon>

        <McIcon :size="40" color="#3b82f6">
            <IconCloud />
        </McIcon>
    </McSpace>
</template>

<script lang="ts" setup>
import { McIcon, McSpace } from 'meetcode-ui';
import { Cloudy as IconCloud } from '@vicons/ionicons5';
</script>
