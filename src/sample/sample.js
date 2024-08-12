import {initDiffModeEditor, initEditor, initEditorSizingButton} from '../index.js';
import diff from '../module/diffHTML';
const initialize= async () => {
    const {editor} = await initEditor({
        targetId: 'sample-editor',
        lang: 'en',
        initialData: '<p>Initial content</p>',
        maxContentSize: 10,
        placeholder: 'Please enter content',
        onContentChange: (content) => {
            console.log('change', content);
        },
        debounceDelay: 2000,
        onBlur: (content) => {
            console.log('blur', content);
        }
    });

    initEditorSizingButton({
        editor,
        sizingButtonPosition: 'inner',
    });


    const {editor:diffEditor} = await initDiffModeEditor({
        targetId: 'sample-diff-editor',
        lang: 'en',
        textPrevious: 'Same content, removed this!!',
        textCurrent: 'Same content, added this!!'
    });

    const {editor: previousEditor} = await initEditor({
        targetId: 'sample-diff-editor-previous',
        lang: 'en',
        maxContentSize: 10,
        placeholder: 'Please enter content',
        initialData: 'Same content, removed this!!'
    });

    const {editor: currentEditor} = await initEditor({
        targetId: 'sample-diff-editor-current',
        lang: 'en',
        placeholder: 'Please enter content',
        initialData: 'Same content, added this!!'
    });

    return {
        editor, diffEditor, previousEditor, currentEditor
    }
}

(async () => {
    const {editor, currentEditor, diffEditor, previousEditor} = await initialize();
    const readonlyButton = document.getElementById('readonly-button');
    const editButton = document.getElementById('edit-button');
    const diffButton = document.getElementById('diff-button');
    readonlyButton.addEventListener('click', () => {
        editor.enableReadOnlyMode('test');
        editor.ui.view.toolbar.element.style.display = 'none';
    });
    editButton.addEventListener('click', () => {
        editor.disableReadOnlyMode('test');
        editor.ui.view.toolbar.element.style.display = 'block';
    });
    diffButton.addEventListener('click', async () => {
        const previousContent = previousEditor.getData();
        const currentContent = currentEditor.getData();
        const diffContent = diff(previousContent, currentContent);
        diffEditor.setData(diffContent);
    });
})();

