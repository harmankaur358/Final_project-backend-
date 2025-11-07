// Import Statements
import { Request, Response, NextFunction } from "express";
import * as locationService from "../services/locationService";
import { successResponse, errorResponse } from "../models/responsemodel";
import { Location } from "../models/locationmodel";

/**
 * Get all locations
 * @route GET /locations
 * @returns {Promise<Response>}
 */
export const getLocations = async (
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    const locations: Location[] = await locationService.getAllLocations();
    return res
      .status(200)
      .json(successResponse(locations, "Locations retrieved successfully"));
  } catch (error: unknown) {
    next(error);
  }
};

/**
 * Get a single location by ID
 * @route GET /locations/:id
 * @param req.params.id - The location ID
 * @returns {Promise<Response>}
 */
export const getLocationById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    const id: string = req.params.id;
    if (!id) {
      return res.status(400).json(errorResponse("Location ID is required"));
    }

    const location: Location | null = await locationService.getLocationById(id);

    if (!location) {
      return res.status(404).json(errorResponse("Location not found"));
    }

    return res
      .status(200)
      .json(successResponse(location, "Location retrieved successfully"));
  } catch (error: unknown) {
    next(error);
  }
};

/**
 * Create a new location
 * @route POST /locations
 * @param req.body - Location data (name, country, latitude, longitude)
 * @returns {Promise<Response>}
 */
export const createLocation = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    const { name, country, latitude, longitude } = req.body;

    if (!name || !country || latitude === undefined || longitude === undefined) {
      return res
        .status(400)
        .json(errorResponse("Missing required fields: name, country, latitude, longitude"));
    }

    const newLocation: Location = await locationService.createLocation({
      name,
      country,
      latitude,
      longitude,
    });

    return res
      .status(201)
      .json(successResponse(newLocation, "Location created successfully"));
  } catch (error: unknown) {
    next(error);
  }
};

/**
 * Update an existing location
 * @route PUT /locations/:id
 * @param req.params.id - The location ID
 * @param req.body - Updated location data
 * @returns {Promise<Response>}
 */
export const updateLocation = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    const id: string = req.params.id;
    if (!id) {
      return res.status(400).json(errorResponse("Location ID is required"));
    }

    const updatedLocation: Location | null = await locationService.updateLocation(id, req.body);

    if (!updatedLocation) {
      return res.status(404).json(errorResponse("Location not found"));
    }

    return res
      .status(200)
      .json(successResponse(updatedLocation, "Location updated successfully"));
  } catch (error: unknown) {
    next(error);
  }
};

/**
 * Delete a location
 * @route DELETE /locations/:id
 * @param req.params.id - The location ID to delete
 * @returns {Promise<Response>}
 */
export const deleteLocation = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    const id: string = req.params.id;
    if (!id) {
      return res.status(400).json(errorResponse("Location ID is required"));
    }

    const deleted: boolean = await locationService.deleteLocation(id);

    if (!deleted) {
      return res.status(404).json(errorResponse("Location not found"));
    }

    return res
      .status(200)
      .json(successResponse(true, "Location deleted successfully"));
  } catch (error: unknown) {
    next(error);
  }
};
