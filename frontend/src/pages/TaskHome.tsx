import { Navbar } from "../components/Navbar";
import Styles from "../App.module.css";
import { CreateTask } from "../components/CreateTask";
import { Task } from "../components/Task";
import { useContext } from "react";
import { TasksContext } from "../components/context/TaskContext";

export const TaskHome = () => {
  const context = useContext(TasksContext);
  
  if(!context) {
    return <div className={Styles.loading}>Loading...</div>
  }
  const { tasks } = context;

  return (
    <div className={Styles.dashboard}>
      <Navbar />
      <main className={Styles.mainContent}>
        <CreateTask />
        <div className={Styles.tasksList}>
          {Array.isArray(tasks) && tasks.map((task) => (
            <Task key={task.id} task={task} />
          ))}
        </div>
      </main>
    </div>
  );
};
