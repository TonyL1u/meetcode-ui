<template>
    <McButton @click="handleClick">{{ props.msg }}</McButton>
</template>

<script lang="ts" setup>
import { McButton } from 'meetcode-ui';
const props = defineProps<{
    msg?: string;
}>();
const emit = defineEmits<{
    (e: 'update'): void;
}>();

const handleClick = () => {
    emit('update');
};
</script>
