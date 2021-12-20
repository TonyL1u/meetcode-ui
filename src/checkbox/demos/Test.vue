<template>
    <McCheckbox>test</McCheckbox>{{ value }}
    <McCheckbox v-model:value="isSelect" :indeterminate="isIndeterminate" :disabled="disabled" @update:value="handleSelectAll">全选</McCheckbox>

    <McCheckboxGroup ref="checkboxGroup" v-model:value="groupValue" :options="options" checked-color="#3B82F6" :max="max" :disabled="disabled" @update:value="handleUpdateValue">
        <!-- <McCheckbox value="grape">Grape</McCheckbox> -->
    </McCheckboxGroup>

    <McCheckboxGroup v-model:value="groupValue">
        <McGrid :columns="2" :x-gap="12">
            <McGridItem>
                <McCheckbox value="apple">Apple</McCheckbox>
            </McGridItem>
            <McGridItem>
                <McCheckbox value="orange">Orange</McCheckbox>
            </McGridItem>
            <McGridItem>
                <McCheckbox value="banana">Banana</McCheckbox>
            </McGridItem>
            <McGridItem>
                <McCheckbox value="peach">Peach</McCheckbox>
            </McGridItem>
        </McGrid>
    </McCheckboxGroup>

    <button @click="disabled = !disabled">禁用</button>
    <button @click="options.push({ value: 'peach', label: 'Peach' })">添加option</button>
    <button @click="max++">增加max</button>
    <button @click="max--">减少max</button>

    {{ groupValue }}
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { McCheckboxGroup, McCheckbox, CheckboxGroupOptions, CheckboxValue, CheckboxGroupExposeInstance, McGrid, McGridItem } from 'meetcode-ui';

const groupValue = ref(['apple']);
const value = ref('yes');

const disabled = ref(false);
const checkboxGroup = ref<CheckboxGroupExposeInstance>();
const isSelect = ref(true);
const isIndeterminate = ref(true);
const max = ref(1);

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

const handleSelectAll = (value: CheckboxValue) => {
    if (value) {
        checkboxGroup.value?.selectAll();
    } else {
        checkboxGroup.value?.clear();
    }
};

const handleUpdateValue = (value: CheckboxValue[]) => {
    const { selectAll, indeterminate } = checkboxGroup.value?.status! ?? {};
    isSelect.value = selectAll || indeterminate;
    isIndeterminate.value = indeterminate;
};
</script>
