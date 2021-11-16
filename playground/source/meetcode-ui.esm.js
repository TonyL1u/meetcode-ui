import { inject, provide, computed, onBeforeUnmount, ref, readonly, watch, onMounted, defineComponent, markRaw, h, renderSlot, onBeforeMount, Transition, TransitionGroup, toRef, getCurrentInstance, withDirectives, Teleport, nextTick, watchEffect, mergeProps, Fragment, Comment, openBlock, createBlock, createVNode, useSlots, useAttrs, toRefs as toRefs$1, createTextVNode, getCurrentScope, onScopeDispose, isRef, customRef, unref, shallowRef, cloneVNode, vShow, reactive } from 'vue';
import { merge } from 'lodash-es';

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

var colors = {
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
    transparent: '#0000'
};

const prefix$1 = '^\\s*';
const suffix = '\\s*$';
const float = '\\s*((\\.\\d+)|(\\d+(\\.\\d*)?))\\s*'; // 4 offset
const hex = '([0-9A-Fa-f])';
const dhex = '([0-9A-Fa-f]{2})';
const rgbRegex = new RegExp(`${prefix$1}rgb\\s*\\(${float},${float},${float}\\)${suffix}`);
const rgbaRegex = new RegExp(`${prefix$1}rgba\\s*\\(${float},${float},${float},${float}\\)${suffix}`);
const sHexRegex = new RegExp(`${prefix$1}#${hex}${hex}${hex}${suffix}`);
const hexRegex = new RegExp(`${prefix$1}#${dhex}${dhex}${dhex}${suffix}`);
const sHexaRegex = new RegExp(`${prefix$1}#${hex}${hex}${hex}${hex}${suffix}`);
const hexaRegex = new RegExp(`${prefix$1}#${dhex}${dhex}${dhex}${dhex}${suffix}`);
function parseHex(value) {
    return parseInt(value, 16);
}
/**
 * Convert color string to rgba array.
 * @param color format like #000[0], #000000[00], rgb(0, 0, 0), rgba(0, 0, 0, 0) and basic color keywords https://www.w3.org/TR/css-color-3/#html4 and transparent
 * @returns
 */
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
            return [
                roundChannel(i[1]),
                roundChannel(i[5]),
                roundChannel(i[9]),
                roundAlpha(i[13])
            ];
        }
        else if ((i = sHexRegex.exec(color))) {
            return [
                parseHex(i[1] + i[1]),
                parseHex(i[2] + i[2]),
                parseHex(i[3] + i[3]),
                1
            ];
        }
        else if ((i = hexaRegex.exec(color))) {
            return [
                parseHex(i[1]),
                parseHex(i[2]),
                parseHex(i[3]),
                roundAlpha(parseHex(i[4]) / 255)
            ];
        }
        else if ((i = sHexaRegex.exec(color))) {
            return [
                parseHex(i[1] + i[1]),
                parseHex(i[2] + i[2]),
                parseHex(i[3] + i[3]),
                roundAlpha(parseHex(i[4] + i[4]) / 255)
            ];
        }
        else if (color in colors) {
            return rgba(colors[color]);
        }
        throw new Error(`[seemly/rgba]: Invalid color value ${color}.`);
    }
    catch (e) {
        throw e;
    }
}
function normalizeAlpha(alphaValue) {
    return alphaValue > 1 ? 1 : alphaValue < 0 ? 0 : alphaValue;
}
function stringifyRgba(r, g, b, a) {
    return `rgba(${roundChannel(r)}, ${roundChannel(g)}, ${roundChannel(b)}, ${normalizeAlpha(a)})`;
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
function scaleColor(base, options) {
    const [r, g, b, a = 1] = Array.isArray(base) ? base : rgba(base);
    const { lightness = 1, alpha = 1 } = options;
    return toRgbaString([r * lightness, g * lightness, b * lightness, a * alpha]);
}
function roundAlpha(value) {
    const v = Math.round(Number(value) * 100) / 100;
    if (v > 1)
        return 1;
    if (v < 0)
        return 0;
    return v;
}
function roundChannel(value) {
    const v = Math.round(Number(value));
    if (v > 255)
        return 255;
    if (v < 0)
        return 0;
    return v;
}
function toRgbaString(base) {
    const [r, g, b] = base;
    if (3 in base) {
        return `rgba(${roundChannel(r)}, ${roundChannel(g)}, ${roundChannel(b)}, ${roundAlpha(base[3])})`;
    }
    return `rgba(${roundChannel(r)}, ${roundChannel(g)}, ${roundChannel(b)}, 1)`;
}

const formItemInjectionKey = Symbol('formItem');
function useFormItem(props, { defaultSize = 'medium', mergedSize, mergedDisabled } = {}) {
    const NFormItem = inject(formItemInjectionKey, null);
    provide(formItemInjectionKey, null);
    const mergedSizeRef = computed(mergedSize
        ? () => mergedSize(NFormItem)
        : () => {
            const { size } = props;
            if (size)
                return size;
            if (NFormItem) {
                const { mergedSize } = NFormItem;
                if (mergedSize.value !== undefined) {
                    return mergedSize.value;
                }
            }
            return defaultSize;
        });
    const mergedDisabledRef = computed(mergedDisabled
        ? () => mergedDisabled(NFormItem)
        : () => {
            const { disabled } = props;
            if (disabled !== undefined) {
                return disabled;
            }
            if (NFormItem) {
                return NFormItem.disabled.value;
            }
            return false;
        });
    onBeforeUnmount(() => {
        if (NFormItem) {
            NFormItem.restoreValidation();
        }
    });
    return {
        mergedSizeRef,
        mergedDisabledRef,
        nTriggerFormBlur() {
            if (NFormItem) {
                NFormItem.handleContentBlur();
            }
        },
        nTriggerFormChange() {
            if (NFormItem) {
                NFormItem.handleContentChange();
            }
        },
        nTriggerFormFocus() {
            if (NFormItem) {
                NFormItem.handleContentFocus();
            }
        },
        nTriggerFormInput() {
            if (NFormItem) {
                NFormItem.handleContentInput();
            }
        }
    };
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
const seperatorRegex = /\s*,(?![^(]*\))\s*/g;
const extraSpaceRegex = /\s+/g;
/**
 * selector must includes '&'
 * selector is trimmed
 * every part of amp is trimmed
 */
function resolveSelectorWithAmp(amp, selector) {
    const nextAmp = [];
    selector.split(seperatorRegex).forEach(partialSelector => {
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
    selector.split(seperatorRegex).forEach(partialSelector => {
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

const kebabRegex = /[A-Z]/g;
function kebabCase(pattern) {
    return pattern.replace(kebabRegex, match => '-' + match.toLowerCase());
}
/** TODO: refine it to solve nested object */
function upwrapProperty(prop, indent = '  ') {
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
function upwrapProperties(props, instance, params) {
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
    const unwrappedProps = upwrapProperties(props, instance, params);
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
            statements.push(`  ${propertyName}${upwrapProperty(property)}`);
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
    if (!$ || typeof $ === 'string') {
        // as a string selector
        selectorPaths.push($);
    }
    else if (typeof $ === 'function') {
        // as a lazy selector
        selectorPaths.push($({
            context: instance.context,
            props: params
        }));
    }
    else { // as a option selector
        if ($.before)
            $.before(instance.context);
        if (!$.$ || typeof $.$ === 'string') {
            selectorPaths.push($.$);
        }
        else /* istanbul ignore else */ if ($.$) {
            selectorPaths.push($.$({
                context: instance.context,
                props: params
            }));
        }
    }
    const selector = parseSelectorPath(selectorPaths);
    const style = createStyle(selector, node.props, instance, params);
    if (styleSheet && style) {
        styleSheet.insertRule(style);
    }
    if (!styleSheet && style.length)
        styles.push(style);
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

/* eslint-disable @typescript-eslint/strict-boolean-expressions */
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
function mount(instance, node, id, props, head, slient, force, ssrAdapter
// eslint-disable-next-line @typescript-eslint/no-invalid-void-type
) {
    var _a;
    if (slient && !ssrAdapter) {
        if (id === undefined) {
            // it is possible to use hash to get rid of the requirements of id
            // if you are interested in it, please create a pr
            // i have no time to impl it
            console.error('[css-render/mount]: `id` is required in `slient` mode.');
            // @ts-expect-error
            return;
        }
        const cssrContext = window.__cssrContext;
        if (!cssrContext[id]) {
            cssrContext[id] = true;
            render(node, instance, props, slient);
        }
        // @ts-expect-error
        return;
    }
    let style;
    if (id === undefined) {
        style = node.render(props);
        id = murmur2(style);
    }
    if (ssrAdapter) {
        ssrAdapter.adapter(id, style !== null && style !== void 0 ? style : node.render(props));
        // @ts-expect-error
        return;
    }
    const queriedTarget = queryElement(id);
    if (queriedTarget !== null && !force) {
        // @ts-expect-error
        return queriedTarget;
    }
    const target = queriedTarget !== null && queriedTarget !== void 0 ? queriedTarget : createElement(id);
    if (style === undefined)
        style = node.render(props);
    target.textContent = style;
    // @ts-expect-error
    if (queriedTarget !== null)
        return queriedTarget;
    if (head) {
        const firstStyleEl = (_a = document.head.querySelector('style, link')) !== null && _a !== void 0 ? _a : null;
        document.head.insertBefore(target, firstStyleEl);
    }
    else {
        document.head.appendChild(target);
    }
    addElementToList(node.els, target);
    // @ts-expect-error
    return queriedTarget !== null && queriedTarget !== void 0 ? queriedTarget : target;
}

function wrappedRender(props) {
    return render(this, this.instance, props);
}
// do not guard node calling, it should throw an error.
function wrappedMount(options = {}
// eslint-disable-next-line @typescript-eslint/no-invalid-void-type
) {
    const { id, ssr, props, head = false, slient = false, force = false } = options;
    const targetElement = mount(this.instance, this, id, props, head, slient, force, ssr);
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
    if (Array.isArray(props)) {
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

function exists(id, ssr) {
    if (id === undefined)
        return false;
    if (ssr) {
        const { context: { ids } } = ssr;
        return ids.has(id);
    }
    return queryElement(id) !== null;
}

/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
function plugin$1(options) {
    let _bPrefix = '.';
    let _ePrefix = '__';
    let _mPrefix = '--';
    let c;
    if (options) {
        let t = options.blockPrefix;
        if (t) {
            _bPrefix = t;
        }
        t = options.elementPrefix;
        if (t) {
            _ePrefix = t;
        }
        t = options.modifierPrefix;
        if (t) {
            _mPrefix = t;
        }
    }
    const _plugin = {
        install(instance) {
            c = instance.c;
            const ctx = instance.context;
            ctx.bem = {};
            ctx.bem.b = null;
            ctx.bem.els = null;
        }
    };
    function b(arg) {
        let memorizedB;
        let memorizedE;
        return {
            before(ctx) {
                memorizedB = ctx.bem.b;
                memorizedE = ctx.bem.els;
                ctx.bem.els = null;
            },
            after(ctx) {
                ctx.bem.b = memorizedB;
                ctx.bem.els = memorizedE;
            },
            $({ context, props }) {
                arg = typeof arg === 'string' ? arg : arg({ context, props });
                context.bem.b = arg;
                return `${(props === null || props === void 0 ? void 0 : props.bPrefix) || _bPrefix}${context.bem.b}`;
            }
        };
    }
    function e(arg) {
        let memorizedE;
        return {
            before(ctx) {
                memorizedE = ctx.bem.els;
            },
            after(ctx) {
                ctx.bem.els = memorizedE;
            },
            $({ context, props }) {
                arg = typeof arg === 'string' ? arg : arg({ context, props });
                context.bem.els = arg.split(',').map(v => v.trim());
                return context.bem.els
                    .map(el => `${(props === null || props === void 0 ? void 0 : props.bPrefix) || _bPrefix}${context.bem.b}__${el}`).join(', ');
            }
        };
    }
    function m(arg) {
        return {
            $({ context, props }) {
                arg = typeof arg === 'string' ? arg : arg({ context, props });
                const modifiers = arg.split(',').map(v => v.trim());
                function elementToSelector(el) {
                    return modifiers.map(modifier => `&${(props === null || props === void 0 ? void 0 : props.bPrefix) || _bPrefix}${context.bem.b}${el !== undefined ? `${_ePrefix}${el}` : ''}${_mPrefix}${modifier}`).join(', ');
                }
                const els = context.bem.els;
                if (els !== null) {
                    if (process.env.NODE_ENV !== 'production' && els.length >= 2) {
                        throw Error(`[css-render/plugin-bem]: m(${arg}) is invalid, using modifier inside multiple elements is not allowed`);
                    }
                    return elementToSelector(els[0]);
                }
                else {
                    return elementToSelector();
                }
            }
        };
    }
    function notM(arg) {
        return {
            $({ context, props }) {
                arg = typeof arg === 'string' ? arg : arg({ context, props });
                const els = context.bem.els;
                if (process.env.NODE_ENV !== 'production' && els !== null && els.length >= 2) {
                    throw Error(`[css-render/plugin-bem]: notM(${arg}) is invalid, using modifier inside multiple elements is not allowed`);
                }
                return `&:not(${(props === null || props === void 0 ? void 0 : props.bPrefix) || _bPrefix}${context.bem.b}${(els !== null && els.length > 0) ? `${_ePrefix}${els[0]}` : ''}${_mPrefix}${arg})`;
            }
        };
    }
    const cB = ((...args) => c(b(args[0]), args[1], args[2]));
    const cE = ((...args) => c(e(args[0]), args[1], args[2]));
    const cM = ((...args) => c(m(args[0]), args[1], args[2]));
    const cNotM = ((...args) => c(notM(args[0]), args[1], args[2]));
    Object.assign(_plugin, {
        cB, cE, cM, cNotM
    });
    return _plugin;
}

function createKey(prefix, suffix) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (prefix +
        (suffix === 'default'
            ? ''
            : suffix.replace(/^[a-z]/, (startChar) => startChar.toUpperCase())));
}
createKey('abc', 'def');

/* eslint-disable @typescript-eslint/restrict-template-expressions */
const namespace = 'n';
const prefix = `.${namespace}-`;
const elementPrefix = '__';
const modifierPrefix = '--';
const cssr = CssRender();
const plugin = plugin$1({
    blockPrefix: prefix,
    elementPrefix,
    modifierPrefix
});
cssr.use(plugin);
const { c: c$1, find } = cssr;
const { cB, cE, cM, cNotM } = plugin;

var commonVariables$1 = {
    fontFamily: 'v-sans, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
    fontFamilyMono: 'v-mono, SFMono-Regular, Menlo, Consolas, Courier, monospace',
    fontWeight: '400',
    fontWeightStrong: '500',
    cubicBezierEaseInOut: 'cubic-bezier(.4, 0, .2, 1)',
    cubicBezierEaseOut: 'cubic-bezier(0, 0, .2, 1)',
    cubicBezierEaseIn: 'cubic-bezier(.4, 0, 1, 1)',
    borderRadius: '3px',
    borderRadiusSmall: '2px',
    fontSize: '14px',
    fontSizeTiny: '12px',
    fontSizeSmall: '14px',
    fontSizeMedium: '14px',
    fontSizeLarge: '15px',
    fontSizeHuge: '16px',
    lineHeight: '1.6',
    heightTiny: '22px',
    heightSmall: '28px',
    heightMedium: '34px',
    heightLarge: '40px',
    heightHuge: '46px',
    transformDebounceScale: 'scale(1)'
};

// It is static and won't be changed in the app's lifetime
// If user want to overrides it they need to use `n-global-style` is provided
//
// Technically we can remove font-size & font-family & line-height to make
// it pure. However the coding cost doesn't worth it.
//
// -webkit-tap-hilight-color:
// https://developer.mozilla.org/en-US/docs/Web/CSS/-webkit-tap-highlight-color
// In some android devices, there will be the style.

var globalStyle = c$1('body', `
 margin: 0;
 font-size: ${commonVariables$1.fontSize};
 font-family: ${commonVariables$1.fontFamily};
 line-height: ${commonVariables$1.lineHeight};
 -webkit-text-size-adjust: 100%;
 -webkit-tap-highlight-color: transparent;
`, [c$1('input', `
 font-family: inherit;
 font-size: inherit;
 `)]);

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
        const trapped = trapOn(type, el, handler, options);
        if (trapped)
            return;
        const phase = options === true ||
            (typeof options === 'object' && options.capture === true)
            ? 'capture'
            : 'bubble';
        const elToHandlers = ensureElToHandlers(phase, type);
        const handlers = ensureHandlers(elToHandlers, el);
        if (!handlers.has(handler))
            handlers.add(handler);
        if (el === window) {
            const windowEventHandlers = ensureWindowEventHandlers(type);
            if (!windowEventHandlers.has(handler)) {
                windowEventHandlers.add(handler);
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

function isMounted() {
    const isMounted = ref(false);
    onMounted(() => { isMounted.value = true; });
    return readonly(isMounted);
}

function call(funcs, ...args) {
    if (Array.isArray(funcs)) {
        funcs.forEach((func) => call(func, ...args));
    }
    else
        return funcs(...args);
}

function warn$1(location, message) {
    console.error(`[naive/${location}]: ${message}`);
}
function throwError(location, message) {
    throw new Error(`[naive/${location}]: ${message}`);
}

const pureNumberRegex = /^(\d|\.)+$/;
const numberRegex = /(\d|\.)+/;
function formatLength(length, { c = 1, offset = 0, attachPx = true } = {}) {
    if (typeof length === 'number') {
        const result = (length + offset) * c;
        if (result === 0)
            return '0';
        return `${result}px`;
    }
    else if (typeof length === 'string') {
        if (pureNumberRegex.test(length)) {
            const result = (Number(length) + offset) * c;
            if (attachPx) {
                if (result === 0)
                    return '0';
                return `${result}px`;
            }
            else {
                return `${result}`;
            }
        }
        else {
            const result = numberRegex.exec(length);
            if (!result)
                return length;
            return length.replace(numberRegex, String((Number(result[0]) + offset) * c));
        }
    }
    return length;
}

const configProviderInjectionKey = Symbol('configProviderInjection');
const configProviderProps = {
    abstract: Boolean,
    bordered: {
        type: Boolean,
        default: undefined
    },
    clsPrefix: String,
    locale: Object,
    dateLocale: Object,
    namespace: String,
    rtl: Array,
    tag: {
        type: String,
        default: 'div'
    },
    hljs: Object,
    theme: Object,
    themeOverrides: Object,
    componentOptions: Object,
    icons: Object,
    breakpoints: Object,
    // deprecated
    as: {
        type: String,
        validator: () => {
            warn$1('config-provider', '`as` is deprecated, please use `tag` instead.');
            return true;
        },
        default: undefined
    }
};
defineComponent({
    name: 'ConfigProvider',
    alias: ['App'],
    props: configProviderProps,
    setup(props) {
        const NConfigProvider = inject(configProviderInjectionKey, null);
        const mergedThemeRef = computed(() => {
            const { theme } = props;
            if (theme === null)
                return undefined;
            const inheritedTheme = NConfigProvider === null || NConfigProvider === void 0 ? void 0 : NConfigProvider.mergedThemeRef.value;
            return theme === undefined
                ? inheritedTheme
                : inheritedTheme === undefined
                    ? theme
                    : Object.assign({}, inheritedTheme, theme);
        });
        const mergedThemeOverridesRef = computed(() => {
            const { themeOverrides } = props;
            // stop inheriting themeOverrides
            if (themeOverrides === null)
                return undefined;
            // use inherited themeOverrides
            if (themeOverrides === undefined) {
                return NConfigProvider === null || NConfigProvider === void 0 ? void 0 : NConfigProvider.mergedThemeOverridesRef.value;
            }
            else {
                const inheritedThemeOverrides = NConfigProvider === null || NConfigProvider === void 0 ? void 0 : NConfigProvider.mergedThemeOverridesRef.value;
                if (inheritedThemeOverrides === undefined) {
                    // no inherited, use self overrides
                    return themeOverrides;
                }
                else {
                    // merge overrides
                    return merge({}, inheritedThemeOverrides, themeOverrides);
                }
            }
        });
        const mergedNamespaceRef = useMemo(() => {
            const { namespace } = props;
            return namespace === undefined
                ? NConfigProvider === null || NConfigProvider === void 0 ? void 0 : NConfigProvider.mergedNamespaceRef.value
                : namespace;
        });
        const mergedBorderedRef = useMemo(() => {
            const { bordered } = props;
            return bordered === undefined
                ? NConfigProvider === null || NConfigProvider === void 0 ? void 0 : NConfigProvider.mergedBorderedRef.value
                : bordered;
        });
        const mergedIconsRef = computed(() => {
            const { icons } = props;
            return icons === undefined ? NConfigProvider === null || NConfigProvider === void 0 ? void 0 : NConfigProvider.mergedIconsRef.value : icons;
        });
        const mergedComponentPropsRef = computed(() => {
            const { componentOptions } = props;
            if (componentOptions !== undefined)
                return componentOptions;
            return NConfigProvider === null || NConfigProvider === void 0 ? void 0 : NConfigProvider.mergedComponentPropsRef.value;
        });
        const mergedClsPrefixRef = computed(() => {
            const { clsPrefix } = props;
            if (clsPrefix !== undefined)
                return clsPrefix;
            return NConfigProvider === null || NConfigProvider === void 0 ? void 0 : NConfigProvider.mergedClsPrefixRef.value;
        });
        const mergedRtlRef = computed(() => {
            const { rtl } = props;
            if (rtl === undefined) {
                return NConfigProvider === null || NConfigProvider === void 0 ? void 0 : NConfigProvider.mergedRtlRef.value;
            }
            const rtlEnabledState = {};
            for (const rtlInfo of rtl) {
                rtlEnabledState[rtlInfo.name] = markRaw(rtlInfo);
            }
            return rtlEnabledState;
        });
        const mergedBreakpointsRef = computed(() => {
            return props.breakpoints || (NConfigProvider === null || NConfigProvider === void 0 ? void 0 : NConfigProvider.mergedBreakpointsRef.value);
        });
        provide(configProviderInjectionKey, {
            mergedBreakpointsRef,
            mergedRtlRef,
            mergedIconsRef,
            mergedComponentPropsRef,
            mergedBorderedRef,
            mergedNamespaceRef,
            mergedClsPrefixRef,
            mergedLocaleRef: computed(() => {
                const { locale } = props;
                if (locale === null)
                    return undefined;
                return locale === undefined
                    ? NConfigProvider === null || NConfigProvider === void 0 ? void 0 : NConfigProvider.mergedLocaleRef.value
                    : locale;
            }),
            mergedDateLocaleRef: computed(() => {
                const { dateLocale } = props;
                if (dateLocale === null)
                    return undefined;
                return dateLocale === undefined
                    ? NConfigProvider === null || NConfigProvider === void 0 ? void 0 : NConfigProvider.mergedDateLocaleRef.value
                    : dateLocale;
            }),
            mergedHljsRef: computed(() => {
                const { hljs } = props;
                return hljs === undefined ? NConfigProvider === null || NConfigProvider === void 0 ? void 0 : NConfigProvider.mergedHljsRef.value : hljs;
            }),
            mergedThemeRef,
            mergedThemeOverridesRef
        });
        return {
            mergedClsPrefix: mergedClsPrefixRef,
            mergedBordered: mergedBorderedRef,
            mergedNamespace: mergedNamespaceRef,
            mergedTheme: mergedThemeRef,
            mergedThemeOverrides: mergedThemeOverridesRef
        };
    },
    render() {
        return !this.abstract
            ? h(this.as || this.tag, {
                class: `${this.mergedClsPrefix || defaultClsPrefix}-config-provider`
            }, renderSlot(this.$slots, 'default'))
            : renderSlot(this.$slots, 'default');
    }
});

/* eslint-disable @typescript-eslint/consistent-type-assertions */
function useTheme(resolveId, mountId, style, defaultTheme, props, clsPrefixRef) {
    const ssrAdapter = useSsrAdapter();
    if (style) {
        const mountStyle = () => {
            const clsPrefix = clsPrefixRef === null || clsPrefixRef === void 0 ? void 0 : clsPrefixRef.value;
            style.mount({
                id: clsPrefix === undefined ? mountId : clsPrefix + mountId,
                head: true,
                props: {
                    bPrefix: clsPrefix ? `.${clsPrefix}-` : undefined
                },
                ssr: ssrAdapter
            });
            globalStyle.mount({
                id: 'naive-ui/global',
                head: true,
                ssr: ssrAdapter
            });
        };
        if (ssrAdapter) {
            mountStyle();
        }
        else {
            onBeforeMount(mountStyle);
        }
    }
    const NConfigProvider = inject(configProviderInjectionKey, null);
    const mergedThemeRef = computed(() => {
        var _a;
        // keep props to make theme overrideable
        const { theme: { common: selfCommon, self, peers = {} } = {}, themeOverrides: selfOverrides = {}, builtinThemeOverrides: builtinOverrides = {} } = props;
        const { common: selfCommonOverrides, peers: peersOverrides } = selfOverrides;
        const { common: globalCommon = undefined, [resolveId]: { common: globalSelfCommon = undefined, self: globalSelf = undefined, peers: globalPeers = {} } = {} } = (NConfigProvider === null || NConfigProvider === void 0 ? void 0 : NConfigProvider.mergedThemeRef.value) || {};
        const { common: globalCommonOverrides = undefined, [resolveId]: globalSelfOverrides = {} } = (NConfigProvider === null || NConfigProvider === void 0 ? void 0 : NConfigProvider.mergedThemeOverridesRef.value) || {};
        const { common: globalSelfCommonOverrides, peers: globalPeersOverrides = {} } = globalSelfOverrides;
        const mergedCommon = merge({}, selfCommon || globalSelfCommon || globalCommon || defaultTheme.common, globalCommonOverrides, globalSelfCommonOverrides, selfCommonOverrides);
        const mergedSelf = merge(
        // {}, executed every time, no need for empty obj
        (_a = (self || globalSelf || defaultTheme.self)) === null || _a === void 0 ? void 0 : _a(mergedCommon), builtinOverrides, globalSelfOverrides, selfOverrides);
        return {
            common: mergedCommon,
            self: mergedSelf,
            peers: merge({}, defaultTheme.peers, globalPeers, peers),
            peerOverrides: merge({}, globalPeersOverrides, peersOverrides)
        };
    });
    return mergedThemeRef;
}
useTheme.props = {
    theme: Object,
    themeOverrides: Object,
    builtinThemeOverrides: Object
};

const defaultClsPrefix = 'n';
function useConfig(props = {}, options = {
    defaultBordered: true
}) {
    const NConfigProvider = inject(configProviderInjectionKey, null);
    return {
        NConfigProvider,
        mergedBorderedRef: computed(() => {
            var _a, _b;
            const { bordered } = props;
            if (bordered !== undefined)
                return bordered;
            return ((_b = (_a = NConfigProvider === null || NConfigProvider === void 0 ? void 0 : NConfigProvider.mergedBorderedRef.value) !== null && _a !== void 0 ? _a : options.defaultBordered) !== null && _b !== void 0 ? _b : true);
        }),
        mergedClsPrefixRef: computed(() => {
            const clsPrefix = NConfigProvider === null || NConfigProvider === void 0 ? void 0 : NConfigProvider.mergedClsPrefixRef.value;
            return clsPrefix || defaultClsPrefix;
        }),
        namespaceRef: computed(() => NConfigProvider === null || NConfigProvider === void 0 ? void 0 : NConfigProvider.mergedNamespaceRef.value)
    };
}

function useStyle(mountId, style, clsPrefixRef) {
    if (!style) {
        if (process.env.NODE_ENV !== 'production')
            throwError('use-style', 'No style is specified.');
        return;
    }
    const ssrAdapter = useSsrAdapter();
    const mountStyle = () => {
        const clsPrefix = clsPrefixRef === null || clsPrefixRef === void 0 ? void 0 : clsPrefixRef.value;
        style.mount({
            id: clsPrefix === undefined ? mountId : clsPrefix + mountId,
            head: true,
            props: {
                bPrefix: clsPrefix ? `.${clsPrefix}-` : undefined
            },
            ssr: ssrAdapter
        });
        globalStyle.mount({
            id: 'naive-ui/global',
            head: true,
            ssr: ssrAdapter
        });
    };
    if (ssrAdapter) {
        mountStyle();
    }
    else {
        onBeforeMount(mountStyle);
    }
}

var NIconSwitchTransition = defineComponent({
    name: 'BaseIconSwitchTransition',
    setup(_, { slots }) {
        const isMountedRef = isMounted();
        return () => (h(Transition, { name: "icon-switch-transition", appear: isMountedRef.value }, slots));
    }
});

var NFadeInExpandTransition = defineComponent({
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
            var _a;
            if (props.width) {
                el.style.maxWidth = '';
            }
            else {
                if (!props.reverse) {
                    el.style.maxHeight = '';
                }
            }
            (_a = props.onAfterEnter) === null || _a === void 0 ? void 0 : _a.call(props);
        }
        return () => {
            const type = props.group ? TransitionGroup : Transition;
            return h(type, {
                name: props.width
                    ? 'fade-in-width-expand-transition'
                    : 'fade-in-height-expand-transition',
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

function createIconSwitchTransition ({
  originalTransform = '',
  left = 0,
  top = 0,
  transition = `all .3s ${commonVariables$1.cubicBezierEaseInOut} !important`
} = {}) {
  return [c$1('&.icon-switch-transition-enter-from, &.icon-switch-transition-leave-to', {
    transform: originalTransform + ' scale(0.75)',
    left,
    top,
    opacity: 0
  }), c$1('&.icon-switch-transition-enter-to, &.icon-switch-transition-leave-from', {
    transform: `${commonVariables$1.transformDebounceScale} ${originalTransform}`,
    left,
    top,
    opacity: 1
  }), c$1('&.icon-switch-transition-enter-active, &.icon-switch-transition-leave-active', {
    transformOrigin: 'center',
    position: 'absolute',
    left,
    top,
    transition
  })];
}

var style$5 = cB('base-loading', `
 position: relative;
 line-height: 0;
 width: 1em;
 height: 1em;
`, [cE('placeholder', `
 position: absolute;
 left: 50%;
 top: 50%;
 transform: translateX(-50%) translateY(-50%);
 `, [createIconSwitchTransition({
  left: '50%',
  top: '50%',
  originalTransform: 'translateX(-50%) translateY(-50%)'
})]), cE('icon', `
 height: 1em;
 width: 1em;
 `, [createIconSwitchTransition()])]);

const duration = '1.6s';
// The loading svg dom comes from https://codepen.io/FezVrasta/pen/oXrgdR
var NBaseLoading = defineComponent({
    name: 'BaseLoading',
    props: {
        clsPrefix: {
            type: String,
            required: true
        },
        scale: {
            type: Number,
            default: 1
        },
        radius: {
            type: Number,
            default: 100
        },
        strokeWidth: {
            type: Number,
            default: 28
        },
        stroke: {
            type: String,
            default: undefined
        },
        show: {
            type: Boolean,
            default: true
        }
    },
    setup(props) {
        useStyle('BaseLoading', style$5, toRef(props, 'clsPrefix'));
    },
    render() {
        const { clsPrefix, radius, strokeWidth, stroke, scale } = this;
        const scaledRadius = radius / scale;
        return (h("div", { class: `${clsPrefix}-base-loading`, role: "img", "aria-label": "loading" },
            h(NIconSwitchTransition, null, {
                default: () => this.show ? (h("svg", { class: `${clsPrefix}-base-loading__icon`, viewBox: `0 0 ${2 * scaledRadius} ${2 * scaledRadius}`, xmlns: "http://www.w3.org/2000/svg", style: { color: stroke } },
                    h("g", null,
                        h("animateTransform", { attributeName: "transform", type: "rotate", values: `0 ${scaledRadius} ${scaledRadius};270 ${scaledRadius} ${scaledRadius}`, begin: "0s", dur: duration, fill: "freeze", repeatCount: "indefinite" }),
                        h("circle", { fill: "none", stroke: "currentColor", "stroke-width": strokeWidth, "stroke-linecap": "round", cx: scaledRadius, cy: scaledRadius, r: radius - strokeWidth / 2, "stroke-dasharray": 5.67 * radius, "stroke-dashoffset": 18.48 * radius },
                            h("animateTransform", { attributeName: "transform", type: "rotate", values: `0 ${scaledRadius} ${scaledRadius};135 ${scaledRadius} ${scaledRadius};450 ${scaledRadius} ${scaledRadius}`, begin: "0s", dur: duration, fill: "freeze", repeatCount: "indefinite" }),
                            h("animate", { attributeName: "stroke-dashoffset", values: `${5.67 * radius};${1.42 * radius};${5.67 * radius}`, begin: "0s", dur: duration, fill: "freeze", repeatCount: "indefinite" }))))) : (h("div", { key: "placeholder", class: `${clsPrefix}-base-loading__placeholder` }, this.$slots))
            })));
    }
});

function getSlot(slots, slotName = 'default') {
    const slot = slots[slotName];
    if (slot === undefined) {
        throw new Error(`[vueuc/binder]: slot[${slotName}] is empty.`);
    }
    return slot();
}
function getFirstVNode(slots, slotName = 'default') {
    const slot = slots[slotName];
    if (slot === undefined) {
        throw new Error(`[vueuc/binder]: slot[${slotName}] is empty.`);
    }
    const content = slot();
    // vue will normalize the slot, so slot must be an array
    if (content.length === 1) {
        return content[0];
    }
    else {
        throw new Error(`[vueuc/binder]: slot[${slotName}] should have exactly one child.`);
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
        return getSlot(this.$slots);
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
            return withDirectives(getFirstVNode(this.$slots), [[setTargetDirective]]);
        }
        return getFirstVNode(this.$slots);
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
    unregister(el) {
        const { elementZIndex } = this;
        if (elementZIndex.has(el)) {
            elementZIndex.delete(el);
        }
        else {
            warn('vdirs/z-index-manager/unregister-element', 'Element not found when unregistering.');
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
        elementZIndexPair.forEach(pair => {
            const el = pair[0];
            const zIndex = this.nextZIndex++;
            if (`${zIndex}` !== el.style.zIndex)
                el.style.zIndex = `${zIndex}`;
        });
    }
}
var zIndexManager = new ZIndexManager();

const ctx = '@@ziContext';
const zindexable = {
    mounted(el, bindings) {
        const { value = {} } = bindings;
        const { zIndex, enabled } = value;
        zIndexManager.ensureZIndex(el, zIndex);
        el[ctx] = {
            enabled
        };
    },
    updated(el, bindings) {
        const { value = {} } = bindings;
        const { zIndex, enabled } = value;
        const cachedEnabled = el[ctx].enabled;
        if (enabled && !cachedEnabled) {
            zIndexManager.ensureZIndex(el, zIndex);
        }
        el[ctx].enabled = enabled;
    },
    unmounted(el) {
        zIndexManager.unregister(el);
    }
};
var zindexable$1 = zindexable;

const { c } = CssRender();

var LazyTeleport = defineComponent({
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
                ? getSlot(this.$slots)
                : h(Teleport, {
                    disabled: this.disabled,
                    to: this.mergedTo
                }, getSlot(this.$slots))
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
function getProperPlacementOfFollower(placement, targetRect, followerRect, flip, overlap) {
    if (!flip || overlap) {
        return placement;
    }
    const [position, align] = placement.split('-');
    let properAlign = align !== null && align !== void 0 ? align : 'center';
    if (align !== 'center') {
        const oppositeAlignCssPositionProp = oppositeAlignCssPositionProps[placement];
        const currentAlignCssPositionProp = oppositionPositions[oppositeAlignCssPositionProp];
        const oppositeAlignCssSizeProp = propToCompare[oppositeAlignCssPositionProp];
        // if follower rect is larger than target rect in align direction
        //           [ target ]
        //           [     follower     ]
        // [     follower     ] <---->
        if (followerRect[oppositeAlignCssSizeProp] > targetRect[oppositeAlignCssSizeProp]) {
            // [ target ]---|
            // [ follower   |  ]
            if (
            // overflow screen
            (targetRect[oppositeAlignCssPositionProp] + targetRect[oppositeAlignCssSizeProp] <= followerRect[oppositeAlignCssSizeProp]) &&
                // opposite align has larger space
                (targetRect[oppositeAlignCssPositionProp] < targetRect[currentAlignCssPositionProp])) {
                properAlign = oppositeAligns[align];
            }
        }
        // if follower rect is smaller than target rect in align direction
        // [     target     ]
        // [ follower ]         <---->
        if (followerRect[oppositeAlignCssSizeProp] < targetRect[oppositeAlignCssSizeProp]) {
            if (targetRect[currentAlignCssPositionProp] < 0 &&
                // opposite align has larger space
                targetRect[oppositeAlignCssPositionProp] > targetRect[currentAlignCssPositionProp]) {
                properAlign = oppositeAligns[align];
            }
        }
    }
    let properPosition = position;
    if (
    // space is not enough
    !(targetRect[position] >= followerRect[propToCompare[position]]) &&
        // opposite position's space is larger
        targetRect[oppositionPositions[position]] >= followerRect[propToCompare[position]]) {
        properPosition = oppositionPositions[position];
    }
    return properAlign !== 'center' ? `${properPosition}-${properAlign}` : properPosition;
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
function getOffset(placement, offsetRect, targetRect, overlap) {
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
                top: `${Math.round(targetRect.top - offsetRect.top + targetRect.height)}px`,
                left: `${Math.round(targetRect.left - offsetRect.left)}px`,
                transform: ''
            };
        case 'bottom-end':
            return {
                top: `${Math.round(targetRect.top - offsetRect.top + targetRect.height)}px`,
                left: `${Math.round(targetRect.left - offsetRect.left + targetRect.width)}px`,
                transform: 'translateX(-100%)'
            };
        case 'top-start':
            return {
                top: `${Math.round(targetRect.top - offsetRect.top)}px`,
                left: `${Math.round(targetRect.left - offsetRect.left)}px`,
                transform: 'translateY(-100%)'
            };
        case 'top-end':
            return {
                top: `${Math.round(targetRect.top - offsetRect.top)}px`,
                left: `${Math.round(targetRect.left - offsetRect.left + targetRect.width)}px`,
                transform: 'translateX(-100%) translateY(-100%)'
            };
        case 'right-start':
            return {
                top: `${Math.round(targetRect.top - offsetRect.top)}px`,
                left: `${Math.round(targetRect.left - offsetRect.left + targetRect.width)}px`,
                transform: ''
            };
        case 'right-end':
            return {
                top: `${Math.round(targetRect.top - offsetRect.top + targetRect.height)}px`,
                left: `${Math.round(targetRect.left - offsetRect.left + targetRect.width)}px`,
                transform: 'translateY(-100%)'
            };
        case 'left-start':
            return {
                top: `${Math.round(targetRect.top - offsetRect.top)}px`,
                left: `${Math.round(targetRect.left - offsetRect.left)}px`,
                transform: 'translateX(-100%)'
            };
        case 'left-end':
            return {
                top: `${Math.round(targetRect.top - offsetRect.top + targetRect.height)}px`,
                left: `${Math.round(targetRect.left - offsetRect.left)}px`,
                transform: 'translateX(-100%) translateY(-100%)'
            };
        case 'top':
            return {
                top: `${Math.round(targetRect.top - offsetRect.top)}px`,
                left: `${Math.round(targetRect.left - offsetRect.left + targetRect.width / 2)}px`,
                transform: 'translateY(-100%) translateX(-50%)'
            };
        case 'right':
            return {
                top: `${Math.round(targetRect.top - offsetRect.top + targetRect.height / 2)}px`,
                left: `${Math.round(targetRect.left - offsetRect.left + targetRect.width)}px`,
                transform: 'translateY(-50%)'
            };
        case 'left':
            return {
                top: `${Math.round(targetRect.top - offsetRect.top + targetRect.height / 2)}px`,
                left: `${Math.round(targetRect.left - offsetRect.left)}px`,
                transform: 'translateY(-50%) translateX(-100%)'
            };
        case 'bottom':
        default:
            return {
                top: `${Math.round(targetRect.top - offsetRect.top + targetRect.height)}px`,
                left: `${Math.round(targetRect.left - offsetRect.left + targetRect.width / 2)}px`,
                transform: 'translateX(-50%)'
            };
    }
}

/* eslint-disable @typescript-eslint/no-non-null-assertion */
const style$4 = c([
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
        style$4.mount({
            id: 'vueuc/binder',
            head: true,
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
            const { width, minWidth, placement, flip } = props;
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
            const properPlacement = getProperPlacementOfFollower(placement, targetRect, followerRect, flip, overlap);
            const properTransformOrigin = getProperTransformOrigin(properPlacement, overlap);
            const { left, top, transform } = getOffset(properPlacement, offsetContainerRect, targetRect, overlap);
            // we assume that the content size doesn't change after flip,
            // nor we need to make sync logic more complex
            follower.setAttribute('v-placement', properPlacement);
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
        ['placement', 'x', 'y', 'flip', 'width', 'overlap', 'minWidth'].forEach((prop) => {
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
        return h(LazyTeleport, {
            show: this.show,
            to: this.mergedTo,
            disabled: this.teleportDisabled
        }, {
            default: () => {
                const vNode = h('div', {
                    class: ['v-binder-follower-container', this.containerClass],
                    ref: 'offsetContainerRef'
                }, [
                    h('div', {
                        class: 'v-binder-follower-content',
                        ref: 'followerRef'
                    }, this.$slots)
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

const base = {
    neutralBase: '#FFF',
    neutralInvertBase: '#000',
    neutralTextBase: '#000',
    neutralPopover: '#fff',
    neutralCard: '#fff',
    neutralModal: '#fff',
    neutralBody: '#fff',
    alpha1: '0.82',
    alpha2: '0.72',
    alpha3: '0.38',
    alpha4: '0.24',
    alpha5: '0.18',
    alphaClose: '0.52',
    alphaDisabled: '0.5',
    alphaDisabledInput: '0.02',
    alphaPending: '0.05',
    alphaTablePending: '0.02',
    alphaPressed: '0.07',
    alphaAvatar: '0.2',
    alphaRail: '0.14',
    alphaProgressRail: '.08',
    alphaBorder: '0.12',
    alphaDivider: '0.06',
    alphaInput: '0',
    alphaAction: '0.02',
    alphaTab: '0.04',
    alphaScrollbar: '0.25',
    alphaScrollbarHover: '0.4',
    alphaCode: '0.05',
    alphaTag: '0.02',
    // primary
    primaryHover: '#36ad6a',
    primaryDefault: '#18a058',
    primaryActive: '#0c7a43',
    primarySuppl: '#36ad6a',
    // info
    infoHover: '#4098fc',
    infoDefault: '#2080f0',
    infoActive: '#1060c9',
    infoSuppl: '#4098fc',
    // error
    errorHover: '#de576d',
    errorDefault: '#d03050',
    errorActive: '#ab1f3f',
    errorSuppl: '#de576d',
    // warning
    warningHover: '#fcb040',
    warningDefault: '#f0a020',
    warningActive: '#c97c10',
    warningSuppl: '#fcb040',
    // success
    successHover: '#36ad6a',
    successDefault: '#18a058',
    successActive: '#0c7a43',
    successSuppl: '#36ad6a'
};
const baseBackgroundRgb = rgba(base.neutralBase);
const baseInvertBackgroundRgb = rgba(base.neutralInvertBase);
const overlayPrefix = 'rgba(' + baseInvertBackgroundRgb.slice(0, 3).join(', ') + ', ';
function overlay(alpha) {
    return overlayPrefix + String(alpha) + ')';
}
function neutral(alpha) {
    const overlayRgba = Array.from(baseInvertBackgroundRgb);
    overlayRgba[3] = Number(alpha);
    return composite(baseBackgroundRgb, overlayRgba);
}
const derived = Object.assign(Object.assign({ name: 'common' }, commonVariables$1), { baseColor: base.neutralBase, 
    // primary color
    primaryColor: base.primaryDefault, primaryColorHover: base.primaryHover, primaryColorPressed: base.primaryActive, primaryColorSuppl: base.primarySuppl, 
    // info color
    infoColor: base.infoDefault, infoColorHover: base.infoHover, infoColorPressed: base.infoActive, infoColorSuppl: base.infoSuppl, 
    // success color
    successColor: base.successDefault, successColorHover: base.successHover, successColorPressed: base.successActive, successColorSuppl: base.successSuppl, 
    // warning color
    warningColor: base.warningDefault, warningColorHover: base.warningHover, warningColorPressed: base.warningActive, warningColorSuppl: base.warningSuppl, 
    // error color
    errorColor: base.errorDefault, errorColorHover: base.errorHover, errorColorPressed: base.errorActive, errorColorSuppl: base.errorSuppl, 
    // text color
    textColorBase: base.neutralTextBase, textColor1: 'rgb(31, 34, 37)', textColor2: 'rgb(51, 54, 57)', textColor3: 'rgb(158, 164, 170)', 
    // textColor4: neutral(base.alpha4), // disabled, placeholder, icon
    // textColor5: neutral(base.alpha5),
    textColorDisabled: neutral(base.alpha4), placeholderColor: neutral(base.alpha4), placeholderColorDisabled: neutral(base.alpha5), iconColor: neutral(base.alpha4), iconColorHover: scaleColor(neutral(base.alpha4), { lightness: 0.75 }), iconColorPressed: scaleColor(neutral(base.alpha4), { lightness: 0.9 }), iconColorDisabled: neutral(base.alpha5), opacity1: base.alpha1, opacity2: base.alpha2, opacity3: base.alpha3, opacity4: base.alpha4, opacity5: base.alpha5, dividerColor: 'rgb(239, 239, 245)', borderColor: 'rgb(224, 224, 230)', 
    // close
    closeColor: neutral(Number(base.alphaClose)), closeColorHover: neutral(Number(base.alphaClose) * 1.25), closeColorPressed: neutral(Number(base.alphaClose) * 0.8), closeColorDisabled: neutral(base.alpha4), 
    // clear
    clearColor: neutral(base.alpha4), clearColorHover: scaleColor(neutral(base.alpha4), { lightness: 0.75 }), clearColorPressed: scaleColor(neutral(base.alpha4), { lightness: 0.9 }), scrollbarColor: overlay(base.alphaScrollbar), scrollbarColorHover: overlay(base.alphaScrollbarHover), scrollbarWidth: '5px', scrollbarHeight: '5px', scrollbarBorderRadius: '5px', progressRailColor: neutral(base.alphaProgressRail), railColor: 'rgb(219, 219, 223)', popoverColor: base.neutralPopover, tableColor: base.neutralCard, cardColor: base.neutralCard, modalColor: base.neutralModal, bodyColor: base.neutralBody, tagColor: 'rgb(250, 250, 252)', avatarColor: neutral(base.alphaAvatar), invertedColor: 'rgb(0, 20, 40)', inputColor: neutral(base.alphaInput), codeColor: 'rgb(244, 244, 248)', tabColor: 'rgb(247, 247, 250)', actionColor: 'rgb(250, 250, 252)', tableHeaderColor: 'rgb(250, 250, 252)', hoverColor: 'rgb(243, 243, 245)', 
    // use color with alpha since it can be nested with header filter & sorter effect
    tableColorHover: 'rgba(0, 0, 100, 0.02)', pressedColor: 'rgb(237, 237, 239)', opacityDisabled: base.alphaDisabled, inputColorDisabled: 'rgb(250, 250, 252)', boxShadow1: '0 1px 2px -2px rgba(0, 0, 0, .08), 0 3px 6px 0 rgba(0, 0, 0, .06), 0 5px 12px 4px rgba(0, 0, 0, .04)', boxShadow2: '0 3px 6px -4px rgba(0, 0, 0, .12), 0 6px 16px 0 rgba(0, 0, 0, .08), 0 9px 28px 8px rgba(0, 0, 0, .05)', boxShadow3: '0 6px 16px -9px rgba(0, 0, 0, .08), 0 9px 28px 0 rgba(0, 0, 0, .05), 0 12px 48px 16px rgba(0, 0, 0, .03)' });
var commonLight = derived;

var style$3 = cB('base-wave', `
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 border-radius: inherit;
`);

var NBaseWave = defineComponent({
    name: 'BaseWave',
    props: {
        clsPrefix: {
            type: String,
            required: true
        }
    },
    setup(props) {
        useStyle('BaseWave', style$3, toRef(props, 'clsPrefix'));
        const selfRef = ref(null);
        const activeRef = ref(false);
        let animationTimerId = null;
        onBeforeUnmount(() => {
            if (animationTimerId !== null) {
                window.clearTimeout(animationTimerId);
            }
        });
        return {
            active: activeRef,
            selfRef,
            play() {
                if (animationTimerId !== null) {
                    window.clearTimeout(animationTimerId);
                    activeRef.value = false;
                    animationTimerId = null;
                }
                void nextTick(() => {
                    var _a;
                    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                    void ((_a = selfRef.value) === null || _a === void 0 ? void 0 : _a.offsetHeight);
                    activeRef.value = true;
                    animationTimerId = window.setTimeout(() => {
                        activeRef.value = false;
                        animationTimerId = null;
                    }, 1000);
                });
            }
        };
    },
    render() {
        const { clsPrefix } = this;
        return (h("div", { ref: "selfRef", "aria-hidden": true, class: [
                `${clsPrefix}-base-wave`,
                this.active && `${clsPrefix}-base-wave--active`
            ] }));
    }
});

function useRtl(mountId, rtlStateRef, clsPrefixRef) {
    if (!rtlStateRef)
        return undefined;
    const ssrAdapter = useSsrAdapter();
    const componentRtlStateRef = computed(() => {
        const { value: rtlState } = rtlStateRef;
        if (!rtlState) {
            return undefined;
        }
        const componentRtlState = rtlState[mountId];
        if (!componentRtlState) {
            return undefined;
        }
        return componentRtlState;
    });
    const mountStyle = () => {
        watchEffect(() => {
            const { value: clsPrefix } = clsPrefixRef;
            const id = `${clsPrefix}${mountId}Rtl`;
            // if it already exists, we only need to watch clsPrefix, although in most
            // of time it's unnecessary... However we can at least listen less
            // handlers, which is great.
            if (exists(id, ssrAdapter))
                return;
            const { value: componentRtlState } = componentRtlStateRef;
            if (!componentRtlState)
                return;
            componentRtlState.style.mount({
                id,
                head: true,
                props: {
                    bPrefix: clsPrefix ? `.${clsPrefix}-` : undefined
                },
                ssr: ssrAdapter
            });
        });
    };
    if (ssrAdapter) {
        mountStyle();
    }
    else {
        onBeforeMount(mountStyle);
    }
    return componentRtlStateRef;
}

const {
  cubicBezierEaseInOut
} = commonVariables$1;
function fadeInWidthExpandTransition ({
  duration = '.2s',
  delay = '.1s'
} = {}) {
  return [c$1('&.fade-in-width-expand-transition-leave-from, &.fade-in-width-expand-transition-enter-to', {
    opacity: 1
  }), c$1('&.fade-in-width-expand-transition-leave-to, &.fade-in-width-expand-transition-enter-from', `
 opacity: 0!important;
 margin-left: 0!important;
 margin-right: 0!important;
 `), c$1('&.fade-in-width-expand-transition-leave-active', `
 overflow: hidden;
 transition:
 opacity ${duration} ${cubicBezierEaseInOut},
 max-width ${duration} ${cubicBezierEaseInOut} ${delay},
 margin-left ${duration} ${cubicBezierEaseInOut} ${delay},
 margin-right ${duration} ${cubicBezierEaseInOut} ${delay};
 `), c$1('&.fade-in-width-expand-transition-enter-active', `
 overflow: hidden;
 transition:
 opacity ${duration} ${cubicBezierEaseInOut} ${delay},
 max-width ${duration} ${cubicBezierEaseInOut},
 margin-left ${duration} ${cubicBezierEaseInOut},
 margin-right ${duration} ${cubicBezierEaseInOut};
 `)];
}

function createHoverColor(rgb) {
    return composite(rgb, [255, 255, 255, 0.16]);
}
function createPressedColor(rgb) {
    return composite(rgb, [0, 0, 0, 0.12]);
}

var commonVariables = {
    paddingTiny: '0 6px',
    paddingSmall: '0 10px',
    paddingMedium: '0 14px',
    paddingLarge: '0 18px',
    paddingRoundTiny: '0 10px',
    paddingRoundSmall: '0 14px',
    paddingRoundMedium: '0 18px',
    paddingRoundLarge: '0 22px',
    iconMarginTiny: '6px',
    iconMarginSmall: '6px',
    iconMarginMedium: '6px',
    iconMarginLarge: '6px',
    iconSizeTiny: '14px',
    iconSizeSmall: '18px',
    iconSizeMedium: '18px',
    iconSizeLarge: '20px',
    rippleDuration: '.6s'
};

const self$1 = (vars) => {
    const { heightTiny, heightSmall, heightMedium, heightLarge, borderRadius, fontSizeTiny, fontSizeSmall, fontSizeMedium, fontSizeLarge, opacityDisabled, textColor1, textColor2, textColor3, primaryColorHover, primaryColorPressed, borderColor, primaryColor, baseColor, infoColor, infoColorHover, infoColorPressed, successColor, successColorHover, successColorPressed, warningColor, warningColorHover, warningColorPressed, errorColor, errorColorHover, errorColorPressed, fontWeight } = vars;
    return Object.assign(Object.assign({}, commonVariables), { heightTiny,
        heightSmall,
        heightMedium,
        heightLarge, borderRadiusTiny: borderRadius, borderRadiusSmall: borderRadius, borderRadiusMedium: borderRadius, borderRadiusLarge: borderRadius, fontSizeTiny: fontSizeTiny, fontSizeSmall: fontSizeSmall, fontSizeMedium: fontSizeMedium, fontSizeLarge: fontSizeLarge, opacityDisabled: opacityDisabled, 
        // default type
        color: '#0000', colorHover: '#0000', colorPressed: '#0000', colorFocus: '#0000', colorDisabled: '#0000', textColor: textColor2, textColorHover: primaryColorHover, textColorPressed: primaryColorPressed, textColorFocus: primaryColorHover, textColorDisabled: textColor2, textColorText: textColor2, textColorTextDepth1: textColor1, textColorTextDepth2: textColor2, textColorTextDepth3: textColor3, textColorTextHover: primaryColorHover, textColorTextPressed: primaryColorPressed, textColorTextFocus: primaryColorHover, textColorTextDisabled: textColor2, textColorGhost: textColor2, textColorGhostHover: primaryColorHover, textColorGhostPressed: primaryColorPressed, textColorGhostFocus: primaryColorHover, textColorGhostDisabled: textColor2, border: `1px solid ${borderColor}`, borderHover: `1px solid ${primaryColorHover}`, borderPressed: `1px solid ${primaryColorPressed}`, borderFocus: `1px solid ${primaryColorHover}`, borderDisabled: `1px solid ${borderColor}`, rippleColor: primaryColor, 
        // primary
        colorPrimary: primaryColor, colorHoverPrimary: primaryColorHover, colorPressedPrimary: primaryColorPressed, colorFocusPrimary: primaryColorHover, colorDisabledPrimary: primaryColor, textColorPrimary: baseColor, textColorHoverPrimary: baseColor, textColorPressedPrimary: baseColor, textColorFocusPrimary: baseColor, textColorDisabledPrimary: baseColor, textColorTextPrimary: primaryColor, textColorTextHoverPrimary: primaryColorHover, textColorTextPressedPrimary: primaryColorPressed, textColorTextFocusPrimary: primaryColorHover, textColorTextDisabledPrimary: textColor2, textColorGhostPrimary: primaryColor, textColorGhostHoverPrimary: primaryColorHover, textColorGhostPressedPrimary: primaryColorPressed, textColorGhostFocusPrimary: primaryColorHover, textColorGhostDisabledPrimary: primaryColor, borderPrimary: `1px solid ${primaryColor}`, borderHoverPrimary: `1px solid ${primaryColorHover}`, borderPressedPrimary: `1px solid ${primaryColorPressed}`, borderFocusPrimary: `1px solid ${primaryColorHover}`, borderDisabledPrimary: `1px solid ${primaryColor}`, rippleColorPrimary: primaryColor, 
        // info
        colorInfo: infoColor, colorHoverInfo: infoColorHover, colorPressedInfo: infoColorPressed, colorFocusInfo: infoColorHover, colorDisabledInfo: infoColor, textColorInfo: baseColor, textColorHoverInfo: baseColor, textColorPressedInfo: baseColor, textColorFocusInfo: baseColor, textColorDisabledInfo: baseColor, textColorTextInfo: infoColor, textColorTextHoverInfo: infoColorHover, textColorTextPressedInfo: infoColorPressed, textColorTextFocusInfo: infoColorHover, textColorTextDisabledInfo: textColor2, textColorGhostInfo: infoColor, textColorGhostHoverInfo: infoColorHover, textColorGhostPressedInfo: infoColorPressed, textColorGhostFocusInfo: infoColorHover, textColorGhostDisabledInfo: infoColor, borderInfo: `1px solid ${infoColor}`, borderHoverInfo: `1px solid ${infoColorHover}`, borderPressedInfo: `1px solid ${infoColorPressed}`, borderFocusInfo: `1px solid ${infoColorHover}`, borderDisabledInfo: `1px solid ${infoColor}`, rippleColorInfo: infoColor, 
        // success
        colorSuccess: successColor, colorHoverSuccess: successColorHover, colorPressedSuccess: successColorPressed, colorFocusSuccess: successColorHover, colorDisabledSuccess: successColor, textColorSuccess: baseColor, textColorHoverSuccess: baseColor, textColorPressedSuccess: baseColor, textColorFocusSuccess: baseColor, textColorDisabledSuccess: baseColor, textColorTextSuccess: successColor, textColorTextHoverSuccess: successColorHover, textColorTextPressedSuccess: successColorPressed, textColorTextFocusSuccess: successColorHover, textColorTextDisabledSuccess: textColor2, textColorGhostSuccess: successColor, textColorGhostHoverSuccess: successColorHover, textColorGhostPressedSuccess: successColorPressed, textColorGhostFocusSuccess: successColorHover, textColorGhostDisabledSuccess: successColor, borderSuccess: `1px solid ${successColor}`, borderHoverSuccess: `1px solid ${successColorHover}`, borderPressedSuccess: `1px solid ${successColorPressed}`, borderFocusSuccess: `1px solid ${successColorHover}`, borderDisabledSuccess: `1px solid ${successColor}`, rippleColorSuccess: successColor, 
        // warning
        colorWarning: warningColor, colorHoverWarning: warningColorHover, colorPressedWarning: warningColorPressed, colorFocusWarning: warningColorHover, colorDisabledWarning: warningColor, textColorWarning: baseColor, textColorHoverWarning: baseColor, textColorPressedWarning: baseColor, textColorFocusWarning: baseColor, textColorDisabledWarning: baseColor, textColorTextWarning: warningColor, textColorTextHoverWarning: warningColorHover, textColorTextPressedWarning: warningColorPressed, textColorTextFocusWarning: warningColorHover, textColorTextDisabledWarning: textColor2, textColorGhostWarning: warningColor, textColorGhostHoverWarning: warningColorHover, textColorGhostPressedWarning: warningColorPressed, textColorGhostFocusWarning: warningColorHover, textColorGhostDisabledWarning: warningColor, borderWarning: `1px solid ${warningColor}`, borderHoverWarning: `1px solid ${warningColorHover}`, borderPressedWarning: `1px solid ${warningColorPressed}`, borderFocusWarning: `1px solid ${warningColorHover}`, borderDisabledWarning: `1px solid ${warningColor}`, rippleColorWarning: warningColor, 
        // error
        colorError: errorColor, colorHoverError: errorColorHover, colorPressedError: errorColorPressed, colorFocusError: errorColorHover, colorDisabledError: errorColor, textColorError: baseColor, textColorHoverError: baseColor, textColorPressedError: baseColor, textColorFocusError: baseColor, textColorDisabledError: baseColor, textColorTextError: errorColor, textColorTextHoverError: errorColorHover, textColorTextPressedError: errorColorPressed, textColorTextFocusError: errorColorHover, textColorTextDisabledError: textColor2, textColorGhostError: errorColor, textColorGhostHoverError: errorColorHover, textColorGhostPressedError: errorColorPressed, textColorGhostFocusError: errorColorHover, textColorGhostDisabledError: errorColor, borderError: `1px solid ${errorColor}`, borderHoverError: `1px solid ${errorColorHover}`, borderPressedError: `1px solid ${errorColorPressed}`, borderFocusError: `1px solid ${errorColorHover}`, borderDisabledError: `1px solid ${errorColor}`, rippleColorError: errorColor, waveOpacity: '0.6', fontWeightText: fontWeight, fontWeight: fontWeight, fontWeighGhost: fontWeight });
};
const buttonLight = {
    name: 'Button',
    common: commonLight,
    self: self$1
};
var buttonLight$1 = buttonLight;

const zero = '0!important';
const n1 = '-1px!important';

function createLeftBorderStyle(type) {
  return cM(type + '-type', [c$1('& +', [cB('button', {}, [cM(type + '-type', [cE('border', {
    borderLeftWidth: zero
  }), cE('state-border', {
    left: n1
  })])])])]);
}

function createTopBorderStyle(type) {
  return cM(type + '-type', [c$1('& +', [cB('button', [cM(type + '-type', [cE('border', {
    borderTopWidth: zero
  }), cE('state-border', {
    top: n1
  })])])])]);
}

var style$2 = cB('button-group', `
 flex-wrap: nowrap;
 display: inline-flex;
 position: relative;
`, [cNotM('vertical', {
  flexDirection: 'row'
}, [cB('button', [c$1('&:first-child:not(:last-child)', `
 margin-right: ${zero};
 border-top-right-radius: ${zero};
 border-bottom-right-radius: ${zero};
 `), c$1('&:last-child:not(:first-child)', `
 margin-left: ${zero};
 border-top-left-radius: ${zero};
 border-bottom-left-radius: ${zero};
 `), c$1('&:not(:first-child):not(:last-child)', `
 margin-left: ${zero};
 margin-right: ${zero};
 border-radius: ${zero};
 `), createLeftBorderStyle('default'), cM('ghost', [createLeftBorderStyle('primary'), createLeftBorderStyle('info'), createLeftBorderStyle('success'), createLeftBorderStyle('warning'), createLeftBorderStyle('error')])])]), cM('vertical', {
  flexDirection: 'column'
}, [cB('button', [c$1('&:first-child:not(:last-child)', `
 margin-bottom: ${zero};
 margin-left: ${zero};
 margin-right: ${zero};
 border-bottom-left-radius: ${zero};
 border-bottom-right-radius: ${zero};
 `), c$1('&:last-child:not(:first-child)', `
 margin-top: ${zero};
 margin-left: ${zero};
 margin-right: ${zero};
 border-top-left-radius: ${zero};
 border-top-right-radius: ${zero};
 `), c$1('&:not(:first-child):not(:last-child)', `
 margin: ${zero};
 border-radius: ${zero};
 `), createTopBorderStyle('default'), cM('ghost', [createTopBorderStyle('primary'), createTopBorderStyle('info'), createTopBorderStyle('success'), createTopBorderStyle('warning'), createTopBorderStyle('error')])])])]);

const buttonGroupInjectionKey = Symbol('button-group');
const buttonGroupProps = {
    size: {
        type: String,
        default: undefined
    },
    vertical: Boolean
};
defineComponent({
    name: 'ButtonGroup',
    props: buttonGroupProps,
    setup(props) {
        const { mergedClsPrefixRef } = useConfig(props);
        useStyle('ButtonGroup', style$2, mergedClsPrefixRef);
        provide(buttonGroupInjectionKey, props);
        return {
            mergedClsPrefix: mergedClsPrefixRef
        };
    },
    render() {
        const { mergedClsPrefix } = this;
        return (h("div", { class: [
                `${mergedClsPrefix}-button-group`,
                this.vertical && `${mergedClsPrefix}-button-group--vertical`
            ], role: "group" }, this.$slots));
    }
});

// --bezier
// --ripple-duration
// --opacity-disabled
// --text-color
// --text-color-hover
// --text-color-pressed
// --text-color-focus
// --text-color-disabled
// --color
// --color-hover
// --color-pressed
// --color-focus
// --color-disabled
// --border
// --border-hover
// --border-pressed
// --border-focus
// --border-disabled
// --ripple-color
// --border-radius
// --height
// --width
// --font-size
// --padding
// --icon-size
// --icon-margin
// --wave-opacity
// --font-weight
//
// private-vars:
// --border-color-xxx, used for custom color

var style$1 = c$1([cB('button', `
 font-weight: var(--font-weight);
 line-height: 1;
 font-family: inherit;
 padding: var(--padding);
 height: var(--height);
 font-size: var(--font-size);
 border-radius: var(--border-radius);
 color: var(--text-color);
 background-color: var(--color);
 width: var(--width);
 white-space: nowrap;
 outline: none;
 position: relative;
 z-index: auto;
 border: none;
 display: inline-flex;
 flex-wrap: nowrap;
 align-items: center;
 justify-content: center;
 user-select: none;
 text-align: center;
 cursor: pointer;
 text-decoration: none;
 transition:
 color .3s var(--bezier),
 background-color .3s var(--bezier),
 opacity .3s var(--bezier),
 border-color .3s var(--bezier);
 `, [cM('color', [cE('border', {
  borderColor: 'var(--border-color)'
}), cM('disabled', [cE('border', {
  borderColor: 'var(--border-color-disabled)'
})]), cNotM('disabled', [c$1('&:focus', [cE('state-border', {
  borderColor: 'var(--border-color-focus)'
})]), c$1('&:hover', [cE('state-border', {
  borderColor: 'var(--border-color-hover)'
})]), c$1('&:active', [cE('state-border', {
  borderColor: 'var(--border-color-pressed)'
})]), cM('pressed', [cE('state-border', {
  borderColor: 'var(--border-color-pressed)'
})])])]), cM('disabled', {
  backgroundColor: 'var(--color-disabled)',
  color: 'var(--text-color-disabled)'
}, [cE('border', {
  border: 'var(--border-disabled)'
})]), cNotM('disabled', [c$1('&:focus', {
  backgroundColor: 'var(--color-focus)',
  color: 'var(--text-color-focus)'
}, [cE('state-border', {
  border: 'var(--border-focus)'
})]), c$1('&:hover', {
  backgroundColor: 'var(--color-hover)',
  color: 'var(--text-color-hover)'
}, [cE('state-border', {
  border: 'var(--border-hover)'
})]), c$1('&:active', {
  backgroundColor: 'var(--color-pressed)',
  color: 'var(--text-color-pressed)'
}, [cE('state-border', {
  border: 'var(--border-pressed)'
})]), cM('pressed', {
  backgroundColor: 'var(--color-pressed)',
  color: 'var(--text-color-pressed)'
}, [cE('state-border', {
  border: 'var(--border-pressed)'
})])]), cB('base-wave', `
 pointer-events: none;
 top: 0;
 right: 0;
 bottom: 0;
 left: 0;
 animation-iteration-count: 1;
 animation-duration: var(--ripple-duration);
 animation-timing-function: var(--bezier-ease-out), var(--bezier-ease-out);
 `, [cM('active', {
  zIndex: 1,
  animationName: 'button-wave-spread, button-wave-opacity'
})]), typeof window !== 'undefined' && 'MozBoxSizing' in document.createElement('div').style ? c$1('&::moz-focus-inner', {
  border: 0
}) : null, cE('border, state-border', `
 position: absolute;
 left: 0;
 top: 0;
 right: 0;
 bottom: 0;
 border-radius: inherit;
 transition: border-color .3s var(--bezier);
 pointer-events: none;
 `), cE('border', {
  border: 'var(--border)'
}), cE('state-border', {
  border: 'var(--border)',
  borderColor: '#0000',
  zIndex: 1
}), cE('icon', `
 margin: var(--icon-margin);
 margin-left: 0;
 height: var(--icon-size);
 width: var(--icon-size);
 max-width: var(--icon-size);
 font-size: var(--icon-size);
 position: relative;
 flex-shrink: 0;
 `, [cB('icon-slot', `
 height: var(--icon-size);
 width: var(--icon-size);
 position: absolute;
 left: 0;
 top: 50%;
 transform: translateY(-50%);
 display: flex;
 `, [createIconSwitchTransition({
  top: '50%',
  originalTransform: 'translateY(-50%)'
})]), fadeInWidthExpandTransition()]), cE('content', `
 display: flex;
 align-items: center;
 flex-wrap: nowrap;
 `, [c$1('~', [cE('icon', {
  margin: 'var(--icon-margin)',
  marginRight: 0
})])]), cM('block', `
 display: flex;
 width: 100%;
 `), cM('dashed', [cE('border, state-border', {
  borderStyle: 'dashed !important'
})]), cM('disabled', {
  cursor: 'not-allowed',
  opacity: 'var(--opacity-disabled)'
})]), c$1('@keyframes button-wave-spread', {
  from: {
    boxShadow: '0 0 0.5px 0 var(--ripple-color)'
  },
  to: {
    // don't use exact 5px since chrome will display the animation with glitches
    boxShadow: '0 0 0.5px 4.5px var(--ripple-color)'
  }
}), c$1('@keyframes button-wave-opacity', {
  from: {
    opacity: 'var(--wave-opacity)'
  },
  to: {
    opacity: 0
  }
})]);

const buttonProps = Object.assign(Object.assign({}, useTheme.props), { color: String, textColor: String, text: Boolean, block: Boolean, loading: Boolean, disabled: Boolean, circle: Boolean, size: String, ghost: Boolean, round: Boolean, depth: [Number, String], focusable: {
        type: Boolean,
        default: true
    }, keyboard: {
        type: Boolean,
        default: true
    }, tag: {
        type: String,
        default: 'button'
    }, type: {
        type: String,
        default: 'default'
    }, dashed: Boolean, iconPlacement: {
        type: String,
        default: 'left'
    }, attrType: {
        type: String,
        default: 'button'
    }, onClick: [Function, Array], bordered: {
        type: Boolean,
        default: true
    } });
const Button = defineComponent({
    name: 'Button',
    props: buttonProps,
    setup(props) {
        const selfRef = ref(null);
        const waveRef = ref(null);
        const enterPressedRef = ref(false);
        const showBorderRef = useMemo(() => {
            return (!props.text &&
                (!props.color || props.ghost || props.dashed) &&
                props.bordered);
        });
        const NButtonGroup = inject(buttonGroupInjectionKey, {});
        const { mergedSizeRef } = useFormItem({}, {
            defaultSize: 'medium',
            mergedSize: (NFormItem) => {
                const { size } = props;
                if (size)
                    return size;
                const { size: buttonGroupSize } = NButtonGroup;
                if (buttonGroupSize)
                    return buttonGroupSize;
                const { mergedSize: formItemSize } = NFormItem || {};
                if (formItemSize) {
                    return formItemSize.value;
                }
                return 'medium';
            }
        });
        const mergedFocusableRef = computed(() => {
            return props.focusable && !props.disabled;
        });
        const handleMouseDown = (e) => {
            var _a;
            e.preventDefault();
            if (props.disabled) {
                return;
            }
            if (mergedFocusableRef.value) {
                (_a = selfRef.value) === null || _a === void 0 ? void 0 : _a.focus({ preventScroll: true });
            }
        };
        const handleClick = (e) => {
            if (!props.disabled) {
                const { onClick } = props;
                if (onClick)
                    call(onClick, e);
                if (!props.text) {
                    const { value } = waveRef;
                    if (value) {
                        value.play();
                    }
                }
            }
        };
        const handleKeyUp = (e) => {
            switch (e.code) {
                case 'Enter':
                case 'NumpadEnter':
                    if (!props.keyboard) {
                        e.preventDefault();
                        return;
                    }
                    enterPressedRef.value = false;
                    void nextTick(() => {
                        var _a;
                        if (!props.disabled) {
                            (_a = selfRef.value) === null || _a === void 0 ? void 0 : _a.click();
                        }
                    });
            }
        };
        const handleKeyDown = (e) => {
            switch (e.code) {
                case 'Enter':
                case 'NumpadEnter':
                    if (!props.keyboard) {
                        e.preventDefault();
                        return;
                    }
                    enterPressedRef.value = true;
            }
        };
        const handleBlur = () => {
            enterPressedRef.value = false;
        };
        const { mergedClsPrefixRef, NConfigProvider } = useConfig(props);
        const themeRef = useTheme('Button', 'Button', style$1, buttonLight$1, props, mergedClsPrefixRef);
        const rtlEnabledRef = useRtl('Button', NConfigProvider === null || NConfigProvider === void 0 ? void 0 : NConfigProvider.mergedRtlRef, mergedClsPrefixRef);
        return {
            selfRef,
            waveRef,
            mergedClsPrefix: mergedClsPrefixRef,
            mergedFocusable: mergedFocusableRef,
            mergedSize: mergedSizeRef,
            showBorder: showBorderRef,
            enterPressed: enterPressedRef,
            rtlEnabled: rtlEnabledRef,
            handleMouseDown,
            handleKeyDown,
            handleBlur,
            handleKeyUp,
            handleClick,
            customColorCssVars: computed(() => {
                const { color } = props;
                if (!color)
                    return null;
                const hoverColor = createHoverColor(color);
                return {
                    '--border-color': color,
                    '--border-color-hover': hoverColor,
                    '--border-color-pressed': createPressedColor(color),
                    '--border-color-focus': hoverColor,
                    '--border-color-disabled': color
                };
            }),
            cssVars: computed(() => {
                const theme = themeRef.value;
                const { common: { cubicBezierEaseInOut, cubicBezierEaseOut }, self } = theme;
                const { rippleDuration, opacityDisabled, fontWeightText, fontWeighGhost, fontWeight } = self;
                const size = mergedSizeRef.value;
                const { dashed, type, ghost, text, color, round, circle, textColor } = props;
                // font
                const fontProps = {
                    fontWeight: text
                        ? fontWeightText
                        : ghost
                            ? fontWeighGhost
                            : fontWeight
                };
                // color
                let colorProps = {
                    '--color': 'initial',
                    '--color-hover': 'initial',
                    '--color-pressed': 'initial',
                    '--color-focus': 'initial',
                    '--color-disabled': 'initial',
                    '--ripple-color': 'initial',
                    '--text-color': 'initial',
                    '--text-color-hover': 'initial',
                    '--text-color-pressed': 'initial',
                    '--text-color-focus': 'initial',
                    '--text-color-disabled': 'initial'
                };
                if (text) {
                    const { depth } = props;
                    const propTextColor = textColor || color;
                    const mergedTextColor = propTextColor ||
                        (type === 'default' && depth !== undefined
                            ? self[createKey('textColorTextDepth', String(depth))]
                            : self[createKey('textColorText', type)]);
                    colorProps = {
                        '--color': '#0000',
                        '--color-hover': '#0000',
                        '--color-pressed': '#0000',
                        '--color-focus': '#0000',
                        '--color-disabled': '#0000',
                        '--ripple-color': '#0000',
                        '--text-color': mergedTextColor,
                        '--text-color-hover': propTextColor
                            ? createHoverColor(propTextColor)
                            : self[createKey('textColorTextHover', type)],
                        '--text-color-pressed': propTextColor
                            ? createPressedColor(propTextColor)
                            : self[createKey('textColorTextPressed', type)],
                        '--text-color-focus': propTextColor
                            ? createHoverColor(propTextColor)
                            : self[createKey('textColorTextHover', type)],
                        '--text-color-disabled': propTextColor || self[createKey('textColorTextDisabled', type)]
                    };
                }
                else if (ghost || dashed) {
                    const mergedTextColor = textColor || color;
                    colorProps = {
                        '--color': '#0000',
                        '--color-hover': '#0000',
                        '--color-pressed': '#0000',
                        '--color-focus': '#0000',
                        '--color-disabled': '#0000',
                        '--ripple-color': color || self[createKey('rippleColor', type)],
                        '--text-color': mergedTextColor || self[createKey('textColorGhost', type)],
                        '--text-color-hover': mergedTextColor
                            ? createHoverColor(mergedTextColor)
                            : self[createKey('textColorGhostHover', type)],
                        '--text-color-pressed': mergedTextColor
                            ? createPressedColor(mergedTextColor)
                            : self[createKey('textColorGhostPressed', type)],
                        '--text-color-focus': mergedTextColor
                            ? createHoverColor(mergedTextColor)
                            : self[createKey('textColorGhostHover', type)],
                        '--text-color-disabled': mergedTextColor || self[createKey('textColorGhostDisabled', type)]
                    };
                }
                else {
                    colorProps = {
                        '--color': color || self[createKey('color', type)],
                        '--color-hover': color
                            ? createHoverColor(color)
                            : self[createKey('colorHover', type)],
                        '--color-pressed': color
                            ? createPressedColor(color)
                            : self[createKey('colorPressed', type)],
                        '--color-focus': color
                            ? createHoverColor(color)
                            : self[createKey('colorFocus', type)],
                        '--color-disabled': color || self[createKey('colorDisabled', type)],
                        '--ripple-color': color || self[createKey('rippleColor', type)],
                        '--text-color': textColor ||
                            (color
                                ? self.textColorPrimary
                                : self[createKey('textColor', type)]),
                        '--text-color-hover': textColor ||
                            (color
                                ? self.textColorHoverPrimary
                                : self[createKey('textColorHover', type)]),
                        '--text-color-pressed': textColor ||
                            (color
                                ? self.textColorPressedPrimary
                                : self[createKey('textColorPressed', type)]),
                        '--text-color-focus': textColor ||
                            (color
                                ? self.textColorFocusPrimary
                                : self[createKey('textColorFocus', type)]),
                        '--text-color-disabled': textColor ||
                            (color
                                ? self.textColorDisabledPrimary
                                : self[createKey('textColorDisabled', type)])
                    };
                }
                // border
                let borderProps = {
                    '--border': 'initial',
                    '--border-hover': 'initial',
                    '--border-pressed': 'initial',
                    '--border-focus': 'initial',
                    '--border-disabled': 'initial'
                };
                if (text) {
                    borderProps = {
                        '--border': 'none',
                        '--border-hover': 'none',
                        '--border-pressed': 'none',
                        '--border-focus': 'none',
                        '--border-disabled': 'none'
                    };
                }
                else {
                    borderProps = {
                        '--border': self[createKey('border', type)],
                        '--border-hover': self[createKey('borderHover', type)],
                        '--border-pressed': self[createKey('borderPressed', type)],
                        '--border-focus': self[createKey('borderFocus', type)],
                        '--border-disabled': self[createKey('borderDisabled', type)]
                    };
                }
                // size
                const { [createKey('height', size)]: height, [createKey('fontSize', size)]: fontSize, [createKey('padding', size)]: padding, [createKey('paddingRound', size)]: paddingRound, [createKey('iconSize', size)]: iconSize, [createKey('borderRadius', size)]: borderRadius, [createKey('iconMargin', size)]: iconMargin, waveOpacity } = self;
                const sizeProps = {
                    '--width': circle && !text ? height : 'initial',
                    '--height': text ? 'initial' : height,
                    '--font-size': fontSize,
                    '--padding': circle
                        ? 'initial'
                        : text
                            ? 'initial'
                            : round
                                ? paddingRound
                                : padding,
                    '--icon-size': iconSize,
                    '--icon-margin': iconMargin,
                    '--border-radius': text
                        ? 'initial'
                        : circle || round
                            ? height
                            : borderRadius
                };
                return Object.assign(Object.assign(Object.assign(Object.assign({ '--bezier': cubicBezierEaseInOut, '--bezier-ease-out': cubicBezierEaseOut, '--ripple-duration': rippleDuration, '--opacity-disabled': opacityDisabled, '--wave-opacity': waveOpacity }, fontProps), colorProps), borderProps), sizeProps);
            })
        };
    },
    render() {
        const { $slots, mergedClsPrefix, tag: Component } = this;
        return (h(Component, { ref: "selfRef", class: [
                `${mergedClsPrefix}-button`,
                `${mergedClsPrefix}-button--${this.type}-type`,
                `${mergedClsPrefix}-button--${this.mergedSize}-type`,
                this.rtlEnabled && `${mergedClsPrefix}-button--rtl`,
                this.disabled && `${mergedClsPrefix}-button--disabled`,
                this.block && `${mergedClsPrefix}-button--block`,
                this.enterPressed && `${mergedClsPrefix}-button--pressed`,
                !this.text && this.dashed && `${mergedClsPrefix}-button--dashed`,
                this.color && `${mergedClsPrefix}-button--color`,
                this.ghost && `${mergedClsPrefix}-button--ghost` // required for button group border collapse
            ], tabindex: this.mergedFocusable ? 0 : -1, type: this.attrType, style: this.cssVars, disabled: this.disabled, onClick: this.handleClick, onBlur: this.handleBlur, onMousedown: this.handleMouseDown, onKeyup: this.handleKeyUp, onKeydown: this.handleKeyDown },
            $slots.default && this.iconPlacement === 'right' ? (h("div", { class: `${mergedClsPrefix}-button__content` }, $slots)) : null,
            h(NFadeInExpandTransition, { width: true }, {
                default: () => $slots.icon || this.loading ? (h("span", { class: `${mergedClsPrefix}-button__icon`, style: {
                        margin: !$slots.default ? 0 : ''
                    } },
                    h(NIconSwitchTransition, null, {
                        default: () => this.loading ? (h(NBaseLoading, { clsPrefix: mergedClsPrefix, key: "loading", class: `${mergedClsPrefix}-icon-slot`, strokeWidth: 20 })) : (h("div", { key: "icon", class: `${mergedClsPrefix}-icon-slot`, role: "none" }, renderSlot($slots, 'icon')))
                    }))) : null
            }),
            $slots.default && this.iconPlacement === 'left' ? (h("span", { class: `${mergedClsPrefix}-button__content` }, $slots)) : null,
            !this.text ? (h(NBaseWave, { ref: "waveRef", clsPrefix: mergedClsPrefix })) : null,
            this.showBorder ? (h("div", { "aria-hidden": true, class: `${mergedClsPrefix}-button__border`, style: this.customColorCssVars })) : null,
            this.showBorder ? (h("div", { "aria-hidden": true, class: `${mergedClsPrefix}-button__state-border`, style: this.customColorCssVars })) : null));
    }
});
var NButton = Button;
// Also, we may make XButton a generic type which support `tag` prop
// but currently vue doesn't export IntrinsicElementAttributes from runtime-dom
// so we can't easily make an attr map by hand
// just leave it for later

const self = (vars) => {
    const { textColorBase, opacity1, opacity2, opacity3, opacity4, opacity5 } = vars;
    return {
        color: textColorBase,
        opacity1Depth: opacity1,
        opacity2Depth: opacity2,
        opacity3Depth: opacity3,
        opacity4Depth: opacity4,
        opacity5Depth: opacity5
    };
};
const iconLight = {
    name: 'Icon',
    common: commonLight,
    self
};
var iconLight$1 = iconLight;

// --bezier
// --color
// --opacity

var style = cB('icon', `
 height: 1em;
 width: 1em;
 line-height: 1em;
 text-align: center;
 display: inline-block;
 position: relative;
 fill: currentColor;
 transform: translateZ(0);
`, [cM('color-transition', {
  transition: 'color .3s var(--bezier)'
}), cM('depth', {
  color: 'var(--color)'
}, [c$1('svg', {
  opacity: 'var(--opacity)',
  transition: 'opacity .3s var(--bezier)'
})]), c$1('svg', {
  height: '1em',
  width: '1em'
})]);

var NIcon = defineComponent({
    _n_icon__: true,
    name: 'Icon',
    inheritAttrs: false,
    props: Object.assign(Object.assign({}, useTheme.props), { depth: [String, Number], size: [Number, String], color: String }),
    setup(props) {
        const { mergedClsPrefixRef } = useConfig(props);
        const themeRef = useTheme('Icon', 'Icon', style, iconLight$1, props, mergedClsPrefixRef);
        return {
            mergedClsPrefix: mergedClsPrefixRef,
            mergedStyle: computed(() => {
                const { size, color } = props;
                return {
                    fontSize: formatLength(size),
                    color
                };
            }),
            cssVars: computed(() => {
                const { depth } = props;
                const { common: { cubicBezierEaseInOut }, self } = themeRef.value;
                if (depth !== undefined) {
                    const { color, [`opacity${depth}Depth`]: opacity } = self;
                    return {
                        '--bezier': cubicBezierEaseInOut,
                        '--color': color,
                        '--opacity': opacity
                    };
                }
                return {
                    '--bezier': cubicBezierEaseInOut
                };
            })
        };
    },
    render() {
        var _a;
        const { $parent, depth, mergedClsPrefix } = this;
        if ((_a = $parent === null || $parent === void 0 ? void 0 : $parent.$options) === null || _a === void 0 ? void 0 : _a._n_icon__) {
            warn$1('icon', "don't wrap `n-icon` inside `n-icon`");
        }
        return h('i', mergeProps(this.$attrs, {
            role: 'img',
            class: [
                `${mergedClsPrefix}-icon`,
                {
                    [`${mergedClsPrefix}-icon--depth`]: depth,
                    [`${mergedClsPrefix}-icon--color-transition`]: depth !== undefined
                }
            ],
            style: Object.assign(this.cssVars, this.mergedStyle)
        }), this.$slots);
    }
});

function flatten(vNodes, identificationKey = null, result = []) {
    for (const vNode of vNodes) {
        if (identificationKey && vNode.type.alias?.[0] === identificationKey) {
            result.push(vNode);
        }
        else if (vNode.type === Fragment) {
            flatten(vNode.children, identificationKey, result);
        }
        else if (vNode.type !== Comment) {
            result.push(vNode);
        }
    }
    return result;
}

function getSlotFirstVNode(slot) {
    return slot ? flatten(slot())[0] : null;
}

const _hoisted_1$1 = {
  xmlns: 'http://www.w3.org/2000/svg',
  'xmlns:xlink': 'http://www.w3.org/1999/xlink',
  viewBox: '0 0 512 512'
};
const _hoisted_2$1 = /*#__PURE__*/ createVNode(
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
    return openBlock(), createBlock('svg', _hoisted_1$1, [_hoisted_2$1])
  }
});

const _hoisted_1 = {
  xmlns: 'http://www.w3.org/2000/svg',
  'xmlns:xlink': 'http://www.w3.org/1999/xlink',
  viewBox: '0 0 512 512'
};
const _hoisted_2 = /*#__PURE__*/ createVNode(
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
    return openBlock(), createBlock('svg', _hoisted_1, [_hoisted_2])
  }
});

const __default__$2 = {
    name: 'Popconfirm'
};
function setup$2(__props, { emit }) {
    const props = __props;
    const slots = useSlots();
    const attrs = useAttrs();
    const { content, cancelText, confirmText, hideIcon } = toRefs$1(props);
    const popoverRef = ref();
    const handleCancel = () => {
        let callback;
        emit('cancel', (flag = true) => {
            callback = flag;
        });
        if (callback === undefined || !callback) {
            popoverRef.value.hide();
        }
    };
    const handleConfirm = () => {
        let callback;
        emit('confirm', (flag = true) => {
            callback = flag;
        });
        if (callback === undefined || !callback) {
            popoverRef.value.hide();
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
                    ? renderSlot(slots, 'action')
                    : createVNode(Fragment, null, [
                        showCancel ? createVNode(NButton, { size: 'small', onClick: handleCancel }, { default: () => cancelText.value }) : null,
                        showConfirm ? createVNode(NButton, { class: 'mc-ml-2', size: 'small', type: 'primary', onClick: handleConfirm }, { default: () => confirmText.value }) : null
                    ])
            ])
            : null;
    };
    const Render = () => {
        const iconVNode = hideIcon.value ? null : getSlotFirstVNode(slots.icon) || createVNode(NIcon, { size: 22, class: 'mc-mr-2 mc-text-yellow-500' }, { default: () => createVNode(IconAlert) });
        const popoverMergedProps = mergeProps({
            ref: popoverRef,
            class: 'mc-popconfirm',
            trigger: 'click'
        }, attrs);
        return createVNode(script$1, popoverMergedProps, {
            default: () => renderSlot(slots, 'default'),
            content: () => createVNode(Fragment, null, [
                createVNode('div', {
                    class: 'mc-popconfirm__content'
                }, [iconVNode, createTextVNode(content.value)]),
                getActionVNode()
            ])
        });
    };
    return (_ctx, _cache) => {
        return (openBlock(), createBlock(Render));
    };
}
var script$2 = /*#__PURE__*/ defineComponent({
    ...__default__$2,
    props: {
        content: { type: String, required: false, default: '' },
        cancelText: { type: null, required: false, default: '取消' },
        confirmText: { type: null, required: false, default: '确认' },
        hideIcon: { type: Boolean, required: false, default: false }
    },
    emits: ["cancel", "confirm"],
    setup: setup$2
});

script$2.__file = "src/popconfirm/Popconfirm.vue";

// 在组件上添加install方法，方便直接使用单个组件
script$2.install = (app) => {
    app.component('McPopconfirm', script$2);
};

function tryOnScopeDispose(fn) {
  if (getCurrentScope()) {
    onScopeDispose(fn);
    return true;
  }
  return false;
}

const isClient$1 = typeof window !== "undefined";
const isString = (val) => typeof val === "string";
const timestamp = () => +Date.now();
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
    } else if (trailing) {
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
function createSingletonPromise(fn) {
  let _promise;
  function wrapper() {
    if (!_promise)
      _promise = fn();
    return _promise;
  }
  wrapper.reset = async () => {
    const _prev = _promise;
    _promise = void 0;
    if (_prev)
      await _prev;
  };
  return wrapper;
}
function objectPick(obj, keys, omitUndefined = false) {
  return keys.reduce((n, k) => {
    if (k in obj) {
      if (!omitUndefined || !obj[k] === void 0)
        n[k] = obj[k];
    }
    return n;
  }, {});
}

var __getOwnPropSymbols$9$1 = Object.getOwnPropertySymbols;
var __hasOwnProp$9$1 = Object.prototype.hasOwnProperty;
var __propIsEnum$9$1 = Object.prototype.propertyIsEnumerable;
var __objRest$5 = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp$9$1.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols$9$1)
    for (var prop of __getOwnPropSymbols$9$1(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum$9$1.call(source, prop))
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

var __defProp$2$1 = Object.defineProperty;
var __defProps$6 = Object.defineProperties;
var __getOwnPropDescs$6 = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols$3$1 = Object.getOwnPropertySymbols;
var __hasOwnProp$3$1 = Object.prototype.hasOwnProperty;
var __propIsEnum$3$1 = Object.prototype.propertyIsEnumerable;
var __defNormalProp$2$1 = (obj, key, value) => key in obj ? __defProp$2$1(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues$2$1 = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp$3$1.call(b, prop))
      __defNormalProp$2$1(a, prop, b[prop]);
  if (__getOwnPropSymbols$3$1)
    for (var prop of __getOwnPropSymbols$3$1(b)) {
      if (__propIsEnum$3$1.call(b, prop))
        __defNormalProp$2$1(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps$6 = (a, b) => __defProps$6(a, __getOwnPropDescs$6(b));
function toRefs(objectRef) {
  if (!isRef(objectRef))
    return toRefs$1(objectRef);
  const result = Array.isArray(objectRef.value) ? new Array(objectRef.value.length) : {};
  for (const key in objectRef.value) {
    result[key] = customRef(() => ({
      get() {
        return objectRef.value[key];
      },
      set(v) {
        if (Array.isArray(objectRef.value)) {
          const copy = [...objectRef.value];
          copy[key] = v;
          objectRef.value = copy;
        } else {
          objectRef.value = __spreadProps$6(__spreadValues$2$1({}, objectRef.value), { [key]: v });
        }
      }
    }));
  }
  return result;
}

function tryOnMounted(fn, sync = true) {
  if (getCurrentInstance())
    onMounted(fn);
  else if (sync)
    fn();
  else
    nextTick(fn);
}

function useIntervalFn(cb, interval = 1e3, options = {}) {
  const {
    immediate = true,
    immediateCallback = false
  } = options;
  let timer = null;
  const isActive = ref(false);
  function clean() {
    if (timer) {
      clearInterval(timer);
      timer = null;
    }
  }
  function pause() {
    isActive.value = false;
    clean();
  }
  function resume() {
    if (interval <= 0)
      return;
    isActive.value = true;
    if (immediateCallback)
      cb();
    clean();
    timer = setInterval(cb, interval);
  }
  if (immediate && isClient$1)
    resume();
  tryOnScopeDispose(pause);
  return {
    isActive,
    pause,
    resume
  };
}

function unrefElement(elRef) {
  var _a;
  const plain = unref(elRef);
  return (_a = plain == null ? void 0 : plain.$el) != null ? _a : plain;
}

const defaultWindow$1 = isClient$1 ? window : void 0;
const defaultDocument = isClient$1 ? window.document : void 0;
const defaultNavigator = isClient$1 ? window.navigator : void 0;

function useEventListener(...args) {
  let target;
  let event;
  let listener;
  let options;
  if (isString(args[0])) {
    [event, listener, options] = args;
    target = defaultWindow$1;
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
  const { window = defaultWindow$1, event = "pointerdown" } = options;
  if (!window)
    return;
  const listener = (event2) => {
    const el = unrefElement(target);
    if (!el)
      return;
    if (el === event2.target || event2.composedPath().includes(el))
      return;
    handler(event2);
  };
  return useEventListener(window, event, listener, { passive: true });
}

function useActiveElement(options = {}) {
  const { window = defaultWindow$1 } = options;
  const counter = ref(0);
  if (window) {
    useEventListener(window, "blur", () => counter.value += 1, true);
    useEventListener(window, "focus", () => counter.value += 1, true);
  }
  return computed(() => {
    counter.value;
    return window == null ? void 0 : window.document.activeElement;
  });
}

function useBattery({ navigator = defaultNavigator } = {}) {
  const events = ["chargingchange", "chargingtimechange", "dischargingtimechange", "levelchange"];
  const isSupported = navigator && "getBattery" in navigator;
  const charging = ref(false);
  const chargingTime = ref(0);
  const dischargingTime = ref(0);
  const level = ref(1);
  let battery;
  function updateBatteryInfo() {
    charging.value = this.charging;
    chargingTime.value = this.chargingTime || 0;
    dischargingTime.value = this.dischargingTime || 0;
    level.value = this.level;
  }
  if (isSupported) {
    navigator.getBattery().then((_battery) => {
      battery = _battery;
      updateBatteryInfo.call(battery);
      for (const event of events)
        useEventListener(battery, event, updateBatteryInfo, { passive: true });
    });
  }
  return {
    isSupported,
    charging,
    chargingTime,
    dischargingTime,
    level
  };
}

function useMediaQuery(query, options = {}) {
  const { window = defaultWindow$1 } = options;
  if (!window)
    return ref(false);
  const mediaQuery = window.matchMedia(query);
  const matches = ref(mediaQuery.matches);
  const handler = (event) => {
    matches.value = event.matches;
  };
  if ("addEventListener" in mediaQuery)
    mediaQuery.addEventListener("change", handler);
  else
    mediaQuery.addListener(handler);
  tryOnScopeDispose(() => {
    if ("removeEventListener" in mediaQuery)
      mediaQuery.removeEventListener("change", handler);
    else
      mediaQuery.removeListener(handler);
  });
  return matches;
}

function useBrowserLocation({ window = defaultWindow$1 } = {}) {
  const buildState = (trigger) => {
    const { state: state2, length } = (window == null ? void 0 : window.history) || {};
    const { hash, host, hostname, href, origin, pathname, port, protocol, search } = (window == null ? void 0 : window.location) || {};
    return {
      trigger,
      state: state2,
      length,
      hash,
      host,
      hostname,
      href,
      origin,
      pathname,
      port,
      protocol,
      search
    };
  };
  const state = ref(buildState("load"));
  if (window) {
    useEventListener(window, "popstate", () => state.value = buildState("popstate"), { passive: true });
    useEventListener(window, "hashchange", () => state.value = buildState("hashchange"), { passive: true });
  }
  return state;
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
function useStorage(key, initialValue, storage = ((_a) => (_a = defaultWindow$1) == null ? void 0 : _a.localStorage)(), options = {}) {
  var _a2;
  const {
    flush = "pre",
    deep = true,
    listenToStorageChanges = true,
    writeDefaults = true,
    shallow,
    window = defaultWindow$1,
    eventFilter,
    onError = (e) => {
      console.error(e);
    }
  } = options;
  const rawInit = unref(initialValue);
  const type = rawInit == null ? "any" : rawInit instanceof Set ? "set" : rawInit instanceof Map ? "map" : typeof rawInit === "boolean" ? "boolean" : typeof rawInit === "string" ? "string" : typeof rawInit === "object" ? "object" : Array.isArray(rawInit) ? "object" : !Number.isNaN(rawInit) ? "number" : "any";
  const data = (shallow ? shallowRef : ref)(initialValue);
  const serializer = (_a2 = options.serializer) != null ? _a2 : StorageSerializers[type];
  function read(event) {
    if (!storage || event && event.key !== key)
      return;
    try {
      const rawValue = event ? event.newValue : storage.getItem(key);
      if (rawValue == null) {
        data.value = rawInit;
        if (writeDefaults && rawInit !== null)
          storage.setItem(key, serializer.write(rawInit));
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

function useDark(options = {}) {
  var _a;
  const {
    selector = "html",
    attribute = "class",
    valueDark = "dark",
    valueLight = "",
    window = defaultWindow$1,
    storage = (_a = defaultWindow$1) == null ? void 0 : _a.localStorage,
    storageKey = "vueuse-color-scheme",
    listenToStorageChanges = true
  } = options;
  const preferredDark = usePreferredDark({ window });
  const store = storageKey == null ? ref("auto") : useStorage(storageKey, "auto", storage, { window, listenToStorageChanges });
  const isDark = computed({
    get() {
      return store.value === "auto" ? preferredDark.value : store.value === "dark";
    },
    set(v) {
      if (v === preferredDark.value)
        store.value = "auto";
      else
        store.value = v ? "dark" : "light";
    }
  });
  const onChanged = options.onChanged || ((v) => {
    const el = window == null ? void 0 : window.document.querySelector(selector);
    if (attribute === "class") {
      el == null ? void 0 : el.classList.toggle(valueDark, v);
      if (valueLight)
        el == null ? void 0 : el.classList.toggle(valueLight, !v);
    } else {
      el == null ? void 0 : el.setAttribute(attribute, v ? valueDark : valueLight);
    }
  });
  watch(isDark, onChanged, { flush: "post" });
  tryOnMounted(() => onChanged(isDark.value));
  return isDark;
}

function useDeviceMotion(options = {}) {
  const {
    window = defaultWindow$1,
    eventFilter = bypassFilter
  } = options;
  const acceleration = ref({ x: null, y: null, z: null });
  const rotationRate = ref({ alpha: null, beta: null, gamma: null });
  const interval = ref(0);
  const accelerationIncludingGravity = ref({
    x: null,
    y: null,
    z: null
  });
  if (window) {
    const onDeviceMotion = createFilterWrapper(eventFilter, (event) => {
      acceleration.value = event.acceleration;
      accelerationIncludingGravity.value = event.accelerationIncludingGravity;
      rotationRate.value = event.rotationRate;
      interval.value = event.interval;
    });
    useEventListener(window, "devicemotion", onDeviceMotion);
  }
  return {
    acceleration,
    accelerationIncludingGravity,
    rotationRate,
    interval
  };
}

function useDeviceOrientation(options = {}) {
  const { window = defaultWindow$1 } = options;
  const isSupported = Boolean(window && "DeviceOrientationEvent" in window);
  const isAbsolute = ref(false);
  const alpha = ref(null);
  const beta = ref(null);
  const gamma = ref(null);
  if (window && isSupported) {
    useEventListener(window, "deviceorientation", (event) => {
      isAbsolute.value = event.absolute;
      alpha.value = event.alpha;
      beta.value = event.beta;
      gamma.value = event.gamma;
    });
  }
  return {
    isSupported,
    isAbsolute,
    alpha,
    beta,
    gamma
  };
}

const DEVICE_PIXEL_RATIO_SCALES = [
  1,
  1.325,
  1.4,
  1.5,
  1.8,
  2,
  2.4,
  2.5,
  2.75,
  3,
  3.5,
  4
];
function useDevicePixelRatio({
  window = defaultWindow$1
} = {}) {
  if (!window) {
    return {
      pixelRatio: ref(1)
    };
  }
  const pixelRatio = ref(window.devicePixelRatio);
  const handleDevicePixelRatio = () => {
    pixelRatio.value = window.devicePixelRatio;
  };
  useEventListener(window, "resize", handleDevicePixelRatio, { passive: true });
  DEVICE_PIXEL_RATIO_SCALES.forEach((dppx) => {
    const mqlMin = useMediaQuery(`screen and (min-resolution: ${dppx}dppx)`);
    const mqlMax = useMediaQuery(`screen and (max-resolution: ${dppx}dppx)`);
    watch([mqlMin, mqlMax], handleDevicePixelRatio);
  });
  return { pixelRatio };
}

function usePermission(permissionDesc, options = {}) {
  const {
    controls = false,
    navigator = defaultNavigator
  } = options;
  const isSupported = Boolean(navigator && "permissions" in navigator);
  let permissionStatus;
  const desc = typeof permissionDesc === "string" ? { name: permissionDesc } : permissionDesc;
  const state = ref();
  const onChange = () => {
    if (permissionStatus)
      state.value = permissionStatus.state;
  };
  const query = createSingletonPromise(async () => {
    if (!isSupported)
      return;
    if (!permissionStatus) {
      try {
        permissionStatus = await navigator.permissions.query(desc);
        useEventListener(permissionStatus, "change", onChange);
        onChange();
      } catch (e) {
        state.value = "prompt";
      }
    }
    return permissionStatus;
  });
  query();
  if (controls) {
    return {
      state,
      isSupported,
      query
    };
  } else {
    return state;
  }
}

function useDevicesList(options = {}) {
  const {
    navigator = defaultNavigator,
    requestPermissions = false,
    onUpdated
  } = options;
  const devices = ref([]);
  const videoInputs = computed(() => devices.value.filter((i) => i.kind === "videoinput"));
  const audioInputs = computed(() => devices.value.filter((i) => i.kind === "audioinput"));
  const audioOutputs = computed(() => devices.value.filter((i) => i.kind === "audiooutput"));
  let isSupported = false;
  const permissionGranted = ref(false);
  async function update() {
    if (!isSupported)
      return;
    devices.value = await navigator.mediaDevices.enumerateDevices();
    onUpdated == null ? void 0 : onUpdated(devices.value);
  }
  async function ensurePermissions() {
    if (!isSupported)
      return false;
    if (permissionGranted.value)
      return true;
    const { state, query } = usePermission("camera", { controls: true });
    await query();
    if (state.value !== "granted") {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: true });
      stream.getTracks().forEach((t) => t.stop());
      update();
      permissionGranted.value = true;
    } else {
      permissionGranted.value = true;
    }
    return permissionGranted.value;
  }
  if (navigator) {
    isSupported = Boolean(navigator.mediaDevices && navigator.mediaDevices.enumerateDevices);
    if (isSupported) {
      if (requestPermissions)
        ensurePermissions();
      useEventListener(navigator.mediaDevices, "devicechange", update);
      update();
    }
  }
  return {
    devices,
    ensurePermissions,
    permissionGranted,
    videoInputs,
    audioInputs,
    audioOutputs,
    isSupported
  };
}

function useDocumentVisibility({ document = defaultDocument } = {}) {
  if (!document)
    return ref("visible");
  const visibility = ref(document.visibilityState);
  useEventListener(document, "visibilitychange", () => {
    visibility.value = document.visibilityState;
  });
  return visibility;
}

var __defProp$8 = Object.defineProperty;
var __defProps$3$1 = Object.defineProperties;
var __getOwnPropDescs$3$1 = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols$a = Object.getOwnPropertySymbols;
var __hasOwnProp$a = Object.prototype.hasOwnProperty;
var __propIsEnum$a = Object.prototype.propertyIsEnumerable;
var __defNormalProp$8 = (obj, key, value) => key in obj ? __defProp$8(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues$8 = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp$a.call(b, prop))
      __defNormalProp$8(a, prop, b[prop]);
  if (__getOwnPropSymbols$a)
    for (var prop of __getOwnPropSymbols$a(b)) {
      if (__propIsEnum$a.call(b, prop))
        __defNormalProp$8(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps$3$1 = (a, b) => __defProps$3$1(a, __getOwnPropDescs$3$1(b));
function useDraggable(target, options = {}) {
  var _a, _b;
  const draggingElement = (_a = options.draggingElement) != null ? _a : defaultWindow$1;
  const position = ref((_b = options.initialValue) != null ? _b : { x: 0, y: 0 });
  const pressedDelta = ref();
  const filterEvent = (e) => {
    if (options.pointerTypes)
      return options.pointerTypes.includes(e.pointerType);
    return true;
  };
  const preventDefault = (e) => {
    if (unref(options.preventDefault))
      e.preventDefault();
  };
  const start = (e) => {
    var _a2;
    if (!filterEvent(e))
      return;
    if (unref(options.exact) && e.target !== unref(target))
      return;
    const react = unref(target).getBoundingClientRect();
    const pos = {
      x: e.pageX - react.left,
      y: e.pageY - react.top
    };
    if (((_a2 = options.onStart) == null ? void 0 : _a2.call(options, pos, e)) === false)
      return;
    pressedDelta.value = pos;
    preventDefault(e);
  };
  const move = (e) => {
    var _a2;
    if (!filterEvent(e))
      return;
    if (!pressedDelta.value)
      return;
    position.value = {
      x: e.pageX - pressedDelta.value.x,
      y: e.pageY - pressedDelta.value.y
    };
    (_a2 = options.onMove) == null ? void 0 : _a2.call(options, position.value, e);
    preventDefault(e);
  };
  const end = (e) => {
    if (!filterEvent(e))
      return;
    pressedDelta.value = void 0;
    preventDefault(e);
  };
  if (isClient$1) {
    useEventListener(target, "pointerdown", start, true);
    useEventListener(draggingElement, "pointermove", move, true);
    useEventListener(draggingElement, "pointerup", end, true);
  }
  return __spreadProps$3$1(__spreadValues$8({}, toRefs(position)), {
    position,
    isDragging: computed(() => !!pressedDelta.value),
    style: computed(() => `left:${position.value.x}px;top:${position.value.y}px;`)
  });
}

var __getOwnPropSymbols$9 = Object.getOwnPropertySymbols;
var __hasOwnProp$9 = Object.prototype.hasOwnProperty;
var __propIsEnum$9 = Object.prototype.propertyIsEnumerable;
var __objRest$2 = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp$9.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols$9)
    for (var prop of __getOwnPropSymbols$9(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum$9.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
function useResizeObserver(target, callback, options = {}) {
  const _a = options, { window = defaultWindow$1 } = _a, observerOptions = __objRest$2(_a, ["window"]);
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

function useElementBounding(target, options = {}) {
  const height = ref(0);
  const bottom = ref(0);
  const left = ref(0);
  const right = ref(0);
  const top = ref(0);
  const width = ref(0);
  const x = ref(0);
  const y = ref(0);
  useResizeObserver(target, ([entry]) => {
    height.value = entry.contentRect.height;
    bottom.value = entry.contentRect.bottom;
    left.value = entry.contentRect.left;
    right.value = entry.contentRect.right;
    top.value = entry.contentRect.top;
    width.value = entry.contentRect.width;
    x.value = entry.contentRect.x;
    y.value = entry.contentRect.y;
  }, options);
  return {
    x,
    y,
    top,
    right,
    bottom,
    left,
    width,
    height
  };
}

function useElementSize(target, initialSize = { width: 0, height: 0 }, options = {}) {
  const width = ref(initialSize.width);
  const height = ref(initialSize.height);
  useResizeObserver(target, ([entry]) => {
    width.value = entry.contentRect.width;
    height.value = entry.contentRect.height;
  }, options);
  return {
    width,
    height
  };
}

function useElementVisibility(element, { window = defaultWindow$1, scrollTarget } = {}) {
  const elementIsVisible = ref(false);
  const testBounding = () => {
    if (!window)
      return;
    const document = window.document;
    if (!element.value) {
      elementIsVisible.value = false;
    } else {
      const rect = element.value.getBoundingClientRect();
      elementIsVisible.value = rect.top <= (window.innerHeight || document.documentElement.clientHeight) && rect.left <= (window.innerWidth || document.documentElement.clientWidth) && rect.bottom >= 0 && rect.right >= 0;
    }
  };
  tryOnMounted(testBounding);
  if (window)
    tryOnMounted(() => useEventListener((scrollTarget == null ? void 0 : scrollTarget.value) || window, "scroll", testBounding, { capture: false, passive: true }));
  return elementIsVisible;
}

function useRafFn(fn, options = {}) {
  const {
    immediate = true,
    window = defaultWindow$1
  } = options;
  const isActive = ref(false);
  function loop() {
    if (!isActive.value)
      return;
    fn();
    if (window)
      window.requestAnimationFrame(loop);
  }
  function resume() {
    if (!isActive.value) {
      isActive.value = true;
      loop();
    }
  }
  function pause() {
    isActive.value = false;
  }
  if (immediate)
    resume();
  tryOnScopeDispose(pause);
  return {
    isActive,
    pause,
    resume
  };
}

const functionsMap = [
  [
    "requestFullscreen",
    "exitFullscreen",
    "fullscreenElement",
    "fullscreenEnabled",
    "fullscreenchange",
    "fullscreenerror"
  ],
  [
    "webkitRequestFullscreen",
    "webkitExitFullscreen",
    "webkitFullscreenElement",
    "webkitFullscreenEnabled",
    "webkitfullscreenchange",
    "webkitfullscreenerror"
  ],
  [
    "webkitRequestFullScreen",
    "webkitCancelFullScreen",
    "webkitCurrentFullScreenElement",
    "webkitCancelFullScreen",
    "webkitfullscreenchange",
    "webkitfullscreenerror"
  ],
  [
    "mozRequestFullScreen",
    "mozCancelFullScreen",
    "mozFullScreenElement",
    "mozFullScreenEnabled",
    "mozfullscreenchange",
    "mozfullscreenerror"
  ],
  [
    "msRequestFullscreen",
    "msExitFullscreen",
    "msFullscreenElement",
    "msFullscreenEnabled",
    "MSFullscreenChange",
    "MSFullscreenError"
  ]
];
function useFullscreen(target, options = {}) {
  const { document = defaultDocument } = options;
  const targetRef = target || (document == null ? void 0 : document.querySelector("html"));
  const isFullscreen = ref(false);
  let isSupported = false;
  let map = functionsMap[0];
  if (!document) {
    isSupported = false;
  } else {
    for (const m of functionsMap) {
      if (m[1] in document) {
        map = m;
        isSupported = true;
        break;
      }
    }
  }
  const [REQUEST, EXIT, ELEMENT, , EVENT] = map;
  async function exit() {
    if (!isSupported)
      return;
    if (document == null ? void 0 : document[ELEMENT])
      await document[EXIT]();
    isFullscreen.value = false;
  }
  async function enter() {
    if (!isSupported)
      return;
    await exit();
    const target2 = unrefElement(targetRef);
    if (target2) {
      await target2[REQUEST]();
      isFullscreen.value = true;
    }
  }
  async function toggle() {
    if (isFullscreen.value)
      await exit();
    else
      await enter();
  }
  if (document) {
    useEventListener(document, EVENT, () => {
      isFullscreen.value = !!(document == null ? void 0 : document[ELEMENT]);
    }, false);
  }
  return {
    isSupported,
    isFullscreen,
    enter,
    exit,
    toggle
  };
}

function useGeolocation(options = {}) {
  const {
    enableHighAccuracy = true,
    maximumAge = 3e4,
    timeout = 27e3,
    navigator = defaultNavigator
  } = options;
  const isSupported = navigator && "geolocation" in navigator;
  const locatedAt = ref(null);
  const error = ref(null);
  const coords = ref({
    accuracy: 0,
    latitude: 0,
    longitude: 0,
    altitude: null,
    altitudeAccuracy: null,
    heading: null,
    speed: null
  });
  function updatePosition(position) {
    locatedAt.value = position.timestamp;
    coords.value = position.coords;
    error.value = null;
  }
  let watcher;
  if (isSupported) {
    watcher = navigator.geolocation.watchPosition(updatePosition, (err) => error.value = err, {
      enableHighAccuracy,
      maximumAge,
      timeout
    });
  }
  tryOnScopeDispose(() => {
    if (watcher && navigator)
      navigator.geolocation.clearWatch(watcher);
  });
  return {
    isSupported,
    coords,
    locatedAt,
    error
  };
}

const defaultEvents$1 = ["mousemove", "mousedown", "resize", "keydown", "touchstart", "wheel"];
const oneMinute = 6e4;
function useIdle(timeout = oneMinute, options = {}) {
  const {
    initialState = false,
    listenForVisibilityChange = true,
    events = defaultEvents$1,
    window = defaultWindow$1,
    eventFilter = throttleFilter(50)
  } = options;
  const idle = ref(initialState);
  const lastActive = ref(timestamp());
  let timer;
  const onEvent = createFilterWrapper(eventFilter, () => {
    idle.value = false;
    lastActive.value = timestamp();
    clearTimeout(timer);
    timer = setTimeout(() => idle.value = true, timeout);
  });
  if (window) {
    const document = window.document;
    for (const event of events)
      useEventListener(window, event, onEvent, { passive: true });
    if (listenForVisibilityChange) {
      useEventListener(document, "visibilitychange", () => {
        if (!document.hidden)
          onEvent();
      });
    }
  }
  timer = setTimeout(() => idle.value = true, timeout);
  return { idle, lastActive };
}

function useMouse(options = {}) {
  const {
    touch = true,
    resetOnTouchEnds = false,
    initialValue = { x: 0, y: 0 },
    window = defaultWindow$1
  } = options;
  const x = ref(initialValue.x);
  const y = ref(initialValue.y);
  const sourceType = ref(null);
  const mouseHandler = (event) => {
    x.value = event.pageX;
    y.value = event.pageY;
    sourceType.value = "mouse";
  };
  const reset = () => {
    x.value = initialValue.x;
    y.value = initialValue.y;
  };
  const touchHandler = (event) => {
    if (event.touches.length > 0) {
      x.value = event.touches[0].clientX;
      y.value = event.touches[0].clientY;
      sourceType.value = "touch";
    }
  };
  if (window) {
    useEventListener(window, "mousemove", mouseHandler, { passive: true });
    useEventListener(window, "dragover", mouseHandler, { passive: true });
    if (touch) {
      useEventListener(window, "touchstart", touchHandler, { passive: true });
      useEventListener(window, "touchmove", touchHandler, { passive: true });
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
    window = defaultWindow$1
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

function useMousePressed(options = {}) {
  const {
    touch = true,
    drag = true,
    initialValue = false,
    window = defaultWindow$1
  } = options;
  const pressed = ref(initialValue);
  const sourceType = ref(null);
  if (!window) {
    return {
      pressed,
      sourceType
    };
  }
  const onPressed = (srcType) => () => {
    pressed.value = true;
    sourceType.value = srcType;
  };
  const onReleased = () => {
    pressed.value = false;
    sourceType.value = null;
  };
  const target = computed(() => unrefElement(options.target) || window);
  useEventListener(target, "mousedown", onPressed("mouse"), { passive: true });
  useEventListener(window, "mouseleave", onReleased, { passive: true });
  useEventListener(window, "mouseup", onReleased, { passive: true });
  if (drag) {
    useEventListener(target, "dragstart", onPressed("mouse"), { passive: true });
    useEventListener(window, "drop", onReleased, { passive: true });
    useEventListener(window, "dragend", onReleased, { passive: true });
  }
  if (touch) {
    useEventListener(target, "touchstart", onPressed("touch"), { passive: true });
    useEventListener(window, "touchend", onReleased, { passive: true });
    useEventListener(window, "touchcancel", onReleased, { passive: true });
  }
  return {
    pressed,
    sourceType
  };
}

function useNetwork(options = {}) {
  const { window = defaultWindow$1 } = options;
  const navigator = window == null ? void 0 : window.navigator;
  const isSupported = Boolean(navigator && "connection" in navigator);
  const isOnline = ref(true);
  const saveData = ref(false);
  const offlineAt = ref(void 0);
  const downlink = ref(void 0);
  const downlinkMax = ref(void 0);
  const rtt = ref(void 0);
  const effectiveType = ref(void 0);
  const type = ref("unknown");
  const connection = isSupported && navigator.connection;
  function updateNetworkInformation() {
    if (!navigator)
      return;
    isOnline.value = navigator.onLine;
    offlineAt.value = isOnline.value ? void 0 : Date.now();
    if (connection) {
      downlink.value = connection.downlink;
      downlinkMax.value = connection.downlinkMax;
      effectiveType.value = connection.effectiveType;
      rtt.value = connection.rtt;
      saveData.value = connection.saveData;
      type.value = connection.type;
    }
  }
  if (window) {
    useEventListener(window, "offline", () => {
      isOnline.value = false;
      offlineAt.value = Date.now();
    });
    useEventListener(window, "online", () => {
      isOnline.value = true;
    });
  }
  if (connection)
    useEventListener(connection, "change", updateNetworkInformation, false);
  updateNetworkInformation();
  return {
    isSupported,
    isOnline,
    saveData,
    offlineAt,
    downlink,
    downlinkMax,
    effectiveType,
    rtt,
    type
  };
}

var __defProp$5$1 = Object.defineProperty;
var __getOwnPropSymbols$5$1 = Object.getOwnPropertySymbols;
var __hasOwnProp$5$1 = Object.prototype.hasOwnProperty;
var __propIsEnum$5$1 = Object.prototype.propertyIsEnumerable;
var __defNormalProp$5$1 = (obj, key, value) => key in obj ? __defProp$5$1(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues$5$1 = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp$5$1.call(b, prop))
      __defNormalProp$5$1(a, prop, b[prop]);
  if (__getOwnPropSymbols$5$1)
    for (var prop of __getOwnPropSymbols$5$1(b)) {
      if (__propIsEnum$5$1.call(b, prop))
        __defNormalProp$5$1(a, prop, b[prop]);
    }
  return a;
};
function useNow(options = {}) {
  const {
    controls: exposeControls = false,
    interval = "requestAnimationFrame"
  } = options;
  const now = ref(new Date());
  const update = () => now.value = new Date();
  const controls = interval === "requestAnimationFrame" ? useRafFn(update, { immediate: true }) : useIntervalFn(update, interval, { immediate: true });
  if (exposeControls) {
    return __spreadValues$5$1({
      now
    }, controls);
  } else {
    return now;
  }
}

function useOnline(options = {}) {
  const { isOnline } = useNetwork(options);
  return isOnline;
}

function usePageLeave(options = {}) {
  const { window = defaultWindow$1 } = options;
  const isLeft = ref(false);
  const handler = (event) => {
    if (!window)
      return;
    event = event || window.event;
    const from = event.relatedTarget || event.toElement;
    isLeft.value = !from;
  };
  if (window) {
    useEventListener(window, "mouseout", handler, { passive: true });
    useEventListener(window.document, "mouseleave", handler, { passive: true });
    useEventListener(window.document, "mouseenter", handler, { passive: true });
  }
  return isLeft;
}

var __defProp$4$1 = Object.defineProperty;
var __defProps$1$1 = Object.defineProperties;
var __getOwnPropDescs$1$1 = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols$4$1 = Object.getOwnPropertySymbols;
var __hasOwnProp$4$1 = Object.prototype.hasOwnProperty;
var __propIsEnum$4$1 = Object.prototype.propertyIsEnumerable;
var __defNormalProp$4$1 = (obj, key, value) => key in obj ? __defProp$4$1(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues$4$1 = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp$4$1.call(b, prop))
      __defNormalProp$4$1(a, prop, b[prop]);
  if (__getOwnPropSymbols$4$1)
    for (var prop of __getOwnPropSymbols$4$1(b)) {
      if (__propIsEnum$4$1.call(b, prop))
        __defNormalProp$4$1(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps$1$1 = (a, b) => __defProps$1$1(a, __getOwnPropDescs$1$1(b));
const defaultState = {
  x: 0,
  y: 0,
  pointerId: 0,
  pressure: 0,
  tiltX: 0,
  tiltY: 0,
  width: 0,
  height: 0,
  twist: 0,
  pointerType: null
};
const keys = /* @__PURE__ */ Object.keys(defaultState);
function usePointer(options = {}) {
  const {
    target = defaultWindow$1
  } = options;
  const isInside = ref(false);
  const state = ref(options.initialValue || {});
  Object.assign(state.value, defaultState, state.value);
  const handler = (event) => {
    isInside.value = true;
    if (options.pointerTypes && !options.pointerTypes.includes(event.pointerType))
      return;
    state.value = objectPick(event, keys, false);
  };
  if (target) {
    useEventListener(target, "pointerdown", handler, { passive: true });
    useEventListener(target, "pointermove", handler, { passive: true });
    useEventListener(target, "pointerleave", () => isInside.value = false, { passive: true });
  }
  return __spreadProps$1$1(__spreadValues$4$1({}, toRefs(state)), {
    isInside
  });
}

var SwipeDirection;
(function(SwipeDirection2) {
  SwipeDirection2["UP"] = "UP";
  SwipeDirection2["RIGHT"] = "RIGHT";
  SwipeDirection2["DOWN"] = "DOWN";
  SwipeDirection2["LEFT"] = "LEFT";
  SwipeDirection2["NONE"] = "NONE";
})(SwipeDirection || (SwipeDirection = {}));

function usePreferredColorScheme(options) {
  const isLight = useMediaQuery("(prefers-color-scheme: light)", options);
  const isDark = useMediaQuery("(prefers-color-scheme: dark)", options);
  return computed(() => {
    if (isDark.value)
      return "dark";
    if (isLight.value)
      return "light";
    return "no-preference";
  });
}

function usePreferredLanguages(options = {}) {
  const { window = defaultWindow$1 } = options;
  if (!window)
    return ref(["en"]);
  const navigator = window.navigator;
  const value = ref(navigator.languages);
  useEventListener(window, "languagechange", () => {
    value.value = navigator.languages;
  });
  return value;
}

var __defProp$1$1 = Object.defineProperty;
var __getOwnPropSymbols$1$1 = Object.getOwnPropertySymbols;
var __hasOwnProp$1$1 = Object.prototype.hasOwnProperty;
var __propIsEnum$1$1 = Object.prototype.propertyIsEnumerable;
var __defNormalProp$1$1 = (obj, key, value) => key in obj ? __defProp$1$1(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues$1$1 = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp$1$1.call(b, prop))
      __defNormalProp$1$1(a, prop, b[prop]);
  if (__getOwnPropSymbols$1$1)
    for (var prop of __getOwnPropSymbols$1$1(b)) {
      if (__propIsEnum$1$1.call(b, prop))
        __defNormalProp$1$1(a, prop, b[prop]);
    }
  return a;
};
var __objRest = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp$1$1.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols$1$1)
    for (var prop of __getOwnPropSymbols$1$1(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum$1$1.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
const UNITS = [
  { max: 6e4, value: 1e3, name: "second" },
  { max: 276e4, value: 6e4, name: "minute" },
  { max: 72e6, value: 36e5, name: "hour" },
  { max: 5184e5, value: 864e5, name: "day" },
  { max: 24192e5, value: 6048e5, name: "week" },
  { max: 28512e6, value: 2592e6, name: "month" },
  { max: Infinity, value: 31536e6, name: "year" }
];
const DEFAULT_MESSAGES = {
  justNow: "just now",
  past: (n) => n.match(/\d/) ? `${n} ago` : n,
  future: (n) => n.match(/\d/) ? `in ${n}` : n,
  month: (n, past) => n === 1 ? past ? "last month" : "next month" : `${n} month${n > 1 ? "s" : ""}`,
  year: (n, past) => n === 1 ? past ? "last year" : "next year" : `${n} year${n > 1 ? "s" : ""}`,
  day: (n, past) => n === 1 ? past ? "yesterday" : "tomorrow" : `${n} day${n > 1 ? "s" : ""}`,
  week: (n, past) => n === 1 ? past ? "last week" : "next week" : `${n} week${n > 1 ? "s" : ""}`,
  hour: (n) => `${n} hour${n > 1 ? "s" : ""}`,
  minute: (n) => `${n} minute${n > 1 ? "s" : ""}`,
  second: (n) => `${n} second${n > 1 ? "s" : ""}`
};
const DEFAULT_FORMATTER = (date) => date.toISOString().slice(0, 10);
function useTimeAgo(time, options = {}) {
  const {
    controls: exposeControls = false,
    max,
    updateInterval = 3e4,
    messages = DEFAULT_MESSAGES,
    fullDateFormatter = DEFAULT_FORMATTER
  } = options;
  const { abs, round } = Math;
  const _a = useNow({ interval: updateInterval, controls: true }), { now } = _a, controls = __objRest(_a, ["now"]);
  function getTimeago(from, now2) {
    var _a2;
    const diff = +now2 - +from;
    const absDiff = abs(diff);
    if (absDiff < 6e4)
      return messages.justNow;
    if (typeof max === "number" && absDiff > max)
      return fullDateFormatter(new Date(from));
    if (typeof max === "string") {
      const unitMax = (_a2 = UNITS.find((i) => i.name === max)) == null ? void 0 : _a2.max;
      if (unitMax && absDiff > unitMax)
        return fullDateFormatter(new Date(from));
    }
    for (const unit of UNITS) {
      if (absDiff < unit.max)
        return format(diff, unit);
    }
  }
  function applyFormat(name, val, isPast) {
    const formatter = messages[name];
    if (typeof formatter === "function")
      return formatter(val, isPast);
    return formatter.replace("{0}", val.toString());
  }
  function format(diff, unit) {
    const val = round(abs(diff) / unit.value);
    const past = diff > 0;
    const str = applyFormat(unit.name, val, past);
    return applyFormat(past ? "past" : "future", str, past);
  }
  const timeAgo = computed(() => getTimeago(new Date(unref(time)), unref(now.value)));
  if (exposeControls) {
    return __spreadValues$1$1({
      timeAgo
    }, controls);
  } else {
    return timeAgo;
  }
}

var __defProp$7 = Object.defineProperty;
var __getOwnPropSymbols$7 = Object.getOwnPropertySymbols;
var __hasOwnProp$7 = Object.prototype.hasOwnProperty;
var __propIsEnum$7 = Object.prototype.propertyIsEnumerable;
var __defNormalProp$7 = (obj, key, value) => key in obj ? __defProp$7(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues$7 = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp$7.call(b, prop))
      __defNormalProp$7(a, prop, b[prop]);
  if (__getOwnPropSymbols$7)
    for (var prop of __getOwnPropSymbols$7(b)) {
      if (__propIsEnum$7.call(b, prop))
        __defNormalProp$7(a, prop, b[prop]);
    }
  return a;
};
function useTimestamp(options = {}) {
  const {
    controls: exposeControls = false,
    offset = 0,
    immediate = true,
    interval = "requestAnimationFrame"
  } = options;
  const ts = ref(timestamp() + offset);
  const update = () => ts.value = timestamp() + offset;
  const controls = interval === "requestAnimationFrame" ? useRafFn(update, { immediate }) : useIntervalFn(update, interval, { immediate });
  if (exposeControls) {
    return __spreadValues$7({
      timestamp: ts
    }, controls);
  } else {
    return ts;
  }
}

function useVModel(props, key, emit, options = {}) {
  var _a;
  const {
    passive = false,
    eventName,
    deep = false
  } = options;
  const vm = getCurrentInstance();
  const _emit = emit || (vm == null ? void 0 : vm.emit) || ((_a = vm == null ? void 0 : vm.$emit) == null ? void 0 : _a.bind(vm));
  let event = eventName;
  if (!key) {
    {
      key = "modelValue";
    }
  }
  event = eventName || event || `update:${key}`;
  if (passive) {
    const proxy = ref(props[key]);
    watch(() => props[key], (v) => proxy.value = v);
    watch(proxy, (v) => {
      if (v !== props[key] || deep)
        _emit(event, v);
    }, {
      deep
    });
    return proxy;
  } else {
    return computed({
      get() {
        return props[key];
      },
      set(value) {
        _emit(event, value);
      }
    });
  }
}

function useVModels(props, emit, options = {}) {
  const ret = {};
  for (const key in props)
    ret[key] = useVModel(props, key, emit, options);
  return ret;
}

function useVirtualList(list, options) {
  const containerRef = ref();
  const size = useElementSize(containerRef);
  const currentList = ref([]);
  const state = ref({ start: 0, end: 10 });
  const { itemHeight, overscan = 5 } = options;
  if (!itemHeight)
    console.warn("please enter a valid itemHeight");
  const getViewCapacity = (containerHeight) => {
    if (typeof itemHeight === "number")
      return Math.ceil(containerHeight / itemHeight);
    const { start = 0 } = state.value;
    let sum = 0;
    let capacity = 0;
    for (let i = start; i < list.length; i++) {
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
    for (let i = 0; i < list.length; i++) {
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
        end: to > list.length ? list.length : to
      };
      currentList.value = list.slice(state.value.start, state.value.end).map((ele, index) => ({
        data: ele,
        index: index + state.value.start
      }));
    }
  };
  watch([size.width, size.height], () => {
    calculateRange();
  });
  const totalHeight = computed(() => {
    if (typeof itemHeight === "number")
      return list.length * itemHeight;
    return list.reduce((sum, _, index) => sum + itemHeight(index), 0);
  });
  const getDistanceTop = (index) => {
    if (typeof itemHeight === "number") {
      const height2 = index * itemHeight;
      return height2;
    }
    const height = list.slice(0, index).reduce((sum, _, i) => sum + itemHeight(i), 0);
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

function useWindowFocus({ window = defaultWindow$1 } = {}) {
  if (!window)
    return ref(false);
  const focused = ref(window.document.hasFocus());
  useEventListener(window, "blur", () => {
    focused.value = false;
  });
  useEventListener(window, "focus", () => {
    focused.value = true;
  });
  return focused;
}

function useWindowSize({ window = defaultWindow$1, initialWidth = Infinity, initialHeight = Infinity } = {}) {
  if (!window) {
    return {
      width: ref(initialWidth),
      height: ref(initialHeight)
    };
  }
  const width = ref(window.innerWidth);
  const height = ref(window.innerHeight);
  useEventListener("resize", () => {
    width.value = window.innerWidth;
    height.value = window.innerHeight;
  }, { passive: true });
  return { width, height };
}

const __default__$1 = {
    name: 'Popover',
    inheritAttrs: false
};
function setup$1(__props, { expose, emit }) {
    const props = __props;
    const slots = useSlots();
    const attrs = useAttrs();
    const showRef = props.trigger === 'manual' ? toRefs$1(props).show : ref(!!props.show);
    const followerRef = ref(null);
    const followX = ref(0);
    const followY = ref(0);
    const contentShowTimer = ref();
    const contentHideTimer = ref();
    // 事件回调
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
        emit('border:reached', flag, dirs);
    };
    // 显示控制
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
            callShow();
            callUpdateShow();
            props.trigger === 'click' && window.addEventListener('click', handleClickInside);
        }, props.showDelay);
    };
    const handleContentHide = () => {
        clearShowTimer();
        if (!showRef.value)
            return;
        contentHideTimer.value = window.setTimeout(() => {
            showRef.value = false;
            callHide();
            callUpdateShow();
            props.trigger === 'click' && window.removeEventListener('click', handleClickInside);
        }, props.hideDelay);
    };
    const handleClickInside = (e) => {
        const isClickContent = contentVNode.value?.el?.contains(e.target);
        const isClickTrigger = triggerVNode.value?.el?.contains(e.target);
        if (!isClickContent && !isClickTrigger) {
            handleContentHide();
        }
    };
    const syncPosition = () => {
        var _a;
        // @ts-ignore
        (_a = followerRef.value) === null || _a === void 0 ? void 0 : _a.syncPosition();
    };
    // 悬浮控制
    const contentHoverControl = computed(() => {
        if (props.trigger !== 'hover')
            return {};
        return {
            onMouseenter: handleContentShow,
            onMouseleave: handleContentHide
        };
    });
    // 事件列表
    const triggerEvent = computed(() => {
        if (props.trigger === 'hover') {
            return {
                onMouseenter: handleContentShow,
                onMouseleave: handleContentHide
            };
        }
        else if (props.trigger === 'click') {
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
        else {
            return {};
        }
    });
    // 节点
    const triggerVNode = computed(() => {
        const firstDefaultVNode = getSlotFirstVNode(slots.default);
        if (!firstDefaultVNode)
            return null;
        const tempVNode = cloneVNode(firstDefaultVNode);
        if (props.disabled)
            return tempVNode;
        // 事件绑定
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
                    handler(...args);
                }
                : handler;
        }
        return tempVNode;
    });
    const contentVNode = computed(() => {
        if (props.disabled)
            return null;
        const { top = '', right = '', bottom = '', left = '' } = props.offset;
        const mergedProps = mergeProps({
            class: ['mc-popover', { 'mc-popover--with-arrow': props.withArrow }],
            style: {
                '--popover-offset-top': top,
                '--popover-offset-right': right,
                '--popover-offset-bottom': bottom,
                '--popover-offset-left': left
            },
            ...contentHoverControl.value
        }, attrs);
        const tempVNode = createVNode('div', mergedProps, [props.title ? createVNode('div', { class: 'mc-popover__title' }, [props.title]) : null, renderSlot(slots, 'content'), props.withArrow ? createVNode('div', { class: 'mc-popover__arrow' }) : null]);
        if (props.destoryWhenHide) {
            if (!showRef.value)
                return null;
            return tempVNode;
        }
        else {
            return withDirectives(tempVNode, [[vShow, showRef.value]]);
        }
    });
    const triggerEl = computed(() => {
        return triggerVNode.value?.el || null;
    });
    const contentEl = computed(() => {
        return contentVNode.value?.el || null;
    });
    // 渲染
    const Render = () => {
        return createVNode(VBinder, null, {
            default: () => {
                return [
                    createVNode(VTarget, null, { default: () => triggerVNode.value }),
                    createVNode(VFollower, {
                        ref: followerRef,
                        x: props.trigger === 'follow' ? followX.value : undefined,
                        y: props.trigger === 'follow' ? followY.value : undefined,
                        zIndex: props.zIndex,
                        show: showRef.value,
                        enabled: showRef.value,
                        placement: props.placement,
                        width: props.matchTrigger ? 'target' : undefined
                    }, {
                        default: () => {
                            return createVNode(Transition, {
                                name: 'mc-popover-fade',
                                appear: true
                            }, {
                                default: () => contentVNode.value
                            });
                        }
                    })
                ];
            }
        });
    };
    void nextTick(() => {
        if (props.disabled || !triggerEl.value)
            return;
        // 自动同步位置
        if (props.autoSync) {
            const { top, right, bottom, left } = useElementBounding(triggerEl.value);
            watch([top, right, bottom, left], () => {
                syncPosition();
            });
        }
        // follow 控制
        if (props.trigger === 'follow') {
            const { x, y, isOutside, elementHeight, elementWidth, elementX, elementY } = useMouseInElement(triggerEl.value);
            // 首次进入不做检测
            let isFirstEnter = true;
            watch([x, y, isOutside], () => {
                showRef.value = !isOutside.value;
                callUpdateShow();
                if (showRef.value) {
                    callShow();
                    followX.value = x.value;
                    followY.value = y.value;
                    if (isFirstEnter) {
                        isFirstEnter = false;
                        return;
                    }
                    void nextTick(() => {
                        if (props.wrapBoundary) {
                            let isReachBorder = false;
                            let reachedDir = [];
                            const contentRect = contentEl.value.getBoundingClientRect();
                            const { x: contentX, y: contentY, width, height } = contentRect;
                            const cursorOffsetX = contentX - x.value;
                            const cursotOffsetY = contentY - y.value;
                            // 上边界检测
                            if (cursotOffsetY < 0 && Math.abs(cursotOffsetY) > elementY.value) {
                                followY.value += Math.abs(cursotOffsetY);
                                isReachBorder = true;
                                reachedDir.push('top');
                            }
                            // 右边界检测
                            if (elementX.value + width + cursorOffsetX >= elementWidth.value) {
                                followX.value -= width + cursorOffsetX;
                                isReachBorder = true;
                                reachedDir.push('right');
                            }
                            // 下边界检测
                            if (elementY.value + height + cursotOffsetY >= elementHeight.value) {
                                followY.value -= height + cursotOffsetY;
                                isReachBorder = true;
                                reachedDir.push('bottom');
                            }
                            // 左边界检测
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
                    callHide();
                    callBorderReached(false, []);
                }
            });
        }
    });
    expose({
        syncPosition,
        show: handleContentShow,
        hide: handleContentHide,
        el: contentEl
    });
    return (_ctx, _cache) => {
        return (openBlock(), createBlock(Render));
    };
}
var script$1 = /*#__PURE__*/ defineComponent({
    ...__default__$1,
    props: {
        trigger: { type: String, required: false, default: 'hover' },
        placement: { type: String, required: false, default: 'top' },
        destoryWhenHide: { type: Boolean, required: false, default: true },
        zIndex: { type: Number, required: false },
        show: { type: Boolean, required: false, default: false },
        disabled: { type: Boolean, required: false, default: false },
        withArrow: { type: Boolean, required: false, default: true },
        showDelay: { type: Number, required: false, default: 100 },
        hideDelay: { type: Number, required: false, default: 100 },
        offset: { type: null, required: false, default: {} },
        wrapBoundary: { type: Boolean, required: false, default: false },
        matchTrigger: { type: Boolean, required: false, default: false },
        autoSync: { type: Boolean, required: false, default: true },
        title: { type: String, required: false }
    },
    emits: ["show", "hide", "update:show", "border:reached"],
    setup: setup$1
});

script$1.__file = "src/popover/Popover.vue";

// 在组件上添加install方法，方便直接使用单个组件
script$1.install = (app) => {
    app.component('McPopover', script$1);
};

const isClient = typeof window !== "undefined";

function useToggle(initialValue = false) {
  if (isRef(initialValue)) {
    return (value) => {
      initialValue.value = typeof value === "boolean" ? value : !initialValue.value;
    };
  } else {
    const boolean = ref(initialValue);
    const toggle = (value) => {
      boolean.value = typeof value === "boolean" ? value : !boolean.value;
    };
    return [boolean, toggle];
  }
}

defineComponent({
  name: "OnClickOutside",
  props: ["as"],
  emits: ["trigger"],
  setup(props, { slots, emit }) {
    const target = ref();
    onClickOutside(target, (e) => {
      emit("trigger", e);
    });
    return () => {
      if (slots.default)
        return h(props.as || "div", { ref: target }, slots.default());
    };
  }
});

const defaultWindow = isClient ? window : void 0;

defineComponent({
  name: "UseActiveElement",
  setup(props, { slots }) {
    const data = reactive({
      element: useActiveElement()
    });
    return () => {
      if (slots.default)
        return slots.default(data);
    };
  }
});

defineComponent({
  name: "UseBattery",
  setup(props, { slots }) {
    const data = reactive(useBattery(props));
    return () => {
      if (slots.default)
        return slots.default(data);
    };
  }
});

defineComponent({
  name: "UseBrowserLocation",
  setup(props, { slots }) {
    const data = reactive(useBrowserLocation());
    return () => {
      if (slots.default)
        return slots.default(data);
    };
  }
});

defineComponent({
  name: "UseDark",
  props: ["selector", "attribute", "valueDark", "valueLight", "onChanged", "storageKey", "storage"],
  setup(props, { slots }) {
    const isDark = useDark(props);
    const data = reactive({
      isDark,
      toggleDark: useToggle(isDark)
    });
    return () => {
      if (slots.default)
        return slots.default(data);
    };
  }
});

defineComponent({
  name: "UseDeviceMotion",
  setup(props, { slots }) {
    const data = reactive(useDeviceMotion());
    return () => {
      if (slots.default)
        return slots.default(data);
    };
  }
});

defineComponent({
  name: "UseDeviceOrientation",
  setup(props, { slots }) {
    const data = reactive(useDeviceOrientation());
    return () => {
      if (slots.default)
        return slots.default(data);
    };
  }
});

defineComponent({
  name: "UseDevicePixelRatio",
  setup(props, { slots }) {
    const data = reactive({
      pixelRatio: useDevicePixelRatio()
    });
    return () => {
      if (slots.default)
        return slots.default(data);
    };
  }
});

defineComponent({
  name: "UseDevicesList",
  props: ["onUpdated", "requestPermissions"],
  setup(props, { slots }) {
    const data = reactive(useDevicesList(props));
    return () => {
      if (slots.default)
        return slots.default(data);
    };
  }
});

defineComponent({
  name: "UseDocumentVisibility",
  setup(props, { slots }) {
    const data = reactive({
      visibility: useDocumentVisibility()
    });
    return () => {
      if (slots.default)
        return slots.default(data);
    };
  }
});

var __defProp$6 = Object.defineProperty;
var __defProps$5 = Object.defineProperties;
var __getOwnPropDescs$5 = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols$6 = Object.getOwnPropertySymbols;
var __hasOwnProp$6 = Object.prototype.hasOwnProperty;
var __propIsEnum$6 = Object.prototype.propertyIsEnumerable;
var __defNormalProp$6 = (obj, key, value) => key in obj ? __defProp$6(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues$6 = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp$6.call(b, prop))
      __defNormalProp$6(a, prop, b[prop]);
  if (__getOwnPropSymbols$6)
    for (var prop of __getOwnPropSymbols$6(b)) {
      if (__propIsEnum$6.call(b, prop))
        __defNormalProp$6(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps$5 = (a, b) => __defProps$5(a, __getOwnPropDescs$5(b));
defineComponent({
  name: "UseDraggable",
  props: [
    "storageKey",
    "initialValue",
    "exact",
    "preventDefault",
    "pointerTypes",
    "as"
  ],
  setup(props, { slots }) {
    const target = ref();
    const initialValue = props.storageKey ? useStorage(props.storageKey, unref(props.initialValue) || { x: 0, y: 0 }, isClient$1 ? props.storageType === "session" ? sessionStorage : localStorage : void 0) : props.initialValue || { x: 0, y: 0 };
    const data = reactive(useDraggable(target, __spreadProps$5(__spreadValues$6({}, props), {
      initialValue
    })));
    return () => {
      if (slots.default)
        return h(props.as || "div", { ref: target, style: `touch-action:none;${data.style}` }, slots.default(data));
    };
  }
});

defineComponent({
  name: "UseElementBounding",
  props: ["box", "as"],
  setup(props, { slots }) {
    const target = ref();
    const data = reactive(useElementBounding(target, { box: props.box, window: props.window }));
    return () => {
      if (slots.default)
        return h(props.as || "div", { ref: target }, slots.default(data));
    };
  }
});

defineComponent({
  name: "UseElementSize",
  props: ["width", "height", "box"],
  setup(props, { slots }) {
    const target = ref();
    const data = reactive(useElementSize(target, { width: props.width, height: props.height }, { box: props.box }));
    return () => {
      if (slots.default)
        return h(props.as || "div", { ref: target }, slots.default(data));
    };
  }
});

defineComponent({
  name: "UseElementVisibility",
  props: ["as"],
  setup(props, { slots }) {
    const target = ref();
    const data = reactive({
      isVisible: useElementVisibility(target)
    });
    return () => {
      if (slots.default)
        return h(props.as || "div", { ref: target }, slots.default(data));
    };
  }
});

defineComponent({
  name: "UseFullscreen",
  props: ["as"],
  setup(props, { slots }) {
    const target = ref();
    const data = reactive(useFullscreen(target));
    return () => {
      if (slots.default)
        return h(props.as || "div", { ref: target }, slots.default(data));
    };
  }
});

defineComponent({
  name: "UseGeolocation",
  props: ["enableHighAccuracy", "maximumAge", "timeout", "navigator"],
  setup(props, { slots }) {
    const data = reactive(useGeolocation(props));
    return () => {
      if (slots.default)
        return slots.default(data);
    };
  }
});

defineComponent({
  name: "UseIdle",
  props: ["timeout", "events", "listenForVisibilityChange", "initialState"],
  setup(props, { slots }) {
    const data = reactive(useIdle(props.timeout, props));
    return () => {
      if (slots.default)
        return slots.default(data);
    };
  }
});

defineComponent({
  name: "UseMouse",
  props: ["touch", "resetOnTouchEnds", "initialValue"],
  setup(props, { slots }) {
    const data = reactive(useMouse(props));
    return () => {
      if (slots.default)
        return slots.default(data);
    };
  }
});

defineComponent({
  name: "UseMouseElement",
  props: ["handleOutside", "as"],
  setup(props, { slots }) {
    const target = ref();
    const data = reactive(useMouseInElement(target, props));
    return () => {
      if (slots.default)
        return h(props.as || "div", { ref: target }, slots.default(data));
    };
  }
});

var __defProp$5 = Object.defineProperty;
var __defProps$4 = Object.defineProperties;
var __getOwnPropDescs$4 = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols$5 = Object.getOwnPropertySymbols;
var __hasOwnProp$5 = Object.prototype.hasOwnProperty;
var __propIsEnum$5 = Object.prototype.propertyIsEnumerable;
var __defNormalProp$5 = (obj, key, value) => key in obj ? __defProp$5(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues$5 = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp$5.call(b, prop))
      __defNormalProp$5(a, prop, b[prop]);
  if (__getOwnPropSymbols$5)
    for (var prop of __getOwnPropSymbols$5(b)) {
      if (__propIsEnum$5.call(b, prop))
        __defNormalProp$5(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps$4 = (a, b) => __defProps$4(a, __getOwnPropDescs$4(b));
defineComponent({
  name: "UseMousePressed",
  props: ["touch", "initialValue", "as"],
  setup(props, { slots }) {
    const target = ref();
    const data = reactive(useMousePressed(__spreadProps$4(__spreadValues$5({}, props), { target })));
    return () => {
      if (slots.default)
        return h(props.as || "div", { ref: target }, slots.default(data));
    };
  }
});

defineComponent({
  name: "UseNetwork",
  setup(props, { slots }) {
    const data = reactive(useNetwork());
    return () => {
      if (slots.default)
        return slots.default(data);
    };
  }
});

var __defProp$4 = Object.defineProperty;
var __defProps$3 = Object.defineProperties;
var __getOwnPropDescs$3 = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols$4 = Object.getOwnPropertySymbols;
var __hasOwnProp$4 = Object.prototype.hasOwnProperty;
var __propIsEnum$4 = Object.prototype.propertyIsEnumerable;
var __defNormalProp$4 = (obj, key, value) => key in obj ? __defProp$4(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues$4 = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp$4.call(b, prop))
      __defNormalProp$4(a, prop, b[prop]);
  if (__getOwnPropSymbols$4)
    for (var prop of __getOwnPropSymbols$4(b)) {
      if (__propIsEnum$4.call(b, prop))
        __defNormalProp$4(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps$3 = (a, b) => __defProps$3(a, __getOwnPropDescs$3(b));
defineComponent({
  name: "UseNow",
  props: ["interval"],
  setup(props, { slots }) {
    const data = reactive(useNow(__spreadProps$3(__spreadValues$4({}, props), { controls: true })));
    return () => {
      if (slots.default)
        return slots.default(data);
    };
  }
});

defineComponent({
  name: "UseOnline",
  setup(props, { slots }) {
    const data = reactive({
      isOnline: useOnline()
    });
    return () => {
      if (slots.default)
        return slots.default(data);
    };
  }
});

defineComponent({
  name: "UsePageLeave",
  setup(props, { slots }) {
    const data = reactive({
      isLeft: usePageLeave()
    });
    return () => {
      if (slots.default)
        return slots.default(data);
    };
  }
});

var __defProp$3 = Object.defineProperty;
var __defProps$2 = Object.defineProperties;
var __getOwnPropDescs$2 = Object.getOwnPropertyDescriptors;
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
var __spreadProps$2 = (a, b) => __defProps$2(a, __getOwnPropDescs$2(b));
defineComponent({
  name: "UsePointer",
  props: [
    "pointerTypes",
    "initialValue",
    "target"
  ],
  setup(props, { slots }) {
    const el = ref(null);
    const data = reactive(usePointer(__spreadProps$2(__spreadValues$3({}, props), {
      target: props.target === "self" ? el : defaultWindow
    })));
    return () => {
      if (slots.default)
        return slots.default(data, { ref: el });
    };
  }
});

defineComponent({
  name: "UsePreferredColorScheme",
  setup(props, { slots }) {
    const data = reactive({
      colorScheme: usePreferredColorScheme()
    });
    return () => {
      if (slots.default)
        return slots.default(data);
    };
  }
});

defineComponent({
  name: "UsePreferredDark",
  setup(props, { slots }) {
    const data = reactive({
      prefersDark: usePreferredDark()
    });
    return () => {
      if (slots.default)
        return slots.default(data);
    };
  }
});

defineComponent({
  name: "UsePreferredLanguages",
  setup(props, { slots }) {
    const data = reactive({
      languages: usePreferredLanguages()
    });
    return () => {
      if (slots.default)
        return slots.default(data);
    };
  }
});

var __defProp$2 = Object.defineProperty;
var __defProps$1 = Object.defineProperties;
var __getOwnPropDescs$1 = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols$2 = Object.getOwnPropertySymbols;
var __hasOwnProp$2 = Object.prototype.hasOwnProperty;
var __propIsEnum$2 = Object.prototype.propertyIsEnumerable;
var __defNormalProp$2 = (obj, key, value) => key in obj ? __defProp$2(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues$2 = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp$2.call(b, prop))
      __defNormalProp$2(a, prop, b[prop]);
  if (__getOwnPropSymbols$2)
    for (var prop of __getOwnPropSymbols$2(b)) {
      if (__propIsEnum$2.call(b, prop))
        __defNormalProp$2(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps$1 = (a, b) => __defProps$1(a, __getOwnPropDescs$1(b));
defineComponent({
  name: "UseTimeAgo",
  props: ["time", "updateInterval", "max", "fullDateFormatter", "messages"],
  setup(props, { slots }) {
    const { time } = toRefs$1(props);
    const data = reactive(useTimeAgo(time, __spreadProps$1(__spreadValues$2({}, props), { controls: true })));
    return () => {
      if (slots.default)
        return slots.default(data);
    };
  }
});

var __defProp$1 = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols$1 = Object.getOwnPropertySymbols;
var __hasOwnProp$1 = Object.prototype.hasOwnProperty;
var __propIsEnum$1 = Object.prototype.propertyIsEnumerable;
var __defNormalProp$1 = (obj, key, value) => key in obj ? __defProp$1(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues$1 = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp$1.call(b, prop))
      __defNormalProp$1(a, prop, b[prop]);
  if (__getOwnPropSymbols$1)
    for (var prop of __getOwnPropSymbols$1(b)) {
      if (__propIsEnum$1.call(b, prop))
        __defNormalProp$1(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
defineComponent({
  name: "UseTimestamp",
  props: ["immediate", "interval", "offset"],
  setup(props, { slots }) {
    const data = reactive(useTimestamp(__spreadProps(__spreadValues$1({}, props), { controls: true })));
    return () => {
      if (slots.default)
        return slots.default(data);
    };
  }
});

var __defProp = Object.defineProperty;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
const UseVirtualList = defineComponent({
  name: "UseVirtualList",
  props: [
    "list",
    "options",
    "height"
  ],
  setup(props, { slots }) {
    const { list, containerProps, wrapperProps } = useVirtualList(props.list, props.options);
    containerProps.style.height = props.height || "300px";
    return () => h("div", __spreadValues({}, containerProps), [
      h("div", __spreadValues({}, wrapperProps.value), list.value.map((item) => h("div", { style: { overFlow: "hidden", height: item.height } }, slots.default ? slots.default(item) : "Please set content!")))
    ]);
  }
});

defineComponent({
  name: "UseWindowFocus",
  setup(props, { slots }) {
    const data = reactive({
      focused: useWindowFocus()
    });
    return () => {
      if (slots.default)
        return slots.default(data);
    };
  }
});

defineComponent({
  name: "UseWindowSize",
  props: ["initialWidth", "initialHeight"],
  setup(props, { slots }) {
    const data = reactive(useWindowSize(props));
    return () => {
      if (slots.default)
        return slots.default(data);
    };
  }
});

const __default__ = {
    name: 'Popselect'
};
function setup(__props, { emit }) {
    const props = __props;
    const slots = useSlots();
    const attrs = useAttrs();
    const { options, multiple, maxHeight } = toRefs$1(props);
    const { value: valueRef } = useVModels(props, emit);
    const popoverRef = ref();
    const virtualListRef = ref();
    const handleShow = () => {
        nextTick(() => {
            const selectedIndex = options.value.findIndex(e => e.value === (multiple.value ? valueRef.value[0] : valueRef.value));
            if (selectedIndex > -1) {
                virtualListRef.value.$el.scrollTop = selectedIndex * 42;
            }
        });
    };
    const getOptionVNode = (data) => {
        const { label, value, disabled } = data;
        const isDisabled = !!disabled;
        const isSelected = multiple.value ? valueRef.value.includes(value) : valueRef.value === value;
        const checkVNode = multiple.value && isSelected ? createVNode(NIcon, { size: 16 }, { default: () => createVNode(IconCheck) }) : null;
        const handleClick = multiple.value
            ? () => {
                const index = valueRef.value.indexOf(value);
                if (index === -1) {
                    valueRef.value.push(value);
                }
                else {
                    valueRef.value.splice(index, 1);
                }
                emit('update:value', valueRef.value, value);
            }
            : () => {
                valueRef.value = value;
                popoverRef.value.hide();
            };
        return createVNode('div', {
            class: ['mc-popselect-option', { 'mc-popselect-option--selected': isSelected, 'mc-popselect-option--disabled': isDisabled }],
            onClick: isDisabled ? null : handleClick
        }, [
            createVNode('div', {
                class: 'mc-popselect-option__inner'
            }, [createVNode('div', { class: 'mc-truncate', style: 'max-width: 200px' }, label), checkVNode])
        ]);
    };
    const Render = () => {
        const listHeigth = Math.min(options.value.length * 38 + (options.value.length - 1) * 4, maxHeight.value);
        const itemHeight = 38 + ((options.value.length - 1) / options.value.length) * 4;
        const popoverMergedProps = mergeProps({
            ref: popoverRef,
            class: 'mc-popselect',
            placement: 'bottom'
        }, attrs);
        return createVNode(script$1, {
            ...popoverMergedProps,
            onShow: (...args) => {
                handleShow();
                attrs.show && attrs.onShow(...args);
            }
        }, {
            default: () => renderSlot(slots, 'default'),
            content: () => {
                return createVNode(UseVirtualList, {
                    ref: virtualListRef,
                    class: 'mc-popselect__content mc-virtual-list',
                    list: options.value,
                    options: { itemHeight },
                    height: `${listHeigth}px`
                }, {
                    default: (item) => {
                        return getOptionVNode(item.data);
                    }
                });
            }
        });
    };
    return (_ctx, _cache) => {
        return (openBlock(), createBlock(Render));
    };
}
var script = /*#__PURE__*/ defineComponent({
    ...__default__,
    props: {
        value: { type: null, required: true },
        options: { type: Array, required: false, default: () => [] },
        multiple: { type: Boolean, required: false, default: false },
        maxHeight: { type: Number, required: false, default: 300 }
    },
    emits: ["update:value"],
    setup
});

script.__file = "src/popselect/Popselect.vue";

// 在组件上添加install方法，方便直接使用单个组件
script.install = (app) => {
    app.component('McPopselect', script);
};

// 组件列表
const components = [script$2, script$1, script];
// 使用所有组件
const McUI = (app) => {
    components.forEach(component => {
        app.component(component.name || '', component);
    });
};
var index = { McUI };

export { script$2 as McPopconfirm, script$1 as McPopover, script as McPopselect, McUI, index as default };
