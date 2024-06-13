import {ClassicEditor} from "@ckeditor/ckeditor5-editor-classic";

export interface EditorConfig {
    targetId: string;
    lang?: 'ko' | 'en';
    initialData?: string;
    placeholder?: string;
    onContentChange?: (content: string) => void;
    onBlur?: (content: string) => void;
}

export interface EditorSizingButtonConfig {
    editor: ClassicEditor;
    initialHeight?: number;
    minHeight?: number;
    maxHeight?: number;
    gapHeight?: number;
    sizingButtonPosition?: 'inner' | 'outer';
    scrollElement?: HTMLElement | Window;
    resizeButtonCallback?: (currentHeight: number) => void;
}

export interface InitEditorResponse {
    editor: ClassicEditor | null;
}