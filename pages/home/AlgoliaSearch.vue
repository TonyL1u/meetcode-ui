<script lang="ts" setup>
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useI18nController } from 'meetcode-ui';
// @ts-ignore
import docsearch from '@docsearch/js';
import '@docsearch/css';

const router = useRouter();
const { current } = useI18nController();

onMounted(() => {
    docsearch({
        container: '#docsearch',
        appId: 'RZDIT89B1I',
        apiKey: 'a3bfd90d07311cc1fe451b932e78cc8d',
        indexName: 'meetcode-ui',
        hitComponent({ hit, children }: { hit: any; children: any }) {
            return {
                __v: null,
                type: 'a',
                ref: undefined,
                constructor: undefined,
                key: undefined,
                props: {
                    href: 'javascript:void(0)',
                    onClick(event: MouseEvent) {
                        event.preventDefault();
                        router.push(`/${current.value}/${hit.url}`);
                    },
                    children
                }
            };
        }
    });
});
</script>

<template>
    <div id="docsearch"></div>
</template>

<style lang="scss">
// customize algolia docsearch style
:root {
    --docsearch-primary-color: #10b981;
}
:root .dark {
    --docsearch-modal-background: #242424;
    --docsearch-modal-shadow: none;
    --docsearch-footer-shadow: none;
    --docsearch-logo-color: rgba(235, 235, 235, 0.6);
    --docsearch-hit-background: #2f2f2f;
    --docsearch-hit-color: rgba(235, 235, 235, 0.6);
    --docsearch-hit-shadow: none;
    --docsearch-text-color: #fff;
    --docsearch-footer-background: #1a1a1a;
    --docsearch-icon-color: #fff;
}

.dark {
    .DocSearch-Form {
        background-color: #2f2f2f;
    }

    .DocSearch-Title {
        color: #fff;
    }
}

#docsearch {
    margin-right: 12px;

    .DocSearch-Button {
        background: none;
    }
}
</style>
