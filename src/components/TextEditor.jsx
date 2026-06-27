import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

function TextEditor() {
  const editor = useEditor({
    extensions: [StarterKit],

    content: `
      <h2>Start Writing...</h2>
      <p>This is your new blog editor.</p>
    `,
  });

  if (!editor) {
    return null;
  }

  return (
    <div className="border border-zinc-800 bg-black/40">

      <div className="flex gap-2 border-b border-zinc-800 p-3">
  <button
    onClick={() => editor.chain().focus().toggleBold().run()}
    className="px-3 py-2 bg-zinc-800 hover:bg-zinc-700"
  >
    B
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