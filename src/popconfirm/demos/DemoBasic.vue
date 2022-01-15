<template>
    <McSpace>
        <McPopconfirm content="这是一段内容确定删除吗？">
            <McButton>点击</McButton>
        </McPopconfirm>

        <McPopconfirm content="这是一段内容确定删除吗？" cancel-text="我要删除" confirm-disabled>
            <McButton>确认</McButton>
        </McPopconfirm>

        <McPopconfirm content="这是一段内容确定删除吗？" :confirm-text="null">
            <McButton>取消</McButton>
        </McPopconfirm>
    </McSpace>
</template>

<script lang="ts" setup>
import { McPopconfirm, McButton, McSpace } from 'meetcode-ui';
</script>
