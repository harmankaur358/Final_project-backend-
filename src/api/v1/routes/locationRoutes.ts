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
 *             $ref: '#/components/schemas/CreateLocationInput'
 *     responses:
 *       '201':
 *         description: Location created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Location'
 *       '400':
 *         description: Invalid request data
 *
 *   get:
 *     summary: Retrieve all locations
 *     tags: [Locations]
 *     responses:
 *       '200':
 *         description: List of all locations
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Location'
 *
 * /locations/{id}:
 *   get:
 *     summary: Get a specific location by ID
 *     tags: [Locations]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           $ref: '#/components/schemas/LocationIdParam'
 *     responses:
 *       '200':
 *         description: Location retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Location'
 *       '404':
 *         description: Location not found
 *
 *   put:
 *     summary: Update a location by ID
 *     tags: [Locations]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           $ref: '#/components/schemas/LocationIdParam'
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateLocationInput'
 *     responses:
 *       '200':
 *         description: Location updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Location'
 *       '400':
 *         description: Invalid update data
 *       '404':
 *         description: Location not found
 *
 *   delete:
 *     summary: Delete a location by ID
 *     tags: [Locations]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           $ref: '#/components/schemas/LocationIdParam'
 *     responses:
 *       '200':
 *         description: Location deleted successfully
 *       '404':
 *         description: Location not found
 */
import { Router } from "express";
import {
  createLocation,
  getLocations,
  getLocationById,
  updateLocation,
  deleteLocation
} from "../controllers/locationController";
import * as schema from "../validations/location";
import { validateRequest } from "../middleware/validattion";

const router = Router();

router.post("/", validateRequest(schema.createLocationSchema), createLocation);
router.get("/", getLocations);
router.get("/:id", validateRequest(schema.locationIdSchema, "params"), getLocationById);
router.put("/:id", validateRequest(schema.updateLocationSchema, "body"), updateLocation);
router.delete("/:id", validateRequest(schema.locationIdSchema, "params"), deleteLocation);

export default router;
