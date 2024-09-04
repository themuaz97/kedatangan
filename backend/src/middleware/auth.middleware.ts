import { NextFunction, Request, Response } from "express";
import { pca } from "../config/msal.js";
import { AccountInfo } from "@azure/msal-node";
import jwt from "jsonwebtoken";
import prisma from "../db/prisma.js";

declare global {
  namespace Express {
    interface Request {
      user?: AccountInfo;
    }

    export interface Request {
      users?: {
        user_id: string;
      };
    }
  }
}

export const protectRouteMicrosoft = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.ms_token;

  if (!token) {
    return res
      .status(401)
      .json({ error: "No token found, authorization denied" });
  }

  try {
    const decodedToken = jwt.decode(token);
    console.log("Token (first 20 chars):", token.substring(0, 20));
    if (decodedToken && typeof decodedToken !== 'string') {
      const expirationTime = decodedToken.exp ? new Date(decodedToken.exp * 1000).toISOString() : null;
      console.log('Token expiration:', expirationTime);
      console.log('Current time:', new Date().toISOString());
    }

    const oboRequest = {
      oboAssertion: token,
      scopes: [`api://${process.env.CLIENT_ID}/User.Read`],
    };

    const result = await pca.acquireTokenOnBehalfOf(oboRequest);
    // console.log('OBO Result:', result);

    if (result && result.account) {
      console.log("Token acquired successfully");
      req.user = result.account;
      next();
    } else {
      console.log("No account information in the result");
      res.status(401).send("Invalid token: No account information");
    }
  } catch (error: any) {
    console.error("Error acquiring token:", error);
    if (error.name === "InteractionRequiredAuthError") {
      res.status(401).send("Token expired. Please log in again.");
    } else if (error.name === "ClientAuthError") {
      res.status(401).send("Invalid token. Please log in again.");
    } else {
      res.status(500).send("An error occurred while validating your session.");
    }
  }
};

export const protectRoute = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // 1. Get the JWT token from the request cookies
    const token = req.cookies.jwt;

    if (!token) {
      return res.status(401).send("No token found, authorization denied");
    }

    // 2. Verify the token
    const decoded = jwt.verify(token, process.env.SECRET_KEY!) as {
      userId: string;
    };
    const userId = decoded.userId;

    // 3. Fetch the user from the database
    const user = await prisma.users.findUnique({
      where: { user_id: userId },
      include: { roles: true }, // Include related models if needed
    });

    if (!user) {
      return res.status(401).send("Invalid token, authorization denied");
    }

    // 4. Attach the user to the request object
    req.users = user;

    // 5. Call the next middleware or route handler
    next();
  } catch (error: any) {
    res.status(500).send(error.message || "An error occurred");
  }
};
