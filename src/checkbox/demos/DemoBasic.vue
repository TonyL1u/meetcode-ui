<template>
    {{ value }}

    <McCheckbox v-model:value="value" :indeterminate="indeterminate" @update:value="handleUpdateValue">全选</McCheckbox>

    <McCheckboxGroup v-model:value="groupValue" :options="options" checked-color="#3B82F6" :max="3">
        <!-- <McCheckbox value="grape">Grape</McCheckbox> -->
    </McCheckboxGroup>
    <!-- 
    <McCheckboxGroup ref="checkbox" v-model:value="groupValue" :max="3" :disabled="disabled">
        <McCheckbox value="apple">Apple</McCheckbox>
        <McCheckbox value="orange">Orange</McCheckbox>
        <McCheckbox value="banana">Banana</McCheckbox>
        <McCheckbox value="grape">Grape</McCheckbox>
    </McCheckboxGroup> -->
    {{ groupValue }}

    <button @click="disabled = !disabled">测试</button>
    <button @click="handleSelectAll">全选</button>
    <button @click="groupValue = []">全不选</button>
    <button @click="options.push({ value: 'peach', label: 'Peach' })">添加</button>

    <n-checkbox-group v-model:value="groupValue" :max="3">
        <n-space item-style="display: flex;">
            <n-checkbox v-for="item in options" :value="item.value" :label="item.label" />
        </n-space>
    </n-checkbox-group>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import { NCheckbox, NCheckboxGroup, NSpace } from 'naive-ui';
import { McCheckboxGroup, McCheckbox, CheckboxGroupOptions, CheckboxValue } from 'meetcode-ui';

const disabled = ref(false);
const checkbox = ref();
const cities = ref();

const groupValue = ref(['apple', 'orange', 'grape']);
const value = ref(false);
const indeterminate = computed(() => {
    return groupValue.value.length < 4 && groupValue.value.length > 0;
});

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
    },
    {
        value: 'grape',
        label: 'Grape'
    }
]);

const handleUpdateValue = (value: CheckboxValue) => {
    if (value) {
        checkbox.value.selectAll(false);
    } else {
        groupValue.value = [];
    }
};

const handleSelectAll = () => {
    // value.value = false;
    checkbox.value.selectAll();
    // cities.value = [];
    cities.value = ['Beijing', 'Shanghai', 'Guangzhou', 'Shenzhen'];
};
</script>
