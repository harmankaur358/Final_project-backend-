import { getAllForecasts, createForecast as createForecastService } from "../src/api/v1/services/forecastService";
import { clearCache } from "../utils/cache";
import { Forecast } from "../src/api/v1/models/forecastmodel";
import { getDocuments, createDocument } from "../src/api/v1/repositories/firebaserepository";

jest.mock("../src/api/v1/repositories/firebaserepository");

describe("Forecast Service Caching Behavior", () => {
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
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  test("should call repo once and return cached data on second call", async () => {
    (getDocuments as jest.Mock).mockResolvedValue({
      docs: [{ id: "1", data: () => mockForecast }],
    });

    // First call caches
    const first = await getAllForecasts();
    expect(getDocuments).toHaveBeenCalledTimes(1);
    expect(first).toEqual([mockForecast]);

    // Second call should return cached data
    const second = await getAllForecasts();
    expect(getDocuments).toHaveBeenCalledTimes(1);
    expect(second).toEqual([mockForecast]);
  });

  test("should clear cache when a new forecast is created", async () => {
    (getDocuments as jest.Mock).mockResolvedValue({
      docs: [{ id: "1", data: () => mockForecast }],
    });

    (createDocument as jest.Mock).mockResolvedValue("1");

    // Cache first
    await getAllForecasts();
    expect(getDocuments).toHaveBeenCalledTimes(1);

    // Add a new forecast (cache should clear)
    await createForecastService(mockForecast);

    // Next call should fetch from repo again
    await getAllForecasts();
    expect(getDocuments).toHaveBeenCalledTimes(2);
  });
});
