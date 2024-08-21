import { NextFunction, Request, Response } from "express";
import { pca } from "../config/msal.js";
import { AccountInfo } from "@azure/msal-node";
import jwt from 'jsonwebtoken';

declare global {
  namespace Express {
    interface Request {
      user?: AccountInfo;
    }
  }
}

export const protectRoute = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.auth_token;

  if (!token) {
    return res.status(401).send('Access Denied. No token provided.');
  } 

  try {

    const decodedToken = jwt.decode(token);
    console.log('Decoded Token Before OBO:', decodedToken);

    const oboRequest = {
      oboAssertion: token,
      scopes: [`api://${process.env.CLIENT_ID}/User.Read`]
    };
    
    const result = await pca.acquireTokenOnBehalfOf(oboRequest);
    // console.log('OBO Result:', result);

    if (result && result.account) {
      console.log('Token acquired successfully');
      req.user = result.account;
      next();
    } else {
      console.log('No account information in the result');
      res.status(401).send('Invalid token: No account information');
    }
  } catch (error: any) {
    console.error('Error acquiring token:', error);
    if (error.name === 'InteractionRequiredAuthError') {
      res.status(401).send('Token expired. Please log in again.');
    } else if (error.name === 'ClientAuthError') {
      res.status(401).send('Invalid token. Please log in again.');
    } else {
      res.status(500).send('An error occurred while validating your session.');
    }
  }
}