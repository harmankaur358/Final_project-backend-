import { initializeApp, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import serviceAccount from "../final_project_new.json";

const app = initializeApp({
  credential: cert(serviceAccount as any),
});

export const db = getFirestore(app);