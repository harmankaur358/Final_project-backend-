import {
  createDocument,
  getDocuments,
  getDocumentById,
  updateDocument,
  deleteDocument,
} from "../repositories/firebaserepository";
import { Location } from "../models/locationmodel";

/** Firestore collection name for locations */
const LOCATION_COLLECTION = "locations";

/**
 * Creates a new location.
 * @param {Location} locationData - The location data to create.
 * @returns {Promise<Location>} - The created location with ID.
 */
export const createLocation = async (locationData: Location): Promise<Location> => {
  const id = await createDocument<Location>(LOCATION_COLLECTION, locationData);
  return { ...locationData, id };
};

/**
 * Retrieves all locations.
 * @returns {Promise<Location[]>} - List of locations.
 */
export const getAllLocations = async (): Promise<Location[]> => {
  const snapshot = await getDocuments(LOCATION_COLLECTION);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Location));
};

/**
 * Retrieves a location by its ID.
 * @param {string} id - The location ID.
 * @returns {Promise<Location | null>} - The location or null.
 */
export const getLocationById = async (id: string): Promise<Location | null> => {
  const doc = await getDocumentById(LOCATION_COLLECTION, id);
  return doc ? ({ id: doc.id, ...doc.data() } as Location) : null;
};

/**
 * Updates a location.
 * @param {string} id - The location ID.
 * @param {Partial<Location>} locationData - The updated fields.
 * @returns {Promise<Location | null>} - The updated location or null.
 */
export const updateLocation = async (id: string, locationData: Partial<Location>): Promise<Location | null> => {
  await updateDocument<Location>(LOCATION_COLLECTION, id, locationData);
  const updated = await getLocationById(id);
  return updated;
};

/**
 * Deletes a location from Firestore.
 * @param {string} id - The location ID.
 * @returns {Promise<boolean>} - True if deleted, false otherwise.
 */
export const deleteLocation = async (id: string): Promise<boolean> => {
  const existing = await getLocationById(id);
  if (!existing) return false;
  await deleteDocument(LOCATION_COLLECTION, id);
  return true;
};
