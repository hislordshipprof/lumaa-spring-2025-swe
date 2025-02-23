import { createContext, useState, useEffect, ReactNode } from "react";
import {  taskApi } from "../../utils/api";
import { ITaskContextType, ITaskData } from "../../types/Tasks";

export const TasksContext = createContext<ITaskContextType | null>(null);

export const TasksProvider = ({ children }: { children: ReactNode }) => {
  const [tasks, setTasks] = useState<ITaskData[]>([]);

  const fetchTasks = async () => {
    try {
      const data = await taskApi.getAllTasks();
      setTasks(data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
      setTasks([]);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <TasksContext.Provider value={{ tasks, fetchTasks }}>
      {children}
    </TasksContext.Provider>
  );
};
