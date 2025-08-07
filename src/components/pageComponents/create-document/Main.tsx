"use client";

import { useState } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import { StarterKit } from "@tiptap/starter-kit";
import { Image } from "@tiptap/extension-image";
import { Link } from "@tiptap/extension-link";
import { TextStyle } from "@tiptap/extension-text-style";
import { Underline } from "@tiptap/extension-underline";
import { TextAlign } from "@tiptap/extension-text-align";
import { EditorToolbar } from "./EditorToolBar";
import { ListStyle } from "./ListStyle";
import { FontFamily } from "./FontFamily";
import { FontSize } from "./FontSize";
import { storage } from "@/utils/storage";
import NewNoteDialog from "./NewNote";
import { Trash } from "lucide-react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
export default function Notepad() {
  const [fileName, setFileName] = useState("");
  const [refresh, setRefresh] = useState(false);
  const cloudName = import.meta.env.VITE_COULD_NAME;

  const savedNotes = storage.get().notes || {};
  const initialContent = savedNotes[fileName] || "";

  const editor = useEditor({
    content: initialContent,
    extensions: [
      StarterKit.configure({
        bulletList: {
          HTMLAttributes: {
            class: "ml-4 text-[red]",
            style: "list-style-type: disc;",
          },
        },
        orderedList: {
          HTMLAttributes: {
            class: "ml-4",
            style: "list-style-type: decimal;",
          },
        },
      }),
      ListStyle,
      Image.configure({ inline: true, allowBase64: true }),
      Link,
      FontFamily,
      FontSize,
      TextStyle,
      Underline,
      TextAlign.configure({ types: ["paragraph", "heading"] }),
    ],
    onUpdate({ editor }) {
      if (!editor || !fileName) return;
      const content = editor.getHTML();
      const current = storage.get().notes || {};
      const updated = {
        ...current,
        [fileName]: content,
      };
      storage.set({ notes: updated });
    },
  });

  const handleImageUpload = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await res.json();
    return {
      src: data.secure_url,
    };
  };

  const handleLoadNote = (name: string) => {
    const saved = storage.get().notes?.[name] || "sda";
    setFileName(name);
    editor?.commands.setContent(saved);
  };

  const handleDeleteNote = (name: string) => {
    const current = storage.get().notes || {};
    delete current[name];
    storage.set({ notes: current });

    if (name === fileName) {
      setFileName("Untitled Document");
      editor?.commands.clearContent();
    }

    setRefresh(!refresh);
  };

  return (
    <div className="lg:flex justify-between flex-grow gap-4 w-full lg:px-10 px-4 max-h-[screen]  h-screen nobar overflow-auto max-w-full 2xl:max-w-[80%] mx-auto">

      <div className="flex justify-end items-center lg:hidden">
        <Drawer direction="left">
          <DrawerTrigger className="bg-white text-black py-1 px-2 rounded-lg">Notes</DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle></DrawerTitle>
              <DrawerDescription>
              </DrawerDescription>
              <div className="flex items-center justify-between mb-4">
                  <NewNoteDialog
                    noteCount={Object.keys(storage.get().notes || {}).length}
                    onCreate={(name) => {
                      setFileName(name);
                      editor?.commands.clearContent();
                      setRefresh(!refresh);
                    }}
                  />
                </div> 
            </DrawerHeader>
            <ul className="flex flex-col gap-4 mt-8 p-4">
              {Object.keys(storage.get().notes || {}).map((name) => (
                <li key={name} className="flex items-center justify-between">
                  <button
                    onClick={() => handleLoadNote(name)}
                    className={` text-left capitalize ${
                      name === fileName
                        ? "font-bold text-2xl"
                        : "font-medium text-lg"
                    } `}
                  >
                    {name}
                  </button>
                  <button
                    onClick={() => handleDeleteNote(name)}
                    className="text-red-500 text-xs ml-2"
                  >
                    <Trash size={16} />
                  </button>
                </li>
              ))}
            </ul>
            <DrawerFooter>
              <DrawerClose>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
     
      </div>
      <aside className="h-full hidden lg:block w-[25%] max-h-[75vh] overflow-auto chat p-4 text-white">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold">My Notes</h2>
          <NewNoteDialog
            noteCount={Object.keys(storage.get().notes || {}).length}
            onCreate={(name) => {
              setFileName(name);
              editor?.commands.clearContent();
              setRefresh(!refresh);
            }}
          />
        </div>

        <ul className="flex flex-col gap-4 mt-8">
          {Object.keys(storage.get().notes || {}).map((name) => (
            <li key={name} className="flex items-center justify-between">
              <button
                onClick={() => handleLoadNote(name)}
                className={` text-left capitalize ${
                  name === fileName
                    ? "font-bold text-2xl"
                    : "font-medium text-lg"
                } `}
              >
                {name}
              </button>
              <button
                onClick={() => handleDeleteNote(name)}
                className="text-red-500 text-xs ml-2"
              >
                <Trash size={16} />
              </button>
            </li>
          ))}
        </ul>
      </aside>

      {/* Editor Section */}
      <div className="w-full lg:w-[75%] gap-2">
        <input
          type="text"
          value={fileName}
          onChange={(e) => {
            const newName = e.target.value.trim();
            setFileName(newName);
            const saved = storage.get().notes?.[newName] || "";
            editor?.commands.setContent(saved);
          }}
          placeholder="UNTITLED"
          className="text-xl lg:text-3xl font-bold"
        />

        <div className="mt-8">
          <EditorContent
            editor={editor}
            className="prose h-full bg-[#ffffffdc] text-black py-3 px-5 rounded-[10px] focus:outline-none focus:ring-0"
            placeholder="add notes here"
          />
        </div>
        <div className="fixed bottom-0  left-0 w-full chat ">
          <EditorToolbar
            editor={editor}
            handleImageUpload={handleImageUpload}
          />
        </div>
      </div>
    </div>
  );
}
