import Joi from "joi";

export const createAlertSchema = Joi.object({
  id: Joi.string().optional(),
  locationId: Joi.string().required(),
  type: Joi.string().valid("Storm", "Rain", "Snow", "Heat", "Cold").required(),
  description: Joi.string().min(5).max(500).required(),
  severity: Joi.string().valid("Low", "Medium", "High", "Critical").required(),
  startTime: Joi.date().iso().required(),
  endTime: Joi.date().iso().required(),
});


export const updateAlertSchema = Joi.object({
  id: Joi.string().optional(),
  locationId: Joi.string().optional(),
  type: Joi.string().valid("Storm", "Rain", "Snow", "Heat", "Cold").optional(),
  description: Joi.string().min(5).max(500).optional(),
  severity: Joi.string().valid("Low", "Medium", "High", "Critical").optional(),
  startTime: Joi.date().iso().optional(),
  endTime: Joi.date().iso().optional(),
});


export const alertIdSchema = Joi.object({
  id: Joi.string().required(),
});
