import multer, { StorageEngine } from 'multer';
import { Request } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the directory name from the file URL
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configure multer to store files in memory (since you're using Firebase)
const storage: StorageEngine = multer.memoryStorage(); // Files are kept in memory and uploaded directly to Firebase

// Initialize multer
const upload = multer({
  storage,
  fileFilter: (req: Request, file: Express.Multer.File, cb) => {
    const fileTypes = /jpeg|jpg|png|webp/;
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = fileTypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Only images are allowed'));
    }
  },
  limits: { fileSize: 5 * 1024 * 1024 }, // Optional: limit file size to 5MB
});

export default upload;
