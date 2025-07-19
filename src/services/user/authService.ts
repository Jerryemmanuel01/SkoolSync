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
			data: { _id: newUser.id, email: newUser.email }
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
