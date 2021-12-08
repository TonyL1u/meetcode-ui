<template>
    <p>
        {{ msg }}
        <slot></slot>
    </p>
</template>

<script lang="ts" setup>
defineProps<{ msg: string }>();
</script>
