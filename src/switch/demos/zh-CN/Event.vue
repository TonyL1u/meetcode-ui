<template>
    <McSpace>
        <McSwitch @switch="handleSwitch" />
        <McSwitch v-model:value="checked" @update:value="handleUpdateValue" />
    </McSpace>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { McSpace, McSwitch, McMessage } from 'meetcode-ui';

const checked = ref(false);
const handleSwitch = (value: boolean) => {
    McMessage.text(`[on-switch]: ${value}`, {
        card: true
    });
};
const handleUpdateValue = (value: boolean) => {
    McMessage.text(`[on-update:value]: ${value}`, {
        card: true
    });
};
</script>
