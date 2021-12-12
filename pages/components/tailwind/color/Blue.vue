<template>
    <Color :colors="colors" />
</template>

<script lang="ts" setup>
import Color from './Color.vue';

const colors = [
    {
        cls: 'mc-bg-blue-50',
        value: '50',
        hex: '#EFF6FF'
    },
    {
        cls: 'mc-bg-blue-100',
        value: '100',
        hex: '#DBEAFE'
    },
    {
        cls: 'mc-bg-blue-200',
        value: '200',
        hex: '#BFDBFE'
    },
    {
        cls: 'mc-bg-blue-300',
        value: '300',
        hex: '#93C5FD'
    },
    {
        cls: 'mc-bg-blue-400',
        value: '400',
        hex: '#60A5FA'
    },
    {
        cls: 'mc-bg-blue-500',
        value: '500',
        hex: '#3B82F6'
    },
    {
        cls: 'mc-bg-blue-600',
        value: '600',
        hex: '#2563EB'
    },
    {
        cls: 'mc-bg-blue-700',
        value: '700',
        hex: '#1D4ED8'
    },
    {
        cls: 'mc-bg-blue-800',
        value: '800',
        hex: '#1E40AF'
    },
    {
        cls: 'mc-bg-blue-900',
        value: '900',
        hex: '#1E3A8A'
    }
];
</script>
