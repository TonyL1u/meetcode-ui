<script lang="ts" setup>
import { useI18nController } from 'meetcode-ui';
import Orbit from './components/Orbit.vue';

const { current } = useI18nController();
</script>

<template>
    <div class="home-container mc-flex mc-flex-col mc-items-center mc-justify-center mc-h-full mc-overflow-hidden">
        <div class="mc-text-4xl">Meetcode UI</div>
        <div class="mc-text-xs mc-tracking-[5px] mc-mt-3">{{ current === 'zh-CN' ? '一个基于 Vue3 + TS 的组件库' : 'a component library based on Vue3 & TS' }}</div>
        <Orbit class="mc-mt-10 mc-mb-48" />
    </div>
</template>

<style lang="scss" scoped>
.home-container {
    &::before {
        content: '';
        width: 70vmax;
        height: 70vmax;
        position: absolute;
        left: -20vmin;
        top: -20vmin;
        animation: morph 15s linear infinite alternate, spin 20s linear infinite;
        will-change: border-radius, transform;
        transform-origin: 55% 55%;
        pointer-events: none;
    }

    &::after {
        content: '';
        width: 70vmin;
        height: 70vmin;
        position: absolute;
        left: auto;
        right: -10vmin;
        top: auto;
        bottom: 0;
        animation: morph 10s linear infinite alternate, spin 26s linear infinite reverse;
        transform-origin: 20% 20%;
    }

    &.light::before,
    &.light::after {
        background: rgba(22, 163, 74, 0.07);
    }

    &.dark::before,
    &.dark::after {
        background: rgba(255, 255, 255, 0.07);
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
