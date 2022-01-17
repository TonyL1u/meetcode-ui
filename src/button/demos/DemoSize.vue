<template>
    <McSpace>
        <McButton>默认</McButton>
        <McButton size="mini" type="primary">
            <template #icon>
                <McIcon>
                    <IconBag />
                </McIcon>
            </template>
            mini
        </McButton>
        <McButton size="small" type="success">
            <template #icon>
                <McIcon>
                    <IconBag />
                </McIcon>
            </template>
            small
        </McButton>
        <McButton size="medium" type="warning">
            <template #icon>
                <McIcon>
                    <IconBag />
                </McIcon>
            </template>
            large
        </McButton>
        <McButton size="large" type="danger">
            <template #icon>
                <McIcon>
                    <IconBag />
                </McIcon>
            </template>
            medium
        </McButton>
    </McSpace>
</template>

<script lang="ts" setup>
import { McButton, McSpace, McIcon } from 'meetcode-ui';
import { BagOutline as IconBag } from '@vicons/ionicons5';
</script>
