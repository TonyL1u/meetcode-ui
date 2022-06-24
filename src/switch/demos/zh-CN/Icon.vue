<template>
    <McSpace>
        <McSwitch v-model:value="checked">
            <template #icon>
                <McIcon :icon="checked ? ArrowBackOutline : ArrowForwardOutline" />
            </template>
        </McSwitch>
        <McSwitch checked-text="Dark" unchecked-text="Light">
            <template #checked-icon>
                <McIcon :icon="Moon" />
            </template>
            <template #unchecked-icon>
                <McIcon :icon="Sunny" />
            </template>
        </McSwitch>
    </McSpace>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { McSpace, McIcon, McSwitch } from 'meetcode-ui';
import { ArrowForwardOutline, ArrowBackOutline, Moon, Sunny } from '@vicons/ionicons5';

const checked = ref(false);
</script>
