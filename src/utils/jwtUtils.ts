import jwt, { JwtPayload } from 'jsonwebtoken';
import { IAdmin } from '../interfaces/IAdmin';
import { IUser } from '../interfaces/IUser';

const verifyRefreshToken = (token: string) => {
	return jwt.verify(token, process.env.REFRESH_TOKEN_SECRET!);
};

const generateUserTokens = (user: IUser) => {
	const accessToken = jwt.sign({ id: user.id, email: user.email }, process.env.ADMIN_ACCESS_TOKEN_SECRET!, { expiresIn: '1d' });
	const refreshToken = jwt.sign({ id: user.id, email: user.email }, process.env.ADMIN_REFRESH_TOKEN_SECRET!, { expiresIn: '30d' });
	return { accessToken, refreshToken };
};

const generateAdminTokens = (user: IAdmin) => {
	const accessToken = jwt.sign({ id: user._id }, process.env.ADMIN_ACCESS_TOKEN_SECRET!, { expiresIn: '1d' });
	const refreshToken = jwt.sign({ id: user._id }, process.env.ADMIN_REFRESH_TOKEN_SECRET!, { expiresIn: '30d' });
	return { accessToken, refreshToken };
};

const verifyAdminToken = (token: string) => {
	return jwt.verify(token, process.env.ADMIN_ACCESS_TOKEN_SECRET!);
};

const verifyAdminRefreshToken = (token: string) => {
	return jwt.verify(token, process.env.ADMIN_REFRESH_TOKEN_SECRET!);
};

export default {
	generateAdminTokens,
	verifyAdminToken,
	verifyRefreshToken,
	verifyAdminRefreshToken,
	generateUserTokens,
};
