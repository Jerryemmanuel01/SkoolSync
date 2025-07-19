import { IParams } from '../../interfaces/IParams';
import { IUser } from '../../interfaces/IUser';
import authTokenModel from '../../models/authTokenModel';
import User from '../../models/userModel';
import bcrypt from 'bcrypt';
import { calculateExpiryTime, generateVerificationCode, VERIFICATION_CODE_LENGTH, VERIFICATION_EXPIRY_MINUTES } from '../../utils/functions';
import { getEmailTemplates } from '../../helpers/emailContents';
import sendMail from '../../utils/emailUtils';
import { cleanupTokensAfterFailedEmailMessage } from '../../helpers/cleanUpExpiredUser';

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

		// Hash the user's password
		const hashedPassword = await bcrypt.hash(userData.password, 10);

		// Create a new user
		const newUser = await User.create({
            ...userData,
            email: email.toLowerCase(),
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
