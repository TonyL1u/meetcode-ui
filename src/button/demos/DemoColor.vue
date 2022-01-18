<template>
    <McSpace>
        <McButton type="custom" color="#c026d3">
            <template #icon>
                <McIcon>
                    <IconColor />
                </McIcon>
            </template>
            #c026d3
        </McButton>
        <McButton type="custom" color="#c026d3" text-color="red" ghost>
            <template #icon>
                <McIcon>
                    <IconColor />
                </McIcon>
            </template>
            #c026d3
        </McButton>
        <McButton type="custom" color="#cdaf95" dashed>
            <template #icon>
                <McIcon>
                    <IconColor />
                </McIcon>
            </template>
            #cdaf95
        </McButton>

        <n-button ghost color="#ff69b4" text-color="red"> #ff69b4 </n-button>
    </McSpace>
</template>

<script lang="ts" setup>
import { McButton, McSpace, McIcon } from 'meetcode-ui';
import { ColorPalette as IconColor } from '@vicons/ionicons5';
import { NButton } from 'naive-ui';
</script>
