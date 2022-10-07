<markdown>
### 前缀 & 后缀

设置 `type = textarea` 时，仅支持 `prepend` 和 `prefix` 插槽。
</markdown>

<template>
    <McSpace vertical :gap="4">
        <McInput :input-limits="['number']" placeholder="9999">
            <template #suffix>个</template>
        </McInput>
        <McInput type="password" placeholder="请输入密码">
            <template #prefix>
                <McIcon :icon="FingerPrint" :size="18" />
            </template>
        </McInput>
        <McInput placeholder="e.g. meetcode-ui">
            <template #prepend>https://</template>
            <template #append>.com</template>
        </McInput>
        <McInput type="textarea" placeholder="QR Code" autosize :resizable="false">
            <template #prefix>
                <McIcon :icon="QrCodeOutline" :size="18" />
            </template>
        </McInput>
        <McInput type="textarea" autosize word-count>
            <template #prepend>
                <McIcon :icon="CodeSlash" />
            </template>
        </McInput>
    </McSpace>
</template>

<script lang="ts" setup>
import { McSpace, McInput, McIcon } from 'meetcode-ui';
import { CodeSlash, FingerPrint, QrCodeOutline } from '@vicons/ionicons5';
</script>
