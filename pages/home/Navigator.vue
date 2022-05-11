<template>
    <NAnchor :bound="67" style="z-index: 1; width: 144px; position: fixed; top: 88px">
        <RecursionAnchorLink :anchor-links="anchorLinks" />
    </NAnchor>
</template>

<script lang="ts" setup>
import { nextTick, onMounted, ref } from 'vue';
import { useRouterEventHook } from '../utils';
import { NAnchor } from 'naive-ui';
import RecursionAnchorLink from './RecursionAnchorLink.vue';

interface AnchorLink {
    title: string;
    href: string;
    sub?: Array<AnchorLink>;
}

const { onRoutePathChange } = useRouterEventHook();
const anchorLinks = ref<AnchorLink[]>([]);
const updateNavigator = () => {
    anchorLinks.value = [];
    const anchorElementSet = document.querySelectorAll('h1, h2, h3');
    const filterSet = Array.from(anchorElementSet).filter((e: Element) => !!e.id);

    const findNode = (id: string, linkArr: Array<AnchorLink>): AnchorLink | null => {
        let find: AnchorLink | null = null;
        for (const link of linkArr) {
            find = link.href === `#${id}` ? link : findNode(id, link.sub || []);
            if (find) break;
        }

        return find;
    };
    const findParent = (id: string, linkArr: Array<AnchorLink>): AnchorLink | null => {
        let find: AnchorLink | null = null;
        for (const link of linkArr) {
            find = link?.sub?.find(e => e.href === `#${id}`) ? link : findParent(id, link.sub || []);
            if (find) break;
        }

        return find;
    };
    // 没想到好的方法，暂时用穷举
    filterSet.reduce((prev: Element | null, cur: Element) => {
        const linkData: AnchorLink = {
            title: cur.textContent || '',
            href: `#${cur.id}`,
            sub: []
        };
        if (prev === null && cur.tagName === 'H1') {
            anchorLinks.value.push(linkData);
        } else if (prev === null && cur.tagName === 'H2') {
            anchorLinks.value.push({
                title: '',
                href: '#',
                sub: [linkData]
            });
        } else if (prev === null && cur.tagName === 'H3') {
            anchorLinks.value.push({
                title: '',
                href: '#',
                sub: [
                    {
                        title: '',
                        href: '#',
                        sub: [linkData]
                    }
                ]
            });
        } else if (prev?.tagName === 'H1' && cur.tagName === 'H1') {
            anchorLinks.value.push(linkData);
        } else if (prev?.tagName === 'H1' && cur.tagName === 'H2') {
            const p = findNode(prev.id, anchorLinks.value);
            p?.sub?.push(linkData);
        } else if (prev?.tagName === 'H1' && cur.tagName === 'H3') {
            const p = findNode(prev.id, anchorLinks.value);
            p?.sub?.push({
                title: '',
                href: '#',
                sub: [
                    {
                        title: '',
                        href: '#',
                        sub: [linkData]
                    }
                ]
            });
        } else if (prev?.tagName === 'H2' && cur.tagName === 'H1') {
            anchorLinks.value.push(linkData);
        } else if (prev?.tagName === 'H2' && cur.tagName === 'H2') {
            const p = findParent(prev.id, anchorLinks.value);
            p?.sub?.push(linkData);
        } else if (prev?.tagName === 'H2' && cur.tagName === 'H3') {
            const p = findNode(prev.id, anchorLinks.value);
            p?.sub?.push(linkData);
        } else if (prev?.tagName === 'H3' && cur.tagName === 'H1') {
            anchorLinks.value.push(linkData);
        } else if (prev?.tagName === 'H3' && cur.tagName === 'H2') {
            const t = findParent(prev.id, anchorLinks.value);
            const p = findParent(t?.href.slice(1) || '', anchorLinks.value);
            p?.sub?.push(linkData);
        } else if (prev?.tagName === 'H3' && cur.tagName === 'H3') {
            const p = findParent(prev.id, anchorLinks.value);
            p?.sub?.push(linkData);
        }
        return cur;
    }, null);
};

onMounted(() => {
    updateNavigator();

    onRoutePathChange(() => {
        nextTick(() => {
            updateNavigator();
        });
    });
});
</script>
