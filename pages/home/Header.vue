<template>
    <div class="mc-flex mc-justify-between mc-items-center mc-w-full">
        <div class="mc-flex mc-items-center">
            <NavMenu />
            <div class="title mc-text-2xl mc-leading-6">Meetcode UI</div>
        </div>
        <div class="mc-flex mc-items-center">
            <McButton render="text" @click="switchTheme">
                <template #icon>
                    <McIcon :size="18">
                        <SunnyOutline v-if="isDark" />
                        <MoonOutline v-else />
                    </McIcon>
                </template>
            </McButton>
            <McButton render="text">
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
            <McPopselect v-model:value="mainVersion" trigger="click" :options="versions" placement="bottom-end" :with-arrow="false">
                <McButton render="text">{{ mainVersion }}</McButton>
            </McPopselect>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { McButton, McIcon, McPopselect } from 'meetcode-ui';
import { useSiteTheme } from '../site.config';
import { LanguageOutline, LogoGithub, MoonOutline, SunnyOutline } from '@vicons/ionicons5';
import NavMenu from './NavMenu.vue';
import { repository } from '../../package.json';

const { switchTheme, isDark } = useSiteTheme();
const mainVersion = ref('0.0.20');
const versions = ref([
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
]);
const handleRouteToGithub = () => {
    window.open(repository.url);
};
</script>
