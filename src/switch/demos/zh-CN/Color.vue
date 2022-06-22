<template>
    <McSpace>
        <McSwitch checked-text="上班" unchecked-text="下班" text-placement="out" checked-color="#d03050" unchecked-color="#2080f0" handler-color="#fb923c" />
    </McSpace>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { McSpace, McSwitch, McIcon } from 'meetcode-ui';
import { ArrowForwardOutline, ArrowBackOutline } from '@vicons/ionicons5';

const checked = ref(false);
</script>
