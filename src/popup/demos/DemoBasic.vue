<template>
    <McButton type="success" ghost @click="instance.show()">打开</McButton>
</template>

<script lang="ts" setup>
import { McPopup, McButton } from 'meetcode-ui';
import Test from './Test1.vue';

const instance = McPopup(Test);
</script>
