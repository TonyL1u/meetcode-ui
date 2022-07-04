<template>
    <McSpace vertical :gap="4">
        <McInputGroup style="width: 100%">
            <McPopselect
                v-model:value="code"
                :options="[
                    { label: '+86', value: '+86' },
                    { label: '+375', value: '+375' },
                    { label: '+666', value: '+666' }
                ]"
                placement="bottom-start"
                trigger="click"
                :with-arrow="false"
            >
                <McButton>{{ code || '请选择' }}</McButton>
            </McPopselect>
            <McInput placeholder="请输入手机号" clearable />
            <McButton style="width: 120px" type="success">发送验证码</McButton>
        </McInputGroup>
        <McInputGroup style="width: 100%">
            <McInput placeholder="输入关键字并搜索" />
            <McButton>
                <template #icon>
                    <McIcon :icon="Search" color="#bbb" />
                </template>
            </McButton>
        </McInputGroup>
        <McInputGroup style="width: 100%">
            <McInput placeholder="姓名" />
            <McInput placeholder="邮箱" />
            <McInput placeholder="手机号" />
        </McInputGroup>
    </McSpace>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { McSpace, McInputGroup, McInput, McButton, McPopselect, McIcon } from 'meetcode-ui';
import { Search } from '@vicons/ionicons5';

const code = ref('');
</script>
