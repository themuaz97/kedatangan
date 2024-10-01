import { Response } from "express";
import jwt from "jsonwebtoken";
import prisma from "../db/prisma.js";
import { deleteExpiredTokens } from "./expiredToken.js";

export const generateToken = async (
  userId: number,
  res: Response,
  provider: "internal" | "microsoft",
  token_type: 'auth' | 'reset'
) => {
  // Clean up expired tokens
  await deleteExpiredTokens();

  // 1. Generate the JWT token (access token)
  const accessToken = jwt.sign({ userId }, process.env.SECRET_KEY!, {
    expiresIn: "20m",
  });

  // 2. Generate the refresh token
  const refreshToken = jwt.sign({ userId }, process.env.REFRESH_SECRET_KEY!, {
    expiresIn: "7d",
  });

  // 3. Calculate the expiration times
  const accessExpiresAt = new Date(Date.now() + 20 * 60 * 1000); // 20 minutes
  const refreshExpiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days

  // 4. Store the authentication method if not already existing
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

  // 5. Store the tokens in the database
  await prisma.tokens.create({
    data: {
      token: accessToken,
      refresh_token: refreshToken,
      expires_at: accessExpiresAt,
      refresh_expires_at: refreshExpiresAt,
      token_type,
      users: {
        connect: {
          user_id: userId,
        },
      },
    },
  });

  // 6. Set the JWT tokens as HTTP-only cookies
  res.cookie("jwt", accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "development",
    sameSite: "none",
    maxAge: 20 * 60 * 1000, // 20 minutes
  });

  res.cookie("refreshJwt", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "development",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });

  return { accessToken, refreshToken };
};
