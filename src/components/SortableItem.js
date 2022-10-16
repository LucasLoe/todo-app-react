import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";

function SortableItem({
  task,
  itemCSS,
  deleteTask,
  completeTask,
}) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      key={task.uuid}
      {...attributes}
      {...listeners}
      className={
        task.status === "pending" ? itemCSS.cssPending : itemCSS.cssCompleted
      }
    >
      <input
        type="checkbox"
        uuid={task.uuid}
        className="appearance-none border-2 border-gray-300 w-4 h-4 shrink-0 mx-2 my-auto rounded-full checked:bg-gradient-to-r from-green-200 via-green-300 to-blue-500 checked:border-none checked:content-['_↗'] checked:text-lg checked:text-white"
        onClick={completeTask}
      ></input>

      {task.text}

      <button
        status={task.status}
        uuid={task.uuid}
        className="mx-2 my-auto text-gray-400 hover:text-white ml-auto"
        onClick={deleteTask}
      >
        <FontAwesomeIcon icon={faTrashCan} />
      </button>
    </div>
  );
}

export default SortableItem;
