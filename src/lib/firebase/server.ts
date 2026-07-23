// src/lib/firebase/server.ts
import admin from 'firebase-admin';
import { firebaseAdminConfig } from './config';

// Initialize Firebase Admin SDK (server-side only)
function initFirebaseAdmin() {
  if (!firebaseAdminConfig.projectId || !firebaseAdminConfig.clientEmail || !firebaseAdminConfig.privateKey) {
    throw new Error('Firebase Admin credentials are not properly configured');
  }

  // Check if Firebase Admin is already initialized
  if (!admin.apps || admin.apps.length === 0) {
    try {
      admin.initializeApp({
        credential: admin.credential.cert({
          projectId: firebaseAdminConfig.projectId,
          clientEmail: firebaseAdminConfig.clientEmail,
          privateKey: firebaseAdminConfig.privateKey,
        }),
      });
    } catch (error) {
      console.error('Failed to initialize Firebase Admin:', error);
      throw error;
    }
  }
}

// Initialize admin SDK
initFirebaseAdmin();

// Export admin instances
export const db = admin.firestore();
export const auth = admin.auth();
export const storage = admin.storage();

// Helper functions for server-side operations

/**
 * Verify a Firebase ID token
 */
export async function verifyIdToken(token: string) {
  try {
    const decodedToken = await auth.verifyIdToken(token);
    return decodedToken;
  } catch (error) {
    console.error('Error verifying token:', error);
    return null;
  }
}

/**
 * Get user by UID
 */
export async function getUserByUid(uid: string) {
  try {
    const user = await auth.getUser(uid);
    return user;
  } catch (error) {
    console.error('Error getting user:', error);
    return null;
  }
}

/**
 * Get user by email
 */
export async function getUserByEmail(email: string) {
  try {
    const user = await auth.getUserByEmail(email);
    return user;
  } catch (error) {
    console.error('Error getting user by email:', error);
    return null;
  }
}

/**
 * Create custom token for client-side authentication
 */
export async function createCustomToken(uid: string, claims?: any) {
  try {
    const token = await auth.createCustomToken(uid, claims);
    return token;
  } catch (error) {
    console.error('Error creating custom token:', error);
    return null;
  }
}

/**
 * Generate password reset link
 */
export async function generatePasswordResetLink(email: string) {
  try {
    const link = await auth.generatePasswordResetLink(email);
    return link;
  } catch (error) {
    console.error('Error generating password reset link:', error);
    return null;
  }
}

/**
 * Generate email verification link
 */
export async function generateEmailVerificationLink(email: string) {
  try {
    const link = await auth.generateEmailVerificationLink(email);
    return link;
  } catch (error) {
    console.error('Error generating email verification link:', error);
    return null;
  }
}

// Firestore helper functions

/**
 * Get a document by ID from a collection
 */
export async function getDocument(collection: string, id: string) {
  try {
    const doc = await db.collection(collection).doc(id).get();
    if (!doc.exists) {
      return null;
    }
    const data = doc.data();
    return { id: doc.id, ...data };
  } catch (error) {
    console.error(`Error getting document from ${collection}:`, error);
    return null;
  }
}

/**
 * Get all documents from a collection
 */
export async function getCollection(collection: string) {
  try {
    const snapshot = await db.collection(collection).get();
    return snapshot.docs.map((doc) => ({ 
      id: doc.id, 
      ...doc.data() 
    }));
  } catch (error) {
    console.error(`Error getting collection ${collection}:`, error);
    return [];
  }
}

/**
 * Query documents with filters
 */
export async function queryDocuments(
  collection: string,
  field: string,
  operator: '==' | '!=' | '>' | '>=' | '<' | '<=' | 'array-contains' | 'in' | 'array-contains-any' | 'not-in',
  value: any
) {
  try {
    const snapshot = await db
      .collection(collection)
      .where(field, operator as any, value)
      .get();
    return snapshot.docs.map((doc) => ({ 
      id: doc.id, 
      ...doc.data() 
    }));
  } catch (error) {
    console.error(`Error querying ${collection}:`, error);
    return [];
  }
}

/**
 * Create a new document
 */
export async function createDocument(collection: string, data: any) {
  try {
    const docRef = db.collection(collection).doc();
    await docRef.set({
      ...data,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
    return { id: docRef.id, ...data };
  } catch (error) {
    console.error(`Error creating document in ${collection}:`, error);
    return null;
  }
}

/**
 * Update a document
 */
export async function updateDocument(collection: string, id: string, data: any) {
  try {
    await db.collection(collection).doc(id).update({
      ...data,
      updatedAt: new Date().toISOString(),
    });
    return { id, ...data };
  } catch (error) {
    console.error(`Error updating document in ${collection}:`, error);
    return null;
  }
}

/**
 * Delete a document
 */
export async function deleteDocument(collection: string, id: string) {
  try {
    await db.collection(collection).doc(id).delete();
    return true;
  } catch (error) {
    console.error(`Error deleting document from ${collection}:`, error);
    return false;
  }
}

/**
 * Run a transaction
 */
export async function runTransaction<T>(
  callback: (transaction: any) => Promise<T>
): Promise<T | null> {
  try {
    const result = await db.runTransaction(callback);
    return result;
  } catch (error) {
    console.error('Transaction failed:', error);
    return null;
  }
}

/**
 * Get all documents from a collection with pagination
 */
export async function getPaginatedCollection(
  collection: string,
  limit: number = 10,
  startAfter?: string
) {
  try {
    let query: any = db.collection(collection).limit(limit);
    
    if (startAfter) {
      const startDoc = await db.collection(collection).doc(startAfter).get();
      if (startDoc.exists) {
        query = query.startAfter(startDoc);
      }
    }

    const snapshot = await query.get();
    const docs = snapshot.docs.map((doc: any) => ({ 
      id: doc.id, 
      ...doc.data() 
    }));
    
    return {
      data: docs,
      lastDoc: docs.length > 0 ? docs[docs.length - 1].id : null,
      hasMore: docs.length === limit,
    };
  } catch (error) {
    console.error(`Error getting paginated collection ${collection}:`, error);
    return { data: [], lastDoc: null, hasMore: false };
  }
}