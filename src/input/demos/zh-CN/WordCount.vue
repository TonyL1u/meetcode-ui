<template>
    <McSpace vertical :gap="4">
        <McInput placeholder="只能输入 30 个字" :max-length="30" word-count />
        <McInput type="textarea" :min-rows="5" word-count />
    </McSpace>
</template>

<script lang="ts" setup>
import { McSpace, McInput } from 'meetcode-ui';
</script>
