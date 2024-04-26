import { initEditor, initEditorSizingButton } from '../index.js';
const initialize= async () => {
    const {editor, setReadonly} = await initEditor({
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
        setReadonly
    }
}

(async () => {
    const {setReadonly} = await initialize();
    const readonlyButton = document.getElementById('readonly-button');
    const editButton = document.getElementById('edit-button');
    readonlyButton.addEventListener('click', () => {
        setReadonly(true);
    });
    editButton.addEventListener('click', () => {
        setReadonly(false);
    });
})();

