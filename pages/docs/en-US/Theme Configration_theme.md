# Theme Configuration

Meetcode UI provides light and dark themes. The theme switching can be easily controlled through the integrate theme management tool —— `useThemeController` .

## Theme Management Tool

1. Import the integrate theme management tool

```ts
import { useThemeController } from 'meetcode-ui';
```

2. Set your theme

```ts
const { switchTheme, setTheme } = useThemeController();

// Switch theme
switchTheme();

// Set light mode manually
setTheme('light');

// Set dark mode manually
setTheme('dark');
```

3. Others

|        Name         |             Type             |                      Description                      |
| :-----------------: | :--------------------------: | :---------------------------------------------------: |
|       current       |  `RemovableRef<ThemeType>`   |                 Current theme in use                  |
|       isDark        |    `ComputedRef<boolean>`    |                       Dark mode                       |
|       isLight       |    `ComputedRef<boolean>`    |                      Light mode                       |
|      setTheme       | `(theme: ThemeType) => void` |                  Set theme manually                   |
|     switchTheme     |         `() => void`         |                     Switch theme                      |
|    onThemeChange    |   `EventHookOn<ThemeType>`   |     The callback function when theme has changed      |
| onGlobalThemeChange |   `EventHookOn<ThemeType>`   | The globally callback function when theme has changed |

4. Type declarations

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
    onGlobalThemeChange: EventHookOn<ThemeType>;
};
```

## Dark Mode

The following example shows how to switch different theme through the `setTheme` and `switchTheme` methods.

<ThemeSwitcher-en />

```xml
<template>
    <McSpace>
        <McButton @click="switchTheme">current：{{ current }}</McButton>
        <McButton @click="setTheme('light')">Light Mode</McButton>
        <McButton @click="setTheme('dark')">Dark Mode</McButton>
    </McSpace>
</template>

<script lang="ts" setup>
import { McSpace, McButton, McMessage, useThemeController } from 'meetcode-ui';

const { switchTheme, setTheme, current, onThemeChange } = useThemeController();
onThemeChange(theme => {
    McMessage.success({
        message: `Switch to ${theme} mode`,
        card: true
    });
});
</script>
```

## Customize Your Theme

Developing...
