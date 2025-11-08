import { Router } from "express";
import {
  createAlert,
  getAlerts,
  getAlertById,
  getAlertsByLocation,
  updateAlert,
  deleteAlert
} from "../controllers/alertController";
import * as schema from "../validation/alert";
import { validateRequest } from "../middleware/validattion";

const router = Router();

/**
 * @openapi
 * /alerts:
 *   post:
 *     summary: Create a new alert
 *     tags: [Alerts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateAlert'
 *     responses:
 *       '201':
 *         description: Alert created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   $ref: '#/components/schemas/CreateAlert'
 *                 message:
 *                   type: string
 */
router.post("/", validateRequest(schema.createAlertSchema), createAlert);

/**
 * @openapi
 * /alerts:
 *   get:
 *     summary: Get all alerts
 *     tags: [Alerts]
 *     responses:
 *       '200':
 *         description: Alerts retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/CreateAlert'
 *                 message:
 *                   type: string
 */
router.get("/", getAlerts);

/**
 * @openapi
 * /alerts/{id}:
 *   get:
 *     summary: Get an alert by ID
 *     tags: [Alerts]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the alert
 *     responses:
 *       '200':
 *         description: Alert retrieved successfully
 *       '404':
 *         description: Alert not found
 */
router.get("/:id", getAlertById);

/**
 * @openapi
 * /alerts/location/{locationId}:
 *   get:
 *     summary: Get all alerts for a specific location
 *     tags: [Alerts]
 *     parameters:
 *       - name: locationId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the location
 *     responses:
 *       '200':
 *         description: Alerts retrieved successfully
 *       '404':
 *         description: No alerts found for this location
 */
router.get("/location/:locationId", getAlertsByLocation);

/**
 * @openapi
 * /alerts/{id}:
 *   put:
 *     summary: Update an alert
 *     tags: [Alerts]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the alert to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateAlert'
 *     responses:
 *       '200':
 *         description: Alert updated successfully
 *       '404':
 *         description: Alert not found
 */
router.put("/:id", validateRequest(schema.updateAlertSchema, "body"), updateAlert);

/**
 * @openapi
 * /alerts/{id}:
 *   delete:
 *     summary: Delete an alert
 *     tags: [Alerts]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the alert to delete
 *     responses:
 *       '200':
 *         description: Alert deleted successfully
 *       '404':
 *         description: Alert not found
 */
router.delete("/:id", deleteAlert);

export default router;
