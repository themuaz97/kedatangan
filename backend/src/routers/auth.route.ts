import express from 'express';
import { getLoggedUser, login, loginMicrosoft, logout, logoutMicrosoft, register } from '../controllers/auth.controller.js';
import { protectRoute, protectRouteMicrosoft } from '../middleware/auth.middleware.js';

const router = express.Router();

router.get('/me', protectRoute, getLoggedUser);
router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);

// router.get('/me', protectRoute, getLoggedUser);
// router.get('/login', loginMicrosoft);
// router.get('/redirect', redirect);
// router.get('/logout', logoutMicrosoft);

export { router as authRouter };
