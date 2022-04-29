<template>
    <McButton @click="handleClick">{{ props.msg }}</McButton>
</template>

<script lang="ts" setup>
import { McButton } from 'meetcode-ui';

const props = defineProps<{ msg?: string }>();
const emit = defineEmits<{ (e: 'close'): void }>();

const handleClick = () => {
    emit('close');
};
</script>
