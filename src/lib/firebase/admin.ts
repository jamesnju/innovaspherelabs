// src/lib/firebase/admin.ts
import * as admin from 'firebase-admin';
import { firebaseAdminConfig } from './config';

// Initialize Firebase Admin SDK
if (!admin.apps.length) {
  try {
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: firebaseAdminConfig.projectId,
        clientEmail: firebaseAdminConfig.clientEmail,
        privateKey: firebaseAdminConfig.privateKey,
      }),
      projectId: firebaseAdminConfig.projectId,
    });
  } catch (error) {
    console.error('Failed to initialize Firebase Admin:', error);
  }
}

// Export admin instances
export const db = admin.firestore();
export const auth = admin.auth();
export const storage = admin.storage();

// Export admin for use in other files
export { admin };