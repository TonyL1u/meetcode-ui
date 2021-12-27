<template>
    <McCheckboxGroup v-model:value="groupValue" :options="options">
        <McCheckbox value="grape">Grape</McCheckbox>
    </McCheckboxGroup>

    <McPopselect v-model:value="groupValue" :options="options" multiple>
        <NButton class="mc-mt-3" type="primary" ghost>已选择：{{ groupValue }}</NButton>
    </McPopselect>
</template>

<script lang="ts" setup>
import { ref, createVNode, reactive } from 'vue';
import { NButton } from 'naive-ui';
import { McCheckboxGroup, McCheckbox, McTooltip, McPopselect } from 'meetcode-ui';

const groupValue = ref(['apple']);
const options = reactive([
    {
        value: 'apple',
        label: 'Apple',
        disabled: true
    },
    {
        value: 'orange',
        label: () => {
            return createVNode(McTooltip, { content: 'This is an orange' }, { default: () => 'Orange' });
        }
    },
    {
        value: 'banana',
        label: 'Banana'
    }
]);
</script>
