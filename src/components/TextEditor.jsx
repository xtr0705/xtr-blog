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
    <FaBold />
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
    <FaItalic />
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
    <FaListUl />  </button>

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
    <FaListOl /> 
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
    <FaQuoteLeft />
  </button>

  <button
  type="button"
  onClick={() =>
    editor.chain().focus().toggleCodeBlock().run()
  }
  className={`px-3 py-2 transition ${
    editor.isActive("codeBlock")
      ? "bg-violet-600 text-white"
      : "bg-zinc-800 hover:bg-zinc-700"
  }`}
>
  <FaCode />
</button>

<button
  type="button"
  onClick={() =>
    editor.chain().focus().toggleCode().run()
  }
  className={`px-3 py-2 transition ${
    editor.isActive("code")
      ? "bg-violet-600 text-white"
      : "bg-zinc-800 hover:bg-zinc-700"
  }`}
>
  &lt;/&gt;
</button>

  <button
    type="button"
    onClick={() =>
      editor.chain().focus().undo().run()
    }
    className="px-3 py-2 bg-zinc-800 hover:bg-zinc-700 transition"
  >
    <FaUndo />
  </button>

  <button
    type="button"
    onClick={() =>
      editor.chain().focus().redo().run()
    }
    className="px-3 py-2 bg-zinc-800 hover:bg-zinc-700 transition"
  >
    <FaRedo />
  </button>

  <button
  type="button"
  onClick={() =>
    editor.chain().focus().toggleStrike().run()
  }
  className={`px-3 py-2 transition ${
    editor.isActive("strike")
      ? "bg-violet-600 text-white"
      : "bg-zinc-800 hover:bg-zinc-700"
  }`}
>
  <FaStrikethrough />
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