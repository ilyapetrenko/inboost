import React, { useState } from 'react'

export const ListItem = (props) => {
    const [selected, setSelected] = useState(false)

    function handleClick() {
        setSelected(!selected)
    }
    function handleDelete() {
        props.onDelete(props.data.id)
    }

    return (
        <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{props.data.id}</h5>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{JSON.stringify(props.data.data.data)}</p>
            <button onClick={handleDelete} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Delete</button>
        </div>
    );
}






