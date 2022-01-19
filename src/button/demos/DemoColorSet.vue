<template>
    <McButton id="myButton" type="custom" text-color="#000" :color-set="{ default: '#ffff00', hover: '#00ffff', active: '#ff00ff' }">
        <div class="present"></div>
    </McButton>
</template>

<script lang="ts" setup>
import { McButton } from 'meetcode-ui';
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
