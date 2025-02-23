// Create a new file for shared types
export interface ITask {
  id: number;
  title: string;
  description?: string;
  isComplete: boolean;
  userId: number;
  createdAt: Date;
}

export interface IUser {
  id: number;
  username: string;
  password: string;
} 