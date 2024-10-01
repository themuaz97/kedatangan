import { Request, Response } from "express";
import prisma from "../db/prisma.js";
import upload from "../middleware/upload.middleware.js";
import { bucket } from "../utils/firebase.js";
import { v4 as uuidv4 } from "uuid";
import sharp from "sharp";

export const updateMe = async (req: Request, res: Response) => {
  try {
    upload.single("profile_img")(req, res, async (error: any) => {
      if (error) {
        return res.status(500).json({ error: 'Error uploading image: ' + error.message });
      }

      const userId = req.users?.user_id; // Assuming you use some authentication middleware

      if (!userId) {
        return res.status(401).json({ error: "Unauthorized" });
      }

      const { ...data } = req.body;

      // Delete fields that should not be updated
      delete data.id;
      delete data.user_id;
      delete data.password;
      delete data.created_at;
      delete data.updated_at;

      // Check if a file (profile image) is uploaded
      if (!req.file) {
        return res.status(400).json({ error: 'No image file uploaded' });
      }

      // Save the file in the "profile-images" folder in Firebase
      const fileName = req.file.originalname; // Retain the original file name
      const filePath = `profile-images/${fileName}`; // File stored in "profile-images" folder
      const blob = bucket.file(filePath);
      const blobStream = blob.createWriteStream({
        resumable: false,
        metadata: {
          contentType: req.file.mimetype,
        },
      });

      blobStream.on('error', (uploadError) => {
        console.error('Error uploading to Firebase:', uploadError);
        return res.status(500).json({ error: 'Error uploading image to Firebase' });
      });

      blobStream.on('finish', async () => {
        try {
          const publicUrl = `https://storage.googleapis.com/${bucket.name}/${filePath}`;

          // Update the user in the database with the new profile image URL
          data.profile_img = publicUrl;

          const updatedUser = await prisma.users.update({
            where: { user_id: userId },
            data,
          });

          if (updatedUser) {
            const { first_name, middle_name, last_name, username, email, phone_no, address, gender } = updatedUser;
            return res.status(200).json({
              first_name,
              middle_name,
              last_name,
              username,
              email,
              phone_no,
              address,
              gender,
              profile_img: [{ file: req.file, name: fileName, url: publicUrl, error: null }], 
            });
          } else {
            return res.status(404).json({ error: "User not found" });
          }
        } catch (dbError) {
          console.error('Database error:', dbError);
          res.status(500).json({ error: 'Error saving user data to database' });
        }
      });

      blobStream.end(req.file.buffer);
    });
  } catch (error: any) {
    console.error("Unexpected error:", error);
    return res.status(500).json({ error: "An unexpected error occurred" });
  }
};
