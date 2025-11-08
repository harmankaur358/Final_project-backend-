import { Request, Response } from "express";
import * as locationService from "../src/api/v1/services/locationService";
import * as locationController from "../src/api/v1/controllers/locationController";

// Mock service layer
jest.mock("../src/api/v1/services/locationService");

describe("Location Controller", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next = jest.fn();

  beforeEach(() => {
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;
    jest.clearAllMocks();
  });

  // 🧩 GET /locations
  test("getLocations - should return all locations", async () => {
    (locationService.getAllLocations as jest.Mock).mockResolvedValue([{ id: "1", name: "London" }]);

    await locationController.getLocations(req as Request, res as Response, next);

    expect(locationService.getAllLocations).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
  });

  // 🧩 GET /locations/:id
  test("getLocationById - should return 404 if not found", async () => {
    (locationService.getLocationById as jest.Mock).mockResolvedValue(null);
    req = { params: { id: "999" } };

    await locationController.getLocationById(req as Request, res as Response, next);

    expect(res.status).toHaveBeenCalledWith(404);
  });

  // 🧩 POST /locations
  test("createLocation - should create a new location", async () => {
    const mockLoc = { id: "1", name: "Paris", country: "France", latitude: 48.8, longitude: 2.3 };
    (locationService.createLocation as jest.Mock).mockResolvedValue(mockLoc);
    req = { body: mockLoc };

    await locationController.createLocation(req as Request, res as Response, next);

    expect(locationService.createLocation).toHaveBeenCalledWith(mockLoc);
    expect(res.status).toHaveBeenCalledWith(201);
  });

  test("createLocation - should return 400 for missing fields", async () => {
    req = { body: { name: "", country: "", latitude: null, longitude: null } };

    await locationController.createLocation(req as Request, res as Response, next);

    expect(res.status).toHaveBeenCalledWith(400);
  });

  // 🧩 PUT /locations/:id
  test("updateLocation - should call updateLocation and return 200", async () => {
    const updated = { id: "1", name: "Berlin" };
    (locationService.updateLocation as jest.Mock).mockResolvedValue(updated);
    req = { params: { id: "1" }, body: updated };

    await locationController.updateLocation(req as Request, res as Response, next);

    expect(locationService.updateLocation).toHaveBeenCalledWith("1", updated);
    expect(res.status).toHaveBeenCalledWith(200);
  });

  // 🧩 DELETE /locations/:id
  test("deleteLocation - should delete and return 200", async () => {
    (locationService.deleteLocation as jest.Mock).mockResolvedValue(true);
    req = { params: { id: "1" } };

    await locationController.deleteLocation(req as Request, res as Response, next);

    expect(locationService.deleteLocation).toHaveBeenCalledWith("1");
    expect(res.status).toHaveBeenCalledWith(200);
  });

  test("deleteLocation - should return 404 if not found", async () => {
    (locationService.deleteLocation as jest.Mock).mockResolvedValue(false);
    req = { params: { id: "999" } };

    await locationController.deleteLocation(req as Request, res as Response, next);

    expect(res.status).toHaveBeenCalledWith(404);
  });
});
