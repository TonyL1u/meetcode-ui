<template>
    <McSpace>
        <McButton @click="handleClick">正常</McButton>
        <McButton @click="handleClick" disabled>禁用</McButton>
    </McSpace>
</template>

<script lang="ts" setup>
import { McSpace, McButton, McMessage } from 'meetcode-ui';

const handleClick = () => {
    McMessage.text('Button Click', {
        card: true
    });
};
</script>
