# Editor
A simple rich text editor using CKEditor.   



## Demo
[Demo](https://spendit-dev.github.io/spendit-editor/)

## Specification Summary

#### - Toolbar Custom: [X]  
#### - Responsive Toolbar: [O]
#### - Changing ReadOnly or Edit Mode:[O]
#### - Language: 'ko' | 'en'
#### - Editor Auto Height: [X]
#### - Editor Manual Height: [O]



## How to use

### 1. Install
```bash
npm install @spendit-dev/editor or
yarn add @spendit-dev/editor
```

### 2. Import
```javascript
import '@spendit-dev/editor/dist/default.css';
import '@spendit-dev/editor/dist/editor.css';
import { initEditor, initEditorSizingButton } from '@spendit-dev/editor';
```

### 3. Initialize
```javascript
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

// if you want to use manual editor heignt sizing button
initEditorSizingButton({
    editor,
    sizingButtonPosition: 'inner',
});
```

### 4. Set Read Only Mode
you can make the editor read-only mode by using the following code.
```javascript
  const handleReadonlyEvent = (readonly: boolean) => {
    if (readonly) {
        editor.enableReadOnlyMode('targetId');
        editor.ui.view.toolbar.element!.style.display = 'none';
    } else {
        editor.disableReadOnlyMode('targetId');
        editor.ui.view.toolbar.element!.style.display = 'block';
    }
};
```

### 5. Destroy Editor
```javascript
editor.destroy();
```

### 6. Get Content From Editor
```javascript
const content = editor.getData();
```

### 7. Set Content To Editor
```javascript

editor.setData('<p>test</p>');
```

### 8. Else
editor instance is CKEditor instance.
you can find more API in the [CKEditor documentation](https://ckeditor.com/docs/).

---



## API for spendit-editor

### Func: initEditor()
| Property Name | Description                                  | Type   | Required |
|---------------|----------------------------------------------|--------|----------|
| targetId | HTML element id to attaching editor instance | string | true     |
| lang | Language of the editor | 'ko' \| 'en' | false |
| initialData | Initial data of the editor | string | false |
| onContentChange | Callback function when content is changed | (content: string) => void | false |
| onBlur | Callback function when editor is blurred | (content: string) => void | false |


### Returns of initEditor()
| Property Name | Description | Type | Required |
|---------------|-------------|------|----------|
| editor | CKEditor instance | CKEditor | true |
| setReadonly | Function to set read only mode | (readonly: boolean) => void | true |



### Func: initEditorSizingButton()
| Property Name | Description                   | Type   | Required |
|---------------|-------------------------------|--------|----------|
| editor | CKEditor instance             | CKEditor | true |
| minHeight| Minimum height of the editor  | number | false |
| maxHeight| Maximum height of the editor  | number | false |
| gapHeight| Height to adjust at once      | number | false |
| sizingButtonPosition | Position of the sizing button | 'inner' \| 'outer' | false |




### Typescript Error
If you get a typescript error, you can add the following code to your type.d.ts file.
```javascript
declare module '@spendit-dev/editor';
```
and you also need to add the following code to your tsconfig.json file.
```json
{
    "compilerOptions": {
        "typeRoots": ["your type.d.ts path"],
        "types": ["@spendit-dev/editor"]
    }
}
```

---
This Editor isn't very open to customization. If you want to customize it, I'd recommend forking the code and modifying it.