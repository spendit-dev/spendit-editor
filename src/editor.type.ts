import {ClassicEditor} from "@ckeditor/ckeditor5-editor-classic";

export interface EditorConfig {
    targetId: string;
    lang?: 'ko' | 'en';
    initialData?: string;
    onContentChange?: (content: string) => void;
    onBlur?: (content: string) => void;
}

export interface EditorSizingButtonConfig {
    editor: ClassicEditor;
    minHeight?: number;
    maxHeight?: number;
    gapHeight?: number;
    sizingButtonPosition?: 'inner' | 'outer';
}

export interface InitEditorResponse {
    editor: ClassicEditor | null;
}