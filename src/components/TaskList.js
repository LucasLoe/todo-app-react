import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan, faCheck } from '@fortawesome/free-solid-svg-icons'

export function TaskList({ itemCSS, deleteTask, completeTask, tasks }) {  
    return (
        <div
            className='w-full mx-auto bg-white rounded-lg shadow-lg max-w-xl box-border'
        >
            <ul
                className="divide-y-2 divide-gray-100 max-w-xl"
            >
                {tasks.map((e, index) => (
                    <li
                        key={index}
                        className={(e.status === 'pending')? itemCSS.cssPending : itemCSS.cssCompleted}
                    >
                        <button
                            index-value={index}
                            className="mx-2 my-auto hover:text-white"
                            onClick={completeTask}
                        >
                            <FontAwesomeIcon icon={faCheck} />
                        </button>
                        {e.text}
                        <button
                            status={e.status}
                            index-value={index}
                            className="mx-2 my-auto hover:text-white ml-auto"
                            onClick={deleteTask}
                        >
                            <FontAwesomeIcon icon={faTrashCan} />
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    )
}