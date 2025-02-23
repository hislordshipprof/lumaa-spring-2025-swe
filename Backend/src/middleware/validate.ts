import { body, param, ValidationChain, validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";

const validate = (validations: ValidationChain[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    await Promise.all(validations.map(validation => validation.run(req)));

    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }

    res.status(400).json({ 
      error: "Validation failed",
      details: errors.array()[0].msg 
    });
  };
};

export const registerValidation = validate([
  body("username")
    .isString()
    .trim()
    .isLength({ min: 3 })
    .withMessage("Username must be at least 3 characters long"),
  body("password")
    .isString()
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long")
]);

export const taskValidation = validate([
  body("title").optional().isString().trim().notEmpty(),
  body("description").optional().isString(),
  body("isComplete").optional().isBoolean()
]);

export const taskIdValidation = validate([
  param("id").isInt()
]); 