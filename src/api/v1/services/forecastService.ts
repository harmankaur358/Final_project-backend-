import {
  createDocument,
  getDocuments,
  getDocumentById,
  updateDocument,
  deleteDocument,
} from "../repositories/firebaserepository";
import { Forecast } from "../models/forecastmodel";

/** Firestore collection name for forecasts */
const FORECAST_COLLECTION = "forecasts";

/**
 * Creates a new forecast.
 * @param {Forecast} forecastData - Forecast details.
 * @returns {Promise<Forecast>} - The created forecast with ID.
 */
export const createForecast = async (forecastData: Forecast): Promise<Forecast> => {
  const id = await createDocument<Forecast>(FORECAST_COLLECTION, forecastData);
  return { ...forecastData, id };
};

/**
 * Retrieves all forecasts.
 * @returns {Promise<Forecast[]>} - Array of forecasts.
 */
export const getAllForecasts = async (): Promise<Forecast[]> => {
  const snapshot = await getDocuments(FORECAST_COLLECTION);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Forecast));
};

/**
 * Retrieves a forecast by ID.
 * @param {string} id - The forecast ID.
 * @returns {Promise<Forecast | null>} - The forecast or null if not found.
 */
export const getForecastById = async (id: string): Promise<Forecast | null> => {
  const doc = await getDocumentById(FORECAST_COLLECTION, id);
  return doc ? ({ id: doc.id, ...doc.data() } as Forecast) : null;
};

/**
 * Retrieves all forecasts for a specific location.
 * @param {string} locationId - The location ID.
 * @returns {Promise<Forecast[]>} - Array of forecasts.
 */
export const getForecastsByLocation = async (locationId: string): Promise<Forecast[]> => {
  const snapshot = await getDocuments(FORECAST_COLLECTION);
  return snapshot.docs
    .map((doc) => ({ id: doc.id, ...doc.data() } as Forecast))
    .filter((forecast) => forecast.locationId === locationId);
};

/**
 * Updates a forecast.
 * @param {string} id - Forecast ID.
 * @param {Partial<Forecast>} forecastData - Updated forecast data.
 * @returns {Promise<Forecast | null>} - Updated forecast or null.
 */
export const updateForecast = async (id: string, forecastData: Partial<Forecast>): Promise<Forecast | null> => {
  await updateDocument<Forecast>(FORECAST_COLLECTION, id, forecastData);
  const updated = await getForecastById(id);
  return updated;
};

/**
 * Deletes a forecast by ID.
 * @param {string} id - Forecast ID.
 * @returns {Promise<boolean>} - True if deleted, false otherwise.
 */
export const deleteForecast = async (id: string): Promise<boolean> => {
  const existing = await getForecastById(id);
  if (!existing) return false;
  await deleteDocument(FORECAST_COLLECTION, id);
  return true;
};
