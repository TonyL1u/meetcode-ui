<template>
    <McTooltip :content="checked">
        <McSwitch v-model:value="checked" checked-value="OK" unchecked-value="NO" />
    </McTooltip>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { McSwitch, McTooltip } from 'meetcode-ui';

const checked = ref('NO');
</script>
