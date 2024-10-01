import { NextFunction, Request, Response } from "express";
import { pca } from "../config/msal.js";
import { AccountInfo } from "@azure/msal-node";
import jwt from "jsonwebtoken";
import prisma from "../db/prisma.js";

declare global {
  namespace Express {
    export interface Request {
      user?: AccountInfo;
      users?: {
        user_id: number;
        role_id?: number;
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
    return res.status(401).json({ error: "No token found, authorization denied" });
  }

  try {
    const oboRequest = {
      oboAssertion: token,
      scopes: [`api://${process.env.CLIENT_ID}/User.Read`],
    };

    const result = await pca.acquireTokenOnBehalfOf(oboRequest);

    if (result && result.accessToken) {
      console.log("Access token acquired successfully");
      
      const decodedToken = jwt.decode(result.accessToken) as jwt.JwtPayload;
      // console.log("Decoded Access Token:", JSON.stringify(decodedToken, null, 2));

      if (decodedToken) {
        // Extract user information from the decoded token
        const partialAccountInfo: Partial<AccountInfo> = {
          username: decodedToken.unique_name || decodedToken.username,
          name: decodedToken.name,
          localAccountId: decodedToken.oid,
          tenantId: decodedToken.tid,
          environment: "login.windows.net", // This is typically constant for Azure AD
        };

        // Use type assertion to assign the partial object to req.user
        req.user = partialAccountInfo as AccountInfo;
        
        // Fetch user from database
        const user = await prisma.auth_methods.findUnique({
          where: { provider_id: req.user.localAccountId },
        });

        if (user) {
          req.users = { user_id: user.user_id };
        } else {
          console.log("User not found in database");
        }

        next();
      } else {
        console.log("Unable to decode access token");
        res.status(401).send("Invalid token: Unable to decode");
      }
    } else {
      console.log("No access token in the result");
      res.status(401).send("Invalid token: No access token");
    }
  } catch (error: any) {
    console.error("Error acquiring token:", error);
    if (error.errorCode) {
      console.error("Error Code:", error.errorCode);
      console.error("Error Message:", error.errorMessage);
    }
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
      where: { user_id: Number(userId) },
      include: { roles: true }, // Include related models if needed
    });

    if (!user) {
      return res.status(401).send("Invalid token, authorization denied");
    }

    // 4. Attach the user to the request object
    req.users = {
      user_id: user.user_id,
      role_id: user.role_id || 0,
    };

    // 5. Call the next middleware or route handler
    next();
  } catch (error: any) {
    res.status(500).send(error.message || "An error occurred");
  }
};

export const protectRouteAdmin = (req: Request, res: Response, next: NextFunction) => {
  // Check if the user is attached to the request (from `protectRoute` middleware)
  if (!req.users || req.users.role_id !== 1) {
    return res.status(403).json({ error: "Unauthorized, you are not an admin" });
  }

  // User is admin, proceed to the next middleware or route handler
  next();
};
