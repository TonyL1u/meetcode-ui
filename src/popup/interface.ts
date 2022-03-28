export interface PopupExposeInstance {
    close: () => void;
    el: HTMLElement;
}

export type PopupInstance = PopupExposeInstance & {};

export interface PopupApi {
    show: () => void;
}
