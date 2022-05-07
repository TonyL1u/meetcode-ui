<template>
    <McCheckbox v-model:value="value" checked-value="yes" unchecked-value="no">{{ value }}</McCheckbox>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { McCheckbox } from 'meetcode-ui';

const value = ref('yes');
</script>
