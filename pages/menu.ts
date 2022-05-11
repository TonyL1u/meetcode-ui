import type { RouteMeta } from 'vue-router';
import type { Component } from 'vue';
import type { MenuOption } from 'naive-ui';

export type MenuTab = 'docs' | 'components' | 'develop';
export interface RouteMetaData extends RouteMeta {
    title: string;
    tab: MenuTab;
    route: string;
}
type RouteLang = 'zh-CN' | 'en-US';
type MapType<T> = Record<MenuTab, Record<RouteLang, T>>;
type ModulesMap = MapType<Record<string, () => Promise<{ [key: string]: any }>>>;
type RoutesMap = MapType<Route[]>;
type MenusMap = MapType<MenuOption[]>;
interface Route {
    path: string;
    name: string;
    component: Component;
    meta: RouteMetaData;
}

const modulesMap: ModulesMap = {
    docs: {
        'zh-CN': import.meta.glob('./docs/zh-CN/*.md'),
        'en-US': import.meta.glob('./docs/en-US/*.md')
    },
    components: {
        'zh-CN': import.meta.glob('../src/*/demos/doc.zh-CN.md'),
        'en-US': import.meta.glob('../src/*/demos/doc.en-US.md')
    },
    develop: {
        'zh-CN': import.meta.glob('./develop/zh-CN/*.md'),
        'en-US': import.meta.glob('./develop/en-US/*.md')
    }
};

function createRoutes(tab: MenuTab, lang: RouteLang, matcher?: RegExp): Route[] {
    return Object.entries(modulesMap[tab][lang]).map(([path, module]) => {
        const pathMatcher = matcher ? path.match(matcher) : lang === 'zh-CN' ? path.match(/\/zh-CN\/(.*).md/) : path.match(/\/en-US\/(.*).md/);
        const info = pathMatcher![1].split('_');
        const [title, route] = info.length > 1 ? info : [info[0], info[0]];

        return {
            path: `/${lang}/${tab}/${route}`,
            name: '',
            component: module,
            meta: { title, tab, route }
        };
    });
}

function createMenus(tab: MenuTab, lang: RouteLang, matcher?: RegExp) {
    return Object.entries(modulesMap[tab][lang]).map(([path]) => {
        const pathMatcher = matcher ? path.match(matcher) : lang === 'zh-CN' ? path.match(/\/zh-CN\/(.*).md/) : path.match(/\/en-US\/(.*).md/);
        const info = pathMatcher![1].split('_');
        const [menu, route] = info.length > 1 ? info : [info[0], info[0]];

        return {
            label: `${menu.charAt(0).toUpperCase()}${menu.slice(1)}`,
            key: `${tab}/${route}`
        };
    });
}

export const routesMap: RoutesMap = {
    docs: {
        'zh-CN': createRoutes('docs', 'zh-CN'),
        'en-US': createRoutes('docs', 'en-US')
    },
    components: {
        'zh-CN': createRoutes('components', 'zh-CN', /\/src\/(.*)\/demos/),
        'en-US': createRoutes('components', 'en-US', /\/src\/(.*)\/demos/)
    },
    develop: {
        'zh-CN': createRoutes('develop', 'zh-CN'),
        'en-US': createRoutes('develop', 'en-US')
    }
};

export const menusMap: MenusMap = {
    docs: {
        'zh-CN': createMenus('docs', 'zh-CN'),
        'en-US': createMenus('docs', 'en-US')
    },
    components: {
        'zh-CN': createMenus('components', 'zh-CN', /\/src\/(.*)\/demos/),
        'en-US': createMenus('components', 'en-US', /\/src\/(.*)\/demos/)
    },
    develop: {
        'zh-CN': createMenus('develop', 'zh-CN'),
        'en-US': createMenus('develop', 'en-US')
    }
};
