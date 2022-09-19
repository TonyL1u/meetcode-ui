<template>
    <McInput clearable>
        <template #placeholder>
            <span class="mc-flex mc-items-center">一键清除<McIcon :icon="FlashOutline" style="margin-left: 4px" /></span>
        </template>
    </McInput>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { McInput, McIcon } from 'meetcode-ui';
import { FlashOutline } from '@vicons/ionicons5';
</script>
