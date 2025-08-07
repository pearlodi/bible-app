

import { Node } from '@tiptap/core'

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    listStyle: {
      setListStyle: (style: string) => ReturnType
    }
  }
}

export const ListStyle = Node.create({
  name: 'listStyle',

  addGlobalAttributes() {
    return [
      {
        types: ['bulletList', 'orderedList'],
        attributes: {
          listStyleType: {
            default: null,
            parseHTML: (element) => element.style.listStyleType || null,
            renderHTML: (attributes) => {
              const classNames: string[] = []

              if (attributes.listStyleType) {
                switch (attributes.listStyleType) {
                  case 'disc':
                    classNames.push('list-disc')
                    break
                  case 'circle':
                    classNames.push('list-circle')
                    break
                  case 'square':
                    classNames.push('list-square')
                    break
                  case 'decimal':
                    classNames.push('list-decimal')
                    break
                  case 'lower-alpha':
                    classNames.push('list-lower-alpha')
                    break
                  case 'upper-roman':
                    classNames.push('list-upper-roman')
                    break
                  default:
                    break
                }
              }

              return {
                class: classNames.join(' '),
              }
            },
          },
        },
      },
    ]
  },

  addCommands() {
    return {
      setListStyle:
        (style: string) =>
        ({ commands, state }) => {
          const { selection } = state
          const parent = state.doc.resolve(selection.$from.pos).node(-1)
          const type = parent.type.name

          if (type !== 'bulletList' && type !== 'orderedList') return false

          return commands.updateAttributes(type, { listStyleType: style })
        },
    }
  },
})
