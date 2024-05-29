import { EditorConfig, EditorSizingButtonConfig, InitEditorResponse } from './editor.type.ts';

export declare const initEditor: ({ targetId, lang, initialData, onContentChange, onBlur }: EditorConfig) => Promise<InitEditorResponse | null>;
export declare const initEditorSizingButton: ({ editor, initialHeight, minHeight, maxHeight, gapHeight, sizingButtonPosition, scrollElement, resizeButtonCallback }: EditorSizingButtonConfig) => void;
