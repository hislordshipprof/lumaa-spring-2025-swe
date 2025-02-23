import express from "express";
import { RequestHandler } from "express";
import { register, login } from "../controllers/userController";
import { registerValidation } from "../middleware/validate";

const router = express.Router();

router.post("/register", registerValidation, register as RequestHandler);
router.post("/login", registerValidation, login as RequestHandler);

export default router; 