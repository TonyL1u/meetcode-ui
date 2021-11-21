<template>
    <McTooltip :content="'122223333这是测试内容' + count">
        <NButton type="primary" ghost @click="count++">悬浮</NButton>
    </McTooltip>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { NButton } from 'naive-ui';
import { McTooltip } from 'meetcode-ui';

const count = ref(0);
</script>
