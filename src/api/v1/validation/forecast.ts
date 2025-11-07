import Joi from "joi";

export const createForecastSchema = Joi.object({
  id: Joi.string().optional(),
  locationId: Joi.string().required(),
  temperature: Joi.number().required(),
  humidity: Joi.number().min(0).max(100).required(),
  windSpeed: Joi.number().min(0).required(),
  date: Joi.date().iso().optional(),
});

export const updateForecastSchema = Joi.object({
  id: Joi.string().optional(),
  locationId: Joi.string().optional(),
  temperature: Joi.number().optional(),
  humidity: Joi.number().min(0).max(100).optional(),
  windSpeed: Joi.number().min(0).optional(),
  date: Joi.date().iso().optional(),
});

export const forecastIdSchema = Joi.object({
  id: Joi.string().required(),
});
