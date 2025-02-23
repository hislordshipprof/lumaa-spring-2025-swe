import Styles from "../App.module.css"
import { ITaskData } from "../types/Tasks";
import { useContext, useState } from "react";
import { TasksContext } from "./context/TaskContext";
import { EditTask } from "./EditTask";
import { taskApi } from "../utils/api";

export const Task = ({ task }: { task: ITaskData }) => {
  const [isEditing, setIsEditing] = useState(false);
  const context = useContext(TasksContext);
    
  if(!context) {
    return <div className={Styles.loading}>Loading...</div>
  }
  const { fetchTasks } = context

  const deleteTask = async() => {
    try {
      await taskApi.deleteTask(task.id);
      await fetchTasks();
    } catch (error) {
      console.error(error);
    }
  }

  if (isEditing) {
    return <EditTask task={task} toggle={() => setIsEditing(false)} />;
  }

  return (
    <div className={Styles.taskCard}>
      <div className={Styles.taskHeader}>
        <h2 className={Styles.taskTitle}>{task.title}</h2>
        <span className={`${Styles.taskStatus} ${task.isComplete ? Styles.completed : Styles.inProgress}`}>
          {task.isComplete ? "Completed" : "In Progress"}
        </span>
      </div>
      <p className={Styles.taskDescription}>{task.description}</p>
      <div className={Styles.taskActions}>
        <button 
          className={Styles.editButton} 
          onClick={() => setIsEditing(true)}
        >
          Edit
        </button>
        <button 
          className={Styles.deleteButton} 
          onClick={deleteTask}
        >
          Delete
        </button>
      </div>
    </div>
  );
}
