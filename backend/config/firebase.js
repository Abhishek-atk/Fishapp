import { initializeApp, cert } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";

import serviceAccount from "../serviceAccountKey.json" with { type: "json" };

const firebaseApp = initializeApp({
  credential: cert(serviceAccount),
});

const firebaseAuth = getAuth(firebaseApp);

export { firebaseApp, firebaseAuth };
