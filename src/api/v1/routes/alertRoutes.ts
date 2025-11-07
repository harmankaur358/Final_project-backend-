import { Router } from "express";
import {
  createAlert,
  getAlerts,
  getAlertById,
  getAlertsByLocation,
  updateAlert,
  deleteAlert
} from "../controllers/alertsController";
import * as schema from "../validation/alert"
import { validateRequest } from "../middleware/validattion";

const router = Router();

router.post("/",validateRequest(schema.createAlertSchema), createAlert);
router.get("/", getAlerts);
router.get("/:id", getAlertById);
router.get("/location/:locationId", getAlertsByLocation);
router.put("/:id", validateRequest(schema.updateAlertSchema, "body"),updateAlert);
router.delete("/:id", deleteAlert);

export default router;
