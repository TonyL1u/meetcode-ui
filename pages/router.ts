import { createRouter, createWebHistory } from 'vue-router';
import { routes } from './docs';

const router = createRouter({
    // 指定路由模式
    history: createWebHistory('meetcode-ui'),
    // 路由地址
    routes: [
        ...routes.value,
        {
            path: '/',
            redirect: encodeURI('/起步')
        },
        {
            path: '/:catchAll(.*)',
            component: () => import('./home/404.vue')
        }
    ]
});

router.afterEach((to, from) => {
    // scroll to top
    const scrollContent = document.querySelector('.main-content > .n-layout-scroll-container');
    if (scrollContent) scrollContent.scrollTop = 0;
});

export default router;
