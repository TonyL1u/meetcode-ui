<template>
    <NSpace>
        <NButton type="primary" ghost @click="customIcon">图标</NButton>
        <NButton type="primary" ghost @click="customStyle">样式</NButton>
        <NButton type="primary" ghost @click="customMessage">内容</NButton>
        <NButton type="primary" ghost @click="customMessageWithHTML">HTML</NButton>
        <NButton type="primary" ghost @click="customAction">操作</NButton>
    </NSpace>
</template>

<script lang="ts" setup>
import { createVNode } from 'vue';
import { NSpace, NButton, NIcon } from 'naive-ui';
import { McMessage, McLoading, McTextLink } from 'meetcode-ui';
import { HourglassOutline as IconHourglass } from '@vicons/ionicons5';

const customIcon = () => {
    McMessage.warning({
        message: '加载中...',
        icon: () => createVNode(NIcon, { style: 'margin-right: 6px', color: '#f59e0b' }, { default: () => createVNode(IconHourglass) })
    });
};

const customStyle = () => {
    McMessage.text({
        message: '我是一个信息',
        className: 'mc-px-4 mc-py-3',
        style: {
            border: 'none',
            boxShadow: '0px 1px 4px 0px rgba(0, 0, 0, 0.02), 0px 2px 12px 0px rgba(0, 0, 0, 0.04), 0px 2px 6px 0px rgba(0, 0, 0, 0.02)',
            background: '#fff'
        }
    });
};

const customMessage = () => {
    McMessage({
        type: 'success',
        message: () => createVNode('div', { class: 'mc-flex mc-items-center' }, [createVNode(McLoading, { type: 'ripple', size: 'small', style: 'margin-right: 6px' }), '内容可以传入VNode']),
        icon: () => null
    });
};

const customMessageWithHTML = () => {
    McMessage({
        type: 'info',
        html: '<span>内容可以传入 <i>HTML</i></span>'
    });
};

const customAction = () => {
    McMessage.error('系统错误，请稍后重试。', {
        card: true,
        style: 'width: 300px',
        action: () =>
            createVNode(
                McTextLink,
                { type: 'success' },
                {
                    default: () => '查看详情'
                }
            )
    });
};
</script>
