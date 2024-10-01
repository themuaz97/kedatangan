import express from 'express';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import dotenv from 'dotenv';
import { authRouter } from './routers/auth.route.js';
import cors from 'cors';
import { indexRouter } from './routers/index.route.js';
import http from 'http'; // Import http to create server
import { initSocket } from '../src/utils/socket.js'; // Import your socket initialization

dotenv.config();

const app = express();
const server = http.createServer(app); // Create the server using http

app.use(cookieParser());
app.use(express.json());

app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
}));

// Uncomment if you plan to use session management
// app.use(session({
//   secret: process.env.EXPRESS_SESSION_SECRET as string,
//   resave: false,
//   saveUninitialized: false
// }));

app.use('/api/auth', authRouter);
app.use('/api', indexRouter);

// Initialize socket.io
initSocket(server);

const PORT = process.env.PORT || 3005;

server.listen(PORT, () => { // Listen on the server instead of app
  console.log(`Server is running on port ${PORT}`);
});
