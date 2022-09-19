<template>
    <McSpace vertical :gap="4">
        <McInput :input-limits="['number']" placeholder="只能输入数字" />
        <McInput :input-limits="[/[\u4E00-\u9FA5]/g]" placeholder="只能输入中文" />
        <McInput :input-limits="[canOnlyInput6]" placeholder="只能输入 6" />
        <McInput type="textarea" :input-limits="[notAllowPaste]" :min-rows="6">
            <template #placeholder>
                <div class="mc-flex mc-items-center mc-justify-center mc-w-full mc-text-2xl">此处禁止粘贴<McIcon :icon="Ban" style="margin-left: 4px" /></div>
            </template>
        </McInput>
    </McSpace>
</template>

<script lang="ts" setup>
import { McSpace, McInput, InputEventType } from 'meetcode-ui';
import { Ban } from '@vicons/ionicons5';

const canOnlyInput6 = (value: string) => {
    if (value.replaceAll('6', '').length > 0) return false;
    return true;
};
const notAllowPaste = (value: string, event: Event) => {
    if ((event as InputEvent).inputType === InputEventType.PASTE) return false;
    return true;
};
</script>
