import Joi from "joi";

/**
 * @openapi
 * components:
 *   schemas:
 *     Location:
 *       type: object
 *       required:
 *         - name
 *         - country
 *         - latitude
 *         - longitude
 *       properties:
 *         id:
 *           type: string
 *           description: Unique identifier for the location
 *           example: "loc_001"
 *         name:
 *           type: string
 *           minLength: 2
 *           maxLength: 100
 *           description: Name of the location (e.g., city or region)
 *           example: "Winnipeg"
 *         country:
 *           type: string
 *           minLength: 2
 *           maxLength: 100
 *           description: Country where the location is situated
 *           example: "Canada"
 *         latitude:
 *           type: number
 *           minimum: -90
 *           maximum: 90
 *           description: Geographic latitude of the location
 *           example: 49.8951
 *         longitude:
 *           type: number
 *           minimum: -180
 *           maximum: 180
 *           description: Geographic longitude of the location
 *           example: -97.1384
 *
 *     CreateLocationInput:
 *       allOf:
 *         - $ref: '#/components/schemas/Location'
 *       required:
 *         - name
 *         - country
 *         - latitude
 *         - longitude
 *       description: Schema for creating a new location
 *
 *     UpdateLocationInput:
 *       type: object
 *       description: Schema for updating an existing location
 *       properties:
 *         name:
 *           type: string
 *           minLength: 2
 *           maxLength: 100
 *           example: "Toronto"
 *         country:
 *           type: string
 *           minLength: 2
 *           maxLength: 100
 *           example: "Canada"
 *         latitude:
 *           type: number
 *           minimum: -90
 *           maximum: 90
 *           example: 43.65107
 *         longitude:
 *           type: number
 *           minimum: -180
 *           maximum: 180
 *           example: -79.347015
 *
 *     LocationIdParam:
 *       type: object
 *       required:
 *         - id
 *       properties:
 *         id:
 *           type: string
 *           description: Unique identifier of the location
 *           example: "loc_001"
 */
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
