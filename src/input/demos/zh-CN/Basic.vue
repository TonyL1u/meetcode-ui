<template>
    <McSpace vertical>
        <McInput v-model:value="value" :input-limits="['number']" :word-count="wordCount" :clearable="clearable" :loading="loading">
            <template #prefix>
                <McIcon :icon="FingerPrint" :size="18" />
            </template>
        </McInput>
        <McInput v-model:value="value" style="width: 300px" type="password">
            <template #placeholder>
                <span class="mc-flex mc-items-center">输入测试<McIcon :icon="Moon" style="margin-left: 8px" /></span>
            </template>
            <template #suffix>
                <McIcon :icon="FlashOutline" />
            </template>
        </McInput>
        <McInput v-model:value="value">
            <template #prepend>https://www.</template>
            <template #append>.com</template>
        </McInput>
        <McInput v-model:value="value" type="textarea" placeholder="请输入代码" autosize resizable :max-rows="5" word-count>
            <template #prepend>
                <McIcon :icon="CodeSlash" />
            </template>
        </McInput>
    </McSpace>

    <McSpace>
        <McButton @click="clearable = !clearable">清空</McButton>
        <McButton @click="loading = !loading">加载</McButton>
        <McButton @click="wordCount = !wordCount">字数统计</McButton>
    </McSpace>
    <NInput v-model:value="value" autosize />
    <!-- <NInput v-model:value="value" type="textarea" :maxlength="200" autosize show-count clearable resizable /> -->
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { McSpace, McInput, McIcon, McButton } from 'meetcode-ui';
import { NInput } from 'naive-ui';
import { Moon, FingerPrint, FlashOutline, CodeSlash } from '@vicons/ionicons5';

const value = ref('');
const clearable = ref(false);
const loading = ref(false);
const wordCount = ref(false);
const inputRef = ref();

const handleFocus = () => {
    inputRef.value.setPasswordVisible(true);
};
const handleBlur = () => {
    inputRef.value.setPasswordVisible(false);
};
</script>
