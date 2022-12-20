import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

import { Provider } from '@siakit/core'

import { Kanban } from './pages/Kanban'
import { KanbanContextProvider } from './pages/Kanban/context'

export function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <KanbanContextProvider>
        <Provider>
          <Kanban />
        </Provider>
      </KanbanContextProvider>
    </DndProvider>
  )
}
