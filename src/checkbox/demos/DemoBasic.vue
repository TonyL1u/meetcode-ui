<template>
    <McCheckbox v-model:value="value1" label="Apple"></McCheckbox>
    <McCheckbox v-model:value="value2" disabled>Orange</McCheckbox>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { McCheckbox } from 'meetcode-ui';

const value1 = ref(false);
const value2 = ref(true);
</script>
