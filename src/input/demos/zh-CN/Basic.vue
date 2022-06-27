<template>
    <McInput v-model:value="value" />
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { McInput } from 'meetcode-ui';

const value = ref('');
</script>
