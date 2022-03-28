<template>
    <Color :colors="colors" />
</template>

<script lang="ts" setup>
import Color from './Color.vue';

const colors = [
    {
        cls: 'mc-bg-yellow-50',
        value: '50',
        hex: '#FFFBEB'
    },
    {
        cls: 'mc-bg-yellow-100',
        value: '100',
        hex: '#FEF3C7'
    },
    {
        cls: 'mc-bg-yellow-200',
        value: '200',
        hex: '#FDE68A'
    },
    {
        cls: 'mc-bg-yellow-300',
        value: '300',
        hex: '#FCD34D'
    },
    {
        cls: 'mc-bg-yellow-400',
        value: '400',
        hex: '#FBBF24'
    },
    {
        cls: 'mc-bg-yellow-500',
        value: '500',
        hex: '#F59E0B'
    },
    {
        cls: 'mc-bg-yellow-600',
        value: '600',
        hex: '#D97706'
    },
    {
        cls: 'mc-bg-yellow-700',
        value: '700',
        hex: '#B45309'
    },
    {
        cls: 'mc-bg-yellow-800',
        value: '800',
        hex: '#92400E'
    },
    {
        cls: 'mc-bg-yellow-900',
        value: '900',
        hex: '#78350F'
    }
];
</script>
