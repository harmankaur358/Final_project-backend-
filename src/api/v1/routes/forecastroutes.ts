import { Router } from "express";
import {
  createForecast,
  getForecasts,
  getForecastById,
  getForecastsByLocation,
  updateForecast,
  deleteForecast
} from "../controllers/forecastsController";
import * as schema from "../validation/forecast"
import { validateRequest } from "../middleware/validattion";

const router = Router();

router.post("/", validateRequest(schema.createForecastSchema),createForecast);
router.get("/", getForecasts);
router.get("/:id", getForecastById);
router.get("/location/:locationId", getForecastsByLocation);
router.put("/:id", validateRequest(schema.updateForecastSchema,"body"),updateForecast);
router.delete("/:id", deleteForecast);

export default router;
