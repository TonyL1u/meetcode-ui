<template>
    <McSpace vertical :gap="0">
        <McSpace>
            <McProgress type="circle" animation play-on-visible>
                <template #indicator="{ percentage }">
                    <span v-if="percentage < 100">{{ ~~percentage }}%</span>
                    <McIcon v-else :icon="CheckmarkCircle" :size="36" color="#10b981" />
                </template>
            </McProgress>
            <McProgress type="circle" :duration="10000" color="#3b82f6" track-color="#3b82f633" animation loop />
        </McSpace>
        <McProgress animation play-on-visible />
        <McProgress :duration="4000" animation loop />
        <McProgress :duration="5000" animation loop alternate />
    </McSpace>
</template>

<script lang="ts" setup>
import { McProgress, McSpace, McIcon } from 'meetcode-ui';
import { CheckmarkCircle } from '@vicons/ionicons5';
</script>
