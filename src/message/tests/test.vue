<template>
    <div v-if="show">{{ greeting }}</div>
</template>

<script lang="ts">
export default {
    props: {
        show: {
            type: Boolean,
            default: true
        }
    },
    data() {
        return {
            greeting: 'Hello'
        };
    }
};
</script>
