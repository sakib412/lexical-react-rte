<h1 align="center">Lexical React RTE</h1>

<p align="center">
  A customizable rich text editor for React, built on <a href="https://lexical.dev">Lexical</a> v0.41.0.
</p>

<p align="center">
  <img alt="npm type definitions" src="https://img.shields.io/npm/types/lexical-react-rte?label=%20&logo=typescript&logoColor=white&style=flat-square">
  <img alt="Downloads total" src="https://img.shields.io/npm/dt/lexical-react-rte?label=Downloads&logo=deezer&logoColor=white&style=flat-square" />
  <a href="https://www.npmjs.com/package/lexical-react-rte">
    <img alt="Visit the NPM page" src="https://img.shields.io/npm/v/lexical-react-rte?color=orange&logo=npm&logoColor=white&style=flat-square"/>
  </a>
</p>

---

## Features

- Two editor variants: **RichTextEditor** (static toolbar) and **InlineEditor** (floating toolbar on selection)
- Compound component toolbar — use the default or compose your own with `<Toolbar.Bold />`, `<Toolbar.Italic />`, etc.
- Imperative ref API — `getHTML()`, `getJSON()`, `getMarkdown()`, `setHTML()`, `focus()`, `clear()`
- CSS custom properties theming — no Tailwind required
- Built-in: headings, lists, checklists, quotes, code blocks, links, text/background color, font family/size, alignment, horizontal rules, markdown shortcuts, code syntax highlighting, auto-linking
- Works with React 18 and React 19

## Installation

```bash
pnpm add lexical-react-rte
```

```bash
npm install lexical-react-rte
```

```bash
yarn add lexical-react-rte
```

## Quick Start

### Zero-config editor with full toolbar

```tsx
import { RichTextEditor } from "lexical-react-rte";
import "lexical-react-rte/dist/index.css";

function App() {
  return <RichTextEditor placeholder="Start writing..." />;
}
```

### Inline editor (floating toolbar on text selection)

```tsx
import { InlineEditor } from "lexical-react-rte";
import "lexical-react-rte/dist/index.css";

function App() {
  return <InlineEditor placeholder="Select text to format..." />;
}
```

## Custom Toolbar

Use compound components to build exactly the toolbar you want:

```tsx
import { RichTextEditor, Toolbar } from "lexical-react-rte";
import "lexical-react-rte/dist/index.css";

function App() {
  return (
    <RichTextEditor placeholder="Write something...">
      <Toolbar>
        <Toolbar.Undo />
        <Toolbar.Redo />
        <Toolbar.Separator />
        <Toolbar.Bold />
        <Toolbar.Italic />
        <Toolbar.Underline />
        <Toolbar.Separator />
        <Toolbar.BlockType />
        <Toolbar.Separator />
        <Toolbar.Link />
      </Toolbar>
    </RichTextEditor>
  );
}
```

### Available Toolbar Items

| Item | Description |
|------|-------------|
| `Toolbar.Undo` | Undo last action |
| `Toolbar.Redo` | Redo last action |
| `Toolbar.Bold` | Toggle bold |
| `Toolbar.Italic` | Toggle italic |
| `Toolbar.Underline` | Toggle underline |
| `Toolbar.Strikethrough` | Toggle strikethrough |
| `Toolbar.Code` | Toggle inline code |
| `Toolbar.Highlight` | Toggle highlight |
| `Toolbar.Subscript` | Toggle subscript |
| `Toolbar.Superscript` | Toggle superscript |
| `Toolbar.Link` | Insert/remove link |
| `Toolbar.BlockType` | Block type dropdown (paragraph, headings, lists, quote, code block) |
| `Toolbar.FontFamily` | Font family dropdown |
| `Toolbar.FontSize` | Font size controls |
| `Toolbar.TextColor` | Text color picker |
| `Toolbar.BackgroundColor` | Background color picker |
| `Toolbar.Alignment` | Text alignment dropdown |
| `Toolbar.InsertHorizontalRule` | Insert horizontal rule |
| `Toolbar.ClearFormatting` | Clear all formatting |
| `Toolbar.Separator` | Visual separator between groups |
| `Toolbar.Button` | Custom button — accepts `onClick`, `icon`, `children` |
| `Toolbar.Toggle` | Custom toggle button — accepts `active`, `onClick`, `icon` |

### Preset Groups

For convenience, items are also available as preset groups:

```tsx
<Toolbar>
  <Toolbar.History />       {/* Undo + Redo */}
  <Toolbar.Separator />
  <Toolbar.BlockFormat />    {/* Block type dropdown */}
  <Toolbar.Separator />
  <Toolbar.FontFormat />     {/* Font family + Font size */}
  <Toolbar.Separator />
  <Toolbar.TextFormat />     {/* Bold, Italic, Underline, Strikethrough, Code, etc. */}
  <Toolbar.Separator />
  <Toolbar.ColorFormat />    {/* Text color + Background color */}
  <Toolbar.Separator />
  <Toolbar.InsertGroup />    {/* Link, Horizontal rule */}
  <Toolbar.Separator />
  <Toolbar.AlignFormat />    {/* Alignment dropdown */}
</Toolbar>
```

## Imperative Ref API

Access the editor programmatically:

```tsx
import { useRef } from "react";
import { RichTextEditor } from "lexical-react-rte";
import type { EditorRef } from "lexical-react-rte";
import "lexical-react-rte/dist/index.css";

function App() {
  const ref = useRef<EditorRef>(null);

  return (
    <>
      <RichTextEditor ref={ref} placeholder="Write here..." />

      <button onClick={() => console.log(ref.current?.getHTML())}>
        Get HTML
      </button>
      <button onClick={() => console.log(ref.current?.getJSON())}>
        Get JSON
      </button>
      <button onClick={() => console.log(ref.current?.getMarkdown())}>
        Get Markdown
      </button>
      <button onClick={() => ref.current?.focus()}>Focus</button>
      <button onClick={() => ref.current?.clear()}>Clear</button>
    </>
  );
}
```

### Ref Methods

| Method | Return Type | Description |
|--------|-------------|-------------|
| `getHTML()` | `string` | Get editor content as HTML |
| `getJSON()` | `SerializedEditorState` | Get editor content as Lexical JSON |
| `getMarkdown()` | `string` | Get editor content as Markdown |
| `setHTML(html)` | `void` | Set editor content from HTML string |
| `setJSON(json)` | `void` | Set editor content from Lexical JSON |
| `focus()` | `void` | Focus the editor |
| `blur()` | `void` | Blur the editor |
| `clear()` | `void` | Clear all editor content |
| `getEditor()` | `LexicalEditor` | Access the underlying Lexical editor instance |

## Props

Both `RichTextEditor` and `InlineEditor` accept these props:

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `placeholder` | `string \| ReactNode` | `"Enter some text..."` | Placeholder text |
| `initialValue` | `SerializedEditorState \| string` | — | Initial content (Lexical JSON or HTML string) |
| `editable` | `boolean` | `true` | Whether the editor is editable |
| `onChange` | `(editorState, editor, tags) => void` | — | Called on every editor state change |
| `ref` | `Ref<EditorRef>` | — | Imperative ref for programmatic access |
| `className` | `string` | — | CSS class for the root element |
| `classNames` | `EditorClassNames` | — | CSS class overrides for inner elements |
| `theme` | `EditorThemeClasses` | — | Lexical theme class overrides |
| `namespace` | `string` | — | LexicalComposer namespace |
| `autoFocus` | `boolean` | `false` | Auto-focus on mount |
| `onError` | `(error: Error) => void` | — | Error handler |

`RichTextEditor` also accepts `children` to provide a custom `<Toolbar>`.

## Theming

All styles use CSS custom properties with the `--rte-` prefix. Override them to match your design:

```css
.my-editor {
  --rte-bg: #1e1e1e;
  --rte-text-color: #e0e0e0;
  --rte-border-color: #333;
  --rte-toolbar-bg: #252525;
  --rte-toolbar-btn-color: #ccc;
  --rte-toolbar-btn-hover-bg: #333;
  --rte-toolbar-btn-active-bg: #1a3a5c;
  --rte-toolbar-btn-active-color: #5b9cf6;
}
```

```tsx
<RichTextEditor className="my-editor" />
```

### Available CSS Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `--rte-font-family` | System font stack | Editor font family |
| `--rte-font-size` | `15px` | Base font size |
| `--rte-text-color` | `#1a1a1a` | Text color |
| `--rte-bg` | `#ffffff` | Editor background |
| `--rte-border-color` | `#e0e0e0` | Editor border color |
| `--rte-border-radius` | `8px` | Editor border radius |
| `--rte-min-height` | `150px` | Minimum editor height |
| `--rte-padding` | `16px` | Content area padding |
| `--rte-toolbar-bg` | `#ffffff` | Toolbar background |
| `--rte-toolbar-btn-size` | `32px` | Toolbar button size |
| `--rte-toolbar-btn-color` | `#555555` | Toolbar button color |
| `--rte-toolbar-btn-hover-bg` | `#f0f0f0` | Button hover background |
| `--rte-toolbar-btn-active-bg` | `#e3e8f4` | Active button background |
| `--rte-toolbar-btn-active-color` | `#1a56db` | Active button color |
| `--rte-placeholder-color` | `#999999` | Placeholder text color |
| `--rte-link-color` | `#1a56db` | Link color in content |
| `--rte-code-bg` | `#f5f5f5` | Code block background |
| `--rte-dropdown-bg` | `#ffffff` | Dropdown menu background |
| `--rte-dropdown-shadow` | `0 4px 12px ...` | Dropdown shadow |

See [src/themes/variables.css](src/themes/variables.css) for the full list.

## onChange

```tsx
<RichTextEditor
  onChange={(editorState, editor, tags) => {
    // Save to your backend
    const json = editorState.toJSON();
    save(json);
  }}
/>
```

## Initial Content

Load saved content on mount:

```tsx
// From Lexical JSON (recommended)
<RichTextEditor initialValue={savedJSON} />

// From HTML string
<RichTextEditor initialValue="<p>Hello <b>world</b></p>" />
```

## TypeScript

All types are exported:

```tsx
import type {
  EditorRef,
  RichTextEditorProps,
  InlineEditorProps,
  BaseEditorProps,
  EditorClassNames,
  BlockType,
  ToolbarButtonProps,
  ToolbarToggleProps,
} from "lexical-react-rte";

// Lexical types re-exported for convenience
import type {
  EditorState,
  LexicalEditor,
  SerializedEditorState,
} from "lexical-react-rte";
```

## Built-in Plugins

These are included automatically — no configuration needed:

- **HistoryPlugin** — Undo/redo
- **ListPlugin** + **CheckListPlugin** — Bullet, numbered, and check lists
- **LinkPlugin** — Link nodes
- **AutoLinkPlugin** — Auto-detect URLs and emails
- **TabIndentationPlugin** — Tab key indentation
- **CodeHighlightPlugin** — Syntax highlighting in code blocks
- **MarkdownShortcutPlugin** — Type `#` for headings, `*` for lists, `>` for quotes, etc.
- **HorizontalRulePlugin** — Horizontal rule nodes
- **FloatingLinkEditorPlugin** — Edit/remove links with a floating popover

## Browser Support

Supports all modern browsers (Chrome, Firefox, Safari, Edge).

## License

MIT
