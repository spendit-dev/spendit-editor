import {ClassicEditor} from '@ckeditor/ckeditor5-editor-classic';
import {Essentials} from '@ckeditor/ckeditor5-essentials';
import {Paragraph} from '@ckeditor/ckeditor5-paragraph';
import {Alignment} from '@ckeditor/ckeditor5-alignment';
import {Font, FontBackgroundColor, FontFamily} from '@ckeditor/ckeditor5-font';
import {Bold, Code, Italic, Strikethrough, Subscript, Superscript, Underline} from '@ckeditor/ckeditor5-basic-styles';
import {Heading} from "@ckeditor/ckeditor5-heading";
import {List} from "@ckeditor/ckeditor5-list";
import {
    Image, ImageCaption, ImageInsert, ImageResize, ImageStyle, ImageToolbar, ImageUpload
} from '@ckeditor/ckeditor5-image';
import {LinkImage} from '@ckeditor/ckeditor5-link';
import {Indent, IndentBlock} from '@ckeditor/ckeditor5-indent';
import {HorizontalLine} from "@ckeditor/ckeditor5-horizontal-line";
import {BlockQuote} from '@ckeditor/ckeditor5-block-quote';
import {Link} from '@ckeditor/ckeditor5-link';
import {MediaEmbed} from '@ckeditor/ckeditor5-media-embed';
import {PasteFromOffice} from '@ckeditor/ckeditor5-paste-from-office';
import {
    Table,
    TableToolbar,
    TableColumnResize,
    TableCaption,
    TableCellProperties,
    TableProperties
} from '@ckeditor/ckeditor5-table';
import {TextTransformation} from '@ckeditor/ckeditor5-typing';
import {CloudServices} from '@ckeditor/ckeditor5-cloud-services';
import {Autoformat} from '@ckeditor/ckeditor5-autoformat';
import {AutoImage} from '@ckeditor/ckeditor5-image';
import {Base64UploadAdapter} from '@ckeditor/ckeditor5-upload';
import {
    SpecialCharacters,
    SpecialCharactersArrows,
    SpecialCharactersCurrency,
    SpecialCharactersEssentials,
    SpecialCharactersLatin,
    SpecialCharactersMathematical,
    SpecialCharactersText
} from '@ckeditor/ckeditor5-special-characters';
import {EditorConfig, EditorSizingButtonConfig, InitEditorResponse} from "./editor.type.ts";
import {EditorConfig as EditorConfigForCK} from 'ckeditor5/src/core.js';
import './lang/ko';
import './lang/en';

const defaultToolbarItems = [
    'undo',
    'redo',
    '|',
    'heading',
    'fontSize',
    'fontFamily',
    'bold',
    'italic',
    'underline',
    'strikethrough',
    'code',
    'fontColor',
    'fontBackgroundColor',
    'superscript',
    'subscript',
    '|',
    'alignment',
    'bulletedList',
    'numberedList',
    'outdent',
    'indent',
    '|',
    'horizontalLine',
    'blockQuote',
    'link',
    '|',
    'insertImage',
    'insertTable',
    'specialCharacters'
];

const defaultEditorOptions: EditorConfigForCK = {
    language: 'en',
    placeholder: 'Please enter content',
    fontSize: {
        options: [
            8, 9, 10, 11, 12, 14, 'default', 18, 20, 22, 24, 26, 28, 36, 48, 72
        ]
    },
    heading: {
        options: [
            {model: 'paragraph', title: 'Paragraph', class: 'ck-heading_paragraph'},
            {model: 'heading1', view: 'h1', title: 'Heading 1', class: 'ck-heading_heading1'},
            {model: 'heading2', view: 'h2', title: 'Heading 2', class: 'ck-heading_heading2'},
            {model: 'heading3', view: 'h3', title: 'Heading 3', class: 'ck-heading_heading3'},
        ]
    },
    toolbar: {
        items: defaultToolbarItems,
        shouldNotGroupWhenFull: false
    },
    image: {
        toolbar: [
            'imageStyle:inline', 'imageStyle:wrapText', 'imageStyle:breakText', '|',
            'toggleImageCaption', 'imageTextAlternative'
        ],
    },
    table: {
        contentToolbar: [ 'tableRow', 'tableColumn', 'mergeTableCells' ]
    },
    plugins: [
        Essentials,
        Paragraph,
        Alignment,
        Font,
        Bold,
        Code,
        Italic,
        Strikethrough,
        Subscript,
        Superscript,
        Underline,
        Heading,
        FontBackgroundColor,
        FontFamily,
        SpecialCharacters,
        SpecialCharactersArrows,
        SpecialCharactersCurrency,
        SpecialCharactersEssentials,
        SpecialCharactersLatin,
        SpecialCharactersMathematical,
        SpecialCharactersText,
        List,
        IndentBlock,
        Indent,
        HorizontalLine,
        BlockQuote,
        Link,
        MediaEmbed,
        PasteFromOffice,
        Table,
        TableToolbar,
        TableColumnResize,
        TableCaption,
        TableCellProperties,
        TableProperties,
        TextTransformation,
        CloudServices,
        Autoformat,
        AutoImage,
        ImageInsert,
        Image,
        ImageCaption,
        ImageResize,
        ImageStyle,
        ImageToolbar,
        LinkImage,
        ImageUpload,
        Base64UploadAdapter
    ],
}

export const initEditor = async ({
                                     targetId,
                                     lang = 'en',
                                     initialData = '',
                                     onContentChange,
                                     onBlur
                                 }: EditorConfig): Promise<InitEditorResponse | null> => {
    const element = document.getElementById(targetId);

    if (!element) {
        console.error('[CKEditor 경고] targetId에 해당하는 요소가 없습니다. targetId를 확인해주세요.');
        return null;
    }

    const editorOptions: EditorConfigForCK = {
        ...defaultEditorOptions,
        initialData,
        language: lang === 'ko' ? 'ko' : 'en',
        placeholder: lang === 'ko' ? '내용을 입력해주세요' : 'Please enter content',
    };

    const editor = await ClassicEditor
        .create(element, editorOptions)
        .then(editor => {
            if (onContentChange) {
                editor.model.document.on('change:data', () => {
                    onContentChange(editor.getData());
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
                                           minHeight = 200,
                                           maxHeight = 700,
                                           gapHeight = 100,
                                           sizingButtonPosition = 'outer',
    scrollElement = window
                                       }: EditorSizingButtonConfig) => {
    const borderHeight = 2; // editor의 border 두께(px)
    const gapScrollHeight = 30; // editor의 높이 조절 시 스크롤 이동 높이 마이너스 간격(px)

    // sizing button을 추가할 컨테이너
    const ckEditor = document.querySelector('.ck-editor') as HTMLElement;
    // editor의 내용을 담고 있는 컨테이너
    const ckContent = document.querySelector('.ck-content') as HTMLElement;

    // 화살표를 담고 있는 버튼 두 개 만들기
    const sizingButton = createSizingButton(sizingButtonPosition);
    const arrowTopButton = sizingButton.querySelector('.Spendit-Sizing-Top') as HTMLButtonElement;
    const arrowBottomButton = sizingButton.querySelector('.Spendit-Sizing-Bottom') as HTMLButtonElement;

    editor.editing.view.change(writer => {
        writer.setStyle('height', `${minHeight}px`, editor.editing.view.document.getRoot()!);
        writer.setStyle('min-height', `${minHeight}px`, editor.editing.view.document.getRoot()!);
        writer.setStyle('max-height', `${maxHeight}px`, editor.editing.view.document.getRoot()!);
    });

    arrowTopButton.onclick = () => resizeEditor(-gapHeight, gapScrollHeight);
    arrowBottomButton.onclick = () => resizeEditor(gapHeight, -gapScrollHeight);

    function createSizingButton(position: string) {
        const sizingButton = document.createElement('div');
        sizingButton.classList.add('Spendit-Editor-Sizing-Buttons');
        sizingButton.classList.add(position === 'inner' ? 'Spendit-Editor-Sizing-Buttons-Inner' : 'Spendit-Editor-Sizing-Buttons-Outer');

        const arrowTopButton = createButton(['Spendit-Sizing-Top', 'Spendit-Sizing-Top-Disabled']);
        const arrowBottomButton = createButton(['Spendit-Sizing-Bottom']);

        sizingButton.appendChild(arrowTopButton);
        sizingButton.appendChild(arrowBottomButton);
        ckEditor.appendChild(sizingButton);

        return sizingButton;
    }

    function createButton(className: string[]) {
        const button = document.createElement('button');
        button.classList.add('Spendit-Editor-Sizing-Button');
        className.forEach(name => button.classList.add(name));
        return button;
    }

    function resizeEditor(change: number, gapScrollHeight: number) {
        const newHeight = (ckContent.offsetHeight - borderHeight) + change;
        editor.editing.view.change(writer => {
            const isMaxHeight = newHeight >= maxHeight;
            const isMinHeight = newHeight <= minHeight;
            const height = isMaxHeight ? maxHeight : isMinHeight ? minHeight : newHeight;
            writer.setStyle('height', `${height}px`, editor.editing.view.document.getRoot()!);

            if (isMinHeight) {
                arrowTopButton.classList.add('Spendit-Sizing-Top-Disabled');
                arrowBottomButton.classList.remove('Spendit-Sizing-Bottom-Disabled');
            } else if (isMaxHeight) {
                arrowTopButton.classList.remove('Spendit-Sizing-Top-Disabled');
                arrowBottomButton.classList.add('Spendit-Sizing-Bottom-Disabled');
            } else {
                arrowTopButton.classList.remove('Spendit-Sizing-Top-Disabled');
                arrowBottomButton.classList.remove('Spendit-Sizing-Bottom-Disabled');
                scroll(change + gapScrollHeight);
            }
        });
    }

    function scroll(scrollHeight: number) {
        if (scrollElement instanceof HTMLElement) {
            scrollElement.scroll(0, scrollElement.scrollTop + (scrollHeight));
        } else {
            window.scroll(0, window.scrollY + (scrollHeight));
        }
    }
}