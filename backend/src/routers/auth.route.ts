import express from 'express';
import { login, redirect, getLoggedUser, logout } from '../controllers/auth.controller.js';

const router = express.Router();

router.get('/login', login);
router.get('/redirect', redirect);
router.get('/me', getLoggedUser);
router.get('/logout', logout);

export { router as authRouter };
