<template>
    <McSpace vertical>
        <McSwitch checked-text="上班">
            <template #unchecked-text>
                <McIcon :icon="RadioButtonOff" />
            </template>
        </McSwitch>
        <McSwitch checked-text="上班" unchecked-text="下班" text-placement="out" />
        <McSwitch checked-text="上班" unchecked-text="下班" text-placement="both" />
    </McSpace>
</template>

<script lang="ts" setup>
import { McSpace, McSwitch, McIcon } from 'meetcode-ui';
import { RadioButtonOff } from '@vicons/ionicons5';
</script>
