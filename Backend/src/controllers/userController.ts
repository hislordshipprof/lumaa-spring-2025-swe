import { Request, Response, NextFunction } from "express";
import { AppDataSource } from "../config/database";
import { User } from "../models/Entities";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userRepository = AppDataSource.getRepository(User);

type CustomRequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<any> | void;

export const register = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    console.log('Registration attempt:', { username });

    const existingUser = await userRepository.findOne({ where: { username } });
    if (existingUser) {
      return res.status(400).json({ error: "Username already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = userRepository.create({
      username,
      password: hashedPassword,
    });

    const savedUser = await userRepository.save(user);
    console.log('User saved successfully:', { id: savedUser.id });

    // Generate token for immediate login after registration
    const token = jwt.sign(
      { id: savedUser.id, username: savedUser.username },
      process.env.JWT_SECRET!,
      { expiresIn: "24h" }
    );

    // Return both success message and token
    res.status(201).json({ 
      message: "User created successfully",
      token,
      user: { id: savedUser.id, username: savedUser.username }
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: "Error creating user" });
  }
};

export const login: CustomRequestHandler = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find user
    const user = await userRepository.findOne({ where: { username } });
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Check password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Generate token
    const token = jwt.sign(
      { id: user.id, username: user.username },
      process.env.JWT_SECRET!,
      { expiresIn: "24h" }
    );

    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: "Error logging in" });
  }
}; 