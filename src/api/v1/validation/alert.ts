import Joi from "joi";

/**
 * @openapi
 * components:
 *   schemas:
 *     CreateAlertRequest:
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
 *           description: Optional custom alert ID
 *           example: "alert_123abc"
 *         locationId:
 *           type: string
 *           description: The location ID where the alert is issued
 *           example: "loc_456def"
 *         type:
 *           type: string
 *           enum: [Storm, Rain, Snow, Heat, Cold]
 *           description: Type of alert
 *           example: "Storm"
 *         description:
 *           type: string
 *           minLength: 5
 *           maxLength: 500
 *           description: Details about the alert
 *           example: "Severe storm expected with strong winds up to 80 km/h."
 *         severity:
 *           type: string
 *           enum: [Low, Medium, High, Critical]
 *           description: Alert severity level
 *           example: "High"
 *         startTime:
 *           type: string
 *           format: date-time
 *           description: When the alert starts
 *           example: "2025-11-08T08:00:00Z"
 *         endTime:
 *           type: string
 *           format: date-time
 *           description: When the alert ends
 *           example: "2025-11-08T18:00:00Z"
 */
export const createAlertSchema = Joi.object({
  id: Joi.string().optional(),
  locationId: Joi.string().required(),
  type: Joi.string().valid("Storm", "Rain", "Snow", "Heat", "Cold").required(),
  description: Joi.string().min(5).max(500).required(),
  severity: Joi.string()
    .valid("Low", "Medium", "High", "Critical")
    .required(),
  startTime: Joi.date().iso().required(),
  endTime: Joi.date().iso().required(),
});

/**
 * @openapi
 * components:
 *   schemas:
 *     UpdateAlertRequest:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: Optional custom alert ID
 *           example: "alert_123abc"
 *         locationId:
 *           type: string
 *           description: The location ID where the alert is issued
 *           example: "loc_456def"
 *         type:
 *           type: string
 *           enum: [Storm, Rain, Snow, Heat, Cold]
 *           description: Type of alert
 *           example: "Storm"
 *         description:
 *           type: string
 *           minLength: 5
 *           maxLength: 500
 *           description: Details about the alert
 *           example: "Updated description of the alert."
 *         severity:
 *           type: string
 *           enum: [Low, Medium, High, Critical]
 *           description: Alert severity level
 *           example: "Critical"
 *         startTime:
 *           type: string
 *           format: date-time
 *           description: When the alert starts
 *           example: "2025-11-08T09:00:00Z"
 *         endTime:
 *           type: string
 *           format: date-time
 *           description: When the alert ends
 *           example: "2025-11-08T20:00:00Z"
 */
export const updateAlertSchema = Joi.object({
  id: Joi.string().optional(),
  locationId: Joi.string().optional(),
  type: Joi.string().valid("Storm", "Rain", "Snow", "Heat", "Cold").optional(),
  description: Joi.string().min(5).max(500).optional(),
  severity: Joi.string()
    .valid("Low", "Medium", "High", "Critical")
    .optional(),
  startTime: Joi.date().iso().optional(),
  endTime: Joi.date().iso().optional(),
});

/**
 * @openapi
 * components:
 *   schemas:
 *     AlertIdParam:
 *       type: object
 *       required:
 *         - id
 *       properties:
 *         id:
 *           type: string
 *           description: Unique identifier of the alert
 *           example: "alert_123abc"
 */
export const alertIdSchema = Joi.object({
  id: Joi.string().required(),
});
