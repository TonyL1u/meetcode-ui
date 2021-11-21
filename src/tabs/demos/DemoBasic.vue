<template>
    <McTabs v-model:value="value">
        <McTabPane>1</McTabPane>
        <McTabPane name="2" tab-label="2">2</McTabPane>
    </McTabs>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { McTabs, McTabPane } from 'meetcode-ui';

const value = ref('1');
</script>
