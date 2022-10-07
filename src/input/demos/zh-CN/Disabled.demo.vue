<markdown>
### 禁用
</markdown>

<template>
    <McSpace vertical :gap="4">
        <div style="display: flex; width: 100%">
            <McInput v-model:value="value" :placeholder="disabled ? '禁止输入' : '可以输入'" :disabled="disabled" clearable />
            <McSwitch v-model:value="disabled" style="margin-left: 16px" />
        </div>
        <div style="display: flex; width: 100%">
            <McInput v-model:value="value" type="textarea" :placeholder="disabled ? '禁止输入' : '可以输入'" :disabled="disabled" :min-rows="3" :resizable="false" />
            <McSwitch v-model:value="disabled" style="margin-left: 16px" />
        </div>
    </McSpace>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { McSpace, McInput, McSwitch } from 'meetcode-ui';

const value = ref('');
const disabled = ref(true);
</script>
