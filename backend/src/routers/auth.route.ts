import express from 'express';
import { login, redirect, getLoggedUser, logout } from '../controllers/auth.controller.js';
import { protectRoute } from '../middleware/auth.middleware.js';

const router = express.Router();

router.get('/me', protectRoute, getLoggedUser);
router.get('/login', login);
router.get('/redirect', redirect);
router.get('/logout', logout);

export { router as authRouter };
