<template>
    <McSpace>
        <McButton type="custom" color="#c026d3" text-color="#00ffff">
            <template #icon>
                <McIcon>
                    <IconColorPalette />
                </McIcon>
            </template>
            #c026d3
        </McButton>

        <McButton type="custom" color="#cdaf95" border-color="#0000cd" ghost>
            <template #icon>
                <McIcon>
                    <IconColorPalette />
                </McIcon>
            </template>
            #cdaf95
        </McButton>

        <McButton type="custom" render="text" color="#ff0404">
            <template #icon>
                <McIcon>
                    <IconColorPalette />
                </McIcon>
            </template>
            #ff0404
        </McButton>
    </McSpace>
</template>

<script lang="ts" setup>
import { McButton, McSpace, McIcon } from 'meetcode-ui';
import { ColorPalette as IconColorPalette } from '@vicons/ionicons5';
</script>
