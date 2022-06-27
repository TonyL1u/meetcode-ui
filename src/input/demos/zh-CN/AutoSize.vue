<template>
    <McSpace vertical :gap="4">
        <McInput v-model:value="value" style="min-width: 250px" autosize clearable />
        <McInput v-model:value="value" type="textarea" autosize resizable :min-rows="2" :max-rows="5" word-count />
    </McSpace>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { McSpace, McInput } from 'meetcode-ui';

const value = ref('');
</script>
