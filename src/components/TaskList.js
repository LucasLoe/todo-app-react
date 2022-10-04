import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'

export function TaskList({ tasks }) {
    return (
        <div
            className='w-full mx-auto bg-white rounded-lg shadow-lg max-w-xl box-border'
        >
            <ul
                className="divide-y-2 divide-gray-100 "
            >
                {tasks.map((e, index) => (
                    <li
                        key={index}
                        className="p-3 hover:bg-blue-700 hover:text-blue-200 flex justify-between"
                    >
                        {e[0]}
                        <button
                            className="mx-2 my-auto hover:text-white"
                            onClick={console.log('item clicked')}
                        >
                            <FontAwesomeIcon icon={faTrashCan}/>
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    )
}