import { createRouter, createWebHistory } from 'vue-router';
import { routesMap } from './menu';

const { docs, components, develop } = routesMap;
const router = createRouter({
    // 指定路由模式
    history: createWebHistory('meetcode-ui'),
    // 路由地址
    routes: [
        ...docs['zh-CN'],
        ...docs['en-US'],
        ...components['zh-CN'],
        ...components['en-US'],
        ...develop['zh-CN'],
        ...develop['en-US'],
        {
            path: '/404',
            component: () => import('./404.vue'),
            meta: {
                title: '404',
                tab: 'docs',
                route: ''
            }
        },
        {
            path: '/:catchAll(.*)',
            redirect: '/404'
        }
    ]
});

router.afterEach((to, from) => {
    // scroll to top
    const scrollContent = document.querySelector('.main-content');
    if (scrollContent) scrollContent.scrollTop = 0;
});

export default router;
