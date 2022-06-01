<template>
    <a href="#target2" @click="handleClick">test</a>
    <McAnchor :options="options" :bound="55" :offset-top="30" :offset-bottom="30" style="position: fixed" />
</template>

<script lang="ts" setup>
import { McAnchor } from 'meetcode-ui';
import type { AnchorOption } from 'meetcode-ui';

const options: AnchorOption[] = [
    {
        title: 'Anchor 锚点',
        href: '#anchor-%E9%94%9A%E7%82%B9',
        children: [
            {
                title: '演示',
                href: '#%E6%BC%94%E7%A4%BA'
            }
        ]
    },
    {
        title: 'Target1',
        href: '#target1',
        children: [
            {
                title: 'Target2',
                href: '#target2'
            },
            {
                title: 'Target3',
                href: '#target3'
            }
        ]
    },
    {
        title: 'Target4',
        href: '#target4'
    },
    {
        title: 'Target5',
        href: '#target5'
    }
];
const handleClick = (e: MouseEvent) => {
    e.preventDefault();
    const hash = (e.target as HTMLAnchorElement).hash;
    console.log(hash);
    console.log(document.getElementById(hash.slice(1)));
    const target = document.getElementById(hash.slice(1));
    if (target) {
        // const div = document.createElement('div');
        // div.textContent = '123';
        // target.appendChild(div);
        target.scrollIntoView({
            behavior: 'smooth'
        });
    }
};
</script>
