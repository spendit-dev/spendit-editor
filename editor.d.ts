import { DiffModeEditorConfig, EditorConfig, EditorSizingButtonConfig, InitEditorResponse } from './editor.type.ts';

export declare const initEditor: ({ targetId, lang, initialData, placeholder, onContentChange, debounceDelay, onBlur, }: EditorConfig) => Promise<InitEditorResponse | null>;
export declare const initEditorSizingButton: ({ editor, initialHeight, minHeight, maxHeight, gapHeight, sizingButtonPosition, resizeButtonCallback }: EditorSizingButtonConfig) => void;
export declare const initDiffModeEditor: ({ targetId, lang, textPrevious, textCurrent, }: DiffModeEditorConfig) => Promise<InitEditorResponse | null>;
