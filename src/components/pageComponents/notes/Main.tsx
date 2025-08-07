import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Image from "@tiptap/extension-image";
import ListItem from "@tiptap/extension-list-item";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";

import { storage } from "@/utils/storage"; 

export default function NoteEditor() {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: false,
        orderedList: false,
      }),
      Underline,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      ListItem,
      BulletList,
      OrderedList,
      Image,
    ],
    content: storage.get().notes || "<p>Start writing your notes...</p>",
  
  });

  const uploadImage = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "aeropulses");
    formData.append("cloud_name", "dfqdwc9r0");

    try {
      const res = await fetch("https://api.cloudinary.com/v1_1/dfqdwc9r0/image/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      editor?.chain().focus().setImage({ src: data.secure_url }).run();
    } catch (err) {
      console.error("Image upload failed:", err);
    }
  };

  if (!editor) return null;

  return (
    <div className="p-4 h-screen space-y-4 max-w-3xl mx-auto">
      <div className="flex flex-wrap gap-2 border-b pb-2 mb-2">
        <button onClick={() => editor.chain().focus().toggleBold().run()} className="btn">Bold</button>
        <button onClick={() => editor.chain().focus().toggleItalic().run()} className="btn">Italic</button>
        <button onClick={() => editor.chain().focus().toggleUnderline().run()} className="btn">Underline</button>
        <button onClick={() => editor.chain().focus().toggleBulletList().run()} className="btn">Bullet List</button>
        <button onClick={() => editor.chain().focus().toggleOrderedList().run()} className="btn">Ordered List</button>
        <button onClick={() => editor.chain().focus().setTextAlign("left").run()} className="btn">Left</button>
        <button onClick={() => editor.chain().focus().setTextAlign("center").run()} className="btn">Center</button>
        <button onClick={() => editor.chain().focus().setTextAlign("right").run()} className="btn">Right</button>
        <button onClick={() => editor.chain().focus().setTextAlign("justify").run()} className="btn">Justify</button>
        <label className="btn cursor-pointer">
          Upload Image
          <input type="file" accept="image/*" hidden onChange={uploadImage} />
        </label>
      </div>

      <EditorContent editor={editor} className="border p-4 rounded min-h-[300px]" />
    </div>
  );
}
