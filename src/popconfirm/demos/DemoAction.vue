<template>
    <McPopconfirm ref="popconfirm" :content="`点击了 ${count} 次`">
        <NButton type="primary" ghost>点击</NButton>
        <template #action>
            <NButton size="small" type="info" @click="count++">确定</NButton>
        </template>
    </McPopconfirm>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { NButton } from 'naive-ui';
import { McPopconfirm } from 'meetcode-ui';

const count = ref(0);
</script>
