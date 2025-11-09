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
