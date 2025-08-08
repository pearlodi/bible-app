import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import { Editor } from "@tiptap/react";
import { useState } from "react";
import { LuBold } from "react-icons/lu";
import { FiItalic } from "react-icons/fi";
import { LuUnderline } from "react-icons/lu";
import { RiStrikethrough2 } from "react-icons/ri";
import { Button } from "@/components/ui/button";
import { GrTextAlignLeft } from "react-icons/gr";
import { GrTextAlignCenter } from "react-icons/gr";
import { GrTextAlignRight } from "react-icons/gr";
import { PiTextAlignJustify } from "react-icons/pi";
import { RiListUnordered } from "react-icons/ri";
import { IoLinkOutline } from "react-icons/io5";
// import { FaRegImage } from "react-icons/fa6";

interface EditorToolbarProps {
  editor: Editor | null;
  handleImageUpload: (file: File) => Promise<{ src: string }>;
}

export function EditorToolbar({
  editor,
  // handleImageUpload,
}: EditorToolbarProps) {
  const [linkUrl, setLinkUrl] = useState("");
  const [linkText, setLinkText] = useState("");

  if (!editor) return null;

  const insertLink = () => {
    if (!linkUrl || !linkText) return;

    editor
      .chain()
      .focus()
      .insertContent([
        {
          type: "text",
          text: linkText,
          marks: [
            {
              type: "link",
              attrs: {
                href: linkUrl,
                target: "_blank",
                rel: "noopener noreferrer",
              },
            },
          ],
        },
        { type: "text", text: " " }, 
      ])
      .run();

    setLinkUrl("");
    setLinkText("");
  };

  return (
   <div className="flex justify-center  w-full">
     <div className="flex gap-2 mb-4 overflow-auto   editor p-2 rounded-[16px]">
      <div className="flex gap-2 w-full items-center lg:border-r-[0.6px] lg:border-[#D7D7D7] px-4 py-1">
        <select
          onChange={(e) =>
            editor.chain().focus().setFontFamily(e.target.value).run()
          }
          className="w-20 bg-[#F9F9F9] rounded-[6px] p-1"
          defaultValue="Arial"
        >
          <option value="" disabled>
            Arial
          </option>
          <option value="Arial">Arial</option>
          <option value="Times New Roman">Times New Roman</option>
          <option value="Courier New">Courier New</option>
          <option value="Georgia">Georgia</option>
          <option value="Comic Sans MS">Comic Sans MS</option>
        </select>
        <select
          onChange={(e) => {
            const value = e.target.value;
            if (value) {
              editor.chain().focus().setFontSize(value).run();
            }
          }}
          className="w-[90px] rounded-[6px] bg-[#F9F9F9] p-1"
          defaultValue="12px"
        >
          <option value="" disabled>
            12px
          </option>
          <option value="12px">12px</option>
          <option value="14px">14px</option>
          <option value="16px">16px</option>
          <option value="18px">18px</option>
          <option value="24px">24px</option>
          <option value="32px">32px</option>
        </select>
      </div>

      <div className="flex gap-4 items-center lg:border-r-[0.6px] border-[#D7D7D7] px-4 py-1">
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`text-white ${editor.isActive("bold") ? "bg-gray-300" : ""}`}
        >
          <LuBold size={16} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`text-white ${editor.isActive("italic") ? "bg-gray-300" : ""}`}
        >
          <FiItalic size={16} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={`text-white ${editor.isActive("underline") ? "bg-gray-300" : ""}`}
        >
          <LuUnderline size={16} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={`text-white ${editor.isActive("strike") ? "bg-gray-300" : ""}`}
        >
          <RiStrikethrough2 size={16} />
        </button>
      </div>

      <div className="flex gap-4 items-center lg:border-r-[0.6px] border-[#D7D7D7] px-2 lg:px-4 py-1">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              className="border-none  bg-white text-black hover:bg-white  p-0"
            >
              <GrTextAlignLeft /> ▾
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-40 mb-3 grid grid-cols-2 bg-white rounded-lg  p-2">
            <Button
              variant="ghost"
              onClick={() =>
                editor.chain().focus().setTextAlign("center").run()
              }
            >
              <GrTextAlignCenter />
            </Button>
            <Button
              variant="ghost"
              onClick={() => editor.chain().focus().setTextAlign("left").run()}
            >
              <GrTextAlignLeft />
            </Button>
            <Button
              variant="ghost"
              onClick={() => editor.chain().focus().setTextAlign("right").run()}
            >
              <GrTextAlignRight />
            </Button>
            <Button
              variant="ghost"
              onClick={() => editor.chain().focus().unsetTextAlign().run()}
            >
              <PiTextAlignJustify />
            </Button>
          </PopoverContent>
        </Popover>

        <Button
          onClick={() =>
            editor
              .chain()
              .focus()
              .toggleOrderedList()
              .setListStyle("decimal")
              .run()
          }
          className="bg-white text-black hover:bg-white rounded-lg"
        >
          <RiListUnordered size={20} />
        </Button>
      </div>

      {/* Insert Link */}
      <div className="flex gap-4 items-center px-4 py-1">
        <Popover>
          <PopoverTrigger asChild>
            <Button className="p-0 text-black hover:bg-white bg-white" >
              {" "}
              <IoLinkOutline size={30} />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="bg-white p-4 rounded-lg mb-3 shadow w-64 space-y-2 z-50">
            <div className="flex flex-col space-y-2">
              <input
                placeholder="Insert URL"
                value={linkUrl}
                onChange={(e) => setLinkUrl(e.target.value)}
                className="border p-1 rounded"
              />
              <input
                placeholder="Link Text"
                value={linkText}
                onChange={(e) => setLinkText(e.target.value)}
                className="border p-1 rounded"
              />
              <button onClick={insertLink}>Insert link</button>
            </div>
          </PopoverContent>
        </Popover>

        {/* Insert Image */}
        {/* <button
          onClick={async () => {
            const file = await promptForFile();
            if (file) {
              const { src } = await handleImageUpload(file);
              editor.chain().focus().setImage({ src }).run();
            }
          }}
          className=""
        >
          {/* <CiImageOn size={20} /> *}<FaRegImage size={24} className="text-white "/>
        </button> */}
      </div>
    </div>
   </div>
  );
}

// const promptForFile = (): Promise<File | null> => {
//   return new Promise((resolve) => {
//     const input = document.createElement("input");
//     input.type = "file";
//     input.accept = "image/*";
//     input.onchange = (event) => {
//       const file = (event.target as HTMLInputElement).files?.[0] ?? null;
//       resolve(file);
//     };
//     input.click();
//   });
// };
