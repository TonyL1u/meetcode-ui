# 主题配置

Meetcode UI 提供亮色主题和暗色主题。通过统一主题管理工具 `useThemeController` 来轻松控制主题切换。

## 使用主题管理工具

1. 引入主题管理工具

```ts
import { useThemeController } from 'meetcode-ui';
```

2. 设置主题

```ts
const { switchTheme, setTheme } = useThemeController();

// 切换主题
switchTheme();

// 手动设置亮色模式
setTheme('light');

// 手动设置暗色模式
setTheme('dark');
```

3. 其他

|     名称      |             类型             |        说明        |
| :-----------: | :--------------------------: | :----------------: |
|    current    |  `RemovableRef<ThemeType>`   | 当前正在使用的主题 |
|    isDark     |    `ComputedRef<boolean>`    |   是否为暗黑模式   |
|    isLight    |    `ComputedRef<boolean>`    |   是否为亮色模式   |
|   setTheme    | `(theme: ThemeType) => void` |    手动设置主题    |
|  switchTheme  |         `() => void`         |      切换主题      |
| onThemeChange |   `EventHookOn<ThemeType>`   |  主题切换钩子函数  |

4. TS

```ts
declare type ThemeType = 'light' | 'dark';
declare type EventHookOn<T = any> = (fn: (param: T) => void) => {
    off: () => void;
};
export declare function useThemeController(initialTheme?: ThemeType): {
    current: RemovableRef<ThemeType>;
    isDark: ComputedRef<boolean>;
    isLight: ComputedRef<boolean>;
    setTheme: (theme: ThemeType) => void;
    switchTheme(): void;
    onThemeChange: EventHookOn<ThemeType>;
};
```

## 暗色模式

下面例子展示了如何通过 `setTheme` 或 `switchTheme` 来控制主题的切换。

<ThemeSwitcher-zh />

```xml
<script lang="ts" setup>
import { McSpace, McButton, McSwitch, McMessage, useThemeController } from 'meetcode-ui';
import { MoonOutline, SunnyOutline } from '@vicons/ionicons5';

const { switchTheme, setTheme, current, onThemeChange, isDark } = useThemeController();
onThemeChange(theme => {
    McMessage.success({
        message: `切换至 ${theme} 模式`,
        card: true
    });
});
</script>

<template>
    <McSpace>
        <McSwitch v-model:value="current" checked-value="dark" unchecked-value="light" checked-text="Dark" unchecked-text="Light">
            <template #checked-icon>
                <McIcon :icon="Moon" />
            </template>
            <template #unchecked-icon>
                <McIcon :icon="Sunny" />
            </template>
        </McSwitch>
        <McButton @click="switchTheme">当前：{{ current }}</McButton>
        <McButton @click="setTheme('light')">亮色模式</McButton>
        <McButton @click="setTheme('dark')">暗色模式</McButton>
    </McSpace>
</template>
```

## 自定义主题

开发中...
