<template>
    <McProgress type="circle" :duration="10000" :start="20" :end="80" animation loop>
        <template #indicator="{ percentage, progress, time, duration }">
            <div style="font-size: 12px; text-align: center">
                <div>进度：{{ ~~progress }}%</div>
                <div>百分比：{{ ~~percentage }}%</div>
                <div>已持续：{{ ~~(time / 1000) }}s / {{ duration / 1000 }}s</div>
            </div>
        </template>
    </McProgress>
</template>

<script lang="ts" setup>
import { McProgress, McSpace } from 'meetcode-ui';
</script>
