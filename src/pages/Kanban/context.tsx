import { createContext, ReactNode, useState } from 'react'

import produce from 'immer'

export type ItemType = {
  id: string
  content: string
}

export type ColumnType = {
  id: string
  title: string
  items: string[]
}

type MoveData = {
  fromColumn: number
  toColumn: number
  from: number
  to: number
}

type MoveCardToColumnProps = {
  fromColumn: number
  toColumn: number
  from: number
}

export const initialItems = {
  'item-1': {
    id: 'item-1',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras ante leo, tempus at metus placerat, sodales aliquet turpis. Ut quis nunc vitae nibh gravida ornare eu euismod eros. Quisque aliquam justo ut imperdiet imperdiet. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Morbi tristique dolor leo, in ornare sem ullamcorper egestas. Curabitur et leo enim. Integer sit amet elit ac neque interdum pellentesque. Sed maximus risus sit amet interdum imperdiet. Nulla luctus eu nisl auctor rhoncus. Nunc vitae leo ac purus blandit suscipit ut eu justo. Maecenas eget ipsum justo. Interdum et malesuada fames ac ante ipsum primis in faucibus. Duis eget tellus tellus. Vivamus cursus aliquet neque in accumsan. Suspendisse placerat arcu non turpis euismod, id interdum tortor eleifend. Nunc ante sapien, suscipit sed laoreet quis, pretium non arcu.',
  },
  'item-2': { id: 'item-2', content: 'Content 2' },
  'item-3': { id: 'item-3', content: 'Content 3' },
  'item-4': { id: 'item-4', content: 'Content 4' },
  'item-5': { id: 'item-5', content: 'Content 5' },
  'item-6': { id: 'item-6', content: 'Content 6' },
  'item-7': { id: 'item-7', content: 'Content 7' },
} as { [key: string]: ItemType }

const initialData = [
  {
    id: 'column-1',
    title: 'Column 1',
    items: ['item-1'],
  },
  {
    id: 'column-2',
    title: 'Column 2',
    items: ['item-2', 'item-3'],
  },
  {
    id: 'column-3',
    title: 'Column 3',
    items: ['item-4'],
  },
  {
    id: 'column-4',
    title: 'Column 4',
    items: ['item-5', 'item-6', 'item-7'],
  },
]

type KanbanContextData = {
  columns: ColumnType[]
  move: (data: MoveData) => void
  moveCardToColumn: (data: MoveCardToColumnProps) => void
}

export const KanbanContext = createContext<KanbanContextData>(
  {} as KanbanContextData,
)

type KanbanContextProviderProps = {
  children: ReactNode
}

export function KanbanContextProvider({
  children,
}: KanbanContextProviderProps) {
  const [columns, setColumns] = useState<ColumnType[]>(initialData)

  function move({ fromColumn, toColumn, from, to }: MoveData) {
    // console.log('[MOVE]: ', { fromColumn, toColumn, from, to })

    setColumns((prevState) =>
      produce(prevState, (draft) => {
        const dragged = draft[fromColumn].items[from]

        draft[fromColumn].items.splice(from, 1)
        draft[toColumn].items.splice(to, 0, dragged)
      }),
    )
  }

  function moveCardToColumn({
    fromColumn,
    toColumn,
    from,
  }: MoveCardToColumnProps) {
    // console.log('[MOVE-TO-CARD]: ', { fromColumn, toColumn, from })

    setColumns((prevState) =>
      produce(prevState, (draft) => {
        const dragged = draft[fromColumn].items[from]

        draft[fromColumn].items.splice(from, 1)
        draft[toColumn].items.splice(draft[toColumn].items.length, 0, dragged)
      }),
    )
  }

  return (
    <KanbanContext.Provider value={{ columns, move, moveCardToColumn }}>
      {children}
    </KanbanContext.Provider>
  )
}
