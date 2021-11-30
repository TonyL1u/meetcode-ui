<template>
    <div class="mc-flex mc-justify-center mc-items-center">
        <McLoading :type="type" />
    </div>
</template>

<script lang="ts" setup>
import { McLoading } from 'meetcode-ui';

defineProps<{ type?: 'spin' | 'ripple' | 'dots' | 'bars' | 'arcs' | 'flip' | 'rings' }>();
</script>
