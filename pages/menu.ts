import { createVNode, Fragment } from 'vue';
import { upperFirstLetter } from './utils';
import { componentNameMap, componentCategoryMap } from './site.config';
import type { RouteMeta } from 'vue-router';
import type { Component } from 'vue';
import type { MenuOption } from 'meetcode-ui';

export type MenuTab = 'docs' | 'components' | 'develop';
export interface RouteMetaData extends RouteMeta {
    title: string;
    tab: 'home' | MenuTab;
    route: string;
    chinese?: string;
}
export interface Route {
    path: string;
    component: Component;
    meta: RouteMetaData;
}
type RouteLang = 'zh-CN' | 'en-US';
type MapType<T> = Record<MenuTab, Record<RouteLang, T>>;
type ModulesMap = MapType<Record<string, () => Promise<{ [key: string]: any }>>>;
type RoutesMap = MapType<Route[]>;
type MenusMap = MapType<MenuOption[]>;

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
            component: module,
            meta: { title, tab, route, chinese: tab === 'components' ? componentNameMap[route] : '' }
        };
    });
}

function createMenus(tab: MenuTab, lang: RouteLang, matcher?: RegExp) {
    return Object.entries(modulesMap[tab][lang]).map(([path]) => {
        const pathMatcher = matcher ? path.match(matcher) : lang === 'zh-CN' ? path.match(/\/zh-CN\/(.*).md/) : path.match(/\/en-US\/(.*).md/);
        const info = pathMatcher![1].split('_');
        const [menu, route] = info.length > 1 ? info : [info[0], info[0]];
        const label = upperFirstLetter(menu)
            .split('-')
            .reduce((prev, cur) => `${prev} ${upperFirstLetter(cur)}`);

        return {
            label,
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
        'zh-CN': componentsMenuWrap(createMenus('components', 'zh-CN', /\/src\/(.*)\/demos/)),
        'en-US': componentsMenuWrap(createMenus('components', 'en-US', /\/src\/(.*)\/demos/))
    },
    develop: {
        'zh-CN': createMenus('develop', 'zh-CN'),
        'en-US': createMenus('develop', 'en-US')
    }
};

function componentsMenuWrap(menus: MenuOption[]): MenuOption[] {
    const group1: MenuOption = { group: true, label: '通用', children: [] };
    const group2: MenuOption = { group: true, label: '反馈', children: [] };
    const group3: MenuOption = { group: true, label: '数据录入', children: [] };
    const group4: MenuOption = { group: true, label: '数据展示', children: [] };
    const group5: MenuOption = { group: true, label: '布局', children: [] };

    menus.forEach(item => {
        const label = (item.label as string).toLowerCase();
        switch (componentCategoryMap[label]) {
            case '通用':
                item.label = () => createVNode(Fragment, null, [createVNode('span', null, [label]), createVNode('span', { style: { marginLeft: '4px', fontSize: '12px', opacity: 0.67 } }, [componentNameMap[label]])]);
                group1.children?.push(item);
                break;
            case '反馈':
                group2.children?.push(item);
                break;
            case '数据录入':
                group3.children?.push(item);
                break;
            case '数据展示':
                group4.children?.push(item);
                break;
            case '布局':
                group5.children?.push(item);
                break;
        }
    });

    return [group1, group2, group3, group4, group5];
}
