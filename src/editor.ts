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
import './lang/ko';
import './lang/en';
import {EditorConfig, EditorSizingButtonConfig, InitEditorResponse} from "./editor.type.ts";


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

    const editor = await ClassicEditor.create(element, {
        initialData,
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
        toolbar: {
            items: [
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
            ],
            shouldNotGroupWhenFull: false
        },
        language: lang === 'ko' ? 'ko' : 'en',
        placeholder: lang === 'ko' ? '내용을 입력해주세요' : 'Please enter content',
        image: {
            toolbar: [
                'imageStyle:inline',
                'imageStyle:block',
                'imageStyle:side',
                '|',
                'toggleImageCaption',
                'imageTextAlternative',
                '|',
                'linkImage'
            ],
            insert: {
                type: 'auto'
            }
        },
        table: {
            contentToolbar: [
                'tableColumn',
                'tableRow',
                'mergeTableCells',
                'tableProperties',
                'tableCellProperties',
                'toggleTableCaption',
            ]
        },
        fontSize: {
            options: [
                9,
                11,
                13,
                15,
                17,
                19,
                21
            ]
        }
    });

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

    return {editor}
}

export const initEditorSizingButton = ({
                                           editor,
                                           minHeight = 200,
                                           maxHeight = 700,
                                           gapHeight = 100,
                                           sizingButtonPosition = 'outer'
                                       }: EditorSizingButtonConfig) => {
    const borderHeight = 2; // editor의 border 두께(px)

    // sizing button을 추가할 컨테이너
    const ckEditor = document.querySelector('.ck-editor') as HTMLElement;
    // editor의 내용을 담고 있는 컨테이너
    const ckContent = document.querySelector('.ck-content') as HTMLElement;

    // 화살표를 담고 있는 버튼 두 개 만들기
    const sizingButton = document.createElement('div');
    const arrowTopButton = document.createElement('button');
    const arrowBottomButton = document.createElement('button');
    sizingButton.classList.add('Spendit-Editor-Sizing-Buttons');
    arrowTopButton.classList.add('Spendit-Editor-Sizing-Button');
    arrowTopButton.classList.add('Spendit-Sizing-Top');
    arrowTopButton.classList.add('Spendit-Sizing-Top-Disabled');
    arrowBottomButton.classList.add('Spendit-Editor-Sizing-Button');
    arrowBottomButton.classList.add('Spendit-Sizing-Bottom');
    if (sizingButtonPosition === 'inner') {
        sizingButton.classList.add('Spendit-Editor-Sizing-Buttons-Inner');
    }

    editor.editing.view.change(writer => {
        writer.setStyle('height', `${minHeight}px`, editor.editing.view.document.getRoot()!);
        writer.setStyle('min-height', `${minHeight}px`, editor.editing.view.document.getRoot()!);
        writer.setStyle('max-height', `${maxHeight}px`, editor.editing.view.document.getRoot()!);
    });

    arrowTopButton.onclick = () => {
        const newHeight = (ckContent.offsetHeight - borderHeight) - gapHeight;
        editor.editing.view.change(writer => {
            const isMinHeight = newHeight <= minHeight;
            writer.setStyle('height', isMinHeight ? `${minHeight}px` : `${newHeight}px`, editor.editing.view.document.getRoot()!);

            if (isMinHeight) {
                arrowTopButton.classList.add('Spendit-Sizing-Top-Disabled');
                arrowBottomButton.classList.remove('Spendit-Sizing-Top-Disabled');
            } else {
                arrowTopButton.classList.remove('Spendit-Sizing-Top-Disabled');
                arrowBottomButton.classList.remove('Spendit-Sizing-Bottom-Disabled');
            }
        });
    }
    arrowBottomButton.onclick = () => {
        const newHeight = (ckContent.offsetHeight - borderHeight) + gapHeight;
        editor.editing.view.change(writer => {
            const isMaxHeight = newHeight >= maxHeight;
            writer.setStyle('height', isMaxHeight ? `${maxHeight}px` : `${newHeight}px`, editor.editing.view.document.getRoot()!);

            if (isMaxHeight) {
                arrowTopButton.classList.remove('Spendit-Sizing-Top-Disabled');
                arrowBottomButton.classList.add('Spendit-Sizing-Bottom-Disabled');
            } else {
                arrowTopButton.classList.remove('Spendit-Sizing-Top-Disabled');
                arrowBottomButton.classList.remove('Spendit-Sizing-Bottom-Disabled');
            }
        });
    }

    sizingButton.appendChild(arrowTopButton);
    sizingButton.appendChild(arrowBottomButton);
    ckEditor.appendChild(sizingButton);
}