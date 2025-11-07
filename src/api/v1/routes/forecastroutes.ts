import { Router } from "express";
import {
  createForecast,
  getForecasts,
  getForecastById,
  getForecastsByLocation,
  updateForecast,
  deleteForecast
} from "../controllers/forecastsController";

const router = Router();

router.post("/", createForecast);
router.get("/", getForecasts);
router.get("/:id", getForecastById);
router.get("/location/:locationId", getForecastsByLocation);
router.put("/:id", updateForecast);
router.delete("/:id", deleteForecast);

export default router;
