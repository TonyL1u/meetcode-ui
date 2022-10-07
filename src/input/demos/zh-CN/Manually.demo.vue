<markdown>
### 手动操作

动手操作起来。
</markdown>

<template>
    <McSpace vertical :gap="4">
        <McInput ref="input" v-model:value="value" type="password" />
        <McInput ref="textarea" type="textarea" autosize resizable :min-rows="2" :max-rows="5" word-count />
        <McSpace>
            <McButton @click="focus">聚焦</McButton>
            <McButton @click="blur">失焦</McButton>
            <McButton @click="select">选中文本</McButton>
            <McButton @click="setPasswordVisible">{{ visible ? '隐藏密码' : '显示密码' }}</McButton>
            <McButton @click="resize">调整大小</McButton>
        </McSpace>
    </McSpace>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { McSpace, McButton, McInput } from 'meetcode-ui';
import type { InputExposeInstance } from 'meetcode-ui';

const value = ref('');
const visible = ref(false);
const input = ref<InputExposeInstance>();
const textarea = ref<InputExposeInstance>();

const focus = () => {
    input.value?.focus();
};
const blur = () => {
    input.value?.blur();
};
const select = () => {
    input.value?.select();
};
const setPasswordVisible = () => {
    visible.value = !visible.value;
    input.value?.setPasswordVisible(visible.value);
};
const resize = () => {
    textarea.value?.resize();
};
</script>
