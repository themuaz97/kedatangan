import { Request, Response } from "express";
import prisma from "../db/prisma.js";

export const getNotifications = async (req: Request, res: Response) => {
  try {
    const notifications = await prisma.notifications.findMany({
      where: {user_id: req.users?.user_id},
      orderBy: {created_at: 'desc'}
    })

    if (notifications) {
      res.status(200).json(notifications);
    } else {
      return res.status(404).json({ error: "Notifications not found" });
    }
  } catch (error: any) {
    res.status(500).json({ error: "Failed to get notifications" });
  }
}

export const markNotificationsAsSeen = async (req: Request, res: Response) => {
  try {
    await prisma.notifications.updateMany({
      where: { user_id: req.users?.user_id, seen: false },
      data: { seen: true },
    });
    res.status(200).json({ message: "Notifications marked as seen" });
  } catch (error: any) {
    res.status(500).json({ error: "Failed to mark notifications as seen" });
  }
};

export const markNotificationAsRead = async (req: Request, res: Response) => {

  try {
    const { id } =  req.params

    const notification = await prisma.notifications.update({
      where: { id: Number(id) },
      data: { read_status: true },
    });

    // Return the updated notification as a response
    res.status(200).json({
      message: "Notification marked as read successfully",
      notification,
    });
  } catch (error: any) {
    // Handle any errors
    console.error("Error marking notification as read:", error);
    res.status(500).json({
      message: "Failed to mark notification as read",
      error: error.message,
    });
  }
};