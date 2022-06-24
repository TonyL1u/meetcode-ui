import { createVNode, Fragment } from 'vue';
import { componentNameMap, categoryNameMap, componentGroupMap } from './site.config';
import type { RouteMeta } from 'vue-router';
import type { Component } from 'vue';
import type { MenuOption } from 'meetcode-ui';
import type { ComponentCategory } from './site.config';

export type MenuTab = 'docs' | 'components' | 'develop';
export interface RouteMetaData extends RouteMeta {
    title: string;
    tab: 'home' | MenuTab;
    route: string;
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
            meta: { title, tab, route }
        };
    });
}

function createMenus(tab: MenuTab, lang: RouteLang, matcher?: RegExp): MenuOption[] {
    return Object.entries(modulesMap[tab][lang]).map(([path]) => {
        const pathMatcher = matcher ? path.match(matcher) : lang === 'zh-CN' ? path.match(/\/zh-CN\/(.*).md/) : path.match(/\/en-US\/(.*).md/);
        const info = pathMatcher![1].split('_');
        const [menu, route] = info.length > 1 ? info : [info[0], info[0]];

        return {
            label: menu,
            key: `${tab}/${route}`,
            extra: { key: route }
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
        'zh-CN': componentsMenuWrap(createMenus('components', 'zh-CN', /\/src\/(.*)\/demos/), true),
        'en-US': componentsMenuWrap(createMenus('components', 'en-US', /\/src\/(.*)\/demos/))
    },
    develop: {
        'zh-CN': createMenus('develop', 'zh-CN'),
        'en-US': createMenus('develop', 'en-US')
    }
};

function componentsMenuWrap(menus: MenuOption[], isZh: boolean = false): MenuOption[] {
    return Object.entries(componentGroupMap)
        .map(([group, components]) => {
            return {
                group: true,
                label: isZh ? categoryNameMap[group as ComponentCategory] : group,
                children: menus
                    .filter(menu => components.includes(menu.extra?.key))
                    .map(item => {
                        item.style = { textTransform: 'capitalize' };
                        if (isZh) {
                            const label = (item.label as string).toLowerCase();
                            item.label = () => createVNode(Fragment, null, [createVNode('span', null, [label.replaceAll('-', ' ')]), createVNode('span', { style: { marginLeft: '4px', fontSize: '12px', opacity: 0.67 } }, [componentNameMap[label]])]);
                        }
                        return item;
                    })
            };
        })
        .filter(option => option.children.length > 0);
}
