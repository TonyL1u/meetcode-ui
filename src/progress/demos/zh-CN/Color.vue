<template>
    <McSpace vertical :gap="0">
        <McSpace>
            <McProgress :percentage="0" type="circle" track-color="#3b82f6" />
            <McProgress :percentage="25" type="circle" color="#dc2626" track-color="#dc262633" />
            <McProgress :percentage="50" type="circle" color="#fb923c" />
            <McProgress :percentage="75" type="circle" indicator-color="#16a34a" />
        </McSpace>
        <McProgress :percentage="25" color="#dc2626" track-color="#dc262633" indicator-color="#dc2626" />
    </McSpace>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { McProgress, McButton, McSpace } from 'meetcode-ui';

const percentage = ref(20);

const handleIncrease = () => {
    percentage.value += 10;
    if (percentage.value > 100) {
        percentage.value = 0;
    }
};

const handleDecrease = () => {
    percentage.value -= 10;
    if (percentage.value < 0) {
        percentage.value = 100;
    }
};
</script>
