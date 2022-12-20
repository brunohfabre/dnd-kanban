import { useContext } from 'react'
import { useDrop } from 'react-dnd'

import { Card } from '@siakit/card'
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
  const { moveCardToColumn } = useContext(KanbanContext)

  const [, dropRef] = useDrop({
    accept: 'CARD',
    hover(item: HoverItemData, monitor) {
      if (item.columnIndex === columnIndex) {
        return
      }

      moveCardToColumn({
        fromColumn: item.columnIndex,
        toColumn: columnIndex,
        from: item.index,
      })

      item.columnIndex = columnIndex
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

      <Flex flex direction="column" gap={8} overflow>
        {data.items.map((item, index) => (
          <Item key={item} id={item} index={index} columnIndex={columnIndex} />
        ))}

        <Card
          ref={dropRef}
          flex
          css={{ backgroundColor: 'transparent', borderStyle: 'dashed' }}
        />
      </Flex>
    </Flex>
  )
}
