import exec from '../utils/exec';
import type { Plugin } from 'vite';

const fileRegex = /(interface.ts)$/;

export default function GenerateApi(): Plugin {
    return {
        apply: 'serve',
        name: 'auto-generate-api',
        handleHotUpdate({ file }) {
            if (fileRegex.test(file)) {
                const [_, component] = file.match(/src\/(.*)\/interface.ts/)!;
                exec(`pnpm run api:markdown ${component} zh-CN All`);
            }
        }
    };
}
