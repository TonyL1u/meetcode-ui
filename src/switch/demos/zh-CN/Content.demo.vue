<markdown>
### 描述

通过 `checked-text` 和 `unchecked-text` 来添加描述。
</markdown>

<template>
    <McSpace vertical>
        <McSwitch :width="48">
            <template #unchecked-text>
                <McIcon :icon="RadioButtonOff" :size="12" />
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
