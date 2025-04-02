import { useState } from 'react'
import './App.css'
import {
  closestCorners,
  DndContext,
  TouchSensor,
  useSensor,
  useSensors,
  PointerSensor,
  KeyboardSensor
} from '@dnd-kit/core'
import Column from './components/Column'
import { arrayMove, sortableKeyboardCoordinates } from '@dnd-kit/sortable'

function App () {
  const [tasks, setTasks] = useState([
    { id: '1', title: 'Task 1' },
    { id: '2', title: 'Task 2' },
    { id: '3', title: 'Task 3' },
    { id: '4', title: 'Task 4' },
    { id: '5', title: 'Task 5' },
    { id: '6', title: 'Task 6' }
  ])

  const getTaskIndex = id => {
    return tasks.findIndex(task => task.id === id)
  }

  const sensors = useSensors(
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates
    }),
    useSensor(PointerSensor)
  )

  const handleDragEnd = event => {
    const { active, over } = event
    if (active.id === over.id) {
      return
    }
    setTasks(tasks => {
      const originalPos = getTaskIndex(active.id)
      const newPos = getTaskIndex(over.id)
      return arrayMove(tasks, originalPos, newPos)
    })
  }

  return (
    <>
      <div className='p-4 text-black bg-white flex gap-8 text-5xl flex-col items-center'>
        <h1>tasks</h1>
        <DndContext
          sensors={sensors}
          collisionDetection={closestCorners}
          onDragEnd={handleDragEnd}
        >
          <Column tasks={tasks} />
        </DndContext>
      </div>
    </>
  )
}

export default App
