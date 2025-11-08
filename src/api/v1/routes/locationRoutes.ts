import { Router } from "express";
import {
  createLocation,
  getLocations,
  getLocationById,
  updateLocation,
  deleteLocation
} from "../controllers/locationController"
import * as schema from "../validation/location"
import { validateRequest } from "../middleware/validattion";

const router = Router();

router.post("/", validateRequest(schema.createLocationSchema),createLocation);
router.get("/", getLocations);
router.get("/:id", getLocationById);
router.put("/:id", validateRequest(schema.updateLocationSchema, "body"),updateLocation);
router.delete("/:id", deleteLocation);

export default router;
