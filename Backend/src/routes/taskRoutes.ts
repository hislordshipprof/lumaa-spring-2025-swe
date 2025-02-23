import express, { RequestHandler } from "express";
import { getTasks, createTask, updateTask, deleteTask } from "../controllers/taskController";
import { authMiddleware } from "../middleware/auth";
import { taskValidation, taskIdValidation } from "../middleware/validate";

const router = express.Router();

// All routes are protected with authMiddleware
router.use(authMiddleware);

router.get("/", getTasks as RequestHandler);
router.post("/", taskValidation, createTask as RequestHandler);
router.put("/:id", taskIdValidation, taskValidation, updateTask as RequestHandler);
router.delete("/:id", taskIdValidation, deleteTask as RequestHandler);

export default router; 