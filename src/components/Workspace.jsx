import React, { useState, useEffect } from 'react'
import { ListItem } from './ListItem'

const dbName = "myDB"
const storeName = "myStore"

function createDB() {
    const request = indexedDB.open(dbName, 1)

    request.onupgradeneeded = function(event) {
        const db = event.target.result
        db.createObjectStore(storeName, { keyPath: "id", autoIncrement: true })
    }
}

function addToStore(data) {
    const request = indexedDB.open(dbName, 1)

    request.onsuccess = function(event) {
        const db = event.target.result
        const tx = db.transaction(storeName, "readwrite")
        const store = tx.objectStore(storeName)

        if (data.id !== undefined && data.id !== null) {
            store.put(data)
        } else {
            const request = store.put({data})
            request.onsuccess = function(event) {
                console.log("Added to store with key", event.target.result)
            }
            request.onerror = function(event) {
                console.error("Error adding to store", event.target.error)
            }
        }
    }
}

export const Workspace = () => {
    const [inputValue, setInputValue] = useState("")
    const [dataList, setDataList] = useState([])

    useEffect(() => {
        const request = indexedDB.open(dbName, 1)

        request.onsuccess = function(event) {
            const db = event.target.result;
            const tx = db.transaction(storeName, "readonly")
            const store = tx.objectStore(storeName)
            const getAllRequest = store.getAll()
            getAllRequest.onsuccess = function(event) {
                setDataList(event.target.result)
            }
        }
    }, [dataList])


    function addItem() {
        addToStore({ data: inputValue })
        setInputValue("")
    }

    function inputOnChange(event) {
        setInputValue(event.target.value)
    }

    function deleteItem(key) {
        const request = indexedDB.open(dbName, 1)

        request.onsuccess = function(event) {
            const db = event.target.result
            const tx = db.transaction(storeName, "readwrite")
            const store = tx.objectStore(storeName)

            const deleteRequest = store.delete(key)

            deleteRequest.onsuccess = function(event) {
                console.log("Item deleted from store with key", key)
            }
            deleteRequest.onerror = function(event) {
                console.error("Error deleting item from store", event.target.error)
            }
        }
    }

    return (
        <div className="bg-g">
            <input
                value={inputValue}
                onChange={inputOnChange}
                className={"block w-1/4 content-center outline-2  my-5 p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"} />
            <button
                onClick={addItem}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l">
                Add
            </button>
            {dataList.map((data) => (
                <ListItem key={data.id} data={data} onDelete={deleteItem} />
            ))}
        </div>
    );
}

createDB();



