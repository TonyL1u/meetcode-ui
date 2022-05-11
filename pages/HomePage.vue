<script lang="ts" setup></script>

<template></template>

<style lang="scss" scoped>
.my {
    &::before {
        content: '';
        width: 70vmax;
        height: 70vmax;
        position: absolute;
        background: rgba(0, 0, 0, 0.07);
        left: -20vmin;
        top: -20vmin;
        animation: morph 15s linear infinite alternate, spin 20s linear infinite;
        z-index: 1;
        will-change: border-radius, transform;
        transform-origin: 55% 55%;
        pointer-events: none;
    }

    &::after {
        content: '';
        width: 70vmin;
        height: 70vmin;
        position: absolute;
        background: rgba(0, 0, 0, 0.07);
        left: auto;
        right: -10vmin;
        top: auto;
        bottom: 0;
        animation: morph 10s linear infinite alternate, spin 26s linear infinite reverse;
        transform-origin: 20% 20%;
    }
}

@keyframes morph {
    0% {
        border-radius: 40% 60% 60% 40% / 70% 30% 70% 30%;
    }
    100% {
        border-radius: 40% 60%;
    }
}

@keyframes spin {
    to {
        transform: rotate(1turn);
    }
}
</style>
