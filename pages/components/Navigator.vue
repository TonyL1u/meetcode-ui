<template>
    <McAnchor :options="anchorLinks" :bound="55" :offset-top="30" :offset-bottom="30" type="bar" :show-track="false" />
</template>

<script lang="ts" setup>
import { nextTick, onMounted, ref } from 'vue';
import { useRouterEventHook } from '../utils';
import { McAnchor } from 'meetcode-ui';
import type { AnchorOption } from 'meetcode-ui';

const { onRoutePathChange } = useRouterEventHook();
const anchorLinks = ref<AnchorOption[]>([]);
const updateNavigator = () => {
    anchorLinks.value = [];
    const anchorElementSet = document.querySelectorAll('h1, h2, h3');
    const filterSet = Array.from(anchorElementSet).filter((e: Element) => !!e.id);

    const findNode = (id: string, linkArr: AnchorOption[]): AnchorOption | null => {
        let find: AnchorOption | null = null;
        for (const link of linkArr) {
            find = link.href === `#${id}` ? link : findNode(id, link.children || []);
            if (find) break;
        }

        return find;
    };
    const findParent = (id: string, linkArr: AnchorOption[]): AnchorOption | null => {
        let find: AnchorOption | null = null;
        for (const link of linkArr) {
            find = link?.children?.find(e => e.href === `#${id}`) ? link : findParent(id, link.children || []);
            if (find) break;
        }

        return find;
    };
    // 没想到好的方法，暂时用穷举
    filterSet.reduce((prev: Element | null, cur: Element) => {
        const linkData: AnchorOption = {
            title: cur.textContent || '',
            href: `#${cur.id}`,
            children: []
        };
        if (prev === null && cur.tagName === 'H1') {
            anchorLinks.value.push(linkData);
        } else if (prev === null && cur.tagName === 'H2') {
            anchorLinks.value.push({
                title: '',
                href: '#',
                children: [linkData]
            });
        } else if (prev === null && cur.tagName === 'H3') {
            anchorLinks.value.push({
                title: '',
                href: '#',
                children: [
                    {
                        title: '',
                        href: '#',
                        children: [linkData]
                    }
                ]
            });
        } else if (prev?.tagName === 'H1' && cur.tagName === 'H1') {
            anchorLinks.value.push(linkData);
        } else if (prev?.tagName === 'H1' && cur.tagName === 'H2') {
            const p = findNode(prev.id, anchorLinks.value);
            p?.children?.push(linkData);
        } else if (prev?.tagName === 'H1' && cur.tagName === 'H3') {
            const p = findNode(prev.id, anchorLinks.value);
            p?.children?.push({
                title: '',
                href: '#',
                children: [
                    {
                        title: '',
                        href: '#',
                        children: [linkData]
                    }
                ]
            });
        } else if (prev?.tagName === 'H2' && cur.tagName === 'H1') {
            anchorLinks.value.push(linkData);
        } else if (prev?.tagName === 'H2' && cur.tagName === 'H2') {
            const p = findParent(prev.id, anchorLinks.value);
            p?.children?.push(linkData);
        } else if (prev?.tagName === 'H2' && cur.tagName === 'H3') {
            const p = findNode(prev.id, anchorLinks.value);
            p?.children?.push(linkData);
        } else if (prev?.tagName === 'H3' && cur.tagName === 'H1') {
            anchorLinks.value.push(linkData);
        } else if (prev?.tagName === 'H3' && cur.tagName === 'H2') {
            const t = findParent(prev.id, anchorLinks.value);
            const p = findParent(t?.href.slice(1) || '', anchorLinks.value);
            p?.children?.push(linkData);
        } else if (prev?.tagName === 'H3' && cur.tagName === 'H3') {
            const p = findParent(prev.id, anchorLinks.value);
            p?.children?.push(linkData);
        }
        return cur;
    }, null);
};

onMounted(() => {
    updateNavigator();

    onRoutePathChange(() => {
        nextTick(() => {
            updateNavigator();
            console.log(anchorLinks.value);
        });
    });
});
</script>
