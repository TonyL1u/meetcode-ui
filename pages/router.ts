import { createRouter, createWebHistory } from 'vue-router';
import { useI18nController } from 'meetcode-ui';
import { routesMap } from './menu';

const { current } = useI18nController();
const { docs, components, develop } = routesMap;
const router = createRouter({
    // 指定路由模式
    history: createWebHistory(),
    // 路由地址
    routes: [
        ...docs['zh-CN'],
        ...docs['en-US'],
        ...components['zh-CN'],
        ...components['en-US'],
        ...develop['zh-CN'],
        ...develop['en-US'],
        {
            path: '/zh-CN/home',
            component: () => import('./HomePage.vue'),
            meta: {
                title: '一个 Vue3 UI 组件库',
                tab: 'home',
                route: ''
            }
        },
        {
            path: '/en-US/home',
            component: () => import('./HomePage.vue'),
            meta: {
                title: 'A Vue3 UI Component Library',
                tab: 'home',
                route: ''
            }
        },
        {
            path: '/:catchAll(.*)',
            redirect: `/${current.value}/home`
        }
    ]
});

router.afterEach((to, from) => {
    // scroll to top
    const scrollContent = document.querySelector('.main-content');
    if (scrollContent) scrollContent.scrollTop = 0;
});

export default router;
