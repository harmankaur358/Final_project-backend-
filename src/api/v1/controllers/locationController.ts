import { Request, Response, NextFunction } from "express";
import * as locationService from "../services/locationService";
import { successResponse, errorResponse } from "../models/responsemodel";
import { Location } from "../models/locationmodel";

/**
 * Get all locations
 * @route GET /locations
 */
export const getLocations = async (_req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
  try {
    const locations: Location[] = await locationService.getAllLocations();
    return res.status(200).json(successResponse(locations, "Locations retrieved successfully"));
  } catch (error: unknown) {
    next(error);
  }
};

/**
 * Get a single location by ID
 * @route GET /locations/:id
 */
export const getLocationById = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
  try {
    const id: string = req.params.id;
    if (!id) return res.status(400).json(errorResponse("Location ID is required"));

    const location: Location | null = await locationService.getLocationById(id);
    if (!location) return res.status(404).json(errorResponse("Location not found"));

    return res.status(200).json(successResponse(location, "Location retrieved successfully"));
  } catch (error: unknown) {
    next(error);
  }
};

/**
 * Create a new location
 * @route POST /locations
 */
export const createLocation = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
  try {
    const { id, name, country, latitude, longitude } = req.body;

    // Validate required fields
    if (!name || !country || latitude === undefined || longitude === undefined) {
      return res.status(400)
        .json(errorResponse("Missing required fields: name, country, latitude, longitude"));
    }

    const latNum = Number(latitude);
    const longNum = Number(longitude);

    if (isNaN(latNum) || isNaN(longNum)) {
      return res.status(400)
        .json(errorResponse("Latitude and longitude must be valid numbers"));
    }

    // Construct a full Location object for the service
    const locationData: Location = {
      name: name!,
      country: country!,
      latitude: latNum,
      longitude: longNum,
      ...(id?.trim() && { id }),
    } as Location;

    const newLocation: Location = await locationService.createLocation(locationData);

    return res.status(201)
      .json(successResponse(newLocation, "Location created successfully"));
  } catch (error: unknown) {
    console.error("Error in createLocation:", error);
    next(error);
  }
};

/**
 * Update an existing location
 * @route PUT /locations/:id
 */
export const updateLocation = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
  try {
    const id: string = req.params.id;
    if (!id) return res.status(400).json(errorResponse("Location ID is required"));

    const { latitude, longitude, ...rest } = req.body;
    let updateData: Partial<Location> = { ...rest };

    if (latitude !== undefined) {
      const latNum = Number(latitude);
      if (isNaN(latNum)) return res.status(400).json(errorResponse("Latitude must be a valid number"));
      updateData.latitude = latNum;
    }

    if (longitude !== undefined) {
      const longNum = Number(longitude);
      if (isNaN(longNum)) return res.status(400).json(errorResponse("Longitude must be a valid number"));
      updateData.longitude = longNum;
    }

    const updatedLocation: Location | null = await locationService.updateLocation(id, updateData);
    if (!updatedLocation) return res.status(404).json(errorResponse("Location not found"));

    return res.status(200).json(successResponse(updatedLocation, "Location updated successfully"));
  } catch (error: unknown) {
    console.error("Error in updateLocation:", error);
    next(error);
  }
};

/**
 * Delete a location
 * @route DELETE /locations/:id
 */
export const deleteLocation = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
  try {
    const id: string = req.params.id;
    if (!id) return res.status(400).json(errorResponse("Location ID is required"));

    const deleted: boolean = await locationService.deleteLocation(id);
    if (!deleted) return res.status(404).json(errorResponse("Location not found"));

    return res.status(200).json(successResponse(true, "Location deleted successfully"));
  } catch (error: unknown) {
    next(error);
  }
};
