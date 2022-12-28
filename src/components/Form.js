import React, { useState, useEffect } from "react";
import axios, { all } from "axios";

function Form(props) {
  const [task, setTask] = useState("");
  const [allTasks, setAllTasks] = useState([]);
  const [id, setId] = useState(0);
  useEffect(() => {
    getAll().then((initialTasks) => {
      console.log(initialTasks);

      setAllTasks(initialTasks);
    });
  }, []);
  const addTask = (e) => {
    e.preventDefault();
    setId(id + 1);
    const taskObject = {
      text: task,
      date: new Date().toISOString(),
      id: id,
    };
    setTask(taskObject);
    create(taskObject);

    setTask("");
    console.log(allTasks);
  };
  const handleTaskChange = (e) => {
    setTask(e.target.value);
  };
  const baseUrl = "http://localhost:3001/tasks";
  const getAll = () => {
    const request = axios.get(baseUrl);

    return request.then((response) => response.data);
  };
  const create = (newObject) => {
    const request = axios.post(baseUrl, newObject);
    return request.then((response) => {
      console.log(response.data);
      setAllTasks(allTasks.concat(response.data));
      console.log(allTasks);
    });
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
