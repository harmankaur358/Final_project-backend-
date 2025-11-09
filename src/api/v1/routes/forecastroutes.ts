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

const router = Router();

router.post("/", validateRequest(schema.createForecastSchema), createForecast);
router.get("/", getForecasts);
router.get("/:id", validateRequest(schema.forecastIdSchema, "params"), getForecastById);
router.get("/location/:locationId", getForecastsByLocation);
router.put("/:id", validateRequest(schema.updateForecastSchema, "body"), updateForecast);
router.delete("/:id", validateRequest(schema.forecastIdSchema, "params"), deleteForecast);

export default router;
