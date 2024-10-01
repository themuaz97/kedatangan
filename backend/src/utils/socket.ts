import { Server } from 'socket.io';
import prisma from '../db/prisma.js';
import { Request } from 'express';
import { NotificationType } from '@prisma/client';

let io: Server;

export const initSocket = (server: any) => {
  io = new Server(server, {
    cors: {
      origin: process.env.FRONTEND_URL, // Frontend URL
      methods: ["GET", "POST", "PUT", "DELETE"]
    }
  });

  io.on('connection', (socket) => {
    console.log('New client connected');

    socket.on('disconnect', () => {
      console.log('Client disconnected');
    });
  });
};

export const sendNotification = async (req: Request, message: string, notification_type: NotificationType, link: string) => {
  try {
    // Save the notification to the database
    await prisma.notifications.create({
      data: {
        user_id: req.users?.user_id,
        message: message,
        notification_type: notification_type,
        link: link
      }
    });

    // Emit the notification to all connected clients
    io.emit('notification', { message, notification_type });
  } catch (error) {
    console.error('Error sending notification:', error); // Log notification errors
  }
};
