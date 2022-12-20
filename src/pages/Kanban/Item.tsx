import { useContext, useRef } from 'react'
import { useDrag, useDrop } from 'react-dnd'

import { Card } from '@siakit/card'
import { Flex } from '@siakit/layout'
import { Text } from '@siakit/text'

import { initialItems, KanbanContext } from './context'

type ItemProps = {
  id: string
  index: number
  columnIndex: number
}

type HoverItemData = {
  index: number
  columnIndex: number
}

export function Item({ id, index, columnIndex }: ItemProps) {
  const { move } = useContext(KanbanContext)

  const itemRef = useRef<HTMLDivElement>(null)

  const card = initialItems[id]

  const [{ isDragging }, dragRef] = useDrag({
    type: 'CARD',
    item: {
      index,
      columnIndex,
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })

  const [, dropRef] = useDrop({
    accept: 'CARD',
    hover(item: HoverItemData, monitor) {
      const draggedColumnIndex = item.columnIndex
      const targetColumnIndex = columnIndex

      const draggedIndex = item.index
      const targetIndex = index

      if (
        draggedIndex === targetIndex &&
        draggedColumnIndex === targetColumnIndex
      ) {
        return
      }

      const targetSize = itemRef.current?.getBoundingClientRect()

      const targetCenter = (targetSize?.bottom! - targetSize?.top!) / 2

      const draggedOffset = monitor.getClientOffset()
      const draggedTop = draggedOffset?.y! - targetSize?.top!

      if (draggedIndex < targetIndex && draggedTop < targetCenter) {
        return
      }

      if (draggedIndex > targetIndex && draggedTop > targetCenter) {
        return
      }

      item.index = targetIndex
      item.columnIndex = targetColumnIndex

      move({
        fromColumn: draggedColumnIndex,
        toColumn: targetColumnIndex,
        from: draggedIndex,
        to: targetIndex,
      })
    },
  })

  dragRef(dropRef(itemRef))

  return (
    <Flex ref={itemRef} padding="0 0 8px 0">
      <Card
        flex
        padding={12}
        css={
          isDragging
            ? {
                borderStyle: 'dashed',
                backgroundColor: 'transparent',
                cursor: 'grabbing',
              }
            : {}
        }
      >
        <Text>{card.content}</Text>
      </Card>
    </Flex>
  )
}
