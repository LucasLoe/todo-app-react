import React, { useState } from "react";
import { TaskList } from "./TaskList";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTurnDown } from '@fortawesome/free-solid-svg-icons'

function AppContainer() {
  const [tasks, setTasks] = useState([])
  const [newTask, setNewTask] = useState()

  function createTask(event) {
    event.preventDefault();
    console.log('hi')
    setTasks([...tasks, [newTask]])
    setNewTask('')
  }

  function handleNewTaskChange(event) {
    setNewTask(event.target.value)
  }

  return (
    <div
      className="absolute top-[calc(25vh-25px)] w-full box-border text-center"
    >
      <form
        onSubmit={createTask}
        className='w-full mx-auto mb-4 max-w-xl box-border flex justify-between rounded-lg shadow-lg bg-white'
      >
        <input
          className="p-3 m-auto w-full rounded-lg focus:outline-none"
          placeholder='new todo...'
          value={newTask}
          onChange={handleNewTaskChange}
        />

        <button
          className="mx-5 my-auto hover:text-blue-600"
          onClick={console.log('item clicked')}
        >
          <FontAwesomeIcon icon={faTurnDown} />
        </button>
      </form>
      <div
        id="todo-list">
        <TaskList
          tasks={tasks}
        />
      </div>
    </div>
  );
}

export { AppContainer };
