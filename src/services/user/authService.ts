import bcrypt from 'bcrypt';
import sendMail from '../../utils/emailUtils';
import jwtUtils from '../../utils/jwtUtils';
import { IParams } from '../../interfaces/IParams';
import { IUser } from '../../interfaces/IUser';
import { authTokenModel } from '../../models';
import { User } from '../../models';
import { calculateExpiryTime, generateVerificationCode, VERIFICATION_CODE_LENGTH, VERIFICATION_EXPIRY_MINUTES } from '../../utils/functions';
import { getEmailTemplates } from '../../helpers/emailContents';
import { cleanupTokensAfterFailedEmailMessage } from '../../helpers/cleanUpExpiredUser';
import { TokenSchema } from '../../models';
import { IToken } from '../../interfaces/IToken';
import { Op } from 'sequelize';

export const register_user = async (params: IParams<IUser>) => {
	try {
		// Extract user data from req.body
		const userData = params.data;
		const { email } = userData;
		// Check if the user already exists
		const existingUser = await User.findOne({ where: { email: email.toLowerCase() } });
		if (existingUser) {
			throw new Error('User with this email already exists. Please login or use a different email.');
		}
		// Create a new user
		const newUser = await User.create({
			...userData,
			email: email.toLowerCase()
		});

		try {
			await newUser.save();

			const verificationCode = generateVerificationCode(VERIFICATION_CODE_LENGTH);
			const hashedVerificationCode = await bcrypt.hash(verificationCode, 10);

			await authTokenModel.create({
				userId: newUser.id,
				authCode: hashedVerificationCode,
				expiresAt: calculateExpiryTime(VERIFICATION_EXPIRY_MINUTES)
			});

			// Send verification email using Nodemailer
			const emailContent = getEmailTemplates.verificationCode({
				verificationCode
			});
			await sendMail({
				email: newUser.email,
				subject: 'Verify Your Email',
				text: emailContent
			});
		} catch (emailError: any) {
			// Cleanup tokens if email sending fails
			await cleanupTokensAfterFailedEmailMessage({ id: newUser.id as string });
			throw new Error(`Error sending verification email: ${emailError.message}`);
		}

		return {
			success: true,
			message: 'User registered successfully. Please verify your email using the code sent to your email.',
			data: { id: newUser.id, email: newUser.email }
		};
	} catch (error: any) {
		throw new Error(`${error.message}`);
	}
};

export const login_user = async (params: IParams<IUser>) => {
	try {
		const { email, password } = params.data;
		const user = await User.findOne({ where: { email: email.toLowerCase() } });

		if (!user || !(await user.comparePassword(password))) {
			throw new Error('Invalid email or password.');
		}

		// Generate tokens
		const tokens = jwtUtils.generateUserTokens(user);

		// Store refresh token
		const refreshTokenExpiresIn = 30 * 24 * 60 * 60 * 1000; // 30 days
		const expiresAt = new Date(Date.now() + refreshTokenExpiresIn);

		// Check if token already exists and update or create new
		const checkExistingTokens = await TokenSchema.findOne({ where: { userId: user.id } });
		if (checkExistingTokens) {
			await checkExistingTokens.update({ refreshToken: tokens.refreshToken, expiresAt: expiresAt });
		} else {
			await TokenSchema.create({
				userId: user.id,
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
		throw new Error(`${error.message}`);
	}
};

export const verify_email = async (params: { data: IToken; query: { userId: string } }) => {
	try {
		const userAuthInfo = params.data;
		const { userId } = params.query;
		const now = new Date();

		const user = await User.findByPk(userId);

		if (!user) {
			throw new Error('User not found.');
		}
		const fetchUserToken = await authTokenModel.findOne({ where: { userId: user.id, expiresAt: { [Op.gt]: now } } });
		const tokenData = fetchUserToken?.get();
		if (!tokenData || !tokenData.authCode) {
			throw new Error('Verification token not found.');
		}
		const isMatch = userAuthInfo.authCode && (await bcrypt.compare(userAuthInfo.authCode, tokenData.authCode));

		if (!isMatch) {
			throw new Error('Invalid verification code.');
		}

		const updateUser = await user.update({ isEmailVerified: true });

		if (!updateUser) {
			throw new Error('Error updating user! Please try again later.');
		}

		// Cleanup tokens after successful verification
		await authTokenModel.destroy({ where: { userId: user.id } });

		const emailContent = getEmailTemplates.successfulVerification({
			loginUrl: 'https://skoolsync.com'
		});
		await sendMail({
			email: updateUser.email,
			subject: 'Verify Your Email',
			text: emailContent
		});

		return {
			success: true,
			message: 'Email successfully verified',
			data: null
		};
	} catch (error: any) {
		throw new Error(`Error verifying user token: ${error.message}`);
	}
};

export const resend_verification_email = async (params: { query: { userId: string } }) => {
	try {
		const { userId } = params.query;
		const user = await User.findByPk(userId);
		if (!user) {
			throw new Error('User not found.');
		}
		if (user.isEmailVerified) {
			throw new Error('Email is already verified.');
		}

		// Cleanup any existing tokens for the user
		await authTokenModel.destroy({ where: { userId: user.id } });

		// Generate a new verification code and send email
		const verificationCode = generateVerificationCode(VERIFICATION_CODE_LENGTH);
		const hashedVerificationCode = await bcrypt.hash(verificationCode, 10);
		await authTokenModel.create({
			userId: user.id,
			authCode: hashedVerificationCode,
			expiresAt: calculateExpiryTime(VERIFICATION_EXPIRY_MINUTES)
		});
		const emailContent = getEmailTemplates.verificationCode({
			verificationCode
		});
		await sendMail({
			email: user.email,
			subject: 'Resend Verification Email',
			text: emailContent
		});
		return {
			success: true,
			message: 'Verification email resent successfully.',
			data: null
		};
	} catch (error: any) {
		// Cleanup tokens if email sending fails
		await cleanupTokensAfterFailedEmailMessage({ id: params.query.userId });
		throw new Error(`Error resending verification email: ${error.message}`);
	}
};

export const logout_user = async (params: { data: IToken }) => {
	try {
		const { refreshToken } = params.data;

		// Validate the refresh token
		if (!refreshToken) {
			throw new Error('Refresh token is required for logout.');
		}

		// destroy the token from the database
		const result = await TokenSchema.destroy({ where: { refreshToken } });

		if (!result) {
			throw new Error('Failed to log out. Token not found.');
		}
		return {
			success: true,
			message: 'User logged out successfully.',
			data: null
		};
	} catch (error: any) {
		throw new Error(`Error logging out user: ${error.message}`);
	}
};

export const forgot_password = async (params: { data: IUser }) => {
	const { email } = params.data;
	const user = await User.findOne({ where: { email } });

	if (!user) {
		throw new Error('User not found.');
	}
	const isTokenExists = await authTokenModel.findOne({ where: { userId: user.id } });
	if (isTokenExists) {
		throw new Error('A password reset request is already sent! Please check your email.');
	}

	try {
		const resetToken = jwtUtils.generateResetPasswordToken(user.id);
		const resetPasswordUrl = `https://skoolsync.com/reset-password?token=${resetToken}&userId=${user.id}`;
		const emailContent = getEmailTemplates.forgotPassword({
			resetPasswordUrl,
			firstName: user.firstName
		});
		await sendMail({
			email: user.email,
			subject: 'Reset Your Password',
			text: emailContent
		});

		await authTokenModel.create({
			userId: user.id,
			authCode: resetToken,
			expiresAt: calculateExpiryTime(10) // 10 minutes expiry
		});

		return {
			success: true,
			message: 'Password reset email sent successfully.',
			data: null
		};
	} catch (error: any) {
		throw new Error(`Error generating reset password token: ${error.message}`);
	}
};
