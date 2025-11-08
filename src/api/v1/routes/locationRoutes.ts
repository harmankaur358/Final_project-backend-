import { Router } from "express";
import {
  createLocation,
  getLocations,
  getLocationById,
  updateLocation,
  deleteLocation
} from "../controllers/locationController";
import * as schema from "../validation/location";
import { validateRequest } from "../middleware/validattion";

const router = Router();

/**
 * @openapi
 * /locations:
 *   post:
 *     summary: Create a new location
 *     tags: [Locations]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateLocation'
 *     responses:
 *       '201':
 *         description: Location created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   $ref: '#/components/schemas/CreateLocation'
 *                 message:
 *                   type: string
 */
router.post("/", validateRequest(schema.createLocationSchema), createLocation);

/**
 * @openapi
 * /locations:
 *   get:
 *     summary: Get all locations
 *     tags: [Locations]
 *     responses:
 *       '200':
 *         description: Successfully retrieved all locations
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/CreateLocation'
 *                 message:
 *                   type: string
 */
router.get("/", getLocations);

/**
 * @openapi
 * /locations/{id}:
 *   get:
 *     summary: Get a location by ID
 *     tags: [Locations]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the location
 *     responses:
 *       '200':
 *         description: Location retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   $ref: '#/components/schemas/CreateLocation'
 *                 message:
 *                   type: string
 *       '404':
 *         description: Location not found
 */
router.get("/:id", getLocationById);

/**
 * @openapi
 * /locations/{id}:
 *   put:
 *     summary: Update a location
 *     tags: [Locations]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the location to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateLocation'
 *     responses:
 *       '200':
 *         description: Location updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   $ref: '#/components/schemas/UpdateLocation'
 *                 message:
 *                   type: string
 *       '404':
 *         description: Location not found
 */
router.put("/:id", validateRequest(schema.updateLocationSchema, "body"), updateLocation);

/**
 * @openapi
 * /locations/{id}:
 *   delete:
 *     summary: Delete a location
 *     tags: [Locations]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the location to delete
 *     responses:
 *       '200':
 *         description: Location deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: boolean
 *                 message:
 *                   type: string
 *       '404':
 *         description: Location not found
 */
router.delete("/:id", deleteLocation);

export default router;
