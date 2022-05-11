<template>
    <McSpace>
        <McPopconfirm content="这是一段内容确定删除吗？">
            <McButton type="success" ghost>点击</McButton>
        </McPopconfirm>

        <McPopconfirm content="这是一段内容确定删除吗？" cancel-text="我要删除" confirm-disabled>
            <McButton type="success" ghost>确定</McButton>
        </McPopconfirm>

        <McPopconfirm content="这是一段内容确定删除吗？" :confirm-text="null">
            <McButton type="success" ghost>取消</McButton>
        </McPopconfirm>
    </McSpace>
</template>

<script lang="ts" setup>
import { McPopconfirm, McButton, McSpace } from 'meetcode-ui';
</script>
