<template>
    <McSpace vertical :gap="4">
        <div style="margin-bottom: 6px; display: flex; width: 100%">
            <McInput ref="input" :rules="rules1" clearable />
            <McButton style="margin-left: 16px" @click="handleValidate">验证</McButton>
            <McButton style="margin-left: 16px" type="primary" @click="handleReset">重置</McButton>
        </div>
        <McInput style="margin-bottom: 4px" placeholder="请输入邮箱" :rules="rules2" :disabled="isValidating" :loading="isValidating" />
    </McSpace>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { McSpace, McInput, McButton, McMessage } from 'meetcode-ui';
import type { InputValidRule, InputExposeInstance } from 'meetcode-ui';

const isValidating = ref(false);
const input = ref<InputExposeInstance>();
const rules1: InputValidRule[] = [
    {
        trigger: ['input', 'blur'],
        validator: value => {
            if (!value) {
                return new Error('请输入年龄');
            } else if (!/^\d*$/.test(value as string)) {
                return new Error('请输入数字');
            } else if (Number(value) <= 18) {
                return new Error('必须大于18岁');
            }
        }
    },
    {
        trigger: ['clear'],
        required: true,
        message: '请输入年龄'
    }
];
const rules2: InputValidRule[] = [
    {
        trigger: ['change'],
        validator: value => {
            isValidating.value = true;

            const regExp = /^([0-9A-Za-z-_.]+)@([0-9a-z]+.[a-z]{2,3}(.[a-z]{2})?)$/g;
            return new Promise<Error | boolean>(resolve => {
                setTimeout(() => {
                    isValidating.value = false;
                    resolve(regExp.test(value as string) ? true : new Error('请输入合法的邮箱地址'));
                }, 1000);
            });
        }
    }
];
const handleValidate = () => {
    input.value?.validate('blur', isValid => {
        isValid ? McMessage.success('验证通过') : McMessage.error('验证失败');
    });
};
const handleReset = () => {
    input.value?.reset();
};
</script>
