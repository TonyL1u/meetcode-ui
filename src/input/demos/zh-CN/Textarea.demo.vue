<markdown>
### 文本域

通过 `min-rows` 和 `max-rows` 来控制最小和最大高度。
</markdown>

<template>
    <McSpace vertical :gap="4">
        <McInput type="textarea" placeholder="简单的文本域" :min-rows="3" :resizable="false" />
        <McInput type="textarea" :max-rows="5" />
    </McSpace>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { McSpace, McInput } from 'meetcode-ui';
</script>
