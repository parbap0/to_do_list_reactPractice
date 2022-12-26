import React, { useState } from "react";
import axios from "axios";

function Form(props) {
  const [task, setTask] = useState("");
  const [allTasks, setAllTasks] = useState([]);
  const addTask = (e) => {
    e.preventDefault();
    const taskObject = {
      text: task,
      date: new Date().toISOString(),
      id: allTasks.length + 1,
    };
    setTask(taskObject);
    create(taskObject);
    setAllTasks(allTasks.concat(taskObject));

    setTask("");
    console.log(allTasks);
  };
  const handleTaskChange = (e) => {
    setTask(e.target.value);
  };
  const create = (newObject) => {
    const baseUrl = "http://localhost:3001/tasks";
    const request = axios.post(baseUrl, newObject);
    return request.then((response) => response.data);
  };
  return (
    <div>
      <form onSubmit={addTask}>
        <input value={task} onChange={handleTaskChange}></input>
        <button type="submit">Add Task</button>
        <ul>
          {allTasks.map((task) => {
            return <li key={task.id}>{task.text}</li>;
          })}
        </ul>
      </form>
    </div>
  );
}

export default Form;
