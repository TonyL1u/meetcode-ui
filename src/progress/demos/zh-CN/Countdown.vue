<template>
    <McProgress :start="100" :end="0" :duration="5000" animation loop />
</template>

<script lang="ts" setup>
import { McProgress } from 'meetcode-ui';
</script>
