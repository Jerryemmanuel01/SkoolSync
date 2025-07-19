import express from 'express';
import { loginUser, registerUser } from '../../controllers/authController';
import { validateRequest } from '../../middleware/validationHandler';
import { loginValidationSchema, registerValidationSchema } from '../../validation/userValidation';

export const authRoute = express.Router();
// Route to register a new user
authRoute.post('/register', validateRequest(registerValidationSchema), registerUser);
authRoute.post('/login', validateRequest(loginValidationSchema), loginUser);
