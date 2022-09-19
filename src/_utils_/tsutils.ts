import type {
    VNode,
    RendererNode,
    RendererElement,
    CSSProperties,
    AnchorHTMLAttributes,
    AreaHTMLAttributes,
    AudioHTMLAttributes,
    BaseHTMLAttributes,
    BlockquoteHTMLAttributes,
    ButtonHTMLAttributes,
    CanvasHTMLAttributes,
    ColgroupHTMLAttributes,
    ColHTMLAttributes,
    DataHTMLAttributes,
    DelHTMLAttributes,
    DetailsHTMLAttributes,
    DialogHTMLAttributes,
    EmbedHTMLAttributes,
    FieldsetHTMLAttributes,
    FormHTMLAttributes,
    HTMLAttributes,
    HtmlHTMLAttributes,
    IframeHTMLAttributes,
    ImgHTMLAttributes,
    InputHTMLAttributes,
    InsHTMLAttributes,
    KeygenHTMLAttributes,
    LabelHTMLAttributes,
    LiHTMLAttributes,
    LinkHTMLAttributes,
    MapHTMLAttributes,
    MenuHTMLAttributes,
    MetaHTMLAttributes,
    MeterHTMLAttributes,
    ObjectHTMLAttributes,
    OlHTMLAttributes,
    OptgroupHTMLAttributes,
    OptionHTMLAttributes,
    OutputHTMLAttributes,
    ParamHTMLAttributes,
    ProgressHTMLAttributes,
    QuoteHTMLAttributes,
    ScriptHTMLAttributes,
    SelectHTMLAttributes,
    SourceHTMLAttributes,
    StyleHTMLAttributes,
    SVGAttributes,
    TableHTMLAttributes,
    TdHTMLAttributes,
    TextareaHTMLAttributes,
    ThHTMLAttributes,
    TimeHTMLAttributes,
    TrackHTMLAttributes,
    VideoHTMLAttributes,
    WebViewHTMLAttributes
} from 'vue';

/**
 * Ts Utils
 */
export type UnionPick<T extends string | number | symbol, K extends T> = keyof Pick<Record<T, unknown>, K>;

export type UnionOmit<T extends string | number | symbol, K extends T> = keyof Omit<Record<T, unknown>, K>;

export type Key = string | number | symbol;

export type TypeOf<T, U> = T extends U ? true : false;

export type IsNumber<T> = TypeOf<T, number>;

export type IsString<T> = TypeOf<T, string>;

export type IsBoolean<T> = TypeOf<T, boolean>;

export type IsArray<T> = TypeOf<T, Array<unknown>>;

export type IsSymbol<T> = TypeOf<T, Symbol>;

export type IsNull<T> = TypeOf<T, null>;

export type IsUndefined<T> = TypeOf<T, undefined>;

export type IsObject<T> = TypeOf<T, object>;

export type CreateArray<L, E, A extends E[] = []> = A['length'] extends L ? A : CreateArray<L, E, [...A, E]>;

export type Add<X extends number, Y extends number> = [...CreateArray<X, 1>, ...CreateArray<Y, 1>]['length'];

export type Merge<F, S> = { [P in keyof F | keyof S]: P extends keyof S ? S[P] : P extends keyof F ? F[P] : never };

/**
 * VNode Utils
 */
export type SpecificVNode<T> = VNode<RendererNode, RendererElement, T>;

export const enum PatchFlags {
    /**
     * Indicates an element with dynamic textContent (children fast path)
     */
    TEXT = 1,
    /**
     * Indicates an element with dynamic class binding.
     */
    CLASS = 2,
    /**
     * Indicates an element with dynamic style
     * The compiler pre-compiles static string styles into static objects
     * + detects and hoists inline static objects
     * e.g. `style="color: red"` and `:style="{ color: 'red' }"` both get hoisted
     * as:
     * ```js
     * const style = { color: 'red' }
     * render() { return e('div', { style }) }
     * ```
     */
    STYLE = 4,
    /**
     * Indicates an element that has non-class/style dynamic props.
     * Can also be on a component that has any dynamic props (includes
     * class/style). when this flag is present, the vnode also has a dynamicProps
     * array that contains the keys of the props that may change so the runtime
     * can diff them faster (without having to worry about removed props)
     */
    PROPS = 8,
    /**
     * Indicates an element with props with dynamic keys. When keys change, a full
     * diff is always needed to remove the old key. This flag is mutually
     * exclusive with CLASS, STYLE and PROPS.
     */
    FULL_PROPS = 16,
    /**
     * Indicates an element with event listeners (which need to be attached
     * during hydration)
     */
    HYDRATE_EVENTS = 32,
    /**
     * Indicates a fragment whose children order doesn't change.
     */
    STABLE_FRAGMENT = 64,
    /**
     * Indicates a fragment with keyed or partially keyed children
     */
    KEYED_FRAGMENT = 128,
    /**
     * Indicates a fragment with unkeyed children.
     */
    UNKEYED_FRAGMENT = 256,
    /**
     * Indicates an element that only needs non-props patching, e.g. ref or
     * directives (onVnodeXXX hooks). since every patched vnode checks for refs
     * and onVnodeXXX hooks, it simply marks the vnode so that a parent block
     * will track it.
     */
    NEED_PATCH = 512,
    /**
     * Indicates a component with dynamic slots (e.g. slot that references a v-for
     * iterated value, or dynamic slot names).
     * Components with this flag are always force updated.
     */
    DYNAMIC_SLOTS = 1024,
    /**
     * Indicates a fragment that was created only because the user has placed
     * comments at the root level of a template. This is a dev-only flag since
     * comments are stripped in production.
     */
    DEV_ROOT_FRAGMENT = 2048,
    /**
     * SPECIAL FLAGS -------------------------------------------------------------
     * Special flags are negative integers. They are never matched against using
     * bitwise operators (bitwise matching should only happen in branches where
     * patchFlag > 0), and are mutually exclusive. When checking for a special
     * flag, simply check patchFlag === FLAG.
     */
    /**
     * Indicates a hoisted static vnode. This is a hint for hydration to skip
     * the entire sub tree since static content never needs to be updated.
     */
    HOISTED = -1,
    /**
     * A special flag that indicates that the diffing algorithm should bail out
     * of optimized mode. For example, on block fragments created by renderSlot()
     * when encountering non-compiler generated slots (i.e. manually written
     * render functions, which should always be fully diffed)
     * OR manually cloneVNodes
     */
    BAIL = -2
}

export const enum SlotFlags {
    /**
     * Stable slots that only reference slot props or context state. The slot
     * can fully capture its own dependencies so when passed down the parent won't
     * need to force the child to update.
     */
    STABLE = 1,
    /**
     * Slots that reference scope variables (v-for or an outer slot prop), or
     * has conditional structure (v-if, v-for). The parent will need to force
     * the child to update because the slot does not fully capture its dependencies.
     */
    DYNAMIC = 2,
    /**
     * `<slot/>` being forwarded into a child component. Whether the parent needs
     * to update the child is dependent on what kind of slots the parent itself
     * received. This has to be refined at runtime, when the child's vnode
     * is being created (in `normalizeChildren`)
     */
    FORWARDED = 3
}

/**
 * UI Utils
 */
export type UIStatus = 'default' | 'hover' | 'active' | 'disabled';

export type UISize = 'mini' | 'small' | 'medium' | 'large';

export interface UIColorAttrs extends Record<string, string> {
    color: string;
    borderColor: string;
    backgroundColor: string;
}

export type ElementClassSet = string | undefined | Record<string, boolean> | ElementClassSet[];
export type ElementStyleSet = CSSProperties | string | ElementStyleSet[];

/**
 * Jest Utils
 */
export type JestComputedStyle = CSSStyleDeclaration & Array<keyof (CSSStyleDeclaration & CSSProperties)> & { _values: CSSProperties; _importants: CSSProperties };

/**
 * Native HTML Element Attributes
 */
export interface IntrinsicElementAttributes {
    a: AnchorHTMLAttributes;
    abbr: HTMLAttributes;
    address: HTMLAttributes;
    area: AreaHTMLAttributes;
    article: HTMLAttributes;
    aside: HTMLAttributes;
    audio: AudioHTMLAttributes;
    b: HTMLAttributes;
    base: BaseHTMLAttributes;
    bdi: HTMLAttributes;
    bdo: HTMLAttributes;
    blockquote: BlockquoteHTMLAttributes;
    body: HTMLAttributes;
    br: HTMLAttributes;
    button: ButtonHTMLAttributes;
    canvas: CanvasHTMLAttributes;
    caption: HTMLAttributes;
    cite: HTMLAttributes;
    code: HTMLAttributes;
    col: ColHTMLAttributes;
    colgroup: ColgroupHTMLAttributes;
    data: DataHTMLAttributes;
    datalist: HTMLAttributes;
    dd: HTMLAttributes;
    del: DelHTMLAttributes;
    details: DetailsHTMLAttributes;
    dfn: HTMLAttributes;
    dialog: DialogHTMLAttributes;
    div: HTMLAttributes;
    dl: HTMLAttributes;
    dt: HTMLAttributes;
    em: HTMLAttributes;
    embed: EmbedHTMLAttributes;
    fieldset: FieldsetHTMLAttributes;
    figcaption: HTMLAttributes;
    figure: HTMLAttributes;
    footer: HTMLAttributes;
    form: FormHTMLAttributes;
    h1: HTMLAttributes;
    h2: HTMLAttributes;
    h3: HTMLAttributes;
    h4: HTMLAttributes;
    h5: HTMLAttributes;
    h6: HTMLAttributes;
    head: HTMLAttributes;
    header: HTMLAttributes;
    hgroup: HTMLAttributes;
    hr: HTMLAttributes;
    html: HtmlHTMLAttributes;
    i: HTMLAttributes;
    iframe: IframeHTMLAttributes;
    img: ImgHTMLAttributes;
    input: InputHTMLAttributes;
    ins: InsHTMLAttributes;
    kbd: HTMLAttributes;
    keygen: KeygenHTMLAttributes;
    label: LabelHTMLAttributes;
    legend: HTMLAttributes;
    li: LiHTMLAttributes;
    link: LinkHTMLAttributes;
    main: HTMLAttributes;
    map: MapHTMLAttributes;
    mark: HTMLAttributes;
    menu: MenuHTMLAttributes;
    meta: MetaHTMLAttributes;
    meter: MeterHTMLAttributes;
    nav: HTMLAttributes;
    noindex: HTMLAttributes;
    noscript: HTMLAttributes;
    object: ObjectHTMLAttributes;
    ol: OlHTMLAttributes;
    optgroup: OptgroupHTMLAttributes;
    option: OptionHTMLAttributes;
    output: OutputHTMLAttributes;
    p: HTMLAttributes;
    param: ParamHTMLAttributes;
    picture: HTMLAttributes;
    pre: HTMLAttributes;
    progress: ProgressHTMLAttributes;
    q: QuoteHTMLAttributes;
    rp: HTMLAttributes;
    rt: HTMLAttributes;
    ruby: HTMLAttributes;
    s: HTMLAttributes;
    samp: HTMLAttributes;
    script: ScriptHTMLAttributes;
    section: HTMLAttributes;
    select: SelectHTMLAttributes;
    small: HTMLAttributes;
    source: SourceHTMLAttributes;
    span: HTMLAttributes;
    strong: HTMLAttributes;
    style: StyleHTMLAttributes;
    sub: HTMLAttributes;
    summary: HTMLAttributes;
    sup: HTMLAttributes;
    table: TableHTMLAttributes;
    template: HTMLAttributes;
    tbody: HTMLAttributes;
    td: TdHTMLAttributes;
    textarea: TextareaHTMLAttributes;
    tfoot: HTMLAttributes;
    th: ThHTMLAttributes;
    thead: HTMLAttributes;
    time: TimeHTMLAttributes;
    title: HTMLAttributes;
    tr: HTMLAttributes;
    track: TrackHTMLAttributes;
    u: HTMLAttributes;
    ul: HTMLAttributes;
    var: HTMLAttributes;
    video: VideoHTMLAttributes;
    wbr: HTMLAttributes;
    webview: WebViewHTMLAttributes;

    // SVG
    svg: SVGAttributes;

    animate: SVGAttributes;
    animateMotion: SVGAttributes;
    animateTransform: SVGAttributes;
    circle: SVGAttributes;
    clipPath: SVGAttributes;
    defs: SVGAttributes;
    desc: SVGAttributes;
    ellipse: SVGAttributes;
    feBlend: SVGAttributes;
    feColorMatrix: SVGAttributes;
    feComponentTransfer: SVGAttributes;
    feComposite: SVGAttributes;
    feConvolveMatrix: SVGAttributes;
    feDiffuseLighting: SVGAttributes;
    feDisplacementMap: SVGAttributes;
    feDistantLight: SVGAttributes;
    feDropShadow: SVGAttributes;
    feFlood: SVGAttributes;
    feFuncA: SVGAttributes;
    feFuncB: SVGAttributes;
    feFuncG: SVGAttributes;
    feFuncR: SVGAttributes;
    feGaussianBlur: SVGAttributes;
    feImage: SVGAttributes;
    feMerge: SVGAttributes;
    feMergeNode: SVGAttributes;
    feMorphology: SVGAttributes;
    feOffset: SVGAttributes;
    fePointLight: SVGAttributes;
    feSpecularLighting: SVGAttributes;
    feSpotLight: SVGAttributes;
    feTile: SVGAttributes;
    feTurbulence: SVGAttributes;
    filter: SVGAttributes;
    foreignObject: SVGAttributes;
    g: SVGAttributes;
    image: SVGAttributes;
    line: SVGAttributes;
    linearGradient: SVGAttributes;
    marker: SVGAttributes;
    mask: SVGAttributes;
    metadata: SVGAttributes;
    mpath: SVGAttributes;
    path: SVGAttributes;
    pattern: SVGAttributes;
    polygon: SVGAttributes;
    polyline: SVGAttributes;
    radialGradient: SVGAttributes;
    rect: SVGAttributes;
    stop: SVGAttributes;
    switch: SVGAttributes;
    symbol: SVGAttributes;
    text: SVGAttributes;
    textPath: SVGAttributes;
    tspan: SVGAttributes;
    use: SVGAttributes;
    view: SVGAttributes;
}
