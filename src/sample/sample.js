import { initEditor, initEditorSizingButton } from '../index.js';
const initialize= async () => {
    const {editor} = await initEditor({
        targetId: 'sample-editor',
        lang: 'en',
        initialData: '<p>test</p>',
        onContentChange: (content) => {
            console.log('change', content);
        },
        onBlur: (content) => {
            console.log('blur', content);
        }
    });

    initEditorSizingButton({
        editor,
        sizingButtonPosition: 'inner',
    });

    return {
        editor
    }
}

(async () => {
    const {editor} = await initialize();
    const readonlyButton = document.getElementById('readonly-button');
    const editButton = document.getElementById('edit-button');
    readonlyButton.addEventListener('click', () => {
        editor.enableReadOnlyMode('test');
        editor.ui.view.toolbar.element.style.display = 'none';
    });
    editButton.addEventListener('click', () => {
        editor.disableReadOnlyMode('test');
        editor.ui.view.toolbar.element.style.display = 'block';
    });
})();

