import jwt, { JwtPayload } from 'jsonwebtoken';
import { IAdmin } from '../interfaces/IAdmin';

const verifyRefreshToken = (token: string) => {
	return jwt.verify(token, process.env.REFRESH_TOKEN_SECRET!);
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
	verifyAdminRefreshToken
};
