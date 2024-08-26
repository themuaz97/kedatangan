import { Request, Response } from "express";
import { pca } from "../config/msal.js";
import prisma from "../db/prisma.js";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/token.js";
import jwt from "jsonwebtoken";

export const register = async (req: Request, res: Response) => {
  try {
    const {
      userId,
      firstName,
      lastName,
      username,
      email,
      password,
      confirmPassword,
    } = req.body;

    if (
      !userId ||
      !firstName ||
      !lastName ||
      !username ||
      !email ||
      !password
    ) {
      return res.status(400).send("All fields are required");
    }

    if (password !== confirmPassword) {
      return res.status(400).send("Passwords do not match");
    }

    const user = await prisma.users.findUnique({ where: { email: email } });

    if (user) {
      return res.status(400).send("User already exists");
    }

    const salt = bcrypt.genSaltSync();
    const hashedPassword = bcrypt.hashSync(password, salt);

    const newUser = await prisma.users.create({
      data: {
        user_id: userId,
        first_name: firstName,
        last_name: lastName,
        username: username,
        email: email,
        password: hashedPassword,
        status: 1,
      },
    });

    if (newUser) {
      // const token = generateToken(newUser.user_id, res, "internal");
      res.status(200).json({
        username: newUser.username,
        email: newUser.email,
        // token: token,
      });
    }
  } catch (error: any) {
    console.log("error in register", error);
    res.status(500).send(error);
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).send("Email and password are required");
    }

    const user = await prisma.users.findUnique({ where: { email: email } });

    if (!user) {
      return res.status(401).send("Invalid email or password");
    }

    const correctPassword = await bcrypt.compare(
      password,
      user.password as string
    );

    if (!correctPassword) {
      return res.status(401).send("Incorrect password");
    }

    const token = await generateToken(user.user_id, res, "internal");

    res.status(200).json({
      username: user.username,
      email: user.email,
      token: token,
    });
  } catch (error: any) {
    res.status(500).send(error);
  }
};

export const logout = async (req: Request, res: Response) => {
  try {
    res.cookie("jwt", "", {maxAge: 0,});

    const token = req.cookies.jwt;

    if (token) {
      const decodedToken = jwt.verify(token, process.env.SECRET_KEY!) as {
        userId: number;
      };

      await prisma.tokens.deleteMany({
        where: {
          token: token,
          user_id: decodedToken.userId,
        },
      });
    }

    res.status(200).json({ message: "Logged out successfully" });
  } catch (error: any) {
    console.log('error in logout', error.message);
    res.status(500).json({ error: "Failed to logout" });
  }
};

export const getLoggedUser = async (req: Request, res: Response) => {
  try {
    const user = await prisma.users.findFirst({
      where : {user_id: req.users?.user_id},
    })

    if (!user) {
      res.status(404).json({error: "User not found"});
    }

    res.status(200).json({
      user_id: user?.user_id,
      username: user?.username,
    });
  } catch (error: any) {
    res.status(500).json({error: "Failed to get logged user"});
  }
}

export const loginMicrosoft = (req: Request, res: Response) => {
  const authCodeUrlParameters = {
    scopes: [`api://${process.env.CLIENT_ID}/User.Read`],
    redirectUri: process.env.REDIRECT_URI as string,
  };

  pca
    .getAuthCodeUrl(authCodeUrlParameters)
    .then((response) => {
      res.redirect(response);
    })
    .catch((error) => console.log(JSON.stringify(error)));
};

// export const redirect = (req: Request, res: Response) => {
//   const tokenRequest = {
//     code: req.query.code as string,
//     scopes: [`api://${process.env.CLIENT_ID}/User.Read`],
//     redirectUri: process.env.REDIRECT_URI as string
//   };

//   pca.acquireTokenByCode(tokenRequest).then(async (response) => {
//     if (response && response.account) {
//       const user = await prisma.users.upsert({
//         where: { email: response.account.username },
//         update: { displayName: response.account.name || undefined },
//         create: {
//           email: response.account.username,
//           displayName: response.account.name || undefined
//         }
//       });

//       const token = response.accessToken

//       res.cookie('auth_token', token, {
//         httpOnly: true,
//         secure: process.env.NODE_ENV === 'development',
//         sameSite: 'strict',
//         maxAge: 30 * 24 * 60 * 60 * 1000
//       });

//       res.redirect(`${process.env.FRONTEND_URL}/profile`);
//     } else {
//       res.status(400).send('Invalid response from token acquisition');
//     }
//   }).catch((error) => {
//     console.log(error);
//     res.status(500).send(error);
//   });
// };

// export const getLoggedUser = async (req: Request, res: Response) => {
//   try {
//     const user = await prisma.users.findUnique({
//       where: {
//         email: req.user?.username
//       }
//     })

//     if (user) {
//       res.status(200).json(user);
//     } else {
//       res.status(404).send('User not found');
//     }
//   } catch (error: any) {
//     res.status(500).send(error);
//   }
// };

export const logoutMicrosoft = (req: Request, res: Response) => {
  // Clear the auth token cookie
  res.clearCookie("auth_token");

  // Construct the Microsoft logout URL
  const logoutUri = `https://login.microsoftonline.com/${
    process.env.TENANT_ID
  }/oauth2/v2.0/logout?post_logout_redirect_uri=${encodeURIComponent(
    process.env.POST_LOGOUT_REDIRECT_URI as string
  )}`;

  // Send the logout URL to the client
  res.json({ logoutUrl: logoutUri });
};
