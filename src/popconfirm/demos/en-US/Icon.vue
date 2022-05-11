<template>
    <McPopconfirm content="这是一段内容确定删除吗？">
        <template #icon>
            <McIcon class="mc-mr-2" color="#16a34a" :size="22">
                <IconCheck />
            </McIcon>
        </template>
        <McButton type="success" ghost>点击</McButton>
    </McPopconfirm>
</template>

<script lang="ts" setup>
import { McPopconfirm, McButton, McIcon } from 'meetcode-ui';
import { CheckmarkCircle as IconCheck } from '@vicons/ionicons5';
</script>
