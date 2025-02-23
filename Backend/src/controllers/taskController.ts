import { RequestHandler, Request, Response, NextFunction } from "express";
import { AppDataSource } from "../config/database";
import { Task } from "../models/Entities";
import { AuthRequest } from "../middleware/auth";

type CustomRequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<any> | void;

const taskRepository = AppDataSource.getRepository(Task);

export const getTasks = async (req: AuthRequest, res: Response) => {
  try {
    console.log('Fetching tasks for user:', req.user?.id);

    if (!req.user?.id) {
      return res.status(401).json({ error: "User not authenticated" });
    }

    const tasks = await taskRepository.find({
      where: { user_id: req.user.id },
      order: { id: 'DESC' }
    });

    console.log('Tasks fetched:', tasks);
    res.json(tasks);
  } catch (error) {
    console.error('Error fetching tasks:', error);
    res.status(500).json({ 
      error: "Error fetching tasks",
      details: process.env.NODE_ENV === 'development' ? 
        (error instanceof Error ? error.message : String(error)) 
        : undefined
    });
  }
};

export const createTask: CustomRequestHandler = async (req: AuthRequest, res: Response) => {
  try {
    console.log('Creating task for user:', req.user?.id);
    console.log('Task data:', req.body);

    const { title, description } = req.body;
    
    const task = taskRepository.create({
      title,
      description,
      isComplete: false,
      user_id: req.user!.id
    });

    console.log('Task object created:', task);
    
    const savedTask = await taskRepository.save(task);
    console.log('Task saved successfully:', savedTask);

    res.status(201).json(savedTask);
  } catch (error) {
    console.error('Task creation error:', error);
    res.status(500).json({ 
      error: "Error creating task",
      details: process.env.NODE_ENV === 'development' ? 
        (error instanceof Error ? error.message : String(error)) 
        : undefined
    });
  }
};

export const updateTask = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { title, description, isComplete } = req.body;

    const task = await taskRepository.findOne({
      where: { id: Number(id), user_id: req.user!.id }
    });

    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    // Update only provided fields
    if (title !== undefined) task.title = title;
    if (description !== undefined) task.description = description;
    if (isComplete !== undefined) task.isComplete = isComplete;

    const updatedTask = await taskRepository.save(task);
    res.json(updatedTask);
  } catch (error) {
    console.error('Update task error:', error);
    res.status(500).json({ 
      error: "Error updating task",
      details: error instanceof Error ? error.message : String(error)
    });
  }
};

export const deleteTask = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const result = await taskRepository.delete({
      id: parseInt(id),
      user_id: req.user!.id,
    });

    if (result.affected === 0) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting task" });
  }
}; 