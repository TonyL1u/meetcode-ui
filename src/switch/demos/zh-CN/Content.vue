<template>
    <McSpace vertical>
        <McSwitch checked-text="上班" unchecked-text="下班" />
        <McSwitch checked-text="上班" unchecked-text="下班" text-placement="out" />
        <McSwitch checked-text="上班" unchecked-text="下班" text-placement="both" />
    </McSpace>
</template>

<script lang="ts" setup>
import { McSpace, McSwitch } from 'meetcode-ui';
</script>
