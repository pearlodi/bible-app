// import { useEditor, EditorContent } from "@tiptap/react";
// import StarterKit from "@tiptap/starter-kit";
// import Image from "@tiptap/extension-image";
// import { useEffect } from "react";
// import { storage } from "@/utils/storage";

// const CLOUD_NAME = "dfqdwc9r0";
// const UPLOAD_PRESET = "aeropulses";

// export default function RichNoteEditor() {
//   const editor = useEditor({
//     extensions: [StarterKit, Image],
//     content: "",
//     onUpdate: ({ editor }) => {
//       storage.set({ note: editor.getHTML() });
//     },
//   });


//   useEffect(() => {
//     if (editor && storage.get().note) {
//       editor.commands.setContent(storage.get().note || "");
//     }
//   }, [editor]);

//   const uploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (!file || !editor) return;

//     const formData = new FormData();
//     formData.append("file", file);
//     formData.append("upload_preset", UPLOAD_PRESET);

//     const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
//       method: "POST",
//       body: formData,
//     });

//     const data = await res.json();
//     if (data.secure_url) {
//       editor.chain().focus().setImage({ src: data.secure_url }).run();
//     }
//   };

//   if (!editor) return <p className="p-4">Loading editor...</p>;

//   return (
//     <div className="max-w-2xl mx-auto p-4 space-y-4">
//       <div className="flex gap-2 flex-wrap">
//         <button onClick={() => editor.chain().focus().toggleBold().run()} className="btn">Bold</button>
//         <button onClick={() => editor.chain().focus().toggleItalic().run()} className="btn">Italic</button>
//         <button onClick={() => editor.chain().focus().toggleStrike().run()} className="btn">Strike</button>
//         <button onClick={() => editor.chain().focus().toggleBulletList().run()} className="btn">• List</button>
//         <button onClick={() => editor.chain().focus().toggleOrderedList().run()} className="btn">1. List</button>
//         <button onClick={() => editor.chain().focus().setParagraph().run()} className="btn">Paragraph</button>
//         <button onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} className="btn">H2</button>
//         <label className="btn cursor-pointer">
//           📷 Upload Image
//           <input type="file" hidden accept="image/*" onChange={uploadImage} />
//         </label>
//       </div>

//       <div className="border border-gray-300 rounded p-3 min-h-[200px]">
//         <EditorContent editor={editor} />
//       </div>
//     </div>
//   );
// }
