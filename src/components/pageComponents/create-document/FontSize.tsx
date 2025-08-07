import { Extension } from '@tiptap/core'

export const FontSize = Extension.create({
    name: 'fontSize',
  
    addGlobalAttributes() {
      return [
        {
          types: ['textStyle'],
          attributes: {
            fontSize: {
              default: null,
              parseHTML: element => element.style.fontSize || null,
              renderHTML: attributes => {
                if (!attributes.fontSize) return {}
                return { style: `font-size: ${attributes.fontSize}` }
              },
            },
          },
        },
      ]
    },
  
    addCommands() {
      return {
        setFontSize: (fontSize: string) => ({ chain }) => {
          return chain().setMark('textStyle', { fontSize }).run()
        },
      }
    },
  })
  

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    fontSize: {
      setFontSize: (fontSize: string) => ReturnType
    }
  }
}
