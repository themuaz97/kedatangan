import { Request, Response } from "express";
import prisma from "../db/prisma.js";


export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await prisma.users.findMany();

    res.status(200).json(users);
  } catch (error: any) {
    res.status(500).send(error);
  }
}