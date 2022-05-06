import { reactive } from 'vue';
import { upperFirstLetter } from '../utils';
import { PATH_NAME_MAP_ZH, PATH_NAME_MAP_EN } from '../site.config';
import type { Component } from 'vue';
import type { MenuOption } from 'naive-ui';

interface Route {
    path: string;
    name: string;
    component: Component;
}
const docModules_zh = import.meta.glob('../../src/*/demos/doc.zh-CN.md');
const docModules_en = import.meta.glob('../../src/*/demos/doc.en-US.md');
const zhRoutes = reactive<Route[]>([]);
const enRoutes = reactive<Route[]>([]);
const menus: MenuOption[] = reactive([]);

for (const path in docModules_zh) {
    const routePath = path.match(/\/src\/(.*)\/demos/)![1];

    zhRoutes.push({
        path: `/zh-CN/${routePath}`,
        name: PATH_NAME_MAP_ZH[routePath],
        component: docModules_zh[path]
    });

    menus.push({
        label: upperFirstLetter(routePath),
        key: routePath
    });
}

for (const path in docModules_en) {
    const routePath = path.match(/\/src\/(.*)\/demos/)![1];

    enRoutes.push({
        path: `/en-US/${routePath}`,
        name: PATH_NAME_MAP_EN[routePath],
        component: docModules_en[path]
    });
}

export function useMenu() {
    return {
        routes: { zh: zhRoutes, en: enRoutes },
        menus
    };
}
