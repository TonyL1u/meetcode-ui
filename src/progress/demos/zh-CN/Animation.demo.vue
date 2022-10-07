<markdown>
### 动画

会动的进度条。

设置 `play-on-visible` ，动画会在进度条**首次出现在视窗内**时才开始执行。
</markdown>

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
