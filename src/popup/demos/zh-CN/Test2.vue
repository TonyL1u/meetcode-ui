<template>
    <McSpace vertical>
        响应式变量: {{ props.reactiveCount }} 非响应式变量: {{ props.count }}
        <McButton type="success" ghost @click="handleClick">点我关闭弹窗</McButton>
        <McButton type="success" ghost @click="handleIncrease">+1</McButton>
    </McSpace>
</template>

<script lang="ts" setup>
import { McButton, McSpace } from 'meetcode-ui';

const props = defineProps<{ count: number; reactiveCount: number }>();
const emit = defineEmits<{ (e: 'close'): void; (e: 'update'): void }>();

const handleClick = () => {
    emit('close');
};
const handleIncrease = () => {
    emit('update');
};
</script>
