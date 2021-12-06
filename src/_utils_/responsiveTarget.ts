import { isReactive, reactive } from 'vue';
import { cloneDeep } from 'lodash-es';

export function responsiveTarget<T extends object>(target: T) {
    return isReactive(target) ? target : reactive(cloneDeep(target));
}
