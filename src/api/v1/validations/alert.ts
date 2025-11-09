import Joi from "joi";

/**
 * @openapi
 * components:
 *   schemas:
 *     Alert:
 *       type: object
 *       required:
 *         - locationId
 *         - type
 *         - description
 *         - severity
 *         - startTime
 *         - endTime
 *       properties:
 *         id:
 *           type: string
 *           description: Unique identifier for the alert
 *           example: "alert_001"
 *         locationId:
 *           type: string
 *           description: ID of the location associated with the alert
 *           example: "loc_123"
 *         type:
 *           type: string
 *           enum: [Storm, Rain, Snow, Heat, Cold]
 *           description: Type of weather alert
 *           example: "Storm"
 *         description:
 *           type: string
 *           minLength: 5
 *           maxLength: 500
 *           description: Detailed description of the weather alert
 *           example: "Severe thunderstorm expected with high winds and heavy rainfall."
 *         severity:
 *           type: string
 *           enum: [Low, Medium, High, Critical]
 *           description: Level of alert severity
 *           example: "High"
 *         startTime:
 *           type: string
 *           format: date-time
 *           description: ISO 8601 start time of the alert
 *           example: "2025-11-09T10:00:00Z"
 *         endTime:
 *           type: string
 *           format: date-time
 *           description: ISO 8601 end time of the alert
 *           example: "2025-11-09T18:00:00Z"
 *
 *     CreateAlertInput:
 *       allOf:
 *         - $ref: '#/components/schemas/Alert'
 *       required:
 *         - locationId
 *         - type
 *         - description
 *         - severity
 *         - startTime
 *         - endTime
 *       description: Schema for creating a new alert
 *
 *     UpdateAlertInput:
 *       type: object
 *       description: Schema for updating an existing alert
 *       properties:
 *         locationId:
 *           type: string
 *           description: ID of the location associated with the alert
 *           example: "loc_123"
 *         type:
 *           type: string
 *           enum: [Storm, Rain, Snow, Heat, Cold]
 *           example: "Rain"
 *         description:
 *           type: string
 *           minLength: 5
 *           maxLength: 500
 *           example: "Moderate rainfall expected throughout the evening."
 *         severity:
 *           type: string
 *           enum: [Low, Medium, High, Critical]
 *           example: "Medium"
 *         startTime:
 *           type: string
 *           format: date-time
 *           example: "2025-11-09T12:00:00Z"
 *         endTime:
 *           type: string
 *           format: date-time
 *           example: "2025-11-09T20:00:00Z"
 *
 *     AlertIdParam:
 *       type: object
 *       required:
 *         - id
 *       properties:
 *         id:
 *           type: string
 *           description: Unique identifier of the alert
 *           example: "alert_001"
 */


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
