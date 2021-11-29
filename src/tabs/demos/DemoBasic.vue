<template>
    <McTabs v-model:value="value" @before-tab-switch="handleSwitch" ref="tabs">
        <McTabPane name="test1" tab-label="测试1" preload>1</McTabPane>
        <McTabPane name="test2" tab-label="测试222">2</McTabPane>
        <McTabPane name="test3" tab-label="测试33333" lazy>3</McTabPane>
        <McTabPane name="test4" tab-label="测试4444444">4</McTabPane>
        <McTabPane name="test5" tab-label="测试555555555">5</McTabPane>
        <!-- <McTab name="test6" class="mc-text-blue-500" style="background: red">
            <McTooltip content="测试6">测试6</McTooltip>
        </McTab> -->
    </McTabs>
    <McPopselect v-model:value="value" :options="options" trigger="click">
        <button>{{ value }}</button>
    </McPopselect>
    <button @click="handleClick">{{ value }}</button>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { McTabs, McTabPane, McTab, McTooltip, McPopselect } from 'meetcode-ui';

const value = ref('test2');
const options = ref([
    {
        label: 'test1',
        value: 'test1'
    },
    {
        label: 'test2',
        value: 'test2'
    },
    {
        label: 'test3',
        value: 'test3'
    },
    {
        label: 'test4',
        value: 'test4'
    },
    {
        label: 'test5',
        value: 'test5'
    },
    {
        label: 'test6',
        value: 'test6'
    }
]);
const tabs = ref();
const handleClick = () => {
    const { switchTo } = tabs.value;
    switchTo('test3');
};
const handleSwitch = () => {
    // console.log(1);
};
</script>
