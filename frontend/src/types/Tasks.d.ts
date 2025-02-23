export interface ITaskData {
  id: number;
  title: string;
  description: string;
  isComplete: boolean;
  userId: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ICreateTaskPayload {
  title: string;
  description: string;
  isComplete: boolean;
  userId: number;
}

export interface IUpdateTaskPayload {
  title?: string;
  description?: string;
  isComplete?: boolean;
  userId?: number;
}

export interface ITaskContextType {
  tasks: ITaskData[];
  fetchTasks: () => Promise<void>;
}