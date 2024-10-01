import { io } from 'socket.io-client';

const socket = io(import.meta.env.VITE_API_URL);

export const setupSocket = (onNotification: (data: any) => void) => {
  socket.on('notification', (data) => {
    onNotification(data);
  });

  return socket;
};

export default socket;
