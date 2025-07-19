// Admin Login
// Create Admin
// Update Admin
// Delete Admin
// Suspend Admin
// services/adminService.ts
import bcrypt from 'bcrypt';
import jwtUtils from '../utils/jwtUtils';
import Admin from '../models/adminModel';
import { IAdmin, IAdminLogin } from '../interfaces/IAdmin';
import tokenModel from '../models/tokenModel';
import { IToken } from '../interfaces/IToken';
import { JwtPayload } from 'jsonwebtoken';
import { IServiceResponse } from '../interfaces/IServiceResponse';
import { AppError } from '../helpers/AppError';
import { IParams } from '../interfaces/IParams';

export const login_Admin = async (params: IParams<IAdminLogin>) => {
	try {
		const { email, password } = params.data;

		// Check if admin exists
		const admin = await Admin.findOne({ email });
		if (!admin) {
			throw new AppError('Admin not found', 404);
		}

		// Check if admin is suspended
		if (admin.isSuspended) {
			throw new AppError('Account is suspended', 403);
		}

		// Verify password
		const isMatch = await bcrypt.compare(password, admin.password);
		if (!isMatch) {
			throw new AppError('Invalid credentials', 401);
		}

		// Generate tokens
		const tokens = jwtUtils.generateAdminTokens(admin);

		// Store refresh token
		const refreshTokenExpiresIn = 30 * 24 * 60 * 60 * 1000; // 30 days
		const expiresAt = new Date(Date.now() + refreshTokenExpiresIn);

		// Check if token already exists and update or create new
		const checkExistingTokens = await tokenModel.findOne({ adminId: admin._id });
		if (checkExistingTokens) {
			await tokenModel.findOneAndUpdate({ adminId: admin._id }, { refreshToken: tokens.refreshToken, expiresAt: expiresAt });
		} else {
			await tokenModel.create({
				adminId: admin._id,
				refreshToken: tokens.refreshToken,
				expiresAt: expiresAt
			});
		}

		// Return success response
		return {
			success: true,
			message: 'Login successful',
			data: {
				accessToken: tokens.accessToken,
				refreshToken: tokens.refreshToken
			}
		};
	} catch (error: any) {
		// Pass through AppErrors
		if (error instanceof AppError) {
			throw error;
		}

		// Or create a new error
		throw new AppError(error.message || 'Login failed', 500);
	}
};

export const create_SubAdmin = async (params: IParams<IAdmin>) => {
	try {
		const adminData = params.data;
		const { email, password } = adminData;

		// Check if admin already exists
		const checkAdminExistence = await Admin.findOne({ email });
		if (checkAdminExistence) {
			throw new AppError('Admin already exists', 409);
		}

		// Hash password
		const hashedPassword = await bcrypt.hash(password, 10);

		// Remove confirmPassword if present
		const { confirmPassword, ...adminDataWithoutConfirmPassword } = adminData;

		// Create new admin
		const newAdmin = new Admin({
			...adminDataWithoutConfirmPassword,
			password: hashedPassword
		});

		await newAdmin.save();

		return {
			success: true,
			message: 'Admin created successfully',
			data: newAdmin
		};
	} catch (error: any) {
		if (error instanceof AppError) {
			throw error;
		}

		throw new AppError(error.message || 'Error creating admin', 500);
	}
};

export const suspend_SubAdmin = async (params: IParams): Promise<IServiceResponse<null>> => {
	try {
		const { adminId } = params.query;

		// Find the admin
		const fetchSubAdmin = await Admin.findById(adminId);
		if (!fetchSubAdmin) {
			throw new AppError('Admin not found', 404);
		}

		// Update suspension status
		fetchSubAdmin.isSuspended = true;
		await fetchSubAdmin.save();

		return {
			success: true,
			message: 'Admin suspended successfully',
			data: null
		};
	} catch (error: any) {
		if (error instanceof AppError) {
			throw error;
		}

		throw new AppError('Error suspending admin', 500);
	}
};

export const update_sub_admin = async (params: IParams) => {
	try {
		const { id } = params.user;
		const { adminId } = params.query;
		const adminData = params.data;

		// Verify the requesting admin exists
		const fetchUser = await Admin.findById(id);
		if (!fetchUser) {
			throw new AppError('User not found', 404);
		}

		// Update the sub-admin
		const updatedAdmin = await Admin.findByIdAndUpdate(adminId, adminData, { new: true });

		if (!updatedAdmin) {
			throw new AppError('Admin not found', 404);
		}

		return {
			success: true,
			message: 'Admin updated successfully',
			data: updatedAdmin
		};
	} catch (error: any) {
		if (error instanceof AppError) {
			throw error;
		}

		throw new AppError(`Error updating admin: ${error.message}`, 500);
	}
};

export const delete_sub_admin = async (params: IParams): Promise<IServiceResponse<null>> => {
	try {
		const { adminId } = params.query;

		// Delete the admin
		const deletedAdmin = await Admin.findByIdAndDelete(adminId);

		if (!deletedAdmin) {
			throw new AppError('Admin not found', 404);
		}

		return {
			success: true,
			message: 'Admin deleted successfully',
			data: null
		};
	} catch (error: any) {
		if (error instanceof AppError) {
			throw error;
		}

		throw new AppError('Error deleting admin', 500);
	}
};

export const logout_admin = async (params: IParams<{ refreshToken: string }>): Promise<IServiceResponse<null>> => {
	try {
		const { refreshToken } = params.data;

		// Find and delete refresh token
		const result = await tokenModel.findOneAndDelete({ refreshToken });
		if (!result) {
			throw new AppError('Refresh token not found', 404);
		}

		return {
			success: true,
			message: 'Logout successful',
			data: null
		};
	} catch (error: any) {
		if (error instanceof AppError) {
			throw error;
		}

		throw new AppError(`${error.message}`, 500);
	}
};

export const fetch_admin_details = async (params: IParams) => {
	try {
		const { id } = params.user;

		// Find admin by ID
		const fetchAdmin = await Admin.findById(id).select('-password');
		if (!fetchAdmin) {
			throw new AppError('Admin not found', 404);
		}

		return {
			success: true,
			message: 'Admin details fetched successfully',
			data: fetchAdmin
		};
	} catch (error: any) {
		if (error instanceof AppError) {
			throw error;
		}

		throw new AppError(`${error.message}`, 500);
	}
};

export const get_access_token = async (params: IParams<IToken>) => {
	try {
		const token = params.data;

		// Check if refresh token exists
		const checkExistingTokens = await tokenModel.findOne({
			refreshToken: token.refreshToken
		});

		if (!checkExistingTokens) {
			throw new AppError('Invalid refresh token', 401);
		}

		// Verify refresh token
		const decoded = jwtUtils.verifyAdminRefreshToken(token.refreshToken) as JwtPayload & {
			id: IAdmin['_id'];
		};

		if (!decoded) {
			throw new AppError('Invalid refresh token', 401);
		}

		// Find admin
		const admin = await Admin.findById(decoded.id);
		if (!admin) {
			throw new AppError('Admin not found', 404);
		}

		// Generate new tokens
		const tokens = jwtUtils.generateAdminTokens(admin as IAdmin);
		const refreshTokenExpiresIn = 30 * 24 * 60 * 60 * 1000;

		// Update token in database
		await tokenModel.findOneAndUpdate(
			{ refreshToken: token.refreshToken },
			{
				refreshToken: tokens.refreshToken,
				expiresAt: new Date(Date.now() + refreshTokenExpiresIn)
			}
		);

		return {
			success: true,
			message: 'Access token refreshed successfully',
			data: {
				accessToken: tokens.accessToken,
				refreshToken: tokens.refreshToken
			}
		};
	} catch (error: any) {
		if (error instanceof AppError) {
			throw error;
		}

		throw new AppError(`${error.message}`, 500);
	}
};
