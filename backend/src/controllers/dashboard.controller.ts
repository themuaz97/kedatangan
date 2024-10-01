import { Request, Response } from "express";
import prisma from "../db/prisma.js";
import internal from "stream";
import { Provider } from "@prisma/client";

export const registeredUsers = async (req: Request, res: Response) => {
  try {
    const internalCount = await prisma.users.count({
      where: {
        auth_methods: {
          some: {
            provider: Provider.internal
          }
        }
      }
    })

    const microsoftCount = await prisma.users.count({
      where: {
        auth_methods: {
          some: {
            provider: Provider.microsoft
          }
        }
      }
    })

    const internalUsers = await prisma.auth_methods.findMany({
      where: {
        provider: Provider.internal
      },
      include: {
        users: {
          select: {
            email: true,
            username: true,
          }
        }
      }
    })

    const microsoftUsers = await prisma.auth_methods.findMany({
      where: {
        provider: Provider.microsoft
      },
      include: {
        users: {
          select: {
            email: true,
            username: true,
          }
        }
      }
    })

    res.status(200).json({internalCount, microsoftCount, internalUsers, microsoftUsers});
  } catch (error: any) {
    res.status(500).json({ error: "Failed to get registered users" });
  }
}