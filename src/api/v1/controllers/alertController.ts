// Import Statements
import { Request, Response, NextFunction } from "express";
import * as alertService from "../services/alertService";
import { successResponse, errorResponse } from "../models/responsemodel";
import { Alert } from "../models/alertmodel";

/**
 * Get all alerts
 * @route GET /alerts
 */
export const getAlerts = async (_req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
  try {
    const alerts: Alert[] = await alertService.getAllAlerts();
    return res.status(200).json(successResponse(alerts, "Alerts retrieved successfully"));
  } catch (error: unknown) {
    next(error);
  }
};

/**
 * Get a specific alert by ID
 * @route GET /alerts/:id
 */
export const getAlertById = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
  try {
    const id: string = req.params.id;
    if (!id) return res.status(400).json(errorResponse("Alert ID is required"));

    const alert: Alert | null = await alertService.getAlertById(id);
    if (!alert) return res.status(404).json(errorResponse("Alert not found"));

    return res.status(200).json(successResponse(alert, "Alert retrieved successfully"));
  } catch (error: unknown) {
    next(error);
  }
};

/**
 * Get alerts by location ID
 * @route GET /alerts/location/:locationId
 */
export const getAlertsByLocation = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
  try {
    const locationId: string = req.params.locationId;
    if (!locationId) return res.status(400).json(errorResponse("Location ID is required"));

    const alerts: Alert[] = await alertService.getAlertsByLocation(locationId);
    if (!alerts || alerts.length === 0) return res.status(404).json(errorResponse("No alerts found for this location"));

    return res.status(200).json(successResponse(alerts, "Alerts retrieved successfully"));
  } catch (error: unknown) {
    next(error);
  }
};

/**
 * Create a new alert (supports auto-generated or custom ID)
 * @route POST /alerts
 */
export const createAlert = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
  try {
    const { id, locationId, type, description, severity, startTime, endTime } = req.body;

    // Validate required fields
    if (!locationId || !type || !description || !severity || !startTime || !endTime) {
      return res.status(400).json(errorResponse("Missing required fields"));
    }

    const newAlert: Alert = await alertService.createAlert({
      id, // optional: custom ID
      locationId,
      type,
      description,
      severity,
      startTime,
      endTime,
    });

    return res.status(201).json(successResponse(newAlert, "Alert created successfully"));
  } catch (error: unknown) {
    next(error);
  }
};

/**
 * Update an existing alert
 * @route PUT /alerts/:id
 */
export const updateAlert = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
  try {
    const id: string = req.params.id;
    if (!id) return res.status(400).json(errorResponse("Alert ID is required"));

    const updatedAlert: Alert | null = await alertService.updateAlert(id, req.body);
    if (!updatedAlert) return res.status(404).json(errorResponse("Alert not found"));

    return res.status(200).json(successResponse(updatedAlert, "Alert updated successfully"));
  } catch (error: unknown) {
    next(error);
  }
};

/**
 * Delete an alert
 * @route DELETE /alerts/:id
 */
export const deleteAlert = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
  try {
    const id: string = req.params.id;
    if (!id) return res.status(400).json(errorResponse("Alert ID is required"));

    const deleted: boolean = await alertService.deleteAlert(id);
    if (!deleted) return res.status(404).json(errorResponse("Alert not found"));

    return res.status(200).json(successResponse(true, "Alert deleted successfully"));
  } catch (error: unknown) {
    next(error);
  }
};
