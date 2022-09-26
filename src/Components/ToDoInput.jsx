import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { FaBook } from "react-icons/fa"

const style = {
    bg: `h-auto w-screen px-10`,
    title: `text-3xl font-semibold my-3 text-center`,
    container: `rounded-md border-solid border-2 border-gray-300 px-4 pb-1 pt-4 mb-[20px]`,
    form: `flex justify-between`,
    input: `p-2 w-full text-sm border-gray-200 border-2 border-solid rounded-md placeholder:text-slate-400 block border border-slate-300 py-2 pl-12 pr-3 focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm`,
    book: `absolute inset-y-0 left-0 flex items-center p-2 text-white bg-cyan-600 rounded-md text-2xl`,
    button: `my-4 px-10 w-full border p-2 bg-cyan-600 rounded-md text-white`,
    button2: `px-10 w-2/12 border p-2 bg-cyan-600 rounded-md text-white`,
}

function ToDoInput() {
    const [task, setTask] = useState("");

    const navigate = useNavigate()

    const data = {
        task: task,
    }

    function Submit(e){
        e.preventDefault();
        axios.post("https://fake-api-coba.herokuapp.com/todos", data).then(
            navigate('/')
        )
    }

        return (
            <div className={style.bg}>
                <h1 className={style.title}>TodoInput</h1>
                <div className={style.container}>
                    <label class="relative block">
                        <span className={style.book}>
                            <i><FaBook /></i>
                        </span>
                        <input className={style.input} 
                            value={task}
                            onChange={(e) => setTask(e.target.value)}
                            placeholder="Input Todo" 
                            type="text" />
                    </label>
                    <button onClick={Submit} className={style.button}>Submit</button>
                </div>
                <Link to="/" className={style.button2}>Back</Link>
            </div>
        )
}

export default ToDoInput;