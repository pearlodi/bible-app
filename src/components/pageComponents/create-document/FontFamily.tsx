import { Mark} from '@tiptap/core'

export interface FontFamilyOptions {
  types: string[]
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    fontFamily: {
      setFontFamily: (font: string) => ReturnType
    }
  }
}

export const FontFamily = Mark.create<FontFamilyOptions>({
  name: 'fontFamily',

  addOptions() {
    return {
      types: ['textStyle'],
    }
  },

  addAttributes() {
    return {
      fontFamily: {
        default: null,
        parseHTML: (el) => el.style.fontFamily?.replace(/['"]/g, ''),
        renderHTML: (attrs) => {
          if (!attrs.fontFamily) return {}
          return {
            style: `font-family: ${attrs.fontFamily}`,
          }
        },
      },
    }
  },

  parseHTML() {
    return [{ style: 'font-family' }]
  },

  renderHTML({ HTMLAttributes }) {
    return ['span', HTMLAttributes, 0]
  },

  addCommands() {
    return {
      setFontFamily:
        (font) =>
        ({ chain }) => {
          return chain().setMark(this.name, { fontFamily: font }).run()
        },
    }
  },
})
