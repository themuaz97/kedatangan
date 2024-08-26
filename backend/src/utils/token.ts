import { Response } from "express";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const generateToken = async (
  userId: number,
  res: Response,
  provider: "internal" | "microsoft_sso"
) => {
  // 1. Generate the JWT token
  const token = jwt.sign({ userId }, process.env.SECRET_KEY!, {
    expiresIn: "20m",
  });

  // 2. Calculate the expiration time
  const expiresAt = new Date();
  expiresAt.setMinutes(expiresAt.getMinutes() + 20); // Token expires in 20 minutes

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
      users: {
        connect: {
          user_id: userId, // Connect token to the correct user
        },
      },
    },
  });

  // 5. Set the JWT token as an HTTP-only cookie
  res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "development", // Use secure cookies in production
    sameSite: "strict",
    maxAge: 20 * 60 * 1000, // 20 minutes in milliseconds
  });

  return token;
};
