import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useEffect } from "react";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import { createLowlight } from "lowlight";
import js from "highlight.js/lib/languages/javascript";
import c from "highlight.js/lib/languages/c";
import cpp from "highlight.js/lib/languages/cpp";
import csharp from "highlight.js/lib/languages/csharp";
import go from "highlight.js/lib/languages/go";
import typescript from "highlight.js/lib/languages/typescript";
import sql from "highlight.js/lib/languages/sql";
import rust from "highlight.js/lib/languages/rust";
import ruby from "highlight.js/lib/languages/ruby";
import python from "highlight.js/lib/languages/python";
import java from "highlight.js/lib/languages/java";
import html from "highlight.js/lib/languages/xml";
import r from "highlight.js/lib/languages/r";
import css from "highlight.js/lib/languages/css";
import {
  FaBold,
  FaItalic,
  FaListUl,
  FaListOl,
  FaQuoteLeft,
  FaUndo,
  FaRedo,
  FaCode,
  FaStrikethrough,
} from "react-icons/fa";

const lowlight = createLowlight();

lowlight.register("javascript", js);
lowlight.register("html", html);
lowlight.register("css", css);
lowlight.register("c", c);
lowlight.register("cpp", cpp);
lowlight.register("java", java);
lowlight.register("python", python);
lowlight.register("ruby", ruby);
lowlight.register("go", go);
lowlight.register("csharp", csharp);
lowlight.register("sql", sql);
lowlight.register("rust", rust);
lowlight.register("typescript", typescript);
lowlight.register("r", r);

function TextEditor({
  value,
  onChange
}) {
  const editor = useEditor({
    extensions: [
  StarterKit.configure({
    codeBlock: false,
  }),

  CodeBlockLowlight.configure({
    lowlight,
  }),
],
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
    <div className="overflow-hidden rounded-md border border-[var(--border)] bg-[var(--surface)]">

     <div 
     className="
        flex
        flex-wrap
        gap-2

        border-b
        border-[var(--border)]

        bg-[var(--surface-2)]

        p-3
      ">

  <button
    type="button"
    onClick={() => editor.chain().focus().toggleBold().run()}
    className={`
  px-3
  py-2
  border
  border-[var(--border)]
  bg-[var(--surface)]
  transition
  hover:bg-[var(--hover)]
  ${
    editor.isActive("bold")
      ? "bg-[var(--text)] text-[var(--bg)]"
      : ""
  }
`}
  >
    <FaBold />
  </button>

  <button
    type="button"
    onClick={() => editor.chain().focus().toggleItalic().run()}
   
    className={`
  px-3
  py-2
  border
  border-[var(--border)]
  bg-[var(--surface)]
  transition
  hover:bg-[var(--hover)]
  ${
    editor.isActive("italic")
      ? "bg-[var(--text)] text-[var(--bg)]"
      : ""
  }
`}
  >
    <FaItalic />
  </button>

  <button
    type="button"
    onClick={() =>
      editor.chain().focus().toggleHeading({ level: 1 }).run()
    }

    className={`
  px-3
  py-2
  border
  border-[var(--border)]
  bg-[var(--surface)]
  transition
  hover:bg-[var(--hover)]
  ${
    editor.isActive("heading", { level: 1 })
      ? "bg-[var(--text)] text-[var(--bg)]"
      : ""
  }
`}
  >
    H1
  </button>

  <button
    type="button"
    onClick={() =>
      editor.chain().focus().toggleHeading({ level: 2 }).run()
    }
    className={`
  px-3
  py-2
  border
  border-[var(--border)]
  bg-[var(--surface)]
  transition
  hover:bg-[var(--hover)]
  ${
    editor.isActive("heading", { level: 2 })
      ? "bg-[var(--text)] text-[var(--bg)]"
      : ""
  }
`}
    
  >
    H2
  </button>

  <button
    type="button"
    onClick={() =>
      editor.chain().focus().toggleBulletList().run()
    }
    className={`
  px-3
  py-2
  border
  border-[var(--border)]
  bg-[var(--surface)]
  transition
  hover:bg-[var(--hover)]
  ${
    editor.isActive("bulletList")
      ? "bg-[var(--text)] text-[var(--bg)]"
      : ""
  }
`}
  >
    <FaListUl />  </button>

  <button
    type="button"
    onClick={() =>
      editor.chain().focus().toggleOrderedList().run()
    }
    className={`
  px-3
  py-2
  border
  border-[var(--border)]
  bg-[var(--surface)]
  transition
  hover:bg-[var(--hover)]
  ${
    editor.isActive("orderedList")
      ? "bg-[var(--text)] text-[var(--bg)]"
      : ""
  }
`}
  >
    <FaListOl /> 
  </button>

  <button
    type="button"
    onClick={() =>
      editor.chain().focus().toggleBlockquote().run()
    }
    className={`
  px-3
  py-2
  border
  border-[var(--border)]
  bg-[var(--surface)]
  transition
  hover:bg-[var(--hover)]
  ${
    editor.isActive("blockquote")
      ? "bg-[var(--text)] text-[var(--bg)]"
      : ""
  }
`}
  >
    <FaQuoteLeft />
  </button>

  <button
  type="button"
  onClick={() =>
    editor.chain().focus().toggleCodeBlock().run()
  }
  className={`
  px-3
  py-2
  border
  border-[var(--border)]
  bg-[var(--surface)]
  transition
  hover:bg-[var(--hover)]
  ${
    editor.isActive("codeBlock")
      ? "bg-[var(--text)] text-[var(--bg)]"
      : ""
  }
`}
>
  <FaCode />
</button>

<button
  type="button"
  onClick={() =>
    editor.chain().focus().toggleCode().run()
  }
  className={`
  px-3
  py-2
  border
  border-[var(--border)]
  bg-[var(--surface)]
  transition
  hover:bg-[var(--hover)]
  ${
    editor.isActive("code")
      ? "bg-[var(--text)] text-[var(--bg)]"
      : ""
  }
`}
>
  &lt;/&gt;
</button>

  <button
    type="button"
    onClick={() =>
      editor.chain().focus().undo().run()
    }
    className="px-3 py-2 border
border-[var(--border)]
bg-[var(--surface)]
hover:bg-[var(--hover)] transition"
  >
    <FaUndo />
  </button>

  <button
    type="button"
    onClick={() =>
      editor.chain().focus().redo().run()
    }
    className="px-3 py-2 border
border-[var(--border)]
bg-[var(--surface)]
hover:bg-[var(--hover)] transition"
  >
    <FaRedo />
  </button>

  <button
  type="button"
  onClick={() =>
    editor.chain().focus().toggleStrike().run()
  }
  
  className={`
  px-3
  py-2
  border
  border-[var(--border)]
  bg-[var(--surface)]
  transition
  hover:bg-[var(--hover)]
  ${
    editor.isActive("strike")
      ? "bg-[var(--text)] text-[var(--bg)]"
      : ""
  }
`}
>
  <FaStrikethrough />
</button>

</div>
      <EditorContent
        editor={editor}
        className="
min-h-[350px]
p-6

bg-[var(--surface)]

text-[var(--text)]

prose
prose-zinc
max-w-none
"
      />

    </div>
  );
}

export default TextEditor;