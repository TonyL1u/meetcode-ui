<template>
    <McCheckbox v-model:value="value" indeterminate disabled>Apples</McCheckbox>
    {{ value }}

    <!-- <McCheckboxGroup v-model:value="groupValue" :options="options" checked-color="#3B82F6" disabled>
        <McCheckbox value="grape">Grape</McCheckbox>
    </McCheckboxGroup> -->

    <McCheckboxGroup ref="checkbox" v-model:value="groupValue" :max="3" :disabled="disabled">
        <McCheckbox value="apple">Apple</McCheckbox>
        <McCheckbox value="orange">Orange</McCheckbox>
        <McCheckbox value="banana">Banana</McCheckbox>
        <McCheckbox value="grape">Grape</McCheckbox>
    </McCheckboxGroup>
    {{ groupValue }}

    <button @click="disabled = !disabled">测试</button>
    <button @click="handleSelectAll">全选</button>
    <button @click="groupValue = []">全不选</button>

    <n-checkbox-group v-model:value="cities" :max="3">
        <n-space item-style="display: flex;">
            <n-checkbox value="Beijing" label="北京" />
            <n-checkbox value="Shanghai" label="上海" />
            <n-checkbox value="Guangzhou" label="广州" />
            <n-checkbox value="Shenzen" label="深圳" />
        </n-space>
    </n-checkbox-group>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { NCheckbox, NCheckboxGroup, NSpace } from 'naive-ui';
import { McCheckboxGroup, McCheckbox, CheckboxGroupOptions } from 'meetcode-ui';

const value = ref(true);
const disabled = ref(false);
const checkbox = ref();
const cities = ref();
const groupValue = ref(['apple', 'orange', 'grape']);
const options = ref<CheckboxGroupOptions[]>([
    {
        value: 'apple',
        label: 'Apple'
    },
    {
        value: 'orange',
        label: 'Orange'
    },
    {
        value: 'banana',
        label: 'Banana'
    }
]);

const handleSelectAll = () => {
    // value.value = false;
    checkbox.value.selectAll();
    // cities.value = [];
    cities.value = ['Beijing', 'Shanghai', 'Guangzhou', 'Shenzen'];
};
</script>
