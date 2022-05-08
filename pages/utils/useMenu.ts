import { reactive } from 'vue';
import { upperFirstLetter } from '../utils';
import { PATH_NAME_MAP_ZH, PATH_NAME_MAP_EN } from '../site.config';
import type { Component } from 'vue';
import type { MenuOption } from 'naive-ui';

type MenuTab = 'docs' | 'components' | 'develop';
type RouteLang = 'zh' | 'en';
interface Route {
    path: string;
    name: string;
    component: Component;
}
interface UseMenuReturn {
    routes: Record<MenuTab, Record<RouteLang, Route>>;
    menus: Record<MenuTab, MenuOption[]>;
}
const docsModuled_zh = import.meta.glob('../docs/zh-CN/*.md');
const docsModuled_en = import.meta.glob('../docs/en-US/*.md');
const componentsModules_zh = import.meta.glob('../../src/*/demos/doc.zh-CN.md');
const componentsModules_en = import.meta.glob('../../src/*/demos/doc.en-US.md');
const developModules_zh = import.meta.glob('../develop/zh-CN/*.md');
const developModules_en = import.meta.glob('../develop/en-US/*.md');

const docsZhRoutes = reactive<Route[]>([]);
const docsEnRoutes = reactive<Route[]>([]);
const componentsZhRoutes = reactive<Route[]>([]);
const componentsEnRoutes = reactive<Route[]>([]);
const developZhRoutes = reactive<Route[]>([]);
const developEnRoutes = reactive<Route[]>([]);

const zhRoutes = reactive<Route[]>([]);
const enRoutes = reactive<Route[]>([]);
const menus: MenuOption[] = reactive([]);

const docsMenu = [];
const componetsMenu = [];
const developMenu = [];

for (const path in componentsModules_zh) {
    const routePath = path.match(/\/src\/(.*)\/demos/)![1];

    zhRoutes.push({
        path: `/zh-CN/${routePath}`,
        name: PATH_NAME_MAP_ZH[routePath],
        component: componentsModules_zh[path]
    });

    menus.push({
        label: upperFirstLetter(routePath),
        key: routePath
    });
}

for (const path in componentsModules_en) {
    const routePath = path.match(/\/src\/(.*)\/demos/)![1];

    enRoutes.push({
        path: `/en-US/${routePath}`,
        name: PATH_NAME_MAP_EN[routePath],
        component: componentsModules_en[path]
    });
}

export function useMenu(): UseMenuReturn {
    return {
        routes: { zh: zhRoutes, en: enRoutes },
        menus
    };
}
