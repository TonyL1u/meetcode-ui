<markdown>
### 尺寸
</markdown>

<template>
    <McSpace vertical :gap="4">
        <McInput v-model:value="value" size="small" placeholder="小" />
        <McInput v-model:value="value" size="medium" placeholder="中" />
        <McInput v-model:value="value" size="large" placeholder="大" />
    </McSpace>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { McSpace, McInput } from 'meetcode-ui';

const value = ref('');
</script>
