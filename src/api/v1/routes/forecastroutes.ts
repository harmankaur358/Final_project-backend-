/**
 * @openapi
 * /forecasts:
 *   post:
 *     summary: Create a new weather forecast
 *     tags: [Forecasts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateForecastInput'
 *     responses:
 *       '201':
 *         description: Forecast created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Forecast'
 *       '400':
 *         description: Invalid request data
 *
 *   get:
 *     summary: Retrieve all weather forecasts
 *     tags: [Forecasts]
 *     responses:
 *       '200':
 *         description: List of all forecasts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Forecast'
 *
 * /forecasts/{id}:
 *   get:
 *     summary: Get a specific forecast by its ID
 *     tags: [Forecasts]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           $ref: '#/components/schemas/ForecastIdParam'
 *     responses:
 *       '200':
 *         description: Forecast retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Forecast'
 *       '404':
 *         description: Forecast not found
 *
 *   put:
 *     summary: Update an existing forecast by its ID
 *     tags: [Forecasts]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           $ref: '#/components/schemas/ForecastIdParam'
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateForecastInput'
 *     responses:
 *       '200':
 *         description: Forecast updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Forecast'
 *       '400':
 *         description: Invalid update data
 *       '404':
 *         description: Forecast not found
 *
 *   delete:
 *     summary: Delete a forecast by its ID
 *     tags: [Forecasts]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           $ref: '#/components/schemas/ForecastIdParam'
 *     responses:
 *       '200':
 *         description: Forecast deleted successfully
 *       '404':
 *         description: Forecast not found
 *
 * /forecasts/location/{locationId}:
 *   get:
 *     summary: Get all forecasts for a specific location
 *     tags: [Forecasts]
 *     parameters:
 *       - name: locationId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           description: ID of the location to fetch forecasts for
 *           example: "loc_123"
 *     responses:
 *       '200':
 *         description: Forecasts for the given location
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Forecast'
 *       '404':
 *         description: No forecasts found for this location
 */

import { Router } from "express";
import {
  createForecast,
  getForecasts,
  getForecastById,
  getForecastsByLocation,
  updateForecast,
  deleteForecast
} from "../controllers/forecastController";
import * as schema from "../validations/forecast";
import { validateRequest } from "../middleware/validattion";
import isAuthorized from "../middleware/authorize";

const router = Router();

router.post("/", isAuthorized({hasRole: ["admin", "manager"]}),validateRequest(schema.createForecastSchema), createForecast);
router.get("/",isAuthorized({hasRole: ["admin", "manager", "user"]}), getForecasts);
router.get("/:id", isAuthorized({hasRole: ["admin", "manager", "user"]}),getForecastById);
router.get("/location/:locationId", isAuthorized({hasRole: ["admin", "manager", "user"]}),getForecastsByLocation);
router.put("/:id",isAuthorized({hasRole: ["admin", "manager"]}), validateRequest(schema.updateForecastSchema, "body"), updateForecast);
router.delete("/:id",isAuthorized({hasRole: ["admin", "manager"]}), deleteForecast);

export default router;
