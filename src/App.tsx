import {useRef, useState} from 'react';

import type {EditorRef} from './types';
import {InlineEditor, RichTextEditor, Toolbar} from '.';

function App() {
  const editorRef = useRef<EditorRef>(null);
  const [activeTab, setActiveTab] = useState<'rich' | 'inline' | 'custom'>(
    'rich'
  );

  const handleGetHTML = () => {
    if (editorRef.current) {
      const html = editorRef.current.getHTML();
      console.log('HTML output:', html);
      alert(html);
    }
  };

  const handleGetJSON = () => {
    if (editorRef.current) {
      const json = editorRef.current.getJSON();
      console.log('JSON output:', json);
      alert(JSON.stringify(json, null, 2));
    }
  };

  const handleGetMarkdown = () => {
    if (editorRef.current) {
      const md = editorRef.current.getMarkdown();
      console.log('Markdown output:', md);
      alert(md);
    }
  };

  return (
    <div style={{maxWidth: 860, margin: '40px auto', padding: '0 20px'}}>
      <h1 style={{fontSize: 24, marginBottom: 8}}>lexical-react-rte Demo</h1>
      <p style={{color: '#666', marginBottom: 24}}>
        A rich text editor library built on Lexical v0.41.0
      </p>

      {/* Tab navigation */}
      <div style={{display: 'flex', gap: 8, marginBottom: 16}}>
        {(['rich', 'inline', 'custom'] as const).map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setActiveTab(tab)}
            style={{
              padding: '8px 16px',
              border: '1px solid #ddd',
              borderRadius: 6,
              background: activeTab === tab ? '#4a90e2' : '#fff',
              color: activeTab === tab ? '#fff' : '#333',
              cursor: 'pointer',
              fontWeight: activeTab === tab ? 600 : 400,
            }}>
            {tab === 'rich' && 'RichTextEditor'}
            {tab === 'inline' && 'InlineEditor'}
            {tab === 'custom' && 'Custom Toolbar'}
          </button>
        ))}
      </div>

      {/* Rich Text Editor — default toolbar */}
      {activeTab === 'rich' && (
        <div>
          <h2 style={{fontSize: 18, marginBottom: 12}}>Default Toolbar</h2>
          <RichTextEditor
            ref={editorRef}
            placeholder="Start writing with the full toolbar..."
            onChange={(editorState) => {
              console.log('Editor state changed', editorState.toJSON());
            }}
          />
        </div>
      )}

      {/* Inline Editor — floating toolbar on selection */}
      {activeTab === 'inline' && (
        <div>
          <h2 style={{fontSize: 18, marginBottom: 12}}>
            Floating Toolbar on Selection
          </h2>
          <p style={{color: '#888', fontSize: 13, marginBottom: 8}}>
            Select text to see the floating toolbar appear.
          </p>
          <InlineEditor
            ref={editorRef}
            placeholder="Select text to format it..."
          />
        </div>
      )}

      {/* Custom Toolbar — compound components */}
      {activeTab === 'custom' && (
        <div>
          <h2 style={{fontSize: 18, marginBottom: 12}}>
            Custom Toolbar Layout
          </h2>
          <RichTextEditor
            ref={editorRef}
            placeholder="Minimal toolbar example...">
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
        </div>
      )}

      {/* Ref API controls */}
      <div style={{marginTop: 16, display: 'flex', gap: 8, flexWrap: 'wrap'}}>
        <button type="button" onClick={handleGetHTML} style={btnStyle}>
          Get HTML
        </button>
        <button type="button" onClick={handleGetJSON} style={btnStyle}>
          Get JSON
        </button>
        <button type="button" onClick={handleGetMarkdown} style={btnStyle}>
          Get Markdown
        </button>
        <button
          type="button"
          onClick={() => editorRef.current?.focus()}
          style={btnStyle}>
          Focus
        </button>
        <button
          type="button"
          onClick={() => editorRef.current?.clear()}
          style={btnStyle}>
          Clear
        </button>
      </div>
    </div>
  );
}

const btnStyle: React.CSSProperties = {
  padding: '6px 14px',
  border: '1px solid #ddd',
  borderRadius: 6,
  background: '#fff',
  cursor: 'pointer',
  fontSize: 13,
};

export default App;
