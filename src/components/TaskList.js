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
                {tasks.map((e) => (
                    <li
                        key={e.uuid}
                        className={(e.status === 'pending')? itemCSS.cssPending : itemCSS.cssCompleted}
                    >
                        <input
                            type='checkbox'
                            uuid={e.uuid}
                            className="appearance-none border-2 border-gray-300 w-4 h-4 shrink-0 mx-2 my-auto rounded-full checked:bg-gradient-to-r from-green-200 via-green-300 to-blue-500 checked:border-none checked:content-['_↗'] checked:text-lg checked:text-white"
                            onClick={completeTask}
                        >
                        </input>
                        {e.text}
                        <button
                            status={e.status}
                            uuid={e.uuid}
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