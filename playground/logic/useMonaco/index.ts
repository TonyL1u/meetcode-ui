import { watch, Ref, unref, ref } from 'vue';
import { until, createEventHook, EventHookOn, tryOnUnmounted } from '@vueuse/core';
import darktheme from 'theme-vitesse/themes/vitesse-dark.json';
import lightTheme from 'theme-vitesse/themes/vitesse-light.json';
import { editorPlugins } from '../../monaco/plugins/editor';
import setupMonaco from '../../monaco';
import { useThemeController } from 'meetcode-ui';
import type { editor as Editor } from 'monaco-editor';

export function useMonaco(target: Ref, options: any) {
    const { current: siteTheme, isDark } = useThemeController();
    const changeEventHook = createEventHook<string>();
    const isSetup = ref(false);
    let editor: Editor.IStandaloneCodeEditor;

    const setContent = async (content: string) => {
        await until(isSetup).toBeTruthy();
        if (editor) editor.setValue(content);
    };
    const init = async () => {
        const { monaco } = await setupMonaco();
        // @ts-ignore
        monaco.editor.defineTheme('vitesse-dark', darktheme);
        // @ts-ignore
        monaco.editor.defineTheme('vitesse-light', lightTheme);

        watch(
            target,
            () => {
                const el = unref(target);

                if (!el) return;

                const { code, language } = options;
                editor = monaco.editor.create(el, {
                    value: code,
                    language: language,
                    tabSize: 4,
                    insertSpaces: true,
                    autoClosingQuotes: 'always',
                    detectIndentation: false,
                    folding: false,
                    automaticLayout: true,
                    theme: 'vitesse-dark',
                    minimap: {
                        enabled: false
                    }
                });

                isSetup.value = true;

                watch(
                    siteTheme,
                    () => {
                        if (isDark.value) monaco.editor.setTheme('vitesse-dark');
                        else monaco.editor.setTheme('vitesse-light');
                    },
                    { immediate: true }
                );

                const plugins = editorPlugins.filter(({ language }) => language === options.language);
                editor.getModel()?.onDidChangeContent(() => {
                    changeEventHook.trigger(editor.getValue());
                    plugins.forEach(({ onContentChanged }) => onContentChanged(editor));
                });
            },
            {
                flush: 'post',
                immediate: true
            }
        );
    };

    init();

    tryOnUnmounted(() => {
        editor.dispose();
    });

    return {
        onChange: <EventHookOn>changeEventHook.on,
        setContent
    };
}
