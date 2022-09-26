import React from "react";
import { Route, Routes } from "react-router-dom";
import TodoSearch from "./Components/ToDoSearch";
import ToDoInput from "./Components/ToDoInput";
import ToDoEdit from "./Components/ToDoEdit";


function App() {

  return (
    <div className="App">

      <Routes>

        <Route path="/" element={<TodoSearch />} />
        <Route path="/input/" element={<ToDoInput />} />
        <Route path="/edit/:id" element={<ToDoEdit />} />

      </Routes>
    </div>
  );
}

export default App;
