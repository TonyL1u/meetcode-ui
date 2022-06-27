<template>
    <div class="mc-flex mc-justify-between mc-items-center mc-pl-8 mc-pr-4 mc-h-[55px]">
        <div class="mc-flex mc-items-center mc-relative">
            <slot></slot>
        </div>
        <div class="mc-flex mc-items-center">
            <AlgoliaSearch />
            <McButton render="text" @click="switchTheme">
                <template #icon>
                    <McIcon :size="18">
                        <SunnyOutline v-if="isDark" />
                        <MoonOutline v-else />
                    </McIcon>
                </template>
            </McButton>
            <McButton render="text" @click="switchLanguage">
                <template #icon>
                    <McIcon :size="18">
                        <LanguageOutline />
                    </McIcon>
                </template>
            </McButton>
            <McButton render="text" @click="handleRouteToGithub">
                <template #icon>
                    <McIcon :size="18">
                        <LogoGithub />
                    </McIcon>
                </template>
            </McButton>
            <McPopselect v-model:value="mainVersion" trigger="hover" :options="versions" placement="bottom-end" :with-arrow="false">
                <McButton render="text">{{ mainVersion }}</McButton>
            </McPopselect>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { McButton, McIcon, McInput, McPopselect, useI18nController, useThemeController } from 'meetcode-ui';
import { useRouter } from 'vue-router';
import { LanguageOutline, LogoGithub, MoonOutline, SunnyOutline, SearchOutline } from '@vicons/ionicons5';
import { repository } from '../../package.json';
import AlgoliaSearch from './AlgoliaSearch.vue';

const router = useRouter();
const { switchTheme, isDark } = useThemeController();
const { switchLanguage, onLanguageChange } = useI18nController();
const mainVersion = ref('0.0.20');
const versions = [
    {
        label: '0.0.20',
        value: '0.0.20'
    },
    {
        label: '0.0.19',
        value: '0.0.19'
    },
    {
        label: '0.0.18',
        value: '0.0.18'
    }
];
const handleRouteToGithub = () => {
    window.open(repository.url);
};

onLanguageChange(lang => {
    const { currentRoute } = router;
    const newPath = currentRoute.value.fullPath.replace(lang === 'en-US' ? 'zh-CN' : 'en-US', lang);
    router.replace(newPath);
});
</script>
