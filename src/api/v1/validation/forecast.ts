import Joi from "joi";

/**
 * @openapi
 * components:
 *   schemas:
 *     CreateForecastRequest:
 *       type: object
 *       required:
 *         - locationId
 *         - temperature
 *         - humidity
 *         - windSpeed
 *       properties:
 *         id:
 *           type: string
 *           description: Optional custom forecast ID
 *           example: "forecast_123abc"
 *         locationId:
 *           type: string
 *           description: The location ID for the forecast
 *           example: "loc_456def"
 *         temperature:
 *           type: number
 *           description: Temperature in Celsius
 *           example: 25
 *         humidity:
 *           type: number
 *           minimum: 0
 *           maximum: 100
 *           description: Humidity percentage
 *           example: 65
 *         windSpeed:
 *           type: number
 *           minimum: 0
 *           description: Wind speed in km/h
 *           example: 15
 *         date:
 *           type: string
 *           format: date-time
 *           description: Optional date of the forecast
 *           example: "2025-11-08T08:00:00Z"
 */
export const createForecastSchema = Joi.object({
  id: Joi.string().optional(),
  locationId: Joi.string().required(),
  temperature: Joi.number().required(),
  humidity: Joi.number().min(0).max(100).required(),
  windSpeed: Joi.number().min(0).required(),
  date: Joi.date().iso().optional(),
});

/**
 * @openapi
 * components:
 *   schemas:
 *     UpdateForecastRequest:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: Optional forecast ID
 *           example: "forecast_123abc"
 *         locationId:
 *           type: string
 *           description: Location ID for the forecast
 *           example: "loc_456def"
 *         temperature:
 *           type: number
 *           description: Temperature in Celsius
 *           example: 28
 *         humidity:
 *           type: number
 *           minimum: 0
 *           maximum: 100
 *           description: Humidity percentage
 *           example: 70
 *         windSpeed:
 *           type: number
 *           minimum: 0
 *           description: Wind speed in km/h
 *           example: 20
 *         date:
 *           type: string
 *           format: date-time
 *           description: Date of the forecast
 *           example: "2025-11-09T08:00:00Z"
 */
export const updateForecastSchema = Joi.object({
  id: Joi.string().optional(),
  locationId: Joi.string().optional(),
  temperature: Joi.number().optional(),
  humidity: Joi.number().min(0).max(100).optional(),
  windSpeed: Joi.number().min(0).optional(),
  date: Joi.date().iso().optional(),
});

/**
 * @openapi
 * components:
 *   schemas:
 *     ForecastIdParam:
 *       type: object
 *       required:
 *         - id
 *       properties:
 *         id:
 *           type: string
 *           description: Unique identifier of the forecast
 *           example: "forecast_123abc"
 */
export const forecastIdSchema = Joi.object({
  id: Joi.string().required(),
});
