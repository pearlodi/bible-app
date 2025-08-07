import { Editor } from '@tiptap/react' 
const ListStyleToolbar = ({ editor }: { editor: Editor }) => {
  const changeListStyle = (style: string) => {
    editor.chain().focus().setListStyle(style).run()
  }

  return (
    <div className="flex space-x-2">
      <button
        onClick={() => changeListStyle('disc')}
        className="px-3 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
      >
        • Disc
      </button>
      <button
        onClick={() => changeListStyle('circle')}
        className="px-3 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
      >
        ○ Circle
      </button>
      <button
        onClick={() => changeListStyle('square')}
        className="px-3 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
      >
        ▪ Square
      </button>
      <button
        onClick={() => changeListStyle('decimal')}
        className="px-3 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
      >
        1. Decimal
      </button>
      <button
        onClick={() => changeListStyle('lower-alpha')}
        className="px-3 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
      >
        a. Lower Alpha
      </button>
      <button
        onClick={() => changeListStyle('upper-roman')}
        className="px-3 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
      >
        I. Upper Roman
      </button>
    </div>
  )
}

export default ListStyleToolbar
