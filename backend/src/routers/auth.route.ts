import express from 'express';
import { forgotPassword, getLoggedUser, login, logout, microsoftLogin, redirect, register, resetPassword } from '../controllers/auth.controller.js';
import { protectRoute } from '../middleware/auth.middleware.js';

const router = express.Router();

router.get('/me', protectRoute, getLoggedUser);
router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
// router.post('/refresh-token', refreshToken);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);

router.get('/microsoft-login', microsoftLogin);
router.get('/redirect', redirect);

export { router as authRouter };
