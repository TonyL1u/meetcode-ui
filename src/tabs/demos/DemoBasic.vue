<template>
    <McTabs v-model:value="value">
        <McTabPane v-for="o in count" :name="o" :tab-label="o.toString()">{{ o }}</McTabPane>
    </McTabs>

    <NButton type="primary" ghost @click="count++">悬浮</NButton>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { NButton } from 'naive-ui';
import { McTabs, McTabPane } from 'meetcode-ui';

const count = ref(5);
const value = ref(1);
</script>
