//Import statments
import {
  createDocument,
  getDocuments,
  getDocumentById,
  updateDocument,
  deleteDocument,
} from "../repositories/firebaserepository";
import { Alert } from "../models/alertmodel";

/** Firestore collection name for alerts */
const ALERTS_COLLECTION = "alerts";

/**
 * Creates a new alert document in Firestore.
 * @param {Alert} alertData - alert data to be created.
 * @returns {Promise<Alert>} - created alert with its generated ID.
 */
export const createAlert = async (alertData: Alert): Promise<Alert> => {
  const id = await createDocument<Alert>(ALERTS_COLLECTION, alertData, alertData.id);
  return { ...alertData, id };
};

/**
 * Retrieves all alerts from Firestore.
 * @returns {Promise<Alert[]>} - An array of alerts.
 */
export const getAllAlerts = async (): Promise<Alert[]> => {
  const snapshot = await getDocuments(ALERTS_COLLECTION);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Alert));
};

/**
 * Retrieves an alert by its ID.
 * @param {string} id - The alert ID.
 * @returns {Promise<Alert | null>} - The alert if found, or null.
 */
export const getAlertById = async (id: string): Promise<Alert | null> => {
  const doc = await getDocumentById(ALERTS_COLLECTION, id);
  return doc ? ({ id: doc.id, ...doc.data() } as Alert) : null;
};

/**
 * Retrieves all alerts associated with a specific location ID.
 * @param {string} locationId - The location ID.
 * @returns {Promise<Alert[]>} - An array of alerts for that location.
 */
export const getAlertsByLocation = async (locationId: string): Promise<Alert[]> => {
  const snapshot = await getDocuments(ALERTS_COLLECTION);
  return snapshot.docs
    .map((doc) => ({ id: doc.id, ...doc.data() } as Alert))
    .filter((alert) => alert.locationId === locationId);
};

/**
 * Updates an existing alert.
 * @param {string} id - The alert ID.
 * @param {Partial<Alert>} alertData - The updated fields.
 * @returns {Promise<Alert | null>} - The updated alert, or null if not found.
 */
export const updateAlert = async (id: string, alertData: Partial<Alert>): Promise<Alert | null> => {
  await updateDocument<Alert>(ALERTS_COLLECTION, id, alertData);
  const updated = await getAlertById(id);
  return updated;
};

/**
 * Deletes an alert from Firestore.
 * @param {string} id - The alert ID.
 * @returns {Promise<boolean>} - True if deleted successfully, false otherwise.
 */
export const deleteAlert = async (id: string): Promise<boolean> => {
  const existing = await getAlertById(id);
  if (!existing) return false;
  await deleteDocument(ALERTS_COLLECTION, id);
  return true;
};
