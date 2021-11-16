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
            // component: () => import('./home/404.vue')
        },
        {
            path: '/:catchAll(.*)',
            component: () => import('./home/404.vue')
        }
        // {
        //     path: '/Playground',
        //     component: () => import('./playground/Playground.vue')
        // }
    ]
});

export default router;
