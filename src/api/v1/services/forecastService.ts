// Import statements
import {
  createDocument,
  getDocuments,
  getDocumentById,
  updateDocument,
  deleteDocument,
} from "../repositories/firebaserepository";
import { Forecast } from "../models/forecastmodel";
import { getCache, setCache, clearCache } from "../../../../utils/cache"; 

/** Firestore collection name for forecasts */
const FORECAST_COLLECTION = "forecasts";
const CACHE_ALL_FORECASTS = "cache_all_forecasts"; 

/**
 * Creates a new forecast.
 */
export const createForecast = async (forecastData: Forecast): Promise<Forecast> => {
  const id = await createDocument<Forecast>(
    FORECAST_COLLECTION,
    forecastData,
    forecastData.id
  );

  //  Clear cache after create
  clearCache(CACHE_ALL_FORECASTS);
  clearCache(`cache_forecast_${id}`);

  return { ...forecastData, id };
};

/**
 * Retrieves all forecasts.
 */
export const getAllForecasts = async (): Promise<Forecast[]> => {
  //  Try reading from cache
  const cached = getCache(CACHE_ALL_FORECASTS);
  if (cached) {
    console.log(" Returning forecasts from cache");
    return cached;
  }

  const snapshot = await getDocuments(FORECAST_COLLECTION);
  const forecasts = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Forecast));

  // Store in cache
  setCache(CACHE_ALL_FORECASTS, forecasts);
  console.log("Caching forecasts for 1 hour");

  return forecasts;
};

/**
 * Retrieves a forecast by ID.
 */
export const getForecastById = async (id: string): Promise<Forecast | null> => {
  const cacheKey = `cache_forecast_${id}`; // unique key per forecast
  const cached = getCache(cacheKey);
  if (cached) {
    console.log(` Returning forecast ${id} from cache`);
    return cached;
  }

  const doc = await getDocumentById(FORECAST_COLLECTION, id);
  if (!doc) return null;

  const forecast = { id: doc.id, ...doc.data() } as Forecast;

  // Cache the result
  setCache(cacheKey, forecast);
  console.log(`Cached forecast ${id} for 1 hour`);

  return forecast;
};

/**
 * Retrieves all forecasts for a specific location.
 */
export const getForecastsByLocation = async (locationId: string): Promise<Forecast[]> => {
  const cacheKey = `cache_location_${locationId}`; //  cache per location
  const cached = getCache(cacheKey);
  if (cached) {
    console.log(`Returning forecasts for location ${locationId} from cache`);
    return cached;
  }

  const snapshot = await getDocuments(FORECAST_COLLECTION);
  const forecasts = snapshot.docs
    .map((doc) => ({ id: doc.id, ...doc.data() } as Forecast))
    .filter((forecast) => forecast.locationId === locationId);

  setCache(cacheKey, forecasts);
  console.log(` Cached forecasts for location ${locationId}`);

  return forecasts;
};

/**
 * Updates a forecast.
 */
export const updateForecast = async (id: string, forecastData: Partial<Forecast>): Promise<Forecast | null> => {
  await updateDocument<Forecast>(FORECAST_COLLECTION, id, forecastData);

  //  Clear caches related to forecasts
  clearCache(CACHE_ALL_FORECASTS);
  clearCache(`cache_forecast_${id}`);

  const updated = await getForecastById(id);
  return updated;
};

/**
 * Deletes a forecast by ID.
 */
export const deleteForecast = async (id: string): Promise<boolean> => {
  const existing = await getForecastById(id);
  if (!existing) return false;

  await deleteDocument(FORECAST_COLLECTION, id);

  // Clear caches related to forecasts
  clearCache(CACHE_ALL_FORECASTS);
  clearCache(`cache_forecast_${id}`);

  return true;
};
