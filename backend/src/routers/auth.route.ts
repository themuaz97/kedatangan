import express from 'express';
import { forgotPassword, getLoggedUser, getMicrosoftUser, login, logout, logoutMicrosoft, microsoftLogin, redirect, register, resetPassword } from '../controllers/auth.controller.js';
import { protectRoute, protectRouteMicrosoft } from '../middleware/auth.middleware.js';

const router = express.Router();

router.get('/me', protectRoute, getLoggedUser);
router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);

router.get('/me-microsoft', protectRouteMicrosoft, getMicrosoftUser);
router.get('/microsoft-login', microsoftLogin);
router.get('/redirect', redirect);
// router.get('/logout', logoutMicrosoft);

export { router as authRouter };
