import express from 'express';
import { loginUser, registerUser, verifyEmail } from '../../controllers/authController';
import { validateRequest } from '../../middleware/validationHandler';
import { emailVerificationSchema, loginValidationSchema, registerValidationSchema } from '../../validation/userValidation';

export const authRoute = express.Router();
// Route to register a new user
authRoute.post('/register', validateRequest(registerValidationSchema), registerUser);
// Route to login a user
authRoute.post('/login', validateRequest(loginValidationSchema), loginUser);
// Route to verify user email
authRoute.post('/verify/:userId', validateRequest(emailVerificationSchema), verifyEmail);
