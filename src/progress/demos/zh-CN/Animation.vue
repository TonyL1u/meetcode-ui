<template>
    <McSpace vertical :gap="0">
        <McSpace>
            <McProgress type="circle" animation>
                <template #indicator="{ percentage }">
                    <span v-if="percentage < 100">{{ ~~percentage }}%</span>
                    <McIcon v-else :icon="CheckmarkCircle" :size="36" color="#10b981" />
                </template>
            </McProgress>
            <McProgress type="circle" :duration="10000" color="#3b82f6" track-color="#3b82f633" animation loop />
        </McSpace>
        <McProgress animation />
        <McProgress :duration="10000" animation loop />
    </McSpace>
</template>

<script lang="ts" setup>
import { McProgress, McSpace, McIcon } from 'meetcode-ui';
import { CheckmarkCircle } from '@vicons/ionicons5';
</script>
