export const SplitIKey = Symbol('Split');
export const SplitPaneIKey = Symbol('SplitPane');

export interface SplitProps {}
export interface SplitPaneProps {}
export interface SplitterProps {}
export type SplitElement = SplitProps | SplitPaneProps;
