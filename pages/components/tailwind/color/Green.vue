<template>
    <Color :colors="colors" />
</template>

<script lang="ts" setup>
import Color from './Color.vue';

const colors = [
    {
        cls: 'mc-bg-green-50',
        value: '50',
        hex: '#ECFDF5'
    },
    {
        cls: 'mc-bg-green-100',
        value: '100',
        hex: '#D1FAE5'
    },
    {
        cls: 'mc-bg-green-200',
        value: '200',
        hex: '#A7F3D0'
    },
    {
        cls: 'mc-bg-green-300',
        value: '300',
        hex: '#6EE7B7'
    },
    {
        cls: 'mc-bg-green-400',
        value: '400',
        hex: '#34D399'
    },
    {
        cls: 'mc-bg-green-500',
        value: '500',
        hex: '#10B981'
    },
    {
        cls: 'mc-bg-green-600',
        value: '600',
        hex: '#059669'
    },
    {
        cls: 'mc-bg-green-700',
        value: '700',
        hex: '#047857'
    },
    {
        cls: 'mc-bg-green-800',
        value: '800',
        hex: '#065F46'
    },
    {
        cls: 'mc-bg-green-900',
        value: '900',
        hex: '#064E3B'
    }
];
</script>
