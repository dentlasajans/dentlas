import { useRef } from 'react';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const modules = {
  toolbar: [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ['bold', 'italic', 'underline', 'strike'],
    [{ align: [] }],
    [{ list: 'ordered' }, { list: 'bullet' }],
    [{ color: [] }, { background: [] }],
    ['link', 'image', 'video', 'blockquote', 'code-block'],
    ['clean'],
  ],
};

const formats = [
  'header',
  'bold',
  'italic',
  'underline',
  'strike',
  'align',
  'list',
  'color',
  'background',
  'link',
  'image',
  'video',
  'blockquote',
  'code-block'
];

const COMMON_SYMBOLS = ["✓", "✖", "★", "✦", "➔", "⇨", "❖", "✨", "💡", "📌", "🎯", "🚀", "©", "®", "™", "½", "¼"];

export const RichTextEditor = ({ value, onChange, placeholder }: RichTextEditorProps) => {
  const quillRef = useRef<ReactQuill>(null);

  const insertSymbol = (symbol: string) => {
    const editor = quillRef.current?.getEditor();
    if (editor) {
      const cursorPosition = editor.getSelection()?.index || 0;
      editor.insertText(cursorPosition, symbol);
      editor.setSelection(cursorPosition + symbol.length, 0);
    }
  };

  return (
    <div className="rich-text-editor-wrapper bg-white/5 border border-white/10 rounded-lg overflow-hidden flex flex-col">
      <div className="bg-white/5 px-3 py-2 border-b border-white/10 flex flex-wrap gap-1 items-center">
        <span className="text-white/50 text-xs font-medium mr-2">Simgeler:</span>
        {COMMON_SYMBOLS.map(sym => (
          <button 
            key={sym} 
            type="button"
            onClick={(e) => {
              e.preventDefault();
              insertSymbol(sym);
            }}
            className="w-7 h-7 flex items-center justify-center text-white/80 hover:text-white hover:bg-white/10 rounded transition-colors text-sm"
            title="Simge Ekle"
          >
            {sym}
          </button>
        ))}
      </div>
      <ReactQuill
        ref={quillRef}
        theme="snow"
        value={value}
        onChange={onChange}
        modules={modules}
        formats={formats}
        placeholder={placeholder}
        className="text-white"
      />
    </div>
  );
};
