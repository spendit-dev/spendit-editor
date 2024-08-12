import {ClassicEditor} from '@ckeditor/ckeditor5-editor-classic';
import {DiffModeEditorConfig, EditorConfig, EditorSizingButtonConfig, InitEditorResponse} from "./editor.type.ts";
import {EditorConfig as EditorConfigForCK} from 'ckeditor5/src/core.js';
import './lang/ko';
import './lang/en';
import {debounce} from "./module/debounde.ts";
import {defaultEditorOptions} from "./config.ts";
import diff from "./module/diffHTML.ts";



export const initEditor = async ({
                                     targetId,
                                     lang = 'en',
                                     initialData = '',
                                     placeholder = '',
                                     onContentChange,
                                     debounceDelay = 3000,
                                     onBlur,
                                 }: EditorConfig): Promise<InitEditorResponse | null> => {
    const element = document.getElementById(targetId);

    if (!element) {
        console.error('[CKEditor 경고] targetId에 해당하는 요소가 없습니다. targetId를 확인해주세요.');
        return null;
    }

    const editorOptions: EditorConfigForCK = {
        ...defaultEditorOptions,
        initialData,
        language: lang,
        placeholder,
    };
    const debounceUpdateEditorContent = debounce(() => onContentChange(editor.getData()), debounceDelay);

    const editor = await ClassicEditor
        .create(element, editorOptions)
        .then(editor => {
            if (onContentChange) {
                editor.model.document.on('change:data', () => {
                    debounceUpdateEditorContent();
                });
            }
            if (onBlur) {
                editor.ui.focusTracker.on('change:isFocused', (_event, _name, isFocused) => {
                    if (!isFocused) {
                        onBlur(editor.getData());
                    }
                });
            }
            return editor;
        })
        .catch(error => {
            console.error('[CKEditor 에러] 에디터를 초기화하는 중 오류가 발생했습니다.', error);
            return null;
        });

    return {editor};
}

export const initEditorSizingButton = ({
                                           editor,
                                           initialHeight = 200,
                                           minHeight = 200,
                                           maxHeight = 700,
                                           gapHeight = 100,
                                           sizingButtonPosition = 'outer',
                                           resizeButtonCallback = () => {}
                                       }: EditorSizingButtonConfig) => {
    // sizing button을 추가할 컨테이너
    const ckEditor = document.querySelector('.ck-editor') as HTMLElement;
    // editor의 내용을 담고 있는 컨테이너
    const ckContent = document.querySelector('.ck-content') as HTMLElement;

    // 화살표를 담고 있는 버튼 두 개 만들기
    const sizingButton = createSizingButton(sizingButtonPosition);
    const arrowTopButton = sizingButton.querySelector('.Spendit-Sizing-Top') as HTMLButtonElement;
    const arrowBottomButton = sizingButton.querySelector('.Spendit-Sizing-Bottom') as HTMLButtonElement;
    const arrowUpButton = sizingButton.querySelector('.Spendit-Sizing-Up') as HTMLButtonElement;
    const arrowDownButton = sizingButton.querySelector('.Spendit-Sizing-Down') as HTMLButtonElement;

    editor.editing.view.change(writer => {
        writer.setStyle('height', `${initialHeight}px`, editor.editing.view.document.getRoot()!);
        writer.setStyle('min-height', `${minHeight}px`, editor.editing.view.document.getRoot()!);
        writer.setStyle('max-height', `${maxHeight}px`, editor.editing.view.document.getRoot()!);
    });

    arrowTopButton.onclick = () => resizeEditor( 'top');
    arrowUpButton.onclick = () => resizeEditor( 'up');
    arrowDownButton.onclick = () => resizeEditor('down');
    arrowBottomButton.onclick = () => resizeEditor('bottom');

    function createSizingButton(position: string) {
        const sizingButton = document.createElement('div');
        sizingButton.classList.add('Spendit-Editor-Sizing-Buttons');
        sizingButton.classList.add(position === 'inner' ? 'Spendit-Editor-Sizing-Buttons-Inner' : 'Spendit-Editor-Sizing-Buttons-Outer');

        const arrowTopButton = createButton(['Spendit-Sizing-Top', ...(minHeight === initialHeight ? ['Spendit-Sizing-Top-Disabled'] : [])]);
        const arrowUpButton = createButton(['Spendit-Sizing-Up', ...(minHeight === initialHeight ? ['Spendit-Sizing-Up-Disabled'] : [])]);
        const arrowDownButton = createButton(['Spendit-Sizing-Down', ...(maxHeight === initialHeight ? ['Spendit-Sizing-Down-Disabled'] : [])]);
        const arrowBottomButton = createButton(['Spendit-Sizing-Bottom', ...(maxHeight === initialHeight ? ['Spendit-Sizing-Bottom-Disabled'] : [])]);

        sizingButton?.appendChild(arrowTopButton);
        sizingButton?.appendChild(arrowUpButton);
        sizingButton?.appendChild(arrowDownButton);
        sizingButton?.appendChild(arrowBottomButton);
        ckEditor?.appendChild(sizingButton);

        return sizingButton;
    }

    function createButton(className: string[]) {
        const button = document.createElement('button');
        button.classList.add('Spendit-Editor-Sizing-Button');
        className.forEach(name => button.classList.add(name));
        return button;
    }

    function resizeEditor(buttonType: 'top' | 'bottom' | 'up' | 'down') {
        let newHeight = 0;
        if (buttonType === 'top') {
            newHeight = minHeight;
        } else if (buttonType === 'bottom') {
            newHeight = maxHeight;
        } else if (buttonType === 'up') {
            newHeight = ckContent.offsetHeight - gapHeight;
        } else if (buttonType === 'down'){
            newHeight = ckContent.offsetHeight + gapHeight;
        }

        editor.editing.view.change(writer => {
            const isMaxHeight = newHeight >= maxHeight;
            const isMinHeight = newHeight <= minHeight;
            const height = isMaxHeight ? maxHeight : isMinHeight ? minHeight : newHeight;
            writer.setStyle('height', `${height}px`, editor.editing.view.document.getRoot()!);

            // 이미 최소크기이거나, 이미 최대크기라면 return
            const hasTopDisabled = arrowTopButton.classList.contains('Spendit-Sizing-Top-Disabled');
            const hasBottomDisabled = arrowBottomButton.classList.contains('Spendit-Sizing-Bottom-Disabled');
            if ((isMinHeight && hasTopDisabled) || (isMaxHeight && hasBottomDisabled)) {
                return;
            }

            if (isMinHeight) {
                arrowTopButton.classList.add('Spendit-Sizing-Top-Disabled');
                arrowUpButton.classList.add('Spendit-Sizing-Up-Disabled');
                arrowBottomButton.classList.remove('Spendit-Sizing-Bottom-Disabled');
                arrowDownButton.classList.remove('Spendit-Sizing-Down-Disabled');
            } else if (isMaxHeight) {
                arrowTopButton.classList.remove('Spendit-Sizing-Top-Disabled');
                arrowUpButton.classList.remove('Spendit-Sizing-Up-Disabled');
                arrowBottomButton.classList.add('Spendit-Sizing-Bottom-Disabled');
                arrowDownButton.classList.add('Spendit-Sizing-Down-Disabled');
            } else {
                arrowTopButton.classList.remove('Spendit-Sizing-Top-Disabled');
                arrowUpButton.classList.remove('Spendit-Sizing-Up-Disabled');
                arrowBottomButton.classList.remove('Spendit-Sizing-Bottom-Disabled');
                arrowDownButton.classList.remove('Spendit-Sizing-Down-Disabled');
            }
        });
        resizeButtonCallback(newHeight);
    }
}

export const initDiffModeEditor = async ({
                                        targetId,
                                        lang = 'en',
                                        textPrevious = '',
                                        textCurrent = '',
}: DiffModeEditorConfig): Promise<InitEditorResponse | null> => {
    const element = document.getElementById(targetId);

    if (!element) {
        console.error('[CKEditor 경고] targetId에 해당하는 요소가 없습니다. targetId를 확인해주세요.');
        return null;
    }
    const result = diff(textPrevious, textCurrent);

    const editorOptions: EditorConfigForCK = {
        ...defaultEditorOptions,
        initialData: result,
        language: lang,
    };

    const editor = await ClassicEditor
        .create(element, editorOptions)
        .then(editor => {
            editor.enableReadOnlyMode('');
            editor.ui.view.toolbar.element!.style.display = 'none';
            return editor;
        })
        .catch(error => {
            console.error('[CKEditor 에러] 에디터를 초기화하는 중 오류가 발생했습니다.', error);
            return null;
        });

    return {editor};
}