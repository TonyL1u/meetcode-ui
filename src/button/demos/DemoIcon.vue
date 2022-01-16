<template>
    <McButton type="success" ghost>
        <template #icon>
            <McIcon>
                <IconAttach />
            </McIcon>
        </template>
        上传附件
    </McButton>
</template>

<script lang="ts" setup>
import { McButton, McIcon } from 'meetcode-ui';
import { AttachOutline as IconAttach } from '@vicons/ionicons5';
</script>
