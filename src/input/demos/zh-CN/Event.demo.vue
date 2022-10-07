<markdown>
### 事件

一些事件。
</markdown>

<template>
    <McSpace vertical :gap="4">
        <McInput v-model:value="value" placeholder="基础事件" @update:value="handleUpdateValue" @focus="handleFocus" @blur="handleBlur" @change="handleChange" @input="handleInput" @select="handleTextSelect" />
        <McInput type="password" placeholder="其他事件" clearable @clear="handleClear" @password-visible-change="handleVisibleChange" />
    </McSpace>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { McSpace, McInput, McMessage } from 'meetcode-ui';

const value = ref('');

const handleUpdateValue = (value: string) => {
    McMessage.text(`[Event update:value]: ${value}`);
};
const handleFocus = () => {
    McMessage.text('[Event focus]');
};
const handleBlur = () => {
    McMessage.text('[Event blur]');
};
const handleChange = (value: string) => {
    McMessage.text(`[Event change]: ${value}`);
};
const handleInput = (value: string) => {
    McMessage.text(`[Event input]: ${value}`);
};
const handleTextSelect = (value: string) => {
    McMessage.text(`[Event select]: ${value}`);
};
const handleClear = () => {
    McMessage.text('[Event clear]');
};
const handleVisibleChange = (visible: boolean) => {
    McMessage.text(`[Event password-visible-change]: ${visible}`);
};
</script>
