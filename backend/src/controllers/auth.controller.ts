import { Request, Response } from 'express';
import { pca } from '../config/msal.js';
import prisma from '../db/prisma.js';

export const login = (req: Request, res: Response) => {
  const authCodeUrlParameters = {
    scopes: [`api://${process.env.CLIENT_ID}/User.Read`],
    redirectUri: process.env.REDIRECT_URI as string
  };

  pca.getAuthCodeUrl(authCodeUrlParameters).then((response) => {
    res.redirect(response);
  }).catch((error) => console.log(JSON.stringify(error)));
};

export const redirect = (req: Request, res: Response) => {
  const tokenRequest = {
    code: req.query.code as string,
    scopes: [`api://${process.env.CLIENT_ID}/User.Read`],
    redirectUri: process.env.REDIRECT_URI as string
  };

  pca.acquireTokenByCode(tokenRequest).then(async (response) => {
    if (response && response.account) {
      const user = await prisma.user.upsert({
        where: { email: response.account.username },
        update: { displayName: response.account.name || undefined },
        create: { 
          email: response.account.username, 
          displayName: response.account.name || undefined 
        }
      });

      const token = response.accessToken

      res.cookie('auth_token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'development',
        sameSite: 'strict',
        maxAge: 30 * 24 * 60 * 60 * 1000
      });

      res.redirect(`${process.env.FRONTEND_URL}/profile`);
    } else {
      res.status(400).send('Invalid response from token acquisition');
    }
  }).catch((error) => {
    console.log(error);
    res.status(500).send(error);
  });
};

export const getLoggedUser = async (req: Request, res: Response) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: req.user?.username
      }
    })

    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).send('User not found');
    }
  } catch (error: any) {
    res.status(500).send(error);
  }
};

export const logout = (req: Request, res: Response) => {
  // Clear the auth token cookie
  res.clearCookie('auth_token');

  // Construct the Microsoft logout URL
  const logoutUri = `https://login.microsoftonline.com/${process.env.TENANT_ID}/oauth2/v2.0/logout?post_logout_redirect_uri=${encodeURIComponent(process.env.POST_LOGOUT_REDIRECT_URI as string)}`;

  // Send the logout URL to the client
  res.json({ logoutUrl: logoutUri });
};
