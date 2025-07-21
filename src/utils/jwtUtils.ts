import jwt, { JwtPayload } from 'jsonwebtoken';
import { IAdmin } from '../interfaces/IAdmin';
import { IUser } from '../interfaces/IUser';

const generateUserTokens = (user: IUser) => {
	const accessToken = jwt.sign({ id: user.id, email: user.email }, process.env.ACCESS_TOKEN_SECRET!, { expiresIn: '1d' });
	const refreshToken = jwt.sign({ id: user.id, email: user.email }, process.env.REFRESH_TOKEN_SECRET!, { expiresIn: '30d' });
	return { accessToken, refreshToken };
};

const verifyRefreshToken = (token: string) => {
	return jwt.verify(token, process.env.REFRESH_TOKEN_SECRET!);
};
const verifyAccessToken = (token: string) => {
	return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!);
};

const generateResetPasswordToken = (userId: string) => {
	return jwt.sign({ userId }, process.env.RESET_PASSWORD_TOKEN_SECRET!, { expiresIn: '10m' });
};

const verifyResetPasswordToken = (token: string) => {
	const secret = process.env.RESET_PASSWORD_TOKEN_SECRET!;
	if (!secret) {
		throw new Error('Reset password token secret is not defined.');
	}
	
	return jwt.verify(token, secret);
	  
};

export default {
	verifyRefreshToken,
	generateUserTokens,
	generateResetPasswordToken,
	verifyResetPasswordToken,
	verifyAccessToken
};
