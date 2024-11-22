import { Request, Response } from "express";
import { pca } from "../config/msal.js";
import prisma from "../db/prisma.js";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/token.js";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import { generateRandomUserId } from "../utils/generateUserId.js";
import { Provider } from "@prisma/client";

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
      roleId
    } = req.body;

    if (
      !userId ||
      !firstName ||
      !lastName ||
      !username ||
      !email ||
      !password ||
      !roleId
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

    const profileImgUrl = `https://avatar.iran.liara.run/username?username=${firstName}+${lastName}`

    const newUser = await prisma.users.create({
      data: {
        user_id: userId,
        first_name: firstName,
        last_name: lastName,
        username: username,
        email: email,
        password: hashedPassword,
        profile_img: profileImgUrl,
        role_id: roleId,
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

// TODO betulkan generateToken send ke headers bukan ke cookies
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

    const { accessToken, refreshToken } = await generateToken(user.user_id, res, Provider.internal, "auth");
    
    res.status(200).json({
      user: {
        username: user.username,
        email: user.email,
        role_id: user.role_id
      },
      accessToken,
      refreshToken
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const logout = async (req: Request, res: Response) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });

    const token = req.cookies.jwt;

    if (token) {
      const decodedToken = jwt.verify(token, process.env.SECRET_KEY!) as {
        userId: string;
      };

      await prisma.tokens.deleteMany({
        where: {
          access_token: token,
          user_id: parseInt(decodedToken.userId, 10),
        },
      });
    }

    res.status(200).json({ message: "Logged out successfully" });
  } catch (error: any) {
    console.log("error in logout", error.message);
    res.status(500).json({ error: "Failed to logout" });
  }
};

export const getLoggedUser = async (req: Request, res: Response) => {
  try {
    const user = await prisma.users.findFirst({
      where: { user_id: req.users?.user_id },
      include: {
        roles: {
          select: { role_name: true },
        },
        companies: {
          select: { name: true },
        },
        departments: {
          select: { name: true },
        },
        positions: {
          select: { name: true },
        },
      },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.status(200).json({
      user_id: user.user_id,
      first_name: user.first_name,
      last_name: user.last_name,
      username: user.username,
      email: user.email,
      phone_no: user.phone_no,
      address: user.address,
      gender: user.gender,
      profile_img: user.profile_img,
      role_id: user.role_id,
      role: user.roles?.role_name,           // Get the role name
      company: user.companies?.name,     // Get the company name
      department: user.departments?.name, // Get the department name
      position: user.positions?.name,   // Get the position name
    });
  } catch (error: any) {
    console.error("Failed to get logged user:", error);
    return res.status(500).json({ error: "Failed to get logged user" });
  }
};

export const refreshToken = async (req: Request, res: Response) => {
  const refreshToken = req.cookies.refreshJwt;

  if (!refreshToken) {
    return res.status(401).send("Refresh token not found");
  }

  try {
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_SECRET_KEY!) as { userId: number };
    const storedToken = await prisma.tokens.findFirst({
      where: {
        refresh_token: refreshToken,
        user_id: decoded.userId,
        refresh_expired_at: {
          gt: new Date(),
        },
      },
    });

    if (!storedToken) {
      return res.status(403).send("Invalid refresh token");
    }

    const { accessToken, refreshToken: newRefreshToken } = await generateToken(decoded.userId, res, "internal", "auth");

    res.status(200).json({
      accessToken: accessToken,
      refreshToken: newRefreshToken,
    });
  } catch (error) {
    return res.status(403).send("Invalid refresh token");
  }
};

export const forgotPassword = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }

    const user = await prisma.users.findUnique({ where: { email: email } });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const token = await generateToken(user.user_id, res, "internal", "reset");

    const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;

    // Create a Nodemailer transporter
    const transporter = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "9b81f2b6fa8179",
        pass: "c020bc3a69c318"
      }
    });

    // Email options
    const mailOptions = {
      from: "no-reply@yourdomain.com",
      to: user.email,
      subject: "Password Reset Request",
      text: `Hello ${user.first_name},\n\nTo reset your password, please click the following link:\n${resetLink}\n\nIf you did not request a password reset, please ignore this email.\n\nBest regards,\nYour Company Name`,
      html: `<p>Hello ${user.first_name},</p>
             <p>To reset your password, please click the following link:</p>
             <a href="${resetLink}">${resetLink}</a>
             <p>If you did not request a password reset, please ignore this email.</p>
             <p>Best regards,<br>Your Company Name</p>`,
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    res.status(200).json({
      email: user.email,
      message: "Check your email for the reset link",
    });
  } catch (error: any) {
    res.status(500).json({ error: "Error in forgot password" });
  }
};

export const resetPassword = async (req: Request, res: Response) => {
  try {
    const { token, newPassword } = req.body;

    if (!token || !newPassword) {
      return res.status(400).json({ error: "Token and new password are required" });
    }

    // Verify the token and extract the user ID
    let decoded: any;
    try {
      decoded = jwt.verify(token, process.env.SECRET_KEY!);
    } catch (err) {
      return res.status(400).json({ error: "Invalid or expired token" });
    }

    const userId = decoded.userId;

    // Check if the user exists in the database
    const user = await prisma.users.findUnique({ where: { user_id: userId } });
    
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Check if the token exists in the database and has not expired
    const tokenRecord = await prisma.tokens.findFirst({
      where: {
        access_token: token,
        token_type: "reset",
        user_id: userId,
        expired_at: {
          gte: new Date(),
        },
      },
    });

    if (!tokenRecord) {
      return res.status(400).json({ error: "Invalid or expired token" });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update the user's password in the database
    await prisma.users.update({
      where: { user_id: userId },
      data: { password: hashedPassword },
    });

    // Delete the token after successful password reset to prevent reuse
    await prisma.tokens.delete({
      where: { id: tokenRecord.id },
    });

    res.status(200).json({ message: "Password has been reset successfully" });
  } catch (error: any) {
    console.error("Error in reset password:", error);
    res.status(500).json({ error: "Error in resetting password" });
  }
};

export const microsoftLogin = (req: Request, res: Response) => {
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

export const redirect = (req: Request, res: Response) => {
  const tokenRequest = {
    code: req.query.code as string,
    scopes: [`api://${process.env.CLIENT_ID}/User.Read`],
    redirectUri: process.env.REDIRECT_URI as string
  };

  pca.acquireTokenByCode(tokenRequest).then(async (response) => {
    if (response && response.account) {
      const user = await prisma.users.upsert({
        where: { email: response.account.username },
        update: { 
          first_name: response.account.name || undefined,
        },
        create: {
          user_id: Number(generateRandomUserId()),
          email: response.account.username,
          first_name: response.account.name as string,
          username: response.account.username as string,
          auth_methods: {
            create: {
              provider: Provider.microsoft, // jangan delete ni nanti ada double data dekat auth_methods
              provider_id: response.account.localAccountId
            }
          }
        }
      });

      await generateToken(user.user_id, res, Provider.microsoft, 'auth');

      res.redirect(`${process.env.FRONTEND_URL}/profile`);
    } else {
      res.status(400).json({ message: 'Invalid response from token acquisition'});
    }
  }).catch((error) => {
    console.log(error);
    res.status(500).json(error);
  });
};

export const getMicrosoftUser = async (req: Request, res: Response) => {
  try {
    if (!req.user || !req.user.localAccountId) {
      return res.status(400).send('User information not available');
    }

    const user = await prisma.auth_methods.findUnique({
      where: {
        provider_id: req.user.localAccountId
      },
      include: {
        users: {
          select: {
            user_id: true,
            email: true,
            first_name: true,
            last_name: true,
            username: true,
            address: true,
            phone_no: true,
            gender: true,
            profile_img: true,
            role_id: true
          }
        }
      }
    });

    if (user) {
      res.status(200).json(user.users);
    } else {
      res.status(404).send('User not found in database');
    }
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).send('Internal server error');
  }
};

export const logoutMicrosoft = (req: Request, res: Response) => {
  // Clear the auth token cookie
  res.clearCookie("ms_token");

  // Construct the Microsoft logout URL
  const logoutUri = `https://login.microsoftonline.com/${
    process.env.TENANT_ID
  }/oauth2/v2.0/logout?post_logout_redirect_uri=${encodeURIComponent(
    process.env.BASE_URL as string
  )}`;

  // Send the logout URL to the client
  res.json({ logoutUrl: logoutUri });
};
