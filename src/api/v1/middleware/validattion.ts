import { Request, Response, NextFunction } from "express";
import Joi from "joi";
 
export const validateRequest = (schema: Joi.ObjectSchema, property: "body" | "params" = "body") => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req[property]);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    next();
  };
};
 
