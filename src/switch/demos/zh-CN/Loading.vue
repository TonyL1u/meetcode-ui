<template>
    <McSwitch v-model:value="checked" checked-color="#d03050" :loading="!checked">
        <template #checked-icon>
            <McIcon :size="16">
                <Close />
            </McIcon>
        </template>
    </McSwitch>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { McSwitch, McIcon } from 'meetcode-ui';
import { Close } from '@vicons/ionicons5';

const checked = ref(false);
</script>
