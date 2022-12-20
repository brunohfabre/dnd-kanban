import { useContext } from 'react'

import { Flex } from '@siakit/layout'

import { Column } from './Column'
import { KanbanContext } from './context'

export function Kanban() {
  const { columns } = useContext(KanbanContext)

  return (
    <Flex flex padding="16px 16px 0" gap overflow>
      {columns.map((column, index) => (
        <Column key={column.id} data={column} index={index} />
      ))}
    </Flex>
  )
}
