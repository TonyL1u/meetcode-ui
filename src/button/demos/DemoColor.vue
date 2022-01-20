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

        <McButton id="myButton" type="custom" text-color="#000" :color-set="{ default: '#ffff00', hover: '#00ffff', active: '#ff00ff' }">
            <div class="present"></div>
        </McButton>
    </McSpace>
</template>

<script lang="ts" setup>
import { McButton, McSpace, McIcon } from 'meetcode-ui';
import { ColorPalette as IconColorPalette } from '@vicons/ionicons5';
</script>

<style lang="scss" scoped>
#myButton {
    .present {
        position: relative;
        width: 100px;
        height: 20px;
        line-height: 20px;

        &::after {
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
        }
    }

    .present::after {
        content: 'Default';
    }

    &:hover {
        .present::after {
            content: 'Hover';
        }
    }

    &:active {
        .present::after {
            content: 'Active';
        }
    }
}
</style>
