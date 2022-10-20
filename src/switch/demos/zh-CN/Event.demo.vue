<markdown>
### 事件

没有绑定值只会触发 `on-switch` 事件。

绑定值会同时触发 `on-update:value` 和 `on-switch` 事件。
</markdown>

<template>
    <McSpace>
        <McSwitch @switch="handleSwitch" />
        <McSwitch v-model:value="checked" @update:value="handleUpdateValue" />
    </McSpace>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { McSpace, McSwitch, McMessage } from 'meetcode-ui';

const checked = ref(false);
const handleSwitch = (value: boolean) => {
    McMessage.text(`[Event on-switch]: ${value}`);
};
const handleUpdateValue = (value: boolean) => {
    McMessage.text(`[Event on-update:value]: ${value}`);
};
</script>
