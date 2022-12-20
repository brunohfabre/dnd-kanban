import { useContext } from 'react'
import { useDrop } from 'react-dnd'

import { Flex } from '@siakit/layout'
import { Text } from '@siakit/text'

import { ColumnType, KanbanContext } from './context'
import { Item } from './Item'

type ColumnProps = {
  data: ColumnType
  index: number
}

type HoverItemData = {
  index: number
  columnIndex: number
}

export function Column({ data, index: columnIndex }: ColumnProps) {
  const { move } = useContext(KanbanContext)

  const [, dropRef] = useDrop({
    accept: 'CARD',
    drop(item: HoverItemData) {
      if (item.columnIndex === columnIndex) {
        return
      }

      move({
        fromColumn: item.columnIndex,
        toColumn: columnIndex,
        from: item.index,
        to: data.items.length,
      })

      item.columnIndex = columnIndex
      item.index = data.items.length
    },
  })

  return (
    <Flex
      direction="column"
      gap
      css={{
        flexShrink: 0,
        flexGrow: 0,
        flexBasis: 320,
      }}
    >
      <Text>{data.title}</Text>

      <Flex flex direction="column" overflow>
        {data.items.map((item, index) => (
          <Item key={item} id={item} index={index} columnIndex={columnIndex} />
        ))}
        <Flex ref={dropRef} flex />
      </Flex>
    </Flex>
  )
}
