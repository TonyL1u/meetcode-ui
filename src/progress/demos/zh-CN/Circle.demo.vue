<markdown>
### 环形

一个圆环。
</markdown>

<template>
    <McSpace>
        <McProgress type="circle" :percentage="percentage" />
        <McSpace>
            <McButton @click="handleIncrease">+ 10%</McButton>
            <McButton @click="handleDecrease">- 10%</McButton>
        </McSpace>
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
