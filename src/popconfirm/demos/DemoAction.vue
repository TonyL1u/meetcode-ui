<template>
    <McPopconfirm ref="popconfirm" :content="`点击了 ${count} 次`">
        <NButton type="primary" ghost>点击</NButton>
        <template #action>
            <NButton size="small" type="info" @click="count++">确定</NButton>
        </template>
    </McPopconfirm>
</template>

<script lang="ts" setup>
import { NButton } from 'naive-ui';
import { McPopconfirm } from 'meetcode-ui';
import { ref } from 'vue';

const count = ref(0);
</script>
