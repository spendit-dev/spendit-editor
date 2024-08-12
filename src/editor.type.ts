import {ClassicEditor} from "@ckeditor/ckeditor5-editor-classic";

export interface EditorConfig {
    targetId: string;
    lang?: 'ko' | 'en';
    initialData?: string;
    placeholder?: string;
    onContentChange?: (content: string) => void;
    debounceDelay?: number;
    onBlur?: (content: string) => void;
    onFocus?: (bool: boolean) => void;
}

export interface DiffModeEditorConfig {
    targetId: string;
    lang?: 'ko' | 'en';
    // diff 를 비교할 두 개의 텍스트
    textPrevious?: string;
    textCurrent?: string;
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