<template>
    <McSpace>
        <McButton type="success" ghost @click="open">打开一个信息</McButton>
        <McPopselect :options="types" :auto-close="false" @select="handleSelect">
            <McButton type="success" ghost>修改类型</McButton>
        </McPopselect>
    </McSpace>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue';
import { McSpace, McMessage, McButton, McPopselect, PopselectValue } from 'meetcode-ui';
import type { MessageType, MessageOptions, PopselectOption, ConfigurableMessage } from 'meetcode-ui';

const types = ref<PopselectOption[]>([
    { label: 'Text', value: 'text' },
    { label: 'Success', value: 'success' },
    { label: 'Warning', value: 'warning' },
    { label: 'Info', value: 'info' },
    { label: 'Error', value: 'error' }
]);
const options = reactive<MessageOptions>({
    type: 'text',
    message: `这是一个 Text 信息`,
    duration: 10000,
    closable: true
});
let messageInstance: ConfigurableMessage | null = null;

const open = () => {
    messageInstance = McMessage(options);
};

const handleSelect = (value: PopselectValue, option: PopselectOption) => {
    if (messageInstance) {
        messageInstance.type = value as MessageType;
        options.message = `这是一个 ${option.label} 信息`;
    }
};
</script>
