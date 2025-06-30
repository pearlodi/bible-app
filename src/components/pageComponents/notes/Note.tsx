// components/NoteEditor.tsx
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useEffect, useState } from "react";

export default function NoteEditor() {
  const [content, setContent] = useState("");

  const editor = useEditor({
    extensions: [StarterKit],
    content: "<p>Start taking notes...</p>",
    onUpdate: ({ editor }) => {
      setContent(editor.getHTML());
    },
  });

  useEffect(() => {
    // You can persist to localStorage or your existing storage here
    console.log("Note saved:", content);
  }, [content]);

  return (
    <div className="bg-white p-4 rounded shadow space-y-2">
      <h2 className="text-lg font-bold">📝 Notes</h2>
      <EditorContent editor={editor} className="border p-3 rounded" />
    </div>
  );
}
