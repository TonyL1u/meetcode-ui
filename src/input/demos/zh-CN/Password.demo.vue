<markdown>
### 密码

`type` 设置为 `password` 时，可以控制密码显示的触发方式。
</markdown>

<template>
    <McSpace item-style="flex: 1">
        <McInput v-model:value="value" type="password" :placeholder="visible ? '点击隐藏密码' : '点击显示密码'" @password-visible-change="handleVisibleChange" />
        <McInput v-model:value="value" type="password" placeholder="按下显示密码" password-visible="mousedown" />
        <McInput v-model:value="value" type="password" placeholder="没有密码显示切换" password-visible="none" />
    </McSpace>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { McSpace, McInput } from 'meetcode-ui';

const value = ref('');
const visible = ref(false);
const handleVisibleChange = (isVisible: boolean) => {
    visible.value = isVisible;
};
</script>
