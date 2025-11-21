//Import statements
import {
  getAllForecasts,
  createForecast as createForecastService,
} from "../src/api/v1/services/forecastService";

import { clearCache } from "../utils/cache";
import { Forecast } from "../src/api/v1/models/forecastmodel";
import {
  getDocuments,
  createDocument,
} from "../src/api/v1/repositories/firebaserepository";

jest.mock("../src/api/v1/repositories/firebaserepository");

describe("Forecast Service Caching", () => {
  const mockForecast: Forecast = {
    id: "1",
    locationId: "loc1",
    temperature: 20,
    humidity: 40,
    windSpeed: 15,
    date: "2025-11-08",
  };

  beforeEach(() => {
    clearCache();
    jest.clearAllMocks();
  });

  test("should call repo once and return cached data on second call", async () => {
    (getDocuments as jest.Mock).mockResolvedValue({
      docs: [{ id: "1", data: () => mockForecast }],
    });

    // First call caches data
    const first = await getAllForecasts();
    expect(getDocuments).toHaveBeenCalledTimes(1);
    expect(first).toEqual([mockForecast]);

    // Second call returns cached data
    const second = await getAllForecasts();
    expect(getDocuments).toHaveBeenCalledTimes(1);
    expect(second).toEqual([mockForecast]);
  });

  test("should clear cache when a new forecast is created", async () => {
    (getDocuments as jest.Mock).mockResolvedValue({
      docs: [{ id: "1", data: () => mockForecast }],
    });

    (createDocument as jest.Mock).mockResolvedValue("1");

    // First call caches data
    await getAllForecasts();
    expect(getDocuments).toHaveBeenCalledTimes(1);

    // Creating a forecast should clear the cache
    await createForecastService(mockForecast);

    // Next call should fetch again
    await getAllForecasts();
    expect(getDocuments).toHaveBeenCalledTimes(2);
  });
});
