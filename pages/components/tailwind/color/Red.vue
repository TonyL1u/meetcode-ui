<template>
    <NMessageProvider>
        <Color :colors="colors" />
    </NMessageProvider>
</template>

<script lang="ts" setup>
import { NMessageProvider } from 'naive-ui';
import Color from './Color.vue';

const colors = [
    {
        cls: 'mc-bg-red-50',
        value: '50',
        hex: '#FEF2F2'
    },
    {
        cls: 'mc-bg-red-100',
        value: '100',
        hex: '#FEE2E2'
    },
    {
        cls: 'mc-bg-red-200',
        value: '200',
        hex: '#FECACA'
    },
    {
        cls: 'mc-bg-red-300',
        value: '300',
        hex: '#FCA5A5'
    },
    {
        cls: 'mc-bg-red-400',
        value: '400',
        hex: '#F87171'
    },
    {
        cls: 'mc-bg-red-500',
        value: '500',
        hex: '#EF4444'
    },
    {
        cls: 'mc-bg-red-600',
        value: '600',
        hex: '#DC2626'
    },
    {
        cls: 'mc-bg-red-700',
        value: '700',
        hex: '#B91C1C'
    },
    {
        cls: 'mc-bg-red-800',
        value: '800',
        hex: '#991B1B'
    },
    {
        cls: 'mc-bg-red-900',
        value: '900',
        hex: '#7F1D1D'
    }
];
</script>
