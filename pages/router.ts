import { createRouter, createWebHistory } from 'vue-router';
import { routes } from './docs';
import { useMenu } from './utils';

const {
    routes: { zh, en }
} = useMenu();
console.log(zh);
console.log(en);
const router = createRouter({
    // 指定路由模式
    history: createWebHistory('meetcode-ui'),
    // 路由地址
    routes: [
        // ...routes.value,
        ...zh,
        ...en,
        {
            path: '/',
            redirect: encodeURI('/@misc/起步')
        },
        {
            path: '/404',
            component: () => import('./home/404.vue')
        },
        {
            path: '/:catchAll(.*)',
            redirect: '/404'
        }
    ]
});

router.afterEach((to, from) => {
    // scroll to top
    const scrollContent = document.querySelector('.main-content > .n-layout-scroll-container');
    if (scrollContent) scrollContent.scrollTop = 0;
});

export default router;
