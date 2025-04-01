import { useState } from 'react'
import './App.css'
import { closestCorners, DndContext } from '@dnd-kit/core'
import Column from './components/Column'

function App () {
  const [tasks, setTasks] = useState([
    { id: '1', title: 'Task 1' },
    { id: '2', title: 'Task 2' },
    { id: '3', title: 'Task 3' },
    { id: '4', title: 'Task 4' },
    { id: '5', title: 'Task 5' },
    { id: '6', title: 'Task 6' }
  ])

  return (
    <>
      <div className='p-4 text-black bg-white flex gap-8 text-5xl flex-col items-center'>
        <h1>tasks</h1>
        <DndContext collisionDetection={closestCorners}>
          <Column tasks={tasks} />
        </DndContext>
      </div>
    </>
  )
}

export default App
