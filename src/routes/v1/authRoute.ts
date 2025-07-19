import express from 'express';
import { registerUser } from '../../controllers/authController';
import { validateRequest } from '../../middleware/validationHandler';
import { registerValidationSchema } from '../../validation/userValidation';

export const authRoute = express.Router();
// Route to register a new user
authRoute.post('/register', validateRequest(registerValidationSchema), registerUser);

