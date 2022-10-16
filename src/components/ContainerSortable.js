import React, { useEffect, useState } from "react";
import { TaskListSortable } from "./TaskListSortable";
import {
  TouchSensor,
  MouseSensor,
  useSensor,
  useSensors,
  KeyboardSensor,
} from "@dnd-kit/core";

import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTurnDown } from "@fortawesome/free-solid-svg-icons";
import { v4 as uuidv4 } from "uuid";

function AppContainer() {
  const [tasks, setTasks] = useState([
    { text: "my test task", status: "pending", uuid: uuidv4(), id: 7 },
    { text: "is this a chicken", status: "pending", uuid: uuidv4(), id: 1 },
    { text: "my task no3", status: "pending", uuid: uuidv4(), id: 2 },
    { text: "my task no4", status: "pending", uuid: uuidv4(), id: 3 },
    { text: "my task no5", status: "pending", uuid: uuidv4(), id: 4 },
    { text: "my task no6", status: "pending", uuid: uuidv4(), id: 20 },
  ]);
  const [newTask, setNewTask] = useState("");
  const [listStyle, setListStyle] = useState("all");
  const [pendingCounter, setPendingCounter] = useState(1);
  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 10,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 250,
        tolerance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  useEffect(() => {
    setPendingCounter(tasks.filter((t) => t.status === "pending").length);
  }, [tasks]);

  const itemCSS = {
    cssCompleted:
      "bg-white p-3 text-gray-300 line-through hover:bg-blue-700 flex justify-left w-full break-words text-left shadow-md",
    cssPending:
      "bg-white p-3 hover:bg-blue-700 hover:text-blue-200 flex justify-left w-full break-words h-auto text-left shadow-md",
    buttonCssCompleted: "",
    buttonCssPending: "",
  };

  function createTask(event) {
    event.preventDefault();
    let newId =
      tasks.length === 0 ? 1 : Math.max(...tasks.map((t) => t.id)) + 1; // check all tasks for highest id number and generate a new id with id = max + 1
    setTasks([
      ...tasks,
      { text: newTask, status: "pending", uuid: uuidv4(), id: newId },
    ]);
    setNewTask("");
  }
  const handleNewTaskChange = (event) => {
    setNewTask(event.target.value);
  };

  const handleListStyleChange = (event) => {
    event.preventDefault();
    let siblingList = event.target.parentNode.childNodes
    siblingList.forEach(s => s.classList.remove('text-blue-600'))
    event.target.classList.add('text-blue-600')
    setListStyle(event.target.id);
  };

  const deleteTask = (event) => {
    setTasks(
      tasks.filter(
        (obj) => obj.uuid !== event.currentTarget.getAttribute("uuid")
      )
    );
  };

  const completeTask = (event) => {
    let currState = tasks.filter(
      (obj) => obj.uuid === event.currentTarget.getAttribute("uuid")
    )[0].status;

    if (currState === "pending") {
      let newState = tasks.map((obj) =>
        obj.uuid === event.currentTarget.getAttribute("uuid")
          ? { ...obj, status: "completed" }
          : obj
      );
      setTasks(newState);
    } else {
      let newState = tasks.map((obj) =>
        obj.uuid === event.currentTarget.getAttribute("uuid")
          ? { ...obj, status: "pending" }
          : obj
      );
      setTasks(newState);
    }
  };

  const deleteCompletedTasks = (event) => {
    event.preventDefault();
    setTasks(tasks.filter((t) => t.status !== "completed"));
  };

  const handleDragStart = (props) => {};

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active?.id !== over?.id) {
      let oldIndex = tasks.findIndex((t) => t.id === active.id);
      let newIndex = tasks.findIndex((t) => t.id === over.id);

      setTasks((tasks) => {
        return arrayMove(tasks, oldIndex, newIndex);
      });
    }
  };

  const handleDragCancel = () => {};

  return (
    <div className="absolute top-[calc(10vh)] left-0 right-0 mx-auto w-full box-border text-center max-w-xl">
      <h1 className="text-left text-white text-5xl mb-8 uppercase font-bold">
        Todo app <span className="text-2xl">with React.js</span>
      </h1>
      <form
        onSubmit={createTask}
        className="w-full mx-auto mb-4 box-border flex justify-between rounded-t-lg shadow-md bg-white"
      >
        <input
          className="p-3 m-auto w-full rounded-lg focus:outline-none"
          placeholder="new todo..."
          value={newTask}
          onChange={handleNewTaskChange}
        />

        <button className="mx-5 my-auto text-gray-400 hover:text-blue-600">
          <FontAwesomeIcon icon={faTurnDown} />
        </button>
      </form>
      <div id="todo-list">
        <TaskListSortable
          itemCSS={itemCSS}
          deleteTask={deleteTask}
          completeTask={completeTask}
          listStyle={listStyle}
          tasks={tasks}
          sensors={sensors}
          handleDragCancel={handleDragCancel}
          handleDragEnd={handleDragEnd}
          handleDragStart={handleDragStart}
        />
      </div>
      <div className="w-full px-5 py-5 my-5 rounded-b-lg shadow-md bg-white flex justify-between">
        <p className="text-gray-400">
          {pendingCounter === 0 ? "No" : pendingCounter}{" "}
          {pendingCounter === 1 ? "item" : "items"} left
        </p>
        <div className="">
          <button
            id="all"
            className="appearance-none font-bold text-gray-400 mx-2 hover:text-blue-600 cursor-pointer "
            onClick={handleListStyleChange}
          >
            All
          </button>
          <button
            id="pending"
            className="font-bold text-gray-400 mx-2 hover:text-blue-600 cursor-pointer"
            onClick={handleListStyleChange}
          >
            Active
          </button>
          <button
            id="completed"
            className="font-bold text-gray-400 mx-2 hover:text-blue-600 cursor-pointer"
            onClick={handleListStyleChange}
          >
            Completed
          </button>
        </div>
        <button
          className=" text-gray-400 mx-2 active:text-blue-600 cursor-pointer"
          onClick={deleteCompletedTasks}
        >
          Clear completed
        </button>
      </div>
    </div>
  );
}

export { AppContainer };
