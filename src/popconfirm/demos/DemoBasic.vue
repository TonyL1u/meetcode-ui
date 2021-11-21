<template>
    <NSpace>
        <McPopconfirm content="这是一段内容确定删除吗？">
            <NButton type="primary" ghost>点击</NButton>
        </McPopconfirm>

        <McPopconfirm content="这是一段内容确定删除吗？1" cancel-text="我要删除">
            <NButton type="primary" ghost>确认</NButton>
        </McPopconfirm>

        <McPopconfirm content="这是一段内容确定删除吗？" :confirm-text="null">
            <NButton type="primary" ghost>取消</NButton>
        </McPopconfirm>
    </NSpace>
</template>

<script lang="ts" setup>
import { NButton, NSpace } from 'naive-ui';
import { McPopconfirm } from 'meetcode-ui';
</script>
