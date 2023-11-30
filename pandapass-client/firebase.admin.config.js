
import * as admin from "firebase-admin"
import serviceAccount from "./serviceAccountKey.json"

if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      projectId: 'pandapass-779a5', 
      databaseURL: 'https://pandapass-779a5.firebaseio.com',
    });
  }

export const verifyToken = async (idToken) => {
    try {
      const decodedToken = await admin.auth().verifyIdToken(idToken);
      return decodedToken;
    } catch (error) {
      console.error('Error verifying ID token:', error);
      throw error;
    }
  };