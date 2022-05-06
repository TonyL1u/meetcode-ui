<template>
    <McSpace>
        <McButton @click="handleClick">Normal</McButton>
        <McButton @click="handleClick" disabled>Disabled</McButton>
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
