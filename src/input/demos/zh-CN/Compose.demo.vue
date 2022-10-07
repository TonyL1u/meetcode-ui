<markdown>
### 组合输入框

将多个 `Input` 框组合在一起，通过 `input-count` 属性（默认为 2）来控制组合个数。**绑定的值必须为数组且长度与组合个数一致**。
</markdown>

<template>
    <McSpace vertical :gap="4">
        <McInput v-model:value="value1" :placeholder="['From', 'To']" separator="-" composed />
        {{ value1 }}
        <McInput v-model:value="value2" :placeholder="['值1', '值2', '值3']" :separator="['和', '或']" :input-count="3" composed clearable />
        {{ value2 }}
    </McSpace>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { McSpace, McInput } from 'meetcode-ui';

const value1 = ref(['', '']);
const value2 = ref(['', '', '']);
</script>
