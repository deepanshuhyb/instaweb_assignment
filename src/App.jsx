import { useState, useEffect } from 'react'
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
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768)
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

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768)
    }

    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const sensors = useSensors(
    useSensor(isMobile ? TouchSensor : PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates
    })
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
      <div className='p-4 text-black bg-white flex gap-8 text-5xl flex-col items-center border-2 border-gray-200 rounded-lg shadow-lg pt-4 mt-4 w-full'>
        <h1>tasks draggable</h1>
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
