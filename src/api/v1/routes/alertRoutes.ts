import { Router } from "express";
import {
  createAlert,
  getAlerts,
  getAlertById,
  getAlertsByLocation,
  updateAlert,
  deleteAlert
} from "../controllers/alertsController";

const router = Router();

router.post("/", createAlert);
router.get("/", getAlerts);
router.get("/:id", getAlertById);
router.get("/location/:locationId", getAlertsByLocation);
router.put("/:id", updateAlert);
router.delete("/:id", deleteAlert);

export default router;
