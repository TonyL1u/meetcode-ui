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
    McMessage.text(`[Event on-switch]: ${value}`);
};
const handleUpdateValue = (value: boolean) => {
    McMessage.text(`[Event on-update:value]: ${value}`);
};
</script>
