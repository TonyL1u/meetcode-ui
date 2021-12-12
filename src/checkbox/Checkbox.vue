<template>
    <div class="mc-checkbox">
        <input class="checkbox-input" :id="key" type="checkbox" />
        <label class="checkbox" :for="key">
            <span>
                <svg width="12px" height="10px" viewbox="0 0 12 10">
                    <polyline points="1.5 6 4.5 9 10.5 1" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></polyline>
                </svg>
            </span>
            <span>
                <slot></slot>
            </span>
        </label>
    </div>
</template>

<script lang="ts" setup>
import { useSlots, createVNode } from 'vue';
import { createKey } from '../_utils_';

const slots = useSlots();
const key = createKey('checkbox');
</script>
