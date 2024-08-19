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

      const token = response.accessToken;

      res.redirect(`${process.env.FRONTEND_URL}/redirect?token=${token}`);
    } else {
      res.status(400).send('Invalid response from token acquisition');
    }
  }).catch((error) => {
    console.log(error);
    res.status(500).send(error);
  });
};

export const getLoggedUser = async (req: Request, res: Response) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(' ')[1];
    try {
      const response = await pca.acquireTokenOnBehalfOf({
        oboAssertion: token,
        scopes: [`api://${process.env.CLIENT_ID}/User.Read`],
      });
      if (response && response.account) {
        const user = await prisma.user.findUnique({
          where: { email: response.account.username }
        });
        console.log('User found in database:', user);
        res.json(user);
      } else {
        res.status(400).send('Invalid response from token acquisition');
      }
    } catch (error) {
      console.error('Error during token acquisition:', error);
      res.status(401).send('Unauthorized');
    }
  } else {
    res.status(401).send('Unauthorized');
  }
};

export const logout = (req: Request, res: Response) => {
  const logoutUri = `${process.env.POST_LOGOUT_REDIRECT_URI}/oauth2/v2.0/logout?post_logout_redirect_uri=${process.env.POST_LOGOUT_REDIRECT_URI}`;
  res.redirect(logoutUri);
};
