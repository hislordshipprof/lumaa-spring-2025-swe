import { useState } from "react"
import Styles from "../App.module.css"
import { useContext } from "react";
import { TasksContext } from "./context/TaskContext";
import { taskApi } from "../utils/api";

export const CreateTask = () => {
  const [inputValues, setInputValues] = useState({ 
    title: "", 
    description: "" 
  });
  const context = useContext(TasksContext);

  if(!context) {
    return <div className={Styles.loading}>Loading task manager...</div>
  }
  const { fetchTasks } = context

  const handleInputValue = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setInputValues((prevState) => ({...prevState, [name]: value}))
  }

  const createTask = async(event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!inputValues.title.trim() || !inputValues.description.trim()) {
      alert("Please fill in both title and description");
      return;
    }
    try {
      await taskApi.createTask({ 
        ...inputValues, 
        isComplete: false,
        userId: Number(localStorage.getItem("userId")) || 0
      });
      setInputValues({ title: "", description: "" });
      fetchTasks();
    } catch (err) {
      console.error(err);
      alert("Failed to create task. Please try again.");
    }
  }

  return (
    <div className={Styles.createTaskContainer}>
      <h2 className={Styles.formTitle}>Create New Task</h2>
      <p className={Styles.formDescription}>Add a new task to your list</p>
      <form onSubmit={createTask}>
        <input 
          type="text" 
          name="title" 
          className={Styles.taskInput}
          placeholder="Enter task title (e.g., 'Complete project presentation')"
          value={inputValues.title}
          onChange={handleInputValue}
          maxLength={100}
        />
        <textarea 
          name="description" 
          className={Styles.taskInput}
          placeholder="Enter detailed task description..."
          value={inputValues.description}
          onChange={handleInputValue}
          rows={4}
          maxLength={500}
        />
        <button 
          type="submit"
          className={Styles.createTaskButton}
        >
          ✨ Create New Task
        </button>
      </form>
    </div>
  )
}
