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
        <div className={`bg-gray-500 ${selected ? 'bg-red' : ''}`} key={props.data.id} onClick={handleClick}>
            <h2>{props.data.id}</h2>
            <p>{JSON.stringify(props.data.data.data)}</p>
            <button onClick={handleDelete} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Delete</button>
        </div>
    );
}





