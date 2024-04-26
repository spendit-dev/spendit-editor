import { EditorConfig, EditorSizingButtonConfig, InitEditorResponse } from './editor.type.ts';

export declare const initEditor: ({ targetId, lang, initialData, onContentChange, onBlur }: EditorConfig) => Promise<InitEditorResponse | null>;
export declare const initEditorSizingButton: ({ editor, minHeight, maxHeight, gapHeight, sizingButtonPosition }: EditorSizingButtonConfig) => void;
