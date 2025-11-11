//Import statements
import {
  createForecast,
  getForecasts,
  getForecastById,
  updateForecast,
  deleteForecast,
} from "../src/api/v1/controllers/forecastController";

import * as forecastService from "../src/api/v1/services/forecastService";
import { Request, Response, NextFunction } from "express";

//  mock path
jest.mock("../src/api/v1/services/forecastService");

const mockRes = () => {
  const res: Partial<Response> = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res as Response;
};

describe("Forecast Controller", () => {
  let res: Response;
  let req: Partial<Request>;
  let next: NextFunction;

  // mockForecast
  const mockForecast = {
    id: "f1",
    locationId: "loc1",
    temperature: 25,
    humidity: 60,
    windSpeed: 10,
    date: "2025-11-08",
  };

  beforeEach(() => {
    res = mockRes();
    next = jest.fn();
    jest.clearAllMocks();
  });

  //create forecast
  test("createForecast - should call service and return 201", async () => {
    req = { body: mockForecast };
    (forecastService.createForecast as jest.Mock).mockResolvedValue(mockForecast);

    await createForecast(req as Request, res, next);

    expect(forecastService.createForecast).toHaveBeenCalledWith(mockForecast);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalled();
  });

  //getForecasts
  test("getForecasts - should return 200 with forecasts", async () => {
    (forecastService.getAllForecasts as jest.Mock).mockResolvedValue([mockForecast]);

    await getForecasts(req as Request, res, next);

    expect(forecastService.getAllForecasts).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalled();
  });

  //getForecastbyid
  test("getForecastById - should return 200 if found", async () => {
    req = { params: { id: "f1" } };
    (forecastService.getForecastById as jest.Mock).mockResolvedValue(mockForecast);

    await getForecastById(req as Request, res, next);

    expect(forecastService.getForecastById).toHaveBeenCalledWith("f1");
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalled();
  });

  //UpdateForecast
  test("updateForecast - should return 200 after update", async () => {
    req = { params: { id: "f1" }, body: { temperature: 30 } };
    (forecastService.updateForecast as jest.Mock).mockResolvedValue({ ...mockForecast, temperature: 30 });

    await updateForecast(req as Request, res, next);

    expect(forecastService.updateForecast).toHaveBeenCalledWith("f1", { temperature: 30 });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalled();
  });

  //Delete Forecast
  test("deleteForecast - should return 200 if deleted", async () => {
    req = { params: { id: "f1" } };
    (forecastService.deleteForecast as jest.Mock).mockResolvedValue(true);

    await deleteForecast(req as Request, res, next);

    expect(forecastService.deleteForecast).toHaveBeenCalledWith("f1");
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalled();
  });
});
