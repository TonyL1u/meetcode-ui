<template>
    <McPopselect v-model:value="value" :options="options" trigger="click">
        <McButton type="success" ghost>当前选择的tab：{{ value }}</McButton>
    </McPopselect>

    <McTabs :default-tab="value" center>
        <McTabPane name="tab1" tab-label="Tab 1">1</McTabPane>
        <McTabPane name="tab2" tab-label="Tab 2">2</McTabPane>
        <McTabPane name="tab3" tab-label="Tab 3">3</McTabPane>
        <McTabPane name="tab4" tab-label="Tab 4">4</McTabPane>
    </McTabs>

    <McTabs v-model:value="value" center>
        <McTabPane name="tab1" tab-label="Tab 1">1</McTabPane>
        <McTabPane name="tab2" tab-label="Tab 2">2</McTabPane>
        <McTabPane name="tab3" tab-label="Tab 3">3</McTabPane>
        <McTabPane name="tab4" tab-label="Tab 4">4</McTabPane>
    </McTabs>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { McTabs, McTabPane, McPopselect, McButton } from 'meetcode-ui';

const value = ref('tab2');
const options = ref([
    {
        label: 'tab1',
        value: 'tab1'
    },
    {
        label: 'tab2',
        value: 'tab2'
    },
    {
        label: 'tab3',
        value: 'tab3'
    },
    {
        label: 'tab4',
        value: 'tab4'
    }
]);
</script>
