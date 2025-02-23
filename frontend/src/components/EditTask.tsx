import { useState } from "react"
import { useContext } from "react";
import { TasksContext } from "./context/TaskContext";
import { ITaskData, IUpdateTaskPayload } from "../types/Tasks";
import { taskApi } from "../utils/api";
import Styles from "../App.module.css";

export const EditTask = ({ task, toggle }: { task: ITaskData, toggle: () => void }) => {
  const [inputValues, setInputValues] = useState<IUpdateTaskPayload>({ 
    title: task.title || "", 
    description: task.description || "", 
    isComplete: task.isComplete || false 
  });
  
  const context = useContext(TasksContext);

  if(!context) {
    return <div className={Styles.loading}>Loading editor...</div>
  }

  const { fetchTasks } = context;

  const handleInputValues = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = event.target;
    const checked = (event.target as HTMLInputElement).checked;
    
    setInputValues((prevState) => ({
      ...prevState, 
      [name]: type === 'checkbox' ? checked : value,
    }));
  }

  const updateTask = async(event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!inputValues.title?.trim() || !inputValues.description?.trim()) {
      alert("Please fill in both title and description");
      return;
    }
    try {
      await taskApi.updateTask(task.id, {
        ...inputValues,
        userId: task.userId
      });
      await fetchTasks();
      toggle();
    } catch (error) {
      console.error(error);
      alert("Failed to update task. Please try again.");
    }
  }

  return (
    <div className={Styles.taskCard}>
      <form onSubmit={updateTask}>
        <div className={Styles.editForm}>
          <h3 className={Styles.editTitle}>Edit Task</h3>
          <input 
            value={inputValues.title}
            onChange={handleInputValues}
            type="text"
            name="title"
            className={Styles.taskInput}
            placeholder="Update task title"
            maxLength={100}
          />
          <textarea
            value={inputValues.description}
            onChange={handleInputValues}
            name="description"
            className={Styles.taskInput}
            placeholder="Update task description"
            rows={4}
            maxLength={500}
          />
          <label className={Styles.checkboxLabel}>
            <input
              type="checkbox"
              name="isComplete"
              checked={inputValues.isComplete}
              onChange={handleInputValues}
            />
            Mark as Complete
          </label>
          <div className={Styles.editActions}>
            <button type="submit" className={Styles.saveButton}>
              💾 Save Changes
            </button>
            <button type="button" onClick={toggle} className={Styles.cancelButton}>
              ❌ Cancel
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
