<template>
    <McPopconfirm content="这是一段内容确定删除吗？">
        <template #icon>
            <NIcon :size="22" class="mc-mr-2 mc-text-green-500">
                <IconCheck />
            </NIcon>
        </template>
        <NButton type="primary" ghost>点击</NButton>
    </McPopconfirm>
</template>

<script lang="ts" setup>
import { NButton, NIcon } from 'naive-ui';
import { McPopconfirm } from 'meetcode-ui';
import { CheckmarkCircle as IconCheck } from '@vicons/ionicons5';
</script>
