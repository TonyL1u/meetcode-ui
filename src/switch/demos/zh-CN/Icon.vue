<template>
    <McSpace>
        <McSwitch v-model:value="checked">
            <template #icon>
                <McIcon :size="16">
                    <ArrowBackOutline v-if="checked" />
                    <ArrowForwardOutline v-else />
                </McIcon>
            </template>
        </McSwitch>
        <McSwitch v-model:value="checked" checked-text="Dark" unchecked-text="Light">
            <template #icon>
                <McIcon :size="16">
                    <MoonOutline v-if="checked" />
                    <SunnyOutline v-else />
                </McIcon>
            </template>
        </McSwitch>
    </McSpace>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { McSpace, McSwitch } from 'meetcode-ui';
import { ArrowForwardOutline, ArrowBackOutline, MoonOutline, SunnyOutline } from '@vicons/ionicons5';

const checked = ref(false);
</script>
