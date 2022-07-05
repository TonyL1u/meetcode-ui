<template>
    <McInput :rules="rules" />
</template>

<script lang="ts" setup>
import { McInput } from 'meetcode-ui';
import type { InputValidRule } from 'meetcode-ui';

const rules: InputValidRule[] = [
    {
        trigger: ['focus'],
        validator: value => {
            console.log(value);
            if (value) {
                return new Error('不对');
            }
        }
    }
];
</script>
