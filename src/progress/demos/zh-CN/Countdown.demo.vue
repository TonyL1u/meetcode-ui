<markdown>
### 倒计时

通过调整动画起始与结束的百分比（介于 0 到 100 之间）来实现倒计时效果。
</markdown>

<template>
    <McProgress :start="100" :end="0" :duration="5000" animation loop />
</template>

<script lang="ts" setup>
import { McProgress } from 'meetcode-ui';
</script>
