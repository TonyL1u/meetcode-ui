import { createVNode as h } from 'vue';
import { PatchFlags } from './tsutils';
import type { VNodeTypes, VNodeProps } from 'vue';
import type { IsObject } from './tsutils';

type PropsData<T> = IsObject<T> extends true ? T : (Record<string, unknown> & VNodeProps) | null;
export function createVNode<T = any>(type: VNodeTypes, props?: PropsData<T>, children?: unknown) {}

function analyzePatchFlag(isComponent: boolean, props?: Record<string, unknown>, children?: unknown) {
    // default to patch all
    let patchFlag: PatchFlags = 0;
    let dynamicProps: string[] = [];
    if (props) {
        const { style: styleBinding, class: classBinding, ...rest } = props;
        const dynamicPropNames = Object.keys(rest).filter(key => typeof rest[key] === 'object');
        const hasHydrationEventBinding = Object.keys(rest).find(key => {
            return !isComponent && /^on[^a-z]/.test(key) && key.toLowerCase() !== 'onclick' && key !== 'onUpdate:modelValue' && !isReservedProp(key);
        });

        if (styleBinding && typeof styleBinding === 'object') {
            patchFlag |= PatchFlags.STYLE;
        }
        if (classBinding && typeof classBinding === 'object') {
            patchFlag |= PatchFlags.CLASS;
        }
        if (dynamicPropNames.length) {
            patchFlag |= PatchFlags.PROPS;
            dynamicProps = dynamicPropNames;
        }
        if (hasHydrationEventBinding) {
            patchFlag |= PatchFlags.HYDRATE_EVENTS;
        }
    }

    return { patchFlag, dynamicProps };
}

function analyzeSlotFlag() {}

function makeMap(str: string, expectsLowerCase?: boolean): (key: string) => boolean {
    const map = Object.create(null);
    const list = str.split(',');
    for (let i = 0; i < list.length; i++) {
        map[list[i]] = true;
    }
    return expectsLowerCase ? val => !!map[val.toLowerCase()] : val => !!map[val];
}

const isReservedProp = makeMap(',key,ref,ref_for,ref_key,' + 'onVnodeBeforeMount,onVnodeMounted,' + 'onVnodeBeforeUpdate,onVnodeUpdated,' + 'onVnodeBeforeUnmount,onVnodeUnmounted');
