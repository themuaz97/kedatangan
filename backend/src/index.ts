import express from 'express';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import dotenv from 'dotenv';
import { authRouter } from './routers/auth.route.js';
import cors from 'cors';

dotenv.config();

const app = express();

app.use(cookieParser());
app.use(express.json());

app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
}))

app.use(session({
  secret: process.env.EXPRESS_SESSION_SECRET as string,
  resave: false,
  saveUninitialized: false
}));

app.use('/api/auth', authRouter)

const PORT = process.env.PORT || 3003;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});