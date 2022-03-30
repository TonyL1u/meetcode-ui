import { useLightTheme, useDarkTheme } from '../theme';
import { CNode } from 'css-render';

interface Theme {
    key: string;
    main?: CNode;
    light?: CNode;
    dark?: CNode;
    custom?: CNode;
}

export function useThemeRegister(theme: Theme) {
    const { key, main, light, dark } = theme;

    main?.mount({ id: key });
    light && useLightTheme(key, light);
    dark && useDarkTheme(key, dark);
}
