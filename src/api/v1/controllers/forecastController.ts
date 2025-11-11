// Import Statements
import { Request, Response, NextFunction } from "express";
import * as forecastService from "../services/forecastService";
import { successResponse, errorResponse } from "../models/responsemodel";
import { Forecast } from "../models/forecastmodel";

/**
 * Get all forecasts
 */
export const getForecasts = async (_req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
  try {
    const forecasts: Forecast[] = await forecastService.getAllForecasts();
    return res.status(200).json(successResponse(forecasts, "Forecasts retrieved successfully"));
  } catch (error: unknown) {
    next(error);
  }
};

/**
 * Get forecast by ID
 */
export const getForecastById = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
  try {
    const id: string = req.params.id;
    if (!id) return res.status(400).json(errorResponse("Forecast ID is required"));

    const forecast: Forecast | null = await forecastService.getForecastById(id);
    if (!forecast) return res.status(404).json(errorResponse("Forecast not found"));

    return res.status(200).json(successResponse(forecast, "Forecast retrieved successfully"));
  } catch (error: unknown) {
    next(error);
  }
};

/**
 * Get forecasts by location
 */
export const getForecastsByLocation = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
  try {
    const locationId: string = req.params.locationId;
    if (!locationId) return res.status(400).json(errorResponse("Location ID is required"));

    const forecasts: Forecast[] = await forecastService.getForecastsByLocation(locationId);
    if (!forecasts || forecasts.length === 0) return res.status(404).json(errorResponse("No forecasts found for this location"));

    return res.status(200).json(successResponse(forecasts, "Forecasts retrieved successfully"));
  } catch (error: unknown) {
    next(error);
  }
};

/**
 * Create a new forecast
 */
export const createForecast = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
  try {
    const { id, locationId, temperature, humidity, windSpeed, date } = req.body;

    // Validate required fields
    if (!locationId || temperature === undefined || humidity === undefined || windSpeed === undefined) {
      return res.status(400).json(errorResponse("Missing required fields"));
    }

    const newForecast: Forecast = await forecastService.createForecast({
      id, 
      locationId,
      temperature,
      humidity,
      windSpeed,
      date,
    });

    return res.status(201).json(successResponse(newForecast, "Forecast created successfully"));
  } catch (error: unknown) {
    next(error);
  }
};

/**
 * Update an existing forecast
 */
export const updateForecast = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
  try {
    const id: string = req.params.id;
    if (!id) return res.status(400).json(errorResponse("Forecast ID is required"));

    const updatedForecast: Forecast | null = await forecastService.updateForecast(id, req.body);
    if (!updatedForecast) return res.status(404).json(errorResponse("Forecast not found"));

    return res.status(200).json(successResponse(updatedForecast, "Forecast updated successfully"));
  } catch (error: unknown) {
    next(error);
  }
};

/**
 * Delete a forecast
 */
export const deleteForecast = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
  try {
    const id: string = req.params.id;
    if (!id) return res.status(400).json(errorResponse("Forecast ID is required"));

    const deleted: boolean = await forecastService.deleteForecast(id);
    if (!deleted) return res.status(404).json(errorResponse("Forecast not found"));

    return res.status(200).json(successResponse(true, "Forecast deleted successfully"));
  } catch (error: unknown) {
    next(error);
  }
};
