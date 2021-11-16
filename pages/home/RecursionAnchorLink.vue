<template>
    <NAnchorLink v-for="anchorLink in anchorLinks" :title="anchorLink.title" :href="anchorLink.href">
        <RecursionAnchorLink v-if="anchorLink?.sub?.length" :anchor-links="anchorLink.sub" />
    </NAnchorLink>
</template>

<script lang="ts" setup>
import { NAnchorLink } from 'naive-ui';

interface AnchorLink {
    title: string;
    href: string;
    sub?: Array<AnchorLink>;
}

const props = defineProps<{ anchorLinks: Array<AnchorLink> | undefined }>();
const { anchorLinks } = props;
</script>
