import Joi from "joi";

/**
 * @openapi
 * components:
 *   schemas:
 *     CreateLocationRequest:
 *       type: object
 *       required:
 *         - name
 *         - country
 *         - latitude
 *         - longitude
 *       properties:
 *         id:
 *           type: string
 *           description: Optional custom location ID
 *           example: "loc_123abc"
 *         name:
 *           type: string
 *           minLength: 2
 *           maxLength: 100
 *           description: Name of the location
 *           example: "Toronto"
 *         country:
 *           type: string
 *           minLength: 2
 *           maxLength: 100
 *           description: Country of the location
 *           example: "Canada"
 *         latitude:
 *           type: number
 *           minimum: -90
 *           maximum: 90
 *           description: Latitude of the location
 *           example: 43.65107
 *         longitude:
 *           type: number
 *           minimum: -180
 *           maximum: 180
 *           description: Longitude of the location
 *           example: -79.347015
 */
export const createLocationSchema = Joi.object({
  id: Joi.string().optional(),
  name: Joi.string().min(2).max(100).required(),
  country: Joi.string().min(2).max(100).required(),
  latitude: Joi.number().min(-90).max(90).required(),
  longitude: Joi.number().min(-180).max(180).required(),
});

/**
 * @openapi
 * components:
 *   schemas:
 *     UpdateLocationRequest:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: Optional location ID
 *           example: "loc_123abc"
 *         name:
 *           type: string
 *           minLength: 2
 *           maxLength: 100
 *           description: Name of the location
 *           example: "Toronto"
 *         country:
 *           type: string
 *           minLength: 2
 *           maxLength: 100
 *           description: Country of the location
 *           example: "Canada"
 *         latitude:
 *           type: number
 *           minimum: -90
 *           maximum: 90
 *           description: Latitude of the location
 *           example: 43.65107
 *         longitude:
 *           type: number
 *           minimum: -180
 *           maximum: 180
 *           description: Longitude of the location
 *           example: -79.347015
 */
export const updateLocationSchema = Joi.object({
  id: Joi.string().optional(),
  name: Joi.string().min(2).max(100).optional(),
  country: Joi.string().min(2).max(100).optional(),
  latitude: Joi.number().min(-90).max(90).optional(),
  longitude: Joi.number().min(-180).max(180).optional(),
});

/**
 * @openapi
 * components:
 *   schemas:
 *     LocationIdParam:
 *       type: object
 *       required:
 *         - id
 *       properties:
 *         id:
 *           type: string
 *           description: Unique identifier of the location
 *           example: "loc_123abc"
 */
export const locationIdSchema = Joi.object({
  id: Joi.string().required(),
});
