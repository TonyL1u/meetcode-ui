<markdown>
### 自定义指示器

可以把指示器放在里面，或者自定义指示器内容，甚至不显示它。
</markdown>

<template>
    <McSpace vertical :gap="0">
        <McSpace>
            <McProgress :percentage="0" type="circle" :show-indicator="false" />
            <McProgress :percentage="10" type="circle" color="#dc2626" track-color="#dc262633">
                <template #indicator>2 Days</template>
            </McProgress>
            <McProgress :percentage="90" type="circle">
                <template #indicator>
                    <McIcon :icon="CheckmarkCircle" :size="36" color="#10b981" />
                </template>
            </McProgress>
        </McSpace>
        <McProgress :percentage="10" :height="16" indicator-placement="inside">
            <template #indicator>
                <McIcon :icon="BatteryHalf" :size="16" />
            </template>
        </McProgress>
        <McProgress :percentage="30" :height="16" indicator-placement="inside" />
        <McProgress :percentage="50" :show-indicator="false">
            <template #indicator>请等待</template>
        </McProgress>
        <McProgress :percentage="70" />
        <McProgress :percentage="90">
            <template #indicator="{ percentage }">剩余电量 {{ percentage }} %</template>
        </McProgress>
    </McSpace>
</template>

<script lang="ts" setup>
import { McProgress, McSpace, McIcon } from 'meetcode-ui';
import { CheckmarkCircle, BatteryHalf } from '@vicons/ionicons5';
</script>
