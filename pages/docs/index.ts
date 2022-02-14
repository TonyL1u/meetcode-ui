import { Ref, ref } from 'vue';
import type { MenuOption, TreeSelectOption } from 'naive-ui';
import * as CSS from '@vue/runtime-dom/node_modules/csstype';

const markdownModules = import.meta.glob('./**/*.md');

const rootFolder: TreeSelectOption = {
    label: 'docs',
    key: '',
    children: []
};

const routes = ref<Array<any>>([]);
const menuTree: Ref<Array<MenuOption>> = ref([]);
const folderTree = ref<Array<TreeSelectOption>>([rootFolder]);
const menuBlackList = ['./Split.md'];

for (const path in markdownModules) {
    if (menuBlackList.includes(path)) continue;
    routes.value.push({
        path: encodeURI(path.slice(1, -3)),
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

        const isHasFolder = (<TreeSelectOption[]>rootFolder.children).findIndex((opt: TreeSelectOption) => opt.key === subMenuName.slice(1)) > -1;
        if (!isHasFolder) {
            (<TreeSelectOption[]>rootFolder.children).push({
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
