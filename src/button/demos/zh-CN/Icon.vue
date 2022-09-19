<template>
    <McSpace>
        <McButton type="success" ghost>
            <template #icon>
                <McIcon>
                    <IconAttach />
                </McIcon>
            </template>
            上传附件
        </McButton>

        <McButton type="success" ghost icon-right>
            <template #icon>
                <McIcon>
                    <IconAttach />
                </McIcon>
            </template>
            上传附件
        </McButton>
    </McSpace>
</template>

<script lang="ts" setup>
import { McButton, McIcon, McSpace } from 'meetcode-ui';
import { AttachOutline as IconAttach } from '@vicons/ionicons5';
</script>
