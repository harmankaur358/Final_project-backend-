import { db } from "../../../config/firebaseConfig";

/**
 * Creates a new document in a specified Firestore collection.
 * Supports custom IDs, prevents slashes, and logs for debugging.
 */
export const createDocument = async <T>(
  collectionName: string,
  data: Partial<T>,
  id?: string
): Promise<string> => {
  try {
    let docRef: FirebaseFirestore.DocumentReference;

    // Validate custom ID
    if (id && id.trim() && !id.includes("/")) {
      docRef = db.collection(collectionName).doc(id.trim());
      console.log(`[createDocument] Creating doc with custom ID: ${id} in collection: ${collectionName}`);
      await docRef.set(data);
    } else {
      docRef = await db.collection(collectionName).add(data);
      console.log(`[createDocument] Created doc with auto-generated ID: ${docRef.id} in collection: ${collectionName}`);
    }

    return docRef.id;
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    throw new Error(`Failed to create document in ${collectionName}: ${errorMessage}`);
  }
};

/**
 * Retrieves all documents from a collection.
 */
export const getDocuments = async (
  collectionName: string
): Promise<FirebaseFirestore.QuerySnapshot> => {
  try {
    return await db.collection(collectionName).get();
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    throw new Error(`Failed to fetch documents from ${collectionName}: ${errorMessage}`);
  }
};

/**
 * Retrieves a document by ID.
 */
export const getDocumentById = async (
  collectionName: string,
  id: string
): Promise<FirebaseFirestore.DocumentSnapshot | null> => {
  try {
    const doc = await db.collection(collectionName).doc(id).get();
    return doc.exists ? doc : null;
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    throw new Error(`Failed to fetch document ${id} from ${collectionName}: ${errorMessage}`);
  }
};

/**
 * Updates a document safely.
 * Checks if the document exists first to prevent NOT_FOUND errors.
 */
export const updateDocument = async <T>(
  collectionName: string,
  id: string,
  data: Partial<T>
): Promise<void> => {
  try {
    const existing = await getDocumentById(collectionName, id);
    if (!existing) {
      throw new Error(`Document with ID "${id}" does not exist in collection "${collectionName}"`);
    }

    await db.collection(collectionName).doc(id).update(data);
    console.log(`[updateDocument] Updated document ${id} in collection ${collectionName}`);
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    throw new Error(`Failed to update document ${id} in ${collectionName}: ${errorMessage}`);
  }
};

/**
 * Deletes a document safely.
 */
export const deleteDocument = async (
  collectionName: string,
  id: string,
  transaction?: FirebaseFirestore.Transaction
): Promise<void> => {
  try {
    const docRef = db.collection(collectionName).doc(id);

    if (transaction) {
      transaction.delete(docRef);
    } else {
      const existing = await getDocumentById(collectionName, id);
      if (!existing) {
        console.warn(`[deleteDocument] Document ${id} does not exist in ${collectionName}`);
        return;
      }
      await docRef.delete();
    }

    console.log(`[deleteDocument] Deleted document ${id} from ${collectionName}`);
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    throw new Error(`Failed to delete document ${id} from ${collectionName}: ${errorMessage}`);
  }
};
