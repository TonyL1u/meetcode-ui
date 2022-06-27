import { defineComponent, toRefs, computed, createVNode, renderSlot as renderSlot$1, normalizeProps, createElementVNode as createElementVNode$1, toDisplayString, withCtx, renderList, createElementBlock, Fragment, createCommentVNode, withDirectives, vShow, createTextVNode as createTextVNode$1, getCurrentInstance, Comment, unref, watch, effectScope, nextTick, reactive, toRef, ref, getCurrentScope, onScopeDispose, onMounted, shallowRef, onBeforeUpdate, isReactive, openBlock, createBlock, provide, inject, onBeforeUnmount, readonly, h, Teleport, cloneVNode, Text, Transition, mergeProps, toRaw, TransitionGroup, render as render$1, onUnmounted, isRef, resolveComponent, shallowReactive, normalizeStyle } from 'vue';

const gridProps = {
    rows: {
        type: Number,
        default: 1
    },
    columns: {
        type: Number,
        default: 1
    },
    gap: {
        type: Number,
        default: 0
    },
    xGap: {
        type: Number,
        default: 0
    },
    yGap: {
        type: Number,
        default: 0
    },
    autoColumns: {
        type: [String, Array],
        default: undefined
    },
    autoRows: {
        type: [String, Array],
        default: undefined
    },
    fillMode: {
        type: String,
        default: 'auto-fit'
    },
    justify: {
        type: String,
        default: undefined
    },
    align: {
        type: String,
        default: undefined
    }
};
const gridItemProps = {
    x: {
        type: Number,
        default: undefined
    },
    y: {
        type: Number,
        default: undefined
    },
    xSize: {
        type: Number,
        default: 1
    },
    ySize: {
        type: Number,
        default: 1
    },
    itemJustify: {
        type: String,
        default: undefined
    },
    itemAlign: {
        type: String,
        default: undefined
    }
};

var Grid = defineComponent({
    name: 'Grid',
    props: gridProps,
    setup(props, { slots }) {
        const { rows, columns, gap, xGap, yGap, justify, align, autoColumns, autoRows, fillMode } = toRefs(props);
        const columnsTemplate = computed(() => {
            if (autoColumns?.value) {
                if (Array.isArray(autoColumns.value)) {
                    const [min = '0', max = '1fr'] = autoColumns.value;
                    return `repeat(${fillMode.value}, minmax(${min}, ${max}))`;
                }
                else {
                    return `repeat(${fillMode.value}, ${autoColumns.value})`;
                }
            }
            else if (columns?.value) {
                return `repeat(${columns.value}, 1fr)`;
            }
            else {
                return '';
            }
        });
        const rowsTemplate = computed(() => {
            if (autoRows?.value) {
                if (Array.isArray(autoRows.value)) {
                    const [min = '0', max = '1fr'] = autoRows.value;
                    return `repeat(${fillMode.value}, minmax(${min}, ${max}))`;
                }
                else {
                    return `repeat(${fillMode.value}, ${autoRows.value})`;
                }
            }
            else if (rows?.value) {
                return `repeat(${rows.value},1fr)`;
            }
            else {
                return '';
            }
        });
        const cssVars = computed(() => {
            return {
                '--grid-rows-template': rowsTemplate.value,
                '--grid-columns-template': columnsTemplate.value,
                '--grid-gap': `${gap?.value || yGap?.value || 0}px ${gap?.value || xGap?.value || 0}px`,
                '--grid-justify': justify?.value || '',
                '--grid-align': align?.value || ''
            };
        });
        return () => createVNode('div', {
            class: 'mc-grid',
            style: cssVars.value
        }, [renderSlot$1(slots, 'default')]);
    }
});

var GridItem = defineComponent({
    name: 'GridItem',
    props: gridItemProps,
    setup(props, { slots }) {
        const { x, y, xSize, ySize, itemJustify, itemAlign } = toRefs(props);
        const cssVars = computed(() => {
            return {
                '--grid-item-column-start': x?.value || '',
                '--grid-item-row-start': y?.value || '',
                '--grid-item-column-end': x?.value ? x.value + xSize.value : '',
                '--grid-item-row-end': y?.value ? y.value + ySize.value : '',
                '--grid-item-justify': itemJustify?.value || '',
                '--grid-item-align': itemAlign?.value || ''
            };
        });
        return () => createVNode('div', {
            class: 'mc-grid-item',
            style: cssVars.value
        }, [renderSlot$1(slots, 'default')]);
    }
});

/**
 * convert kebab case keyed object into camel case keyed object
 *
 * @param targetObj
 * @returns e.g. `{ 'current-count': 1 } --> { currentCount: 1 }`
 */
function kebabCaseEscape(targetObj) {
    if (typeof targetObj !== 'object' || !targetObj)
        return targetObj;
    const obj = {};
    for (const [key, value] of Object.entries(targetObj)) {
        if (key.indexOf('-') > -1) {
            const escapeKey = kebabToCamel(key);
            obj[escapeKey] = value;
        }
        else {
            obj[key] = value;
        }
    }
    return obj;
}
/**
 * convert kebab case string into camel case.
 *
 * e.g. `hello-world --> helloWorld`
 */
function kebabToCamel(str) {
    return str.split('-').reduce((prev, cur) => {
        return `${prev}${cur.charAt(0).toUpperCase()}${cur.slice(1)}`;
    });
}
/**
 * convert camel case string into kebab case.
 *
 * e.g. `helloWorld --> hello-world`
 */
function camelToKebab(str) {
    return str.replace(/([A-Z])/g, '-$1').toLowerCase();
}

/**
 * 创建组件VNode
 * @param type 自定义组件
 * @param props 组件Props
 * @param children
 * @param patchFlag PatchFlags
 * @param dynamicProps
 * @returns VNode
 */
function createComponentVNode(type, props, children, patchFlag, dynamicProps) {
    if (children && !Array.isArray(children)) {
        Object.entries(children).forEach(([key, child]) => {
            if (key !== '_' && child) {
                // ！！！强制使用 withCtx
                children[key] = withCtx(() => (Array.isArray(child()) ? child() : [child()]));
            }
        });
        if (!children._) {
            children._ = 1 /* STABLE */;
        }
    }
    return createVNode(type, normalizeProps(props), children, patchFlag, dynamicProps);
}
/**
 * 创建内置Dom元素VNode
 * @param type 元素类型
 * @param props 内置Props
 * @param children
 * @param patchFlag PatchFlags
 * @param dynamicProps
 * @returns VNode
 */
function createElementVNode(type, props, children, patchFlag, dynamicProps) {
    return createElementVNode$1(type, normalizeProps(props), Array.isArray(children) ? children : typeof children === 'string' ? toDisplayString(children) : [children], patchFlag, dynamicProps);
}
/**
 * 创建文本VNode
 */
function createTextVNode(source, patch) {
    return patch ? createTextVNode$1(toDisplayString(source), 1 /* TEXT */) : createTextVNode$1(toDisplayString(source));
}
/**
 * 创建Fragment
 * @param children Array
 * @param patchFlag 64 | 128 | 256
 * @returns Fragment VNode
 * @example
 * ```html
 * <div v-for="item in data">{{ item.id }}</div>
 * ```
 *
 * ```ts
 * createFragment(
 *     renderList(data, item => createElementVNode('div', null, item.id, PatchFlags.TEXT)),
 *     PatchFlags.UNKEYED_FRAGMENT
 * )
 * ```
 */
function createFragment(children, patchFlag) {
    return createElementBlock(Fragment, null, children, patchFlag);
}
function renderSlot(slots, name, props, fallback, noSlotted) {
    const camelKey = kebabToCamel(name);
    return renderSlot$1(slots, slots[camelKey] ? camelKey : name, props, fallback, noSlotted);
}
function createDirectives(type, maybeSource, cb, keyed = false) {
    if (type === 'v-for' && cb) {
        return createFragment(renderList(maybeSource, cb), keyed ? 128 /* KEYED_FRAGMENT */ : 256 /* UNKEYED_FRAGMENT */);
    }
    else if (type === 'v-if') {
        const { condition, node, commentText = 'v-if' } = maybeSource;
        return !!condition ? (typeof node === 'function' ? node() : node) : createCommentVNode(commentText, true);
    }
    else if (type === 'v-show') {
        const { condition, node } = maybeSource;
        return withDirectives(node, [[vShow, condition]]);
    }
}

const baseColors = {
    black: '#000',
    silver: '#C0C0C0',
    gray: '#808080',
    white: '#FFF',
    maroon: '#800000',
    red: '#F00',
    purple: '#800080',
    fuchsia: '#F0F',
    green: '#008000',
    lime: '#0F0',
    olive: '#808000',
    yellow: '#FF0',
    navy: '#000080',
    blue: '#00F',
    teal: '#008080',
    aqua: '#0FF',
    transparent: '#0000',
    pink: '#ffc0cb'
};
const hexAlphaMap = {
    '1.00': 'FF',
    '0.99': 'FC',
    '0.98': 'FA',
    '0.97': 'F7',
    '0.96': 'F5',
    '0.95': 'F2',
    '0.94': 'F0',
    '0.93': 'ED',
    '0.92': 'EB',
    '0.91': 'E8',
    '0.90': 'E6',
    '0.89': 'E3',
    '0.88': 'E0',
    '0.87': 'DE',
    '0.86': 'DB',
    '0.85': 'D9',
    '0.84': 'D6',
    '0.83': 'D4',
    '0.82': 'D1',
    '0.81': 'CF',
    '0.80': 'CC',
    '0.79': 'C9',
    '0.78': 'C7',
    '0.77': 'C4',
    '0.76': 'C2',
    '0.75': 'BF',
    '0.74': 'BD',
    '0.73': 'BA',
    '0.72': 'B8',
    '0.71': 'B5',
    '0.70': 'B3',
    '0.69': 'B0',
    '0.68': 'AD',
    '0.67': 'AB',
    '0.66': 'A8',
    '0.65': 'A6',
    '0.64': 'A3',
    '0.63': 'A1',
    '0.62': '9E',
    '0.61': '9C',
    '0.60': '99',
    '0.59': '96',
    '0.58': '94',
    '0.57': '91',
    '0.56': '8F',
    '0.55': '8C',
    '0.54': '8A',
    '0.53': '87',
    '0.52': '85',
    '0.51': '82',
    '0.50': '80',
    '0.49': '7D',
    '0.48': '7A',
    '0.47': '78',
    '0.46': '75',
    '0.45': '73',
    '0.44': '70',
    '0.43': '6E',
    '0.42': '6B',
    '0.41': '69',
    '0.40': '66',
    '0.39': '63',
    '0.38': '61',
    '0.37': '5E',
    '0.36': '5C',
    '0.35': '59',
    '0.34': '57',
    '0.33': '54',
    '0.32': '52',
    '0.31': '4F',
    '0.30': '4D',
    '0.29': '4A',
    '0.28': '47',
    '0.27': '45',
    '0.26': '42',
    '0.25': '40',
    '0.24': '3D',
    '0.23': '3B',
    '0.22': '38',
    '0.21': '36',
    '0.20': '33',
    '0.19': '30',
    '0.18': '2E',
    '0.17': '2B',
    '0.16': '29',
    '0.15': '26',
    '0.14': '24',
    '0.13': '21',
    '0.12': '1F',
    '0.11': '1C',
    '0.10': '1A',
    '0.09': '17',
    '0.08': '14',
    '0.07': '12',
    '0.06': '0F',
    '0.05': '0D',
    '0.04': '0A',
    '0.03': '08',
    '0.02': '05',
    '0.01': '03',
    '0.00': '00'
};
const prefix = '^\\s*';
const suffix = '\\s*$';
const float = '\\s*((\\.\\d+)|(\\d+(\\.\\d*)?))\\s*'; // 4 offset
const hex = '([0-9A-Fa-f])';
const dhex = '([0-9A-Fa-f]{2})';
const rgbRegex = new RegExp(`${prefix}rgb\\s*\\(${float},${float},${float}\\)${suffix}`);
const rgbaRegex = new RegExp(`${prefix}rgba\\s*\\(${float},${float},${float},${float}\\)${suffix}`);
const sHexRegex = new RegExp(`${prefix}#${hex}${hex}${hex}${suffix}`);
const hexRegex = new RegExp(`${prefix}#${dhex}${dhex}${dhex}${suffix}`);
const sHexaRegex = new RegExp(`${prefix}#${hex}${hex}${hex}${hex}${suffix}`);
const hexaRegex = new RegExp(`${prefix}#${dhex}${dhex}${dhex}${dhex}${suffix}`);
const parseHex = (value) => parseInt(value, 16);
function setColorAlpha(color, alpha = 1) {
    let i;
    if ((i = hexRegex.exec(color))) {
        return stringifyHexa(i[1], i[2], i[3], hexAlphaMap[alpha.toFixed(2)]).toLowerCase();
    }
    else if ((i = rgbRegex.exec(color)) || (i = rgbaRegex.exec(color))) {
        return stringifyRgba(roundChannel(i[1]), roundChannel(i[5]), roundChannel(i[9]), alpha);
    }
    else {
        return color;
    }
}
function rgba(color) {
    try {
        let i;
        if ((i = hexRegex.exec(color))) {
            return [parseHex(i[1]), parseHex(i[2]), parseHex(i[3]), 1];
        }
        else if ((i = rgbRegex.exec(color))) {
            return [roundChannel(i[1]), roundChannel(i[5]), roundChannel(i[9]), 1];
        }
        else if ((i = rgbaRegex.exec(color))) {
            return [roundChannel(i[1]), roundChannel(i[5]), roundChannel(i[9]), roundAlpha(i[13])];
        }
        else if ((i = sHexRegex.exec(color))) {
            return [parseHex(i[1] + i[1]), parseHex(i[2] + i[2]), parseHex(i[3] + i[3]), 1];
        }
        else if ((i = hexaRegex.exec(color))) {
            return [parseHex(i[1]), parseHex(i[2]), parseHex(i[3]), roundAlpha(parseHex(i[4]) / 255)];
        }
        else if ((i = sHexaRegex.exec(color))) {
            return [parseHex(i[1] + i[1]), parseHex(i[2] + i[2]), parseHex(i[3] + i[3]), roundAlpha(parseHex(i[4] + i[4]) / 255)];
        }
        else if (Object.keys(baseColors).includes(color)) {
            return rgba(baseColors[color]);
        }
        throw new Error(`Invalid color value ${color}.`);
    }
    catch (e) {
        throw e;
    }
}
function roundChannel(value) {
    const v = Math.round(Number(value));
    if (v > 255)
        return 255;
    if (v < 0)
        return 0;
    return v;
}
function normalizeAlpha(alphaValue) {
    return alphaValue > 1 ? 1 : alphaValue < 0 ? 0 : alphaValue;
}
function roundAlpha(value) {
    const v = Math.round(Number(value) * 100) / 100;
    if (v > 1)
        return 1;
    if (v < 0)
        return 0;
    return v;
}
function stringifyRgba(r, g, b, a) {
    return `rgba(${roundChannel(r)}, ${roundChannel(g)}, ${roundChannel(b)}, ${normalizeAlpha(a)})`;
}
function stringifyHexa(r, g, b, a) {
    return `#${r}${g}${b}${a}`;
}
function compositeChannel(v1, a1, v2, a2, a) {
    return roundChannel((v1 * a1 * (1 - a2) + v2 * a2) / a);
}
function composite(background, overlay) {
    if (!Array.isArray(background))
        background = rgba(background);
    if (!Array.isArray(overlay))
        overlay = rgba(overlay);
    const a1 = background[3];
    const a2 = overlay[3];
    const alpha = roundAlpha(a1 + a2 - a1 * a2);
    return stringifyRgba(compositeChannel(background[0], a1, overlay[0], a2, alpha), compositeChannel(background[1], a1, overlay[1], a2, alpha), compositeChannel(background[2], a1, overlay[2], a2, alpha), alpha);
}
function createHoverColor(rgb, mix = 0.16) {
    return composite(rgb, typeof mix === 'number' ? [255, 255, 255, mix] : mix);
}
function createActiveColor(rgb, mix = 0.12) {
    return composite(rgb, typeof mix === 'number' ? [0, 0, 0, mix] : mix);
}
function createDisabledColor(rgb, mix = 0.64) {
    return composite(rgb, typeof mix === 'number' ? [255, 255, 255, mix] : mix);
}
function useColorFactory(inputColor, customMix) {
    const colorSet = {
        default: {},
        hover: {},
        active: {},
        disabled: {}
    };
    Object.keys(inputColor).forEach(attr => {
        colorSet.default[attr] = inputColor[attr];
        colorSet.hover[attr] = createHoverColor(inputColor[attr], customMix?.hover);
        colorSet.active[attr] = createActiveColor(inputColor[attr], customMix?.active);
        colorSet.disabled[attr] = createDisabledColor(inputColor[attr], customMix?.disabled);
    });
    return colorSet;
}

function createKey(prefix) {
    return `${prefix ? prefix + '-' : ''}${Math.random().toString(36).slice(-8)}`;
}

function ampCount(selector) {
    let cnt = 0;
    for (let i = 0; i < selector.length; ++i) {
        if (selector[i] === '&')
            ++cnt;
    }
    return cnt;
}
/**
 * Don't just use ',' to separate css selector. For example:
 * x:(a, b) {} will be split into 'x:(a' and 'b)', which is not expected.
 * Make sure comma doesn't exist inside parentheses.
 */
const separatorRegex = /\s*,(?![^(]*\))\s*/g;
const extraSpaceRegex = /\s+/g;
/**
 * selector must includes '&'
 * selector is trimmed
 * every part of amp is trimmed
 */
function resolveSelectorWithAmp(amp, selector) {
    const nextAmp = [];
    selector.split(separatorRegex).forEach(partialSelector => {
        let round = ampCount(partialSelector);
        // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
        if (!round) {
            amp.forEach(partialAmp => {
                nextAmp.push(
                // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
                (partialAmp && partialAmp + ' ') + partialSelector);
            });
            return;
        }
        else if (round === 1) {
            amp.forEach(partialAmp => {
                nextAmp.push(partialSelector.replace('&', partialAmp));
            });
            return;
        }
        let partialNextAmp = [
            partialSelector
        ];
        // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
        while (round--) {
            const nextPartialNextAmp = [];
            partialNextAmp.forEach(selectorItr => {
                amp.forEach(partialAmp => {
                    nextPartialNextAmp.push(selectorItr.replace('&', partialAmp));
                });
            });
            partialNextAmp = nextPartialNextAmp;
        }
        partialNextAmp.forEach(part => nextAmp.push(part));
    });
    return nextAmp;
}
/**
 * selector mustn't includes '&'
 * selector is trimmed
 */
function resolveSelector(amp, selector) {
    const nextAmp = [];
    selector.split(separatorRegex).forEach(partialSelector => {
        amp.forEach(partialAmp => {
            // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
            nextAmp.push(((partialAmp && partialAmp + ' ') + partialSelector));
        });
    });
    return nextAmp;
}
function parseSelectorPath(selectorPaths) {
    let amp = [''];
    selectorPaths.forEach(selector => {
        // eslint-disable-next-line
        selector = selector && selector.trim();
        if (
        // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
        !selector) {
            /**
             * if it's a empty selector, do nothing
             */
            return;
        }
        // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
        if (selector.includes('&')) {
            amp = resolveSelectorWithAmp(amp, selector);
        }
        else {
            amp = resolveSelector(amp, selector);
        }
    });
    return amp.join(', ').replace(extraSpaceRegex, ' ');
}

function removeElement(el) {
    /* istanbul ignore if */
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (!el)
        return;
    const parentElement = el.parentElement;
    /* istanbul ignore else */
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (parentElement)
        parentElement.removeChild(el);
}
function queryElement(id) {
    return document.querySelector(`style[cssr-id="${id}"]`);
}
function createElement(id) {
    const el = document.createElement('style');
    el.setAttribute('cssr-id', id);
    return el;
}
function isMediaOrSupports(selector) {
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (!selector)
        return false;
    return /^\s*@(s|m)/.test(selector);
}

const kebabRegex = /[A-Z]/g;
function kebabCase(pattern) {
    return pattern.replace(kebabRegex, match => '-' + match.toLowerCase());
}
/** TODO: refine it to solve nested object */
function unwrapProperty(prop, indent = '  ') {
    if (typeof prop === 'object' && prop !== null) {
        return (' {\n' +
            Object.entries(prop).map(v => {
                return indent + `  ${kebabCase(v[0])}: ${v[1]};`;
            }).join('\n') +
            '\n' + indent + '}');
    }
    return `: ${prop};`;
}
/** unwrap properties */
function unwrapProperties(props, instance, params) {
    if (typeof props === 'function') {
        return props({
            context: instance.context,
            props: params
        });
    }
    return props;
}
function createStyle(selector, props, instance, params) {
    if (!props)
        return '';
    // eslint-disable-next-line
    const unwrappedProps = unwrapProperties(props, instance, params);
    if (!unwrappedProps)
        return '';
    if (typeof unwrappedProps === 'string') {
        return `${selector} {\n${unwrappedProps}\n}`;
    }
    const propertyNames = Object.keys(unwrappedProps);
    if (propertyNames.length === 0) {
        if (instance.config.keepEmptyBlock)
            return selector + ' {\n}';
        return '';
    }
    const statements = selector
        ? [
            selector + ' {'
        ]
        : [];
    propertyNames.forEach(propertyName => {
        const property = unwrappedProps[propertyName];
        if (propertyName === 'raw') {
            statements.push('\n' + property + '\n');
            return;
        }
        propertyName = kebabCase(propertyName);
        if (property !== null && property !== undefined) {
            statements.push(`  ${propertyName}${unwrapProperty(property)}`);
        }
    });
    if (selector) {
        statements.push('}');
    }
    return statements.join('\n');
}
function loopCNodeListWithCallback(children, options, callback) {
    /* istanbul ignore if */
    if (!children)
        return;
    children.forEach(child => {
        if (Array.isArray(child)) {
            loopCNodeListWithCallback(child, options, callback);
        }
        else if (typeof child === 'function') {
            const grandChildren = child(options);
            if (Array.isArray(grandChildren)) {
                loopCNodeListWithCallback(grandChildren, options, callback);
            }
            else if (grandChildren) {
                callback(grandChildren);
            }
        }
        else if (child) {
            callback(child);
        }
    });
}
function traverseCNode(node, selectorPaths, styles, instance, params, styleSheet) {
    const $ = node.$;
    let blockSelector = '';
    if (!$ || typeof $ === 'string') {
        if (isMediaOrSupports($)) {
            blockSelector = $;
        }
        else {
            // as a string selector
            selectorPaths.push($);
        }
    }
    else if (typeof $ === 'function') {
        const selector = $({
            context: instance.context,
            props: params
        });
        if (isMediaOrSupports(selector)) {
            blockSelector = selector;
        }
        else {
            // as a lazy selector
            selectorPaths.push(selector);
        }
    }
    else { // as a option selector
        if ($.before)
            $.before(instance.context);
        if (!$.$ || typeof $.$ === 'string') {
            if (isMediaOrSupports($.$)) {
                blockSelector = $.$;
            }
            else {
                // as a string selector
                selectorPaths.push($.$);
            }
        }
        else /* istanbul ignore else */ if ($.$) {
            const selector = $.$({
                context: instance.context,
                props: params
            });
            if (isMediaOrSupports(selector)) {
                blockSelector = selector;
            }
            else {
                // as a lazy selector
                selectorPaths.push(selector);
            }
        }
    }
    const selector = parseSelectorPath(selectorPaths);
    const style = createStyle(selector, node.props, instance, params);
    if (blockSelector) {
        styles.push(`${blockSelector} {`);
        if (styleSheet && style) {
            styleSheet.insertRule(`${blockSelector} {\n${style}\n}\n`);
        }
    }
    else {
        if (styleSheet && style) {
            styleSheet.insertRule(style);
        }
        if (!styleSheet && style.length)
            styles.push(style);
    }
    if (node.children) {
        loopCNodeListWithCallback(node.children, {
            context: instance.context,
            props: params
        }, childNode => {
            if (typeof childNode === 'string') {
                const style = createStyle(selector, { raw: childNode }, instance, params);
                if (styleSheet) {
                    styleSheet.insertRule(style);
                }
                else {
                    styles.push(style);
                }
            }
            else {
                traverseCNode(childNode, selectorPaths, styles, instance, params, styleSheet);
            }
        });
    }
    selectorPaths.pop();
    if (blockSelector) {
        styles.push('}');
    }
    if ($ && $.after)
        $.after(instance.context);
}
function render(node, instance, props, insertRule = false) {
    const styles = [];
    traverseCNode(node, [], styles, instance, props, insertRule
        ? node.instance.__styleSheet
        : undefined);
    if (insertRule)
        return '';
    return styles.join('\n\n');
}

/* eslint-disable */
// Inspired by https://github.com/garycourt/murmurhash-js
// Ported from https://github.com/aappleby/smhasher/blob/61a0530f28277f2e850bfc39600ce61d02b518de/src/MurmurHash2.cpp#L37-L86
function murmur2(str) {
  // 'm' and 'r' are mixing constants generated offline.
  // They're not really 'magic', they just happen to work well.
  // const m = 0x5bd1e995;
  // const r = 24;
  // Initialize the hash
  var h = 0; // Mix 4 bytes at a time into the hash

  var k,
      i = 0,
      len = str.length;

  for (; len >= 4; ++i, len -= 4) {
    k = str.charCodeAt(i) & 0xff | (str.charCodeAt(++i) & 0xff) << 8 | (str.charCodeAt(++i) & 0xff) << 16 | (str.charCodeAt(++i) & 0xff) << 24;
    k =
    /* Math.imul(k, m): */
    (k & 0xffff) * 0x5bd1e995 + ((k >>> 16) * 0xe995 << 16);
    k ^=
    /* k >>> r: */
    k >>> 24;
    h =
    /* Math.imul(k, m): */
    (k & 0xffff) * 0x5bd1e995 + ((k >>> 16) * 0xe995 << 16) ^
    /* Math.imul(h, m): */
    (h & 0xffff) * 0x5bd1e995 + ((h >>> 16) * 0xe995 << 16);
  } // Handle the last few bytes of the input array


  switch (len) {
    case 3:
      h ^= (str.charCodeAt(i + 2) & 0xff) << 16;

    case 2:
      h ^= (str.charCodeAt(i + 1) & 0xff) << 8;

    case 1:
      h ^= str.charCodeAt(i) & 0xff;
      h =
      /* Math.imul(h, m): */
      (h & 0xffff) * 0x5bd1e995 + ((h >>> 16) * 0xe995 << 16);
  } // Do a few final mixes of the hash to ensure the last few
  // bytes are well-incorporated.


  h ^= h >>> 13;
  h =
  /* Math.imul(h, m): */
  (h & 0xffff) * 0x5bd1e995 + ((h >>> 16) * 0xe995 << 16);
  return ((h ^ h >>> 15) >>> 0).toString(36);
}

/* eslint-disable @typescript-eslint/prefer-ts-expect-error */
if (typeof window !== 'undefined') {
    window.__cssrContext = {};
}
function unmount(intance, node, id) {
    const { els } = node;
    // If id is undefined, unmount all styles
    if (id === undefined) {
        els.forEach(removeElement);
        node.els = [];
    }
    else {
        const target = queryElement(id);
        // eslint-disable-next-line
        if (target && els.includes(target)) {
            removeElement(target);
            node.els = els.filter((el) => el !== target);
        }
    }
}
function addElementToList(els, target) {
    els.push(target);
}
function mount(instance, node, id, props, head, silent, force, anchorMetaName, ssrAdapter
// eslint-disable-next-line @typescript-eslint/no-invalid-void-type
) {
    if (silent && !ssrAdapter) {
        if (id === undefined) {
            // it is possible to use hash to get rid of the requirements of id
            // if you are interested in it, please create a pr
            // i have no time to impl it
            console.error('[css-render/mount]: `id` is required in `silent` mode.');
            return;
        }
        const cssrContext = window.__cssrContext;
        if (!cssrContext[id]) {
            cssrContext[id] = true;
            render(node, instance, props, silent);
        }
        return;
    }
    let style;
    if (id === undefined) {
        style = node.render(props);
        id = murmur2(style);
    }
    if (ssrAdapter) {
        ssrAdapter.adapter(id, style !== null && style !== void 0 ? style : node.render(props));
        return;
    }
    const queriedTarget = queryElement(id);
    if (queriedTarget !== null && !force) {
        return queriedTarget;
    }
    const target = queriedTarget !== null && queriedTarget !== void 0 ? queriedTarget : createElement(id);
    if (style === undefined)
        style = node.render(props);
    target.textContent = style;
    if (queriedTarget !== null)
        return queriedTarget;
    if (anchorMetaName) {
        const anchorMetaEl = document.head.querySelector(`meta[name="${anchorMetaName}"]`);
        if (anchorMetaEl) {
            document.head.insertBefore(target, anchorMetaEl);
            addElementToList(node.els, target);
            return target;
        }
    }
    if (head) {
        document.head.insertBefore(target, document.head.querySelector('style, link'));
    }
    else {
        document.head.appendChild(target);
    }
    addElementToList(node.els, target);
    return target;
}

function wrappedRender(props) {
    return render(this, this.instance, props);
}
// do not guard node calling, it should throw an error.
function wrappedMount(options = {}
// eslint-disable-next-line @typescript-eslint/no-invalid-void-type
) {
    const { id, ssr, props, head = false, silent = false, force = false, anchorMetaName } = options;
    const targetElement = mount(this.instance, this, id, props, head, silent, force, anchorMetaName, ssr);
    return targetElement;
}
function wrappedUnmount(options = {}) {
    /* istanbul ignore next */
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    const { id } = options;
    unmount(this.instance, this, id);
}
const createCNode = function (instance, $, props, children) {
    return {
        instance,
        $,
        props,
        children,
        els: [],
        render: wrappedRender,
        mount: wrappedMount,
        unmount: wrappedUnmount
    };
};
const c$2 = function (instance, $, props, children) {
    if (Array.isArray($)) {
        return createCNode(instance, { $: null }, null, $);
    }
    else if (Array.isArray(props)) {
        return createCNode(instance, $, null, props);
    }
    else if (Array.isArray(children)) {
        return createCNode(instance, $, props, children);
    }
    else {
        return createCNode(instance, $, props, null);
    }
};

function CssRender(config = {}) {
    let styleSheet = null;
    const cssr = {
        c: ((...args) => c$2(cssr, ...args)),
        use: (plugin, ...args) => plugin.install(cssr, ...args),
        find: queryElement,
        context: {},
        config,
        get __styleSheet() {
            // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
            if (!styleSheet) {
                const style = document.createElement('style');
                document.head.appendChild(style);
                styleSheet = document.styleSheets[document.styleSheets.length - 1];
                return styleSheet;
            }
            return styleSheet;
        }
    };
    return cssr;
}

const { c: c$1 } = CssRender();

function cssUnitTransform(source) {
    return typeof source === 'number' ? `${source}px` : source;
}

function checkParent(parentKey, internalParent) {
    const mergedParent = internalParent ?? getCurrentInstance()?.parent;
    if (mergedParent?.type.name === 'BaseTransition' || mergedParent?.type.name === 'FadeInExpandTransition' || mergedParent?.type.displayName === 'Transition')
        return checkParent(parentKey, mergedParent.parent);
    return !!(mergedParent && mergedParent.type.iKey === parentKey);
}

/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

var freeGlobal$1 = freeGlobal;

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal$1 || freeSelf || Function('return this')();

var root$1 = root;

/** Built-in value references. */
var Symbol$1 = root$1.Symbol;

var Symbol$2 = Symbol$1;

/** Used for built-in method references. */
var objectProto$d = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$a = objectProto$d.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString$1 = objectProto$d.toString;

/** Built-in value references. */
var symToStringTag$1 = Symbol$2 ? Symbol$2.toStringTag : undefined;

/**
 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the raw `toStringTag`.
 */
function getRawTag(value) {
  var isOwn = hasOwnProperty$a.call(value, symToStringTag$1),
      tag = value[symToStringTag$1];

  try {
    value[symToStringTag$1] = undefined;
    var unmasked = true;
  } catch (e) {}

  var result = nativeObjectToString$1.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag$1] = tag;
    } else {
      delete value[symToStringTag$1];
    }
  }
  return result;
}

/** Used for built-in method references. */
var objectProto$c = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto$c.toString;

/**
 * Converts `value` to a string using `Object.prototype.toString`.
 *
 * @private
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 */
function objectToString(value) {
  return nativeObjectToString.call(value);
}

/** `Object#toString` result references. */
var nullTag = '[object Null]',
    undefinedTag = '[object Undefined]';

/** Built-in value references. */
var symToStringTag = Symbol$2 ? Symbol$2.toStringTag : undefined;

/**
 * The base implementation of `getTag` without fallbacks for buggy environments.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function baseGetTag(value) {
  if (value == null) {
    return value === undefined ? undefinedTag : nullTag;
  }
  return (symToStringTag && symToStringTag in Object(value))
    ? getRawTag(value)
    : objectToString(value);
}

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return value != null && typeof value == 'object';
}

/** `Object#toString` result references. */
var symbolTag$2 = '[object Symbol]';

/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */
function isSymbol(value) {
  return typeof value == 'symbol' ||
    (isObjectLike(value) && baseGetTag(value) == symbolTag$2);
}

/**
 * A specialized version of `_.map` for arrays without support for iteratee
 * shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the new mapped array.
 */
function arrayMap(array, iteratee) {
  var index = -1,
      length = array == null ? 0 : array.length,
      result = Array(length);

  while (++index < length) {
    result[index] = iteratee(array[index], index, array);
  }
  return result;
}

/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(document.body.children);
 * // => false
 *
 * _.isArray('abc');
 * // => false
 *
 * _.isArray(_.noop);
 * // => false
 */
var isArray = Array.isArray;

var isArray$1 = isArray;

/** Used as references for various `Number` constants. */
var INFINITY$1 = 1 / 0;

/** Used to convert symbols to primitives and strings. */
var symbolProto$1 = Symbol$2 ? Symbol$2.prototype : undefined,
    symbolToString = symbolProto$1 ? symbolProto$1.toString : undefined;

/**
 * The base implementation of `_.toString` which doesn't convert nullish
 * values to empty strings.
 *
 * @private
 * @param {*} value The value to process.
 * @returns {string} Returns the string.
 */
function baseToString(value) {
  // Exit early for strings to avoid a performance hit in some environments.
  if (typeof value == 'string') {
    return value;
  }
  if (isArray$1(value)) {
    // Recursively convert values (susceptible to call stack limits).
    return arrayMap(value, baseToString) + '';
  }
  if (isSymbol(value)) {
    return symbolToString ? symbolToString.call(value) : '';
  }
  var result = (value + '');
  return (result == '0' && (1 / value) == -INFINITY$1) ? '-0' : result;
}

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return value != null && (type == 'object' || type == 'function');
}

/**
 * This method returns the first argument it receives.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Util
 * @param {*} value Any value.
 * @returns {*} Returns `value`.
 * @example
 *
 * var object = { 'a': 1 };
 *
 * console.log(_.identity(object) === object);
 * // => true
 */
function identity(value) {
  return value;
}

/** `Object#toString` result references. */
var asyncTag = '[object AsyncFunction]',
    funcTag$2 = '[object Function]',
    genTag$1 = '[object GeneratorFunction]',
    proxyTag = '[object Proxy]';

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction(value) {
  if (!isObject(value)) {
    return false;
  }
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in Safari 9 which returns 'object' for typed arrays and other constructors.
  var tag = baseGetTag(value);
  return tag == funcTag$2 || tag == genTag$1 || tag == asyncTag || tag == proxyTag;
}

/** Used to detect overreaching core-js shims. */
var coreJsData = root$1['__core-js_shared__'];

var coreJsData$1 = coreJsData;

/** Used to detect methods masquerading as native. */
var maskSrcKey = (function() {
  var uid = /[^.]+$/.exec(coreJsData$1 && coreJsData$1.keys && coreJsData$1.keys.IE_PROTO || '');
  return uid ? ('Symbol(src)_1.' + uid) : '';
}());

/**
 * Checks if `func` has its source masked.
 *
 * @private
 * @param {Function} func The function to check.
 * @returns {boolean} Returns `true` if `func` is masked, else `false`.
 */
function isMasked(func) {
  return !!maskSrcKey && (maskSrcKey in func);
}

/** Used for built-in method references. */
var funcProto$2 = Function.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString$2 = funcProto$2.toString;

/**
 * Converts `func` to its source code.
 *
 * @private
 * @param {Function} func The function to convert.
 * @returns {string} Returns the source code.
 */
function toSource(func) {
  if (func != null) {
    try {
      return funcToString$2.call(func);
    } catch (e) {}
    try {
      return (func + '');
    } catch (e) {}
  }
  return '';
}

/**
 * Used to match `RegExp`
 * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
 */
var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

/** Used to detect host constructors (Safari). */
var reIsHostCtor = /^\[object .+?Constructor\]$/;

/** Used for built-in method references. */
var funcProto$1 = Function.prototype,
    objectProto$b = Object.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString$1 = funcProto$1.toString;

/** Used to check objects for own properties. */
var hasOwnProperty$9 = objectProto$b.hasOwnProperty;

/** Used to detect if a method is native. */
var reIsNative = RegExp('^' +
  funcToString$1.call(hasOwnProperty$9).replace(reRegExpChar, '\\$&')
  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
);

/**
 * The base implementation of `_.isNative` without bad shim checks.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a native function,
 *  else `false`.
 */
function baseIsNative(value) {
  if (!isObject(value) || isMasked(value)) {
    return false;
  }
  var pattern = isFunction(value) ? reIsNative : reIsHostCtor;
  return pattern.test(toSource(value));
}

/**
 * Gets the value at `key` of `object`.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {string} key The key of the property to get.
 * @returns {*} Returns the property value.
 */
function getValue(object, key) {
  return object == null ? undefined : object[key];
}

/**
 * Gets the native function at `key` of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the method to get.
 * @returns {*} Returns the function if it's native, else `undefined`.
 */
function getNative(object, key) {
  var value = getValue(object, key);
  return baseIsNative(value) ? value : undefined;
}

/* Built-in method references that are verified to be native. */
var WeakMap$1 = getNative(root$1, 'WeakMap');

var WeakMap$2 = WeakMap$1;

/** Built-in value references. */
var objectCreate = Object.create;

/**
 * The base implementation of `_.create` without support for assigning
 * properties to the created object.
 *
 * @private
 * @param {Object} proto The object to inherit from.
 * @returns {Object} Returns the new object.
 */
var baseCreate = (function() {
  function object() {}
  return function(proto) {
    if (!isObject(proto)) {
      return {};
    }
    if (objectCreate) {
      return objectCreate(proto);
    }
    object.prototype = proto;
    var result = new object;
    object.prototype = undefined;
    return result;
  };
}());

var baseCreate$1 = baseCreate;

/**
 * A faster alternative to `Function#apply`, this function invokes `func`
 * with the `this` binding of `thisArg` and the arguments of `args`.
 *
 * @private
 * @param {Function} func The function to invoke.
 * @param {*} thisArg The `this` binding of `func`.
 * @param {Array} args The arguments to invoke `func` with.
 * @returns {*} Returns the result of `func`.
 */
function apply(func, thisArg, args) {
  switch (args.length) {
    case 0: return func.call(thisArg);
    case 1: return func.call(thisArg, args[0]);
    case 2: return func.call(thisArg, args[0], args[1]);
    case 3: return func.call(thisArg, args[0], args[1], args[2]);
  }
  return func.apply(thisArg, args);
}

/**
 * Copies the values of `source` to `array`.
 *
 * @private
 * @param {Array} source The array to copy values from.
 * @param {Array} [array=[]] The array to copy values to.
 * @returns {Array} Returns `array`.
 */
function copyArray(source, array) {
  var index = -1,
      length = source.length;

  array || (array = Array(length));
  while (++index < length) {
    array[index] = source[index];
  }
  return array;
}

/** Used to detect hot functions by number of calls within a span of milliseconds. */
var HOT_COUNT = 800,
    HOT_SPAN = 16;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeNow = Date.now;

/**
 * Creates a function that'll short out and invoke `identity` instead
 * of `func` when it's called `HOT_COUNT` or more times in `HOT_SPAN`
 * milliseconds.
 *
 * @private
 * @param {Function} func The function to restrict.
 * @returns {Function} Returns the new shortable function.
 */
function shortOut(func) {
  var count = 0,
      lastCalled = 0;

  return function() {
    var stamp = nativeNow(),
        remaining = HOT_SPAN - (stamp - lastCalled);

    lastCalled = stamp;
    if (remaining > 0) {
      if (++count >= HOT_COUNT) {
        return arguments[0];
      }
    } else {
      count = 0;
    }
    return func.apply(undefined, arguments);
  };
}

/**
 * Creates a function that returns `value`.
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Util
 * @param {*} value The value to return from the new function.
 * @returns {Function} Returns the new constant function.
 * @example
 *
 * var objects = _.times(2, _.constant({ 'a': 1 }));
 *
 * console.log(objects);
 * // => [{ 'a': 1 }, { 'a': 1 }]
 *
 * console.log(objects[0] === objects[1]);
 * // => true
 */
function constant(value) {
  return function() {
    return value;
  };
}

var defineProperty = (function() {
  try {
    var func = getNative(Object, 'defineProperty');
    func({}, '', {});
    return func;
  } catch (e) {}
}());

var defineProperty$1 = defineProperty;

/**
 * The base implementation of `setToString` without support for hot loop shorting.
 *
 * @private
 * @param {Function} func The function to modify.
 * @param {Function} string The `toString` result.
 * @returns {Function} Returns `func`.
 */
var baseSetToString = !defineProperty$1 ? identity : function(func, string) {
  return defineProperty$1(func, 'toString', {
    'configurable': true,
    'enumerable': false,
    'value': constant(string),
    'writable': true
  });
};

var baseSetToString$1 = baseSetToString;

/**
 * Sets the `toString` method of `func` to return `string`.
 *
 * @private
 * @param {Function} func The function to modify.
 * @param {Function} string The `toString` result.
 * @returns {Function} Returns `func`.
 */
var setToString = shortOut(baseSetToString$1);

var setToString$1 = setToString;

/**
 * A specialized version of `_.forEach` for arrays without support for
 * iteratee shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns `array`.
 */
function arrayEach(array, iteratee) {
  var index = -1,
      length = array == null ? 0 : array.length;

  while (++index < length) {
    if (iteratee(array[index], index, array) === false) {
      break;
    }
  }
  return array;
}

/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER$1 = 9007199254740991;

/** Used to detect unsigned integer values. */
var reIsUint = /^(?:0|[1-9]\d*)$/;

/**
 * Checks if `value` is a valid array-like index.
 *
 * @private
 * @param {*} value The value to check.
 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
 */
function isIndex(value, length) {
  var type = typeof value;
  length = length == null ? MAX_SAFE_INTEGER$1 : length;

  return !!length &&
    (type == 'number' ||
      (type != 'symbol' && reIsUint.test(value))) &&
        (value > -1 && value % 1 == 0 && value < length);
}

/**
 * The base implementation of `assignValue` and `assignMergeValue` without
 * value checks.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {string} key The key of the property to assign.
 * @param {*} value The value to assign.
 */
function baseAssignValue(object, key, value) {
  if (key == '__proto__' && defineProperty$1) {
    defineProperty$1(object, key, {
      'configurable': true,
      'enumerable': true,
      'value': value,
      'writable': true
    });
  } else {
    object[key] = value;
  }
}

/**
 * Performs a
 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * comparison between two values to determine if they are equivalent.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * var object = { 'a': 1 };
 * var other = { 'a': 1 };
 *
 * _.eq(object, object);
 * // => true
 *
 * _.eq(object, other);
 * // => false
 *
 * _.eq('a', 'a');
 * // => true
 *
 * _.eq('a', Object('a'));
 * // => false
 *
 * _.eq(NaN, NaN);
 * // => true
 */
function eq(value, other) {
  return value === other || (value !== value && other !== other);
}

/** Used for built-in method references. */
var objectProto$a = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$8 = objectProto$a.hasOwnProperty;

/**
 * Assigns `value` to `key` of `object` if the existing value is not equivalent
 * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * for equality comparisons.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {string} key The key of the property to assign.
 * @param {*} value The value to assign.
 */
function assignValue(object, key, value) {
  var objValue = object[key];
  if (!(hasOwnProperty$8.call(object, key) && eq(objValue, value)) ||
      (value === undefined && !(key in object))) {
    baseAssignValue(object, key, value);
  }
}

/**
 * Copies properties of `source` to `object`.
 *
 * @private
 * @param {Object} source The object to copy properties from.
 * @param {Array} props The property identifiers to copy.
 * @param {Object} [object={}] The object to copy properties to.
 * @param {Function} [customizer] The function to customize copied values.
 * @returns {Object} Returns `object`.
 */
function copyObject(source, props, object, customizer) {
  var isNew = !object;
  object || (object = {});

  var index = -1,
      length = props.length;

  while (++index < length) {
    var key = props[index];

    var newValue = customizer
      ? customizer(object[key], source[key], key, object, source)
      : undefined;

    if (newValue === undefined) {
      newValue = source[key];
    }
    if (isNew) {
      baseAssignValue(object, key, newValue);
    } else {
      assignValue(object, key, newValue);
    }
  }
  return object;
}

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max;

/**
 * A specialized version of `baseRest` which transforms the rest array.
 *
 * @private
 * @param {Function} func The function to apply a rest parameter to.
 * @param {number} [start=func.length-1] The start position of the rest parameter.
 * @param {Function} transform The rest array transform.
 * @returns {Function} Returns the new function.
 */
function overRest(func, start, transform) {
  start = nativeMax(start === undefined ? (func.length - 1) : start, 0);
  return function() {
    var args = arguments,
        index = -1,
        length = nativeMax(args.length - start, 0),
        array = Array(length);

    while (++index < length) {
      array[index] = args[start + index];
    }
    index = -1;
    var otherArgs = Array(start + 1);
    while (++index < start) {
      otherArgs[index] = args[index];
    }
    otherArgs[start] = transform(array);
    return apply(func, this, otherArgs);
  };
}

/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER = 9007199254740991;

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This method is loosely based on
 * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 * @example
 *
 * _.isLength(3);
 * // => true
 *
 * _.isLength(Number.MIN_VALUE);
 * // => false
 *
 * _.isLength(Infinity);
 * // => false
 *
 * _.isLength('3');
 * // => false
 */
function isLength(value) {
  return typeof value == 'number' &&
    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}

/**
 * Checks if `value` is array-like. A value is considered array-like if it's
 * not a function and has a `value.length` that's an integer greater than or
 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
 * @example
 *
 * _.isArrayLike([1, 2, 3]);
 * // => true
 *
 * _.isArrayLike(document.body.children);
 * // => true
 *
 * _.isArrayLike('abc');
 * // => true
 *
 * _.isArrayLike(_.noop);
 * // => false
 */
function isArrayLike(value) {
  return value != null && isLength(value.length) && !isFunction(value);
}

/** Used for built-in method references. */
var objectProto$9 = Object.prototype;

/**
 * Checks if `value` is likely a prototype object.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
 */
function isPrototype(value) {
  var Ctor = value && value.constructor,
      proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto$9;

  return value === proto;
}

/**
 * The base implementation of `_.times` without support for iteratee shorthands
 * or max array length checks.
 *
 * @private
 * @param {number} n The number of times to invoke `iteratee`.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the array of results.
 */
function baseTimes(n, iteratee) {
  var index = -1,
      result = Array(n);

  while (++index < n) {
    result[index] = iteratee(index);
  }
  return result;
}

/** `Object#toString` result references. */
var argsTag$2 = '[object Arguments]';

/**
 * The base implementation of `_.isArguments`.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 */
function baseIsArguments(value) {
  return isObjectLike(value) && baseGetTag(value) == argsTag$2;
}

/** Used for built-in method references. */
var objectProto$8 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$7 = objectProto$8.hasOwnProperty;

/** Built-in value references. */
var propertyIsEnumerable$1 = objectProto$8.propertyIsEnumerable;

/**
 * Checks if `value` is likely an `arguments` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 *  else `false`.
 * @example
 *
 * _.isArguments(function() { return arguments; }());
 * // => true
 *
 * _.isArguments([1, 2, 3]);
 * // => false
 */
var isArguments = baseIsArguments(function() { return arguments; }()) ? baseIsArguments : function(value) {
  return isObjectLike(value) && hasOwnProperty$7.call(value, 'callee') &&
    !propertyIsEnumerable$1.call(value, 'callee');
};

var isArguments$1 = isArguments;

/**
 * This method returns `false`.
 *
 * @static
 * @memberOf _
 * @since 4.13.0
 * @category Util
 * @returns {boolean} Returns `false`.
 * @example
 *
 * _.times(2, _.stubFalse);
 * // => [false, false]
 */
function stubFalse() {
  return false;
}

/** Detect free variable `exports`. */
var freeExports$2 = typeof exports == 'object' && exports && !exports.nodeType && exports;

/** Detect free variable `module`. */
var freeModule$2 = freeExports$2 && typeof module == 'object' && module && !module.nodeType && module;

/** Detect the popular CommonJS extension `module.exports`. */
var moduleExports$2 = freeModule$2 && freeModule$2.exports === freeExports$2;

/** Built-in value references. */
var Buffer$1 = moduleExports$2 ? root$1.Buffer : undefined;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeIsBuffer = Buffer$1 ? Buffer$1.isBuffer : undefined;

/**
 * Checks if `value` is a buffer.
 *
 * @static
 * @memberOf _
 * @since 4.3.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a buffer, else `false`.
 * @example
 *
 * _.isBuffer(new Buffer(2));
 * // => true
 *
 * _.isBuffer(new Uint8Array(2));
 * // => false
 */
var isBuffer = nativeIsBuffer || stubFalse;

var isBuffer$1 = isBuffer;

/** `Object#toString` result references. */
var argsTag$1 = '[object Arguments]',
    arrayTag$1 = '[object Array]',
    boolTag$2 = '[object Boolean]',
    dateTag$2 = '[object Date]',
    errorTag$1 = '[object Error]',
    funcTag$1 = '[object Function]',
    mapTag$4 = '[object Map]',
    numberTag$2 = '[object Number]',
    objectTag$3 = '[object Object]',
    regexpTag$2 = '[object RegExp]',
    setTag$4 = '[object Set]',
    stringTag$2 = '[object String]',
    weakMapTag$2 = '[object WeakMap]';

var arrayBufferTag$2 = '[object ArrayBuffer]',
    dataViewTag$3 = '[object DataView]',
    float32Tag$2 = '[object Float32Array]',
    float64Tag$2 = '[object Float64Array]',
    int8Tag$2 = '[object Int8Array]',
    int16Tag$2 = '[object Int16Array]',
    int32Tag$2 = '[object Int32Array]',
    uint8Tag$2 = '[object Uint8Array]',
    uint8ClampedTag$2 = '[object Uint8ClampedArray]',
    uint16Tag$2 = '[object Uint16Array]',
    uint32Tag$2 = '[object Uint32Array]';

/** Used to identify `toStringTag` values of typed arrays. */
var typedArrayTags = {};
typedArrayTags[float32Tag$2] = typedArrayTags[float64Tag$2] =
typedArrayTags[int8Tag$2] = typedArrayTags[int16Tag$2] =
typedArrayTags[int32Tag$2] = typedArrayTags[uint8Tag$2] =
typedArrayTags[uint8ClampedTag$2] = typedArrayTags[uint16Tag$2] =
typedArrayTags[uint32Tag$2] = true;
typedArrayTags[argsTag$1] = typedArrayTags[arrayTag$1] =
typedArrayTags[arrayBufferTag$2] = typedArrayTags[boolTag$2] =
typedArrayTags[dataViewTag$3] = typedArrayTags[dateTag$2] =
typedArrayTags[errorTag$1] = typedArrayTags[funcTag$1] =
typedArrayTags[mapTag$4] = typedArrayTags[numberTag$2] =
typedArrayTags[objectTag$3] = typedArrayTags[regexpTag$2] =
typedArrayTags[setTag$4] = typedArrayTags[stringTag$2] =
typedArrayTags[weakMapTag$2] = false;

/**
 * The base implementation of `_.isTypedArray` without Node.js optimizations.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 */
function baseIsTypedArray(value) {
  return isObjectLike(value) &&
    isLength(value.length) && !!typedArrayTags[baseGetTag(value)];
}

/**
 * The base implementation of `_.unary` without support for storing metadata.
 *
 * @private
 * @param {Function} func The function to cap arguments for.
 * @returns {Function} Returns the new capped function.
 */
function baseUnary(func) {
  return function(value) {
    return func(value);
  };
}

/** Detect free variable `exports`. */
var freeExports$1 = typeof exports == 'object' && exports && !exports.nodeType && exports;

/** Detect free variable `module`. */
var freeModule$1 = freeExports$1 && typeof module == 'object' && module && !module.nodeType && module;

/** Detect the popular CommonJS extension `module.exports`. */
var moduleExports$1 = freeModule$1 && freeModule$1.exports === freeExports$1;

/** Detect free variable `process` from Node.js. */
var freeProcess = moduleExports$1 && freeGlobal$1.process;

/** Used to access faster Node.js helpers. */
var nodeUtil = (function() {
  try {
    // Use `util.types` for Node.js 10+.
    var types = freeModule$1 && freeModule$1.require && freeModule$1.require('util').types;

    if (types) {
      return types;
    }

    // Legacy `process.binding('util')` for Node.js < 10.
    return freeProcess && freeProcess.binding && freeProcess.binding('util');
  } catch (e) {}
}());

var nodeUtil$1 = nodeUtil;

/* Node.js helper references. */
var nodeIsTypedArray = nodeUtil$1 && nodeUtil$1.isTypedArray;

/**
 * Checks if `value` is classified as a typed array.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 * @example
 *
 * _.isTypedArray(new Uint8Array);
 * // => true
 *
 * _.isTypedArray([]);
 * // => false
 */
var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;

var isTypedArray$1 = isTypedArray;

/** Used for built-in method references. */
var objectProto$7 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$6 = objectProto$7.hasOwnProperty;

/**
 * Creates an array of the enumerable property names of the array-like `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @param {boolean} inherited Specify returning inherited property names.
 * @returns {Array} Returns the array of property names.
 */
function arrayLikeKeys(value, inherited) {
  var isArr = isArray$1(value),
      isArg = !isArr && isArguments$1(value),
      isBuff = !isArr && !isArg && isBuffer$1(value),
      isType = !isArr && !isArg && !isBuff && isTypedArray$1(value),
      skipIndexes = isArr || isArg || isBuff || isType,
      result = skipIndexes ? baseTimes(value.length, String) : [],
      length = result.length;

  for (var key in value) {
    if ((inherited || hasOwnProperty$6.call(value, key)) &&
        !(skipIndexes && (
           // Safari 9 has enumerable `arguments.length` in strict mode.
           key == 'length' ||
           // Node.js 0.10 has enumerable non-index properties on buffers.
           (isBuff && (key == 'offset' || key == 'parent')) ||
           // PhantomJS 2 has enumerable non-index properties on typed arrays.
           (isType && (key == 'buffer' || key == 'byteLength' || key == 'byteOffset')) ||
           // Skip index properties.
           isIndex(key, length)
        ))) {
      result.push(key);
    }
  }
  return result;
}

/**
 * Creates a unary function that invokes `func` with its argument transformed.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {Function} transform The argument transform.
 * @returns {Function} Returns the new function.
 */
function overArg(func, transform) {
  return function(arg) {
    return func(transform(arg));
  };
}

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeKeys = overArg(Object.keys, Object);

var nativeKeys$1 = nativeKeys;

/** Used for built-in method references. */
var objectProto$6 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$5 = objectProto$6.hasOwnProperty;

/**
 * The base implementation of `_.keys` which doesn't treat sparse arrays as dense.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function baseKeys(object) {
  if (!isPrototype(object)) {
    return nativeKeys$1(object);
  }
  var result = [];
  for (var key in Object(object)) {
    if (hasOwnProperty$5.call(object, key) && key != 'constructor') {
      result.push(key);
    }
  }
  return result;
}

/**
 * Creates an array of the own enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects. See the
 * [ES spec](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
 * for more details.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keys(new Foo);
 * // => ['a', 'b'] (iteration order is not guaranteed)
 *
 * _.keys('hi');
 * // => ['0', '1']
 */
function keys(object) {
  return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
}

/**
 * This function is like
 * [`Object.keys`](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
 * except that it includes inherited enumerable properties.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function nativeKeysIn(object) {
  var result = [];
  if (object != null) {
    for (var key in Object(object)) {
      result.push(key);
    }
  }
  return result;
}

/** Used for built-in method references. */
var objectProto$5 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$4 = objectProto$5.hasOwnProperty;

/**
 * The base implementation of `_.keysIn` which doesn't treat sparse arrays as dense.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function baseKeysIn(object) {
  if (!isObject(object)) {
    return nativeKeysIn(object);
  }
  var isProto = isPrototype(object),
      result = [];

  for (var key in object) {
    if (!(key == 'constructor' && (isProto || !hasOwnProperty$4.call(object, key)))) {
      result.push(key);
    }
  }
  return result;
}

/**
 * Creates an array of the own and inherited enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keysIn(new Foo);
 * // => ['a', 'b', 'c'] (iteration order is not guaranteed)
 */
function keysIn(object) {
  return isArrayLike(object) ? arrayLikeKeys(object, true) : baseKeysIn(object);
}

/** Used to match property names within property paths. */
var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
    reIsPlainProp = /^\w*$/;

/**
 * Checks if `value` is a property name and not a property path.
 *
 * @private
 * @param {*} value The value to check.
 * @param {Object} [object] The object to query keys on.
 * @returns {boolean} Returns `true` if `value` is a property name, else `false`.
 */
function isKey(value, object) {
  if (isArray$1(value)) {
    return false;
  }
  var type = typeof value;
  if (type == 'number' || type == 'symbol' || type == 'boolean' ||
      value == null || isSymbol(value)) {
    return true;
  }
  return reIsPlainProp.test(value) || !reIsDeepProp.test(value) ||
    (object != null && value in Object(object));
}

/* Built-in method references that are verified to be native. */
var nativeCreate = getNative(Object, 'create');

var nativeCreate$1 = nativeCreate;

/**
 * Removes all key-value entries from the hash.
 *
 * @private
 * @name clear
 * @memberOf Hash
 */
function hashClear() {
  this.__data__ = nativeCreate$1 ? nativeCreate$1(null) : {};
  this.size = 0;
}

/**
 * Removes `key` and its value from the hash.
 *
 * @private
 * @name delete
 * @memberOf Hash
 * @param {Object} hash The hash to modify.
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function hashDelete(key) {
  var result = this.has(key) && delete this.__data__[key];
  this.size -= result ? 1 : 0;
  return result;
}

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED$1 = '__lodash_hash_undefined__';

/** Used for built-in method references. */
var objectProto$4 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$3 = objectProto$4.hasOwnProperty;

/**
 * Gets the hash value for `key`.
 *
 * @private
 * @name get
 * @memberOf Hash
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function hashGet(key) {
  var data = this.__data__;
  if (nativeCreate$1) {
    var result = data[key];
    return result === HASH_UNDEFINED$1 ? undefined : result;
  }
  return hasOwnProperty$3.call(data, key) ? data[key] : undefined;
}

/** Used for built-in method references. */
var objectProto$3 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$2 = objectProto$3.hasOwnProperty;

/**
 * Checks if a hash value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Hash
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function hashHas(key) {
  var data = this.__data__;
  return nativeCreate$1 ? (data[key] !== undefined) : hasOwnProperty$2.call(data, key);
}

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED = '__lodash_hash_undefined__';

/**
 * Sets the hash `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Hash
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the hash instance.
 */
function hashSet(key, value) {
  var data = this.__data__;
  this.size += this.has(key) ? 0 : 1;
  data[key] = (nativeCreate$1 && value === undefined) ? HASH_UNDEFINED : value;
  return this;
}

/**
 * Creates a hash object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Hash(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

// Add methods to `Hash`.
Hash.prototype.clear = hashClear;
Hash.prototype['delete'] = hashDelete;
Hash.prototype.get = hashGet;
Hash.prototype.has = hashHas;
Hash.prototype.set = hashSet;

/**
 * Removes all key-value entries from the list cache.
 *
 * @private
 * @name clear
 * @memberOf ListCache
 */
function listCacheClear() {
  this.__data__ = [];
  this.size = 0;
}

/**
 * Gets the index at which the `key` is found in `array` of key-value pairs.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} key The key to search for.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function assocIndexOf(array, key) {
  var length = array.length;
  while (length--) {
    if (eq(array[length][0], key)) {
      return length;
    }
  }
  return -1;
}

/** Used for built-in method references. */
var arrayProto = Array.prototype;

/** Built-in value references. */
var splice = arrayProto.splice;

/**
 * Removes `key` and its value from the list cache.
 *
 * @private
 * @name delete
 * @memberOf ListCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function listCacheDelete(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    return false;
  }
  var lastIndex = data.length - 1;
  if (index == lastIndex) {
    data.pop();
  } else {
    splice.call(data, index, 1);
  }
  --this.size;
  return true;
}

/**
 * Gets the list cache value for `key`.
 *
 * @private
 * @name get
 * @memberOf ListCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function listCacheGet(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  return index < 0 ? undefined : data[index][1];
}

/**
 * Checks if a list cache value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf ListCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function listCacheHas(key) {
  return assocIndexOf(this.__data__, key) > -1;
}

/**
 * Sets the list cache `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf ListCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the list cache instance.
 */
function listCacheSet(key, value) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    ++this.size;
    data.push([key, value]);
  } else {
    data[index][1] = value;
  }
  return this;
}

/**
 * Creates an list cache object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function ListCache(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

// Add methods to `ListCache`.
ListCache.prototype.clear = listCacheClear;
ListCache.prototype['delete'] = listCacheDelete;
ListCache.prototype.get = listCacheGet;
ListCache.prototype.has = listCacheHas;
ListCache.prototype.set = listCacheSet;

/* Built-in method references that are verified to be native. */
var Map$1 = getNative(root$1, 'Map');

var Map$2 = Map$1;

/**
 * Removes all key-value entries from the map.
 *
 * @private
 * @name clear
 * @memberOf MapCache
 */
function mapCacheClear() {
  this.size = 0;
  this.__data__ = {
    'hash': new Hash,
    'map': new (Map$2 || ListCache),
    'string': new Hash
  };
}

/**
 * Checks if `value` is suitable for use as unique object key.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
 */
function isKeyable(value) {
  var type = typeof value;
  return (type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean')
    ? (value !== '__proto__')
    : (value === null);
}

/**
 * Gets the data for `map`.
 *
 * @private
 * @param {Object} map The map to query.
 * @param {string} key The reference key.
 * @returns {*} Returns the map data.
 */
function getMapData(map, key) {
  var data = map.__data__;
  return isKeyable(key)
    ? data[typeof key == 'string' ? 'string' : 'hash']
    : data.map;
}

/**
 * Removes `key` and its value from the map.
 *
 * @private
 * @name delete
 * @memberOf MapCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function mapCacheDelete(key) {
  var result = getMapData(this, key)['delete'](key);
  this.size -= result ? 1 : 0;
  return result;
}

/**
 * Gets the map value for `key`.
 *
 * @private
 * @name get
 * @memberOf MapCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function mapCacheGet(key) {
  return getMapData(this, key).get(key);
}

/**
 * Checks if a map value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf MapCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function mapCacheHas(key) {
  return getMapData(this, key).has(key);
}

/**
 * Sets the map `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf MapCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the map cache instance.
 */
function mapCacheSet(key, value) {
  var data = getMapData(this, key),
      size = data.size;

  data.set(key, value);
  this.size += data.size == size ? 0 : 1;
  return this;
}

/**
 * Creates a map cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function MapCache(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

// Add methods to `MapCache`.
MapCache.prototype.clear = mapCacheClear;
MapCache.prototype['delete'] = mapCacheDelete;
MapCache.prototype.get = mapCacheGet;
MapCache.prototype.has = mapCacheHas;
MapCache.prototype.set = mapCacheSet;

/** Error message constants. */
var FUNC_ERROR_TEXT = 'Expected a function';

/**
 * Creates a function that memoizes the result of `func`. If `resolver` is
 * provided, it determines the cache key for storing the result based on the
 * arguments provided to the memoized function. By default, the first argument
 * provided to the memoized function is used as the map cache key. The `func`
 * is invoked with the `this` binding of the memoized function.
 *
 * **Note:** The cache is exposed as the `cache` property on the memoized
 * function. Its creation may be customized by replacing the `_.memoize.Cache`
 * constructor with one whose instances implement the
 * [`Map`](http://ecma-international.org/ecma-262/7.0/#sec-properties-of-the-map-prototype-object)
 * method interface of `clear`, `delete`, `get`, `has`, and `set`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to have its output memoized.
 * @param {Function} [resolver] The function to resolve the cache key.
 * @returns {Function} Returns the new memoized function.
 * @example
 *
 * var object = { 'a': 1, 'b': 2 };
 * var other = { 'c': 3, 'd': 4 };
 *
 * var values = _.memoize(_.values);
 * values(object);
 * // => [1, 2]
 *
 * values(other);
 * // => [3, 4]
 *
 * object.a = 2;
 * values(object);
 * // => [1, 2]
 *
 * // Modify the result cache.
 * values.cache.set(object, ['a', 'b']);
 * values(object);
 * // => ['a', 'b']
 *
 * // Replace `_.memoize.Cache`.
 * _.memoize.Cache = WeakMap;
 */
function memoize(func, resolver) {
  if (typeof func != 'function' || (resolver != null && typeof resolver != 'function')) {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  var memoized = function() {
    var args = arguments,
        key = resolver ? resolver.apply(this, args) : args[0],
        cache = memoized.cache;

    if (cache.has(key)) {
      return cache.get(key);
    }
    var result = func.apply(this, args);
    memoized.cache = cache.set(key, result) || cache;
    return result;
  };
  memoized.cache = new (memoize.Cache || MapCache);
  return memoized;
}

// Expose `MapCache`.
memoize.Cache = MapCache;

/** Used as the maximum memoize cache size. */
var MAX_MEMOIZE_SIZE = 500;

/**
 * A specialized version of `_.memoize` which clears the memoized function's
 * cache when it exceeds `MAX_MEMOIZE_SIZE`.
 *
 * @private
 * @param {Function} func The function to have its output memoized.
 * @returns {Function} Returns the new memoized function.
 */
function memoizeCapped(func) {
  var result = memoize(func, function(key) {
    if (cache.size === MAX_MEMOIZE_SIZE) {
      cache.clear();
    }
    return key;
  });

  var cache = result.cache;
  return result;
}

/** Used to match property names within property paths. */
var rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;

/** Used to match backslashes in property paths. */
var reEscapeChar = /\\(\\)?/g;

/**
 * Converts `string` to a property path array.
 *
 * @private
 * @param {string} string The string to convert.
 * @returns {Array} Returns the property path array.
 */
var stringToPath = memoizeCapped(function(string) {
  var result = [];
  if (string.charCodeAt(0) === 46 /* . */) {
    result.push('');
  }
  string.replace(rePropName, function(match, number, quote, subString) {
    result.push(quote ? subString.replace(reEscapeChar, '$1') : (number || match));
  });
  return result;
});

var stringToPath$1 = stringToPath;

/**
 * Converts `value` to a string. An empty string is returned for `null`
 * and `undefined` values. The sign of `-0` is preserved.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 * @example
 *
 * _.toString(null);
 * // => ''
 *
 * _.toString(-0);
 * // => '-0'
 *
 * _.toString([1, 2, 3]);
 * // => '1,2,3'
 */
function toString(value) {
  return value == null ? '' : baseToString(value);
}

/**
 * Casts `value` to a path array if it's not one.
 *
 * @private
 * @param {*} value The value to inspect.
 * @param {Object} [object] The object to query keys on.
 * @returns {Array} Returns the cast property path array.
 */
function castPath(value, object) {
  if (isArray$1(value)) {
    return value;
  }
  return isKey(value, object) ? [value] : stringToPath$1(toString(value));
}

/** Used as references for various `Number` constants. */
var INFINITY = 1 / 0;

/**
 * Converts `value` to a string key if it's not a string or symbol.
 *
 * @private
 * @param {*} value The value to inspect.
 * @returns {string|symbol} Returns the key.
 */
function toKey(value) {
  if (typeof value == 'string' || isSymbol(value)) {
    return value;
  }
  var result = (value + '');
  return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
}

/**
 * The base implementation of `_.get` without support for default values.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Array|string} path The path of the property to get.
 * @returns {*} Returns the resolved value.
 */
function baseGet(object, path) {
  path = castPath(path, object);

  var index = 0,
      length = path.length;

  while (object != null && index < length) {
    object = object[toKey(path[index++])];
  }
  return (index && index == length) ? object : undefined;
}

/**
 * Appends the elements of `values` to `array`.
 *
 * @private
 * @param {Array} array The array to modify.
 * @param {Array} values The values to append.
 * @returns {Array} Returns `array`.
 */
function arrayPush(array, values) {
  var index = -1,
      length = values.length,
      offset = array.length;

  while (++index < length) {
    array[offset + index] = values[index];
  }
  return array;
}

/** Built-in value references. */
var spreadableSymbol = Symbol$2 ? Symbol$2.isConcatSpreadable : undefined;

/**
 * Checks if `value` is a flattenable `arguments` object or array.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is flattenable, else `false`.
 */
function isFlattenable(value) {
  return isArray$1(value) || isArguments$1(value) ||
    !!(spreadableSymbol && value && value[spreadableSymbol]);
}

/**
 * The base implementation of `_.flatten` with support for restricting flattening.
 *
 * @private
 * @param {Array} array The array to flatten.
 * @param {number} depth The maximum recursion depth.
 * @param {boolean} [predicate=isFlattenable] The function invoked per iteration.
 * @param {boolean} [isStrict] Restrict to values that pass `predicate` checks.
 * @param {Array} [result=[]] The initial result value.
 * @returns {Array} Returns the new flattened array.
 */
function baseFlatten(array, depth, predicate, isStrict, result) {
  var index = -1,
      length = array.length;

  predicate || (predicate = isFlattenable);
  result || (result = []);

  while (++index < length) {
    var value = array[index];
    if (depth > 0 && predicate(value)) {
      if (depth > 1) {
        // Recursively flatten arrays (susceptible to call stack limits).
        baseFlatten(value, depth - 1, predicate, isStrict, result);
      } else {
        arrayPush(result, value);
      }
    } else if (!isStrict) {
      result[result.length] = value;
    }
  }
  return result;
}

/**
 * Flattens `array` a single level deep.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Array
 * @param {Array} array The array to flatten.
 * @returns {Array} Returns the new flattened array.
 * @example
 *
 * _.flatten([1, [2, [3, [4]], 5]]);
 * // => [1, 2, [3, [4]], 5]
 */
function flatten$2(array) {
  var length = array == null ? 0 : array.length;
  return length ? baseFlatten(array, 1) : [];
}

/**
 * A specialized version of `baseRest` which flattens the rest array.
 *
 * @private
 * @param {Function} func The function to apply a rest parameter to.
 * @returns {Function} Returns the new function.
 */
function flatRest(func) {
  return setToString$1(overRest(func, undefined, flatten$2), func + '');
}

/** Built-in value references. */
var getPrototype = overArg(Object.getPrototypeOf, Object);

var getPrototype$1 = getPrototype;

/** `Object#toString` result references. */
var objectTag$2 = '[object Object]';

/** Used for built-in method references. */
var funcProto = Function.prototype,
    objectProto$2 = Object.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/** Used to check objects for own properties. */
var hasOwnProperty$1 = objectProto$2.hasOwnProperty;

/** Used to infer the `Object` constructor. */
var objectCtorString = funcToString.call(Object);

/**
 * Checks if `value` is a plain object, that is, an object created by the
 * `Object` constructor or one with a `[[Prototype]]` of `null`.
 *
 * @static
 * @memberOf _
 * @since 0.8.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 * }
 *
 * _.isPlainObject(new Foo);
 * // => false
 *
 * _.isPlainObject([1, 2, 3]);
 * // => false
 *
 * _.isPlainObject({ 'x': 0, 'y': 0 });
 * // => true
 *
 * _.isPlainObject(Object.create(null));
 * // => true
 */
function isPlainObject(value) {
  if (!isObjectLike(value) || baseGetTag(value) != objectTag$2) {
    return false;
  }
  var proto = getPrototype$1(value);
  if (proto === null) {
    return true;
  }
  var Ctor = hasOwnProperty$1.call(proto, 'constructor') && proto.constructor;
  return typeof Ctor == 'function' && Ctor instanceof Ctor &&
    funcToString.call(Ctor) == objectCtorString;
}

/**
 * The base implementation of `_.slice` without an iteratee call guard.
 *
 * @private
 * @param {Array} array The array to slice.
 * @param {number} [start=0] The start position.
 * @param {number} [end=array.length] The end position.
 * @returns {Array} Returns the slice of `array`.
 */
function baseSlice(array, start, end) {
  var index = -1,
      length = array.length;

  if (start < 0) {
    start = -start > length ? 0 : (length + start);
  }
  end = end > length ? length : end;
  if (end < 0) {
    end += length;
  }
  length = start > end ? 0 : ((end - start) >>> 0);
  start >>>= 0;

  var result = Array(length);
  while (++index < length) {
    result[index] = array[index + start];
  }
  return result;
}

/**
 * Removes all key-value entries from the stack.
 *
 * @private
 * @name clear
 * @memberOf Stack
 */
function stackClear() {
  this.__data__ = new ListCache;
  this.size = 0;
}

/**
 * Removes `key` and its value from the stack.
 *
 * @private
 * @name delete
 * @memberOf Stack
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function stackDelete(key) {
  var data = this.__data__,
      result = data['delete'](key);

  this.size = data.size;
  return result;
}

/**
 * Gets the stack value for `key`.
 *
 * @private
 * @name get
 * @memberOf Stack
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function stackGet(key) {
  return this.__data__.get(key);
}

/**
 * Checks if a stack value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Stack
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function stackHas(key) {
  return this.__data__.has(key);
}

/** Used as the size to enable large array optimizations. */
var LARGE_ARRAY_SIZE = 200;

/**
 * Sets the stack `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Stack
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the stack cache instance.
 */
function stackSet(key, value) {
  var data = this.__data__;
  if (data instanceof ListCache) {
    var pairs = data.__data__;
    if (!Map$2 || (pairs.length < LARGE_ARRAY_SIZE - 1)) {
      pairs.push([key, value]);
      this.size = ++data.size;
      return this;
    }
    data = this.__data__ = new MapCache(pairs);
  }
  data.set(key, value);
  this.size = data.size;
  return this;
}

/**
 * Creates a stack cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Stack(entries) {
  var data = this.__data__ = new ListCache(entries);
  this.size = data.size;
}

// Add methods to `Stack`.
Stack.prototype.clear = stackClear;
Stack.prototype['delete'] = stackDelete;
Stack.prototype.get = stackGet;
Stack.prototype.has = stackHas;
Stack.prototype.set = stackSet;

/**
 * The base implementation of `_.assign` without support for multiple sources
 * or `customizer` functions.
 *
 * @private
 * @param {Object} object The destination object.
 * @param {Object} source The source object.
 * @returns {Object} Returns `object`.
 */
function baseAssign(object, source) {
  return object && copyObject(source, keys(source), object);
}

/**
 * The base implementation of `_.assignIn` without support for multiple sources
 * or `customizer` functions.
 *
 * @private
 * @param {Object} object The destination object.
 * @param {Object} source The source object.
 * @returns {Object} Returns `object`.
 */
function baseAssignIn(object, source) {
  return object && copyObject(source, keysIn(source), object);
}

/** Detect free variable `exports`. */
var freeExports = typeof exports == 'object' && exports && !exports.nodeType && exports;

/** Detect free variable `module`. */
var freeModule = freeExports && typeof module == 'object' && module && !module.nodeType && module;

/** Detect the popular CommonJS extension `module.exports`. */
var moduleExports = freeModule && freeModule.exports === freeExports;

/** Built-in value references. */
var Buffer = moduleExports ? root$1.Buffer : undefined,
    allocUnsafe = Buffer ? Buffer.allocUnsafe : undefined;

/**
 * Creates a clone of  `buffer`.
 *
 * @private
 * @param {Buffer} buffer The buffer to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Buffer} Returns the cloned buffer.
 */
function cloneBuffer(buffer, isDeep) {
  if (isDeep) {
    return buffer.slice();
  }
  var length = buffer.length,
      result = allocUnsafe ? allocUnsafe(length) : new buffer.constructor(length);

  buffer.copy(result);
  return result;
}

/**
 * A specialized version of `_.filter` for arrays without support for
 * iteratee shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {Array} Returns the new filtered array.
 */
function arrayFilter(array, predicate) {
  var index = -1,
      length = array == null ? 0 : array.length,
      resIndex = 0,
      result = [];

  while (++index < length) {
    var value = array[index];
    if (predicate(value, index, array)) {
      result[resIndex++] = value;
    }
  }
  return result;
}

/**
 * This method returns a new empty array.
 *
 * @static
 * @memberOf _
 * @since 4.13.0
 * @category Util
 * @returns {Array} Returns the new empty array.
 * @example
 *
 * var arrays = _.times(2, _.stubArray);
 *
 * console.log(arrays);
 * // => [[], []]
 *
 * console.log(arrays[0] === arrays[1]);
 * // => false
 */
function stubArray() {
  return [];
}

/** Used for built-in method references. */
var objectProto$1 = Object.prototype;

/** Built-in value references. */
var propertyIsEnumerable = objectProto$1.propertyIsEnumerable;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeGetSymbols$1 = Object.getOwnPropertySymbols;

/**
 * Creates an array of the own enumerable symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of symbols.
 */
var getSymbols = !nativeGetSymbols$1 ? stubArray : function(object) {
  if (object == null) {
    return [];
  }
  object = Object(object);
  return arrayFilter(nativeGetSymbols$1(object), function(symbol) {
    return propertyIsEnumerable.call(object, symbol);
  });
};

var getSymbols$1 = getSymbols;

/**
 * Copies own symbols of `source` to `object`.
 *
 * @private
 * @param {Object} source The object to copy symbols from.
 * @param {Object} [object={}] The object to copy symbols to.
 * @returns {Object} Returns `object`.
 */
function copySymbols(source, object) {
  return copyObject(source, getSymbols$1(source), object);
}

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeGetSymbols = Object.getOwnPropertySymbols;

/**
 * Creates an array of the own and inherited enumerable symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of symbols.
 */
var getSymbolsIn = !nativeGetSymbols ? stubArray : function(object) {
  var result = [];
  while (object) {
    arrayPush(result, getSymbols$1(object));
    object = getPrototype$1(object);
  }
  return result;
};

var getSymbolsIn$1 = getSymbolsIn;

/**
 * Copies own and inherited symbols of `source` to `object`.
 *
 * @private
 * @param {Object} source The object to copy symbols from.
 * @param {Object} [object={}] The object to copy symbols to.
 * @returns {Object} Returns `object`.
 */
function copySymbolsIn(source, object) {
  return copyObject(source, getSymbolsIn$1(source), object);
}

/**
 * The base implementation of `getAllKeys` and `getAllKeysIn` which uses
 * `keysFunc` and `symbolsFunc` to get the enumerable property names and
 * symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Function} keysFunc The function to get the keys of `object`.
 * @param {Function} symbolsFunc The function to get the symbols of `object`.
 * @returns {Array} Returns the array of property names and symbols.
 */
function baseGetAllKeys(object, keysFunc, symbolsFunc) {
  var result = keysFunc(object);
  return isArray$1(object) ? result : arrayPush(result, symbolsFunc(object));
}

/**
 * Creates an array of own enumerable property names and symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names and symbols.
 */
function getAllKeys(object) {
  return baseGetAllKeys(object, keys, getSymbols$1);
}

/**
 * Creates an array of own and inherited enumerable property names and
 * symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names and symbols.
 */
function getAllKeysIn(object) {
  return baseGetAllKeys(object, keysIn, getSymbolsIn$1);
}

/* Built-in method references that are verified to be native. */
var DataView = getNative(root$1, 'DataView');

var DataView$1 = DataView;

/* Built-in method references that are verified to be native. */
var Promise$1 = getNative(root$1, 'Promise');

var Promise$2 = Promise$1;

/* Built-in method references that are verified to be native. */
var Set$1 = getNative(root$1, 'Set');

var Set$2 = Set$1;

/** `Object#toString` result references. */
var mapTag$3 = '[object Map]',
    objectTag$1 = '[object Object]',
    promiseTag = '[object Promise]',
    setTag$3 = '[object Set]',
    weakMapTag$1 = '[object WeakMap]';

var dataViewTag$2 = '[object DataView]';

/** Used to detect maps, sets, and weakmaps. */
var dataViewCtorString = toSource(DataView$1),
    mapCtorString = toSource(Map$2),
    promiseCtorString = toSource(Promise$2),
    setCtorString = toSource(Set$2),
    weakMapCtorString = toSource(WeakMap$2);

/**
 * Gets the `toStringTag` of `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
var getTag = baseGetTag;

// Fallback for data views, maps, sets, and weak maps in IE 11 and promises in Node.js < 6.
if ((DataView$1 && getTag(new DataView$1(new ArrayBuffer(1))) != dataViewTag$2) ||
    (Map$2 && getTag(new Map$2) != mapTag$3) ||
    (Promise$2 && getTag(Promise$2.resolve()) != promiseTag) ||
    (Set$2 && getTag(new Set$2) != setTag$3) ||
    (WeakMap$2 && getTag(new WeakMap$2) != weakMapTag$1)) {
  getTag = function(value) {
    var result = baseGetTag(value),
        Ctor = result == objectTag$1 ? value.constructor : undefined,
        ctorString = Ctor ? toSource(Ctor) : '';

    if (ctorString) {
      switch (ctorString) {
        case dataViewCtorString: return dataViewTag$2;
        case mapCtorString: return mapTag$3;
        case promiseCtorString: return promiseTag;
        case setCtorString: return setTag$3;
        case weakMapCtorString: return weakMapTag$1;
      }
    }
    return result;
  };
}

var getTag$1 = getTag;

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Initializes an array clone.
 *
 * @private
 * @param {Array} array The array to clone.
 * @returns {Array} Returns the initialized clone.
 */
function initCloneArray(array) {
  var length = array.length,
      result = new array.constructor(length);

  // Add properties assigned by `RegExp#exec`.
  if (length && typeof array[0] == 'string' && hasOwnProperty.call(array, 'index')) {
    result.index = array.index;
    result.input = array.input;
  }
  return result;
}

/** Built-in value references. */
var Uint8Array = root$1.Uint8Array;

var Uint8Array$1 = Uint8Array;

/**
 * Creates a clone of `arrayBuffer`.
 *
 * @private
 * @param {ArrayBuffer} arrayBuffer The array buffer to clone.
 * @returns {ArrayBuffer} Returns the cloned array buffer.
 */
function cloneArrayBuffer(arrayBuffer) {
  var result = new arrayBuffer.constructor(arrayBuffer.byteLength);
  new Uint8Array$1(result).set(new Uint8Array$1(arrayBuffer));
  return result;
}

/**
 * Creates a clone of `dataView`.
 *
 * @private
 * @param {Object} dataView The data view to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Object} Returns the cloned data view.
 */
function cloneDataView(dataView, isDeep) {
  var buffer = isDeep ? cloneArrayBuffer(dataView.buffer) : dataView.buffer;
  return new dataView.constructor(buffer, dataView.byteOffset, dataView.byteLength);
}

/** Used to match `RegExp` flags from their coerced string values. */
var reFlags = /\w*$/;

/**
 * Creates a clone of `regexp`.
 *
 * @private
 * @param {Object} regexp The regexp to clone.
 * @returns {Object} Returns the cloned regexp.
 */
function cloneRegExp(regexp) {
  var result = new regexp.constructor(regexp.source, reFlags.exec(regexp));
  result.lastIndex = regexp.lastIndex;
  return result;
}

/** Used to convert symbols to primitives and strings. */
var symbolProto = Symbol$2 ? Symbol$2.prototype : undefined,
    symbolValueOf = symbolProto ? symbolProto.valueOf : undefined;

/**
 * Creates a clone of the `symbol` object.
 *
 * @private
 * @param {Object} symbol The symbol object to clone.
 * @returns {Object} Returns the cloned symbol object.
 */
function cloneSymbol(symbol) {
  return symbolValueOf ? Object(symbolValueOf.call(symbol)) : {};
}

/**
 * Creates a clone of `typedArray`.
 *
 * @private
 * @param {Object} typedArray The typed array to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Object} Returns the cloned typed array.
 */
function cloneTypedArray(typedArray, isDeep) {
  var buffer = isDeep ? cloneArrayBuffer(typedArray.buffer) : typedArray.buffer;
  return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);
}

/** `Object#toString` result references. */
var boolTag$1 = '[object Boolean]',
    dateTag$1 = '[object Date]',
    mapTag$2 = '[object Map]',
    numberTag$1 = '[object Number]',
    regexpTag$1 = '[object RegExp]',
    setTag$2 = '[object Set]',
    stringTag$1 = '[object String]',
    symbolTag$1 = '[object Symbol]';

var arrayBufferTag$1 = '[object ArrayBuffer]',
    dataViewTag$1 = '[object DataView]',
    float32Tag$1 = '[object Float32Array]',
    float64Tag$1 = '[object Float64Array]',
    int8Tag$1 = '[object Int8Array]',
    int16Tag$1 = '[object Int16Array]',
    int32Tag$1 = '[object Int32Array]',
    uint8Tag$1 = '[object Uint8Array]',
    uint8ClampedTag$1 = '[object Uint8ClampedArray]',
    uint16Tag$1 = '[object Uint16Array]',
    uint32Tag$1 = '[object Uint32Array]';

/**
 * Initializes an object clone based on its `toStringTag`.
 *
 * **Note:** This function only supports cloning values with tags of
 * `Boolean`, `Date`, `Error`, `Map`, `Number`, `RegExp`, `Set`, or `String`.
 *
 * @private
 * @param {Object} object The object to clone.
 * @param {string} tag The `toStringTag` of the object to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Object} Returns the initialized clone.
 */
function initCloneByTag(object, tag, isDeep) {
  var Ctor = object.constructor;
  switch (tag) {
    case arrayBufferTag$1:
      return cloneArrayBuffer(object);

    case boolTag$1:
    case dateTag$1:
      return new Ctor(+object);

    case dataViewTag$1:
      return cloneDataView(object, isDeep);

    case float32Tag$1: case float64Tag$1:
    case int8Tag$1: case int16Tag$1: case int32Tag$1:
    case uint8Tag$1: case uint8ClampedTag$1: case uint16Tag$1: case uint32Tag$1:
      return cloneTypedArray(object, isDeep);

    case mapTag$2:
      return new Ctor;

    case numberTag$1:
    case stringTag$1:
      return new Ctor(object);

    case regexpTag$1:
      return cloneRegExp(object);

    case setTag$2:
      return new Ctor;

    case symbolTag$1:
      return cloneSymbol(object);
  }
}

/**
 * Initializes an object clone.
 *
 * @private
 * @param {Object} object The object to clone.
 * @returns {Object} Returns the initialized clone.
 */
function initCloneObject(object) {
  return (typeof object.constructor == 'function' && !isPrototype(object))
    ? baseCreate$1(getPrototype$1(object))
    : {};
}

/** `Object#toString` result references. */
var mapTag$1 = '[object Map]';

/**
 * The base implementation of `_.isMap` without Node.js optimizations.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a map, else `false`.
 */
function baseIsMap(value) {
  return isObjectLike(value) && getTag$1(value) == mapTag$1;
}

/* Node.js helper references. */
var nodeIsMap = nodeUtil$1 && nodeUtil$1.isMap;

/**
 * Checks if `value` is classified as a `Map` object.
 *
 * @static
 * @memberOf _
 * @since 4.3.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a map, else `false`.
 * @example
 *
 * _.isMap(new Map);
 * // => true
 *
 * _.isMap(new WeakMap);
 * // => false
 */
var isMap = nodeIsMap ? baseUnary(nodeIsMap) : baseIsMap;

var isMap$1 = isMap;

/** `Object#toString` result references. */
var setTag$1 = '[object Set]';

/**
 * The base implementation of `_.isSet` without Node.js optimizations.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a set, else `false`.
 */
function baseIsSet(value) {
  return isObjectLike(value) && getTag$1(value) == setTag$1;
}

/* Node.js helper references. */
var nodeIsSet = nodeUtil$1 && nodeUtil$1.isSet;

/**
 * Checks if `value` is classified as a `Set` object.
 *
 * @static
 * @memberOf _
 * @since 4.3.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a set, else `false`.
 * @example
 *
 * _.isSet(new Set);
 * // => true
 *
 * _.isSet(new WeakSet);
 * // => false
 */
var isSet = nodeIsSet ? baseUnary(nodeIsSet) : baseIsSet;

var isSet$1 = isSet;

/** Used to compose bitmasks for cloning. */
var CLONE_DEEP_FLAG$2 = 1,
    CLONE_FLAT_FLAG$1 = 2,
    CLONE_SYMBOLS_FLAG$2 = 4;

/** `Object#toString` result references. */
var argsTag = '[object Arguments]',
    arrayTag = '[object Array]',
    boolTag = '[object Boolean]',
    dateTag = '[object Date]',
    errorTag = '[object Error]',
    funcTag = '[object Function]',
    genTag = '[object GeneratorFunction]',
    mapTag = '[object Map]',
    numberTag = '[object Number]',
    objectTag = '[object Object]',
    regexpTag = '[object RegExp]',
    setTag = '[object Set]',
    stringTag = '[object String]',
    symbolTag = '[object Symbol]',
    weakMapTag = '[object WeakMap]';

var arrayBufferTag = '[object ArrayBuffer]',
    dataViewTag = '[object DataView]',
    float32Tag = '[object Float32Array]',
    float64Tag = '[object Float64Array]',
    int8Tag = '[object Int8Array]',
    int16Tag = '[object Int16Array]',
    int32Tag = '[object Int32Array]',
    uint8Tag = '[object Uint8Array]',
    uint8ClampedTag = '[object Uint8ClampedArray]',
    uint16Tag = '[object Uint16Array]',
    uint32Tag = '[object Uint32Array]';

/** Used to identify `toStringTag` values supported by `_.clone`. */
var cloneableTags = {};
cloneableTags[argsTag] = cloneableTags[arrayTag] =
cloneableTags[arrayBufferTag] = cloneableTags[dataViewTag] =
cloneableTags[boolTag] = cloneableTags[dateTag] =
cloneableTags[float32Tag] = cloneableTags[float64Tag] =
cloneableTags[int8Tag] = cloneableTags[int16Tag] =
cloneableTags[int32Tag] = cloneableTags[mapTag] =
cloneableTags[numberTag] = cloneableTags[objectTag] =
cloneableTags[regexpTag] = cloneableTags[setTag] =
cloneableTags[stringTag] = cloneableTags[symbolTag] =
cloneableTags[uint8Tag] = cloneableTags[uint8ClampedTag] =
cloneableTags[uint16Tag] = cloneableTags[uint32Tag] = true;
cloneableTags[errorTag] = cloneableTags[funcTag] =
cloneableTags[weakMapTag] = false;

/**
 * The base implementation of `_.clone` and `_.cloneDeep` which tracks
 * traversed objects.
 *
 * @private
 * @param {*} value The value to clone.
 * @param {boolean} bitmask The bitmask flags.
 *  1 - Deep clone
 *  2 - Flatten inherited properties
 *  4 - Clone symbols
 * @param {Function} [customizer] The function to customize cloning.
 * @param {string} [key] The key of `value`.
 * @param {Object} [object] The parent object of `value`.
 * @param {Object} [stack] Tracks traversed objects and their clone counterparts.
 * @returns {*} Returns the cloned value.
 */
function baseClone(value, bitmask, customizer, key, object, stack) {
  var result,
      isDeep = bitmask & CLONE_DEEP_FLAG$2,
      isFlat = bitmask & CLONE_FLAT_FLAG$1,
      isFull = bitmask & CLONE_SYMBOLS_FLAG$2;

  if (customizer) {
    result = object ? customizer(value, key, object, stack) : customizer(value);
  }
  if (result !== undefined) {
    return result;
  }
  if (!isObject(value)) {
    return value;
  }
  var isArr = isArray$1(value);
  if (isArr) {
    result = initCloneArray(value);
    if (!isDeep) {
      return copyArray(value, result);
    }
  } else {
    var tag = getTag$1(value),
        isFunc = tag == funcTag || tag == genTag;

    if (isBuffer$1(value)) {
      return cloneBuffer(value, isDeep);
    }
    if (tag == objectTag || tag == argsTag || (isFunc && !object)) {
      result = (isFlat || isFunc) ? {} : initCloneObject(value);
      if (!isDeep) {
        return isFlat
          ? copySymbolsIn(value, baseAssignIn(result, value))
          : copySymbols(value, baseAssign(result, value));
      }
    } else {
      if (!cloneableTags[tag]) {
        return object ? value : {};
      }
      result = initCloneByTag(value, tag, isDeep);
    }
  }
  // Check for circular references and return its corresponding clone.
  stack || (stack = new Stack);
  var stacked = stack.get(value);
  if (stacked) {
    return stacked;
  }
  stack.set(value, result);

  if (isSet$1(value)) {
    value.forEach(function(subValue) {
      result.add(baseClone(subValue, bitmask, customizer, subValue, value, stack));
    });
  } else if (isMap$1(value)) {
    value.forEach(function(subValue, key) {
      result.set(key, baseClone(subValue, bitmask, customizer, key, value, stack));
    });
  }

  var keysFunc = isFull
    ? (isFlat ? getAllKeysIn : getAllKeys)
    : (isFlat ? keysIn : keys);

  var props = isArr ? undefined : keysFunc(value);
  arrayEach(props || value, function(subValue, key) {
    if (props) {
      key = subValue;
      subValue = value[key];
    }
    // Recursively populate clone (susceptible to call stack limits).
    assignValue(result, key, baseClone(subValue, bitmask, customizer, key, value, stack));
  });
  return result;
}

/** Used to compose bitmasks for cloning. */
var CLONE_DEEP_FLAG$1 = 1,
    CLONE_SYMBOLS_FLAG$1 = 4;

/**
 * This method is like `_.clone` except that it recursively clones `value`.
 *
 * @static
 * @memberOf _
 * @since 1.0.0
 * @category Lang
 * @param {*} value The value to recursively clone.
 * @returns {*} Returns the deep cloned value.
 * @see _.clone
 * @example
 *
 * var objects = [{ 'a': 1 }, { 'b': 2 }];
 *
 * var deep = _.cloneDeep(objects);
 * console.log(deep[0] === objects[0]);
 * // => false
 */
function cloneDeep(value) {
  return baseClone(value, CLONE_DEEP_FLAG$1 | CLONE_SYMBOLS_FLAG$1);
}

/**
 * Gets the last element of `array`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Array
 * @param {Array} array The array to query.
 * @returns {*} Returns the last element of `array`.
 * @example
 *
 * _.last([1, 2, 3]);
 * // => 3
 */
function last(array) {
  var length = array == null ? 0 : array.length;
  return length ? array[length - 1] : undefined;
}

/**
 * Gets the parent value at `path` of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Array} path The path to get the parent value of.
 * @returns {*} Returns the parent value.
 */
function parent(object, path) {
  return path.length < 2 ? object : baseGet(object, baseSlice(path, 0, -1));
}

/**
 * The base implementation of `_.unset`.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {Array|string} path The property path to unset.
 * @returns {boolean} Returns `true` if the property is deleted, else `false`.
 */
function baseUnset(object, path) {
  path = castPath(path, object);
  object = parent(object, path);
  return object == null || delete object[toKey(last(path))];
}

/**
 * Used by `_.omit` to customize its `_.cloneDeep` use to only clone plain
 * objects.
 *
 * @private
 * @param {*} value The value to inspect.
 * @param {string} key The key of the property to inspect.
 * @returns {*} Returns the uncloned value or `undefined` to defer cloning to `_.cloneDeep`.
 */
function customOmitClone(value) {
  return isPlainObject(value) ? undefined : value;
}

/** Used to compose bitmasks for cloning. */
var CLONE_DEEP_FLAG = 1,
    CLONE_FLAT_FLAG = 2,
    CLONE_SYMBOLS_FLAG = 4;

/**
 * The opposite of `_.pick`; this method creates an object composed of the
 * own and inherited enumerable property paths of `object` that are not omitted.
 *
 * **Note:** This method is considerably slower than `_.pick`.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Object
 * @param {Object} object The source object.
 * @param {...(string|string[])} [paths] The property paths to omit.
 * @returns {Object} Returns the new object.
 * @example
 *
 * var object = { 'a': 1, 'b': '2', 'c': 3 };
 *
 * _.omit(object, ['a', 'c']);
 * // => { 'b': '2' }
 */
var omit = flatRest(function(object, paths) {
  var result = {};
  if (object == null) {
    return result;
  }
  var isDeep = false;
  paths = arrayMap(paths, function(path) {
    path = castPath(path, object);
    isDeep || (isDeep = path.length > 1);
    return path;
  });
  copyObject(object, getAllKeysIn(object), result);
  if (isDeep) {
    result = baseClone(result, CLONE_DEEP_FLAG | CLONE_FLAT_FLAG | CLONE_SYMBOLS_FLAG, customOmitClone);
  }
  var length = paths.length;
  while (length--) {
    baseUnset(result, paths[length]);
  }
  return result;
});

var omit$1 = omit;

/**
 *
 * @param vNodes flatten target
 * @param identificationKey filter key
 * @param mode When mode is true, every elements in vNodes which iKey === identificationKey will be filtered
 * @param result
 * @returns
 */
function flatten$1(vNodes, identificationKey, mode = false, result = [], isInfinity = false) {
    if (!vNodes)
        return result;
    const auth = (key) => {
        return key ? (Array.isArray(identificationKey) ? (mode ? !identificationKey.includes(key) : identificationKey.includes(key)) : mode ? key !== identificationKey : key === identificationKey) : false;
    };
    const filterVNodes = identificationKey
        ? vNodes.filter(vNode => {
            const { iKey } = vNode.type;
            return auth(iKey) || vNode.type === Fragment || isInfinity;
        })
        : vNodes;
    for (const vNode of filterVNodes) {
        const children = ((isInfinity ? vNode.children?.default?.() : vNode.children) ?? []);
        const { iKey } = vNode.type;
        if (isInfinity && auth(iKey)) {
            result.push(vNode);
        }
        else if (vNode.type === Fragment || (isInfinity && children.length > 0)) {
            flatten$1(children, identificationKey, mode, result, isInfinity);
        }
        else if (vNode.type !== Comment) {
            result.push(vNode);
        }
    }
    return result;
}
function flattenWithOptions(options, mode = false, result = []) {
    const { slots, name, key, infinity } = options;
    if (!slots?.[name || 'default'])
        return result;
    return flatten$1(slots[name || 'default']?.(), key, mode, result, !!infinity);
}
function flattenTree(tree, key, result = []) {
    tree.forEach(item => {
        result.push(omit$1(item, key));
        if (item[key]) {
            flattenTree(item[key], key, result);
        }
    });
    return result;
}

function getSlotFirstVNode(slots, identificationKey, flattenedData = false) {
    const flattened = slots ? flatten$1(slots(), identificationKey) : null;
    const firstVNode = flattened?.[0] ?? null;
    if (!flattenedData)
        return firstVNode;
    return [firstVNode, flattened];
}
function getSlotVNodeIndex(slots, key) {
    if (!key)
        return -1;
    return slots?.().findIndex(slot => slot.type.iKey === key) ?? -1;
}

function propsMergeSlots(props, slots, name, stringRenderer, vnodeRenderer) {
    const propValue = props[name];
    const renderProp = propValue ? (typeof propValue === 'string' ? (stringRenderer ? stringRenderer(propValue) : createTextVNode(propValue)) : vnodeRenderer ? vnodeRenderer(propValue()) : propValue()) : null;
    const kebabKey = camelToKebab(name);
    return slots[name] || slots[kebabKey] ? renderSlot(slots, camelToKebab(name)) : renderProp;
}

function and(...args) {
  return computed(() => args.every((i) => unref(i)));
}

function createEventHook() {
  const fns = [];
  const off = (fn) => {
    const index = fns.indexOf(fn);
    if (index !== -1)
      fns.splice(index, 1);
  };
  const on = (fn) => {
    fns.push(fn);
    return {
      off: () => off(fn)
    };
  };
  const trigger = (param) => {
    fns.forEach((fn) => fn(param));
  };
  return {
    on,
    off,
    trigger
  };
}

function createGlobalState(stateFactory) {
  let initialized = false;
  let state;
  const scope = effectScope(true);
  return () => {
    if (!initialized) {
      state = scope.run(stateFactory);
      initialized = true;
    }
    return state;
  };
}

function tryOnScopeDispose(fn) {
  if (getCurrentScope()) {
    onScopeDispose(fn);
    return true;
  }
  return false;
}

const isClient = typeof window !== "undefined";
const isString = (val) => typeof val === "string";
const noop = () => {
};

function createFilterWrapper(filter, fn) {
  function wrapper(...args) {
    filter(() => fn.apply(this, args), { fn, thisArg: this, args });
  }
  return wrapper;
}
const bypassFilter = (invoke) => {
  return invoke();
};
function throttleFilter(ms, trailing = true, leading = true) {
  let lastExec = 0;
  let timer;
  let preventLeading = !leading;
  const clear = () => {
    if (timer) {
      clearTimeout(timer);
      timer = void 0;
    }
  };
  const filter = (invoke) => {
    const duration = unref(ms);
    const elapsed = Date.now() - lastExec;
    clear();
    if (duration <= 0) {
      lastExec = Date.now();
      return invoke();
    }
    if (elapsed > duration) {
      lastExec = Date.now();
      if (preventLeading)
        preventLeading = false;
      else
        invoke();
    }
    if (trailing) {
      timer = setTimeout(() => {
        lastExec = Date.now();
        if (!leading)
          preventLeading = true;
        clear();
        invoke();
      }, duration);
    }
    if (!leading && !timer)
      timer = setTimeout(() => preventLeading = true, duration);
  };
  return filter;
}
function pausableFilter(extendFilter = bypassFilter) {
  const isActive = ref(true);
  function pause() {
    isActive.value = false;
  }
  function resume() {
    isActive.value = true;
  }
  const eventFilter = (...args) => {
    if (isActive.value)
      extendFilter(...args);
  };
  return { isActive, pause, resume, eventFilter };
}

var __getOwnPropSymbols$a = Object.getOwnPropertySymbols;
var __hasOwnProp$a = Object.prototype.hasOwnProperty;
var __propIsEnum$a = Object.prototype.propertyIsEnumerable;
var __objRest$5 = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp$a.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols$a)
    for (var prop of __getOwnPropSymbols$a(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum$a.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
function watchWithFilter(source, cb, options = {}) {
  const _a = options, {
    eventFilter = bypassFilter
  } = _a, watchOptions = __objRest$5(_a, [
    "eventFilter"
  ]);
  return watch(source, createFilterWrapper(eventFilter, cb), watchOptions);
}

function isDefined(v) {
  return unref(v) != null;
}

function not(v) {
  return computed(() => !unref(v));
}

function or(...args) {
  return computed(() => args.some((i) => unref(i)));
}

var __defProp$4 = Object.defineProperty;
var __defProps$2 = Object.defineProperties;
var __getOwnPropDescs$2 = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols$5 = Object.getOwnPropertySymbols;
var __hasOwnProp$5 = Object.prototype.hasOwnProperty;
var __propIsEnum$5 = Object.prototype.propertyIsEnumerable;
var __defNormalProp$4 = (obj, key, value) => key in obj ? __defProp$4(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues$4 = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp$5.call(b, prop))
      __defNormalProp$4(a, prop, b[prop]);
  if (__getOwnPropSymbols$5)
    for (var prop of __getOwnPropSymbols$5(b)) {
      if (__propIsEnum$5.call(b, prop))
        __defNormalProp$4(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps$2 = (a, b) => __defProps$2(a, __getOwnPropDescs$2(b));
var __objRest$2$1 = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp$5.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols$5)
    for (var prop of __getOwnPropSymbols$5(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum$5.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
function pausableWatch(source, cb, options = {}) {
  const _a = options, {
    eventFilter: filter
  } = _a, watchOptions = __objRest$2$1(_a, [
    "eventFilter"
  ]);
  const { eventFilter, pause, resume, isActive } = pausableFilter(filter);
  const stop = watchWithFilter(source, cb, __spreadProps$2(__spreadValues$4({}, watchOptions), {
    eventFilter
  }));
  return { stop, pause, resume, isActive };
}

function reactivePick(obj, ...keys) {
  return reactive(Object.fromEntries(keys.map((k) => [k, toRef(obj, k)])));
}

function useThrottleFn(fn, ms = 200, trailing = true, leading = true) {
  return createFilterWrapper(throttleFilter(ms, trailing, leading), fn);
}

var __defProp$3$1 = Object.defineProperty;
var __defProps$1 = Object.defineProperties;
var __getOwnPropDescs$1 = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols$4 = Object.getOwnPropertySymbols;
var __hasOwnProp$4 = Object.prototype.hasOwnProperty;
var __propIsEnum$4 = Object.prototype.propertyIsEnumerable;
var __defNormalProp$3$1 = (obj, key, value) => key in obj ? __defProp$3$1(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues$3$1 = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp$4.call(b, prop))
      __defNormalProp$3$1(a, prop, b[prop]);
  if (__getOwnPropSymbols$4)
    for (var prop of __getOwnPropSymbols$4(b)) {
      if (__propIsEnum$4.call(b, prop))
        __defNormalProp$3$1(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps$1 = (a, b) => __defProps$1(a, __getOwnPropDescs$1(b));
var __objRest$1 = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp$4.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols$4)
    for (var prop of __getOwnPropSymbols$4(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum$4.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
function throttledWatch(source, cb, options = {}) {
  const _a = options, {
    throttle = 0,
    trailing = true,
    leading = true
  } = _a, watchOptions = __objRest$1(_a, [
    "throttle",
    "trailing",
    "leading"
  ]);
  return watchWithFilter(source, cb, __spreadProps$1(__spreadValues$3$1({}, watchOptions), {
    eventFilter: throttleFilter(throttle, trailing, leading)
  }));
}

function tryOnMounted(fn, sync = true) {
  if (getCurrentInstance())
    onMounted(fn);
  else if (sync)
    fn();
  else
    nextTick(fn);
}

function watchOnce(source, cb, options) {
  const stop = watch(source, (...args) => {
    nextTick(() => stop());
    return cb(...args);
  }, options);
}

function unrefElement(elRef) {
  var _a;
  const plain = unref(elRef);
  return (_a = plain == null ? void 0 : plain.$el) != null ? _a : plain;
}

const defaultWindow = isClient ? window : void 0;

function useEventListener(...args) {
  let target;
  let event;
  let listener;
  let options;
  if (isString(args[0])) {
    [event, listener, options] = args;
    target = defaultWindow;
  } else {
    [target, event, listener, options] = args;
  }
  if (!target)
    return noop;
  let cleanup = noop;
  const stopWatch = watch(() => unref(target), (el) => {
    cleanup();
    if (!el)
      return;
    el.addEventListener(event, listener, options);
    cleanup = () => {
      el.removeEventListener(event, listener, options);
      cleanup = noop;
    };
  }, { immediate: true, flush: "post" });
  const stop = () => {
    stopWatch();
    cleanup();
  };
  tryOnScopeDispose(stop);
  return stop;
}

function onClickOutside(target, handler, options = {}) {
  const { window = defaultWindow, ignore } = options;
  if (!window)
    return;
  const shouldListen = ref(true);
  const listener = (event) => {
    const el = unrefElement(target);
    const composedPath = event.composedPath();
    if (!el || el === event.target || composedPath.includes(el) || !shouldListen.value)
      return;
    if (ignore && ignore.length > 0) {
      if (ignore.some((target2) => {
        const el2 = unrefElement(target2);
        return el2 && (event.target === el2 || composedPath.includes(el2));
      }))
        return;
    }
    handler(event);
  };
  const cleanup = [
    useEventListener(window, "click", listener, { passive: true, capture: true }),
    useEventListener(window, "pointerdown", (e) => {
      const el = unrefElement(target);
      shouldListen.value = !!el && !e.composedPath().includes(el);
    }, { passive: true })
  ];
  const stop = () => cleanup.forEach((fn) => fn());
  return stop;
}

function useMediaQuery(query, options = {}) {
  const { window = defaultWindow } = options;
  let mediaQuery;
  const matches = ref(false);
  const update = () => {
    if (!window)
      return;
    if (!mediaQuery)
      mediaQuery = window.matchMedia(query);
    matches.value = mediaQuery.matches;
  };
  tryOnMounted(() => {
    update();
    if (!mediaQuery)
      return;
    if ("addEventListener" in mediaQuery)
      mediaQuery.addEventListener("change", update);
    else
      mediaQuery.addListener(update);
    tryOnScopeDispose(() => {
      if ("removeEventListener" in update)
        mediaQuery.removeEventListener("change", update);
      else
        mediaQuery.removeListener(update);
    });
  });
  return matches;
}

const _global = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
const globalKey = "__vueuse_ssr_handlers__";
_global[globalKey] = _global[globalKey] || {};
const handlers = _global[globalKey];
function getSSRHandler(key, fallback) {
  return handlers[key] || fallback;
}

function guessSerializerType(rawInit) {
  return rawInit == null ? "any" : rawInit instanceof Set ? "set" : rawInit instanceof Map ? "map" : typeof rawInit === "boolean" ? "boolean" : typeof rawInit === "string" ? "string" : typeof rawInit === "object" ? "object" : Array.isArray(rawInit) ? "object" : !Number.isNaN(rawInit) ? "number" : "any";
}

const StorageSerializers = {
  boolean: {
    read: (v) => v === "true",
    write: (v) => String(v)
  },
  object: {
    read: (v) => JSON.parse(v),
    write: (v) => JSON.stringify(v)
  },
  number: {
    read: (v) => Number.parseFloat(v),
    write: (v) => String(v)
  },
  any: {
    read: (v) => v,
    write: (v) => String(v)
  },
  string: {
    read: (v) => v,
    write: (v) => String(v)
  },
  map: {
    read: (v) => new Map(JSON.parse(v)),
    write: (v) => JSON.stringify(Array.from(v.entries()))
  },
  set: {
    read: (v) => new Set(JSON.parse(v)),
    write: (v) => JSON.stringify(Array.from(v.entries()))
  }
};
function useStorage(key, initialValue, storage, options = {}) {
  var _a;
  const {
    flush = "pre",
    deep = true,
    listenToStorageChanges = true,
    writeDefaults = true,
    shallow,
    window = defaultWindow,
    eventFilter,
    onError = (e) => {
      console.error(e);
    }
  } = options;
  const rawInit = unref(initialValue);
  const type = guessSerializerType(rawInit);
  const data = (shallow ? shallowRef : ref)(initialValue);
  const serializer = (_a = options.serializer) != null ? _a : StorageSerializers[type];
  if (!storage) {
    try {
      storage = getSSRHandler("getDefaultStorage", () => {
        var _a2;
        return (_a2 = defaultWindow) == null ? void 0 : _a2.localStorage;
      })();
    } catch (e) {
      onError(e);
    }
  }
  function read(event) {
    if (!storage || event && event.key !== key)
      return;
    try {
      const rawValue = event ? event.newValue : storage.getItem(key);
      if (rawValue == null) {
        data.value = rawInit;
        if (writeDefaults && rawInit !== null)
          storage.setItem(key, serializer.write(rawInit));
      } else if (typeof rawValue !== "string") {
        data.value = rawValue;
      } else {
        data.value = serializer.read(rawValue);
      }
    } catch (e) {
      onError(e);
    }
  }
  read();
  if (window && listenToStorageChanges)
    useEventListener(window, "storage", (e) => setTimeout(() => read(e), 0));
  if (storage) {
    watchWithFilter(data, () => {
      try {
        if (data.value == null)
          storage.removeItem(key);
        else
          storage.setItem(key, serializer.write(data.value));
      } catch (e) {
        onError(e);
      }
    }, {
      flush,
      deep,
      eventFilter
    });
  }
  return data;
}

function usePreferredDark(options) {
  return useMediaQuery("(prefers-color-scheme: dark)", options);
}

var __getOwnPropSymbols$c = Object.getOwnPropertySymbols;
var __hasOwnProp$c = Object.prototype.hasOwnProperty;
var __propIsEnum$c = Object.prototype.propertyIsEnumerable;
var __objRest$2 = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp$c.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols$c)
    for (var prop of __getOwnPropSymbols$c(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum$c.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
function useResizeObserver(target, callback, options = {}) {
  const _a = options, { window = defaultWindow } = _a, observerOptions = __objRest$2(_a, ["window"]);
  let observer;
  const isSupported = window && "ResizeObserver" in window;
  const cleanup = () => {
    if (observer) {
      observer.disconnect();
      observer = void 0;
    }
  };
  const stopWatch = watch(() => unrefElement(target), (el) => {
    cleanup();
    if (isSupported && window && el) {
      observer = new window.ResizeObserver(callback);
      observer.observe(el, observerOptions);
    }
  }, { immediate: true, flush: "post" });
  const stop = () => {
    cleanup();
    stopWatch();
  };
  tryOnScopeDispose(stop);
  return {
    isSupported,
    stop
  };
}

function useElementBounding(target) {
  const height = ref(0);
  const bottom = ref(0);
  const left = ref(0);
  const right = ref(0);
  const top = ref(0);
  const width = ref(0);
  const x = ref(0);
  const y = ref(0);
  function update() {
    const el = unrefElement(target);
    if (!el) {
      height.value = 0;
      bottom.value = 0;
      left.value = 0;
      right.value = 0;
      top.value = 0;
      width.value = 0;
      x.value = 0;
      y.value = 0;
      return;
    }
    const rect = el.getBoundingClientRect();
    height.value = rect.height;
    bottom.value = rect.bottom;
    left.value = rect.left;
    right.value = rect.right;
    top.value = rect.top;
    width.value = rect.width;
    x.value = rect.x;
    y.value = rect.y;
  }
  useEventListener("scroll", update, true);
  useResizeObserver(target, update);
  watch(() => unrefElement(target), (ele) => !ele && update());
  return {
    height,
    bottom,
    left,
    right,
    top,
    width,
    x,
    y,
    update
  };
}

function useElementSize(target, initialSize = { width: 0, height: 0 }, options = {}) {
  const width = ref(initialSize.width);
  const height = ref(initialSize.height);
  useResizeObserver(target, ([entry]) => {
    width.value = entry.contentRect.width;
    height.value = entry.contentRect.height;
  }, options);
  watch(() => unrefElement(target), (ele) => {
    width.value = ele ? initialSize.width : 0;
    height.value = ele ? initialSize.height : 0;
  });
  return {
    width,
    height
  };
}

const events = /* @__PURE__ */ new Map();

function useEventBus(key) {
  const scope = getCurrentScope();
  function on(listener) {
    const listeners = events.get(key) || [];
    listeners.push(listener);
    events.set(key, listeners);
    const _off = () => off(listener);
    scope == null ? void 0 : scope.cleanups.push(_off);
    return _off;
  }
  function once(listener) {
    function _listener(...args) {
      off(_listener);
      listener(...args);
    }
    return on(_listener);
  }
  function off(listener) {
    const listeners = events.get(key);
    if (!listeners)
      return;
    const index = listeners.indexOf(listener);
    if (index > -1)
      listeners.splice(index, 1);
    if (!listeners.length)
      events.delete(key);
  }
  function reset() {
    events.delete(key);
  }
  function emit(event, payload) {
    var _a;
    (_a = events.get(key)) == null ? void 0 : _a.forEach((v) => v(event, payload));
  }
  return { on, once, off, emit, reset };
}

const DefaultMagicKeysAliasMap = {
  ctrl: "control",
  command: "meta",
  cmd: "meta",
  option: "alt",
  up: "arrowup",
  down: "arrowdown",
  left: "arrowleft",
  right: "arrowright"
};

function useMagicKeys(options = {}) {
  const {
    reactive: useReactive = false,
    target = defaultWindow,
    aliasMap = DefaultMagicKeysAliasMap,
    passive = true,
    onEventFired = noop
  } = options;
  const current = reactive(/* @__PURE__ */ new Set());
  const obj = { toJSON() {
    return {};
  }, current };
  const refs = useReactive ? reactive(obj) : obj;
  function updateRefs(e, value) {
    var _a, _b;
    const key = (_a = e.key) == null ? void 0 : _a.toLowerCase();
    const code = (_b = e.code) == null ? void 0 : _b.toLowerCase();
    const values = [code, key].filter(Boolean);
    if (code) {
      if (value)
        current.add(e.code);
      else
        current.delete(e.code);
    }
    for (const key2 of values) {
      if (key2 in refs) {
        if (useReactive)
          refs[key2] = value;
        else
          refs[key2].value = value;
      }
    }
  }
  if (target) {
    useEventListener(target, "keydown", (e) => {
      updateRefs(e, true);
      return onEventFired(e);
    }, { passive });
    useEventListener(target, "keyup", (e) => {
      updateRefs(e, false);
      return onEventFired(e);
    }, { passive });
  }
  const proxy = new Proxy(refs, {
    get(target2, prop, rec) {
      if (typeof prop !== "string")
        return Reflect.get(target2, prop, rec);
      prop = prop.toLowerCase();
      if (prop in aliasMap)
        prop = aliasMap[prop];
      if (!(prop in refs)) {
        if (/[+_-]/.test(prop)) {
          const keys = prop.split(/[+_-]/g).map((i) => i.trim());
          refs[prop] = computed(() => keys.every((key) => unref(proxy[key])));
        } else {
          refs[prop] = ref(false);
        }
      }
      const r = Reflect.get(target2, prop, rec);
      return useReactive ? unref(r) : r;
    }
  });
  return proxy;
}

function useMouse(options = {}) {
  const {
    type = "page",
    touch = true,
    resetOnTouchEnds = false,
    initialValue = { x: 0, y: 0 },
    window = defaultWindow,
    eventFilter
  } = options;
  const x = ref(initialValue.x);
  const y = ref(initialValue.y);
  const sourceType = ref(null);
  const mouseHandler = (event) => {
    if (type === "page") {
      x.value = event.pageX;
      y.value = event.pageY;
    } else if (type === "client") {
      x.value = event.clientX;
      y.value = event.clientY;
    }
    sourceType.value = "mouse";
  };
  const reset = () => {
    x.value = initialValue.x;
    y.value = initialValue.y;
  };
  const touchHandler = (event) => {
    if (event.touches.length > 0) {
      const touch2 = event.touches[0];
      if (type === "page") {
        x.value = touch2.pageX;
        y.value = touch2.pageY;
      } else if (type === "client") {
        x.value = touch2.clientX;
        y.value = touch2.clientY;
      }
      sourceType.value = "touch";
    }
  };
  const mouseHandlerWrapper = (event) => {
    return eventFilter === void 0 ? mouseHandler(event) : eventFilter(() => mouseHandler(event), {});
  };
  const touchHandlerWrapper = (event) => {
    return eventFilter === void 0 ? touchHandler(event) : eventFilter(() => touchHandler(event), {});
  };
  if (window) {
    useEventListener(window, "mousemove", mouseHandlerWrapper, { passive: true });
    useEventListener(window, "dragover", mouseHandlerWrapper, { passive: true });
    if (touch) {
      useEventListener(window, "touchstart", touchHandlerWrapper, { passive: true });
      useEventListener(window, "touchmove", touchHandlerWrapper, { passive: true });
      if (resetOnTouchEnds)
        useEventListener(window, "touchend", reset, { passive: true });
    }
  }
  return {
    x,
    y,
    sourceType
  };
}

function useMouseInElement(target, options = {}) {
  const {
    handleOutside = true,
    window = defaultWindow
  } = options;
  const { x, y, sourceType } = useMouse(options);
  const targetRef = ref(target != null ? target : window == null ? void 0 : window.document.body);
  const elementX = ref(0);
  const elementY = ref(0);
  const elementPositionX = ref(0);
  const elementPositionY = ref(0);
  const elementHeight = ref(0);
  const elementWidth = ref(0);
  const isOutside = ref(false);
  let stop = () => {
  };
  if (window) {
    stop = watch([targetRef, x, y], () => {
      const el = unrefElement(targetRef);
      if (!el)
        return;
      const {
        left,
        top,
        width,
        height
      } = el.getBoundingClientRect();
      elementPositionX.value = left + window.pageXOffset;
      elementPositionY.value = top + window.pageYOffset;
      elementHeight.value = height;
      elementWidth.value = width;
      const elX = x.value - elementPositionX.value;
      const elY = y.value - elementPositionY.value;
      isOutside.value = elX < 0 || elY < 0 || elX > elementWidth.value || elY > elementHeight.value;
      if (handleOutside || !isOutside.value) {
        elementX.value = elX;
        elementY.value = elY;
      }
    }, { immediate: true });
  }
  return {
    x,
    y,
    sourceType,
    elementX,
    elementY,
    elementPositionX,
    elementPositionY,
    elementHeight,
    elementWidth,
    isOutside,
    stop
  };
}

var _a, _b;
isClient && (window == null ? void 0 : window.navigator) && ((_a = window == null ? void 0 : window.navigator) == null ? void 0 : _a.platform) && /iP(ad|hone|od)/.test((_b = window == null ? void 0 : window.navigator) == null ? void 0 : _b.platform);

function useTemplateRefsList() {
  const refs = ref([]);
  refs.value.set = (el) => {
    if (el)
      refs.value.push(el);
  };
  onBeforeUpdate(() => {
    refs.value.length = 0;
  });
  return refs;
}

var __defProp$3 = Object.defineProperty;
var __getOwnPropSymbols$3 = Object.getOwnPropertySymbols;
var __hasOwnProp$3 = Object.prototype.hasOwnProperty;
var __propIsEnum$3 = Object.prototype.propertyIsEnumerable;
var __defNormalProp$3 = (obj, key, value) => key in obj ? __defProp$3(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues$3 = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp$3.call(b, prop))
      __defNormalProp$3(a, prop, b[prop]);
  if (__getOwnPropSymbols$3)
    for (var prop of __getOwnPropSymbols$3(b)) {
      if (__propIsEnum$3.call(b, prop))
        __defNormalProp$3(a, prop, b[prop]);
    }
  return a;
};
const initialRect = {
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
  height: 0,
  width: 0
};
__spreadValues$3({
  text: ""
}, initialRect);

function useVirtualList(list, options) {
  const containerRef = ref();
  const size = useElementSize(containerRef);
  const currentList = ref([]);
  const source = shallowRef(list);
  const state = ref({ start: 0, end: 10 });
  const { itemHeight, overscan = 5 } = options;
  const getViewCapacity = (containerHeight) => {
    if (typeof itemHeight === "number")
      return Math.ceil(containerHeight / itemHeight);
    const { start = 0 } = state.value;
    let sum = 0;
    let capacity = 0;
    for (let i = start; i < source.value.length; i++) {
      const height = itemHeight(i);
      sum += height;
      if (sum >= containerHeight) {
        capacity = i;
        break;
      }
    }
    return capacity - start;
  };
  const getOffset = (scrollTop) => {
    if (typeof itemHeight === "number")
      return Math.floor(scrollTop / itemHeight) + 1;
    let sum = 0;
    let offset = 0;
    for (let i = 0; i < source.value.length; i++) {
      const height = itemHeight(i);
      sum += height;
      if (sum >= scrollTop) {
        offset = i;
        break;
      }
    }
    return offset + 1;
  };
  const calculateRange = () => {
    const element = containerRef.value;
    if (element) {
      const offset = getOffset(element.scrollTop);
      const viewCapacity = getViewCapacity(element.clientHeight);
      const from = offset - overscan;
      const to = offset + viewCapacity + overscan;
      state.value = {
        start: from < 0 ? 0 : from,
        end: to > source.value.length ? source.value.length : to
      };
      currentList.value = source.value.slice(state.value.start, state.value.end).map((ele, index) => ({
        data: ele,
        index: index + state.value.start
      }));
    }
  };
  watch([size.width, size.height, list], () => {
    calculateRange();
  });
  const totalHeight = computed(() => {
    if (typeof itemHeight === "number")
      return source.value.length * itemHeight;
    return source.value.reduce((sum, _, index) => sum + itemHeight(index), 0);
  });
  const getDistanceTop = (index) => {
    if (typeof itemHeight === "number") {
      const height2 = index * itemHeight;
      return height2;
    }
    const height = source.value.slice(0, index).reduce((sum, _, i) => sum + itemHeight(i), 0);
    return height;
  };
  const scrollTo = (index) => {
    if (containerRef.value) {
      containerRef.value.scrollTop = getDistanceTop(index);
      calculateRange();
    }
  };
  const offsetTop = computed(() => getDistanceTop(state.value.start));
  const wrapperProps = computed(() => {
    return {
      style: {
        width: "100%",
        height: `${totalHeight.value - offsetTop.value}px`,
        marginTop: `${offsetTop.value}px`
      }
    };
  });
  const containerStyle = { overflowY: "auto" };
  return {
    list: currentList,
    scrollTo,
    containerProps: {
      ref: containerRef,
      onScroll: () => {
        calculateRange();
      },
      style: containerStyle
    },
    wrapperProps
  };
}

function reactiveOmit(target, ...omitKeys) {
    const pickKeys = Object.keys(target).filter(k => !omitKeys.includes(k));
    return reactivePick(target, ...pickKeys);
}

function responsiveTarget(target) {
    return isReactive(target) ? target : reactive(cloneDeep(target));
}

const globalThemeState = createGlobalState(() => useStorage('meetcode-ui-theme-local-storage', 'light'));
const globalTheme = globalThemeState();
const isLight = computed(() => globalTheme.value === 'light');
const isDark = computed(() => globalTheme.value === 'dark');
/**
 * @private
 */
const globalThemeChangeEventHook = createEventHook();
/**
 * User's integrate theme controller
 */
function useThemeController(options = {}) {
    const { initialTheme, useOsTheme } = options;
    const themeChangeEventHook = createEventHook();
    const setTheme = (theme = 'light') => {
        if (globalTheme.value !== theme) {
            globalTheme.value = theme;
            themeChangeEventHook.trigger(theme);
            globalThemeChangeEventHook.trigger(theme);
        }
    };
    if (initialTheme) {
        setTheme(initialTheme);
    }
    else if (useOsTheme) {
        const isDark = usePreferredDark();
        watch(isDark, colorScheme => {
            if (colorScheme) {
                setTheme('dark');
            }
            else {
                setTheme('light');
            }
        }, { immediate: true });
    }
    return {
        current: globalTheme,
        isDark,
        isLight,
        setTheme,
        switchTheme() {
            if (isLight.value) {
                setTheme('dark');
            }
            else {
                setTheme('light');
            }
        },
        onThemeChange: themeChangeEventHook.on,
        onGlobalThemeChange: globalThemeChangeEventHook.on
    };
}

const useLight = reactive([]);
const useDark = reactive([]);
watch(globalTheme, theme => {
    if (theme === 'dark') {
        registerDarkTheme();
    }
    else {
        registerLightTheme();
    }
}, { immediate: true });
function registerLightTheme() {
    useDark
        .filter(d => d.isMounted)
        .forEach(d => {
        d.theme.unmount();
        d.isMounted = false;
    });
    useLight
        .filter(l => !l.isMounted)
        .forEach(l => {
        l.theme.mount({ id: l.key });
        l.isMounted = true;
    });
}
function registerDarkTheme() {
    useLight
        .filter(l => l.isMounted)
        .forEach(l => {
        l.theme.unmount();
        l.isMounted = false;
    });
    useDark
        .filter(d => !d.isMounted)
        .forEach(d => {
        d.theme.mount({ id: d.key });
        d.isMounted = true;
    });
}
function useLightTheme(id, theme) {
    const key = `${id}-light`;
    if (useLight.findIndex(l => l.key === key) > -1)
        return;
    const state = {
        key,
        isMounted: false,
        isStatic: false,
        theme
    };
    if (isLight.value) {
        theme.mount({ id: key });
        state.isMounted = true;
    }
    // @ts-ignore
    useLight.push(state);
}
function useDarkTheme(id, theme) {
    const key = `${id}-dark`;
    if (useDark.findIndex(d => d.key === key) > -1)
        return;
    const state = {
        key,
        isMounted: false,
        isStatic: false,
        theme
    };
    if (isDark.value) {
        theme.mount({ id: key });
        state.isMounted = true;
    }
    // @ts-ignore
    useDark.push(state);
}
function useThemeRegister(theme) {
    const { key, main, light, dark } = theme;
    main?.mount({ id: key });
    light && useLightTheme(key, light);
    dark && useDarkTheme(key, dark);
}

const sharedStack = reactive([]);
function useSharedItems() {
    return {
        add(key) {
            sharedStack.push(key);
        },
        remove(key) {
            const index = sharedStack.findIndex(sharedKey => sharedKey === key);
            index > -1 && sharedStack.splice(index, 1);
        },
        topItem: computed(() => sharedStack[sharedStack.length - 1]),
        stack: sharedStack
    };
}

const useGlobalLanguageState = createGlobalState(() => useStorage('meetcode-ui-language-local-storage', 'zh-CN'));
const globalLanguage = useGlobalLanguageState();
/**
 * @private
 */
const globalLanguageChangeEventHook = createEventHook();
/**
 * User's integrate i18n controller
 */
function useI18nController(initialLang) {
    const languageChangeEventHook = createEventHook();
    const setLanguage = (lang = 'zh-CN') => {
        if (globalLanguage.value !== lang) {
            globalLanguage.value = lang;
            languageChangeEventHook.trigger(lang);
            globalLanguageChangeEventHook.trigger(lang);
        }
    };
    if (initialLang)
        setLanguage(initialLang);
    return {
        current: globalLanguage,
        setLanguage,
        switchLanguage() {
            if (globalLanguage.value === 'en-US') {
                setLanguage('zh-CN');
            }
            else {
                setLanguage('en-US');
            }
        },
        onLanguageChange: languageChangeEventHook.on,
        onGlobalLanguageChange: globalLanguageChangeEventHook.on
    };
}

var modal$1 = {
    ConfirmButtonText: '确定',
    CancelButtonText: '取消'
};

const zh_CN = {
    modal: modal$1
};

var modal = {
    ConfirmButtonText: 'Confirm',
    CancelButtonText: 'Cancel'
};

const en_US = {
    modal
};

function useI18n(module) {
    const { current } = useI18nController();
    const i18nData = computed(() => {
        if (current.value === 'en-US')
            return en_US;
        return zh_CN;
    });
    return {
        locale: current,
        i18n: (chainKey, defaultVal = '') => {
            const [name, key] = (module ? `${module}.${chainKey}` : chainKey).split('.');
            return i18nData.value?.[name]?.[key] ?? defaultVal;
        }
    };
}

const _hoisted_1$c = {
  xmlns: 'http://www.w3.org/2000/svg',
  'xmlns:xlink': 'http://www.w3.org/1999/xlink',
  viewBox: '0 0 512 512'
};
const _hoisted_2$c = /*#__PURE__*/ createVNode(
  'path',
  {
    d: 'M256 48C141.31 48 48 141.31 48 256s93.31 208 208 208s208-93.31 208-208S370.69 48 256 48zm0 319.91a20 20 0 1 1 20-20a20 20 0 0 1-20 20zm21.72-201.15l-5.74 122a16 16 0 0 1-32 0l-5.74-121.94v-.05a21.74 21.74 0 1 1 43.44 0z',
    fill: 'currentColor'
  },
  null,
  -1
  /* HOISTED */
);
var IconAlert = defineComponent({
  name: 'AlertCircle',
  render: function render(_ctx, _cache) {
    return openBlock(), createBlock('svg', _hoisted_1$c, [_hoisted_2$c])
  }
});

const _hoisted_1$b = {
  xmlns: 'http://www.w3.org/2000/svg',
  'xmlns:xlink': 'http://www.w3.org/1999/xlink',
  viewBox: '0 0 512 512'
};
const _hoisted_2$b = /*#__PURE__*/ createVNode(
  'path',
  {
    d: 'M256 48C141.31 48 48 141.31 48 256s93.31 208 208 208s208-93.31 208-208S370.69 48 256 48zm108.25 138.29l-134.4 160a16 16 0 0 1-12 5.71h-.27a16 16 0 0 1-11.89-5.3l-57.6-64a16 16 0 1 1 23.78-21.4l45.29 50.32l122.59-145.91a16 16 0 0 1 24.5 20.58z',
    fill: 'currentColor'
  },
  null,
  -1
  /* HOISTED */
);
var IconSuccess = defineComponent({
  name: 'CheckmarkCircle',
  render: function render(_ctx, _cache) {
    return openBlock(), createBlock('svg', _hoisted_1$b, [_hoisted_2$b])
  }
});

const _hoisted_1$a = {
  xmlns: 'http://www.w3.org/2000/svg',
  'xmlns:xlink': 'http://www.w3.org/1999/xlink',
  viewBox: '0 0 512 512'
};
const _hoisted_2$a = /*#__PURE__*/ createVNode(
  'path',
  {
    fill: 'none',
    stroke: 'currentColor',
    'stroke-linecap': 'square',
    'stroke-miterlimit': '10',
    'stroke-width': '44',
    d: 'M416 128L192 384l-96-96'
  },
  null,
  -1
  /* HOISTED */
);
var IconCheck = defineComponent({
  name: 'CheckmarkSharp',
  render: function render(_ctx, _cache) {
    return openBlock(), createBlock('svg', _hoisted_1$a, [_hoisted_2$a])
  }
});

const _hoisted_1$9 = {
  xmlns: 'http://www.w3.org/2000/svg',
  'xmlns:xlink': 'http://www.w3.org/1999/xlink',
  viewBox: '0 0 512 512'
};
const _hoisted_2$9 = /*#__PURE__*/ createVNode(
  'path',
  {
    fill: 'none',
    stroke: 'currentColor',
    'stroke-linecap': 'square',
    'stroke-miterlimit': '10',
    'stroke-width': '48',
    d: 'M328 112L184 256l144 144'
  },
  null,
  -1
  /* HOISTED */
);
var ChevronBackSharp = defineComponent({
  name: 'ChevronBackSharp',
  render: function render(_ctx, _cache) {
    return openBlock(), createBlock('svg', _hoisted_1$9, [_hoisted_2$9])
  }
});

const _hoisted_1$8 = {
  xmlns: 'http://www.w3.org/2000/svg',
  'xmlns:xlink': 'http://www.w3.org/1999/xlink',
  viewBox: '0 0 512 512'
};
const _hoisted_2$8 = /*#__PURE__*/ createVNode(
  'path',
  {
    fill: 'none',
    stroke: 'currentColor',
    'stroke-linecap': 'round',
    'stroke-linejoin': 'round',
    'stroke-width': '48',
    d: 'M184 112l144 144l-144 144'
  },
  null,
  -1
  /* HOISTED */
);
var ChevronForwardOutline = defineComponent({
  name: 'ChevronForwardOutline',
  render: function render(_ctx, _cache) {
    return openBlock(), createBlock('svg', _hoisted_1$8, [_hoisted_2$8])
  }
});

const _hoisted_1$7 = {
  xmlns: 'http://www.w3.org/2000/svg',
  'xmlns:xlink': 'http://www.w3.org/1999/xlink',
  viewBox: '0 0 512 512'
};
const _hoisted_2$7 = /*#__PURE__*/ createVNode(
  'path',
  {
    fill: 'none',
    stroke: 'currentColor',
    'stroke-linecap': 'round',
    'stroke-linejoin': 'round',
    'stroke-width': '48',
    d: 'M112 328l144-144l144 144'
  },
  null,
  -1
  /* HOISTED */
);
var ChevronUpOutline = defineComponent({
  name: 'ChevronUpOutline',
  render: function render(_ctx, _cache) {
    return openBlock(), createBlock('svg', _hoisted_1$7, [_hoisted_2$7])
  }
});

const _hoisted_1$6 = {
  xmlns: 'http://www.w3.org/2000/svg',
  'xmlns:xlink': 'http://www.w3.org/1999/xlink',
  viewBox: '0 0 512 512'
};
const _hoisted_2$6 = /*#__PURE__*/ createVNode(
  'path',
  {
    d: 'M289.94 256l95-95A24 24 0 0 0 351 127l-95 95l-95-95a24 24 0 0 0-34 34l95 95l-95 95a24 24 0 1 0 34 34l95-95l95 95a24 24 0 0 0 34-34z',
    fill: 'currentColor'
  },
  null,
  -1
  /* HOISTED */
);
var IconClose$1 = defineComponent({
  name: 'Close',
  render: function render(_ctx, _cache) {
    return openBlock(), createBlock('svg', _hoisted_1$6, [_hoisted_2$6])
  }
});

const _hoisted_1$5 = {
  xmlns: 'http://www.w3.org/2000/svg',
  'xmlns:xlink': 'http://www.w3.org/1999/xlink',
  viewBox: '0 0 512 512'
};
const _hoisted_2$5 = /*#__PURE__*/ createVNode(
  'path',
  {
    d: 'M256 48C141.31 48 48 141.31 48 256s93.31 208 208 208s208-93.31 208-208S370.69 48 256 48zm86.63 272L320 342.63l-64-64l-64 64L169.37 320l64-64l-64-64L192 169.37l64 64l64-64L342.63 192l-64 64z',
    fill: 'currentColor'
  },
  null,
  -1
  /* HOISTED */
);
var IconError = defineComponent({
  name: 'CloseCircleSharp',
  render: function render(_ctx, _cache) {
    return openBlock(), createBlock('svg', _hoisted_1$5, [_hoisted_2$5])
  }
});

const _hoisted_1$4 = {
  xmlns: 'http://www.w3.org/2000/svg',
  'xmlns:xlink': 'http://www.w3.org/1999/xlink',
  viewBox: '0 0 512 512'
};
const _hoisted_2$4 = /*#__PURE__*/ createVNode(
  'path',
  {
    fill: 'none',
    stroke: 'currentColor',
    'stroke-linecap': 'round',
    'stroke-linejoin': 'round',
    'stroke-width': '32',
    d: 'M368 368L144 144'
  },
  null,
  -1
  /* HOISTED */
);
const _hoisted_3$2 = /*#__PURE__*/ createVNode(
  'path',
  {
    fill: 'none',
    stroke: 'currentColor',
    'stroke-linecap': 'round',
    'stroke-linejoin': 'round',
    'stroke-width': '32',
    d: 'M368 144L144 368'
  },
  null,
  -1
  /* HOISTED */
);
var IconClose = defineComponent({
  name: 'CloseOutline',
  render: function render(_ctx, _cache) {
    return openBlock(), createBlock('svg', _hoisted_1$4, [_hoisted_2$4, _hoisted_3$2])
  }
});

const _hoisted_1$3 = {
  xmlns: 'http://www.w3.org/2000/svg',
  'xmlns:xlink': 'http://www.w3.org/1999/xlink',
  viewBox: '0 0 512 512'
};
const _hoisted_2$3 = /*#__PURE__*/ createVNode(
  'path',
  {
    d: 'M256 56C145.72 56 56 145.72 56 256s89.72 200 200 200s200-89.72 200-200S366.28 56 256 56zm0 82a26 26 0 1 1-26 26a26 26 0 0 1 26-26zm48 226h-88a16 16 0 0 1 0-32h28v-88h-16a16 16 0 0 1 0-32h32a16 16 0 0 1 16 16v104h28a16 16 0 0 1 0 32z',
    fill: 'currentColor'
  },
  null,
  -1
  /* HOISTED */
);
var IconInfo = defineComponent({
  name: 'InformationCircle',
  render: function render(_ctx, _cache) {
    return openBlock(), createBlock('svg', _hoisted_1$3, [_hoisted_2$3])
  }
});

const _hoisted_1$2 = {
  xmlns: 'http://www.w3.org/2000/svg',
  'xmlns:xlink': 'http://www.w3.org/1999/xlink',
  viewBox: '0 0 512 512'
};
const _hoisted_2$2 = /*#__PURE__*/ createVNode(
  'path',
  {
    d: 'M449.07 399.08L278.64 82.58c-12.08-22.44-44.26-22.44-56.35 0L51.87 399.08A32 32 0 0 0 80 446.25h340.89a32 32 0 0 0 28.18-47.17zm-198.6-1.83a20 20 0 1 1 20-20a20 20 0 0 1-20 20zm21.72-201.15l-5.74 122a16 16 0 0 1-32 0l-5.74-121.95a21.73 21.73 0 0 1 21.5-22.69h.21a21.74 21.74 0 0 1 21.73 22.7z',
    fill: 'currentColor'
  },
  null,
  -1
  /* HOISTED */
);
var IconWarning = defineComponent({
  name: 'Warning',
  render: function render(_ctx, _cache) {
    return openBlock(), createBlock('svg', _hoisted_1$2, [_hoisted_2$2])
  }
});

let onceCbs = [];
const paramsMap = new WeakMap();
function flushOnceCallbacks() {
    onceCbs.forEach((cb) => cb(...paramsMap.get(cb)));
    onceCbs = [];
}
function beforeNextFrameOnce(cb, ...params) {
    paramsMap.set(cb, params);
    if (onceCbs.includes(cb))
        return;
    onceCbs.push(cb) === 1 && requestAnimationFrame(flushOnceCallbacks);
}

const traps = {
    mousemoveoutside: new WeakMap(),
    clickoutside: new WeakMap()
};
function createTrapHandler(name, el, originalHandler) {
    if (name === 'mousemoveoutside') {
        const moveHandler = (e) => {
            if (el.contains(e.target))
                return;
            originalHandler(e);
        };
        return {
            mousemove: moveHandler,
            touchstart: moveHandler
        };
    }
    else if (name === 'clickoutside') {
        let mouseDownOutside = false;
        const downHandler = (e) => {
            mouseDownOutside = !el.contains(e.target);
        };
        const upHanlder = (e) => {
            if (!mouseDownOutside)
                return;
            if (el.contains(e.target))
                return;
            originalHandler(e);
        };
        return {
            mousedown: downHandler,
            mouseup: upHanlder,
            touchstart: downHandler,
            touchend: upHanlder
        };
    }
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    console.error(`[evtd/create-trap-handler]: name \`${name}\` is invalid. This could be a bug of evtd.`);
    return {};
}
function ensureTrapHandlers(name, el, handler) {
    const handlers = traps[name];
    let elHandlers = handlers.get(el);
    if (elHandlers === undefined) {
        handlers.set(el, elHandlers = new WeakMap());
    }
    let trapHandler = elHandlers.get(handler);
    if (trapHandler === undefined) {
        elHandlers.set(handler, trapHandler = createTrapHandler(name, el, handler));
    }
    return trapHandler;
}
function trapOn(name, el, handler, options) {
    if (name === 'mousemoveoutside' ||
        name === 'clickoutside') {
        const trapHandlers = ensureTrapHandlers(name, el, handler);
        Object.keys(trapHandlers).forEach(key => {
            on(key, document, trapHandlers[key], options);
        });
        return true;
    }
    return false;
}
function trapOff(name, el, handler, options) {
    if (name === 'mousemoveoutside' ||
        name === 'clickoutside') {
        const trapHandlers = ensureTrapHandlers(name, el, handler);
        Object.keys(trapHandlers).forEach(key => {
            off(key, document, trapHandlers[key], options);
        });
        return true;
    }
    return false;
}

// currently `once` and `passive` is not supported
function createDelegate() {
    if (typeof window === 'undefined') {
        return {
            on: () => { },
            off: () => { }
        };
    }
    const propagationStopped = new WeakMap();
    const immediatePropagationStopped = new WeakMap();
    function trackPropagation() {
        propagationStopped.set(this, true);
    }
    function trackImmediate() {
        propagationStopped.set(this, true);
        immediatePropagationStopped.set(this, true);
    }
    function spy(event, propName, fn) {
        const source = event[propName];
        event[propName] = function () {
            fn.apply(event, arguments);
            return source.apply(event, arguments);
        };
        return event;
    }
    function unspy(event, propName) {
        event[propName] = Event.prototype[propName];
    }
    const currentTargets = new WeakMap();
    const currentTargetDescriptor = Object.getOwnPropertyDescriptor(Event.prototype, 'currentTarget');
    function getCurrentTarget() {
        var _a;
        return (_a = currentTargets.get(this)) !== null && _a !== void 0 ? _a : null;
    }
    function defineCurrentTarget(event, getter) {
        if (currentTargetDescriptor === undefined)
            return;
        Object.defineProperty(event, 'currentTarget', {
            configurable: true,
            enumerable: true,
            get: getter !== null && getter !== void 0 ? getter : currentTargetDescriptor.get
        });
    }
    const phaseToTypeToElToHandlers = {
        bubble: {},
        capture: {}
    };
    const typeToWindowEventHandlers = {};
    function createUnifiedHandler() {
        const delegeteHandler = function (e) {
            const { type, eventPhase, target, bubbles } = e;
            if (eventPhase === 2)
                return;
            const phase = eventPhase === 1 ? 'capture' : 'bubble';
            let cursor = target;
            const path = [];
            // collecting bubble path
            while (true) {
                if (cursor === null)
                    cursor = window;
                path.push(cursor);
                if (cursor === window) {
                    break;
                }
                // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
                cursor = (cursor.parentNode || null);
            }
            const captureElToHandlers = phaseToTypeToElToHandlers.capture[type];
            const bubbleElToHandlers = phaseToTypeToElToHandlers.bubble[type];
            spy(e, 'stopPropagation', trackPropagation);
            spy(e, 'stopImmediatePropagation', trackImmediate);
            defineCurrentTarget(e, getCurrentTarget);
            if (phase === 'capture') {
                if (captureElToHandlers === undefined)
                    return;
                // capture
                for (let i = path.length - 1; i >= 0; --i) {
                    if (propagationStopped.has(e))
                        break;
                    const target = path[i];
                    const handlers = captureElToHandlers.get(target);
                    if (handlers !== undefined) {
                        currentTargets.set(e, target);
                        for (const handler of handlers) {
                            if (immediatePropagationStopped.has(e))
                                break;
                            handler(e);
                        }
                    }
                    if (i === 0 && !bubbles && bubbleElToHandlers !== undefined) {
                        const bubbleHandlers = bubbleElToHandlers.get(target);
                        if (bubbleHandlers !== undefined) {
                            for (const handler of bubbleHandlers) {
                                if (immediatePropagationStopped.has(e))
                                    break;
                                handler(e);
                            }
                        }
                    }
                }
            }
            else if (phase === 'bubble') {
                if (bubbleElToHandlers === undefined)
                    return;
                // bubble
                for (let i = 0; i < path.length; ++i) {
                    if (propagationStopped.has(e))
                        break;
                    const target = path[i];
                    const handlers = bubbleElToHandlers.get(target);
                    if (handlers !== undefined) {
                        currentTargets.set(e, target);
                        for (const handler of handlers) {
                            if (immediatePropagationStopped.has(e))
                                break;
                            handler(e);
                        }
                    }
                }
            }
            unspy(e, 'stopPropagation');
            unspy(e, 'stopImmediatePropagation');
            defineCurrentTarget(e);
        };
        delegeteHandler.displayName = 'evtdUnifiedHandler';
        return delegeteHandler;
    }
    function createUnifiedWindowEventHandler() {
        const delegateHandler = function (e) {
            const { type, eventPhase } = e;
            if (eventPhase !== 2)
                return;
            const handlers = typeToWindowEventHandlers[type];
            if (handlers === undefined)
                return;
            handlers.forEach((handler) => handler(e));
        };
        delegateHandler.displayName = 'evtdUnifiedWindowEventHandler';
        return delegateHandler;
    }
    const unifiedHandler = createUnifiedHandler();
    const unfiendWindowEventHandler = createUnifiedWindowEventHandler();
    function ensureElToHandlers(phase, type) {
        const phaseHandlers = phaseToTypeToElToHandlers[phase];
        if (phaseHandlers[type] === undefined) {
            phaseHandlers[type] = new Map();
            window.addEventListener(type, unifiedHandler, phase === 'capture');
        }
        return phaseHandlers[type];
    }
    function ensureWindowEventHandlers(type) {
        const windowEventHandlers = typeToWindowEventHandlers[type];
        if (windowEventHandlers === undefined) {
            typeToWindowEventHandlers[type] = new Set();
            window.addEventListener(type, unfiendWindowEventHandler);
        }
        return typeToWindowEventHandlers[type];
    }
    function ensureHandlers(elToHandlers, el) {
        let elHandlers = elToHandlers.get(el);
        if (elHandlers === undefined) {
            elToHandlers.set(el, (elHandlers = new Set()));
        }
        return elHandlers;
    }
    function handlerExist(el, phase, type, handler) {
        const elToHandlers = phaseToTypeToElToHandlers[phase][type];
        // phase ${type} event has handlers
        if (elToHandlers !== undefined) {
            const handlers = elToHandlers.get(el);
            // phase using el with ${type} event has handlers
            if (handlers !== undefined) {
                if (handlers.has(handler))
                    return true;
            }
        }
        return false;
    }
    function windowEventHandlerExist(type, handler) {
        const handlers = typeToWindowEventHandlers[type];
        if (handlers !== undefined) {
            if (handlers.has(handler)) {
                return true;
            }
        }
        return false;
    }
    function on(type, el, handler, options) {
        let mergedHandler;
        if (typeof options === 'object' && options.once === true) {
            mergedHandler = (e) => {
                off(type, el, mergedHandler, options);
                handler(e);
            };
        }
        else {
            mergedHandler = handler;
        }
        const trapped = trapOn(type, el, mergedHandler, options);
        if (trapped)
            return;
        const phase = options === true ||
            (typeof options === 'object' && options.capture === true)
            ? 'capture'
            : 'bubble';
        const elToHandlers = ensureElToHandlers(phase, type);
        const handlers = ensureHandlers(elToHandlers, el);
        if (!handlers.has(mergedHandler))
            handlers.add(mergedHandler);
        if (el === window) {
            const windowEventHandlers = ensureWindowEventHandlers(type);
            if (!windowEventHandlers.has(mergedHandler)) {
                windowEventHandlers.add(mergedHandler);
            }
        }
    }
    function off(type, el, handler, options) {
        const trapped = trapOff(type, el, handler, options);
        if (trapped)
            return;
        const capture = options === true ||
            (typeof options === 'object' && options.capture === true);
        const phase = capture ? 'capture' : 'bubble';
        const elToHandlers = ensureElToHandlers(phase, type);
        const handlers = ensureHandlers(elToHandlers, el);
        if (el === window) {
            const mirrorPhase = capture ? 'bubble' : 'capture';
            if (!handlerExist(el, mirrorPhase, type, handler) &&
                windowEventHandlerExist(type, handler)) {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                const windowEventHandlers = typeToWindowEventHandlers[type];
                windowEventHandlers.delete(handler);
                if (windowEventHandlers.size === 0) {
                    window.removeEventListener(type, unfiendWindowEventHandler);
                    typeToWindowEventHandlers[type] = undefined;
                }
            }
        }
        if (handlers.has(handler))
            handlers.delete(handler);
        if (handlers.size === 0) {
            elToHandlers.delete(el);
        }
        if (elToHandlers.size === 0) {
            window.removeEventListener(type, unifiedHandler, phase === 'capture');
            phaseToTypeToElToHandlers[phase][type] = undefined;
        }
    }
    return {
        on: on,
        off: off
    };
}
const { on, off } = createDelegate();

function getSlot(scope, slots, slotName = 'default') {
    const slot = slots[slotName];
    if (slot === undefined) {
        throw new Error(`[vueuc/${scope}]: slot[${slotName}] is empty.`);
    }
    return slot();
}
// o(n) flatten
function flatten(vNodes, filterCommentNode = true, result = []) {
    vNodes.forEach((vNode) => {
        if (vNode === null)
            return;
        if (typeof vNode !== 'object') {
            if (typeof vNode === 'string' || typeof vNode === 'number') {
                result.push(createTextVNode$1(String(vNode)));
            }
            return;
        }
        if (Array.isArray(vNode)) {
            flatten(vNode, filterCommentNode, result);
            return;
        }
        if (vNode.type === Fragment) {
            if (vNode.children === null)
                return;
            if (Array.isArray(vNode.children)) {
                flatten(vNode.children, filterCommentNode, result);
            }
            // rawSlot
        }
        else if (vNode.type !== Comment) {
            result.push(vNode);
        }
    });
    return result;
}
function getFirstVNode(scope, slots, slotName = 'default') {
    const slot = slots[slotName];
    if (slot === undefined) {
        throw new Error(`[vueuc/${scope}]: slot[${slotName}] is empty.`);
    }
    const content = flatten(slot());
    // vue will normalize the slot, so slot must be an array
    if (content.length === 1) {
        return content[0];
    }
    else {
        throw new Error(`[vueuc/${scope}]: slot[${slotName}] should have exactly one child.`);
    }
}

let viewMeasurer = null;
function ensureViewBoundingRect() {
    if (viewMeasurer === null) {
        viewMeasurer = document.getElementById('v-binder-view-measurer');
        if (viewMeasurer === null) {
            viewMeasurer = document.createElement('div');
            viewMeasurer.id = 'v-binder-view-measurer';
            const { style } = viewMeasurer;
            style.position = 'fixed';
            style.left = '0';
            style.right = '0';
            style.top = '0';
            style.bottom = '0';
            style.pointerEvents = 'none';
            style.visibility = 'hidden';
            document.body.appendChild(viewMeasurer);
        }
    }
    return viewMeasurer.getBoundingClientRect();
}
function getPointRect(x, y) {
    const viewRect = ensureViewBoundingRect();
    return {
        top: y,
        left: x,
        height: 0,
        width: 0,
        right: viewRect.width - x,
        bottom: viewRect.height - y
    };
}
function getRect(el) {
    const elRect = el.getBoundingClientRect();
    const viewRect = ensureViewBoundingRect();
    return {
        left: elRect.left - viewRect.left,
        top: elRect.top - viewRect.top,
        bottom: viewRect.height + viewRect.top - elRect.bottom,
        right: viewRect.width + viewRect.left - elRect.right,
        width: elRect.width,
        height: elRect.height
    };
}
function getParentNode(node) {
    // document type
    if (node.nodeType === 9) {
        return null;
    }
    return node.parentNode;
}
function getScrollParent(node) {
    if (node === null)
        return null;
    const parentNode = getParentNode(node);
    if (parentNode === null) {
        return null;
    }
    // Document
    if (parentNode.nodeType === 9) {
        return document;
    }
    // Element
    if (parentNode.nodeType === 1) {
        // Firefox want us to check `-x` and `-y` variations as well
        const { overflow, overflowX, overflowY } = getComputedStyle(parentNode);
        if (/(auto|scroll|overlay)/.test(overflow + overflowY + overflowX)) {
            return parentNode;
        }
    }
    return getScrollParent(parentNode);
}

/* eslint-disable @typescript-eslint/no-non-null-assertion */
const Binder = defineComponent({
    name: 'Binder',
    props: {
        syncTargetWithParent: Boolean,
        syncTarget: {
            type: Boolean,
            default: true
        }
    },
    setup(props) {
        var _a;
        provide('VBinder', (_a = getCurrentInstance()) === null || _a === void 0 ? void 0 : _a.proxy);
        const VBinder = inject('VBinder', null);
        const targetRef = ref(null);
        /**
         * If there's no nested vbinder, we can simply set the target ref.
         *
         * However, when it comes to:
         * <VBinder> <- syncTarget = false
         *
         *              Should hold target DOM ref, but can't get it directly from
         *              its VTarget. So if there are nested VBinder, we should:
         *              1. Stop setting target DOM from level-1 VTarget
         *              2. Set target DOM from level-2 VTarget
         *              For (1), we need `syncTarget` to `false`
         *              For (2), we need to set `syncTargetWithParent` to `true` on
         *              level-2 VBinder
         *   <VTarget>
         *     <VBinder> <- syncTargetWithParent = true
         *       <VTarget>target</VTarget>
         *     </VBinder>
         *     <VFollower>
         *       content1
         *     </VFollower>
         *   </VTarget>
         *   <VFollower>
         *     content2
         *   </VFollower>
         * </VBinder>
         */
        const setTargetRef = (el) => {
            targetRef.value = el;
            // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
            if (VBinder && props.syncTargetWithParent) {
                VBinder.setTargetRef(el);
            }
        };
        // scroll related
        let scrollableNodes = [];
        const ensureScrollListener = () => {
            let cursor = targetRef.value;
            while (true) {
                cursor = getScrollParent(cursor);
                if (cursor === null)
                    break;
                scrollableNodes.push(cursor);
            }
            for (const el of scrollableNodes) {
                on('scroll', el, onScroll, true);
            }
        };
        const removeScrollListeners = () => {
            for (const el of scrollableNodes) {
                off('scroll', el, onScroll, true);
            }
            scrollableNodes = [];
        };
        const followerScrollListeners = new Set();
        const addScrollListener = (listener) => {
            if (followerScrollListeners.size === 0) {
                ensureScrollListener();
            }
            if (!followerScrollListeners.has(listener)) {
                followerScrollListeners.add(listener);
            }
        };
        const removeScrollListener = (listener) => {
            if (followerScrollListeners.has(listener)) {
                followerScrollListeners.delete(listener);
            }
            if (followerScrollListeners.size === 0) {
                removeScrollListeners();
            }
        };
        const onScroll = () => {
            beforeNextFrameOnce(onScrollRaf);
        };
        const onScrollRaf = () => {
            followerScrollListeners.forEach((listener) => listener());
        };
        // resize related
        const followerResizeListeners = new Set();
        const addResizeListener = (listener) => {
            if (followerResizeListeners.size === 0) {
                on('resize', window, onResize);
            }
            if (!followerResizeListeners.has(listener)) {
                followerResizeListeners.add(listener);
            }
        };
        const removeResizeListener = (listener) => {
            if (followerResizeListeners.has(listener)) {
                followerResizeListeners.delete(listener);
            }
            if (followerResizeListeners.size === 0) {
                off('resize', window, onResize);
            }
        };
        const onResize = () => {
            followerResizeListeners.forEach((listener) => listener());
        };
        onBeforeUnmount(() => {
            off('resize', window, onResize);
            removeScrollListeners();
        });
        return {
            targetRef,
            setTargetRef,
            addScrollListener,
            removeScrollListener,
            addResizeListener,
            removeResizeListener
        };
    },
    render() {
        return getSlot('binder', this.$slots);
    }
});
var VBinder = Binder;

/* eslint-disable @typescript-eslint/no-non-null-assertion */
var VTarget = defineComponent({
    name: 'Target',
    setup() {
        const { setTargetRef, syncTarget } = inject('VBinder');
        const setTargetDirective = {
            mounted: setTargetRef,
            updated: setTargetRef
        };
        return {
            syncTarget,
            setTargetDirective
        };
    },
    render() {
        const { syncTarget, setTargetDirective } = this;
        /**
         * If you are using VBinder as a child of VBinder, the children wouldn't be
         * a valid DOM or component that can be attached to by directive.
         * So we won't sync target on those kind of situation and control the
         * target sync logic manually.
         */
        if (syncTarget) {
            return withDirectives(getFirstVNode('follower', this.$slots), [
                [setTargetDirective]
            ]);
        }
        return getFirstVNode('follower', this.$slots);
    }
});

function warn(location, message) {
    console.error(`[vdirs/${location}]: ${message}`);
}

class ZIndexManager {
    constructor() {
        this.elementZIndex = new Map();
        this.nextZIndex = 2000;
    }
    get elementCount() {
        return this.elementZIndex.size;
    }
    ensureZIndex(el, zIndex) {
        const { elementZIndex } = this;
        if (zIndex !== undefined) {
            el.style.zIndex = `${zIndex}`;
            elementZIndex.delete(el);
            return;
        }
        const { nextZIndex } = this;
        if (elementZIndex.has(el)) {
            const currentZIndex = elementZIndex.get(el);
            if (currentZIndex + 1 === this.nextZIndex)
                return;
        }
        el.style.zIndex = `${nextZIndex}`;
        elementZIndex.set(el, nextZIndex);
        this.nextZIndex = nextZIndex + 1;
        this.squashState();
    }
    unregister(el, zIndex) {
        const { elementZIndex } = this;
        if (elementZIndex.has(el)) {
            elementZIndex.delete(el);
        }
        else if (zIndex === undefined) {
            warn('z-index-manager/unregister-element', 'Element not found when unregistering.');
        }
        this.squashState();
    }
    squashState() {
        const { elementCount } = this;
        if (!elementCount) {
            this.nextZIndex = 2000;
        }
        if (this.nextZIndex - elementCount > 2500)
            this.rearrange();
    }
    rearrange() {
        const elementZIndexPair = Array.from(this.elementZIndex.entries());
        elementZIndexPair.sort((pair1, pair2) => {
            return pair1[1] - pair2[1];
        });
        this.nextZIndex = 2000;
        elementZIndexPair.forEach((pair) => {
            const el = pair[0];
            const zIndex = this.nextZIndex++;
            if (`${zIndex}` !== el.style.zIndex)
                el.style.zIndex = `${zIndex}`;
        });
    }
}
var zIndexManager = new ZIndexManager();

const ctx = '@@ziContext';
// We don't expect manually bound zindex should be changed
const zindexable = {
    mounted(el, bindings) {
        const { value = {} } = bindings;
        const { zIndex, enabled } = value;
        el[ctx] = {
            enabled: !!enabled,
            initialized: false
        };
        if (enabled) {
            zIndexManager.ensureZIndex(el, zIndex);
            el[ctx].initialized = true;
        }
    },
    updated(el, bindings) {
        const { value = {} } = bindings;
        const { zIndex, enabled } = value;
        const cachedEnabled = el[ctx].enabled;
        if (enabled && !cachedEnabled) {
            zIndexManager.ensureZIndex(el, zIndex);
            el[ctx].initialized = true;
        }
        el[ctx].enabled = !!enabled;
    },
    unmounted(el, bindings) {
        if (!el[ctx].initialized)
            return;
        const { value = {} } = bindings;
        const { zIndex } = value;
        zIndexManager.unregister(el, zIndex);
    }
};
var zindexable$1 = zindexable;

function useFalseUntilTruthy(originalRef) {
    const currentRef = ref(!!originalRef.value);
    if (currentRef.value)
        return readonly(currentRef);
    const stop = watch(originalRef, (value) => {
        if (value) {
            currentRef.value = true;
            stop();
        }
    });
    return readonly(currentRef);
}

function useMemo(getterOrOptions) {
    const computedValueRef = computed(getterOrOptions);
    // Maybe it's not possible to lazy evaluate the value, since we can't make
    // render phase capture the deps behind useMemo
    const valueRef = ref(computedValueRef.value);
    watch(computedValueRef, (value) => {
        valueRef.value = value;
    });
    if (typeof getterOrOptions === 'function') {
        return valueRef;
    }
    else {
        return {
            __v_isRef: true,
            get value() {
                return valueRef.value;
            },
            set value(v) {
                getterOrOptions.set(v);
            }
        };
    }
}

const isBrowser = typeof window !== 'undefined';

let fontsReady;
let isFontReady;
const init = () => {
    var _a, _b;
    fontsReady = isBrowser ? (_b = (_a = document) === null || _a === void 0 ? void 0 : _a.fonts) === null || _b === void 0 ? void 0 : _b.ready : undefined;
    isFontReady = false;
    /* istanbul ignore if */
    if (fontsReady !== undefined) {
        void fontsReady.then(() => {
            isFontReady = true;
        });
    }
    else {
        isFontReady = true;
    }
};
init();
/**
 * Call callback on fontsReady is resolved. If fontsReady is already resolved,
 * callback won't be called.
 */
function onFontsReady(cb) {
    /* istanbul ignore next */
    if (isFontReady)
        return;
    let deactivated = false;
    onMounted(() => {
        /* istanbul ignore next */
        if (!isFontReady) {
            fontsReady === null || fontsReady === void 0 ? void 0 : fontsReady.then(() => {
                if (deactivated)
                    return;
                cb();
            });
        }
    });
    onBeforeUnmount(() => {
        deactivated = true;
    });
}

function isMounted() {
    const isMounted = ref(false);
    onMounted(() => { isMounted.value = true; });
    return readonly(isMounted);
}

const ssrContextKey = Symbol('@css-render/vue3-ssr');
function createStyleString(id, style) {
    return `<style cssr-id="${id}">\n${style}\n</style>`;
}
function ssrAdapter(id, style) {
    const ssrContext = inject(ssrContextKey, null);
    if (ssrContext === null) {
        console.error('[css-render/vue3-ssr]: no ssr context found.');
        return;
    }
    const { styles, ids } = ssrContext;
    // we need to impl other options to make it behaves the same as the client side
    if (ids.has(id))
        return;
    if (styles !== null) {
        ids.add(id);
        styles.push(createStyleString(id, style));
    }
}
function useSsrAdapter() {
    const context = inject(ssrContextKey, null);
    if (context === null)
        return undefined;
    return {
        adapter: ssrAdapter,
        context
    };
}

const { c } = CssRender();
const cssrAnchorMetaName = 'vueuc-style';

var VLazyTeleport = defineComponent({
    name: 'LazyTeleport',
    props: {
        to: {
            type: [String, Object],
            default: undefined
        },
        disabled: Boolean,
        show: {
            type: Boolean,
            required: true
        }
    },
    setup(props) {
        return {
            showTeleport: useFalseUntilTruthy(toRef(props, 'show')),
            mergedTo: computed(() => {
                const { to } = props;
                return to !== null && to !== void 0 ? to : 'body';
            })
        };
    },
    render() {
        return this.showTeleport
            ? this.disabled
                ? getSlot('lazy-teleport', this.$slots)
                : h(Teleport, {
                    disabled: this.disabled,
                    to: this.mergedTo
                }, getSlot('lazy-teleport', this.$slots))
            : null;
    }
});

const oppositionPositions = {
    top: 'bottom',
    bottom: 'top',
    left: 'right',
    right: 'left'
};
const oppositeAligns = {
    start: 'end',
    center: 'center',
    end: 'start'
};
const propToCompare = {
    top: 'height',
    bottom: 'height',
    left: 'width',
    right: 'width'
};
const transformOrigins = {
    'bottom-start': 'top left',
    bottom: 'top center',
    'bottom-end': 'top right',
    'top-start': 'bottom left',
    top: 'bottom center',
    'top-end': 'bottom right',
    'right-start': 'top left',
    right: 'center left',
    'right-end': 'bottom left',
    'left-start': 'top right',
    left: 'center right',
    'left-end': 'bottom right'
};
const overlapTransformOrigin = {
    'bottom-start': 'bottom left',
    bottom: 'bottom center',
    'bottom-end': 'bottom right',
    'top-start': 'top left',
    top: 'top center',
    'top-end': 'top right',
    'right-start': 'top right',
    right: 'center right',
    'right-end': 'bottom right',
    'left-start': 'top left',
    left: 'center left',
    'left-end': 'bottom left'
};
const oppositeAlignCssPositionProps = {
    'bottom-start': 'right',
    'bottom-end': 'left',
    'top-start': 'right',
    'top-end': 'left',
    'right-start': 'bottom',
    'right-end': 'top',
    'left-start': 'bottom',
    'left-end': 'top'
};
const keepOffsetDirection = {
    top: true,
    bottom: false,
    left: true,
    right: false // left--
};
const cssPositionToOppositeAlign = {
    top: 'end',
    bottom: 'start',
    left: 'end',
    right: 'start'
};
function getPlacementAndOffsetOfFollower(placement, targetRect, followerRect, shift, flip, overlap) {
    if (!flip || overlap) {
        return { placement: placement, top: 0, left: 0 };
    }
    const [position, align] = placement.split('-');
    let properAlign = align !== null && align !== void 0 ? align : 'center';
    let properOffset = {
        top: 0,
        left: 0
    };
    const deriveOffset = (oppositeAlignCssSizeProp, alignCssPositionProp, offsetVertically) => {
        let left = 0;
        let top = 0;
        const diff = followerRect[oppositeAlignCssSizeProp] -
            targetRect[alignCssPositionProp] -
            targetRect[oppositeAlignCssSizeProp];
        if (diff > 0 && shift) {
            if (offsetVertically) {
                //       screen border
                // |-----------------------------------------|
                // |                    | f  |               |
                // |                    | o  |               |
                // |                    | l  |               |
                // |                    | l  |----           |
                // |                    | o  |tar |          |
                // |                    | w  |get |          |
                // |                    | e  |    |          |
                // |                    | r  |----           |
                // |                     ----                |
                // |-----------------------------------------|
                top = keepOffsetDirection[alignCssPositionProp] ? diff : -diff;
            }
            else {
                //       screen border
                // |----------------------------------------|
                // |                                        |
                // |          ----------                    |
                // |          | target |                    |
                // |       ----------------------------------
                // |       |       follower                 |
                // |       ----------------------------------
                // |                                        |
                // |----------------------------------------|
                left = keepOffsetDirection[alignCssPositionProp] ? diff : -diff;
            }
        }
        return {
            left,
            top
        };
    };
    const offsetVertically = position === 'left' || position === 'right';
    // choose proper placement for non-center align
    if (properAlign !== 'center') {
        const oppositeAlignCssPositionProp = oppositeAlignCssPositionProps[placement];
        const currentAlignCssPositionProp = oppositionPositions[oppositeAlignCssPositionProp];
        const oppositeAlignCssSizeProp = propToCompare[oppositeAlignCssPositionProp];
        // if follower rect is larger than target rect in align direction
        // ----------[ target ]---------|
        // ----------[     follower     ]
        if (followerRect[oppositeAlignCssSizeProp] >
            targetRect[oppositeAlignCssSizeProp]) {
            if (
            // current space is not enough
            // ----------[ target ]---------|
            // -------[     follower        ]
            targetRect[oppositeAlignCssPositionProp] +
                targetRect[oppositeAlignCssSizeProp] <
                followerRect[oppositeAlignCssSizeProp]) {
                const followerOverTargetSize = (followerRect[oppositeAlignCssSizeProp] -
                    targetRect[oppositeAlignCssSizeProp]) /
                    2;
                if (targetRect[oppositeAlignCssPositionProp] < followerOverTargetSize ||
                    targetRect[currentAlignCssPositionProp] < followerOverTargetSize) {
                    // opposite align has larger space
                    // -------[ target ]-----------|
                    // -------[     follower     ]-|
                    if (targetRect[oppositeAlignCssPositionProp] <
                        targetRect[currentAlignCssPositionProp]) {
                        properAlign = oppositeAligns[align];
                        properOffset = deriveOffset(oppositeAlignCssSizeProp, currentAlignCssPositionProp, offsetVertically);
                    }
                    else {
                        // ----------------[ target ]----|
                        // --------[   follower     ]----|
                        properOffset = deriveOffset(oppositeAlignCssSizeProp, oppositeAlignCssPositionProp, offsetVertically);
                    }
                }
                else {
                    // 'center' align is better
                    // ------------[ target ]--------|
                    // -------[       follower    ]--|
                    properAlign = 'center';
                }
            }
        }
        else if (followerRect[oppositeAlignCssSizeProp] <
            targetRect[oppositeAlignCssSizeProp]) {
            // TODO: maybe center is better
            if (targetRect[currentAlignCssPositionProp] < 0 &&
                // opposite align has larger space
                // ------------[   target   ]
                // ----------------[follower]
                targetRect[oppositeAlignCssPositionProp] >
                    targetRect[currentAlignCssPositionProp]) {
                properAlign = oppositeAligns[align];
            }
        }
    }
    else {
        const possibleAlternativeAlignCssPositionProp1 = position === 'bottom' || position === 'top' ? 'left' : 'top';
        const possibleAlternativeAlignCssPositionProp2 = oppositionPositions[possibleAlternativeAlignCssPositionProp1];
        const alternativeAlignCssSizeProp = propToCompare[possibleAlternativeAlignCssPositionProp1];
        const followerOverTargetSize = (followerRect[alternativeAlignCssSizeProp] -
            targetRect[alternativeAlignCssSizeProp]) /
            2;
        if (
        // center is not enough
        // ----------- [ target ]--|
        // -------[     follower     ]
        targetRect[possibleAlternativeAlignCssPositionProp1] <
            followerOverTargetSize ||
            targetRect[possibleAlternativeAlignCssPositionProp2] <
                followerOverTargetSize) {
            // alternative 2 position's space is larger
            if (targetRect[possibleAlternativeAlignCssPositionProp1] >
                targetRect[possibleAlternativeAlignCssPositionProp2]) {
                properAlign =
                    cssPositionToOppositeAlign[possibleAlternativeAlignCssPositionProp1];
                properOffset = deriveOffset(alternativeAlignCssSizeProp, possibleAlternativeAlignCssPositionProp1, offsetVertically);
            }
            else {
                // alternative 1 position's space is larger
                properAlign =
                    cssPositionToOppositeAlign[possibleAlternativeAlignCssPositionProp2];
                properOffset = deriveOffset(alternativeAlignCssSizeProp, possibleAlternativeAlignCssPositionProp2, offsetVertically);
            }
        }
    }
    let properPosition = position;
    if (
    // space is not enough
    targetRect[position] < followerRect[propToCompare[position]] &&
        // opposite position's space is larger
        targetRect[position] < targetRect[oppositionPositions[position]]) {
        properPosition = oppositionPositions[position];
    }
    return {
        placement: properAlign !== 'center'
            ? `${properPosition}-${properAlign}`
            : properPosition,
        left: properOffset.left,
        top: properOffset.top
    };
}
function getProperTransformOrigin(placement, overlap) {
    if (overlap)
        return overlapTransformOrigin[placement];
    return transformOrigins[placement];
}
// ------------
// |  offset  |
// |          |
// | [target] |
// |          |
// ------------
// TODO: refactor it to remove dup logic
function getOffset(placement, offsetRect, targetRect, offsetTopToStandardPlacement, offsetLeftToStandardPlacement, overlap) {
    if (overlap) {
        switch (placement) {
            case 'bottom-start':
                return {
                    top: `${Math.round(targetRect.top - offsetRect.top + targetRect.height)}px`,
                    left: `${Math.round(targetRect.left - offsetRect.left)}px`,
                    transform: 'translateY(-100%)'
                };
            case 'bottom-end':
                return {
                    top: `${Math.round(targetRect.top - offsetRect.top + targetRect.height)}px`,
                    left: `${Math.round(targetRect.left - offsetRect.left + targetRect.width)}px`,
                    transform: 'translateX(-100%) translateY(-100%)'
                };
            case 'top-start':
                return {
                    top: `${Math.round(targetRect.top - offsetRect.top)}px`,
                    left: `${Math.round(targetRect.left - offsetRect.left)}px`,
                    transform: ''
                };
            case 'top-end':
                return {
                    top: `${Math.round(targetRect.top - offsetRect.top)}px`,
                    left: `${Math.round(targetRect.left - offsetRect.left + targetRect.width)}px`,
                    transform: 'translateX(-100%)'
                };
            case 'right-start':
                return {
                    top: `${Math.round(targetRect.top - offsetRect.top)}px`,
                    left: `${Math.round(targetRect.left - offsetRect.left + targetRect.width)}px`,
                    transform: 'translateX(-100%)'
                };
            case 'right-end':
                return {
                    top: `${Math.round(targetRect.top - offsetRect.top + targetRect.height)}px`,
                    left: `${Math.round(targetRect.left - offsetRect.left + targetRect.width)}px`,
                    transform: 'translateX(-100%) translateY(-100%)'
                };
            case 'left-start':
                return {
                    top: `${Math.round(targetRect.top - offsetRect.top)}px`,
                    left: `${Math.round(targetRect.left - offsetRect.left)}px`,
                    transform: ''
                };
            case 'left-end':
                return {
                    top: `${Math.round(targetRect.top - offsetRect.top + targetRect.height)}px`,
                    left: `${Math.round(targetRect.left - offsetRect.left)}px`,
                    transform: 'translateY(-100%)'
                };
            case 'top':
                return {
                    top: `${Math.round(targetRect.top - offsetRect.top)}px`,
                    left: `${Math.round(targetRect.left - offsetRect.left + targetRect.width / 2)}px`,
                    transform: 'translateX(-50%)'
                };
            case 'right':
                return {
                    top: `${Math.round(targetRect.top - offsetRect.top + targetRect.height / 2)}px`,
                    left: `${Math.round(targetRect.left - offsetRect.left + targetRect.width)}px`,
                    transform: 'translateX(-100%) translateY(-50%)'
                };
            case 'left':
                return {
                    top: `${Math.round(targetRect.top - offsetRect.top + targetRect.height / 2)}px`,
                    left: `${Math.round(targetRect.left - offsetRect.left)}px`,
                    transform: 'translateY(-50%)'
                };
            case 'bottom':
            default:
                return {
                    top: `${Math.round(targetRect.top - offsetRect.top + targetRect.height)}px`,
                    left: `${Math.round(targetRect.left - offsetRect.left + targetRect.width / 2)}px`,
                    transform: 'translateX(-50%) translateY(-100%)'
                };
        }
    }
    switch (placement) {
        case 'bottom-start':
            return {
                top: `${Math.round(targetRect.top -
                    offsetRect.top +
                    targetRect.height +
                    offsetTopToStandardPlacement)}px`,
                left: `${Math.round(targetRect.left - offsetRect.left + offsetLeftToStandardPlacement)}px`,
                transform: ''
            };
        case 'bottom-end':
            return {
                top: `${Math.round(targetRect.top -
                    offsetRect.top +
                    targetRect.height +
                    offsetTopToStandardPlacement)}px`,
                left: `${Math.round(targetRect.left -
                    offsetRect.left +
                    targetRect.width +
                    offsetLeftToStandardPlacement)}px`,
                transform: 'translateX(-100%)'
            };
        case 'top-start':
            return {
                top: `${Math.round(targetRect.top - offsetRect.top + offsetTopToStandardPlacement)}px`,
                left: `${Math.round(targetRect.left - offsetRect.left + offsetLeftToStandardPlacement)}px`,
                transform: 'translateY(-100%)'
            };
        case 'top-end':
            return {
                top: `${Math.round(targetRect.top - offsetRect.top + offsetTopToStandardPlacement)}px`,
                left: `${Math.round(targetRect.left -
                    offsetRect.left +
                    targetRect.width +
                    offsetLeftToStandardPlacement)}px`,
                transform: 'translateX(-100%) translateY(-100%)'
            };
        case 'right-start':
            return {
                top: `${Math.round(targetRect.top - offsetRect.top + offsetTopToStandardPlacement)}px`,
                left: `${Math.round(targetRect.left -
                    offsetRect.left +
                    targetRect.width +
                    offsetLeftToStandardPlacement)}px`,
                transform: ''
            };
        case 'right-end':
            return {
                top: `${Math.round(targetRect.top -
                    offsetRect.top +
                    targetRect.height +
                    offsetTopToStandardPlacement)}px`,
                left: `${Math.round(targetRect.left -
                    offsetRect.left +
                    targetRect.width +
                    offsetLeftToStandardPlacement)}px`,
                transform: 'translateY(-100%)'
            };
        case 'left-start':
            return {
                top: `${Math.round(targetRect.top - offsetRect.top + offsetTopToStandardPlacement)}px`,
                left: `${Math.round(targetRect.left - offsetRect.left + offsetLeftToStandardPlacement)}px`,
                transform: 'translateX(-100%)'
            };
        case 'left-end':
            return {
                top: `${Math.round(targetRect.top -
                    offsetRect.top +
                    targetRect.height +
                    offsetTopToStandardPlacement)}px`,
                left: `${Math.round(targetRect.left - offsetRect.left + offsetLeftToStandardPlacement)}px`,
                transform: 'translateX(-100%) translateY(-100%)'
            };
        case 'top':
            return {
                top: `${Math.round(targetRect.top - offsetRect.top + offsetTopToStandardPlacement)}px`,
                left: `${Math.round(targetRect.left -
                    offsetRect.left +
                    targetRect.width / 2 +
                    offsetLeftToStandardPlacement)}px`,
                transform: 'translateY(-100%) translateX(-50%)'
            };
        case 'right':
            return {
                top: `${Math.round(targetRect.top -
                    offsetRect.top +
                    targetRect.height / 2 +
                    offsetTopToStandardPlacement)}px`,
                left: `${Math.round(targetRect.left -
                    offsetRect.left +
                    targetRect.width +
                    offsetLeftToStandardPlacement)}px`,
                transform: 'translateY(-50%)'
            };
        case 'left':
            return {
                top: `${Math.round(targetRect.top -
                    offsetRect.top +
                    targetRect.height / 2 +
                    offsetTopToStandardPlacement)}px`,
                left: `${Math.round(targetRect.left - offsetRect.left + offsetLeftToStandardPlacement)}px`,
                transform: 'translateY(-50%) translateX(-100%)'
            };
        case 'bottom':
        default:
            return {
                top: `${Math.round(targetRect.top -
                    offsetRect.top +
                    targetRect.height +
                    offsetTopToStandardPlacement)}px`,
                left: `${Math.round(targetRect.left -
                    offsetRect.left +
                    targetRect.width / 2 +
                    offsetLeftToStandardPlacement)}px`,
                transform: 'translateX(-50%)'
            };
    }
}

/* eslint-disable @typescript-eslint/no-non-null-assertion */
const style = c([
    c('.v-binder-follower-container', {
        position: 'absolute',
        left: '0',
        right: '0',
        top: '0',
        height: '0',
        pointerEvents: 'none',
        zIndex: 'auto'
    }),
    c('.v-binder-follower-content', {
        position: 'absolute',
        zIndex: 'auto'
    }, [
        c('> *', {
            pointerEvents: 'all'
        })
    ])
]);
var VFollower = defineComponent({
    name: 'Follower',
    inheritAttrs: false,
    props: {
        show: Boolean,
        enabled: {
            type: Boolean,
            default: undefined
        },
        placement: {
            type: String,
            default: 'bottom'
        },
        syncTrigger: {
            type: Array,
            default: ['resize', 'scroll']
        },
        to: [String, Object],
        flip: {
            type: Boolean,
            default: true
        },
        internalShift: Boolean,
        x: Number,
        y: Number,
        width: String,
        minWidth: String,
        containerClass: String,
        teleportDisabled: Boolean,
        zindexable: {
            type: Boolean,
            default: true
        },
        zIndex: Number,
        overlap: Boolean
    },
    setup(props) {
        const VBinder = inject('VBinder');
        const mergedEnabledRef = useMemo(() => {
            return props.enabled !== undefined ? props.enabled : props.show;
        });
        const followerRef = ref(null);
        const offsetContainerRef = ref(null);
        const ensureListeners = () => {
            const { syncTrigger } = props;
            if (syncTrigger.includes('scroll')) {
                VBinder.addScrollListener(syncPosition);
            }
            if (syncTrigger.includes('resize')) {
                VBinder.addResizeListener(syncPosition);
            }
        };
        const removeListeners = () => {
            VBinder.removeScrollListener(syncPosition);
            VBinder.removeResizeListener(syncPosition);
        };
        onMounted(() => {
            if (mergedEnabledRef.value) {
                syncPosition();
                ensureListeners();
            }
        });
        const ssrAdapter = useSsrAdapter();
        style.mount({
            id: 'vueuc/binder',
            head: true,
            anchorMetaName: cssrAnchorMetaName,
            ssr: ssrAdapter
        });
        onBeforeUnmount(() => {
            removeListeners();
        });
        onFontsReady(() => {
            if (mergedEnabledRef.value) {
                syncPosition();
            }
        });
        const syncPosition = () => {
            if (!mergedEnabledRef.value) {
                return;
            }
            const follower = followerRef.value;
            // sometimes watched props change before its dom is ready
            // for example: show=false, x=undefined, y=undefined
            //              show=true,  x=0,         y=0
            // will cause error
            // I may optimize the watch start point later
            if (follower === null)
                return;
            const target = VBinder.targetRef;
            const { x, y, overlap } = props;
            const targetRect = x !== undefined && y !== undefined
                ? getPointRect(x, y)
                : getRect(target);
            follower.style.setProperty('--v-target-width', `${Math.round(targetRect.width)}px`);
            follower.style.setProperty('--v-target-height', `${Math.round(targetRect.height)}px`);
            const { width, minWidth, placement, internalShift, flip } = props;
            follower.setAttribute('v-placement', placement);
            if (overlap) {
                follower.setAttribute('v-overlap', '');
            }
            else {
                follower.removeAttribute('v-overlap');
            }
            const { style } = follower;
            if (width === 'target') {
                style.width = `${targetRect.width}px`;
            }
            else if (width !== undefined) {
                style.width = width;
            }
            else {
                style.width = '';
            }
            if (minWidth === 'target') {
                style.minWidth = `${targetRect.width}px`;
            }
            else if (minWidth !== undefined) {
                style.minWidth = minWidth;
            }
            else {
                style.minWidth = '';
            }
            const followerRect = getRect(follower);
            const offsetContainerRect = getRect(offsetContainerRef.value);
            const { left: offsetLeftToStandardPlacement, top: offsetTopToStandardPlacement, placement: properPlacement } = getPlacementAndOffsetOfFollower(placement, targetRect, followerRect, internalShift, flip, overlap);
            const properTransformOrigin = getProperTransformOrigin(properPlacement, overlap);
            const { left, top, transform } = getOffset(properPlacement, offsetContainerRect, targetRect, offsetTopToStandardPlacement, offsetLeftToStandardPlacement, overlap);
            // we assume that the content size doesn't change after flip,
            // nor we need to make sync logic more complex
            follower.setAttribute('v-placement', properPlacement);
            follower.style.setProperty('--v-offset-left', `${Math.round(offsetLeftToStandardPlacement)}px`);
            follower.style.setProperty('--v-offset-top', `${Math.round(offsetTopToStandardPlacement)}px`);
            follower.style.transform = `translateX(${left}) translateY(${top}) ${transform}`;
            follower.style.transformOrigin = properTransformOrigin;
        };
        watch(mergedEnabledRef, (value) => {
            if (value) {
                ensureListeners();
                syncOnNextTick();
            }
            else {
                removeListeners();
            }
        });
        const syncOnNextTick = () => {
            nextTick()
                .then(syncPosition)
                .catch((e) => console.error(e));
        };
        [
            'placement',
            'x',
            'y',
            'internalShift',
            'flip',
            'width',
            'overlap',
            'minWidth'
        ].forEach((prop) => {
            watch(toRef(props, prop), syncPosition);
        });
        ['teleportDisabled'].forEach((prop) => {
            watch(toRef(props, prop), syncOnNextTick);
        });
        watch(toRef(props, 'syncTrigger'), (value) => {
            if (!value.includes('resize')) {
                VBinder.removeResizeListener(syncPosition);
            }
            else {
                VBinder.addResizeListener(syncPosition);
            }
            if (!value.includes('scroll')) {
                VBinder.removeScrollListener(syncPosition);
            }
            else {
                VBinder.addScrollListener(syncPosition);
            }
        });
        const isMountedRef = isMounted();
        const mergedToRef = useMemo(() => {
            const { to } = props;
            if (to !== undefined)
                return to;
            if (isMountedRef.value) {
                // TODO: find proper container
                return undefined;
            }
            return undefined;
        });
        return {
            VBinder,
            mergedEnabled: mergedEnabledRef,
            offsetContainerRef,
            followerRef,
            mergedTo: mergedToRef,
            syncPosition
        };
    },
    render() {
        return h(VLazyTeleport, {
            show: this.show,
            to: this.mergedTo,
            disabled: this.teleportDisabled
        }, {
            default: () => {
                var _a, _b;
                const vNode = h('div', {
                    class: ['v-binder-follower-container', this.containerClass],
                    ref: 'offsetContainerRef'
                }, [
                    h('div', {
                        class: 'v-binder-follower-content',
                        ref: 'followerRef'
                    }, (_b = (_a = this.$slots).default) === null || _b === void 0 ? void 0 : _b.call(_a))
                ]);
                if (this.zindexable) {
                    return withDirectives(vNode, [
                        [
                            zindexable$1,
                            {
                                enabled: this.mergedEnabled,
                                zIndex: this.zIndex
                            }
                        ]
                    ]);
                }
                return vNode;
            }
        });
    }
});

const popoverProps = {
    trigger: {
        type: String,
        default: 'hover'
    },
    placement: {
        type: String,
        default: 'top'
    },
    destroyWhenHide: {
        type: Boolean,
        default: true
    },
    zIndex: {
        type: Number,
        default: undefined
    },
    show: {
        type: Boolean,
        default: false
    },
    disabled: {
        type: Boolean,
        default: false
    },
    withArrow: {
        type: Boolean,
        default: true
    },
    showDelay: {
        type: Number,
        default: 75
    },
    hideDelay: {
        type: Number,
        default: 75
    },
    offset: {
        type: Object,
        default: undefined
    },
    wrapBoundary: {
        type: Boolean,
        default: false
    },
    matchTrigger: {
        type: Boolean,
        default: false
    },
    autoSync: {
        type: Boolean,
        default: true
    },
    title: {
        type: String,
        default: undefined
    },
    content: {
        type: [String, Function],
        default: undefined
    },
    followMode: {
        type: String,
        default: 'move'
    },
    x: {
        type: Number,
        default: undefined
    },
    y: {
        type: Number,
        default: undefined
    }
};
const popoverEmits = ['show', 'hide', 'update:show', 'border-reached'];
const popoverInjectionKey = Symbol('popoverInjectionKey');

const modalProps = {
    show: {
        type: Boolean,
        default: false
    },
    width: {
        type: [Number, String],
        default: 600
    },
    height: {
        type: [Number, String],
        default: 'initial'
    },
    appearFromCursor: {
        type: Boolean,
        default: true
    },
    wrapperClosable: {
        type: Boolean,
        default: true
    },
    shortcutKey: {
        type: String,
        default: 'Escape'
    },
    closeOnShortcut: {
        type: Boolean,
        default: true
    },
    closable: {
        type: Boolean,
        default: true
    },
    headerStyle: {
        type: [String, Object],
        default: undefined
    },
    bodyStyle: {
        type: [String, Object],
        default: undefined
    },
    footerStyle: {
        type: [String, Object],
        default: undefined
    },
    headerClass: {
        type: [String, Object, Array],
        default: undefined
    },
    bodyClass: {
        type: [String, Object, Array],
        default: undefined
    },
    footerClass: {
        type: [String, Object, Array],
        default: undefined
    },
    title: {
        type: [String, Function],
        default: ''
    },
    showHeader: {
        type: Boolean,
        default: true
    },
    showFooter: {
        type: Boolean,
        default: true
    },
    cancelText: {
        type: [String, Object],
        default: undefined
    },
    confirmText: {
        type: [String, Object],
        default: undefined
    },
    pure: {
        type: Boolean,
        default: false
    },
    position: {
        type: Object,
        default: undefined
    },
    animation: {
        type: String,
        default: 'scale'
    },
    onBeforeLeave: {
        type: Function,
        default: undefined
    },
    appearX: {
        type: Number,
        default: undefined
    },
    appearY: {
        type: Number,
        default: undefined
    }
};
const modalInjectionKey = Symbol('modalInjectionKey');

const drawerProps = {
    show: {
        type: Boolean,
        default: false
    },
    size: {
        type: [Number, String],
        default: '30%'
    },
    appearDirection: {
        type: String,
        default: 'right'
    },
    wrapperClosable: {
        type: Boolean,
        default: true
    },
    shortcutKey: {
        type: String,
        default: 'Escape'
    },
    closeOnShortcut: {
        type: Boolean,
        default: true
    },
    closable: {
        type: Boolean,
        default: true
    },
    headerStyle: {
        type: [String, Object],
        default: undefined
    },
    bodyStyle: {
        type: [String, Object],
        default: undefined
    },
    headerClass: {
        type: [String, Object, Array],
        default: undefined
    },
    bodyClass: {
        type: [String, Object, Array],
        default: undefined
    },
    title: {
        type: [String, Function],
        default: ''
    },
    showHeader: {
        type: Boolean,
        default: true
    },
    pure: {
        type: Boolean,
        default: false
    },
    onBeforeLeave: {
        type: Function,
        default: undefined
    }
};
const drawerInjectionKey = Symbol('drawerInjectionKey');

var mainCssr$f = c$1([
    c$1('.mc-popover', {
        padding: '8px 12px',
        borderRadius: '4px',
        position: 'relative',
        top: 'var(--popover-offset-top)',
        right: 'var(--popover-offset-right)',
        bottom: 'var(--popover-offset-bottom)',
        left: 'var(--popover-offset-left)',
        boxShadow: '0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 9px 28px 8px rgba(0, 0, 0, 0.05)',
        transition: 'all 0.1s linear'
    }, [
        c$1('&__title', {
            fontWeight: 'bold',
            marginBottom: '4px',
            fontSize: '16px',
            lineHeight: '24px'
        }),
        c$1('&__arrow', {
            width: 'calc(8px * 1.414)',
            height: 'calc(8px * 1.414)',
            position: 'absolute',
            transformOrigin: '50% 50%',
            background: 'inherit',
            display: 'inline-block'
        })
    ]),
    c$1('.mc-popover-fade-enter-from, .mc-popover-fade-leave-to', {
        opacity: 0,
        transform: 'scale(0.75)'
    }),
    c$1("[v-placement^='top'] > .mc-popover", {
        '-ms-transform-origin-y': '100%',
        '-webkit-transform-origin-y': '100%',
        marginBottom: '8px'
    }, [
        c$1('& > .mc-popover--with-arrow', {
            marginBottom: '10px'
        }),
        c$1('& > .mc-popover__arrow', {
            clipPath: 'polygon(0 0, 50% 50%, 100% 0)',
            bottom: 'calc(-8px * 1.414)'
        })
    ]),
    c$1("[v-placement^='right'] > .mc-popover", {
        '-ms-transform-origin-x': '0%',
        '-webkit-transform-origin-x': '0%',
        marginLeft: '8px'
    }, [
        c$1('& > .mc-popover--with-arrow', {
            marginLeft: '10px'
        }),
        c$1('& > .mc-popover__arrow', {
            clipPath: 'polygon(50% 50%, 100% 100%, 100% 0)',
            left: 'calc(-8px * 1.414)'
        })
    ]),
    c$1("[v-placement^='bottom'] > .mc-popover", {
        '-ms-transform-origin-y': '0%',
        '-webkit-transform-origin-y': '0%',
        marginTop: '8px'
    }, [
        c$1('& > .mc-popover--with-arrow', {
            marginBottom: '10px'
        }),
        c$1('& > .mc-popover__arrow', {
            clipPath: 'polygon(50% 50%, 0 100%, 100% 100%)',
            top: 'calc(-8px * 1.414)'
        })
    ]),
    c$1("[v-placement^='left'] > .mc-popover", {
        '-ms-transform-origin-x': '100%',
        '-webkit-transform-origin-x': '100%',
        marginRight: '8px'
    }, [
        c$1('& > .mc-popover--with-arrow', {
            marginRight: '10px'
        }),
        c$1('& > .mc-popover__arrow', {
            clipPath: 'polygon(0 0, 0 100%, 50% 50%)',
            right: 'calc(-8px * 1.414)'
        })
    ]),
    c$1("[v-placement='top-start'], [v-placement='bottom-start']", [
        c$1('& > .mc-popover', {
            '-ms-transform-origin-x': '10px',
            '-webkit-transform-origin-x': '10px'
        }, [
            c$1('& > .mc-popover__arrow', {
                left: '10px'
            })
        ])
    ]),
    c$1("[v-placement='top'], [v-placement='bottom']", [
        c$1('& > .mc-popover', {
            '-ms-transform-origin-x': '50%',
            '-webkit-transform-origin-x': '50%'
        }, [
            c$1('& > .mc-popover__arrow', {
                left: '50%',
                transform: 'translateX(-50%)'
            })
        ])
    ]),
    c$1("[v-placement='top-end'], [v-placement='bottom-end']", [
        c$1('& > .mc-popover', {
            '-ms-transform-origin-x': 'calc(100% - 10px)',
            '-webkit-transform-origin-x': 'calc(100% - 10px)'
        }, [
            c$1('& > .mc-popover__arrow', {
                right: '10px'
            })
        ])
    ]),
    c$1("[v-placement='right-start'], [v-placement='left-start']", [
        c$1('& > .mc-popover', {
            '-ms-transform-origin-y': '10px',
            '-webkit-transform-origin-y': '10px'
        }, [
            c$1('& > .mc-popover__arrow', {
                top: '10px'
            })
        ])
    ]),
    c$1("[v-placement='right'], [v-placement='left']", [
        c$1('& > .mc-popover', {
            '-ms-transform-origin-y': '50%',
            '-webkit-transform-origin-y': '50%'
        }, [
            c$1('& > .mc-popover__arrow', {
                top: '50%',
                transform: 'translateY(-50%)'
            })
        ])
    ]),
    c$1("[v-placement='right-end'], [v-placement='left-end']", [
        c$1('& > .mc-popover', {
            '-ms-transform-origin-y': 'calc(100% - 10px)',
            '-webkit-transform-origin-y': 'calc(100% - 10px)'
        }, [
            c$1('& > .mc-popover__arrow', {
                bottom: '10px'
            })
        ])
    ])
]);

var lightCssr$b = c$1('.mc-popover', {
    background: '#fff'
});

var darkCssr$b = c$1('.mc-popover', {
    background: '#313540',
    color: '#eee'
});

var McPopover = defineComponent({
    name: 'Popover',
    inheritAttrs: false,
    props: popoverProps,
    emits: popoverEmits,
    setup(props, { slots, attrs, expose, emit }) {
        // theme register
        onMounted(() => {
            useThemeRegister({
                key: 'McPopover',
                main: mainCssr$f,
                light: lightCssr$b,
                dark: darkCssr$b
            });
        });
        const { trigger, placement, destroyWhenHide, zIndex, show, disabled, withArrow, showDelay, hideDelay, offset, wrapBoundary, matchTrigger, autoSync, title, followMode, x, y } = toRefs(props);
        const showRef = trigger.value === 'manual' ? show : ref(!!props.show);
        const followerRef = ref(null);
        const followX = ref(0);
        const followY = ref(0);
        const mouseInFollowTrigger = ref(false);
        const contentShowTimer = ref();
        const contentHideTimer = ref();
        const contentElRef = ref(null);
        const mergedX = computed(() => {
            switch (trigger.value) {
                case 'manual':
                    return x.value;
                case 'follow':
                    return followX.value;
                default:
                    return;
            }
        });
        const mergedY = computed(() => {
            switch (trigger.value) {
                case 'manual':
                    return y.value;
                case 'follow':
                    return followY.value;
                default:
                    return;
            }
        });
        const emitThrottled = computed(() => {
            return trigger.value === 'follow' && followMode.value === 'move';
        });
        const teleportDisabled = computed(() => {
            const popover = inject(popoverInjectionKey, null);
            const modal = inject(modalInjectionKey, null);
            const drawer = inject(drawerInjectionKey, null);
            return !!popover || !!modal || !!drawer;
        });
        onClickOutside(contentElRef, (e) => {
            if (trigger.value === 'click' && !triggerVNode.value?.el?.contains(e.target)) {
                handleContentHide();
            }
        });
        // call emits
        const callShow = () => {
            emit('show', true);
        };
        const callHide = () => {
            emit('hide', false);
        };
        const callUpdateShow = () => {
            emit('update:show', showRef.value);
        };
        const callBorderReached = (flag, dirs) => {
            emit('border-reached', flag, dirs);
        };
        const throttleCallShow = useThrottleFn(callShow, 100, false);
        const throttleCallHide = useThrottleFn(callHide, 100, false);
        const throttleCallUpdateShow = useThrottleFn(callUpdateShow, 100, false);
        // visible control
        const clearShowTimer = () => {
            window.clearTimeout(contentShowTimer.value);
            contentShowTimer.value = null;
        };
        const clearHideTimer = () => {
            window.clearTimeout(contentHideTimer.value);
            contentHideTimer.value = null;
        };
        const handleContentShow = () => {
            clearHideTimer();
            if (showRef.value)
                return;
            contentShowTimer.value = window.setTimeout(() => {
                showRef.value = true;
                emitThrottled.value ? throttleCallShow() : callShow();
                emitThrottled.value ? throttleCallUpdateShow() : callUpdateShow();
            }, showDelay.value);
        };
        const handleContentHide = () => {
            clearShowTimer();
            if (!showRef.value)
                return;
            contentHideTimer.value = window.setTimeout(() => {
                showRef.value = false;
                emitThrottled.value ? throttleCallHide() : callHide();
                emitThrottled.value ? throttleCallUpdateShow() : callUpdateShow();
            }, hideDelay.value);
        };
        const syncPosition = () => {
            var _a;
            // @ts-ignore
            (_a = followerRef.value) === null || _a === void 0 ? void 0 : _a.syncPosition();
        };
        // hover control
        const contentHoverControl = computed(() => {
            if (trigger.value !== 'hover')
                return {};
            return {
                onMouseenter: handleContentShow,
                onMouseleave: handleContentHide
            };
        });
        // list of events
        const triggerEvent = computed(() => {
            if (trigger.value === 'hover') {
                return {
                    onMouseenter: handleContentShow,
                    onMouseleave: handleContentHide
                };
            }
            else if (trigger.value === 'click') {
                return {
                    onClick: () => {
                        if (showRef.value) {
                            handleContentHide();
                        }
                        else {
                            handleContentShow();
                        }
                    }
                };
            }
            else if (trigger.value === 'follow') {
                return {
                    onMouseenter: () => {
                        mouseInFollowTrigger.value = true;
                    },
                    onMouseleave: () => {
                        mouseInFollowTrigger.value = false;
                    }
                };
            }
            return {};
        });
        // render vnodes
        const triggerVNode = computed(() => {
            const firstDefaultVNode = getSlotFirstVNode(slots.default);
            if (!firstDefaultVNode)
                return null;
            const clonedVNode = cloneVNode(firstDefaultVNode);
            const tempVNode = clonedVNode.type === Text ? createVNode('span', null, [clonedVNode]) : clonedVNode;
            if (disabled.value)
                return tempVNode;
            // event bind
            if (!tempVNode.props) {
                tempVNode.props = {};
            }
            else {
                tempVNode.props = { ...{}, ...tempVNode.props };
            }
            for (const [name, handler] of Object.entries(triggerEvent.value)) {
                const originalHandler = tempVNode.props[name];
                tempVNode.props[name] = originalHandler
                    ? (...args) => {
                        originalHandler(...args);
                        handler?.(...args);
                    }
                    : handler;
            }
            return tempVNode;
        });
        const triggerEl = computed(() => {
            return triggerVNode.value?.el || null;
        });
        provide(popoverInjectionKey, contentElRef);
        void nextTick(() => {
            // const { top, right, bottom, left, width, height } = useElementBounding(binderElRef);
            if (disabled.value || !triggerEl.value)
                return;
            // auto async popover position
            if (autoSync.value) {
                const { top, right, bottom, left } = useElementBounding(triggerEl.value);
                watch([top, right, bottom, left], () => {
                    syncPosition();
                });
            }
            // follow control
            if (trigger.value === 'follow') {
                const { x, y, isOutside, elementHeight, elementWidth, elementX, elementY } = useMouseInElement(triggerEl.value);
                const isFirstEnter = ref(true);
                const clickCallEvent = (evt) => {
                    if (showRef.value) {
                        handleContentHide();
                    }
                    else {
                        const { x, y } = evt;
                        followX.value = x;
                        followY.value = y;
                        handleContentShow();
                    }
                };
                const moveCallEvent = () => {
                    if (!isOutside.value && mouseInFollowTrigger.value) {
                        followX.value = x.value;
                        followY.value = y.value;
                        handleContentShow();
                        // No detection for the first entry
                        if (isFirstEnter.value) {
                            isFirstEnter.value = false;
                            return;
                        }
                        void nextTick(() => {
                            if (wrapBoundary.value && contentElRef.value) {
                                let isReachBorder = false;
                                let reachedDir = [];
                                const contentRect = contentElRef.value.getBoundingClientRect();
                                const { x: contentX, y: contentY, width, height } = contentRect;
                                const cursorOffsetX = contentX - x.value;
                                const cursorOffsetY = contentY - y.value;
                                // top boundary detection
                                if (cursorOffsetY < 0 && Math.abs(cursorOffsetY) > elementY.value) {
                                    followY.value += Math.abs(cursorOffsetY);
                                    isReachBorder = true;
                                    reachedDir.push('top');
                                }
                                // right boundary detection
                                if (elementX.value + width + cursorOffsetX >= elementWidth.value) {
                                    followX.value -= width + cursorOffsetX;
                                    isReachBorder = true;
                                    reachedDir.push('right');
                                }
                                // bottom boundary detection
                                if (elementY.value + height + cursorOffsetY >= elementHeight.value) {
                                    followY.value -= height + cursorOffsetY;
                                    isReachBorder = true;
                                    reachedDir.push('bottom');
                                }
                                // left boundary detection
                                if (cursorOffsetX < 0 && Math.abs(cursorOffsetX) > elementX.value) {
                                    followX.value += Math.abs(cursorOffsetX);
                                    isReachBorder = true;
                                    reachedDir.push('left');
                                }
                                callBorderReached(isReachBorder, reachedDir);
                            }
                        });
                    }
                    else {
                        handleContentHide();
                        callBorderReached(false, []);
                        isFirstEnter.value = true;
                    }
                };
                const { pause, resume } = pausableWatch([x, y, isOutside], moveCallEvent);
                watch(followMode, () => {
                    nextTick(() => {
                        if (followMode.value === 'move') {
                            resume();
                            triggerEl.value.removeEventListener('click', clickCallEvent);
                        }
                        else {
                            pause();
                            triggerEl.value.addEventListener('click', clickCallEvent);
                        }
                    });
                }, {
                    immediate: true
                });
            }
        });
        expose({
            syncPosition,
            show: handleContentShow,
            hide: handleContentHide,
            el: contentElRef
        });
        return () => createComponentVNode(VBinder, null, {
            default: () => [
                createComponentVNode(VTarget, null, { default: () => triggerVNode.value }),
                createComponentVNode(VFollower, {
                    ref: followerRef,
                    x: mergedX.value,
                    y: mergedY.value,
                    zIndex: zIndex?.value,
                    show: showRef.value,
                    enabled: showRef.value,
                    placement: placement.value,
                    width: matchTrigger.value ? 'target' : undefined,
                    teleportDisabled: teleportDisabled.value
                }, {
                    default: () => createComponentVNode(Transition, {
                        name: 'mc-popover-fade',
                        appear: true
                    }, {
                        default: () => createDirectives('v-if', {
                            condition: !disabled.value,
                            node: () => {
                                const { top = '', right = '', bottom = '', left = '' } = offset?.value ?? {};
                                const mergedProps = mergeProps(attrs, {
                                    ref_key: 'contentElRef',
                                    ref: contentElRef,
                                    class: ['mc-popover', { 'mc-popover--with-arrow': withArrow.value }],
                                    style: {
                                        '--popover-offset-top': top,
                                        '--popover-offset-right': right,
                                        '--popover-offset-bottom': bottom,
                                        '--popover-offset-left': left
                                    },
                                    ...contentHoverControl.value
                                });
                                const tempVNode = createElementVNode('div', mergedProps, [
                                    title.value ? createVNode('div', { class: 'mc-popover__title' }, [title.value]) : null,
                                    propsMergeSlots(props, slots, 'content'),
                                    withArrow.value ? createVNode('div', { class: 'mc-popover__arrow' }) : null
                                ], 2 /* CLASS */ | 4 /* STYLE */);
                                return createDirectives(destroyWhenHide.value ? 'v-if' : 'v-show', {
                                    condition: showRef.value,
                                    node: tempVNode
                                });
                            }
                        }),
                        _: 2 /* DYNAMIC */
                    })
                }, 8 /* PROPS */, ['x', 'y', 'zIndex', 'show', 'enabled', 'placement', 'width', 'teleportDisabled'])
            ],
            _: 3 /* FORWARDED */
        });
    }
});

const buttonIKey = Symbol('button');
const buttonProps = {
    type: {
        type: String,
        default: 'default'
    },
    size: {
        type: String,
        default: 'medium'
    },
    disabled: {
        type: Boolean,
        default: false
    },
    ghost: {
        type: Boolean,
        default: false
    },
    dashed: {
        type: Boolean,
        default: false
    },
    render: {
        type: String,
        default: 'normal'
    },
    round: {
        type: Boolean,
        default: false
    },
    circle: {
        type: Boolean,
        default: false
    },
    loading: {
        type: Boolean,
        default: false
    },
    block: {
        type: Boolean,
        default: false
    },
    iconRight: {
        type: Boolean,
        default: false
    },
    color: {
        type: String,
        default: undefined
    },
    textColor: {
        type: String,
        default: undefined
    },
    borderColor: {
        type: String,
        default: undefined
    },
    colorSet: {
        type: Object,
        default: undefined
    },
    textColorSet: {
        type: Object,
        default: undefined
    },
    borderColorSet: {
        type: Object,
        default: undefined
    }
};
const buttonGroupProps = {
    type: {
        type: String,
        default: 'default'
    },
    size: {
        type: String,
        default: 'medium'
    },
    disabled: {
        type: Boolean,
        default: false
    },
    ghost: {
        type: Boolean,
        default: false
    },
    dashed: {
        type: Boolean,
        default: false
    },
    render: {
        type: String,
        default: 'normal'
    },
    vertical: {
        type: Boolean,
        default: false
    }
};

const BUTTON_COLOR_MAP = {
    custom: {
        color: '#000',
        borderColor: '#e0e0e6',
        backgroundColor: '#fff'
    },
    default: {
        color: '#000',
        borderColor: '#e0e0e6',
        backgroundColor: '#fff'
    },
    primary: {
        color: '#3b82f6',
        borderColor: '#3b82f6',
        backgroundColor: '#3b82f6'
    },
    success: {
        color: '#16a34a',
        borderColor: '#16a34a',
        backgroundColor: '#16a34a'
    },
    warning: {
        color: '#fb923c',
        borderColor: '#fb923c',
        backgroundColor: '#fb923c'
    },
    danger: {
        color: '#dc2626',
        borderColor: '#dc2626',
        backgroundColor: '#dc2626'
    }
};
const BUTTON_COLOR_MAP_DARK = {
    custom: {
        color: '#fff',
        borderColor: '#e0e0e6',
        backgroundColor: '#000'
    },
    default: {
        color: '#fff',
        borderColor: '#e0e0e6',
        backgroundColor: '#000'
    },
    primary: {
        color: '#70c0e8',
        borderColor: '#70c0e8',
        backgroundColor: '#70c0e8'
    },
    success: {
        color: '#63e2b7',
        borderColor: '#63e2b7',
        backgroundColor: '#63e2b7'
    },
    warning: {
        color: '#f2c97d',
        borderColor: '#f2c97d',
        backgroundColor: '#f2c97d'
    },
    danger: {
        color: '#e88080',
        borderColor: '#e88080',
        backgroundColor: '#e88080'
    }
};
const DEFAULT_BUTTON_COLOR_MAP = {
    default: {
        color: '#000',
        borderColor: '#e0e0e6',
        backgroundColor: '#fff'
    },
    hover: {
        color: '#059669',
        borderColor: '#10b981',
        backgroundColor: '#fff'
    },
    active: {
        color: '#15803d',
        borderColor: '#15803d',
        backgroundColor: '#fff'
    },
    disabled: {
        color: '#aaa',
        borderColor: '#eee',
        backgroundColor: '#fff'
    }
};
const DEFAULT_BUTTON_COLOR_MAP_DARK = {
    default: {
        color: '#fff',
        borderColor: '#50535a',
        // backgroundColor: '#313540',
        backgroundColor: '#000'
    },
    hover: {
        color: '#7fe7c4',
        borderColor: '#7fe7c4',
        backgroundColor: '#000'
    },
    active: {
        color: '#5acea7',
        borderColor: '#5acea7',
        backgroundColor: '#000'
    },
    disabled: {
        color: '#7a7d85',
        borderColor: '#7a7d85',
        backgroundColor: '#000'
    }
};
const buttonColorMap = computed(() => {
    return isDark.value ? BUTTON_COLOR_MAP_DARK : BUTTON_COLOR_MAP;
});
const defaultButtonColorMap = computed(() => {
    return isDark.value ? DEFAULT_BUTTON_COLOR_MAP_DARK : DEFAULT_BUTTON_COLOR_MAP;
});

var mainCssr$e = c$1([
    c$1('.mc-button-group', {
        display: 'inline-flex'
    }, [
        c$1('.mc-button--default::after', {
            borderColor: 'transparent',
            zIndex: 1
        })
    ]),
    c$1('.mc-button-group:not(.mc-button-group--vertical)', [
        c$1('.mc-button--default:not(:last-child)', [
            c$1('&::before', {
                borderRightWidth: 0
            }),
            c$1('&::after', {
                right: '-1px'
            })
        ]),
        c$1('.mc-button:last-child:not(:first-child)', {
            borderTopLeftRadius: 0,
            borderBottomLeftRadius: 0
        }),
        c$1('.mc-button:first-child:not(:last-child)', {
            borderTopRightRadius: 0,
            borderBottomRightRadius: 0
        }),
        c$1('.mc-button:not(:last-child):not(:first-child)', {
            borderRadius: 0
        })
    ]),
    c$1('.mc-button-group.mc-button-group--vertical', {
        flexDirection: 'column'
    }, [
        c$1('.mc-button--default:not(:last-child)', [
            c$1('&::before', {
                borderBottomWidth: 0
            }),
            c$1('&::after', {
                bottom: '-1px'
            })
        ]),
        c$1('.mc-button:last-child:not(:first-child)', {
            borderTopLeftRadius: 0,
            borderTopRightRadius: 0
        }),
        c$1('.mc-button:first-child:not(:last-child)', {
            borderBottomLeftRadius: 0,
            borderBottomRightRadius: 0
        }),
        c$1('.mc-button:not(:last-child):not(:first-child)', {
            borderRadius: 0
        })
    ]),
    c$1('.mc-button', {
        background: 'var(--button-default-background-color)',
        border: 'none',
        cursor: 'pointer',
        display: 'inline-flex',
        padding: 'var(--button-padding)',
        width: 'var(--button-width)',
        height: 'var(--button-height)',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        fontFamily: 'v-sans',
        borderRadius: 'var(--button-radius)',
        color: 'var(--button-default-color)',
        fontSize: 'var(--button-font-size)',
        transition: 'background-color 0.2s',
        flexDirection: 'var(--button-flex-direction)'
    }, [
        c$1('&__icon, &__content', {
            transition: 'color 0.2s',
            fontSize: 'inherit',
            lineHeight: 1
        }),
        c$1('&__icon', {
            display: 'flex',
            fontSize: 'var(--button-icon-size)'
        }),
        c$1('&__icon-loading', {
            display: 'inline-block',
            border: '2px solid rgba(0, 0, 0, 0.1)',
            borderLeftColor: 'var(--button-default-color)',
            borderRadius: '50%',
            width: '14px',
            height: '14px',
            animation: 'mc-button-icon-loading-spin 1.2s linear infinite',
            transition: 'background-color 0.2s'
        }),
        c$1('& > span.left:not(:last-child)', {
            marginRight: 'var(--button-icon-margin)'
        }),
        c$1('& > span.right:not(:last-child)', {
            marginLeft: 'var(--button-icon-margin)'
        }),
        c$1('&--rippling::after', {
            animation: 'mc-button-border-ripple-out 0.5s'
        }),
        c$1('&::before, &::after', {
            content: "''",
            position: 'absolute',
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            borderRadius: 'inherit',
            boxSizing: 'border-box',
            border: ' 1px solid var(--button-default-border-color)'
        }),
        c$1('&::after', {
            transition: 'border-color 0.2s'
        }),
        c$1('&:hover', {
            color: 'var(--button-hover-color)',
            background: 'var(--button-hover-background-color)'
        }, [
            c$1('&::after', {
                borderColor: 'var(--button-hover-border-color)'
            }),
            c$1('.mc-button__icon-loading', {
                borderLeftColor: 'var(--button-hover-color)'
            })
        ]),
        c$1('&:focus', {
            color: 'var(--button-hover-color)',
            outline: 'none',
            background: 'var(--button-hover-background-color)'
        }, [
            c$1('&::after', {
                borderColor: 'var(--button-hover-border-color)'
            }),
            c$1('.mc-button__icon-loading', {
                borderLeftColor: 'var(--button-hover-color)'
            })
        ]),
        c$1('&:active', {
            color: 'var(--button-active-color)',
            background: 'var(--button-active-background-color)'
        }, [
            c$1('&::after', {
                borderColor: 'var(--button-active-border-color)'
            }),
            c$1('.mc-button__icon-loading', {
                borderLeftColor: 'var(--button-active-color)'
            })
        ]),
        c$1('&:disabled', {
            cursor: 'not-allowed',
            color: 'var(--button-disabled-color)',
            background: 'var(--button-disabled-background-color)'
        }, [
            c$1('&::after', {
                borderColor: 'var(--button-disabled-border-color)'
            }),
            c$1('.mc-button__icon-loading', {
                borderLeftColor: 'var(--button-disabled-color)'
            })
        ])
    ]),
    c$1('.mc-button--dashed', [
        c$1('&::before, &::after', {
            borderStyle: 'dashed'
        })
    ]),
    c$1('.mc-button--text', [
        c$1('&.mc-button--disabled, &:hover, &:focus', {
            background: 'rgba(0, 0, 0, 0.02)'
        })
    ]),
    c$1('@keyframes mc-button-border-ripple-out', {
        from: {
            boxShadow: '0 0 0.5px 0 var(--button-active-border-color)'
        },
        to: {
            boxShadow: '0 0 0.5px 4px var(--button-ripple-color)'
        }
    }),
    c$1('@keyframes mc-button-icon-loading-spin', {
        '0%': {
            transform: 'rotate(0deg)'
        },
        '100%': {
            transform: 'rotate(360deg)'
        }
    })
]);

const SIZE_MAP$1 = {
    mini: {
        height: '20px',
        padding: '0 4px',
        fontSize: '12px',
        iconSize: '14px',
        iconMargin: '2px'
    },
    small: {
        height: '26px',
        padding: '0 8px',
        fontSize: '13px',
        iconSize: '16px',
        iconMargin: '3px'
    },
    medium: {
        height: '32px',
        padding: '0 12px',
        fontSize: '14px',
        iconSize: '18px',
        iconMargin: '4px'
    },
    large: {
        height: '38px',
        padding: '0 16px',
        fontSize: '16px',
        iconSize: '20px',
        iconMargin: '5px'
    }
};
var McButton = defineComponent({
    name: 'Button',
    iKey: buttonIKey,
    props: buttonProps,
    setup(props, { slots, expose }) {
        // theme register
        onMounted(() => {
            useThemeRegister({
                key: 'McButton',
                main: mainCssr$e
            });
        });
        const { type, size, disabled, ghost, dashed, render, round, circle, block, loading, iconRight, color, textColor, borderColor, colorSet, textColorSet, borderColorSet } = toRefs(props);
        const buttonElRef = ref();
        const isRippling = ref(false);
        const isDefault = computed(() => type.value === 'default');
        const isCustom = computed(() => type.value === 'custom');
        const isNotNormal = computed(() => render.value !== 'normal');
        const isTransparent = or(ghost, dashed, isNotNormal.value);
        const customWithoutColor = and(isCustom, not(color));
        const useDefaultColor = and(customWithoutColor, not(textColor));
        const useDefaultBorderColor = and(customWithoutColor, not(borderColor));
        const useDefaultBackgroundColor = and(customWithoutColor);
        const cssVars = computed(() => {
            const { value: buttonColor } = buttonColorMap;
            const compositeInputColor = type.value === 'custom'
                ? {
                    color: textColor.value || color.value || buttonColor.custom.color,
                    borderColor: borderColor.value || color.value || buttonColor.custom.borderColor,
                    backgroundColor: color.value || buttonColor.custom.backgroundColor
                }
                : {
                    color: buttonColor[type.value].color,
                    borderColor: buttonColor[type.value].borderColor,
                    backgroundColor: buttonColor[type.value].backgroundColor
                };
            const { default: defaultColorSet, hover: hoverColorSet, active: activeColorSet, disabled: disabledColorSet } = useColorFactory(compositeInputColor);
            const { default: defaultButtonDefaultColorSet, hover: defaultButtonHoverColorSet, active: defaultButtonActiveColorSet, disabled: defaultButtonDisabledColorSet } = defaultButtonColorMap.value;
            const buttonSizeSet = SIZE_MAP$1[size.value];
            const sizeVars = {
                '--button-width': circle.value ? buttonSizeSet.height : block.value ? '100%' : 'initial',
                '--button-height': buttonSizeSet.height,
                '--button-padding': buttonSizeSet.padding,
                '--button-font-size': buttonSizeSet.fontSize,
                '--button-icon-size': buttonSizeSet.iconSize,
                '--button-icon-margin': buttonSizeSet.iconMargin,
                '--button-radius': circle.value ? '50%' : round.value ? buttonSizeSet.height : '3px'
            };
            const colorVars = isCustom.value
                ? {
                    '--button-default-color': textColorSet.value?.default ?? (useDefaultColor.value ? '#000' : or(textColor, isTransparent).value ? defaultColorSet.color : '#fff'),
                    '--button-default-border-color': borderColorSet.value?.default ?? (isNotNormal.value ? 'transparent' : useDefaultBorderColor.value ? '#e0e0e6' : defaultColorSet.borderColor),
                    '--button-default-background-color': colorSet.value?.default ?? (isTransparent.value ? 'transparent' : useDefaultBackgroundColor.value ? '#fff' : defaultColorSet.backgroundColor),
                    '--button-hover-color': textColorSet.value?.hover ?? (useDefaultColor.value ? '#059669' : or(textColor, isTransparent).value ? hoverColorSet.color : '#fff'),
                    '--button-hover-border-color': borderColorSet.value?.hover ?? (isNotNormal.value ? 'transparent' : useDefaultBorderColor.value ? '#10b981' : hoverColorSet.borderColor),
                    '--button-hover-background-color': colorSet.value?.hover ?? (isTransparent.value ? 'transparent' : useDefaultBackgroundColor.value ? '#fff' : hoverColorSet.backgroundColor),
                    '--button-active-color': textColorSet.value?.active ?? (useDefaultColor.value ? '#15803d' : or(textColor, isTransparent).value ? activeColorSet.color : '#fff'),
                    '--button-active-border-color': borderColorSet.value?.active ?? (isNotNormal.value ? 'transparent' : useDefaultBorderColor.value ? '#15803d' : activeColorSet.borderColor),
                    '--button-active-background-color': colorSet.value?.active ?? (isTransparent.value ? 'transparent' : useDefaultBackgroundColor.value ? '#fff' : activeColorSet.backgroundColor),
                    '--button-disabled-color': textColorSet.value?.disabled ?? (useDefaultColor.value ? '#aaa' : or(textColor, isTransparent).value ? disabledColorSet.color : '#fff'),
                    '--button-disabled-border-color': borderColorSet.value?.disabled ?? (isNotNormal.value ? 'transparent' : useDefaultBorderColor.value ? '#eee' : disabledColorSet.borderColor),
                    '--button-disabled-background-color': colorSet.value?.disabled ?? (isTransparent.value ? 'transparent' : useDefaultBackgroundColor.value ? '#fff' : disabledColorSet.backgroundColor)
                }
                : {
                    '--button-default-color': isDefault.value ? defaultButtonDefaultColorSet.color : isTransparent.value ? defaultColorSet.color : defaultButtonDefaultColorSet.backgroundColor,
                    '--button-default-border-color': isNotNormal.value ? 'transparent' : isDefault.value ? defaultButtonDefaultColorSet.borderColor : defaultColorSet.borderColor,
                    '--button-default-background-color': isTransparent.value ? 'transparent' : isDefault.value ? defaultButtonDefaultColorSet.backgroundColor : defaultColorSet.backgroundColor,
                    '--button-hover-color': isDefault.value ? defaultButtonHoverColorSet.color : isTransparent.value ? hoverColorSet.color : defaultButtonHoverColorSet.backgroundColor,
                    '--button-hover-border-color': isNotNormal.value ? 'transparent' : isDefault.value ? defaultButtonHoverColorSet.borderColor : hoverColorSet.borderColor,
                    '--button-hover-background-color': isTransparent.value ? 'transparent' : isDefault.value ? defaultButtonHoverColorSet.backgroundColor : hoverColorSet.backgroundColor,
                    '--button-active-color': isDefault.value ? defaultButtonActiveColorSet.color : isTransparent.value ? activeColorSet.color : defaultButtonActiveColorSet.backgroundColor,
                    '--button-active-border-color': isNotNormal.value ? 'transparent' : isDefault.value ? defaultButtonActiveColorSet.borderColor : activeColorSet.borderColor,
                    '--button-active-background-color': isTransparent.value ? 'transparent' : isDefault.value ? defaultButtonActiveColorSet.backgroundColor : activeColorSet.backgroundColor,
                    '--button-disabled-color': isDefault.value ? defaultButtonDisabledColorSet.color : isTransparent.value ? disabledColorSet.color : defaultButtonDisabledColorSet.backgroundColor,
                    '--button-disabled-border-color': isNotNormal.value ? 'transparent' : isDefault.value ? defaultButtonDisabledColorSet.borderColor : disabledColorSet.borderColor,
                    '--button-disabled-background-color': isTransparent.value ? 'transparent' : isDefault.value ? defaultButtonDisabledColorSet.backgroundColor : disabledColorSet.backgroundColor
                };
            return {
                ...colorVars,
                ...sizeVars,
                '--button-ripple-color': setColorAlpha(colorVars['--button-active-border-color'], 0),
                '--button-flex-direction': iconRight.value ? 'row-reverse' : 'row'
            };
        });
        const iconVNode = computed(() => {
            return loading.value
                ? createVNode('span', { class: ['mc-button__icon-loading', iconRight.value ? 'right' : 'left'] }, null, 2 /* CLASS */)
                : slots.icon
                    ? createVNode('span', { class: ['mc-button__icon', iconRight.value ? 'right' : 'left'] }, [renderSlot$1(slots, 'icon')], 2 /* CLASS */)
                    : null;
        });
        const contentVNode = computed(() => {
            return slots.default ? createVNode('span', { class: 'mc-button__content' }, [renderSlot$1(slots, 'default')]) : null;
        });
        expose({
            el: buttonElRef
        });
        return () => createVNode('button', {
            ref_key: 'buttonElRef',
            ref: buttonElRef,
            class: [
                'mc-button',
                `mc-button--${render.value}`,
                `mc-button--${type.value}`,
                `mc-button--${size.value}`,
                {
                    'mc-button--block': block.value,
                    'mc-button--disabled': disabled.value,
                    'mc-button--ghost': ghost.value,
                    'mc-button--dashed': dashed.value,
                    'mc-button--round': round.value,
                    'mc-button--circle': circle.value,
                    'mc-button--rippling': isRippling.value
                }
            ],
            style: cssVars.value,
            disabled: disabled.value,
            onMousedown() {
                if (isRippling.value)
                    isRippling.value = false;
            },
            onClick() {
                isRippling.value = true;
            },
            onAnimationend(e) {
                if (e.animationName === 'mc-button-border-ripple-out') {
                    isRippling.value = false;
                }
            }
        }, [iconVNode.value, contentVNode.value], 2 /* CLASS */ | 4 /* STYLE */ | 8 /* PROPS */, ['disabled']);
    }
});

var ButtonGroup = defineComponent({
    name: 'ButtonGroup',
    props: buttonGroupProps,
    setup(props, { slots }) {
        const { type, size, disabled, ghost, dashed, render, vertical } = toRefs(props);
        return () => {
            const buttons = flattenWithOptions({ slots, key: buttonIKey });
            return createVNode('div', { class: ['mc-button-group', { 'mc-button-group--vertical': vertical.value }], role: 'group' }, renderList(buttons, button => {
                return createVNode(button, {
                    type: type.value,
                    size: size.value,
                    disabled: disabled.value,
                    ghost: ghost.value,
                    dashed: dashed.value,
                    render: render.value
                });
            }), 2 /* CLASS */ | 256 /* UNKEYED_FRAGMENT */);
        };
    }
});

var mainCssr$d = c$1([
    c$1('.mc-icon', {
        height: '1em',
        width: '1em',
        lineHeight: '1em',
        textAlign: 'center',
        display: 'inline-block',
        position: 'relative',
        fill: 'currentColor',
        transform: 'translateZ(0)',
        color: 'var(--icon-color)',
        fontSize: 'var(--icon-font-size)'
    }, [
        c$1('&--spinning', {
            animation: 'mc-icon-spinning var(--icon-spinning-speed) linear infinite'
        })
    ]),
    c$1('@keyframes mc-icon-spinning', {
        '0%': {
            transform: 'rotate(0deg)'
        },
        '100%': {
            transform: 'rotate(360deg)'
        }
    })
]);

const iconProps = {
    size: {
        type: Number,
        default: undefined
    },
    color: {
        type: String,
        default: undefined
    },
    spin: {
        type: Boolean,
        default: false
    },
    speed: {
        type: String,
        default: 'normal'
    },
    icon: {
        type: Object,
        default: undefined
    }
};

var McIcon = defineComponent({
    name: 'Icon',
    props: iconProps,
    setup(props, { slots }) {
        // theme register
        onMounted(() => {
            useThemeRegister({
                key: 'McIcon',
                main: mainCssr$d
            });
        });
        const { size, color, spin, speed, icon } = toRefs(props);
        const spinningSpeed = computed(() => {
            switch (speed.value) {
                case 'slow':
                    return '2s';
                case 'normal':
                    return '1.6s';
                case 'fast':
                    return '1.2s';
                default:
                    return '1.6s';
            }
        });
        const cssVars = computed(() => {
            return {
                '--icon-color': color.value ?? 'initial',
                '--icon-font-size': size.value ? `${size.value}px` : 'initial',
                '--icon-spinning-speed': spinningSpeed.value
            };
        });
        return () => createElementVNode('i', {
            role: 'img',
            class: ['mc-icon', { 'mc-icon--spinning': spin.value }],
            style: cssVars.value
        }, [icon.value ? createComponentVNode(icon.value) : getSlotFirstVNode(slots.default)], 2 /* CLASS */ | 4 /* STYLE */);
    }
});

const popconfirmProps = {
    cancelText: {
        type: [String, Object],
        default: '取消'
    },
    confirmText: {
        type: [String, Object],
        default: '确定'
    },
    cancelDisabled: {
        type: Boolean,
        default: false
    },
    confirmDisabled: {
        type: Boolean,
        default: false
    },
    hideIcon: {
        type: Boolean,
        default: false
    },
    onCancel: {
        type: Function,
        default: undefined
    },
    onConfirm: {
        type: Function,
        default: undefined
    },
    contentStyle: {
        type: [String, Object],
        default: undefined
    }
};
const popconfirmEmits = [];

var mainCssr$c = c$1('.mc-popconfirm', [
    c$1('&__content', {
        display: 'flex',
        alignItems: 'center',
        minWidth: '110px'
    }),
    c$1('&__action', {
        display: 'flex',
        justifyContent: 'end',
        marginTop: '8px'
    })
]);

const defaultPropsOverride$1 = {
    trigger: {
        type: String,
        default: 'click'
    }
};
var Popconfirm = defineComponent({
    name: 'Popconfirm',
    props: {
        ...popoverProps,
        ...popconfirmProps,
        ...defaultPropsOverride$1
    },
    emits: [...popoverEmits, ...popconfirmEmits],
    setup(props, { slots }) {
        // theme register
        onMounted(() => {
            useThemeRegister({
                key: 'McPopconfirm',
                main: mainCssr$c
            });
        });
        const { cancelText, cancelDisabled, confirmText, confirmDisabled, hideIcon, onCancel, onConfirm } = toRefs(props);
        const popoverRef = ref();
        const handleCancel = async () => {
            if (onCancel.value) {
                const { value: cancel } = onCancel;
                const callback = await cancel();
                if (!callback || callback === undefined) {
                    popoverRef?.value?.hide();
                }
            }
            else {
                popoverRef?.value?.hide();
            }
        };
        const handleConfirm = async () => {
            if (onConfirm.value) {
                const { value: confirm } = onConfirm;
                const callback = await confirm();
                if (!callback || callback === undefined) {
                    popoverRef?.value?.hide();
                }
            }
            else {
                popoverRef?.value?.hide();
            }
        };
        const getActionVNode = () => {
            const showCancel = cancelText.value !== null;
            const showConfirm = confirmText.value !== null;
            const hasActionSlot = !!slots.action;
            const needActionBlock = showCancel || showConfirm || hasActionSlot;
            return needActionBlock
                ? createVNode('div', {
                    class: 'mc-popconfirm__action'
                }, [
                    hasActionSlot
                        ? renderSlot$1(slots, 'action')
                        : createVNode(Fragment, null, [
                            showCancel ? createVNode(McButton, { size: 'small', ghost: true, disabled: cancelDisabled.value, onClick: handleCancel }, { default: () => cancelText.value }) : null,
                            showConfirm ? createVNode(McButton, { size: 'small', type: 'success', disabled: confirmDisabled.value, style: { marginLeft: '8px' }, onClick: handleConfirm }, { default: () => confirmText.value }) : null
                        ])
                ])
                : null;
        };
        return () => {
            const iconVNode = hideIcon.value ? null : getSlotFirstVNode(slots.icon) || createVNode(McIcon, { size: 22, color: '#f59e0b', style: { 'margin-right': '8px' } }, { default: () => createVNode(IconAlert) });
            const mergedProps = mergeProps(omit$1(props, Object.keys(popconfirmProps)), {
                ref: popoverRef,
                class: 'mc-popconfirm'
            });
            return createVNode(McPopover, mergedProps, {
                default: () => renderSlot$1(slots, 'default'),
                content: () => createVNode(Fragment, null, [
                    createVNode('div', {
                        class: 'mc-popconfirm__content'
                    }, [iconVNode, propsMergeSlots(props, slots, 'content')]),
                    getActionVNode()
                ])
            });
        };
    }
});

const popselectProps = {
    value: {
        type: [String, Number, Array],
        default: undefined
    },
    options: {
        type: Array,
        default: []
    },
    multiple: {
        type: Boolean,
        default: false
    },
    maxHeight: {
        type: Number,
        default: 300
    },
    autoClose: {
        type: Boolean,
        default: undefined
    },
    autoScroll: {
        type: Boolean,
        default: true
    },
    truncate: {
        type: [Boolean, Number],
        default: 200
    }
};
const popselectEmits = ['update:value', 'select'];

var mainCssr$b = c$1('.mc-popselect', [
    c$1('.mc-popselect-option', {
        padding: '8px 12px',
        cursor: 'pointer',
        borderRadius: '4px',
        transition: 'background-color .2s'
    }, [
        c$1('&:not(:last-child)', {
            marginBottom: '4px'
        }),
        c$1('&--disabled', {
            cursor: 'not-allowed'
        }),
        c$1('&__inner', {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
        }, [
            c$1('& > div.truncate', {
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                maxWidth: 'var(--popselect-inner-max-width)'
            })
        ])
    ])
]);

var lightCssr$a = c$1('.mc-popselect', [
    c$1('.mc-popselect-option', [
        c$1('&:not(&--disabled):hover', {
            background: '#f2fcf8'
        }),
        c$1('&--selected', {
            background: '#f2fcf8',
            color: '#10b981'
        }),
        c$1('&--disabled', {
            color: '#bbb',
            background: ' rgba(0, 0, 0, 0.02)'
        })
    ])
]);

var darkCssr$a = c$1('.mc-popselect', [
    c$1('.mc-popselect-option', [
        c$1('&:not(&--disabled):hover', {
            background: '#1f2430'
        }),
        c$1('&--selected', {
            background: '#1f2430',
            color: '#63e2b7'
        }),
        c$1('&--disabled', {
            color: '#7a7d85'
        })
    ])
]);

const defaultPropsOverride = {
    placement: {
        type: String,
        default: 'bottom'
    }
};
var Popselect = defineComponent({
    name: 'Popselect',
    props: {
        ...popoverProps,
        ...popselectProps,
        ...defaultPropsOverride
    },
    emits: [...popoverEmits, ...popselectEmits],
    setup(props, { slots, attrs, emit }) {
        // theme register
        onMounted(() => {
            useThemeRegister({
                key: 'McPopselect',
                main: mainCssr$b,
                light: lightCssr$a,
                dark: darkCssr$a
            });
        });
        const { value: valueVM, options, multiple, maxHeight, autoClose, autoScroll, truncate, matchTrigger } = toRefs(props);
        const popoverRef = ref();
        const cssVars = computed(() => {
            return {
                '--popselect-inner-max-width': typeof truncate.value === 'number' ? `${truncate.value}px` : '200px'
            };
        });
        let scrollToOption;
        const handleShow = () => {
            nextTick(() => {
                const index = options.value?.findIndex(e => e.value === (multiple.value ? valueVM.value[0] : valueVM.value));
                index && scrollToOption(index);
            });
        };
        const handleHide = () => {
            if ((autoClose.value === undefined && !multiple.value) || autoClose.value) {
                requestAnimationFrame(() => {
                    popoverRef?.value?.hide();
                });
            }
        };
        const createOptionVNode = (data) => {
            const { label, value, disabled } = data;
            const isDisabled = !!disabled;
            const isSelected = multiple.value ? valueVM.value.includes(value) : valueVM.value === value;
            const checkIconVNode = multiple.value && isSelected ? createComponentVNode(McIcon, { size: 16, style: 'margin-left: 8px' }, { default: () => createComponentVNode(IconCheck) }) : null;
            const option = toRaw(options.value?.find(e => e.value === value));
            const handleUpdateValue = (value) => {
                if (multiple.value) {
                    const index = valueVM.value.indexOf(value);
                    if (index === -1) {
                        valueVM.value.push(value);
                    }
                    else {
                        valueVM.value.splice(index, 1);
                    }
                    emit('update:value', toRaw(valueVM.value), option);
                }
                else {
                    emit('update:value', value, option);
                }
            };
            return createElementVNode('div', {
                class: ['mc-popselect-option', { 'mc-popselect-option--selected': isSelected, 'mc-popselect-option--disabled': isDisabled }],
                onClick: () => {
                    if (isDisabled)
                        return;
                    valueVM.value && handleUpdateValue(value);
                    emit('select', value);
                    handleHide();
                }
            }, [
                createElementVNode('div', {
                    class: 'mc-popselect-option__inner'
                }, [createElementVNode('div', { class: { truncate: truncate.value } }, [typeof label === 'string' ? label : label()], 2 /* CLASS */), checkIconVNode])
            ], 2 /* CLASS */);
        };
        return () => {
            const itemHeight = 41;
            const listHeight = options.value ? Math.min(options.value.length * itemHeight, maxHeight.value ?? 0) : 0;
            const { list, containerProps, wrapperProps, scrollTo } = useVirtualList(isReactive(options.value) ? options.value : reactive(options.value), {
                // Keep `itemHeight` in sync with the item's row.
                itemHeight
            });
            scrollToOption = scrollTo;
            const mergedProps = mergeProps(omit$1(props, Object.keys(popselectProps)), {
                ref_key: 'popoverRef',
                ref: popoverRef,
                class: 'mc-popselect',
                style: {
                    padding: '0px',
                    minWidth: matchTrigger.value ? 'none' : '110px',
                    ...cssVars.value
                }
            });
            return createComponentVNode(McPopover, {
                ...mergedProps,
                onShow: (...args) => {
                    autoScroll.value && handleShow();
                    attrs.show && attrs.onShow(...args);
                }
            }, {
                default: () => renderSlot$1(slots, 'default'),
                content: () => createElementVNode('div', {
                    ...containerProps,
                    class: 'mc-popselect__content',
                    style: { height: listHeight + 'px', overflow: 'auto', padding: '4px 4px 0px 4px' }
                }, [
                    createElementVNode('div', wrapperProps.value, createDirectives('v-for', list.value, item => createOptionVNode(item.data)), 4 /* STYLE */)
                ], 4 /* STYLE */)
            }, 16 /* FULL_PROPS */);
        };
    }
});

const textLinkProps = {
    type: {
        type: String,
        default: 'success'
    },
    to: {
        type: String,
        default: '#'
    },
    underline: {
        type: Boolean,
        default: false
    },
    block: {
        type: Boolean,
        default: false
    },
    trigger: {
        type: String,
        default: 'always'
    },
    color: {
        type: String,
        default: undefined
    },
    hoverColor: {
        type: String,
        default: undefined
    },
    raw: {
        type: Boolean,
        default: false
    }
};

var mainCssr$a = c$1([
    c$1('.mc-text-link', {
        color: 'var(--text-link-default-color)',
        cursor: 'pointer',
        textDecoration: 'none'
    }, [
        c$1('&:hover', {
            color: 'var(--text-link-hover-color)'
        }),
        c$1('&--block', {
            display: 'block',
            width: 'max-content'
        }),
        c$1('&.underline, &.underline-hover:hover', {
            textDecoration: 'underline'
        })
    ])
]);

const BASE_COLOR_MAP = {
    primary: {
        color: '#3b82f6'
    },
    success: {
        color: '#16a34a'
    },
    warning: {
        color: '#fb923c'
    },
    danger: {
        color: '#dc2626'
    },
    info: {
        color: '#6B7280'
    }
};
var TextLink = defineComponent({
    name: 'TextLink',
    props: textLinkProps,
    setup(props, { slots }) {
        onMounted(() => {
            useThemeRegister({
                key: 'McTextLink',
                main: mainCssr$a
            });
        });
        const { type, to, underline, trigger, color, hoverColor, block, raw } = toRefs(props);
        const showUnderline = computed(() => {
            if (!underline.value)
                return '';
            switch (trigger.value) {
                case 'always':
                    return 'underline';
                case 'hover':
                    return 'underline-hover';
                default:
                    return '';
            }
        });
        const cssVars = computed(() => {
            const compositeInputColor = {
                color: color.value || BASE_COLOR_MAP[type.value].color
            };
            const { default: defaultColorSet, hover: hoverColorSet, active: activeColorSet, disabled: disabledColorSet } = useColorFactory(compositeInputColor, {
                hover: [0, 0, 0, 0.12]
            });
            return {
                '--text-link-default-color': color.value || defaultColorSet.color,
                '--text-link-hover-color': hoverColor.value || hoverColorSet.color,
                '--text-link-active-color': activeColorSet.color,
                '--text-link-disabled-color': disabledColorSet.color
            };
        });
        return () => {
            const textContent = getSlotFirstVNode(slots.default)?.children ?? '';
            const isEmail = typeof textContent === 'string' && /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/.test(textContent);
            return createVNode('a', {
                class: ['mc-text-link', { 'mc-text-link--block': block.value }, showUnderline.value],
                style: cssVars.value,
                href: isEmail ? (!raw.value ? `mailto:${textContent}` : '#') : to.value
            }, [renderSlot$1(slots, 'default')]);
        };
    }
});

const tooltipProps = {};

var lightCssr$9 = c$1('.mc-tooltip', {
    background: '#000',
    color: '#fff'
});

var darkCssr$9 = c$1('.mc-tooltip', {
    background: '#313540',
    color: '#fff'
});

var McTooltip = defineComponent({
    name: 'Tooltip',
    props: {
        ...popoverProps,
        ...tooltipProps
    },
    setup(props, { slots }) {
        // theme register
        onMounted(() => {
            useThemeRegister({
                key: 'McTooltip',
                light: lightCssr$9,
                dark: darkCssr$9
            });
        });
        return () => {
            const mergedProps = mergeProps(omit$1(props, Object.keys(tooltipProps)), {
                class: 'mc-tooltip'
            });
            return createComponentVNode(McPopover, mergedProps, {
                default: () => renderSlot$1(slots, 'default'),
                content: () => propsMergeSlots(props, slots, 'content'),
                _: 3 /* FORWARDED */
            }, 16 /* FULL_PROPS */);
        };
    }
});

const tabsInjectionKey = Symbol();
const tabPaneIKey = Symbol('TabPane');
const tabIKey = Symbol('Tab');
const tabsProps = {
    value: {
        type: [String, Number],
        default: undefined
    },
    defaultTab: {
        type: [String, Number],
        default: undefined
    },
    type: {
        type: String,
        default: 'bar'
    },
    showLine: {
        type: Boolean,
        default: true
    },
    stretch: {
        type: Boolean,
        default: false
    },
    center: {
        type: Boolean,
        default: false
    },
    tabGap: {
        type: Number,
        default: 40
    },
    animation: {
        type: String,
        default: 'slide'
    },
    activeColor: {
        type: String,
        default: ''
    },
    barPosition: {
        type: String,
        default: 'bottom'
    },
    headerStyle: {
        type: [String, Object],
        default: undefined
    },
    headerClass: {
        type: String,
        default: undefined
    },
    contentStyle: {
        type: [String, Object],
        default: undefined
    },
    contentClass: {
        type: String,
        default: undefined
    },
    onBeforeTabSwitch: {
        type: Function,
        default: undefined
    }
};
const tabPaneProps = {
    name: {
        type: [String, Number],
        default: undefined
    },
    tabLabel: {
        type: [String, Function],
        default: undefined
    },
    tabStyle: {
        type: [String, Object],
        default: undefined
    },
    tabClass: {
        type: String,
        default: undefined
    },
    disabled: {
        type: Boolean,
        default: false
    },
    preload: {
        type: Boolean,
        default: false
    },
    lazy: {
        type: Boolean,
        default: false
    }
};
const tabProps = {
    name: {
        type: [String, Number],
        default: undefined
    },
    disabled: {
        type: Boolean,
        default: false
    }
};

var McTab = defineComponent({
    name: 'Tab',
    iKey: tabIKey,
    props: tabProps,
    setup(props, { slots }) {
        const valueRef = inject(tabsInjectionKey, null);
        if (!valueRef) {
            throw new Error('[McTab]: McTab must be placed inside McTabs.');
        }
        return () => createVNode('div', {
            class: 'mc-tabs-tab'
        }, [renderSlot$1(slots, 'default')]);
    }
});

var mainCssr$9 = c$1([
    c$1('.mc-tabs', [
        c$1('&__header-scroll-content', {
            display: 'flex',
            position: 'relative',
            minWidth: 'max-content'
        }),
        c$1('&-tab', {
            cursor: 'pointer',
            display: 'inline-flex',
            justifyContent: 'space-evenly',
            alignItems: 'center'
        }),
        c$1('&-tab--disabled', {
            cursor: 'not-allowed'
        })
    ]),
    c$1('.mc-tabs__header', [
        c$1('&--center &-scroll-content', {
            justifyContent: 'center'
        }),
        c$1('&--stretch .mc-tabs-tab', {
            flex: 1
        }),
        c$1('&--with-line', [
            c$1('.mc-tabs__header-bar--bottom + .mc-tabs__header-scroll-content', {
                borderTop: 'none'
            }),
            c$1('.mc-tabs__header-bar--top + .mc-tabs__header-scroll-content', {
                borderBottom: 'none'
            })
        ]),
        c$1('&-bar', {
            transition: '0.2s',
            position: 'absolute',
            width: '8192px'
        })
    ]),
    c$1('.mc-tabs__content', {
        paddingTop: '12px',
        overflow: 'auto'
    }),
    c$1('.mc-tabs--bar .mc-tabs__header', {
        position: 'relative'
    }, [
        c$1('.mc-tabs-tab', {
            margin: '0 var(--tab-gap)',
            padding: '12px 0',
            position: 'relative'
        }, [
            c$1('&:first-child', {
                marginLeft: 0
            }),
            c$1('&:last-child', {
                marginRight: 0
            }),
            c$1('&__label', {
                display: 'flex'
            })
        ]),
        c$1('&--bar-scale .mc-tabs-tab', [
            c$1('&::after', {
                content: "''",
                position: 'absolute',
                left: 0,
                bottom: '-1px',
                width: '100%',
                height: '2px',
                transition: 'transform 0.25s ease-in-out',
                transform: 'scaleX(0)'
            }),
            c$1('&--active::after', {
                transform: 'scaleX(1)'
            })
        ]),
        c$1('&-bar', {
            zIndex: 1,
            height: '2px'
        }, [c$1('&--bottom', { bottom: 0 }), c$1('&--top', { top: 0 })])
    ]),
    c$1('.mc-tabs--empty .mc-tabs-tab', {
        margin: '0 var(--tab-gap)',
        padding: '12px 0'
    }, [
        c$1('&:first-child', {
            marginLeft: 0
        }),
        c$1('&:last-child', {
            marginRight: 0
        }),
        c$1('&__label', {
            display: 'flex'
        })
    ]),
    c$1('.mc-tabs--card .mc-tabs-tab', {
        padding: '8px var(--tab-gap)',
        transition: '0.2s'
    }, [
        c$1('&--active', {
            position: 'relative'
        }, [
            c$1('&::before', {
                content: "''",
                position: 'absolute',
                left: 0,
                top: 0,
                width: '100%',
                height: '2px'
            }),
            c$1('&::after', {
                content: "''",
                position: 'absolute',
                left: 0,
                bottom: '-1px',
                width: '100%',
                height: '1px'
            })
        ])
    ]),
    c$1('.mc-tabs--segment', [
        c$1('.mc-tabs__header', {
            alignItems: 'center',
            boxSizing: 'border-box',
            borderRadius: '4px',
            position: 'relative'
        }, [
            c$1('&-scroll-content', {
                padding: '2px'
            }),
            c$1('&-bar', {
                borderRadius: '4px',
                top: '2px',
                height: 'calc(100% - 4px)',
                boxShadow: '0px 1px 4px 0px rgba(0, 0, 0, 0.02), 0px 2px 12px 0px rgba(0, 0, 0, 0.04), 0px 2px 6px 0px rgba(0, 0, 0, 0.02)'
            }),
            c$1('&--bar-fade .mc-tabs-tab', {
                transition: 'background 0.2s'
            }, [
                c$1('&--active', {
                    boxShadow: '0px 1px 4px 0px rgba(0, 0, 0, 0.02), 0px 2px 12px 0px rgba(0, 0, 0, 0.04), 0px 2px 6px 0px rgba(0, 0, 0, 0.02)'
                })
            ])
        ]),
        c$1('.mc-tabs-tab', {
            padding: '4px 0',
            borderRadius: '2px',
            margin: 0,
            flex: 1
        }, [c$1('&--active', { fontWeight: 'bold' })])
    ])
]);

var lightCssr$8 = c$1([
    c$1('.mc-tabs', [
        c$1('&-tab', [
            c$1('&:hover', {
                color: 'var(--tab-active-color, #10b981)'
            })
        ]),
        c$1('&-tab--active', {
            color: 'var(--tab-active-color, #10b981)'
        }),
        c$1('&-tab--disabled', {
            color: '#bbb'
        }, [
            c$1('&:hover', {
                color: '#bbb'
            })
        ])
    ]),
    c$1('.mc-tabs__header', [
        c$1('&--with-line', [
            c$1('.mc-tabs__header-scroll-content', {
                borderBottom: '1px solid #e4e7ed'
            }),
            c$1('.mc-tabs__header-bar--bottom + .mc-tabs__header-scroll-content', {
                borderBottom: '1px solid #e4e7ed'
            }),
            c$1('.mc-tabs__header-bar--top + .mc-tabs__header-scroll-content', {
                borderTop: '1px solid #e4e7ed'
            })
        ])
    ]),
    c$1('.mc-tabs--bar .mc-tabs__header', [
        c$1('&--bar-scale .mc-tabs-tab', [
            c$1('&::after', {
                background: 'var(--tab-active-color, #10b981)'
            })
        ]),
        c$1('&-bar', {
            background: 'var(--tab-active-color, #10b981)'
        })
    ]),
    c$1('.mc-tabs--card .mc-tabs-tab', [
        c$1('&--active', {
            background: '#f2fcf8'
        }, [
            c$1('&::before', {
                background: '#10b981'
            }),
            c$1('&::after', {
                background: 'inherit'
            })
        ])
    ]),
    c$1('.mc-tabs--segment', [
        c$1('.mc-tabs__header', {
            background: '#f6f6f9'
        }, [
            c$1('&-bar', {
                background: '#fff'
            }),
            c$1('&--bar-fade .mc-tabs-tab', [
                c$1('&--active', {
                    background: '#fff'
                })
            ])
        ])
    ])
]);

var darkCssr$8 = c$1([
    c$1('.mc-tabs', {
        color: '#eee'
    }, [
        c$1('&-tab', [
            c$1('&:hover', {
                color: 'var(--tab-active-color, #63e2b7)'
            })
        ]),
        c$1('&-tab--active', {
            color: 'var(--tab-active-color, #63e2b7)'
        }),
        c$1('&-tab--disabled', {
            color: '#7a7d85'
        }, [
            c$1('&:hover', {
                color: '#7a7d85'
            })
        ])
    ]),
    c$1('.mc-tabs__header', [
        c$1('&--with-line', [
            c$1('.mc-tabs__header-scroll-content', {
                borderBottom: '1px solid #7a7d85'
            }),
            c$1('.mc-tabs__header-bar--bottom + .mc-tabs__header-scroll-content', {
                borderBottom: '1px solid #7a7d85'
            }),
            c$1('.mc-tabs__header-bar--top + .mc-tabs__header-scroll-content', {
                borderTop: '1px solid #7a7d85'
            })
        ])
    ]),
    c$1('.mc-tabs--bar .mc-tabs__header', [
        c$1('&--bar-scale .mc-tabs-tab', [
            c$1('&::after', {
                background: 'var(--tab-active-color, #63e2b7)'
            })
        ]),
        c$1('&-bar', {
            background: 'var(--tab-active-color, #63e2b7)'
        })
    ]),
    c$1('.mc-tabs--card .mc-tabs-tab', [
        c$1('&--active', {
            background: '#1f2430'
        }, [
            c$1('&::before', {
                background: '#63e2b7'
            }),
            c$1('&::after', {
                background: '#1f2430'
            })
        ])
    ]),
    c$1('.mc-tabs--segment', [
        c$1('.mc-tabs__header', {
            background: '#313540'
        }, [
            c$1('&-bar', {
                background: '#1f2430'
            }),
            c$1('&--bar-fade .mc-tabs-tab', [
                c$1('&--active', {
                    background: '#1f2430'
                })
            ])
        ])
    ])
]);

var Tabs = defineComponent({
    name: 'Tabs',
    props: tabsProps,
    emits: ['update:value', 'tab-switch', 'tab-click'],
    setup(props, { slots, emit, expose }) {
        // theme register
        onMounted(() => {
            useThemeRegister({
                key: 'McTabs',
                main: mainCssr$9,
                light: lightCssr$8,
                dark: darkCssr$8
            });
        });
        const { value: valueVM, defaultTab, type, showLine, center, stretch, tabGap, animation, activeColor, barPosition, headerStyle, headerClass, contentStyle, contentClass, onBeforeTabSwitch } = toRefs(props);
        const activeTabName = ref(valueVM?.value || (defaultTab?.value ?? ''));
        const activeTabVNode = ref();
        const tabsElRef = ref();
        const headerElRef = ref();
        const barElRef = ref();
        const barUpdatedTimer = ref();
        const cssVars = computed(() => {
            return {
                // '--tab-default-color': defaultColor.value,
                '--tab-active-color': activeColor.value,
                '--tab-gap': stretch.value ? 0 : (tabGap.value ?? 0) / 2 + 'px'
            };
        });
        if (valueVM) {
            watch(valueVM, name => {
                name && handleBeforeTabSwitch(name);
            });
        }
        if (type.value === 'bar' || type.value === 'segment') {
            if (animation.value === 'slide') {
                watch(activeTabVNode, () => {
                    nextTick(() => {
                        updateBarStyle();
                    });
                });
                const { top, right, width, height } = useElementBounding(headerElRef);
                throttledWatch([top, right, width, height], () => {
                    clearBarUpdatedTimer();
                    const { value: barEl } = barElRef;
                    barEl.style.transition = '0s';
                    updateBarStyle();
                }, {
                    throttle: 32
                });
            }
        }
        const callUpdateTab = (name) => {
            activeTabName.value = name;
            valueVM && emit('update:value', name);
            emit('tab-switch', name);
        };
        const handleTabClick = (name) => {
            emit('tab-click', name);
            handleBeforeTabSwitch(name);
        };
        const handleBeforeTabSwitch = async (name) => {
            // callback only when the value is changed
            if (activeTabName.value !== name) {
                if (onBeforeTabSwitch?.value) {
                    const { value: beforeTabSwitch } = onBeforeTabSwitch;
                    const callback = await beforeTabSwitch(activeTabName.value, name);
                    if (callback || callback === undefined) {
                        callUpdateTab(name);
                    }
                }
                else {
                    callUpdateTab(name);
                }
            }
        };
        const clearBarUpdatedTimer = () => {
            window.clearTimeout(barUpdatedTimer.value);
            barUpdatedTimer.value = null;
        };
        const updateBarStyle = () => {
            if (!activeTabVNode.value)
                return;
            const { value: { el: activeTabEl } } = activeTabVNode;
            const { value: barEl } = barElRef;
            const { offsetWidth, offsetLeft } = activeTabEl;
            barEl.style.left = `${offsetLeft}px`;
            barEl.style.maxWidth = `${offsetWidth}px`;
            barUpdatedTimer.value = window.setTimeout(() => {
                barEl.style.transition = '0.2s';
            }, 64);
        };
        provide(tabsInjectionKey, activeTabName);
        const getTabVNode = (maybeTabPane) => {
            const { children, props, type } = maybeTabPane;
            const { name, tabLabel = '', tabStyle = '', tabClass = '', disabled = false } = kebabCaseEscape(props) ?? {};
            const isTab = type.iKey === tabIKey;
            const isActive = activeTabName.value === name;
            const isDisabled = typeof disabled === 'boolean' ? disabled : disabled === '';
            const tabVNode = createVNode(McTab, mergeProps(isTab ? maybeTabPane.props ?? {} : { style: tabStyle }, {
                class: [{ 'mc-tabs-tab--active': isActive, 'mc-tabs-tab--disabled': isDisabled }, tabClass],
                onClick: () => {
                    if (isDisabled)
                        return;
                    name !== undefined && handleTabClick(name);
                }
            }), {
                default: () => {
                    if (isTab) {
                        return children?.default?.() ?? null;
                    }
                    else {
                        return children?.tab?.() ?? [createVNode('span', { class: 'mc-tabs-tab__label' }, [typeof tabLabel === 'string' ? createTextVNode$1(tabLabel) : tabLabel()])];
                    }
                }
            });
            if (isActive) {
                activeTabVNode.value = tabVNode;
            }
            return tabVNode;
        };
        const lineBarVNode = computed(() => {
            if (type.value === 'bar') {
                if (animation.value === 'slide') {
                    return createVNode('div', {
                        ref: barElRef,
                        class: ['mc-tabs__header-bar', `mc-tabs__header-bar--${barPosition.value}`]
                    });
                }
            }
            else if (type.value === 'segment') {
                if (animation.value === 'slide') {
                    return createVNode('div', {
                        ref: barElRef,
                        class: ['mc-tabs__header-bar']
                    });
                }
            }
            return null;
        });
        const tabsHeaderVNode = computed(() => {
            // use IKey, ensure non-SpecificVNode element won't be rendered in header
            const [firstTabPane, maybeTabPanes] = getSlotFirstVNode(slots.default, [tabPaneIKey, tabIKey], true);
            if (!maybeTabPanes || maybeTabPanes.length === 0)
                return null;
            activeTabName.value = activeTabName.value || (firstTabPane?.props?.name ?? '');
            return createVNode('div', {
                class: ['mc-tabs__header-scroll-content', headerClass?.value],
                style: headerStyle?.value
            }, maybeTabPanes.map(maybeTabPane => getTabVNode(maybeTabPane)));
        });
        expose({
            switchTo: handleBeforeTabSwitch,
            el: tabsElRef
        });
        return () => createVNode('div', {
            ref: tabsElRef,
            class: ['mc-tabs', `mc-tabs--${type.value}`],
            style: cssVars.value
        }, [
            createVNode('div', {
                ref: headerElRef,
                class: [
                    'mc-tabs__header',
                    {
                        'mc-tabs__header--center': center.value,
                        'mc-tabs__header--stretch': stretch.value,
                        'mc-tabs__header--with-line': type.value === 'segment' || type.value === 'empty' ? false : showLine.value
                    },
                    type.value === 'bar' || type.value === 'segment' ? `mc-tabs__header--bar-${animation.value}` : ''
                ]
            }, [lineBarVNode.value, tabsHeaderVNode.value]),
            createVNode('div', {
                class: ['mc-tabs__content', contentClass?.value],
                style: contentStyle.value
            }, slots.default ? flatten$1(slots.default(), tabIKey, true) : createCommentVNode('', true))
        ]);
    }
});

var TabPane = defineComponent({
    name: 'TabPane',
    iKey: tabPaneIKey,
    props: tabPaneProps,
    setup(props, { slots }) {
        const { name, preload, lazy } = toRefs(props);
        const valueRef = inject(tabsInjectionKey, null);
        if (!valueRef) {
            throw new Error('[McTabPane]: McTabPane must be placed inside McTabs.');
        }
        const isActive = computed(() => {
            return name?.value === valueRef?.value;
        });
        const hasRendered = ref(isActive.value);
        if (lazy.value && !hasRendered.value) {
            watchOnce(isActive, () => {
                hasRendered.value = true;
            });
        }
        return () => {
            const tabPaneVNode = createVNode('div', { class: 'mc-tab-pane' }, [renderSlot$1(slots, 'default')]);
            if (preload.value) {
                return withDirectives(tabPaneVNode, [[vShow, isActive.value]]);
            }
            else {
                if (lazy.value) {
                    return hasRendered.value ? withDirectives(tabPaneVNode, [[vShow, isActive.value]]) : createCommentVNode('v-if', true);
                }
                else {
                    return isActive.value ? tabPaneVNode : createCommentVNode('v-if', true);
                }
            }
        };
    }
});

const messageProps = {
    type: {
        type: String,
        default: 'text'
    },
    duration: {
        type: Number,
        default: 3000
    },
    closable: {
        type: Boolean,
        default: false
    },
    hoverAlive: {
        type: Boolean,
        default: true
    },
    html: {
        type: String,
        default: undefined
    },
    card: {
        type: Boolean,
        default: false
    },
    icon: {
        type: Function,
        default: undefined
    },
    action: {
        type: Function,
        default: undefined
    }
};

var MessageEntity = defineComponent({
    name: 'Message',
    props: messageProps,
    emits: ['close'],
    setup(props, { slots, emit, expose }) {
        const { type, duration, closable, hoverAlive, html, card, icon, action } = toRefs(props);
        const messageElRef = ref();
        const messageCloseTimer = ref();
        const autoClose = computed(() => duration.value ?? 3000 > 0);
        const handleCloseMessage = () => {
            emit('close');
        };
        const startCloseTimer = () => {
            messageCloseTimer.value = window.setTimeout(() => {
                handleCloseMessage();
                clearCloseTimer();
            }, duration.value);
        };
        const clearCloseTimer = () => {
            window.clearTimeout(messageCloseTimer.value);
            messageCloseTimer.value = null;
        };
        if (autoClose.value) {
            startCloseTimer();
        }
        const iconVNode = computed(() => {
            return icon?.value
                ? icon?.value()
                : type.value === 'loading'
                    ? createVNode('div', { class: 'mc-message__icon-loading' })
                    : createVNode(McIcon, {
                        size: 18,
                        class: 'mc-message__icon'
                    }, {
                        default: () => {
                            switch (type.value) {
                                case 'text':
                                    return createVNode(IconAlert);
                                case 'success':
                                    return createVNode(IconSuccess);
                                case 'warning':
                                    return createVNode(IconWarning);
                                case 'info':
                                    return createVNode(IconInfo);
                                case 'error':
                                    return createVNode(IconError);
                            }
                        }
                    });
        });
        const closableVNode = computed(() => {
            if (action?.value)
                return null;
            return closable.value
                ? createVNode(McIcon, {
                    size: 18,
                    class: 'mc-message__close',
                    onClick() {
                        handleCloseMessage();
                    }
                }, { default: () => createVNode(IconClose) })
                : null;
        });
        const contentVNode = computed(() => {
            if (html?.value) {
                return createVNode('div', {
                    class: 'mc-message__content',
                    innerHTML: html.value
                });
            }
            else {
                return createVNode('div', { class: 'mc-message__content' }, [renderSlot$1(slots, 'default')]);
            }
        });
        expose({
            close: handleCloseMessage,
            el: messageElRef
        });
        return () => createVNode('div', {
            // ref: messageElRef,
            class: ['mc-message', { 'mc-message--card': card.value }, `mc-message--${type.value}`],
            onMouseenter() {
                hoverAlive.value && autoClose.value && clearCloseTimer();
            },
            onMouseleave() {
                hoverAlive.value && autoClose.value && startCloseTimer();
            }
        }, [iconVNode.value, contentVNode.value, closableVNode.value, action?.value?.()]);
    }
});

var mainCssr$8 = c$1([
    c$1('.mc-message-global-container', {
        position: 'fixed',
        top: 0,
        left: 0,
        height: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100vw',
        zIndex: 6000
    }),
    c$1('.mc-message', {
        padding: '8px',
        borderRadius: '4px',
        lineHeight: 1,
        width: 'max-content',
        display: 'flex',
        alignItems: 'center',
        marginTop: '8px',
        transition: 'all 0.3s ease'
    }, [
        c$1('&--loading', [
            c$1('.mc-message__icon-loading', {
                display: 'inline-block',
                marginRight: '8px',
                borderRadius: '50%',
                width: '14px',
                height: '14px',
                animation: 'mc-message-icon-loading-spin 1.2s linear infinite'
            })
        ]),
        c$1('&--card', {
            boxShadow: '0px 1px 4px 0px rgba(0, 0, 0, 0.02), 0px 2px 12px 0px rgba(0, 0, 0, 0.04), 0px 2px 6px 0px rgba(0, 0, 0, 0.02)',
            padding: '12px'
        }, [
            c$1('.mc-message__icon', {
                marginRight: '8px'
            })
        ]),
        c$1('&__icon', {
            marginRight: '6px'
        }),
        c$1('&__content', {
            flex: 1
        }),
        c$1('&__close', {
            cursor: 'pointer',
            marginLeft: '4px'
        })
    ]),
    c$1('.mc-message-slide-down-enter-from, .mc-message-slide-down-leave-to', {
        opacity: 0,
        transform: 'translateY(-30px)'
    }),
    c$1('.mc-message-slide-down-leave-active', {
        position: 'absolute'
    }),
    c$1('@keyframes mc-message-icon-loading-spin', {
        '0%': {
            transform: 'rotate(0deg)'
        },
        '100%': {
            transform: 'rotate(360deg)'
        }
    })
]);

var lightCssr$7 = c$1('.mc-message', {
    background: '#fff'
}, [
    c$1('&--text', {
        background: '#eff6ff',
        border: '1px solid #3b82f6'
    }, [
        c$1('.mc-message__icon', {
            color: '#3b82f6'
        })
    ]),
    c$1('&--success', {
        background: '#ecfdf5',
        border: '1px solid #10b981'
    }, [
        c$1('.mc-message__icon', {
            color: '#10b981'
        })
    ]),
    c$1('&--warning', {
        background: '#fffbeb',
        border: '1px solid #f59e0b'
    }, [
        c$1('.mc-message__icon', {
            color: '#f59e0b'
        })
    ]),
    c$1('&--info', {
        background: '#f9fafb',
        border: '1px solid #6b7280'
    }, [
        c$1('.mc-message__icon', {
            color: '#6b7280'
        })
    ]),
    c$1('&--error', {
        background: '#fef2f2',
        border: '1px solid #ef4444'
    }, [
        c$1('.mc-message__icon', {
            color: '#ef4444'
        })
    ]),
    c$1('&--loading', {
        border: '1px solid #10b981'
    }, [
        c$1('.mc-message__icon-loading', {
            border: '2px solid rgba(0, 0, 0, 0.1)',
            borderLeftColor: '#10b981'
        })
    ]),
    c$1('&--card', {
        background: '#fff',
        border: 'none'
    })
]);

var darkCssr$7 = c$1('.mc-message', {
    background: '#313540',
    color: '#eee'
}, [
    c$1('&--text', {
        border: '1px solid #3b82f6'
    }, [
        c$1('.mc-message__icon', {
            color: '#3b82f6'
        })
    ]),
    c$1('&--success', {
        border: '1px solid #10b981'
    }, [
        c$1('.mc-message__icon', {
            color: '#10b981'
        })
    ]),
    c$1('&--warning', {
        border: '1px solid #f59e0b'
    }, [
        c$1('.mc-message__icon', {
            color: '#f59e0b'
        })
    ]),
    c$1('&--info', {
        border: '1px solid #6b7280'
    }, [
        c$1('.mc-message__icon', {
            color: '#6b7280'
        })
    ]),
    c$1('&--error', {
        border: '1px solid #ef4444'
    }, [
        c$1('.mc-message__icon', {
            color: '#ef4444'
        })
    ]),
    c$1('&--loading', {
        border: '1px solid #10b981'
    }, [
        c$1('.mc-message__icon-loading', {
            border: '2px solid rgba(0, 0, 0, 0.1)',
            borderLeftColor: '#10b981'
        })
    ]),
    c$1('&--card', {
        border: 'none'
    })
]);

// import gsap from 'gsap';
// import Flip from 'gsap/Flip';
// gsap.registerPlugin(Flip);
// const enter = (el: HTMLElement, done: () => void) => {
//     const to: gsap.TweenVars = { autoAlpha: 1, scale: 1, transformOrigin: '50% 0', duration: 0.3 };
//     gsap.fromTo(
//         el,
//         { autoAlpha: 0, scale: 0 },
//         {
//             ...to,
//             ease: 'power1.out',
//             onComplete: done
//         }
//     );
// };
// const leave = (el: HTMLElement, done: gsap.Callback) => {
//     if (MessageReactiveList.length === 0) {
//         exit(el, () => {
//             done();
//             requestAnimationFrame(() => {
//                 unmountContainer();
//             });
//         });
//     } else {
//         setState(() => el.classList.add('exiting'), done);
//     }
// };
// function setState(action: () => void, done?: gsap.Callback) {
//     const state = Flip.getState('.mc-message');
//     action();
//     Flip.from(state, {
//         duration: 0.3,
//         absolute: true,
//         scale: true,
//         onLeave(elements) {
//             return exit(elements);
//         },
//         onComplete: done
//     });
// }
// function exit(el: gsap.TweenTarget, done?: gsap.Callback) {
//     gsap.to(el, {
//         autoAlpha: 0,
//         scale: 0,
//         duration: 0.3,
//         transformOrigin: '50% 0',
//         onComplete: done
//     });
// }
function getMessageEntityVNode(message, index) {
    const { key, type, options: { duration, className, style, closable, hoverAlive, html, card, itemGap, icon, action, onClose } } = message;
    return createVNode(MessageEntity, {
        key,
        ref: ins => {
            const { close, el } = ins ?? {};
            message.options.close = close;
            message.options.el = el;
        },
        type,
        duration,
        class: className,
        style,
        closable,
        hoverAlive,
        html,
        card,
        itemGap,
        icon,
        action,
        onClose: () => {
            onClose && onClose();
            closeMessage(key);
        }
    }, {
        // if destructure message, message can't be reactive
        default: () => {
            const content = message.options.message;
            return typeof content === 'string' ? content : content?.();
        }
    });
}
const MessageEnvironment = () => {
    // theme register
    useThemeRegister({
        key: 'McMessage',
        main: mainCssr$8,
        light: lightCssr$7,
        dark: darkCssr$7
    });
    return createVNode(TransitionGroup, {
        name: 'mc-message-slide-down',
        class: 'mc-message-global-container',
        appear: true,
        // css: false,
        tag: 'div'
        // onEnter: enter,
        // onLeave: leave
    }, { default: () => MessageReactiveList.map(getMessageEntityVNode) });
};

const containerMounted = ref(false);
const MessageReactiveList = reactive([]);
function mountContainer() {
    document.createElement('div');
    render$1(createVNode(MessageEnvironment), document.body);
    containerMounted.value = true;
}
function createMessage(message) {
    MessageReactiveList.push(message);
}
function closeMessage(key) {
    const index = MessageReactiveList.findIndex(m => m.key === key);
    index > -1 && MessageReactiveList.splice(index, 1);
}
function ApiConstructor(maybeOptions, options = {}, type = 'text', async = false) {
    const key = createKey('message');
    const reactiveOptions = maybeOptions
        ? typeof maybeOptions === 'string'
            ? reactive({
                message: maybeOptions,
                ...options
            })
            : responsiveTarget(maybeOptions)
        : responsiveTarget(options);
    const apiOptions = reactive(toRefs(reactiveOptions));
    createMessage({
        key,
        type,
        options: apiOptions
    });
    return async
        ? new Promise(resolve => {
            const originalOnCloseHandler = apiOptions.onClose;
            apiOptions.onClose = async () => {
                originalOnCloseHandler && (await originalOnCloseHandler());
                resolve(apiOptions);
            };
        })
        : apiOptions;
}

const McMessage = (options) => {
    const key = createKey('message');
    const reactiveOptions = responsiveTarget(options);
    const type = toRef(reactiveOptions, 'type');
    const apiOptions = reactiveOmit(reactiveOptions, 'type');
    createMessage({
        key,
        type,
        options: apiOptions
    });
    reactiveOptions.close = () => {
        reactiveOptions.onClose?.();
        closeMessage(key);
    };
    nextTick(() => {
        reactiveOptions.el = apiOptions.el;
    });
    return reactiveOptions;
};
McMessage.text = (maybeOptions, options) => {
    return ApiConstructor(maybeOptions, options, 'text');
};
McMessage.success = (maybeOptions, options) => {
    return ApiConstructor(maybeOptions, options, 'success');
};
McMessage.warning = (maybeOptions, options) => {
    return ApiConstructor(maybeOptions, options, 'warning');
};
McMessage.info = (maybeOptions, options) => {
    return ApiConstructor(maybeOptions, options, 'info');
};
McMessage.error = (maybeOptions, options) => {
    return ApiConstructor(maybeOptions, options, 'error');
};
McMessage.loading = (maybeOptions, options) => {
    return ApiConstructor(maybeOptions, options, 'loading');
};

const McAsyncMessage = (options) => {
    const key = createKey('message');
    const reactiveOptions = responsiveTarget(options);
    const type = toRef(reactiveOptions, 'type');
    const apiOptions = reactiveOmit(reactiveOptions, 'type');
    createMessage({
        key,
        type,
        options: apiOptions
    });
    reactiveOptions.close = () => {
        reactiveOptions.onClose?.();
        closeMessage(key);
    };
    nextTick(() => {
        reactiveOptions.el = apiOptions.el;
    });
    return new Promise(resolve => {
        const originalOnCloseHandler = apiOptions.onClose;
        apiOptions.onClose = () => {
            originalOnCloseHandler && originalOnCloseHandler();
            resolve(reactiveOptions);
        };
    });
};
McAsyncMessage.text = (maybeOptions, options) => {
    return ApiConstructor(maybeOptions, options, 'text', true);
};
McAsyncMessage.success = (maybeOptions, options) => {
    return ApiConstructor(maybeOptions, options, 'success', true);
};
McAsyncMessage.warning = (maybeOptions, options) => {
    return ApiConstructor(maybeOptions, options, 'warning', true);
};
McAsyncMessage.info = (maybeOptions, options) => {
    return ApiConstructor(maybeOptions, options, 'info', true);
};
McAsyncMessage.error = (maybeOptions, options) => {
    return ApiConstructor(maybeOptions, options, 'error', true);
};
McAsyncMessage.loading = (maybeOptions, options) => {
    return ApiConstructor(maybeOptions, options, 'loading', true);
};

watch(MessageReactiveList, () => {
    if (!containerMounted.value && MessageReactiveList.length > 0) {
        mountContainer();
    }
});

var mainCssr$7 = c$1([
    c$1('.mc-checkbox', {
        boxSizing: 'border-box',
        display: 'inline-flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexFlow: 'row wrap',
        position: 'relative'
    }, [
        c$1('*', {
            boxSizing: 'border-box'
        }),
        c$1('&--disabled', [
            c$1('*, .mc-checkbox__label, .mc-checkbox__label *', {
                cursor: 'not-allowed'
            })
        ])
    ]),
    c$1('.mc-checkbox__input', {
        opacity: 0,
        width: 0,
        margin: 0
    }, [
        c$1('&:checked + .mc-checkbox__label > span:first-child', {
            background: 'var(--checkbox-checked-color)',
            borderColor: 'var(--checkbox-checked-color)',
            animation: 'mc-checkbox-zoom-in-out 0.2s ease'
        }, [
            c$1('svg', {
                strokeDashoffset: 0
            })
        ])
    ]),
    c$1('.mc-checkbox__label', {
        userSelect: 'none',
        cursor: 'pointer',
        padding: '6px 8px',
        borderRadius: '6px',
        overflow: 'hidden',
        transition: 'all 0.2s ease',
        display: 'flex',
        alignItems: 'center'
    }, [
        c$1('&:not(:last-child)', {
            marginRight: '6px'
        }),
        c$1('&:hover', {
            background: 'var(--checkbox-hover-color)'
        }),
        c$1('& > span', {
            verticalAlign: 'middle',
            transform: 'translate3d(0, 0, 0)'
        }),
        c$1('& > span:first-child', {
            position: 'relative',
            flex: '0 0 18px',
            width: '18px',
            height: '18px',
            borderRadius: '4px',
            transform: 'var(--checkbox-scale-size)',
            transition: 'all 0.2s ease'
        }, [
            c$1('svg', {
                position: 'absolute',
                top: '3px',
                left: '2px',
                fill: 'none',
                strokeDasharray: '16px',
                strokeDashoffset: '16px',
                transition: 'all 0.2s ease',
                transform: 'translate3d(0, 0, 0)'
            })
        ]),
        c$1('& > span:last-child', {
            paddingLeft: '8px',
            lineHeight: '18px'
        }),
        c$1('&:hover > span:first-child', {
            borderColor: 'var(--checkbox-checked-color)'
        })
    ]),
    c$1('@keyframes mc-checkbox-zoom-in-out', {
        '50%': {
            transform: 'scale(0.81)'
        }
    })
]);

var lightCssr$6 = c$1([
    c$1('.mc-checkbox', [
        c$1('&--disabled', {
            color: '#bbb'
        }, [
            c$1('.mc-checkbox__label, .mc-checkbox__label:hover', {
                background: 'rgba(0, 0, 0, 0.02)'
            }),
            c$1('.mc-checkbox__label span:first-child svg', {
                stroke: '#cccfdb'
            })
        ])
    ]),
    c$1('.mc-checkbox__label', [
        c$1('& > span:first-child', {
            border: '1px solid #cccfdb'
        }, [
            c$1('svg', {
                stroke: '#fff'
            })
        ])
    ])
]);

var darkCssr$6 = c$1([
    c$1('.mc-checkbox', [
        c$1('&--disabled', {
            color: '#bbb'
        }, [
            c$1('.mc-checkbox__label, .mc-checkbox__label:hover', {
                background: 'rgba(0, 0, 0, 0.02)'
            }),
            c$1('.mc-checkbox__label span:first-child svg', {
                stroke: '#cccfdb'
            })
        ])
    ]),
    c$1('.mc-checkbox__label', [
        c$1('& > span:first-child', {
            border: '1px solid #cccfdb'
        }, [
            c$1('svg', {
                stroke: '#fff'
            })
        ])
    ])
]);

const _hoisted_1$1$1 = {
    width: '12px',
    height: '10px',
    viewbox: '0 0 12 10'
};
const _hoisted_2$1$1 = /*#__PURE__*/ createElementVNode$1('polyline', {
    points: '1.5 6 4.5 9 10.5 1',
    'stroke-linecap': 'round',
    'stroke-linejoin': 'round',
    'stroke-width': '2'
}, null, -1 /* HOISTED */);
const _hoisted_3$1$1 = [_hoisted_2$1$1];
var IconCheckMark = defineComponent({
    name: 'IconCheckMark',
    render: function () {
        return openBlock(), createElementBlock('svg', _hoisted_1$1$1, _hoisted_3$1$1);
    }
});

const _hoisted_1$1 = {
    width: '12px',
    height: '10px',
    viewbox: '0 0 12 10'
};
const _hoisted_2$1 = /*#__PURE__*/ createElementVNode$1('polyline', {
    points: '1.5 5  10.5 5',
    'stroke-linecap': 'round',
    'stroke-linejoin': 'round',
    'stroke-width': '2'
}, null, -1 /* HOISTED */);
const _hoisted_3$1 = [_hoisted_2$1];
var IconIndeterminateMark = defineComponent({
    name: 'IconIndeterminateMark',
    render: function () {
        return openBlock(), createElementBlock('svg', _hoisted_1$1, _hoisted_3$1);
    }
});

const checkboxGroupInjectionKey = Symbol();
const checkboxIKey = Symbol('checkbox');
const checkboxProps = {
    value: {
        type: [String, Number, Boolean],
        default: undefined
    },
    label: {
        type: String,
        default: undefined
    },
    size: {
        type: String,
        default: 'medium'
    },
    checkedValue: {
        type: [String, Number, Boolean],
        default: true
    },
    uncheckedValue: {
        type: [String, Number, Boolean],
        default: false
    },
    disabled: {
        type: Boolean,
        default: false
    },
    indeterminate: {
        type: Boolean,
        default: false
    },
    checkedColor: {
        type: String,
        default: undefined
    }
};
const checkboxGroupPros = {
    value: {
        type: Array,
        default: undefined
    },
    options: {
        type: Array,
        default: undefined
    },
    max: {
        type: Number,
        default: undefined
    },
    disabled: {
        type: Boolean,
        default: false
    },
    checkedColor: {
        type: String,
        default: '#10b981'
    }
};

var McCheckbox = defineComponent({
    name: 'Checkbox',
    iKey: checkboxIKey,
    props: checkboxProps,
    emits: ['update:value'],
    setup(props, { slots, attrs, emit }) {
        onMounted(() => {
            useThemeRegister({
                key: 'McCheckbox',
                main: mainCssr$7,
                light: lightCssr$6,
                dark: darkCssr$6
            });
        });
        const key = createKey('checkbox');
        const { value: valueVM, label, size, checkedValue, uncheckedValue, disabled, indeterminate, checkedColor } = toRefs(props);
        const { groupValue, groupCheckedColor, groupDisabled, updateGroupValue, BusSelectAll, BusMaxControl } = inject(checkboxGroupInjectionKey, null) ?? {};
        const checkboxElRef = ref();
        const internalValue = ref(false);
        const internalDisabled = ref(false);
        const scaleRatio = computed(() => {
            switch (size.value) {
                case 'small':
                    return 0.8;
                case 'medium':
                    return 0.9;
                case 'large':
                    return 1;
            }
        });
        const mergedValue = isDefined(valueVM) ? valueVM : internalValue;
        const mergedDisabled = or(groupDisabled, disabled, internalDisabled);
        const mergedChecked = computed(() => {
            if (groupValue?.value) {
                return groupValue.value.indexOf(mergedValue?.value) > -1;
            }
            return mergedValue?.value === checkedValue.value;
        });
        const mergedCheckedColor = and(groupCheckedColor, not(checkedColor)).value ? groupCheckedColor : checkedColor;
        const cssVars = computed(() => {
            return {
                '--checkbox-checked-color': mergedCheckedColor?.value ?? '#10b981',
                '--checkbox-hover-color': (mergedCheckedColor?.value ?? '#10b981') + '0f',
                '--checkbox-scale-size': `scale(${scaleRatio.value})`
            };
        });
        const callUpdateValue = (value) => {
            if (valueVM.value === undefined) {
                mergedValue.value = value;
            }
            emit('update:value', value);
        };
        const updateInternalDisabled = (reachMax) => {
            if (reachMax) {
                !mergedChecked.value && (internalDisabled.value = true);
            }
            else {
                internalDisabled.value && (internalDisabled.value = false);
            }
        };
        const handleChange = () => {
            if (updateGroupValue) {
                updateGroupValue(mergedValue.value);
            }
            else {
                callUpdateValue(mergedChecked.value ? uncheckedValue.value : checkedValue.value);
            }
        };
        if (BusMaxControl && BusSelectAll) {
            BusMaxControl.on(updateInternalDisabled);
            BusSelectAll.on((selectDisabled) => {
                if (!mergedChecked.value) {
                    if (!selectDisabled) {
                        !mergedDisabled.value && updateGroupValue?.(mergedValue?.value, false);
                    }
                    else {
                        updateGroupValue?.(mergedValue?.value, false);
                    }
                }
            });
        }
        const labelVNode = computed(() => {
            if (slots.default) {
                return createVNode('span', null, [renderSlot$1(slots, 'default')]);
            }
            else if (label?.value) {
                return createVNode('span', null, [label.value]);
            }
            else {
                return null;
            }
        });
        return () => {
            const mergedProps = mergeProps({
                ref: checkboxElRef,
                class: ['mc-checkbox', { 'mc-checkbox--checked': mergedChecked.value, 'mc-checkbox--disabled': mergedDisabled.value }],
                style: cssVars.value
            }, attrs);
            return createElementVNode('div', mergedProps, [
                createElementVNode('input', { class: 'mc-checkbox__input', value: mergedValue.value, id: key, type: 'checkbox', onChange: handleChange, checked: mergedChecked.value, disabled: mergedDisabled.value }, null, 8 /* PROPS */, [
                    'value',
                    'checked',
                    'disabled'
                ]),
                createElementVNode('label', { class: 'mc-checkbox__label', for: key }, [
                    createElementVNode('span', {
                        style: {
                            background: mergedDisabled.value ? 'rgba(0, 0, 0, 0.02)' : '',
                            borderColor: mergedDisabled.value ? '#cccfdb' : ''
                        }
                    }, [createVNode(indeterminate.value ? IconIndeterminateMark : IconCheckMark)], 4 /* STYLE */),
                    labelVNode.value
                ])
            ], 16 /* FULL_PROPS */);
        };
    }
});

var CheckboxGroup = defineComponent({
    name: 'CheckboxGroup',
    props: checkboxGroupPros,
    emits: ['update:value'],
    setup(props, { slots, emit, expose }) {
        const { value: valueVM, options, checkedColor, max, disabled } = toRefs(props);
        const internalValue = ref([]);
        const checkboxGroupElRef = ref();
        const checkboxCount = computed(() => {
            const slotsCount = slots.default ? flatten$1(slots.default(), checkboxIKey).length : 0;
            const optionsCount = options?.value?.length ?? 0;
            return slotsCount + optionsCount;
        });
        const checkedCount = computed(() => {
            return mergedValue?.value?.length ?? 0;
        });
        const status = computed(() => {
            return {
                all: checkedCount.value === checkboxCount.value,
                indeterminate: checkedCount.value > 0 && checkedCount.value < checkboxCount.value
            };
        });
        const mergedValue = valueVM.value ? valueVM : internalValue;
        const callUpdateValue = (value) => {
            emit('update:value', mergedValue.value, value);
        };
        // due with max props, some logic...
        if (mergedValue?.value && max?.value) {
            watch([checkboxCount, checkedCount, max], () => {
                void nextTick(() => {
                    if (mergedValue.value?.length === max.value) {
                        BusMaxControl.emit(true);
                    }
                    else {
                        BusMaxControl.emit(false);
                    }
                });
            }, {
                immediate: true
            });
        }
        const updateGroupValue = (value, call = true) => {
            if (mergedValue.value) {
                const index = mergedValue.value.indexOf(value ?? '');
                if (index === -1) {
                    mergedValue.value.push(value ?? '');
                }
                else {
                    mergedValue.value.splice(index, 1);
                }
                call && callUpdateValue(value);
            }
            else {
                call && callUpdateValue(value);
            }
        };
        const SelectAllEventBusKey = Symbol();
        const MaxControlEventBusKey = Symbol();
        const BusSelectAll = useEventBus(SelectAllEventBusKey);
        const BusMaxControl = useEventBus(MaxControlEventBusKey);
        provide(checkboxGroupInjectionKey, {
            groupValue: mergedValue,
            groupCheckedColor: checkedColor,
            groupDisabled: disabled,
            updateGroupValue,
            BusSelectAll,
            BusMaxControl
        });
        onUnmounted(() => {
            BusMaxControl.reset();
            BusSelectAll.reset();
        });
        expose({
            selectAll(selectDisabled = true) {
                BusSelectAll.emit(selectDisabled);
                mergedValue?.value && callUpdateValue();
            },
            clear() {
                if (mergedValue?.value) {
                    mergedValue.value.length = 0;
                    callUpdateValue();
                }
            },
            status,
            el: checkboxGroupElRef
        });
        return () => createVNode('div', {
            ref: checkboxGroupElRef,
            class: 'mc-checkbox-group'
        }, [
            ...(options.value?.map(option => {
                const { value, label, disabled } = option;
                if (!label || typeof label === 'string') {
                    return createVNode(McCheckbox, { value, label, disabled });
                }
                else {
                    return createVNode(McCheckbox, { value, disabled }, { default: label });
                }
            }) ?? []),
            renderSlot$1(slots, 'default')
        ]);
    }
});

const spaceProps = {
    vertical: {
        type: Boolean,
        default: false
    },
    gap: {
        type: Number,
        default: 12
    },
    itemStyle: {
        type: [String, Object],
        default: undefined
    },
    justify: {
        type: String,
        default: 'flex-start'
    }
};

var mainCssr$6 = c$1('.mc-space', {
    display: 'flex',
    flexDirection: 'var(--space-direction)',
    justifyContent: 'var(--space-justify)',
    alignItems: 'center',
    flexWrap: 'wrap'
}, [c$1('&--vertical', { alignItems: 'flex-start' }), c$1('&-item', { padding: '4px 0', display: 'flex' }), c$1('&-item:not(:last-child)', { margin: 'var(--space-item-gap)' })]);

c$1([]);

c$1([]);

var Space = defineComponent({
    name: 'Space',
    props: spaceProps,
    setup(props, { slots }) {
        // theme register
        onMounted(() => {
            useThemeRegister({
                key: 'McSpace',
                main: mainCssr$6
            });
        });
        const { vertical, gap, itemStyle, justify } = toRefs(props);
        const cssVars = computed(() => {
            return {
                '--space-direction': vertical.value ? 'column' : 'row',
                '--space-justify': justify.value,
                '--space-item-gap': vertical.value ? `0 0 ${gap.value}px 0` : `0 ${gap.value}px 0 0`
            };
        });
        return () => {
            const spaceItems = flattenWithOptions({ slots });
            return createVNode('div', { class: ['mc-space', { 'mc-space--vertical': vertical.value }], style: cssVars.value }, spaceItems.map(item => {
                return createVNode('div', { class: 'mc-space-item', style: itemStyle.value }, [item]);
            }));
        };
    }
});

var mainCssr$5 = c$1([
    c$1('.mc-modal-container', {
        position: 'fixed',
        height: 0,
        zIndex: 5000
    }),
    c$1('.mc-modal-mask', {
        backgroundColor: '#00000073'
    }),
    c$1('.mc-modal-wrapper', {
        display: 'flex',
        overflow: 'auto'
    }),
    c$1('.mc-modal-mask, .mc-modal-wrapper', {
        position: 'fixed',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        transitionProperty: 'all',
        transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
        transitionDuration: '300ms'
    }),
    c$1('.mc-modal', {
        width: 'var(--modal-width)',
        height: 'var(--modal-height)',
        alignSelf: 'center',
        minWidth: 'max-content'
    }, [
        c$1('&:not(.mc-modal--pure)', {
            display: 'flex',
            flexDirection: 'column',
            borderRadius: '8px'
        }, [
            c$1('.mc-modal-title', {
                fontSize: '18px',
                fontWeight: 500
            }),
            c$1('.mc-modal-close-button', {
                position: 'relative',
                left: '8px'
            }),
            c$1('.mc-modal__header', {
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '12px 20px'
            }),
            c$1('.mc-modal__body', {
                padding: '20px',
                flex: 1
            }),
            c$1('.mc-modal__footer', {
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
                padding: '12px 20px'
            }, [
                c$1('&-button:nth-child(1)', {
                    marginRight: '16px'
                })
            ])
        ])
    ]),
    c$1('.mc-modal-mask-fade-enter-from, .mc-modal-mask-fade-leave-to', {
        opacity: 0
    }),
    c$1('.mc-modal-scale-enter-from, .mc-modal-scale-leave-to', {
        opacity: 0,
        transform: 'scale(0.75)'
    }),
    c$1('.mc-modal-slide-enter-from, .mc-modal-slide-leave-to', {
        opacity: 0,
        transform: 'translateY(-36px)'
    })
]);

var lightCssr$5 = c$1('.mc-modal', {
    background: '#fff'
});

var darkCssr$5 = c$1('.mc-modal', {
    background: '#313540',
    color: '#eee'
});

var McModal = defineComponent({
    name: 'Modal',
    inheritAttrs: false,
    props: modalProps,
    emits: ['update:show', 'wrapper-click', 'shortcut-stroke', 'after-enter', 'after-leave', 'before-enter', 'cancel', 'confirm'],
    setup(props, { slots, attrs, emit, expose }) {
        // theme register
        onMounted(() => {
            useThemeRegister({
                key: 'McModal',
                main: mainCssr$5,
                light: lightCssr$5,
                dark: darkCssr$5
            });
        });
        const { show, width, height, appearFromCursor, wrapperClosable, shortcutKey, closeOnShortcut, closable, headerStyle, bodyStyle, footerStyle, headerClass, bodyClass, footerClass, title, showHeader, showFooter, cancelText, confirmText, pure, position, animation, onBeforeLeave, appearX, appearY } = toRefs(props);
        const key = createKey('modal');
        const modalElRef = ref();
        const modalAppearXRef = ref(0);
        const modalAppearYRef = ref(0);
        const modalTransformOrigin = computed(() => (appearFromCursor.value ? `${modalAppearXRef.value}px ${modalAppearYRef.value}px` : 'center center'));
        const modalTransitionName = computed(() => (appearFromCursor.value ? 'mc-modal-scale' : ['scale', 'slide'].includes(animation.value) ? `mc-modal-${animation.value}` : 'mc-modal-scale'));
        const isTopModal = computed(() => topItem.value === key);
        const isMountModal = ref(true);
        const { add, remove, topItem } = useSharedItems();
        const { x, y } = useMouse();
        const { i18n } = useI18n('modal');
        const magicKeys = useMagicKeys({
            passive: false,
            onEventFired(event) {
                isTopModal.value && event.stopImmediatePropagation();
            }
        });
        const keys = computed(() => Array.from(magicKeys.current));
        let closeAction;
        watch(show, () => {
            if (show.value) {
                isMountModal.value = true;
                modalAppearXRef.value = appearX.value || x.value;
                modalAppearYRef.value = appearY.value || y.value;
                add(key);
            }
            else {
                remove(key);
            }
        }, { immediate: true });
        const { pause, resume } = pausableWatch(magicKeys[shortcutKey.value], v => {
            if (v && show.value && closeOnShortcut.value && isTopModal.value) {
                callShortcutStroke();
                callUpdateShow(false);
            }
        });
        watch(isTopModal, () => {
            if (!isTopModal.value) {
                pause();
            }
            else {
                resume();
            }
        }, { immediate: true });
        onClickOutside(modalElRef, event => {
            if (wrapperClosable.value && isTopModal.value) {
                callWrapperClick(event);
                callUpdateShow(false);
            }
        });
        const callUpdateShow = async (val) => {
            if (!val) {
                const callback = await onBeforeLeave.value?.(closeAction);
                if (callback)
                    return;
            }
            emit('update:show', val);
        };
        const callWrapperClick = (e) => {
            closeAction = 'wrapper';
            emit('wrapper-click', e);
        };
        const callShortcutStroke = () => {
            closeAction = 'shortcut';
            emit('shortcut-stroke', keys.value);
        };
        const callAfterEnter = () => {
            emit('after-enter');
        };
        const callAfterLeave = () => {
            isMountModal.value = false;
            emit('after-leave');
        };
        const callBeforeEnter = () => {
            emit('before-enter');
        };
        const callOnCancel = () => {
            closeAction = 'cancel';
            emit('cancel');
        };
        const callOnConfirm = () => {
            closeAction = 'confirm';
            emit('confirm');
        };
        const handleCancel = () => {
            callOnCancel();
            callUpdateShow(false);
        };
        const handleConfirm = () => {
            callOnConfirm();
            callUpdateShow(false);
        };
        const modalPosition = computed(() => {
            const { top, right, bottom, left } = position.value || {};
            return {
                marginTop: top !== undefined ? (typeof top === 'number' ? `${top}px` : top) : 'auto',
                marginRight: right !== undefined ? (typeof right === 'number' ? `${right}px` : right) : 'auto',
                marginBottom: bottom !== undefined ? (typeof bottom === 'number' ? `${bottom}px` : bottom) : 'auto',
                marginLeft: left !== undefined ? (typeof left === 'number' ? `${left}px` : left) : 'auto'
            };
        });
        const cssVars = computed(() => {
            return {
                '--modal-width': typeof width.value === 'number' ? `${width.value}px` : width.value,
                '--modal-height': typeof height.value === 'number' ? `${height.value}px` : height.value
            };
        });
        const headerVNode = computed(() => {
            const titleVNode = createVNode('div', { class: 'mc-modal-title' }, [typeof title.value === 'string' ? createTextVNode$1(title.value) : title.value?.()]);
            const closeIconVNode = closable.value
                ? createVNode(McButton, {
                    render: 'text',
                    class: 'mc-modal-close-button',
                    style: { padding: '0 6px' },
                    onClick: () => {
                        closeAction = 'close';
                        callUpdateShow(false);
                    }
                }, {
                    icon: () => createVNode(McIcon, { size: 20 }, { default: () => createVNode(IconClose$1) })
                })
                : null;
            return !pure.value && showHeader.value ? createVNode('div', { class: ['mc-modal__header', headerClass.value], style: headerStyle.value }, [slots.header ? renderSlot$1(slots, 'header') : titleVNode, closeIconVNode]) : null;
        });
        const footerVNode = computed(() => {
            return !pure.value && showFooter.value
                ? createVNode('div', { class: ['mc-modal__footer', footerClass.value], style: footerStyle.value }, slots.footer
                    ? [renderSlot$1(slots, 'footer')]
                    : [
                        cancelText.value !== null ? createVNode(McButton, { ghost: true, onClick: handleCancel }, { default: () => cancelText.value || i18n('CancelButtonText') }) : null,
                        confirmText.value !== null ? createVNode(McButton, { style: { marginLeft: '16px' }, type: 'success', onClick: handleConfirm }, { default: () => confirmText.value || i18n('ConfirmButtonText') }) : null
                    ])
                : null;
        });
        const modalVNode = computed(() => {
            const mergedProps = mergeProps({
                ref: modalElRef,
                class: ['mc-modal', pure.value ? 'mc-modal--pure' : ''],
                style: { ...cssVars.value, ...modalPosition.value }
            }, attrs);
            return createVNode('div', { class: 'mc-modal-wrapper', style: `transform-origin: ${modalTransformOrigin.value}` }, [
                createVNode('div', mergedProps, [headerVNode.value, createVNode('div', { class: ['mc-modal__body', bodyClass.value], style: bodyStyle.value }, [renderSlot$1(slots, 'default')]), footerVNode.value])
            ]);
        });
        const modalContainerVNode = computed(() => {
            return createVNode('div', { class: 'mc-modal-container' }, [
                createVNode(Transition, { name: 'mc-modal-mask-fade', appear: true }, {
                    default: () => (show.value ? createVNode('div', { class: 'mc-modal-mask' }) : null)
                }),
                createVNode(Transition, { name: modalTransitionName.value, appear: true, onBeforeEnter: callBeforeEnter, onAfterEnter: callAfterEnter, onAfterLeave: callAfterLeave }, {
                    default: () => (show.value ? modalVNode.value : null)
                })
            ]);
        });
        provide(modalInjectionKey, modalElRef);
        expose({
            hide: () => callUpdateShow(false),
            el: modalElRef
        });
        return () => (isMountModal.value ? createVNode(VLazyTeleport, { to: 'body', show: show.value }, { default: () => modalContainerVNode.value }) : null);
    }
});

var mainCssr$4 = c$1([
    c$1('.mc-drawer-container', {
        position: 'fixed',
        height: 0,
        zIndex: 5000
    }),
    c$1('.mc-drawer-mask', {
        backgroundColor: '#00000073'
    }),
    c$1('.mc-drawer-wrapper', {
        display: 'flex',
        overflow: 'auto'
    }),
    c$1('.mc-drawer-mask, .mc-drawer-wrapper', {
        position: 'fixed',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        transitionProperty: 'all',
        transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
        transitionDuration: '300ms'
    }),
    c$1('.mc-drawer', {
        width: 'var(--drawer-width)',
        height: 'var(--drawer-height)',
        minWidth: 'max-content'
    }, [
        c$1('&:not(.mc-drawer--pure)', {
            display: 'flex',
            flexDirection: 'column'
        }, [
            c$1('.mc-drawer-title', {
                fontSize: '18px',
                fontWeight: 500
            }),
            c$1('.mc-drawer-close-button', {
                position: 'relative',
                left: '8px'
            }),
            c$1('.mc-drawer__header', {
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '12px 20px'
            }),
            c$1('.mc-drawer__body', {
                padding: '20px',
                flex: 1,
                overflow: 'auto'
            })
        ]),
        c$1('&--top', {
            marginBottom: 'auto',
            borderRadius: '0 0 8px 8px'
        }),
        c$1('&--right', {
            marginLeft: 'auto',
            borderRadius: '8px 0 0 8px'
        }),
        c$1('&--bottom', {
            marginTop: 'auto',
            borderRadius: '8px 8px 0 0'
        }),
        c$1('&--left', {
            marginRight: 'auto',
            borderRadius: '0 8px 8px 0'
        })
    ]),
    c$1('.mc-drawer-mask-fade-enter-from, .mc-drawer-mask-fade-leave-to', {
        opacity: 0
    }),
    c$1('.mc-drawer-appear-top-enter-from, .mc-drawer-appear-top-leave-to', {
        transform: 'translateY(calc(0px - var(--drawer-size)))'
    }),
    c$1('.mc-drawer-appear-right-enter-from, .mc-drawer-appear-right-leave-to', {
        transform: 'translateX(var(--drawer-size))'
    }),
    c$1('.mc-drawer-appear-bottom-enter-from, .mc-drawer-appear-bottom-leave-to', {
        transform: 'translateY(var(--drawer-size))'
    }),
    c$1('.mc-drawer-appear-left-enter-from, .mc-drawer-appear-left-leave-to', {
        transform: 'translateX(calc(0px - var(--drawer-size)))'
    })
]);

var lightCssr$4 = c$1('.mc-drawer', {
    background: '#fff'
});

var darkCssr$4 = c$1('.mc-drawer', {
    background: '#313540',
    color: '#eee'
});

var McDrawer = defineComponent({
    name: 'Drawer',
    inheritAttrs: false,
    props: drawerProps,
    setup(props, { slots, attrs, emit, expose }) {
        // theme register
        onMounted(() => {
            useThemeRegister({
                key: 'McDrawer',
                main: mainCssr$4,
                light: lightCssr$4,
                dark: darkCssr$4
            });
        });
        const { show, size, appearDirection, wrapperClosable, shortcutKey, closeOnShortcut, closable, headerStyle, bodyStyle, headerClass, bodyClass, title, showHeader, pure, onBeforeLeave } = toRefs(props);
        const key = createKey('drawer');
        const drawerElRef = ref(null);
        const isMountDrawer = ref(true);
        const isTopDrawer = computed(() => topItem.value === key);
        const { add, remove, topItem } = useSharedItems();
        const magicKeys = useMagicKeys({
            passive: false,
            onEventFired(event) {
                isTopDrawer.value && event.stopImmediatePropagation();
            }
        });
        const keys = computed(() => Array.from(magicKeys.current));
        let closeAction;
        watch(show, () => {
            if (show.value) {
                isMountDrawer.value = true;
                add(key);
            }
            else {
                remove(key);
            }
        }, { immediate: true });
        const { pause, resume } = pausableWatch(magicKeys[shortcutKey.value], v => {
            if (v && show.value && closeOnShortcut.value && isTopDrawer.value) {
                callShortcutStroke();
                callUpdateShow(false);
            }
        });
        watch(isTopDrawer, () => {
            if (!isTopDrawer.value) {
                pause();
            }
            else {
                resume();
            }
        }, { immediate: true });
        onClickOutside(drawerElRef, event => {
            if (wrapperClosable.value && isTopDrawer.value) {
                callWrapperClick(event);
                callUpdateShow(false);
            }
        });
        const callUpdateShow = async (val) => {
            if (!val) {
                const callback = await onBeforeLeave.value?.(closeAction);
                if (callback)
                    return;
            }
            emit('update:show', val);
        };
        const callWrapperClick = (e) => {
            closeAction = 'wrapper';
            emit('wrapper-click', e);
        };
        const callShortcutStroke = () => {
            closeAction = 'shortcut';
            emit('shortcut-stroke', keys.value);
        };
        const callAfterEnter = () => {
            emit('after-enter');
        };
        const callAfterLeave = () => {
            isMountDrawer.value = false;
            emit('after-leave');
        };
        const callBeforeEnter = () => {
            emit('before-enter');
        };
        const cssVars = computed(() => {
            const drawerSize = typeof size.value === 'number' ? `${size.value}px` : size.value;
            const drawerWidth = ['left', 'right'].includes(appearDirection.value) ? drawerSize : '100vw';
            const drawerHeight = ['top', 'bottom'].includes(appearDirection.value) ? drawerSize : '100vh';
            return {
                '--drawer-width': drawerWidth,
                '--drawer-height': drawerHeight,
                '--drawer-size': drawerSize
            };
        });
        const headerVNode = computed(() => {
            const titleVNode = createVNode('div', { class: 'mc-drawer-title' }, [typeof title.value === 'string' ? createTextVNode$1(title.value) : title.value?.()]);
            const closeIconVNode = closable.value
                ? createVNode(McButton, {
                    render: 'text',
                    class: 'mc-drawer-close-button',
                    style: { padding: '0 6px' },
                    onClick: () => {
                        closeAction = 'close';
                        callUpdateShow(false);
                    }
                }, {
                    icon: () => createVNode(McIcon, { size: 20 }, { default: () => createVNode(IconClose$1) })
                })
                : null;
            return !pure.value && showHeader.value ? createVNode('div', { class: ['mc-drawer__header', headerClass.value], style: headerStyle.value }, [slots.header ? renderSlot$1(slots, 'header') : titleVNode, closeIconVNode]) : null;
        });
        const drawerVNode = computed(() => {
            const mergedProps = mergeProps({
                ref: drawerElRef,
                class: ['mc-drawer', pure.value ? 'mc-drawer--pure' : '', `mc-drawer--${appearDirection.value}`]
            }, attrs);
            return createVNode('div', { class: 'mc-drawer-wrapper', style: cssVars.value }, [
                createVNode('div', mergedProps, [headerVNode.value, createVNode('div', { class: ['mc-drawer__body', bodyClass.value], style: bodyStyle.value }, [renderSlot$1(slots, 'default')])])
            ]);
        });
        const drawerContainerVNode = computed(() => {
            return createVNode('div', { class: 'mc-drawer-container' }, [
                createVNode(Transition, { name: 'mc-drawer-mask-fade', appear: true }, {
                    default: () => (show.value ? createVNode('div', { class: 'mc-drawer-mask' }) : null)
                }),
                createVNode(Transition, { name: `mc-drawer-appear-${appearDirection.value}`, appear: true, onBeforeEnter: callBeforeEnter, onAfterEnter: callAfterEnter, onAfterLeave: callAfterLeave }, {
                    default: () => (show.value ? drawerVNode.value : null)
                })
            ]);
        });
        provide(drawerInjectionKey, drawerElRef);
        expose({
            hide: () => callUpdateShow(false),
            el: drawerElRef
        });
        return () => (isMountDrawer.value ? createVNode(VLazyTeleport, { to: 'body', show: show.value }, { default: () => drawerContainerVNode.value }) : null);
    }
});

function McPopup(source, options = {}) {
    const PopupHostElement = ref(document.createElement('div'));
    const instance = ref();
    const visible = ref(false);
    const destroy = () => {
        instance.value = null;
        PopupHostElement.value = null;
    };
    const createDefaultVNode = () => {
        const { props: sourceProps = {}, on: sourceEmits = {} } = options;
        const props = {};
        const events = {};
        for (const [name, handler] of Object.entries(sourceEmits)) {
            events[`on${name.charAt(0).toUpperCase()}${name.slice(1)}`] = handler;
        }
        for (const [name, value] of Object.entries(sourceProps)) {
            props[name] = isRef(value) ? value.value : value;
        }
        return createVNode(typeof source === 'string' ? defineComponent({ template: source }) : source, { ...props, ...events });
    };
    const modalVNode = (props = {}, ctx) => {
        const { footer, header } = props.slots ?? {};
        return createVNode(McModal, {
            ref: instance,
            ...props,
            show: visible.value,
            'onUpdate:show': (value) => {
                visible.value = value;
                props['onUpdate:show']?.(value);
            },
            onAfterLeave: () => {
                (options.autoDestroy ?? true) && destroy();
                props['onAfterLeave']?.();
            },
            appearFromCursor: props.appearFromCursor || false
        }, {
            header,
            default: createDefaultVNode,
            footer
        });
    };
    const drawerVNode = props => {
        const { header } = props.slots ?? {};
        return createVNode(McDrawer, {
            ref: instance,
            ...props,
            show: visible.value,
            'onUpdate:show': (value) => {
                visible.value = value;
                props['onUpdate:show']?.(value);
            },
            onAfterLeave: () => {
                (options.autoDestroy ?? true) && destroy();
                props['onAfterLeave']?.();
            }
        }, {
            header,
            default: createDefaultVNode
        });
    };
    return {
        instance,
        show(maybePopupConfig, config = {}) {
            if (instance.value === null || PopupHostElement.value === null) {
                throw new Error('[McPopup]: Current instance has been destroyed.');
            }
            visible.value = true;
            if (typeof maybePopupConfig === 'string') {
                render$1(createVNode(maybePopupConfig === 'modal' ? modalVNode : drawerVNode, { ...config }), PopupHostElement.value);
            }
            else {
                render$1(createVNode(modalVNode, { ...(maybePopupConfig || {}) }), PopupHostElement.value);
            }
        },
        hide() {
            instance.value?.hide();
        },
        destroy
    };
}

const layoutIKey = Symbol('layout');
const layoutHeaderIKey = Symbol('layoutHeader');
const layoutContentIKey = Symbol('layoutContent');
const layoutFooterIKey = Symbol('layoutFooter');
const layoutSiderIKey = Symbol('layoutSider');
const basicColumnLayoutComponentIKey = Symbol('basicColumnLayoutComponent');
const basicRowLayoutComponentIKey = Symbol('basicRowLayoutComponent');
const layoutProps = {
    preset: {
        type: String,
        default: undefined
    },
    siderRight: {
        type: Boolean,
        default: false
    },
    siderWidth: {
        type: [String, Number],
        default: 100
    },
    leftSiderWidth: {
        type: [String, Number],
        default: 100
    },
    rightSiderWidth: {
        type: [String, Number],
        default: 100
    },
    fixedSider: {
        type: Boolean,
        default: undefined
    },
    fixedLeftSider: {
        type: Boolean,
        default: undefined
    },
    fixedRightSider: {
        type: Boolean,
        default: undefined
    },
    fixedHeader: {
        type: Boolean,
        default: undefined
    },
    fixedFooter: {
        type: Boolean,
        default: undefined
    },
    siderStyle: {
        type: [Object, String],
        default: undefined
    },
    leftSiderStyle: {
        type: [Object, String],
        default: undefined
    },
    rightSiderStyle: {
        type: [Object, String],
        default: undefined
    },
    headerStyle: {
        type: [Object, String],
        default: undefined
    },
    contentStyle: {
        type: [Object, String],
        default: undefined
    },
    footerStyle: {
        type: [Object, String],
        default: undefined
    },
    siderClass: {
        type: [Object, String, Array],
        default: undefined
    },
    leftSiderClass: {
        type: [Object, String, Array],
        default: undefined
    },
    rightSiderClass: {
        type: [Object, String, Array],
        default: undefined
    },
    headerClass: {
        type: [Object, String, Array],
        default: undefined
    },
    contentClass: {
        type: [Object, String, Array],
        default: undefined
    },
    footerClass: {
        type: [Object, String, Array],
        default: undefined
    },
    showSider: {
        type: Boolean,
        default: true
    },
    showLeftSider: {
        type: Boolean,
        default: true
    },
    showRightSider: {
        type: Boolean,
        default: true
    },
    showHeader: {
        type: Boolean,
        default: true
    },
    showContent: {
        type: Boolean,
        default: true
    },
    showFooter: {
        type: Boolean,
        default: true
    }
};
const layoutSiderProps = {
    width: {
        type: [String, Number],
        default: 100
    },
    bordered: {
        type: Boolean,
        default: false
    },
    collapsed: {
        type: Boolean,
        default: false
    },
    collapsable: {
        type: Boolean,
        default: false
    },
    collapsedWidth: {
        type: [String, Number],
        default: 64
    },
    triggerPosition: {
        type: Object,
        default: undefined
    },
    triggerType: {
        type: String,
        default: 'button'
    },
    transitionMode: {
        type: String,
        default: 'width'
    },
    onBeforeToggle: {
        type: Function,
        default: undefined
    }
};
const layoutHeaderProps = {
    bordered: {
        type: Boolean,
        default: false
    }
};

var McLayoutHeader = defineComponent({
    name: 'LayoutHeader',
    iKey: layoutHeaderIKey,
    props: layoutHeaderProps,
    setup(props, { slots }) {
        const { parent } = getCurrentInstance() ?? {};
        if (parent && parent.type.iKey !== layoutIKey) {
            throw new Error('[McLayoutHeader]: McLayoutHeader must be placed inside McLayout.');
        }
        const { bordered } = toRefs(props);
        // main logic...
        return () => {
            return createVNode('header', { class: ['mc-layout-header', bordered.value ? 'mc-layout-header--bordered' : ''] }, [renderSlot$1(slots, 'default')]);
        };
    }
});

var McLayoutContent = defineComponent({
    name: 'LayoutContent',
    iKey: layoutContentIKey,
    setup(props, { slots }) {
        const { parent } = getCurrentInstance() ?? {};
        if (parent && parent.type.iKey !== layoutIKey) {
            throw new Error('[McLayoutHeader]: McLayoutHeader must be placed inside McLayout.');
        }
        // main logic...
        return () => {
            return createVNode('main', { class: 'mc-layout-content' }, [renderSlot$1(slots, 'default')]);
        };
    }
});

var McLayoutFooter = defineComponent({
    name: 'LayoutFooter',
    iKey: layoutFooterIKey,
    props: layoutHeaderProps,
    setup(props, { slots }) {
        const { parent } = getCurrentInstance() ?? {};
        if (parent && parent.type.iKey !== layoutIKey) {
            throw new Error('[McLayoutHeader]: McLayoutHeader must be placed inside McLayout.');
        }
        const { bordered } = toRefs(props);
        // main logic...
        return () => {
            return createVNode('footer', { class: ['mc-layout-footer', bordered.value ? 'mc-layout-footer--bordered' : ''] }, [renderSlot$1(slots, 'default')]);
        };
    }
});

var McLayoutSider = defineComponent({
    name: 'LayoutSider',
    iKey: layoutSiderIKey,
    props: layoutSiderProps,
    emits: ['toggled'],
    setup(props, { slots, emit, expose }) {
        const { parent } = getCurrentInstance() ?? {};
        if (parent && parent.type.iKey !== layoutIKey) {
            throw new Error('[McLayoutSider]: McLayoutHeader must be placed inside McLayout.');
        }
        const { width, bordered, collapsed, collapsable, collapsedWidth, triggerPosition, triggerType, transitionMode, onBeforeToggle } = toRefs(props);
        const isCollapsed = ref(!!collapsed.value);
        const mergedWidth = computed(() => cssUnitTransform(isCollapsed.value ? collapsedWidth.value : width.value));
        const cssVars = computed(() => {
            const { top, bottom } = triggerPosition.value ?? {};
            return {
                '--layout-sider-width': mergedWidth.value,
                '--layout-sider-collapse-button-trigger-top': top || '50%',
                '--layout-sider-collapse-button-trigger-bottom': bottom || '',
                '--layout-sider-scroll-area-min-width': transitionMode.value === 'transform' ? cssUnitTransform(width.value) : ''
            };
        });
        const callToggle = async () => {
            const callback = await onBeforeToggle.value?.(isCollapsed.value);
            if (callback)
                return;
            isCollapsed.value = !isCollapsed.value;
            emit('toggled', isCollapsed.value);
        };
        const buttonTriggerVNode = () => {
            return createVNode(McButton, { circle: true, size: 'small' }, {
                icon: () => createVNode(McIcon, null, {
                    default: () => createVNode(ChevronBackSharp)
                })
            });
        };
        const collapseTriggerVNode = () => {
            return createVNode('div', { class: `mc-layout-sider__collapse-${triggerType.value}-trigger`, onClick: callToggle }, [slots.trigger ? renderSlot$1(slots, 'trigger') : triggerType.value === 'button' ? createVNode(buttonTriggerVNode) : null]);
        };
        expose({
            toggle: () => {
                isCollapsed.value = !isCollapsed.value;
            }
        });
        // main logic...
        return () => {
            return createVNode('aside', {
                class: ['mc-layout-sider', bordered.value ? 'mc-layout-sider--bordered' : '', isCollapsed.value ? 'mc-layout-sider--collapsed' : ''],
                style: cssVars.value
            }, [createVNode('div', { class: 'mc-layout-sider__scroll-area' }, [renderSlot$1(slots, 'default')]), collapsable.value ? createVNode(collapseTriggerVNode) : null]);
        };
    }
});

const BasicColumnLayoutComponent = (props, { slots, attrs }) => {
    const { siderPlacement = 'left', fixed, siderWidth, siderStyle, contentStyle, contentClass, siderClass, showSider = true, showContent = true } = props;
    const children = [
        showSider
            ? createVNode(McLayoutSider, { width: siderWidth, style: siderStyle, class: siderClass }, {
                default: () => renderSlot$1(slots, 'sider')
            })
            : null,
        showContent
            ? createVNode(McLayoutContent, { style: contentStyle, class: contentClass }, {
                default: () => renderSlot$1(slots, 'content')
            })
            : null
    ];
    siderPlacement === 'right' && children.reverse();
    return createVNode(Layout, { style: { height: '100%' } }, { default: () => children });
};
// @ts-ignore
BasicColumnLayoutComponent.iKey = basicColumnLayoutComponentIKey;
const BasicRowLayoutComponent = (props, { slots }) => {
    const { showHeader = true, showContent = true, showFooter = true, fixedHeader, headerStyle, contentStyle, footerStyle, headerClass, contentClass, footerClass } = props;
    return createVNode(Layout, { class: fixedHeader && showHeader ? 'mc-layout--header-fixed' : '' }, {
        default: () => [
            showHeader ? createVNode(McLayoutHeader, { class: headerClass, style: headerStyle }, { default: () => renderSlot$1(slots, 'header') }) : null,
            showContent ? createVNode(McLayoutContent, { class: contentClass, style: contentStyle }, { default: () => renderSlot$1(slots, 'content') }) : null,
            showFooter ? createVNode(McLayoutFooter, { class: footerClass, style: footerStyle }, { default: () => renderSlot$1(slots, 'footer') }) : null
        ]
    });
};
// @ts-ignore
BasicRowLayoutComponent.iKey = basicRowLayoutComponentIKey;
function createColumnLayout(props, slots) {
    return createVNode(BasicColumnLayoutComponent, { class: 'mc-layout-column-preset', ...props }, slots);
}
function createRowLayout(props, slots) {
    return createVNode(BasicRowLayoutComponent, { class: 'mc-layout-row-preset', ...props }, slots);
}

var mainCssr$3 = c$1([
    c$1('.mc-layout', {
        display: 'flex',
        flexDirection: 'column',
        overflow: 'auto',
        position: 'relative'
    }, [
        c$1('&--with-sider', {
            flexDirection: 'row'
        }),
        c$1('&--header-fixed', [
            c$1('& > .mc-layout-header', {
                width: '100%',
                position: 'absolute',
                top: 0
            }),
            c$1('& > .mc-layout-content', {
                paddingTop: 'var(--layout-header-height)',
                overflow: 'auto'
            })
        ])
    ]),
    c$1('.mc-layout, .mc-layout-header, .mc-layout-content, .mc-layout-footer', {
        transition: 'background 0.2s, border-color 0.2s'
    }),
    c$1('.mc-layout-sider', {
        transition: 'background 0.2s, border-color 0.2s, width 0.2s'
    }),
    c$1('.mc-layout--with-sider > .mc-layout', { flex: 1 }),
    c$1('.mc-layout--with-sider > .mc-layout-content', { flex: 1 }),
    c$1('.mc-layout__scroll-area', { width: '100%', minHeight: '100%', overflow: 'auto', boxSizing: 'border-box' }),
    c$1('.mc-layout-column-preset', {}),
    c$1('.mc-layout-row-preset', [c$1('& > .mc-layout-content', { flex: 1 })]),
    c$1('.mc-layout-sider', {
        position: 'relative',
        width: 'var(--layout-sider-width)',
        display: 'flex',
        justifyContent: 'flex-end'
    }, [
        c$1('&--fixed', { position: 'absolute', right: 0, height: '100%' }),
        c$1('&--bordered&--left', { borderRight: '1px solid' }),
        c$1('&--bordered&--right', { borderLeft: '1px solid' }),
        c$1('&__scroll-area', {
            flexGrow: 1,
            flexShrink: 0,
            boxSizing: 'border-box',
            height: '100%',
            maxWidth: '100%',
            overflow: 'auto',
            minWidth: 'var(--layout-sider-scroll-area-min-width)'
        }),
        c$1('&__collapse-button-trigger, &__collapse-bar-trigger', {
            position: 'absolute',
            top: 'var(--layout-sider-collapse-button-trigger-top)',
            bottom: 'var(--layout-sider-collapse-button-trigger-bottom)',
            zIndex: 10,
            transition: '0.2s',
            cursor: 'pointer'
        }),
        c$1('&--left > .mc-layout-sider__collapse-button-trigger', {
            right: '-1px',
            transform: 'translateY(-50%) translateX(50%)'
        }),
        c$1('&--right > .mc-layout-sider__collapse-button-trigger', {
            left: '-1px',
            transform: 'translateY(-50%) translateX(-50%) rotate(-180deg)'
        }),
        c$1('&--collapsed&--left > .mc-layout-sider__collapse-button-trigger', {
            right: '-14px',
            transform: 'translateY(-50%) translateX(50%) rotate(-180deg)'
        }),
        c$1('&--collapsed&--right > .mc-layout-sider__collapse-button-trigger', {
            left: '-14px',
            transform: 'translateY(-50%) translateX(-50%)'
        }),
        c$1('&__collapse-bar-trigger', {
            display: 'flex',
            flexDirection: 'column',
            width: '20px',
            alignItems: 'center',
            transform: 'translateY(-50%)'
        }, [
            c$1('&::before, &::after', {
                content: '""',
                height: '37.5px',
                width: '4px',
                borderRadius: '2px',
                display: 'block',
                position: 'relative',
                transition: '0.2s'
            }),
            c$1('&::before', {
                top: '1.5px'
            }),
            c$1('&::after', {
                bottom: '1.5px'
            })
        ]),
        c$1('&--left > .mc-layout-sider__collapse-bar-trigger', {
            right: '-20px'
        }, [
            c$1('&:hover:before', {
                transform: 'rotate(10deg)'
            }),
            c$1('&:hover:after', {
                transform: 'rotate(-10deg)'
            })
        ]),
        c$1('&--right > .mc-layout-sider__collapse-bar-trigger', {
            left: '-20px'
        }, [
            c$1('&:hover::before', {
                transform: 'rotate(-10deg)'
            }),
            c$1('&:hover::after', {
                transform: 'rotate(10deg)'
            })
        ]),
        c$1('&--collapsed&--left > .mc-layout-sider__collapse-bar-trigger', [
            c$1('&:hover::before', {
                transform: 'rotate(-10deg)'
            }),
            c$1('&:hover::after', {
                transform: 'rotate(10deg)'
            })
        ]),
        c$1('&--collapsed&--right > .mc-layout-sider__collapse-bar-trigger', [
            c$1('&:hover:before', {
                transform: 'rotate(10deg)'
            }),
            c$1('&:hover:after', {
                transform: 'rotate(-10deg)'
            })
        ])
    ]),
    c$1('.mc-layout-header', {}, [c$1('&--bordered', { borderBottom: '1px solid' })]),
    c$1('.mc-layout-content', {}, []),
    c$1('.mc-layout-footer', {}, [c$1('&--bordered', { borderTop: '1px solid' })])
]);

var lightCssr$3 = c$1([
    c$1('.mc-layout-content', {
        color: '#333639'
    }),
    c$1('.mc-layout-sider, .mc-layout-header, .mc-layout-footer', {
        color: '#333639'
    }),
    c$1('.mc-layout-sider--bordered.mc-layout-sider--left, .mc-layout-sider--bordered.mc-layout-sider--right, .mc-layout-header--bordered, .mc-layout-footer--bordered', { borderColor: 'rgb(239, 239, 245)' }),
    c$1('.mc-layout-sider__collapse-bar-trigger', [
        c$1('&::before, &::after', {
            background: 'rgba(191, 191, 191, 1)'
        }),
        c$1('&:hover:before, &:hover:after', {
            background: 'rgba(153, 153, 153, 1)'
        })
    ])
]);

var darkCssr$3 = c$1([
    c$1('.mc-layout-content', {
        color: '#FFFFFFD1',
        background: 'rgb(16, 16, 20)'
    }),
    c$1('.mc-layout-sider, .mc-layout-header, .mc-layout-footer', {
        color: '#FFFFFFD1',
        background: 'rgb(24, 24, 28)'
    }),
    c$1('.mc-layout-sider--bordered.mc-layout-sider--left, .mc-layout-sider--bordered.mc-layout-sider--right, .mc-layout-header--bordered, .mc-layout-footer--bordered', { borderColor: 'rgba(255, 255, 255, 0.09)' }),
    c$1('.mc-layout-sider__collapse-bar-trigger', [
        c$1('&::before, &::after', {
            background: 'rgba(64, 64, 67, 1)'
        }),
        c$1('&:hover:before, &:hover:after', {
            background: 'rgba(88, 88, 91, 1)'
        })
    ])
]);

var Layout = defineComponent({
    name: 'Layout',
    iKey: layoutIKey,
    props: layoutProps,
    setup(props, { slots }) {
        // theme register
        onMounted(() => {
            useThemeRegister({
                key: 'McLayout',
                main: mainCssr$3,
                light: lightCssr$3,
                dark: darkCssr$3
            });
        });
        const { preset, siderRight, siderWidth, leftSiderWidth, rightSiderWidth, fixedSider, fixedLeftSider, fixedRightSider, fixedHeader, fixedFooter, siderStyle, leftSiderStyle, rightSiderStyle, siderClass, leftSiderClass, rightSiderClass, headerStyle, contentStyle, footerStyle, headerClass, contentClass, footerClass, showSider, showLeftSider, showRightSider, showHeader, showContent, showFooter } = toRefs(props);
        const McLayout = resolveComponent('McLayout', true);
        // main logic...
        return () => {
            if (preset.value === 'two-column') {
                return createColumnLayout({
                    siderPlacement: siderRight.value ? 'right' : 'left',
                    fixed: fixedSider.value,
                    siderWidth: siderWidth.value,
                    siderStyle: siderStyle.value,
                    siderClass: siderClass.value,
                    contentStyle: contentStyle.value,
                    contentClass: contentClass.value,
                    showSider: showSider.value,
                    showContent: showContent.value
                }, {
                    sider: () => renderSlot$1(slots, 'sider'),
                    content: () => renderSlot$1(slots, 'content')
                });
            }
            else if (preset.value === 'three-column') {
                return createColumnLayout({
                    siderPlacement: 'left',
                    fixed: fixedLeftSider.value,
                    siderWidth: leftSiderWidth.value,
                    siderStyle: leftSiderStyle.value,
                    siderClass: leftSiderClass.value,
                    contentStyle: contentStyle.value,
                    contentClass: contentClass.value,
                    showSider: showLeftSider.value,
                    showContent: showContent.value
                }, {
                    sider: () => renderSlot$1(slots, 'left-sider'),
                    content: () => createColumnLayout({
                        siderPlacement: 'right',
                        fixed: fixedRightSider.value,
                        siderWidth: rightSiderWidth.value,
                        siderStyle: rightSiderStyle.value,
                        siderClass: rightSiderClass.value,
                        contentStyle: contentStyle.value,
                        contentClass: contentClass.value,
                        showSider: showRightSider.value,
                        showContent: showContent.value
                    }, {
                        sider: () => renderSlot$1(slots, 'right-sider'),
                        content: () => renderSlot$1(slots, 'content')
                    })
                });
            }
            else if (preset.value === 'full') {
                return createRowLayout({
                    headerStyle: headerStyle.value,
                    contentStyle: contentStyle.value,
                    footerStyle: footerStyle.value,
                    headerClass: headerClass.value,
                    contentClass: contentClass.value,
                    footerClass: footerClass.value,
                    fixedHeader: fixedHeader.value,
                    fixedFooter: fixedFooter.value,
                    showHeader: showHeader.value,
                    showContent: showContent.value,
                    showFooter: showFooter.value
                }, {
                    header: () => renderSlot$1(slots, 'header'),
                    content: () => renderSlot$1(slots, 'content'),
                    footer: () => renderSlot$1(slots, 'footer')
                });
            }
            else if (preset.value === 'holy') {
                return createRowLayout({
                    headerStyle: headerStyle.value,
                    contentStyle: contentStyle.value,
                    footerStyle: footerStyle.value,
                    headerClass: headerClass.value,
                    contentClass: contentClass.value,
                    footerClass: footerClass.value,
                    fixedHeader: fixedHeader.value,
                    fixedFooter: fixedFooter.value,
                    showHeader: showHeader.value,
                    showContent: showContent.value,
                    showFooter: showFooter.value
                }, {
                    header: () => renderSlot$1(slots, 'header'),
                    content: () => createColumnLayout({
                        siderPlacement: 'left',
                        fixed: fixedLeftSider.value,
                        siderWidth: leftSiderWidth.value,
                        siderStyle: leftSiderStyle.value,
                        siderClass: leftSiderClass.value,
                        contentStyle: contentStyle.value,
                        contentClass: contentClass.value,
                        showSider: showLeftSider.value,
                        showContent: showContent.value
                    }, {
                        sider: () => renderSlot$1(slots, 'left-sider'),
                        content: () => createColumnLayout({
                            siderPlacement: 'right',
                            fixed: fixedRightSider.value,
                            siderWidth: rightSiderWidth.value,
                            siderStyle: rightSiderStyle.value,
                            siderClass: rightSiderClass.value,
                            contentStyle: contentStyle.value,
                            contentClass: contentClass.value,
                            showSider: showRightSider.value,
                            showContent: showContent.value
                        }, {
                            sider: () => renderSlot$1(slots, 'right-sider'),
                            content: () => renderSlot$1(slots, 'content')
                        })
                    }),
                    footer: () => renderSlot$1(slots, 'footer')
                });
            }
            const headerVNode = getSlotFirstVNode(slots.default, layoutHeaderIKey);
            const contentVNode = getSlotFirstVNode(slots.default, layoutContentIKey);
            const footerVNode = getSlotFirstVNode(slots.default, layoutFooterIKey);
            const layoutVNode = getSlotFirstVNode(slots.default, layoutIKey);
            const siderVNode = getSlotFirstVNode(slots.default, layoutSiderIKey);
            const basicColumnLayoutVNode = getSlotFirstVNode(slots.default, basicColumnLayoutComponentIKey);
            const basicRowLayoutVNode = getSlotFirstVNode(slots.default, basicRowLayoutComponentIKey);
            const needExtraLayout = siderVNode && !layoutVNode && (headerVNode || footerVNode);
            const children = [
                !needExtraLayout ? headerVNode : null,
                needExtraLayout ? createVNode(McLayout, null, { default: () => [headerVNode, contentVNode, footerVNode] }) : (basicColumnLayoutVNode || basicRowLayoutVNode) ?? layoutVNode ?? contentVNode,
                !needExtraLayout ? footerVNode : null
            ];
            if (siderVNode) {
                const siderIndex = getSlotVNodeIndex(slots.default, siderVNode?.type?.iKey);
                const layoutIndex = getSlotVNodeIndex(slots.default, layoutVNode?.type?.iKey);
                const contentIndex = getSlotVNodeIndex(slots.default, contentVNode?.type?.iKey);
                const compareCond = layoutIndex > -1 ? siderIndex > layoutIndex : contentIndex > -1 ? siderIndex > contentIndex : siderIndex === slots.default?.().length - 1;
                if (compareCond) {
                    children.push(createVNode(siderVNode, { class: 'mc-layout-sider--right' }));
                }
                else {
                    children.unshift(createVNode(siderVNode, { class: 'mc-layout-sider--left' }));
                }
            }
            return createVNode('div', { class: ['mc-layout', siderVNode ? `mc-layout--with-sider` : ''] }, children);
        };
    }
});

const menuInjectionKey = Symbol();
const subMenuInjectionKey = Symbol();
const menuGroupInjectionKey = Symbol();
const menuIKey = Symbol('menu');
const menuItemIKey = Symbol('menuItem');
const menuItemGroupIKey = Symbol('menuItemGroup');
const subMenuIKey = Symbol('subMenu');
const menuProps = {
    value: {
        type: [String, Number, Symbol],
        default: undefined
    },
    expandKeys: {
        type: Array,
        default: undefined
    },
    disabled: {
        type: Boolean,
        default: false
    },
    indent: {
        type: Number,
        default: 28
    },
    unique: {
        type: Boolean,
        default: false
    },
    collapsed: {
        type: Boolean,
        default: false
    },
    collapsedWidth: {
        type: Number,
        default: 64
    },
    collapsedIconSize: {
        type: Number,
        default: 20
    },
    horizontal: {
        type: Boolean,
        default: false
    },
    options: {
        type: Array,
        default: undefined
    }
};
const menuItemProps = {
    disabled: {
        type: Boolean,
        default: false
    },
    indent: {
        type: [Number, String],
        default: undefined
    }
};
const menuItemGroupProps = {
    title: {
        type: [String, Function],
        default: undefined
    },
    disabled: {
        type: Boolean,
        default: false
    },
    indent: {
        type: [Number, String],
        default: undefined
    }
};
const subMenuProps = {
    title: {
        type: [String, Function],
        default: undefined
    },
    disabled: {
        type: Boolean,
        default: false
    },
    indent: {
        type: [Number, String],
        default: undefined
    },
    unique: {
        type: Boolean,
        default: false
    }
};

var McMenuItem = defineComponent({
    name: 'MenuItem',
    props: menuItemProps,
    iKey: menuItemIKey,
    setup(props, { slots, attrs }) {
        const instance = getCurrentInstance();
        const key = instance?.vnode.key ?? '';
        const isParentMenu = computed(() => checkParent(menuIKey, instance?.parent));
        const isParentMenuItemGroup = computed(() => checkParent(menuItemGroupIKey, instance?.parent));
        const { indent, disabled } = toRefs(props);
        const { activeKey, updateKey, padding: menuPadding, isCollapsed, isDisabled: isMenuDisabled } = inject(menuInjectionKey, null) ?? {};
        const { padding: subMenuPadding, isDisabled: isSubMenuDisabled, hidePopover: hideSubMenuPopover } = inject(subMenuInjectionKey, null) ?? {};
        const { padding: menuItemGroupPadding, isDisabled: isMenuItemGroupDisabled, hidePopover: hideMenuItemGroupPopover } = inject(menuGroupInjectionKey, null) ?? {};
        const isActive = computed(() => !!(key && key === activeKey?.value));
        const selfPadding = computed(() => (typeof indent.value === 'number' ? indent.value : isParentMenuItemGroup.value ? (menuItemGroupPadding?.value || 0) + 16 : ((isParentMenu.value ? menuPadding?.value : subMenuPadding?.value) || 0) + 32));
        const mergedDisabled = or(isMenuDisabled, isParentMenuItemGroup.value ? isMenuItemGroupDisabled?.value : isSubMenuDisabled?.value, disabled);
        const cssVars = computed(() => {
            return {
                '--menu-item-padding-left': `${selfPadding.value}px`
            };
        });
        // main logic...
        return () => createComponentVNode(McTooltip, { disabled: or(not(isCollapsed), not(isParentMenu), mergedDisabled).value, content: () => renderSlot$1(slots, 'default'), placement: 'right' }, {
            default: () => createElementVNode('li', {
                class: ['mc-menu-item', isActive.value ? 'mc-menu-item--active' : '', disabled.value ? 'mc-menu-item--disabled' : ''],
                style: cssVars.value,
                onClick: () => {
                    if (mergedDisabled.value)
                        return;
                    key && updateKey?.(key);
                    hideSubMenuPopover?.();
                    hideMenuItemGroupPopover?.();
                }
            }, [slots.icon ? createVNode('div', { class: 'mc-menu-item__icon' }, [renderSlot$1(slots, 'icon')]) : null, createVNode('div', mergeProps({ class: 'mc-menu-item__content' }, attrs), [renderSlot$1(slots, 'default')])], 2 /* CLASS */ | 4 /* STYLE */ | 16 /* FULL_PROPS */),
            _: 3 /* FORWARDED */
        }, 8 /* PROPS */, ['disabled', 'content']);
    }
});

var widthCssr = c$1([
    c$1('&.fade-in-width-expand-transition-leave-from, &.fade-in-width-expand-transition-enter-to', {
        opacity: 1
    }),
    c$1('&.fade-in-width-expand-transition-leave-to, &.fade-in-width-expand-transition-enter-from', `
        opacity: 0!important;
        margin-left: 0!important;
        margin-right: 0!important;
      `)
]);

var heightCssr = c$1([
    c$1(`&.fade-in-height-expand-transition-leave-from, &.fade-in-height-expand-transition-enter-to`, {
        opacity: 1
    }),
    c$1(`&.fade-in-height-expand-transition-leave-to, &.fade-in-height-expand-transition-enter-from`, {
        opacity: 0,
        marginTop: '0 !important',
        marginBottom: '0 !important',
        paddingTop: '0 !important',
        paddingBottom: '0 !important'
    })
]);

var McFadeInExpandTransition = defineComponent({
    name: 'FadeInExpandTransition',
    props: {
        appear: Boolean,
        group: Boolean,
        mode: String,
        onLeave: Function,
        onAfterLeave: Function,
        onAfterEnter: Function,
        width: Boolean,
        // reverse mode is only used in tree
        // it make it from expanded to collapsed after mounted
        reverse: Boolean
    },
    setup(props, { slots }) {
        onMounted(() => {
            useThemeRegister({
                key: 'McFadeInExpandTransition',
                main: props.width ? widthCssr : heightCssr
            });
        });
        function handleBeforeLeave(el) {
            if (props.width) {
                el.style.maxWidth = `${el.offsetWidth}px`;
            }
            else {
                el.style.maxHeight = `${el.offsetHeight}px`;
            }
            void el.offsetWidth;
        }
        function handleLeave(el) {
            if (props.width) {
                el.style.maxWidth = '0';
            }
            else {
                el.style.maxHeight = '0';
            }
            void el.offsetWidth;
            const { onLeave } = props;
            if (onLeave)
                onLeave();
        }
        function handleAfterLeave(el) {
            if (props.width) {
                el.style.maxWidth = '';
            }
            else {
                el.style.maxHeight = '';
            }
            const { onAfterLeave } = props;
            if (onAfterLeave)
                onAfterLeave();
        }
        function handleEnter(el) {
            el.style.transition = 'none';
            if (props.width) {
                const memorizedWidth = el.offsetWidth;
                el.style.maxWidth = '0';
                void el.offsetWidth;
                el.style.transition = '';
                el.style.maxWidth = `${memorizedWidth}px`;
            }
            else {
                if (props.reverse) {
                    el.style.maxHeight = `${el.offsetHeight}px`;
                    void el.offsetHeight;
                    el.style.transition = '';
                    el.style.maxHeight = '0';
                }
                else {
                    const memorizedHeight = el.offsetHeight;
                    el.style.maxHeight = '0';
                    void el.offsetWidth;
                    el.style.transition = '';
                    el.style.maxHeight = `${memorizedHeight}px`;
                }
            }
            void el.offsetWidth;
        }
        function handleAfterEnter(el) {
            if (props.width) {
                el.style.maxWidth = '';
            }
            else {
                if (!props.reverse) {
                    el.style.maxHeight = '';
                }
            }
            props.onAfterEnter?.();
        }
        return () => {
            const type = props.group ? TransitionGroup : Transition;
            return createVNode(type, {
                name: props.width ? 'fade-in-width-expand-transition' : 'fade-in-height-expand-transition',
                mode: props.mode,
                appear: props.appear,
                onEnter: handleEnter,
                onAfterEnter: handleAfterEnter,
                onBeforeLeave: handleBeforeLeave,
                onLeave: handleLeave,
                onAfterLeave: handleAfterLeave
            }, slots);
        };
    }
});

var iconSwitchCssr = c$1([
    c$1('&.icon-switch-transition-enter-from, &.icon-switch-transition-leave-to', {
        transform: 'scale(0.75)',
        opacity: 0
    }),
    c$1('&.icon-switch-transition-enter-to, &.icon-switch-transition-leave-from', {
        transform: `scale(1)`,
        opacity: 1
    }),
    c$1('&.icon-switch-transition-enter-active, &.icon-switch-transition-leave-active', {
        transformOrigin: 'center',
        position: 'absolute',
        transition: `all 0.2s cubic-bezier(.4, 0, .2, 1) !important`
    })
]);

var McIconSwitchTransition = defineComponent({
    name: 'BaseIconSwitchTransition',
    setup(_, { slots }) {
        onMounted(() => {
            useThemeRegister({
                key: 'McIconSwitchTransition',
                main: iconSwitchCssr
            });
        });
        return () => createVNode(Transition, { name: 'icon-switch-transition' }, {
            default: () => renderSlot$1(slots, 'default')
        });
    }
});

var McMenuItemGroup = defineComponent({
    name: 'MenuItemGroup',
    iKey: menuItemGroupIKey,
    props: menuItemGroupProps,
    setup(props, { slots, attrs }) {
        const instance = getCurrentInstance();
        const isParentMenu = computed(() => checkParent(menuIKey, instance?.parent));
        const isParentSubMenu = computed(() => checkParent(subMenuIKey, instance?.parent));
        const { indent, disabled } = toRefs(props);
        const { activeKey, padding: menuPadding, isCollapsed: isMenuCollapsed, isHorizontal: isMenuHorizontal, isDisabled: isMenuDisabled } = inject(menuInjectionKey, null) ?? {};
        const { padding: subMenuPadding, isDisabled: isSubMenuDisabled } = inject(subMenuInjectionKey, null) ?? {};
        const hasCollapsed = ref(isMenuCollapsed?.value);
        const isActive = computed(() => {
            const keys = flattenWithOptions({ slots, key: menuItemIKey, infinity: true }).map(item => {
                return item.key;
            });
            return !!(activeKey?.value && keys.includes(activeKey.value));
        });
        const selfPadding = computed(() => (typeof indent.value === 'number' ? indent.value : isParentSubMenu.value ? (subMenuPadding?.value || 0) + 16 : (menuPadding?.value || 0) + 32));
        const mergedDisabled = or(isMenuDisabled, isSubMenuDisabled, disabled);
        const menuPopoverPlacement = computed(() => {
            if (isMenuHorizontal?.value) {
                return 'bottom';
            }
            else if (isMenuCollapsed?.value) {
                return 'right-start';
            }
        });
        const menuPopoverDisabled = or(mergedDisabled, not(and(isParentMenu, or(isMenuHorizontal, isMenuCollapsed))));
        const menuPopoverRef = ref();
        const cssVars = computed(() => {
            return {
                '--menu-item-group-padding-left': `${selfPadding.value}px`
            };
        });
        const handleHidePopover = () => {
            menuPopoverRef.value?.hide();
        };
        provide(menuGroupInjectionKey, {
            padding: selfPadding,
            isDisabled: disabled,
            hidePopover: handleHidePopover
        });
        // main logic...
        return () => createElementVNode('li', {
            class: [
                'mc-menu-item-group',
                and(hasCollapsed, isParentMenu).value ? 'mc-menu-item-group--collapsed' : '',
                and(isActive, not(menuPopoverDisabled)).value ? 'mc-menu-item-group--child-active' : '',
                disabled.value ? 'mc-menu-item-group--disabled' : ''
            ]
        }, [
            createComponentVNode(McPopover, {
                ref_key: 'menuPopoverRef',
                ref: menuPopoverRef,
                disabled: menuPopoverDisabled.value,
                placement: menuPopoverPlacement.value,
                withArrow: false,
                style: { padding: '4px 0', width: '200px', [menuPopoverPlacement.value === 'bottom' ? 'marginTop' : 'marginLeft']: '4px' },
                class: ['mc-menu-item-group mc-menu-item-group--dropdown']
            }, {
                content: () => createElementVNode('ul', mergeProps({ class: 'mc-menu-item-group-children' }, attrs), [renderSlot$1(slots, 'default')]),
                default: () => createElementVNode('div', { class: 'mc-menu-item-group-title', style: cssVars.value }, [createElementVNode('span', { class: 'mc-menu-item-group-title__content' }, [propsMergeSlots(props, slots, 'title')])], 16 /* FULL_PROPS */)
            }, 2 /* CLASS */ | 4 /* STYLE */ | 8 /* PROPS */, ['disabled', 'placement']),
            and(isMenuHorizontal, isParentMenu).value
                ? null
                : createComponentVNode(McFadeInExpandTransition, {
                    onAfterLeave: () => (hasCollapsed.value = true),
                    onEnter: () => (hasCollapsed.value = false)
                }, {
                    default: () => createDirectives('v-if', {
                        condition: not(and(isMenuCollapsed, isParentMenu)).value,
                        node: createElementVNode('ul', mergeProps({ class: 'mc-menu-item-group-children' }, attrs), [renderSlot$1(slots, 'default')])
                    }),
                    _: 3 /* FORWARDED */
                })
        ], 2 /* CLASS */);
    }
});

var McSubMenu = defineComponent({
    name: 'SubMenu',
    iKey: subMenuIKey,
    props: subMenuProps,
    setup(props, { slots, attrs }) {
        const instance = getCurrentInstance();
        const key = instance?.vnode.key ?? '';
        const isParentMenu = computed(() => checkParent(menuIKey, instance?.parent));
        const isParentSubMenu = computed(() => checkParent(subMenuIKey, instance?.parent));
        const isParentMenuItemGroup = computed(() => checkParent(menuItemGroupIKey, instance?.parent));
        const { unique, indent, disabled } = toRefs(props);
        const { activeKey, expandedKeys, updateExpandKeys, padding: menuPadding, keyTree, options, isUnique: isMenuUnique, isCollapsed: isMenuCollapsed, isHorizontal: isMenuHorizontal, isDisabled: isMenuDisabled } = inject(menuInjectionKey, null) ?? {};
        const { padding: subMenuPadding, isUnique: isSubMenuUnique, isDisabled: isSubMenuDisabled, hidePopover: hideSubMenuPopover } = inject(subMenuInjectionKey, null) ?? {};
        const { padding: menuItemGroupPadding, isDisabled: isMenuItemGroupDisabled, hidePopover: hideMenuItemGroupPopover } = inject(menuGroupInjectionKey, null) ?? {};
        const isExpanded = computed(() => expandedKeys?.value.includes(key || ''));
        const isActive = computed(() => {
            const keys = flattenWithOptions({ slots, key: menuItemIKey, infinity: true }).map(item => {
                return item.key;
            });
            return !!(activeKey?.value && keys.includes(activeKey.value));
        });
        const selfPadding = computed(() => (typeof indent.value === 'number' ? indent.value : isParentMenuItemGroup.value ? (menuItemGroupPadding?.value || 0) + 16 : ((isParentMenu.value ? menuPadding?.value : subMenuPadding?.value) || 0) + 32));
        const mergedDisabled = or(isMenuDisabled, isParentMenuItemGroup.value ? isMenuItemGroupDisabled?.value : isSubMenuDisabled?.value, disabled);
        const watchUnique = or(and(isMenuUnique, isParentMenu), and(isSubMenuUnique, isParentSubMenu));
        const menuPopoverPlacement = computed(() => {
            if (isMenuHorizontal?.value) {
                return isParentMenu.value ? 'bottom' : 'right-start';
            }
            else if (isMenuCollapsed?.value) {
                return 'right-start';
            }
        });
        const menuPopoverDisabled = or(mergedDisabled, and(not(isMenuCollapsed), not(isMenuHorizontal)));
        const menuPopoverRef = ref();
        const cssVars = computed(() => {
            return {
                '--menu-submenu-padding-left': `${selfPadding.value}px`
            };
        });
        const handleHidePopover = () => {
            menuPopoverRef.value?.hide();
            hideSubMenuPopover?.();
            hideMenuItemGroupPopover?.();
        };
        provide(subMenuInjectionKey, {
            padding: selfPadding,
            isDisabled: disabled,
            isUnique: unique,
            hidePopover: handleHidePopover
        });
        // main logic...
        return () => createElementVNode('li', { class: ['mc-sub-menu', and(not(isExpanded), menuPopoverDisabled).value ? 'mc-sub-menu--collapsed' : '', isActive.value ? 'mc-sub-menu--child-active' : '', disabled.value ? 'mc-sub-menu--disabled' : ''] }, [
            createComponentVNode(McPopover, {
                ref: menuPopoverRef,
                disabled: menuPopoverDisabled.value,
                placement: menuPopoverPlacement.value,
                withArrow: false,
                style: { padding: '4px 0', width: '200px', [menuPopoverPlacement.value === 'bottom' ? 'marginTop' : 'marginLeft']: '4px' },
                class: ['mc-sub-menu mc-sub-menu--dropdown', `mc-sub-menu--placement-${menuPopoverPlacement.value}`]
            }, {
                content: () => createElementVNode('ul', mergeProps({ class: 'mc-sub-menu-children', style: { margin: 0 } }, attrs), [renderSlot$1(slots, 'default')]),
                default: () => createElementVNode('div', {
                    class: 'mc-sub-menu-title',
                    style: cssVars.value,
                    onClick: () => {
                        if (or(isMenuCollapsed, isMenuHorizontal, mergedDisabled).value)
                            return;
                        if (or(not(watchUnique), isExpanded).value) {
                            updateExpandKeys?.(key);
                        }
                        else {
                            const keys = isParentMenu.value ? keyTree.map(item => item.children && item.key).filter(Boolean) : findParent(options?.value ?? keyTree, key)?.children?.map((item) => item.key) ?? [];
                            updateExpandKeys?.([...expandedKeys?.value.filter(key => !keys.includes(key)), key]);
                        }
                    }
                }, [
                    slots.icon ? createElementVNode('div', { class: 'mc-sub-menu-title__icon' }, [renderSlot$1(slots, 'icon')]) : null,
                    createElementVNode('span', { class: 'mc-sub-menu-title__content' }, [propsMergeSlots(props, slots, 'title')]),
                    and(isMenuHorizontal, isParentMenu).value
                        ? null
                        : createComponentVNode(McIcon, { class: 'mc-sub-menu-title__arrow' }, {
                            default: () => createComponentVNode(or(isMenuCollapsed, menuPopoverPlacement.value === 'right-start').value ? ChevronForwardOutline : ChevronUpOutline)
                        })
                ], 16 /* FULL_PROPS */),
                _: 3 /* FORWARDED */
            }, 2 /* CLASS */ | 4 /* STYLE */ | 8 /* PROPS */, ['disabled', 'placement']),
            isMenuHorizontal?.value
                ? null
                : createComponentVNode(McFadeInExpandTransition, null, {
                    default: () => createDirectives('v-if', {
                        condition: and(isExpanded, not(isMenuCollapsed)).value,
                        node: createElementVNode('ul', mergeProps({ class: 'mc-sub-menu-children' }, attrs), [renderSlot$1(slots, 'default')])
                    }),
                    _: 3 /* FORWARDED */
                })
        ], 2 /* CLASS */);
    }
});

function createKeyTree(children, result = []) {
    children.forEach(vnode => {
        const { iKey } = vnode.type;
        const subChildren = vnode.children.default?.();
        if (iKey === menuItemIKey) {
            result.push({ key: vnode.key ?? '' });
        }
        else if (iKey === subMenuIKey) {
            result.push({
                key: vnode.key ?? '',
                children: createKeyTree(subChildren)
            });
        }
        else if (iKey === menuItemGroupIKey) {
            const items = flatten$1(subChildren, [subMenuIKey, menuItemIKey]);
            createKeyTree(items, result);
        }
    });
    return result;
}
function createMenu(option) {
    const { key, label, icon, indent, disabled, unique, group, children, style, class: itemClass } = option;
    if (group) {
        return createVNode(McMenuItemGroup, { indent, disabled, title: label, style, class: itemClass }, {
            default: () => (children ?? []).map(item => createMenu(item))
        });
    }
    else if (children) {
        return createVNode(McSubMenu, { key, indent, disabled, unique, title: label, style, class: itemClass }, {
            icon,
            default: () => children.map(item => createMenu(item))
        });
    }
    else {
        return createVNode(McMenuItem, { key, indent, disabled, style, class: itemClass }, {
            icon,
            default: typeof label === 'string' ? () => label : label
        });
    }
}
function findPath(tree, key, path = []) {
    for (let i = 0; i < tree.length; i++) {
        const tempPath = [...path];
        tempPath.push(tree[i].key);
        if (tree[i].key === key)
            return tempPath;
        if (tree[i].children) {
            const result = findPath(tree[i].children, key, tempPath);
            if (result)
                return result;
        }
    }
}
function findParent(tree, key) {
    for (let i = 0; i < tree.length; i++) {
        if (tree[i].children) {
            const index = tree[i].children.findIndex((item) => item.key === key);
            if (index > -1)
                return tree[i];
            const result = findParent(tree[i].children, key);
            if (result)
                return result;
        }
    }
}

var mainCssr$2 = c$1([
    c$1('.mc-menu, .mc-menu-item-group, .mc-sub-menu', {
        listStyle: 'none',
        padding: 0,
        margin: 0
    }),
    c$1('.mc-menu', {
        transition: 'width 0.2s',
        width: '100%',
        padding: '4px 0'
    }, [
        c$1('& > .mc-sub-menu:not(:last-child), & > .mc-menu-item:not(:last-child), & > .mc-menu-item-group:not(:last-child)', {
            marginBottom: '4px'
        }),
        c$1('&--collapsed', {
            width: 'var(--menu-collapsed-width)'
        }, [
            c$1('& > .mc-menu-item, & > .mc-sub-menu .mc-sub-menu-title', {
                padding: 'var(--menu-collapsed-padding)'
            }),
            c$1('.mc-menu-item__icon > .mc-icon, .mc-sub-menu-title__icon > .mc-icon', {
                fontSize: 'var(--menu-collapsed-icon-size)'
            })
        ]),
        c$1('&--disabled', [
            c$1('.mc-menu-item, .mc-sub-menu-title, .mc-menu-item-group > .mc-menu-item-group-title', {
                cursor: 'not-allowed'
            })
        ])
    ]),
    c$1('.mc-menu-item', {
        height: '40px',
        display: 'flex',
        alignItems: 'center',
        cursor: 'pointer',
        borderRadius: '4px',
        transition: 'background-color 0.2s, padding-left 0.2s, border-color 0.2s, color 0.2s',
        paddingLeft: 'var(--menu-item-padding-left)',
        paddingRight: '16px',
        position: 'relative'
    }, [
        c$1('&--disabled', {
            cursor: 'not-allowed'
        }),
        c$1('&__icon', {
            display: 'flex',
            marginRight: '8px'
        }, [
            c$1('.mc-icon', {
                transition: 'width 0.2s'
            })
        ]),
        c$1('&__content', {
            flex: 1,
            overflow: 'hidden',
            zIndex: 1
        }),
        c$1('&::before', {
            content: '""',
            zIndex: 'auto',
            position: 'absolute',
            left: '4px',
            right: '4px',
            top: '0',
            bottom: '0',
            pointerEvents: 'none',
            borderRadius: '4px',
            transition: 'background-color 0.2s'
        })
    ]),
    c$1('.mc-menu-item-group', [
        c$1('&--disabled', [
            c$1('.mc-menu-item, .mc-sub-menu-title', {
                cursor: 'not-allowed'
            })
        ]),
        c$1('&-title', {
            height: '32px',
            paddingLeft: 'var(--menu-item-group-padding-left)',
            paddingRight: '16px',
            display: 'flex',
            alignItems: 'center',
            fontSize: '12px'
        }),
        c$1('&-children', {
            transition: '0.2s',
            padding: 0,
            marginTop: '4px',
            overflow: 'hidden'
        }, [
            c$1('& > .mc-sub-menu:not(:last-child), & > .mc-menu-item:not(:last-child), & > .mc-menu-item-group:not(:last-child)', {
                marginBottom: '4px'
            })
        ]),
        c$1('&--collapsed&--disabled > .mc-menu-item-group-title', {
            cursor: 'not-allowed'
        }),
        c$1('&--collapsed > .mc-menu-item-group-title', {
            cursor: 'pointer'
        }),
        c$1('&--collapsed > .mc-menu-item-group-title', {
            padding: 0,
            justifyContent: 'center',
            position: 'relative'
        }, [
            c$1('& > *', {
                zIndex: 1
            }),
            c$1('&::before', {
                content: '""',
                zIndex: 'auto',
                position: 'absolute',
                left: '4px',
                right: '4px',
                top: '0',
                bottom: '0',
                pointerEvents: 'none',
                borderRadius: '4px',
                transition: 'background-color 0.2s'
            })
        ]),
        c$1('&--dropdown > .mc-menu-item-group-children', {
            margin: 0
        }, [
            c$1('.mc-menu-item, .mc-sub-menu-title, .mc-menu-item-group-title', {
                padding: '0 16px'
            }),
            c$1('.mc-menu-item-group-children', [
                c$1('.mc-menu-item, .mc-sub-menu-title', {
                    padding: '0 16px 0 32px'
                })
            ])
        ])
    ]),
    c$1('.mc-sub-menu', [
        c$1('&--disabled', [
            c$1('.mc-menu-item, .mc-sub-menu-title, .mc-menu-item-group-title', {
                cursor: 'not-allowed'
            })
        ]),
        c$1('&--collapsed > .mc-sub-menu-title', [
            c$1('.mc-sub-menu-title__arrow', {
                transform: 'rotate(180deg)'
            })
        ]),
        c$1('&-title', {
            height: '40px',
            paddingLeft: 'var(--menu-submenu-padding-left)',
            paddingRight: '16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            cursor: 'pointer',
            borderRadius: '4px',
            transition: 'background-color 0.2s, padding-left 0.2s, border-color 0.2s, color 0.2s',
            position: 'relative'
        }, [
            c$1('& > *', {
                zIndex: 1
            }),
            c$1('&__icon', {
                display: 'flex',
                marginRight: '8px'
            }, [
                c$1('.mc-icon', {
                    transition: 'width 0.2s'
                })
            ]),
            c$1('&__content', {
                flex: 1,
                overflow: 'hidden'
            }),
            c$1('&__arrow', {
                transition: 'transform 0.2s'
            }),
            c$1('&::before', {
                content: '""',
                zIndex: 'auto',
                position: 'absolute',
                left: '4px',
                right: '4px',
                top: '0',
                bottom: '0',
                pointerEvents: 'none',
                borderRadius: '4px',
                transition: 'background-color 0.2s'
            })
        ]),
        c$1('&-children', {
            transition: '0.2s',
            padding: 0,
            marginTop: '4px',
            overflow: 'hidden'
        }, [
            c$1('& > .mc-sub-menu:not(:last-child), & > .mc-menu-item:not(:last-child), & > .mc-menu-item-group:not(:last-child)', {
                marginBottom: '4px'
            })
        ]),
        c$1('&--dropdown', [
            c$1('.mc-menu-item, .mc-sub-menu-title, .mc-menu-item-group-title', {
                padding: '0 16px'
            }),
            c$1('.mc-menu-item-group-children', [
                c$1('.mc-menu-item, .mc-sub-menu-title', {
                    padding: '0 16px 0 32px'
                })
            ])
        ])
    ]),
    c$1('.mc-menu.mc-menu--horizontal', {
        display: 'flex'
    }, [
        c$1('.mc-menu-item,  .mc-sub-menu-title, .mc-menu-item-group-title', {
            padding: '0 20px',
            height: '40px',
            cursor: 'pointer'
        }),
        c$1('.mc-menu-item, .mc-menu-item-group, .mc-sub-menu', {
            margin: 0
        })
    ])
]);

var lightCssr$2 = c$1([
    c$1('.mc-menu:not(.mc-menu--horizontal), .mc-sub-menu--dropdown, .mc-menu-item-group--dropdown', [
        c$1('.mc-menu-item', [
            c$1('&:hover::before', {
                background: '#f2fcf8'
            }),
            c$1('&--active::before', {
                background: '#f2fcf8'
            }),
            c$1('&--active', {
                color: '#10b981'
            })
        ]),
        c$1('.mc-menu-item-group', [
            c$1('&--child-active > .mc-menu-item-group-title', {
                color: '#10b981'
            }),
            c$1('&-title', {
                color: 'rgb(118, 124, 130)'
            }, [
                c$1('&:hover::before', {
                    background: '#f2fcf8'
                })
            ])
        ]),
        c$1('.mc-sub-menu', [
            c$1('&--child-active > .mc-sub-menu-title', {
                color: '#10b981'
            }),
            c$1('&-title', [
                c$1('&:hover::before', {
                    background: '#f2fcf8'
                })
            ])
        ]),
        c$1('.mc-menu-item.mc-menu-item--disabled', {
            color: '#bbb'
        }, [
            c$1('&::before', {
                background: 'rgba(0, 0, 0, 0.02)'
            })
        ]),
        c$1('.mc-sub-menu.mc-sub-menu--disabled, .mc-menu-item-group.mc-menu-item-group--disabled', [
            c$1('.mc-menu-item, .mc-sub-menu-title, .mc-menu-item-group-title', {
                color: '#bbb'
            }, [
                c$1('&::before', {
                    background: 'rgba(0, 0, 0, 0.02)'
                })
            ])
        ])
    ]),
    c$1('.mc-menu.mc-menu--horizontal', [
        c$1('& > .mc-menu-item', [
            c$1('&:hover, &--active', {
                color: '#10b981'
            })
        ]),
        c$1('& > .mc-sub-menu', [
            c$1('&--child-active, & > .mc-sub-menu-title:hover', {
                color: '#10b981'
            })
        ]),
        c$1('& > .mc-menu-item-group', [
            c$1('&--child-active, & > .mc-menu-item-group-title:hover', {
                color: '#10b981'
            })
        ]),
        c$1('& > .mc-menu-item.mc-menu-item--disabled, & > .mc-sub-menu.mc-sub-menu--disabled .mc-sub-menu-title, & > .mc-menu-item-group.mc-menu-item-group--disabled .mc-menu-item-group-title', {
            color: '#bbb'
        })
    ]),
    c$1('.mc-menu.mc-menu--disabled:not(.mc-menu--horizontal)', [
        c$1('.mc-menu-item, .mc-sub-menu-title, .mc-menu-item-group-title', {
            color: '#bbb'
        }, [
            c$1('&::before', {
                background: 'rgba(0, 0, 0, 0.02)'
            })
        ])
    ]),
    c$1('.mc-menu.mc-menu--disabled.mc-menu--horizontal', [
        c$1('.mc-menu-item, .mc-sub-menu-title, .mc-menu-item-group-title', {
            color: '#bbb'
        })
    ])
]);

var darkCssr$2 = c$1([
    c$1('.mc-menu:not(.mc-menu--horizontal), .mc-sub-menu--dropdown, .mc-menu-item-group--dropdown', [
        c$1('.mc-menu-item', [
            c$1('&:hover::before', {
                background: '#1f2430'
            }),
            c$1('&--active::before', {
                background: '#1f2430'
            }),
            c$1('&--active', {
                color: '#63e2b7'
            })
        ]),
        c$1('.mc-menu-item-group', [
            c$1('&--child-active > .mc-menu-item-group-title', {
                color: '#63e2b7'
            }),
            c$1('&-title', {
                color: 'rgb(118, 124, 130)'
            }, [
                c$1('&:hover::before', {
                    background: '#1f2430'
                })
            ])
        ]),
        c$1('.mc-sub-menu', [
            c$1('&--child-active > .mc-sub-menu-title', {
                color: '#63e2b7'
            }),
            c$1('&-title', [
                c$1('&:hover::before', {
                    background: '#1f2430'
                })
            ])
        ]),
        c$1('.mc-menu-item.mc-menu-item--disabled', {
            color: '#7a7d85'
        }, [
            c$1('&::before', {
                background: 'none'
            })
        ]),
        c$1('.mc-sub-menu.mc-sub-menu--disabled, .mc-menu-item-group.mc-menu-item-group--disabled', [
            c$1('.mc-menu-item, .mc-sub-menu-title, .mc-menu-item-group-title', {
                color: '#7a7d85'
            }, [
                c$1('&::before', {
                    background: 'none'
                })
            ])
        ])
    ]),
    c$1('.mc-menu.mc-menu--horizontal', [
        c$1('& > .mc-menu-item', [
            c$1('&:hover, &--active', {
                color: '#63e2b7'
            })
        ]),
        c$1('& > .mc-sub-menu', [
            c$1('&--child-active, & > .mc-sub-menu-title:hover', {
                color: '#63e2b7'
            })
        ]),
        c$1('& > .mc-menu-item-group', [
            c$1('&--child-active, & > .mc-menu-item-group-title:hover', {
                color: '#63e2b7'
            })
        ]),
        c$1('& > .mc-menu-item.mc-menu-item--disabled, & > .mc-sub-menu.mc-sub-menu--disabled .mc-sub-menu-title, & > .mc-menu-item-group.mc-menu-item-group--disabled .mc-menu-item-group-title', {
            color: '#7a7d85'
        })
    ])
]);

var Menu = defineComponent({
    name: 'Menu',
    iKey: menuIKey,
    props: menuProps,
    emits: ['update:value', 'update:expandKeys'],
    setup(props, { slots, emit, expose }) {
        // theme register
        onMounted(() => {
            useThemeRegister({
                key: 'McMenu',
                main: mainCssr$2,
                light: lightCssr$2,
                dark: darkCssr$2
            });
        });
        const keyTree = slots.default ? createKeyTree(slots.default()) : [];
        const { value: valueVM, expandKeys, disabled, indent, unique, collapsed, collapsedWidth, collapsedIconSize, horizontal, options } = toRefs(props);
        const internalExpandKeys = ref([]);
        const mergedExpandKeys = expandKeys.value ? expandKeys : internalExpandKeys;
        const menuUpdateKey = ref(0);
        const menuElRef = ref();
        const selfPadding = computed(() => indent.value - 32);
        const cssVars = computed(() => {
            return {
                '--menu-collapsed-width': collapsedWidth.value + 'px',
                '--menu-collapsed-icon-size': collapsedIconSize.value + 'px',
                '--menu-collapsed-padding': `0px ${(collapsedWidth.value - collapsedIconSize.value) / 2}px`
            };
        });
        // force rerender menu when options changed
        watch(options, () => {
            menuUpdateKey.value++;
        });
        const callUpdateValue = (value) => {
            if (valueVM.value !== value) {
                emit('update:value', value);
            }
        };
        const callUpdateExpandKeys = (key) => {
            if (Array.isArray(key)) {
                mergedExpandKeys.value = key;
            }
            else if (mergedExpandKeys.value) {
                const index = mergedExpandKeys.value.findIndex(item => item === key);
                if (index > -1) {
                    mergedExpandKeys.value.splice(index, 1);
                }
                else {
                    mergedExpandKeys.value.push(key);
                }
            }
            emit('update:expandKeys', mergedExpandKeys.value);
        };
        provide(menuInjectionKey, {
            activeKey: valueVM,
            updateKey: callUpdateValue,
            expandedKeys: mergedExpandKeys,
            updateExpandKeys: callUpdateExpandKeys,
            keyTree,
            options,
            padding: selfPadding,
            isDisabled: disabled,
            isUnique: unique,
            isCollapsed: collapsed,
            isHorizontal: horizontal
        });
        expose({
            el: menuElRef,
            expand(key, autoSelect = false) {
                autoSelect && !Array.isArray(key) && callUpdateValue(key);
                const expandKeys = [...new Set((Array.isArray(key) ? key : [key]).map(key => findPath(keyTree, key) ?? []).flat())];
                callUpdateExpandKeys([...new Set([...mergedExpandKeys.value, ...expandKeys])]);
            },
            collapseAll() {
                callUpdateExpandKeys([]);
            }
        });
        // main logic...
        return () => createElementVNode('ul', {
            ref_key: 'menuElRef',
            ref: menuElRef,
            key: menuUpdateKey.value,
            class: ['mc-menu', collapsed.value ? 'mc-menu--collapsed' : '', horizontal.value ? 'mc-menu--horizontal' : '', disabled.value ? 'mc-menu--disabled' : ''],
            style: cssVars.value
        }, [options.value ? createDirectives('v-for', options.value, option => createMenu(option)) : renderSlot$1(slots, 'default')], 2 /* CLASS */ | 4 /* STYLE */ | 8 /* PROPS */, ['key']);
    }
});

const anchorProps = {
    options: {
        type: Array,
        default: undefined
    },
    bound: {
        type: Number,
        default: 0
    },
    offsetTop: {
        type: Number,
        default: 5
    },
    offsetBottom: {
        type: Number,
        default: 5
    },
    type: {
        type: String,
        default: 'background'
    },
    showTrack: {
        type: Boolean,
        default: true
    },
    showMarker: {
        type: Boolean,
        default: true
    }
};

var mainCssr$1 = c$1([
    c$1('.mc-anchor, .mc-anchor-link', {
        display: 'flex',
        flexDirection: 'column',
        position: 'relative'
    }),
    c$1('.mc-anchor-link', {
        paddingLeft: '10px'
    }),
    c$1('.mc-anchor-link-title', {
        textDecoration: 'none',
        color: 'inherit',
        borderRadius: '4px',
        transition: 'background 0.2s, color 0.2s',
        padding: '4px 8px'
    }),
    c$1('.mc-anchor-indicator', {
        position: 'absolute',
        width: '4px',
        height: '100%',
        top: 0,
        left: 0
    }, [
        c$1('&-track', {
            width: '100%',
            height: 'calc(100% - 8px)',
            borderRadius: '4px',
            position: 'relative',
            top: '4px'
        }),
        c$1('&-marker', {
            position: 'absolute',
            width: '100%',
            height: '21px',
            left: 0,
            transition: 'top 0.2s',
            borderRadius: '4px'
        })
    ])
]);

var lightCssr$1 = c$1([
    c$1('.mc-anchor-type-background .mc-anchor-link--active > .mc-anchor-link-title', {
        background: '#f2fcf8'
    }),
    c$1('.mc-anchor-link', [
        c$1('&--active > &-title', {
            color: '#10b981'
        })
    ]),
    c$1('.mc-anchor-link-title', [
        c$1('&:hover', {
            color: '#10b981'
        })
    ]),
    c$1('.mc-anchor-indicator', [
        c$1('&-track', {
            background: '#f0f0f0'
        }),
        c$1('&-marker', {
            background: '#10b981'
        })
    ])
]);

var darkCssr$1 = c$1([
    c$1('.mc-anchor-type-background .mc-anchor-link--active > .mc-anchor-link-title', {
        background: '#1f2430'
    }),
    c$1('.mc-anchor-link', [
        c$1('&--active > &-title', {
            color: '#63e2b7'
        })
    ]),
    c$1('.mc-anchor-link-title', [
        c$1('&:hover', {
            color: '#63e2b7'
        })
    ]),
    c$1('.mc-anchor-indicator', [
        c$1('&-track', {
            background: '#ffffff33'
        }),
        c$1('&-marker', {
            background: '#63e2b7'
        })
    ])
]);

var Anchor = defineComponent({
    name: 'Anchor',
    props: anchorProps,
    emits: ['change'],
    setup(props, { emit, expose }) {
        // theme register
        onMounted(() => {
            useThemeRegister({
                key: 'McAnchor',
                main: mainCssr$1,
                light: lightCssr$1,
                dark: darkCssr$1
            });
        });
        const { options, bound, offsetTop, offsetBottom, type, showTrack, showMarker } = toRefs(props);
        const activeKey = ref();
        const indicatorBarOffsetTop = ref(0);
        const topList = shallowReactive({});
        const anchorElRef = ref();
        const anchorLinkElRefs = useTemplateRefsList();
        const { top: anchorTop } = useElementBounding(anchorElRef);
        const callChange = (target) => {
            emit('change', target);
        };
        const setActiveLink = (key) => {
            activeKey.value = key;
            const activeLinkEl = anchorLinkElRefs.value.find(link => link.hash === key);
            activeLinkEl && setIndicatorBarOffset(activeLinkEl);
        };
        const setIndicatorBarOffset = (target) => {
            const { top } = target.getBoundingClientRect();
            indicatorBarOffsetTop.value = top - anchorTop.value;
        };
        const createAnchorLink = (option) => {
            const { href, title, children } = option;
            return createElementVNode('div', {
                class: ['mc-anchor-link', activeKey.value === href ? 'mc-anchor-link--active' : '']
            }, [
                createElementVNode('a', {
                    ref: anchorLinkElRefs.value.set,
                    class: 'mc-anchor-link-title',
                    href,
                    onClick: e => {
                        e.preventDefault();
                        const { hash } = e.target;
                        if (hash === activeKey.value)
                            return;
                        window.location.hash = hash;
                        const target = document.getElementById(hash.slice(1));
                        target?.scrollIntoView();
                        callChange(hash);
                        setIndicatorBarOffset(e.target);
                    }
                }, [typeof title === 'string' ? title : title?.()], 8 /* PROPS */, ['href']),
                createDirectives('v-for', children ?? [], item => createAnchorLink(item))
            ], 2 /* CLASS */);
        };
        const setTargetElement = (options) => {
            const flattenData = flattenTree(options, 'children');
            flattenData.forEach(item => {
                const id = item.href;
                const el = document.getElementById(id.slice(1));
                if (el) {
                    const { top } = useElementBounding(el);
                    topList[id] = top;
                }
            });
        };
        throttledWatch(topList, () => {
            // console.log(Object.entries(topList).map(([key, value]) => value.value));
            const activeLink = Object.entries(topList).find(([key, item]) => item.value <= bound.value + offsetTop.value && item.value >= bound.value - offsetBottom.value);
            setActiveLink(activeLink?.[0] || '');
        }, {
            throttle: 64
        });
        watch(options, () => {
            setTargetElement(options.value ?? []);
        }, {
            deep: true
        });
        onMounted(() => {
            setTargetElement(options.value ?? []);
        });
        expose({
            el: anchorElRef.value,
            scrollTo(href) {
                const target = document.getElementById(href.slice(1));
                target?.scrollIntoView({
                    behavior: 'smooth'
                });
                callChange(href);
            }
        });
        // main logic...
        return () => createElementVNode('div', { ref_key: 'anchorElRef', ref: anchorElRef, class: ['mc-anchor', `mc-anchor-type-${type.value}`] }, [
            createDirectives('v-for', options.value ?? [], item => createAnchorLink(item)),
            type.value === 'bar'
                ? createElementVNode('div', { class: 'mc-anchor-indicator' }, [
                    showTrack.value ? createElementVNode('div', { class: 'mc-anchor-indicator-track' }) : null,
                    showMarker.value ? createElementVNode('div', { class: 'mc-anchor-indicator-marker', style: { top: `${indicatorBarOffsetTop.value + 4}px` } }, null, 4 /* STYLE */) : null
                ])
                : null
        ], 2 /* CLASS */);
    }
});

const _hoisted_1 = ['viewBox'];
const _hoisted_2 = ['values'];
const _hoisted_3 = ['stroke-width', 'cx', 'cy', 'r', 'stroke-dasharray', 'stroke-dashoffset'];
const _hoisted_4 = ['values'];
const _hoisted_5 = ['values'];
var McBaseLoading = defineComponent({
    name: 'BaseLoading',
    props: {
        size: {
            type: Number,
            default: 28
        },
        stroke: {
            type: Number,
            default: 20
        },
        color: {
            type: String,
            default: '#10B981'
        },
        show: {
            type: Boolean,
            default: true
        }
    },
    setup(props) {
        const { size, color, stroke, show } = toRefs(props);
        const scale = 1;
        const radius = 100;
        const scaledRadius = radius / scale;
        return () => {
            return (openBlock(),
                createElementBlock('div', {
                    class: 'mc-base-loading',
                    style: normalizeStyle({ display: 'flex', alignItems: 'center', justifyContent: 'center', color: color.value, width: `${size.value}px`, height: `${size.value}px` })
                }, [
                    createVNode(McIconSwitchTransition, null, {
                        default: () => show.value
                            ? (openBlock(),
                                createElementBlock('svg', {
                                    viewBox: `0 0 ${2 * unref(scaledRadius)} ${2 * unref(scaledRadius)}`,
                                    xmlns: 'http://www.w3.org/2000/svg'
                                }, [
                                    createElementVNode$1('g', null, [
                                        createElementVNode$1('animateTransform', {
                                            attributeName: 'transform',
                                            type: 'rotate',
                                            values: `0 ${unref(scaledRadius)} ${unref(scaledRadius)};270 ${unref(scaledRadius)} ${unref(scaledRadius)}`,
                                            begin: '0s',
                                            dur: '1.4s',
                                            fill: 'freeze',
                                            repeatCount: 'indefinite'
                                        }, null, 8 /* PROPS */, _hoisted_2),
                                        createElementVNode$1('circle', {
                                            fill: 'none',
                                            stroke: 'currentColor',
                                            'stroke-width': stroke.value,
                                            'stroke-linecap': 'round',
                                            cx: unref(scaledRadius),
                                            cy: unref(scaledRadius),
                                            r: radius - stroke.value / 2,
                                            'stroke-dasharray': 5.67 * radius,
                                            'stroke-dashoffset': 18.48 * radius
                                        }, [
                                            createElementVNode$1('animateTransform', {
                                                attributeName: 'transform',
                                                type: 'rotate',
                                                values: `0 ${unref(scaledRadius)} ${unref(scaledRadius)};135 ${unref(scaledRadius)} ${unref(scaledRadius)};450 ${unref(scaledRadius)} ${unref(scaledRadius)}`,
                                                begin: '0s',
                                                dur: '1.4s',
                                                fill: 'freeze',
                                                repeatCount: 'indefinite'
                                            }, null, 8 /* PROPS */, _hoisted_4),
                                            createElementVNode$1('animate', {
                                                attributeName: 'stroke-dashoffset',
                                                values: `${5.67 * radius};${1.42 * radius};${5.67 * radius}`,
                                                begin: '0s',
                                                dur: '1.4s',
                                                fill: 'freeze',
                                                repeatCount: 'indefinite'
                                            }, null, 8 /* PROPS */, _hoisted_5)
                                        ], 8 /* PROPS */, _hoisted_3)
                                    ])
                                ], 8 /* PROPS */, _hoisted_1))
                            : null
                    })
                ], 4 /* STYLE */));
        };
    }
});

var mainCssr = c$1([
    c$1('.mc-switch', {
        display: 'inline-flex',
        cursor: 'pointer',
        position: 'relative',
        alignItems: 'center',
        lineHeight: 'var(--switch-label-height)',
        fontSize: 'var(--switch-font-size)'
    }, [
        c$1('&--disabled', {
            opacity: 0.4,
            cursor: 'not-allowed'
        }),
        c$1('&--checked > &-label', {
            animation: 'mc-switch-border-ripple-out 0.5s'
        }, [
            c$1('.mc-switch-label__content', {
                padding: 'var(--switch-text-checked-padding)'
            }),
            c$1('.mc-switch-label__handler', {
                left: '100%',
                marginLeft: 'calc(-2px - var(--switch-handler-size))'
            })
        ]),
        c$1('&:not(&--inelastic)', [
            c$1('.mc-switch-label:active  .mc-switch-label__handler', {
                width: 'calc(var(--switch-handler-size) + 4px)'
            })
        ]),
        c$1('&:not(&--inelastic).mc-switch--checked', [
            c$1('.mc-switch-label:active  .mc-switch-label__handler', {
                marginLeft: 'calc(-6px - var(--switch-handler-size))'
            })
        ])
    ]),
    c$1('.mc-switch-label', {
        cursor: 'inherit',
        position: 'relative',
        minWidth: 'var(--switch-label-min-width)',
        height: 'var(--switch-label-height)',
        borderRadius: 'var(--switch-label-border-radius)',
        transition: 'all 0.2s'
    }, [
        c$1('&-text--left, &-text--right', {
            transition: 'color 0.2s'
        }),
        c$1('&-text--left', {
            marginRight: '6px'
        }),
        c$1('&-text--right', {
            marginLeft: '6px'
        }),
        c$1('&__content', {
            padding: 'var(--switch-text-unchecked-padding)',
            width: '100%',
            height: '100%',
            transition: 'all 0.2s',
            display: 'flex',
            boxSizing: 'border-box',
            alignItems: 'center'
        }),
        c$1('&__handler', {
            position: 'absolute',
            width: 'var(--switch-handler-size)',
            height: 'var(--switch-handler-size)',
            borderRadius: 'var(--switch-handler-border-radius)',
            top: '2px',
            left: '2px',
            transition: 'all 0.2s',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        })
    ]),
    c$1('.mc-switch-input', {
        opacity: 0,
        width: 0,
        margin: 0,
        outline: 'none'
    }),
    c$1('@keyframes mc-switch-border-ripple-out', {
        from: {
            boxShadow: '0 0 0.5px 0 var(--switch-checked-color, #10b981)'
        },
        to: {
            boxShadow: '0 0 0.5px 4px var(--switch-ripple-color, #10b98100)'
        }
    })
]);

var lightCssr = c$1([
    c$1('.mc-switch', [
        c$1('&--checked .mc-switch-label-text--right, &:not(&--checked) .mc-switch-label-text--left', {
            color: 'var(--switch-checked-color, #10b981)'
        }),
        c$1('&--checked > &-label', {
            background: 'var(--switch-checked-color, #10b981)'
        })
    ]),
    c$1('.mc-switch-label', {
        background: 'var(--switch-unchecked-color, rgba(0, 0, 0, 0.25))'
    }, [
        c$1('&__content', {
            color: '#fff'
        }),
        c$1('&__handler', {
            background: 'var(--switch-handler-color, #fff)',
            boxShadow: '0 1px 4px 0 rgba(0, 0, 0, 0.3), inset 0 0 1px 0 rgba(0, 0, 0, 0.05)'
        })
    ])
]);

var darkCssr = c$1([
    c$1('.mc-switch', [
        c$1('&--checked .mc-switch-label-text--right, &:not(&--checked) .mc-switch-label-text--left', {
            color: 'var(--switch-checked-color, #059669)'
        }),
        c$1('&--checked > &-label', {
            background: 'var(--switch-checked-color, #059669)'
        })
    ]),
    c$1('.mc-switch-label', {
        background: 'var(--switch-unchecked-color, #313540)'
    }, [
        c$1('&__content', {
            color: '#fff'
        }),
        c$1('&__handler', {
            background: 'var(--switch-handler-color, #000)',
            boxShadow: '0px 2px 4px 0 rgba(0, 0, 0, 0.4)'
        })
    ])
]);

const switchProps = {
    value: {
        type: [String, Number, Boolean],
        default: undefined
    },
    disabled: {
        type: Boolean,
        default: false
    },
    size: {
        type: String,
        default: 'medium'
    },
    checkedValue: {
        type: [String, Number, Boolean],
        default: true
    },
    uncheckedValue: {
        type: [String, Number, Boolean],
        default: false
    },
    checkedText: {
        type: String,
        default: undefined
    },
    uncheckedText: {
        type: String,
        default: undefined
    },
    checkedColor: {
        type: String,
        default: undefined
    },
    uncheckedColor: {
        type: String,
        default: undefined
    },
    handlerColor: {
        type: String,
        default: undefined
    },
    textPlacement: {
        type: String,
        default: 'in'
    },
    square: {
        type: Boolean,
        default: false
    },
    checked: {
        type: Boolean,
        default: false
    },
    loading: {
        type: Boolean,
        default: false
    },
    inelastic: {
        type: Boolean,
        default: false
    },
    onBeforeSwitch: {
        type: Function,
        default: undefined
    }
};

const SIZE_MAP = {
    small: {
        labelHeight: '18px',
        labelMinWidth: '36px',
        handlerSize: '14px',
        fontSize: '12px',
        textCheckedPadding: '0px 22px 0px 6px',
        textUncheckedPadding: '0px 6px 0px 22px'
    },
    medium: {
        labelHeight: '22px',
        labelMinWidth: '44px',
        handlerSize: '18px',
        fontSize: '14px',
        textCheckedPadding: '0px 26px 0px 10px',
        textUncheckedPadding: '0px 10px 0px 26px'
    },
    large: {
        labelHeight: '26px',
        labelMinWidth: '52px',
        handlerSize: '22px',
        fontSize: '16px',
        textCheckedPadding: '0px 30px 0px 14px',
        textUncheckedPadding: '0px 14px 0px 30px'
    }
};
var Switch = defineComponent({
    name: 'Switch',
    props: switchProps,
    emits: ['update:value', 'switch'],
    setup(props, { slots, emit, expose }) {
        // theme register
        onMounted(() => {
            useThemeRegister({
                key: 'McSwitch',
                main: mainCssr,
                light: lightCssr,
                dark: darkCssr
            });
        });
        const key = createKey('switch');
        const { value: valueVM, disabled, size, checkedValue, uncheckedValue, checkedText, uncheckedText, checkedColor, uncheckedColor, handlerColor, textPlacement, square, checked, onBeforeSwitch, loading, inelastic } = toRefs(props);
        const switchElRef = ref();
        const internalValue = ref(checked.value);
        const mergedValue = isDefined(valueVM) ? valueVM : internalValue;
        const isChecked = computed(() => mergedValue.value === checkedValue.value);
        const cssVars = computed(() => {
            const { labelHeight, labelMinWidth, handlerSize, fontSize, textUncheckedPadding, textCheckedPadding } = SIZE_MAP[size.value] ?? SIZE_MAP.medium;
            return {
                '--switch-checked-color': checkedColor.value,
                '--switch-unchecked-color': uncheckedColor.value,
                '--switch-handler-color': handlerColor.value,
                '--switch-ripple-color': setColorAlpha(checkedColor.value, 0),
                '--switch-font-size': fontSize,
                '--switch-label-height': labelHeight,
                '--switch-label-min-width': labelMinWidth,
                '--switch-label-border-radius': square.value ? '3px' : labelHeight,
                '--switch-text-checked-padding': textCheckedPadding,
                '--switch-text-unchecked-padding': textUncheckedPadding,
                '--switch-handler-size': handlerSize,
                '--switch-handler-border-radius': square.value ? '3px' : handlerSize
            };
        });
        const callUpdateValue = () => {
            const value = isChecked.value ? uncheckedValue.value : checkedValue.value;
            if (isDefined(valueVM)) {
                emit('update:value', value);
            }
            else {
                mergedValue.value = value;
            }
            emit('switch', value);
        };
        const handleChange = async () => {
            if (disabled.value)
                return;
            try {
                const callback = await onBeforeSwitch.value?.();
                if (callback || callback === undefined) {
                    callUpdateValue();
                }
            }
            catch (error) { }
        };
        expose({
            el: switchElRef.value,
            switch: callUpdateValue
        });
        // main logic...
        return () => createElementVNode('div', {
            ref_key: 'switchElRef',
            ref: switchElRef,
            class: [
                'mc-switch',
                `mc-switch--${size.value}`,
                {
                    'mc-switch--checked': isChecked.value,
                    'mc-switch--disabled': disabled.value,
                    'mc-switch--square': square.value,
                    'mc-switch--loading': loading.value,
                    'mc-switch--inelastic': inelastic.value
                }
            ],
            style: cssVars.value
        }, [
            createElementVNode('input', { class: 'mc-switch-input', value: mergedValue.value, id: key, type: 'checkbox', checked: isChecked.value, disabled: disabled.value, onChange: handleChange }, null, 8 /* PROPS */, [
                'value',
                'checked',
                'disabled'
            ]),
            and(uncheckedText, textPlacement.value === 'both' || textPlacement.value === 'out').value
                ? createElementVNode('span', { class: 'mc-switch-label-text--left', onClick: handleChange }, [propsMergeSlots(props, slots, 'uncheckedText')])
                : null,
            createElementVNode('label', { class: 'mc-switch-label', for: key }, [
                and(textPlacement.value === 'both' || textPlacement.value === 'in', or(checkedText, uncheckedText)).value
                    ? createElementVNode('span', { class: 'mc-switch-label__content' }, isChecked.value ? propsMergeSlots(props, slots, 'checkedText') : propsMergeSlots(props, slots, 'uncheckedText'))
                    : null,
                createElementVNode('div', { class: 'mc-switch-label__handler' }, [
                    createComponentVNode(McIconSwitchTransition, null, {
                        default: () => {
                            if (loading.value) {
                                return createComponentVNode(McBaseLoading, { size: 14 });
                            }
                            else if (slots.icon) {
                                return renderSlot(slots, 'icon');
                            }
                            else {
                                return isChecked.value ? renderSlot(slots, 'checked-icon') : renderSlot(slots, 'unchecked-icon');
                            }
                        }
                    })
                ])
            ]),
            and(checkedText, textPlacement.value === 'both' || textPlacement.value === 'out').value
                ? createElementVNode('span', { class: 'mc-switch-label-text--right', onClick: handleChange }, [propsMergeSlots(props, slots, 'checkedText')])
                : null
        ], 2 /* CLASS */ | 4 /* STYLE */);
    }
});

var components = /*#__PURE__*/Object.freeze({
    __proto__: null,
    McGrid: Grid,
    McGridItem: GridItem,
    McPopconfirm: Popconfirm,
    McPopover: McPopover,
    McPopselect: Popselect,
    McTextLink: TextLink,
    McTooltip: McTooltip,
    McTabs: Tabs,
    McTabPane: TabPane,
    McTab: McTab,
    McMessage: McMessage,
    McAsyncMessage: McAsyncMessage,
    McCheckbox: McCheckbox,
    McCheckboxGroup: CheckboxGroup,
    McButton: McButton,
    McButtonGroup: ButtonGroup,
    McIcon: McIcon,
    McSpace: Space,
    McModal: McModal,
    McDrawer: McDrawer,
    McPopup: McPopup,
    McLayout: Layout,
    McLayoutHeader: McLayoutHeader,
    McLayoutContent: McLayoutContent,
    McLayoutFooter: McLayoutFooter,
    McLayoutSider: McLayoutSider,
    McMenu: Menu,
    McMenuItem: McMenuItem,
    McMenuItemGroup: McMenuItemGroup,
    McSubMenu: McSubMenu,
    McAnchor: Anchor,
    McSwitch: Switch
});

const NoNeedRegister = ['McMessage', 'McAsyncMessage', 'McPopup'];
const install = (app) => {
    Object.keys(components)
        .filter(key => !NoNeedRegister.includes(key))
        .map(key => components[key]).forEach(component => {
        app.component('Mc' + component.name, component);
    });
};
var install$1 = { install };

export { Anchor as McAnchor, McAsyncMessage, McButton, ButtonGroup as McButtonGroup, McCheckbox, CheckboxGroup as McCheckboxGroup, McDrawer, Grid as McGrid, GridItem as McGridItem, McIcon, Layout as McLayout, McLayoutContent, McLayoutFooter, McLayoutHeader, McLayoutSider, Menu as McMenu, McMenuItem, McMenuItemGroup, McMessage, McModal, Popconfirm as McPopconfirm, McPopover, Popselect as McPopselect, McPopup, Space as McSpace, McSubMenu, Switch as McSwitch, McTab, TabPane as McTabPane, Tabs as McTabs, TextLink as McTextLink, McTooltip, install$1 as default, useI18nController, useThemeController };
