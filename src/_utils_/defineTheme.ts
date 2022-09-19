import { ThemeMap } from '../_composable_';
import { ColorSchemeTemplate } from '../_theme_';
import type { ThemeVars, Components } from '../_theme_';
import type { CSSRenderState } from '../_composable_';

interface ThemeConfig {
    inherit?: string;
    theme?: Partial<ThemeVars>;
}
export function defineTheme(name: string, config: ThemeConfig) {
    const { inherit, theme = {} } = config;
    const states: CSSRenderState[] = Object.entries(theme as ThemeVars).map(([key, vars]) => {
        return {
            key: `Mc${key}-${name}`,
            name: key,
            isMounted: false,
            isStatic: false,
            theme: ColorSchemeTemplate[key as Components](vars)
        };
    });

    ThemeMap.set(name, { inherit, states });
}
