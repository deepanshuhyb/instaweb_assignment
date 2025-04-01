import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import React from 'react'
import Task from './Task/Task'

function Column ({ tasks }) {
  return (
    <div>
      <SortableContext items={tasks} strategy={verticalListSortingStrategy}>
        {tasks.map(task => (
          <>
            <Task key={task.id} id={task.id} title={task.title} />
          </>
        ))}
      </SortableContext>
    </div>
  )
}

export default Column
