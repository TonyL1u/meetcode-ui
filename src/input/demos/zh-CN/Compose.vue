<template>
    <McSpace vertical :gap="4">
        <McInput v-model:value="value1" :placeholder="['From', 'To']" separator="-" composed />
        {{ value1 }}
        <McInput v-model:value="value2" :placeholder="['值1', '值2', '值3']" :separator="['和', '或']" :input-count="3" composed clearable />
        {{ value2 }}
    </McSpace>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { McSpace, McInput } from 'meetcode-ui';

const value1 = ref(['', '']);
const value2 = ref(['', '', '']);
</script>
