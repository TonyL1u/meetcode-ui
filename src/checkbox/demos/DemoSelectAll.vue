<template>
    <McCheckbox v-model:value="isSelect" :indeterminate="isIndeterminate" @update:value="handleSelectAll">全选</McCheckbox>

    <McCheckboxGroup ref="checkboxGroup" v-model:value="groupValue" @update:value="handleUpdateValue">
        <McCheckbox value="apple">Apple</McCheckbox>
        <McCheckbox value="orange">Orange</McCheckbox>
        <McCheckbox value="banana">Banana</McCheckbox>
        <McCheckbox value="grape">Grape</McCheckbox>
    </McCheckboxGroup>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { McCheckboxGroup, McCheckbox, CheckboxValue, CheckboxGroupExposeInstance } from 'meetcode-ui';

const groupValue = ref([]);
const checkboxGroup = ref<CheckboxGroupExposeInstance>();
const isSelect = ref(false);
const isIndeterminate = ref(false);

const handleSelectAll = (value: CheckboxValue) => {
    if (value) {
        checkboxGroup.value?.selectAll();
    } else {
        checkboxGroup.value?.clear();
    }
};

const handleUpdateValue = () => {
    const { all, indeterminate } = checkboxGroup.value?.status! ?? {};
    isSelect.value = all || indeterminate;
    isIndeterminate.value = indeterminate;
};
</script>
