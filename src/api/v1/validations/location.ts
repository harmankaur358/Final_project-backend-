import Joi from "joi";


export const createLocationSchema = Joi.object({
  id: Joi.string().optional(),
  name: Joi.string().min(2).max(100).required(),
  country: Joi.string().min(2).max(100).required(),
  latitude: Joi.number().min(-90).max(90).required(),
  longitude: Joi.number().min(-180).max(180).required(),
});

export const updateLocationSchema = Joi.object({
  id: Joi.string().optional(),
  name: Joi.string().min(2).max(100).optional(),
  country: Joi.string().min(2).max(100).optional(),
  latitude: Joi.number().min(-90).max(90).optional(),
  longitude: Joi.number().min(-180).max(180).optional(),
});

export const locationIdSchema = Joi.object({
  id: Joi.string().required(),
});
