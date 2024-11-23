import { initializeApp, cert, ServiceAccount } from 'firebase-admin/app';
import { getStorage } from 'firebase-admin/storage';
import serviceAccountKey from '../config/serviceAccountKey.json' assert { type: 'json' };

const serviceAccount: ServiceAccount = {
  projectId: serviceAccountKey.project_id,
  clientEmail: serviceAccountKey.client_email,
  privateKey: serviceAccountKey.private_key,
};

initializeApp({
  credential: cert(serviceAccount),
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET
});

export const bucket = getStorage().bucket();