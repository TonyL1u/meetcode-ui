<template>
    <McSpace vertical>
        reactiveCount: {{ props.reactiveCount }} count: {{ props.count }}
        <McButton type="success" ghost @click="handleClick">Close</McButton>
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
