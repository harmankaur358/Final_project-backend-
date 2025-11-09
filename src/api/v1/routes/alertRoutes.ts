/**
 * @openapi
 * /alerts:
 *   post:
 *     summary: Create a new weather alert
 *     tags: [Alerts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateAlertInput'
 *     responses:
 *       '201':
 *         description: Alert created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Alert'
 *       '400':
 *         description: Invalid request data
 *
 *   get:
 *     summary: Retrieve all weather alerts
 *     tags: [Alerts]
 *     responses:
 *       '200':
 *         description: List of all alerts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Alert'
 *
 * /alerts/{id}:
 *   get:
 *     summary: Get a specific alert by its ID
 *     tags: [Alerts]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           $ref: '#/components/schemas/AlertIdParam'
 *     responses:
 *       '200':
 *         description: Alert details retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Alert'
 *       '404':
 *         description: Alert not found
 *
 *   put:
 *     summary: Update an existing alert by its ID
 *     tags: [Alerts]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           $ref: '#/components/schemas/AlertIdParam'
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateAlertInput'
 *     responses:
 *       '200':
 *         description: Alert updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Alert'
 *       '400':
 *         description: Invalid update data
 *       '404':
 *         description: Alert not found
 *
 *   delete:
 *     summary: Delete an alert by its ID
 *     tags: [Alerts]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           $ref: '#/components/schemas/AlertIdParam'
 *     responses:
 *       '200':
 *         description: Alert deleted successfully
 *       '404':
 *         description: Alert not found
 *
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
 *           description: ID of the location to fetch alerts for
 *           example: "loc_123"
 *     responses:
 *       '200':
 *         description: Alerts for the given location
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Alert'
 *       '404':
 *         description: No alerts found for this location
 */

import { Router } from "express";
import {
  createAlert,
  getAlerts,
  getAlertById,
  getAlertsByLocation,
  updateAlert,
  deleteAlert
} from "../controllers/alertController";
import * as schema from "../validations/alert";
import { validateRequest } from "../middleware/validattion";

const router = Router();

router.post("/", validateRequest(schema.createAlertSchema), createAlert);
router.get("/", getAlerts);
router.get("/:id", getAlertById);
router.get("/location/:locationId", getAlertsByLocation);
router.put("/:id", validateRequest(schema.updateAlertSchema, "body"), updateAlert);
router.delete("/:id", deleteAlert);

export default router;
