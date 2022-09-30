import React, { useEffect, useState } from "react";
import axios from "axios";
import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { BiSearch } from "react-icons/bi";
import { Link } from "react-router-dom";


const style = {
    bg: `h-auto w-screen px-10`,
    title: `text-3xl font-bold my-3 text-center`,
    title2: `text-3xl font-semibold my-3 text-center`,
    container: `rounded-md border-solid border-2 border-gray-300 px-4 pb-1 pt-4`,
    form: `flex justify`,
    input: `p-2 w-[700px] text-sm border-gray-200 border-2 border-solid rounded-md placeholder:text-slate-400 block border border-slate-300 py-2 pl-12 pr-3 focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm`,
    buttonSearch: `flex justify-between`,
    button: `my-4 w-[700px] px-10 border p-2 bg-cyan-600 rounded-md text-white`,
    button2: `my-4 w-[250px] px-10 border p-2 bg-cyan-600 rounded-md text-white text-center`, 
    buttonStatus: `flex justify-between`,
    button3: `my-2 w-3/12 border p-2 bg-cyan-600 rounded-md text-white`,
    button4: `my-2 w-3/12 ml-2 border p-2 bg-cyan-600 rounded-md text-white`,
    button5: `my-2 w-3/12 ml-2 border p-2 bg-cyan-600 rounded-md text-white`,
    buttonDelete: `flex justify-between`,
    button6: `my-2 w-5/12 border p-2 bg-red-600 rounded-md text-white`,
    button7: `my-2 w-5/12 border p-2 bg-red-600 rounded-md text-white`,
    search: `absolute inset-y-0 left-0 flex items-center p-2 text-white bg-cyan-600 rounded-md text-2xl`,
    icon: `flex justify-center items-center space-x-3`,
    delete2: `h-7 w-7 items-center text-red-600 text-2xl`,
    edit: `h-6 w-7 flex-justify-center items-center text-yellow-500 text-2xl`,
    check: `h-4 w-7 flex-justify-center items-center`,
    li: `flex justify-between rounded-md border-solid border-2 border-gray-300 p-3 my-2 capitalize`,
    row: `flex`,
    text: `ml-2 cursor-pointer`,
    textComplete: `ml-2 cursor-pointer line-through text-red-600`,
    loading: `text-2xl font-semibold my-3 text-center`
}

function TodoSearch() {

    const [todos, setTodos] = useState([]);
    const [check, setCheck] = useState();
    const [searchText, setSearchText] = useState("");
    let [filteredData] = useState();

    const handleSearch = (e) => {
        setSearchText(e.target.value);
        if(e.target.value === "") {
            loadTodos();
        } 
    };

    const globalSearch = () => {
        filteredData = todos.filter((value) => {
            return (
                value.task.toLowerCase().includes(searchText.toLowerCase())
            );
        });
        setTodos(filteredData); 
    };

    const handleFilter = async (value) => {
        return await axios
        .get(`https://fake-api-coba.herokuapp.com/todos?complete=${value}`)
        .then((res) => {
            setTodos(res.data);
        })   
        .catch((err) => console.log(err));    
    };

    const handleAll = () => {
        loadTodos() 
    };

    const toggleComplete = (index) => {
       setTodos(todos.map((item) => {
        if (item.id === index) {
            return {
                ...item, complete: !item.complete
            }
        }
        return item;
       }))
    };

    useEffect(() => {
        axios.get("https://fake-api-coba.herokuapp.com/todos")
        .then((result) => {
            setCheck(result.data)
        });
    }, []);
    
    useEffect(() => {
        loadTodosData();
    }, []);
    
    const loadTodosData = async () => {
        return await axios
        .get("https://fake-api-coba.herokuapp.com/todos")
        .then((res) => setTodos(res.data))
        .catch((err) => console.log(err));
    };

    useEffect(() => {
        loadTodos()
    }, []);

    const loadTodos = ()=>{
        axios.get("https://fake-api-coba.herokuapp.com/todos").then((res)=>{
            setTodos(res.data.reverse());
        });
    }; 

    function Delete(id) {
        axios.delete(`https://fake-api-coba.herokuapp.com/todos/${id}`).then(
            loadTodos()
        )
    };
    
    const handleDeleteDone = () => {
        Promise.all(
            todos.filter(e => e.complete).map(async ({ id }) => {
                await fetch(`https://fake-api-coba.herokuapp.com/todos/${id}`, {
                    method: "DELETE", 
                }
                )
                .then(async (res) => {
                    return res;
                })
                .then((data) => {
                    return data.status;
                });
                })
        )
    };

    const handleDeleteAll = () => {
        Promise.all(
            todos.map(async ({ id }) => {
                await fetch(`https://fake-api-coba.herokuapp.com/todos/${id}`, {
                    method: "DELETE",
                }
            )
            .then(async (res) => {
                return res;
            })
            .then((data) => {
                return data.status;
            });
            })
        );
    }
    

    return (
        <div>
            <h1 className={style.title}>TodoSearch</h1>
            
            <div className={style.bg}>
                <div className={style.container}>
                    <label className="relative block">
                    <span className={style.search}>
                        <i><BiSearch /></i>
                    </span>
                    <input className={style.input}
                        placeholder="Search Todo" 
                        type="text"
                        onChange={handleSearch}
                        value={searchText}
                    />
                    </label>
                    <div className={style.buttonSearch}>
                        <button className={style.button} type="submit" onClick={globalSearch}>Search</button>
                        <Link to='/input' className={style.button2}>Add new Task</Link>
                    </div>
                </div>

                <h1 className={style.title2}>TodoList</h1>
                <div className={style.buttonStatus}>
                    <button className={style.button3} onClick={() => handleAll()}>All</button>
                    <button className={style.button4} onClick={() => handleFilter("true")}>Done</button>
                    <button className={style.button5} onClick={() => handleFilter("false")}>Todo</button>
                </div>

                    {todos.map((data)=> (
                    <li className={style.li}>
                        <p onClick={() => toggleComplete(data)} className={data.complete ? style.textComplete : style.text}>{data.task}</p>
                        <div className={style.icon}>
                            <input className={style.check}
                            type="checkbox" 
                            check={check} 
                            onChange={() => toggleComplete(data)}
                            checked={data.complete ? 'checked' : ''} />
                            <Link className={style.edit} to={`/edit/${data.id}`}><MdEdit /></Link>
                            <button className={style.delete2} onClick={()=> Delete(data.id)}><MdDelete /></button>  
                        </div> 
                    </li>
                ))}
                
                <div className={style.buttonDelete}>
                    <button className={style.button6} 
                    onClick={handleDeleteDone}>Delete Done Task</button>

                    <button className={style.button7} 
                    onClick={handleDeleteAll}>Delete All Task</button>
                </div>
            </div>
        </div>
    )
}

export default TodoSearch;