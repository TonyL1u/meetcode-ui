<template>
    <McCheckboxGroup>
        <McGrid :columns="2">
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
                <McCheckbox value="grape">Grape</McCheckbox>
            </McGridItem>
        </McGrid>
    </McCheckboxGroup>
</template>

<script lang="ts" setup>
import { McCheckboxGroup, McCheckbox, McGrid, McGridItem } from 'meetcode-ui';
</script>
