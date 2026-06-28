import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useEffect } from "react";
import {
  FaBold,
  FaItalic,
  FaHeading,
  FaListUl,
  FaListOl,
  FaQuoteLeft,
  FaUndo,
  FaRedo,
  FaCode,
  FaLink,
  FaStrikethrough,
} from "react-icons/fa";

function TextEditor({
  value,
  onChange
}) {
  const editor = useEditor({
    extensions: [StarterKit],
    content: value,
    onUpdate({editor}){
      onChange(editor.getHTML());
    }
  });
  useEffect(()=>{
    if (!editor) return;

    if (value !== editor.getHTML()) {
      editor.commands.setContent(value || '');
    }
  },[value,editor])

  if (!editor) {
    return null;
  }

  return (
    <div className="border border-zinc-800 bg-black/40">

     <div className="flex flex-wrap gap-2 border-b border-zinc-800 p-3">

  <button
    type="button"
    onClick={() => editor.chain().focus().toggleBold().run()}
    className={`px-3 py-2 transition ${
      editor.isActive("bold")
        ? "bg-violet-600 text-white"
        : "bg-zinc-800 hover:bg-zinc-700"
    }`}
  >
    <strong>B</strong>
  </button>

  <button
    type="button"
    onClick={() => editor.chain().focus().toggleItalic().run()}
    className={`px-3 py-2 transition ${
      editor.isActive("italic")
        ? "bg-violet-600 text-white"
        : "bg-zinc-800 hover:bg-zinc-700"
    }`}
  >
    <em>I</em>
  </button>

  <button
    type="button"
    onClick={() =>
      editor.chain().focus().toggleHeading({ level: 1 }).run()
    }
    className={`px-3 py-2 transition ${
      editor.isActive("heading", { level: 1 })
        ? "bg-violet-600 text-white"
        : "bg-zinc-800 hover:bg-zinc-700"
    }`}
  >
    H1
  </button>

  <button
    type="button"
    onClick={() =>
      editor.chain().focus().toggleHeading({ level: 2 }).run()
    }
    className={`px-3 py-2 transition ${
      editor.isActive("heading", { level: 2 })
        ? "bg-violet-600 text-white"
        : "bg-zinc-800 hover:bg-zinc-700"
    }`}
  >
    H2
  </button>

  <button
    type="button"
    onClick={() =>
      editor.chain().focus().toggleBulletList().run()
    }
    className={`px-3 py-2 transition ${
      editor.isActive("bulletList")
        ? "bg-violet-600 text-white"
        : "bg-zinc-800 hover:bg-zinc-700"
    }`}
  >
    • List
  </button>

  <button
    type="button"
    onClick={() =>
      editor.chain().focus().toggleOrderedList().run()
    }
    className={`px-3 py-2 transition ${
      editor.isActive("orderedList")
        ? "bg-violet-600 text-white"
        : "bg-zinc-800 hover:bg-zinc-700"
    }`}
  >
    1. List
  </button>

  <button
    type="button"
    onClick={() =>
      editor.chain().focus().toggleBlockquote().run()
    }
    className={`px-3 py-2 transition ${
      editor.isActive("blockquote")
        ? "bg-violet-600 text-white"
        : "bg-zinc-800 hover:bg-zinc-700"
    }`}
  >
    "
  </button>

  <button
    type="button"
    onClick={() =>
      editor.chain().focus().undo().run()
    }
    className="px-3 py-2 bg-zinc-800 hover:bg-zinc-700 transition"
  >
    ↺
  </button>

  <button
    type="button"
    onClick={() =>
      editor.chain().focus().redo().run()
    }
    className="px-3 py-2 bg-zinc-800 hover:bg-zinc-700 transition"
  >
    ↻
  </button>

</div>
      <EditorContent
        editor={editor}
        className="min-h-87.5 p-6 text-white"
      />

    </div>
  );
}

export default TextEditor;