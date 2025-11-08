import {
  createAlert,
  getAlerts,
  getAlertById,
  getAlertsByLocation,
  updateAlert,
  deleteAlert,
} from "../src/api/v1/controllers/alertController";

import * as alertService from "../src/api/v1/services/alertService";
import { Request, Response, NextFunction } from "express";

// Mock the service layer
jest.mock("../src/api/v1/services/alertService");

const mockRes = () => {
  const res: Partial<Response> = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res as Response;
};

describe("Alert Controller (simple tests)", () => {
  let res: Response;
  let req: Partial<Request>;
  let next: NextFunction;

  const mockAlert = {
    id: "a1",
    locationId: "loc1",
    type: "Flood",
    description: "Heavy rain warning",
    severity: "High",
    startTime: "2025-11-08T10:00:00Z",
    endTime: "2025-11-08T18:00:00Z",
  };

  beforeEach(() => {
    res = mockRes();
    next = jest.fn();
    jest.clearAllMocks();
  });

  test("createAlert - should call service and return 201", async () => {
    req = { body: mockAlert };
    (alertService.createAlert as jest.Mock).mockResolvedValue(mockAlert);

    await createAlert(req as Request, res, next);

    expect(alertService.createAlert).toHaveBeenCalledWith(mockAlert);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalled();
  });

  test("getAlerts - should return 200 with alerts", async () => {
    (alertService.getAllAlerts as jest.Mock).mockResolvedValue([mockAlert]);

    await getAlerts(req as Request, res, next);

    expect(alertService.getAllAlerts).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalled();
  });

  test("getAlertById - should return 200 if found", async () => {
    req = { params: { id: "a1" } };
    (alertService.getAlertById as jest.Mock).mockResolvedValue(mockAlert);

    await getAlertById(req as Request, res, next);

    expect(alertService.getAlertById).toHaveBeenCalledWith("a1");
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalled();
  });

  test("getAlertsByLocation - should return 200 with alerts", async () => {
    req = { params: { locationId: "loc1" } };
    (alertService.getAlertsByLocation as jest.Mock).mockResolvedValue([mockAlert]);

    await getAlertsByLocation(req as Request, res, next);

    expect(alertService.getAlertsByLocation).toHaveBeenCalledWith("loc1");
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalled();
  });

  test("updateAlert - should return 200 after update", async () => {
    req = { params: { id: "a1" }, body: { severity: "Medium" } };
    (alertService.updateAlert as jest.Mock).mockResolvedValue({ ...mockAlert, severity: "Medium" });

    await updateAlert(req as Request, res, next);

    expect(alertService.updateAlert).toHaveBeenCalledWith("a1", { severity: "Medium" });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalled();
  });

  test("deleteAlert - should return 200 if deleted", async () => {
    req = { params: { id: "a1" } };
    (alertService.deleteAlert as jest.Mock).mockResolvedValue(true);

    await deleteAlert(req as Request, res, next);

    expect(alertService.deleteAlert).toHaveBeenCalledWith("a1");
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalled();
  });
});
