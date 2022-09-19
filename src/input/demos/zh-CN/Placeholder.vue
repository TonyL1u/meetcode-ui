<template>
    <McSpace vertical :gap="4">
        <McInput placeholder="这是一个 placeholder" />
        <McInput type="textarea" :min-rows="7" :resizable="false">
            <template #placeholder>
                <svg id="placeholder" viewBox="0 0 400 200">
                    <text x="9%" y="78%">Hello</text>
                </svg>
            </template>
        </McInput>
    </McSpace>
</template>

<script lang="ts" setup>
import { McSpace, McInput } from 'meetcode-ui';
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Bangers&family=Homemade+Apple&family=Sacramento&display=swap');

svg#placeholder {
    width: 100%;
    font-family: 'Bangers', cursive;
}

svg#placeholder text {
    text-transform: uppercase;
    animation: stroke 2s infinite alternate;
    letter-spacing: 10px;
    font-size: 150px;
}
@keyframes stroke {
    0% {
        fill: rgba(72, 138, 20, 0);
        stroke: rgba(54, 95, 160, 1);
        stroke-dashoffset: 25%;
        stroke-dasharray: 0 50%;
        stroke-width: 0.2;
    }
    50% {
        fill: rgba(72, 138, 20, 0);
        stroke: rgba(54, 95, 160, 1);
        stroke-width: 0.5;
    }
    70% {
        fill: rgba(72, 138, 20, 0);
        stroke: rgba(54, 95, 160, 1);
        stroke-width: 1;
    }
    90%,
    100% {
        fill: rgba(72, 138, 204, 1);
        stroke: rgba(54, 95, 160, 0);
        stroke-dashoffset: -25%;
        stroke-dasharray: 50% 0;
        stroke-width: 0;
    }
}
</style>
