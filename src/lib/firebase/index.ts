// src/lib/firebase/index.ts
// Export all Firebase utilities

// Config exports
export * from './config';

// Client exports (with explicit re-exports)
export {
  app as clientApp,
  auth as clientAuth,
  db as clientDb,
  storage as clientStorage,
  googleProvider,
  githubProvider,
} from './client';

// Server exports (these will take precedence)
export {
  db,
  auth,
  storage,
  verifyIdToken,
  getUserByUid,
  getUserByEmail,
  createCustomToken,
  generatePasswordResetLink,
  generateEmailVerificationLink,
  getDocument,
  getCollection,
  queryDocuments,
  createDocument,
  updateDocument,
  deleteDocument,
  runTransaction,
  getPaginatedCollection,
} from './server';

// Admin exports
export {
  admin,
  db as adminDb,
  auth as adminAuth,
  storage as adminStorage,
} from './admin';