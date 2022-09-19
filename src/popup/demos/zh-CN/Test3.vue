<script lang="ts" setup>
import { useRoute } from 'vue-router';

const { path } = useRoute();
</script>

<template>
    {{ path }}
</template>
