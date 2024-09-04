import { Request, Response } from "express";
import prisma from "../db/prisma.js";

export const updateMe = async (req: Request, res: Response) => {
  try {
    // Assuming you're using some authentication middleware to add the user ID to the request object
    const userId = req.users?.user_id;

    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    // Extract all fields from the request body
    const { ...data } = req.body;

    // Delete fields that should not be updated
    delete data.id;
    delete data.user_id;     
    delete data.password;    
    delete data.created_at;  
    delete data.updated_at;  

    // Update the user in the database
    const updatedUser = await prisma.users.update({
      where: {
        user_id: userId,
      },
      data,  // Use the filtered `data` object directly
    });

    if (updatedUser) {
      // Selectively choose fields to return in the response
      const { first_name, middle_name, last_name, username, email, phone_no, address, gender, profile_img } = updatedUser;
      
      return res.status(200).json({
        first_name,
        middle_name,
        last_name,
        username,
        email,
        phone_no,
        address,
        gender,
        profile_img,
      });
    } else {
      return res.status(404).json({ error: "User not found" });
    }
  } catch (error: any) {
    console.error("Error updating user:", error);
    return res.status(500).json({ error: "Failed to update user" });
  }
};