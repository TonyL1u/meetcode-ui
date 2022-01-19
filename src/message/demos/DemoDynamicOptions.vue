<template>
    <McSpace>
        <McButton type="success" ghost @click="open">打开一个信息</McButton>
        <McPopselect v-model:value="type" :options="types" :auto-close="false" @update:value="handleUpdateValue">
            <McButton type="success" ghost>修改类型</McButton>
        </McPopselect>
    </McSpace>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue';
import { McSpace, McMessage, McButton, MessageInstance, MessageType, MessageOptions, McPopselect, PopselectValue, PopselectOption } from 'meetcode-ui';

const type = ref<MessageType>('text');
const types = ref<PopselectOption[]>([
    { label: 'Text', value: 'text' },
    { label: 'Success', value: 'success' },
    { label: 'Warning', value: 'warning' },
    { label: 'Info', value: 'info' },
    { label: 'Error', value: 'error' }
]);
const reactiveOptions = reactive<MessageOptions>({
    type: 'text',
    message: `这是一个 Text 信息`,
    duration: 10000,
    closable: true
});
let messageInstance: MessageInstance | null = null;

const open = () => {
    messageInstance = McMessage(reactiveOptions);
};

const handleUpdateValue = (value: PopselectValue, option: PopselectOption) => {
    reactiveOptions.type = value as MessageType;
    if (messageInstance) {
        messageInstance.message = `这是一个 ${option.label} 信息`;
    }
};
</script>
