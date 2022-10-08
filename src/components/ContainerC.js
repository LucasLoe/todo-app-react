import React, { useState } from "react";
import { TaskList } from "./TaskList";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTurnDown } from '@fortawesome/free-solid-svg-icons'

function AppContainer() {
  const [tasks, setTasks] = useState([])
  const [newTask, setNewTask] = useState('')
  const [listStyle, setListStyle] = useState('all')

  const itemCSS = {
    cssCompleted: "p-3 text-gray-200 line-through hover:bg-blue-700 flex justify-left w-full break-words",
    cssPending: "p-3 hover:bg-blue-700 hover:text-blue-200 flex justify-left w-full break-words",
    buttonCssCompleted: "",
    buttonCssPending: ""
  }


  function createTask(event) {
    event.preventDefault();
    setTasks([...tasks, { text: newTask, status: 'pending' }])
    setNewTask('')
    console.log('new task created')
  }

  const handleNewTaskChange = event => {
    setNewTask(event.target.value)
  }

  const deleteTask = event => {
    setTasks(tasks.filter(obj => obj !== tasks[event.currentTarget.getAttribute('index-value')]))
  }

  const completeTask = event => {
    let newState = [...tasks]
    if (newState[event.currentTarget.getAttribute('index-value')].status === 'pending') {
      newState[event.currentTarget.getAttribute('index-value')].status = 'completed'
      setTasks(newState)
    }
    else {
      newState[event.currentTarget.getAttribute('index-value')].status = 'pending'
      setTasks(newState)
    }
  }





  return (
    <div
      className="absolute top-[calc(13vh)] left-0 right-0 mx-auto w-full box-border text-center max-w-xl"
    >
      <h1
        className="text-left text-white text-5xl mb-8 uppercase font-bold"
      >
        Todo app <span className="text-2xl">with React.js</span>
      </h1>
      <form
        onSubmit={createTask}
        className='w-full mx-auto mb-4 box-border flex justify-between rounded-lg shadow-lg bg-white'
      >
        <input
          className="p-3 m-auto w-full rounded-lg focus:outline-none"
          placeholder='new todo...'
          value={newTask}
          onChange={handleNewTaskChange}
        />

        <button
          className="mx-5 my-auto hover:text-blue-600"
        >
          <FontAwesomeIcon icon={faTurnDown} />

        </button>
      </form>
      <div
        id="todo-list">
        <TaskList
          itemCSS={itemCSS}
          deleteTask={deleteTask}
          completeTask={completeTask}
          tasks={tasks}
        />
      </div>
    </div>
  );
}

export { AppContainer };
