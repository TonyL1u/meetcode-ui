<template>
    <McSpace>
        <McButton>Square</McButton>
        <McButton round>Round</McButton>
        <McButton circle>
            <template #icon>
                <McIcon>
                    <IconAdd />
                </McIcon>
            </template>
        </McButton>
    </McSpace>
</template>

<script lang="ts" setup>
import { McSpace, McButton, McIcon } from 'meetcode-ui';
import { AddSharp as IconAdd } from '@vicons/ionicons5';
</script>
