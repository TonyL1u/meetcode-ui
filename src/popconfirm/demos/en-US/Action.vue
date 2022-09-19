<template>
    <McPopconfirm :content="`点击了 ${count} 次`">
        <McButton type="success" ghost>点击</McButton>
        <template #action>
            <McButton size="small" type="primary" @click="count++">确定</McButton>
        </template>
    </McPopconfirm>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { McPopconfirm, McButton } from 'meetcode-ui';

const count = ref(0);
</script>
