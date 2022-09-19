# i18n

Meetcode UI is available in multiple languages. The language switching can be easily controlled through the integrate language management tool —— `useI18nController` .

## Language Management Tool

1. Import the integrate language management tool

```ts
import { useI18nController } from 'meetcode-ui';
```

2. Set your language

```ts
const { switchLanguage, setLanguage } = useI18nController();

// Switch language
switchLanguage();

// Set zh-CN manually
setLanguage('zh-CN');

// Set en-US manually
setLanguage('en-US');
```

3. Others

|       名称       |              类型               |                      说明                       |
| :--------------: | :-----------------------------: | :---------------------------------------------: |
|     current      |  `RemovableRef<LanguageType>`   |             Current language in use             |
|   setLanguage    | `(theme: LanguageType) => void` |              Set language manually              |
|  switchLanguage  |          `() => void`           |                 Switch language                 |
| onLanguageChange |   `EventHookOn<LanguageType>`   | The callback function when language has changed |

4. Type declarations

```ts
declare type LanguageType = 'zh-CN' | 'en-US';
declare type EventHookOn<T = any> = (fn: (param: T) => void) => {
    off: () => void;
};
export declare function useI18nController(initialLang?: LanguageType): {
    current: RemovableRef<LanguageType>;
    setLanguage: (lang?: LanguageType) => void;
    switchLanguage(): void;
    onLanguageChange: EventHookOn<LanguageType>;
};
```

## Supporting Language

-   Chinese - `zh-CN`
-   English - `en-US`
-   ...
