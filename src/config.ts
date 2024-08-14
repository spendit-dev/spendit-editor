import {EditorConfig as EditorConfigForCK} from "ckeditor5/src/core";
import {Essentials} from "@ckeditor/ckeditor5-essentials";
import {Paragraph} from "@ckeditor/ckeditor5-paragraph";
import {Alignment} from "@ckeditor/ckeditor5-alignment";
import {Font, FontBackgroundColor, FontFamily} from "@ckeditor/ckeditor5-font";
import {Bold, Code, Italic, Strikethrough, Subscript, Superscript, Underline} from "@ckeditor/ckeditor5-basic-styles";
import {Heading} from "@ckeditor/ckeditor5-heading";
import {
    SpecialCharacters,
    SpecialCharactersArrows,
    SpecialCharactersCurrency,
    SpecialCharactersEssentials,
    SpecialCharactersLatin,
    SpecialCharactersMathematical,
    SpecialCharactersText
} from "@ckeditor/ckeditor5-special-characters";
import {List} from "@ckeditor/ckeditor5-list";
import {Indent, IndentBlock} from "@ckeditor/ckeditor5-indent";
import {HorizontalLine} from "@ckeditor/ckeditor5-horizontal-line";
import {BlockQuote} from "@ckeditor/ckeditor5-block-quote";
import {Link, LinkImage} from "@ckeditor/ckeditor5-link";
import {MediaEmbed} from "@ckeditor/ckeditor5-media-embed";
import {PasteFromOffice} from "@ckeditor/ckeditor5-paste-from-office";
import {
    Table,
    TableCaption,
    TableCellProperties,
    TableColumnResize,
    TableProperties,
    TableToolbar
} from "@ckeditor/ckeditor5-table";
import {TextTransformation} from "@ckeditor/ckeditor5-typing";
import {CloudServices} from "@ckeditor/ckeditor5-cloud-services";
import {Autoformat} from "@ckeditor/ckeditor5-autoformat";
import {
    AutoImage,
    Image,
    ImageCaption,
    ImageInsert,
    ImageResize,
    ImageStyle,
    ImageToolbar, ImageUpload
} from "@ckeditor/ckeditor5-image";
import {Base64UploadAdapter} from "@ckeditor/ckeditor5-upload";
import CustomFigureAttributes from "./module/CustomFigureAttributes";

export const defaultToolbarItems = [
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
    'numberedList',
    'bulletedList',
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

export const defaultEditorOptions: EditorConfigForCK = {
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
        contentToolbar: [ 'tableRow', 'tableColumn', 'tableProperties', 'tableCellProperties', 'mergeTableCells',  ],
    },
    alignment: {
        options: ['left', 'center', 'right', 'justify']
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
    extraPlugins: [CustomFigureAttributes]
}