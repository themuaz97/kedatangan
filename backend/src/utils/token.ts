import { Response } from "express";
import jwt from "jsonwebtoken";
import prisma from "../db/prisma.js";
import { deleteExpiredTokens } from "./expiredToken.js";

export const generateToken = async (
  userId: string,
  res: Response,
  provider: "internal" | "microsoft",
  token_type: 'auth' | 'reset'
) => {
  // Delete expired tokens
  await deleteExpiredTokens();

  // 1. Generate the JWT token
  const token = jwt.sign({ userId }, process.env.SECRET_KEY!, {
    expiresIn: "1h",
  });

  // 2. Calculate the expiration time
  const expiresAt = new Date();
  expiresAt.setMinutes(expiresAt.getHours() + 1); // Token expires in x minutes

  res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "development", // Use secure cookies in development
    sameSite: "strict",
    maxAge: 60 * 60 * 1000, // x minutes in milliseconds
  });

  // 3. Store the authentication method if not already existing
  const authMethod = await prisma.auth_methods.upsert({
    where: {
      user_id_provider: {
        user_id: userId,
        provider: provider,
      },
    },
    update: {
      updated_at: new Date(),
    },
    create: {
      provider: provider,
      user_id: userId,
    },
  });

  // 4. Store the token in the database
  await prisma.tokens.create({
    data: {
      token: token,
      expires_at: expiresAt,
      token_type,
      users: {
        connect: {
          user_id: userId, // Connect token to the correct user
        },
      },
    },
  });

  return token;
};
