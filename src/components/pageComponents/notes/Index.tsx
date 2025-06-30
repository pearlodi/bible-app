import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
export default function NoteEditor() {
  const [value, setValue] = useState("");

  return (
    <div className="p-4 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">📝 Your Notes</h2>
      <ReactQuill theme="snow" value={value} onChange={setValue} />
    </div>
  );
}
