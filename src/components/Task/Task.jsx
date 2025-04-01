import React from 'react'

import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

function Task ({ id, title }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id })
  const style = {
    transition,
    transform: CSS.Transform.toString(transform)
  }

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
      className='bg-gray-200 p-4 rounded-lg shadow-md mb-2'
    >
      {title}
    </div>
  )
}

export default Task
