<markdown>
### 自定义值
</markdown>

<template>
    <McTooltip :content="checked">
        <McSwitch v-model:value="checked" checked-value="Yes" unchecked-value="No" />
    </McTooltip>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { McSwitch, McTooltip } from 'meetcode-ui';

const checked = ref('No');
</script>
