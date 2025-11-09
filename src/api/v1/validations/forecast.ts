import Joi from "joi";

/**
 * @openapi
 * components:
 *   schemas:
 *     Forecast:
 *       type: object
 *       required:
 *         - locationId
 *         - temperature
 *         - humidity
 *         - windSpeed
 *       properties:
 *         id:
 *           type: string
 *           description: Unique identifier for the forecast
 *           example: "forecast_001"
 *         locationId:
 *           type: string
 *           description: ID of the location this forecast belongs to
 *           example: "loc_123"
 *         temperature:
 *           type: number
 *           description: Predicted temperature in Celsius
 *           example: 24.5
 *         humidity:
 *           type: number
 *           minimum: 0
 *           maximum: 100
 *           description: Humidity percentage (0–100)
 *           example: 72
 *         windSpeed:
 *           type: number
 *           minimum: 0
 *           description: Wind speed in km/h
 *           example: 15
 *         date:
 *           type: string
 *           format: date-time
 *           description: ISO 8601 date and time of the forecast
 *           example: "2025-11-09T10:00:00Z"
 *
 *     CreateForecastInput:
 *       allOf:
 *         - $ref: '#/components/schemas/Forecast'
 *       required:
 *         - locationId
 *         - temperature
 *         - humidity
 *         - windSpeed
 *       description: Schema for creating a new weather forecast
 *
 *     UpdateForecastInput:
 *       type: object
 *       description: Schema for updating an existing weather forecast
 *       properties:
 *         locationId:
 *           type: string
 *           description: ID of the location this forecast belongs to
 *           example: "loc_123"
 *         temperature:
 *           type: number
 *           example: 26.3
 *         humidity:
 *           type: number
 *           minimum: 0
 *           maximum: 100
 *           example: 65
 *         windSpeed:
 *           type: number
 *           minimum: 0
 *           example: 18
 *         date:
 *           type: string
 *           format: date-time
 *           example: "2025-11-10T06:00:00Z"
 *
 *     ForecastIdParam:
 *       type: object
 *       required:
 *         - id
 *       properties:
 *         id:
 *           type: string
 *           description: Unique identifier of the forecast
 *           example: "forecast_001"
 */

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
