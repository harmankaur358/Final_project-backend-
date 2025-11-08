import { Router } from "express";
import {
  createForecast,
  getForecasts,
  getForecastById,
  getForecastsByLocation,
  updateForecast,
  deleteForecast
} from "../controllers/forecastController";
import * as schema from "../validation/forecast";
import { validateRequest } from "../middleware/validattion";

const router = Router();

/**
 * @openapi
 * /forecasts:
 *   post:
 *     summary: Create a new forecast
 *     tags: [Forecasts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateForecast'
 *     responses:
 *       '201':
 *         description: Forecast created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   $ref: '#/components/schemas/CreateForecast'
 *                 message:
 *                   type: string
 */
router.post("/", validateRequest(schema.createForecastSchema), createForecast);

/**
 * @openapi
 * /forecasts:
 *   get:
 *     summary: Get all forecasts
 *     tags: [Forecasts]
 *     responses:
 *       '200':
 *         description: Successfully retrieved all forecasts
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/CreateForecast'
 *                 message:
 *                   type: string
 */
router.get("/", getForecasts);

/**
 * @openapi
 * /forecasts/{id}:
 *   get:
 *     summary: Get a forecast by ID
 *     tags: [Forecasts]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the forecast
 *     responses:
 *       '200':
 *         description: Forecast retrieved successfully
 *       '404':
 *         description: Forecast not found
 */
router.get("/:id", getForecastById);

/**
 * @openapi
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
 *         description: The ID of the location
 *     responses:
 *       '200':
 *         description: Forecasts retrieved successfully
 *       '404':
 *         description: No forecasts found for this location
 */
router.get("/location/:locationId", getForecastsByLocation);

/**
 * @openapi
 * /forecasts/{id}:
 *   put:
 *     summary: Update a forecast
 *     tags: [Forecasts]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the forecast to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateForecast'
 *     responses:
 *       '200':
 *         description: Forecast updated successfully
 *       '404':
 *         description: Forecast not found
 */
router.put("/:id", validateRequest(schema.updateForecastSchema, "body"), updateForecast);

/**
 * @openapi
 * /forecasts/{id}:
 *   delete:
 *     summary: Delete a forecast
 *     tags: [Forecasts]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the forecast to delete
 *     responses:
 *       '200':
 *         description: Forecast deleted successfully
 *       '404':
 *         description: Forecast not found
 */
router.delete("/:id", deleteForecast);

export default router;

