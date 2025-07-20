import express from 'express';
import { forgotPassword, loginUser, logoutUser, registerUser, resendVerificationEmail, verifyEmail } from '../../controllers/authController';
import { validateRequest } from '../../middleware/validationHandler';
import {
	emailVerificationSchema,
	forgetPasswordSchema,
	loginValidationSchema,
	logoutValidationSchema,
	registerValidationSchema
} from '../../validation/userValidation';

export const authRoute = express.Router();
// Route to register a new user
authRoute.post('/register', validateRequest(registerValidationSchema), registerUser);
// Route to login a user
authRoute.post('/login', validateRequest(loginValidationSchema), loginUser);
// Route to verify user email
authRoute.post('/verify/:userId', validateRequest(emailVerificationSchema), verifyEmail);
// Route to resend verification email
authRoute.get('/resend-verification/:userId', resendVerificationEmail);
// Route to logout a user
authRoute.post('/logout', validateRequest(logoutValidationSchema), logoutUser);
// Route to forgot password
authRoute.post('/forgot-password', validateRequest(forgetPasswordSchema), forgotPassword);
