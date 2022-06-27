<template>
    <div style="display: flex">
        <McInput v-model:value="value" :placeholder="disabled ? '禁止输入' : '可以输入'" :disabled="disabled" clearable />
        <McSwitch v-model:value="disabled" style="margin-left: 16px" />
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { McInput, McSwitch } from 'meetcode-ui';

const value = ref('');
const disabled = ref(true);
</script>
