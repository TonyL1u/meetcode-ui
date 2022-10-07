<markdown>
### 尺寸
</markdown>

<template>
    <McSpace vertical :gap="0">
        <McProgress :percentage="70" type="circle" :size="88" :stroke-width="4" />
        <McProgress :percentage="70" type="circle" :stroke-width="12" />
        <McProgress :percentage="70" :height="12" />
    </McSpace>
</template>

<script lang="ts" setup>
import { McProgress, McSpace } from 'meetcode-ui';
</script>
