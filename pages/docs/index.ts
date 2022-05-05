import { ref } from 'vue';
import type { Ref } from 'vue';
import type { MenuOption, TreeSelectOption } from 'naive-ui';
import { PATH_NAME_MAP } from '../site.config';

interface Route {
    path: string;
    name: string;
    component: () => Promise<{ [key: string]: any }>;
}
const markdownModules = import.meta.glob('./**/*.md');
const rootFolder: TreeSelectOption = {
    label: 'docs',
    key: '',
    children: []
};

const routes = ref<Route[]>([]);
const menuTree: Ref<MenuOption[]> = ref([]);
const folderTree = ref<TreeSelectOption[]>([rootFolder]);
const menuBlackList = ['./Split.md', './Input.md'];

for (const path in markdownModules) {
    if (menuBlackList.includes(path) || path.indexOf('@misc') > -1) continue;
    routes.value.push({
        path: encodeURI(path.slice(1, -3)),
        name: PATH_NAME_MAP[path.slice(2, -3)] || '',
        component: markdownModules[path]
    });

    // 二级目录
    if (path.split('/').length === 3) {
        const subMenuName = '/' + path.split('/')[1];
        const subMenu = menuTree.value.find((opt: MenuOption) => opt.key === encodeURI(subMenuName));
        const subMenuOption: MenuOption = {
            label: path.split('/')[2].slice(0, -3),
            key: encodeURI(path.slice(1, -3))
        };

        const isHasFolder = (rootFolder.children as TreeSelectOption[]).findIndex((opt: TreeSelectOption) => opt.key === subMenuName.slice(1)) > -1;
        if (!isHasFolder) {
            (rootFolder.children as TreeSelectOption[]).push({
                label: subMenuName.slice(1),
                key: subMenuName.slice(1)
            });
        }

        if (subMenu?.children) {
            subMenu?.children?.push(subMenuOption);
        } else {
            menuTree.value.push({
                label: subMenuName.slice(1),
                key: encodeURI(subMenuName),
                children: [subMenuOption]
            });
        }
    } else {
        menuTree.value.push({
            label: path.slice(2, -3),
            key: encodeURI(path.slice(1, -3))
        });
    }
}

export { menuTree, folderTree, routes };
