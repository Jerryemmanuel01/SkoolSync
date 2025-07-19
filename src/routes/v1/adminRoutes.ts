import express from 'express';
import {
	createSubAdmin,
	deleteSubAdmin,
	fetchAdmin,
	loginAdmin,
	logoutAdmin,
	requestAccessToken,
	suspendSubAdmin,
	updateSubAdmin
} from '../../controllers/adminControllers';
import { authMiddleware, subAdminAuthMiddleware } from '../../middleware/adminAuthHandler';
import { validateRequest } from '../../middleware/validationHandler';
import { loginValidationSchema, registerValidationSchema, requestAccessTokenSchema } from '../../validation/adminValidation';

export const adminRoute = express.Router();

adminRoute.post('/login', validateRequest(loginValidationSchema), loginAdmin);
adminRoute.post('/register', authMiddleware, validateRequest(registerValidationSchema), createSubAdmin);
adminRoute.put('/update/:adminId', subAdminAuthMiddleware, updateSubAdmin);
adminRoute.delete('/delete/:adminId', authMiddleware, deleteSubAdmin);
adminRoute.put('/suspend/:adminId', authMiddleware, suspendSubAdmin);
adminRoute.post('/logout', authMiddleware, logoutAdmin);
adminRoute.get('/', subAdminAuthMiddleware, fetchAdmin);
adminRoute.post('/refresh-token', validateRequest(requestAccessTokenSchema), requestAccessToken);
