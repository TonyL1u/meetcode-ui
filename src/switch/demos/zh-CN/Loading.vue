<template>
    <McSwitch v-model:value="checked" checked-color="#d03050" :loading="!checked">
        <template #icon>
            <McIcon v-if="checked" :size="16">
                <CloseSharp />
            </McIcon>
        </template>
    </McSwitch>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { McSwitch, McIcon } from 'meetcode-ui';
import { CloseSharp } from '@vicons/ionicons5';

const checked = ref(false);
</script>
