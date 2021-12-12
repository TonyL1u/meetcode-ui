<template>
    <Color :colors="colors" />
</template>

<script lang="ts" setup>
import Color from './Color.vue';

const colors = [
    {
        cls: 'mc-bg-gray-50',
        value: '50',
        hex: '#F9FAFB'
    },
    {
        cls: 'mc-bg-gray-100',
        value: '100',
        hex: '#F3F4F6'
    },
    {
        cls: 'mc-bg-gray-200',
        value: '200',
        hex: '#E5E7EB'
    },
    {
        cls: 'mc-bg-gray-300',
        value: '300',
        hex: '#D1D5DB'
    },
    {
        cls: 'mc-bg-gray-400',
        value: '400',
        hex: '#9CA3AF'
    },
    {
        cls: 'mc-bg-gray-500',
        value: '500',
        hex: '#6B7280'
    },
    {
        cls: 'mc-bg-gray-600',
        value: '600',
        hex: '#4B5563'
    },
    {
        cls: 'mc-bg-gray-700',
        value: '700',
        hex: '#374151'
    },
    {
        cls: 'mc-bg-gray-800',
        value: '800',
        hex: '#1F2937'
    },
    {
        cls: 'mc-bg-gray-900',
        value: '900',
        hex: '#111827'
    }
];
</script>
